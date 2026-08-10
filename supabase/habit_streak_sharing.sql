-- Stage 8: Opt-in public habit streak sharing + public streak RPC.
-- Idempotent — safe to re-run in Supabase Dashboard → SQL Editor.
--
-- Privacy:
--   * Private habits/checkins remain private (no public SELECT)
--   * habit_streak_shares is own-row RLS only (no anon SELECT on table)
--   * Public reads go through get_public_habit_streaks() only
--   * Public fields: leaderboard_name + streak (+ rank) — never habit details
--
-- Streak authority:
--   * Server recomputes from habits + habit_checkins (Stage 7 rules)
--   * Client cannot publish an arbitrary streak value

-- ---------------------------------------------------------------------------
-- Server-side streak (mirrors Stage 7: all active habits complete per day)
-- INTERNAL helper only — called by SECURITY DEFINER triggers.
-- Not a client RPC: no execute for anon/authenticated/public.
-- p_today: calendar date the streak ends on (validated by callers)
-- ---------------------------------------------------------------------------
create or replace function public.compute_user_habit_streak(
  p_user_id uuid,
  p_today date
)
returns integer
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_streak integer := 0;
  v_cursor date := p_today;
  v_active_count integer;
  v_complete_count integer;
  v_i integer;
begin
  if p_user_id is null or p_today is null then
    return 0;
  end if;

  -- Defense in depth if execute privileges are ever widened.
  if auth.uid() is not null and p_user_id is distinct from auth.uid() then
    raise exception 'Not allowed to compute another user''s habit streak'
      using errcode = '42501';
  end if;

  select count(*)::integer
    into v_active_count
  from public.habits h
  where h.user_id = p_user_id
    and h.is_active = true;

  if v_active_count is null or v_active_count = 0 then
    return 0;
  end if;

  for v_i in 0..399 loop
    select count(*)::integer
      into v_complete_count
    from public.habits h
    where h.user_id = p_user_id
      and h.is_active = true
      and exists (
        select 1
        from public.habit_checkins c
        where c.user_id = p_user_id
          and c.habit_id = h.id
          and c.checkin_date = v_cursor
          and c.completed = true
      );

    if v_complete_count is distinct from v_active_count then
      exit;
    end if;

    v_streak := v_streak + 1;
    v_cursor := v_cursor - 1;
  end loop;

  return v_streak;
end;
$$;

-- Least privilege: triggers run as function owner (SECURITY DEFINER) and retain
-- access; clients must not call this directly via PostgREST.
revoke all on function public.compute_user_habit_streak(uuid, date) from public;
revoke all on function public.compute_user_habit_streak(uuid, date) from anon;
revoke all on function public.compute_user_habit_streak(uuid, date) from authenticated;

-- ---------------------------------------------------------------------------
-- Projection table (one row per user)
-- ---------------------------------------------------------------------------
create table if not exists public.habit_streak_shares (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  streak integer not null default 0,
  is_active boolean not null default false,
  shared_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint habit_streak_shares_one_per_user unique (user_id),
  constraint habit_streak_shares_streak_nonneg check (streak >= 0)
);

create index if not exists habit_streak_shares_active_streak_idx
  on public.habit_streak_shares (is_active, streak desc);

alter table public.habit_streak_shares enable row level security;

drop policy if exists "Users can read own habit streak shares"
  on public.habit_streak_shares;
create policy "Users can read own habit streak shares"
  on public.habit_streak_shares for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own habit streak shares"
  on public.habit_streak_shares;
create policy "Users can insert own habit streak shares"
  on public.habit_streak_shares for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own habit streak shares"
  on public.habit_streak_shares;
create policy "Users can update own habit streak shares"
  on public.habit_streak_shares for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own habit streak shares"
  on public.habit_streak_shares;
create policy "Users can delete own habit streak shares"
  on public.habit_streak_shares for delete
  using (auth.uid() = user_id);

grant select, insert, update, delete on table public.habit_streak_shares
  to authenticated;

-- Supabase default privileges may grant table DML to anon/public on CREATE.
-- Explicit least privilege: authenticated only; public reads via RPC.
revoke all on table public.habit_streak_shares from public;
revoke all on table public.habit_streak_shares from anon;

grant select, insert, update, delete
on table public.habit_streak_shares
to authenticated;

-- ---------------------------------------------------------------------------
-- Before write: require Leaderboard Name when active; overwrite streak
-- ---------------------------------------------------------------------------
create or replace function public.habit_streak_shares_before_write()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  profile_name text;
  v_utc_today date := (timezone('UTC', now()))::date;
  v_as_of date;
begin
  if auth.uid() is null or new.user_id <> auth.uid() then
    raise exception 'Not allowed to write habit streak shares for another user'
      using errcode = '42501';
  end if;

  -- Optional client hint via temporary GUC / use updated_at day — prefer UTC today,
  -- but allow checkin-driven refresh to set request.habit_streak_as_of.
  begin
    v_as_of := nullif(current_setting('request.habit_streak_as_of', true), '')::date;
  exception when others then
    v_as_of := null;
  end;

  if v_as_of is null then
    v_as_of := v_utc_today;
  elsif v_as_of < v_utc_today - 1 or v_as_of > v_utc_today + 1 then
    raise exception 'Invalid habit streak as-of date'
      using errcode = '22023';
  end if;

  if new.is_active then
    select lp.leaderboard_name
      into profile_name
    from public.leaderboard_profiles lp
    where lp.user_id = new.user_id;

    if profile_name is null or btrim(profile_name) = '' then
      raise exception 'A Leaderboard Name is required before sharing your habit streak'
        using errcode = 'P0001';
    end if;

    if new.shared_at is null then
      new.shared_at := now();
    end if;
  end if;

  -- Always server-authoritative streak (ignore client spoofing).
  new.streak := public.compute_user_habit_streak(new.user_id, v_as_of);
  new.updated_at := now();

  if tg_op = 'INSERT' and new.created_at is null then
    new.created_at := now();
  end if;

  return new;
end;
$$;

drop trigger if exists habit_streak_shares_before_write on public.habit_streak_shares;
create trigger habit_streak_shares_before_write
  before insert or update on public.habit_streak_shares
  for each row
  execute function public.habit_streak_shares_before_write();

-- Keep active projection in sync when private habit data changes.
create or replace function public.habit_streak_shares_sync_from_private()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid;
  v_utc_today date := (timezone('UTC', now()))::date;
  v_as_of date := v_utc_today;
begin
  uid := coalesce(new.user_id, old.user_id);
  if uid is null then
    return coalesce(new, old);
  end if;

  -- Cleared Leaderboard Name must not remain publicly shareable, and must not
  -- block private habit/check-in writes via the before_write name requirement.
  if not exists (
    select 1
    from public.leaderboard_profiles lp
    where lp.user_id = uid
      and char_length(btrim(lp.leaderboard_name)) > 0
  ) then
    update public.habit_streak_shares s
    set is_active = false,
        updated_at = now()
    where s.user_id = uid
      and s.is_active = true;
    return coalesce(new, old);
  end if;

  if tg_table_name = 'habit_checkins' then
    if coalesce(new.checkin_date, old.checkin_date)
      between v_utc_today - 1 and v_utc_today + 1
    then
      v_as_of := coalesce(new.checkin_date, old.checkin_date);
    end if;
  end if;

  perform set_config('request.habit_streak_as_of', v_as_of::text, true);

  update public.habit_streak_shares s
  set streak = public.compute_user_habit_streak(uid, v_as_of),
      updated_at = now()
  where s.user_id = uid
    and s.is_active = true;

  return coalesce(new, old);
end;
$$;

drop trigger if exists habit_streak_shares_sync_on_checkin on public.habit_checkins;
create trigger habit_streak_shares_sync_on_checkin
  after insert or update or delete on public.habit_checkins
  for each row
  execute function public.habit_streak_shares_sync_from_private();

drop trigger if exists habit_streak_shares_sync_on_habits on public.habits;
create trigger habit_streak_shares_sync_on_habits
  after insert or update or delete on public.habits
  for each row
  execute function public.habit_streak_shares_sync_from_private();

-- ---------------------------------------------------------------------------
-- Client-facing helper: set share on/off with optional local as-of date
-- ---------------------------------------------------------------------------
create or replace function public.set_habit_streak_share(
  p_is_active boolean,
  p_as_of date default null
)
returns public.habit_streak_shares
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  v_utc_today date := (timezone('UTC', now()))::date;
  v_as_of date;
  row_out public.habit_streak_shares;
begin
  if uid is null then
    raise exception 'Not authenticated'
      using errcode = 'P0001';
  end if;

  v_as_of := coalesce(p_as_of, v_utc_today);
  if v_as_of < v_utc_today - 1 or v_as_of > v_utc_today + 1 then
    raise exception 'Invalid habit streak as-of date'
      using errcode = '22023';
  end if;

  perform set_config('request.habit_streak_as_of', v_as_of::text, true);

  insert into public.habit_streak_shares as s (user_id, is_active, shared_at)
  values (
    uid,
    coalesce(p_is_active, false),
    case when coalesce(p_is_active, false) then now() else null end
  )
  on conflict (user_id) do update
    set is_active = excluded.is_active,
        shared_at = case
          when excluded.is_active and not s.is_active then now()
          when excluded.is_active then coalesce(s.shared_at, now())
          else s.shared_at
        end,
        updated_at = now()
  returning * into row_out;

  return row_out;
end;
$$;

revoke all on function public.set_habit_streak_share(boolean, date) from public;
grant execute on function public.set_habit_streak_share(boolean, date)
  to authenticated;

-- ---------------------------------------------------------------------------
-- Public RPC — current streak board only (all_time)
-- ---------------------------------------------------------------------------
drop function if exists public.get_public_habit_streaks(text);

create function public.get_public_habit_streaks(
  p_period text default 'all_time'
)
returns table (
  rank bigint,
  leaderboard_name text,
  streak integer,
  award_running text,
  award_strength text,
  award_crown boolean
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_period text := lower(btrim(coalesce(p_period, 'all_time')));
begin
  if v_period is distinct from 'all_time' then
    raise exception 'Invalid habit streak period'
      using errcode = '22023';
  end if;

  return query
  with eligible as (
    select
      p.leaderboard_name as name,
      s.streak as streak_value,
      case
        when p.show_awards_publicly then p.award_running
        else null
      end as arun,
      case
        when p.show_awards_publicly then p.award_strength
        else null
      end as astr,
      case
        when p.show_awards_publicly then coalesce(p.award_crown, false)
        else false
      end as acrown
    from public.habit_streak_shares s
    inner join public.leaderboard_profiles p
      on p.user_id = s.user_id
    where s.is_active = true
      and s.streak >= 0
      and char_length(btrim(p.leaderboard_name)) > 0
  ),
  ranked as (
    select
      -- Rank by streak only so equal streaks tie; name is display order below.
      dense_rank() over (
        order by e.streak_value desc
      ) as rnk,
      e.name,
      e.streak_value,
      e.arun,
      e.astr,
      e.acrown
    from eligible e
  )
  select
    ranked.rnk,
    ranked.name,
    ranked.streak_value,
    ranked.arun,
    ranked.astr,
    ranked.acrown
  from ranked
  order by ranked.rnk asc, lower(ranked.name) asc
  limit 100;
end;
$$;

revoke all on function public.get_public_habit_streaks(text) from public;
grant execute on function public.get_public_habit_streaks(text)
  to anon, authenticated;

comment on function public.get_public_habit_streaks(text) is
  'Stage 8 public habit streak board. Opt-in award tiers/crown only (never raw scores).';

comment on table public.habit_streak_shares is
  'Stage 8 opt-in public habit streak projection. No habit/check-in details. Own-row RLS; public via RPC only.';

-- ---------------------------------------------------------------------------
-- Account deletion
-- ---------------------------------------------------------------------------
create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  delete from public.habit_streak_shares where user_id = uid;
  delete from public.habit_checkins where user_id = uid;
  delete from public.habits where user_id = uid;
  delete from public.leaderboard_shares where user_id = uid;
  delete from public.leaderboard_profiles where user_id = uid;
  delete from public.performance_records where user_id = uid;
  delete from public.user_defaults where user_id = uid;
  delete from public.profiles where id = uid;
  delete from auth.users where id = uid;
end;
$$;

revoke all on function public.delete_own_account() from public;
grant execute on function public.delete_own_account() to authenticated;
