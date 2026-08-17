-- Habit XP: per-checkin awards, lifetime XP shares, public XP leaderboard.
-- Idempotent. Additive on Stage 7/8 habit tables.
--
-- Privacy:
--   * Private habits/checkins remain private
--   * habit_xp_shares is own-row RLS only (no anon SELECT on table)
--   * Public reads go through get_public_habit_xp() only
--   * Public fields: leaderboard_name + lifetime_xp (+ avatar/awards) — never habit details
--
-- XP authority:
--   * Server sets xp_awarded on habit_checkins (base × per-habit streak multiplier)
--   * Client cannot publish an arbitrary lifetime XP

-- ---------------------------------------------------------------------------
-- Base XP by habit_key (mirrors src/data/habitCatalog.js)
-- ---------------------------------------------------------------------------
create or replace function public.habit_base_xp(p_habit_key text)
returns integer
language sql
immutable
as $$
  select case lower(btrim(coalesce(p_habit_key, '')))
    when 'water' then 10
    when 'sleep_7_8' then 15
    when 'protein' then 15
    when 'nature' then 15
    when 'mobility' then 20
    when 'strength' then 30
    when 'exercise' then 25
    when 'walk_move' then 10
    when 'recovery_day' then 10
    when 'screen_limit' then 10
    when 'sleep_schedule' then 15
    else 10
  end;
$$;

revoke all on function public.habit_base_xp(text) from public;
grant execute on function public.habit_base_xp(text) to authenticated;

-- Multiplier: day 1=1.0, 2=1.1, 3=1.2, 4=1.35, 5+=1.5
create or replace function public.habit_xp_multiplier(p_streak_days integer)
returns numeric
language sql
immutable
as $$
  select case
    when coalesce(p_streak_days, 0) <= 1 then 1.0
    when p_streak_days = 2 then 1.1
    when p_streak_days = 3 then 1.2
    when p_streak_days = 4 then 1.35
    else 1.5
  end;
$$;

revoke all on function public.habit_xp_multiplier(integer) from public;
grant execute on function public.habit_xp_multiplier(integer) to authenticated;

-- Per-habit consecutive completed days ending on p_end (inclusive).
-- Excludes any row for (habit_id, p_end) when p_exclude_end is true (writing today).
create or replace function public.compute_per_habit_streak(
  p_user_id uuid,
  p_habit_id uuid,
  p_end date,
  p_exclude_end boolean default false
)
returns integer
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_streak integer := 0;
  v_cursor date := p_end;
  v_i integer;
  v_ok boolean;
begin
  if p_user_id is null or p_habit_id is null or p_end is null then
    return 0;
  end if;

  if p_exclude_end then
    v_cursor := p_end - 1;
  end if;

  for v_i in 0..399 loop
    select exists (
      select 1
      from public.habit_checkins c
      where c.user_id = p_user_id
        and c.habit_id = p_habit_id
        and c.checkin_date = v_cursor
        and c.completed = true
    ) into v_ok;

    if not coalesce(v_ok, false) then
      exit;
    end if;

    v_streak := v_streak + 1;
    v_cursor := v_cursor - 1;
  end loop;

  return v_streak;
end;
$$;

revoke all on function public.compute_per_habit_streak(uuid, uuid, date, boolean)
  from public;
revoke all on function public.compute_per_habit_streak(uuid, uuid, date, boolean)
  from anon;
revoke all on function public.compute_per_habit_streak(uuid, uuid, date, boolean)
  from authenticated;

-- ---------------------------------------------------------------------------
-- habit_checkins.xp_awarded
-- ---------------------------------------------------------------------------
alter table public.habit_checkins
  add column if not exists xp_awarded integer not null default 0;

alter table public.habit_checkins
  drop constraint if exists habit_checkins_xp_awarded_nonneg;
alter table public.habit_checkins
  add constraint habit_checkins_xp_awarded_nonneg
  check (xp_awarded >= 0);

create or replace function public.habit_checkins_xp_before_write()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_key text;
  v_base integer;
  v_prior integer;
  v_streak integer;
begin
  if not coalesce(new.completed, false) then
    new.xp_awarded := 0;
    return new;
  end if;

  select h.habit_key into v_key
  from public.habits h
  where h.id = new.habit_id
    and h.user_id = new.user_id;

  v_base := public.habit_base_xp(v_key);
  -- Prior consecutive days ending yesterday; +1 for completing today.
  v_prior := public.compute_per_habit_streak(
    new.user_id,
    new.habit_id,
    new.checkin_date,
    true
  );
  v_streak := v_prior + 1;
  new.xp_awarded := round(v_base * public.habit_xp_multiplier(v_streak))::integer;
  return new;
end;
$$;

drop trigger if exists habit_checkins_xp_before_write on public.habit_checkins;
create trigger habit_checkins_xp_before_write
  before insert or update on public.habit_checkins
  for each row
  execute function public.habit_checkins_xp_before_write();

-- One-time backfill: completed rows with 0 XP get base × 1.0 (no historical streak).
-- Disable checkin write/sync triggers: SQL Editor / migrations run without auth.uid(),
-- and habit_checkins_before_write / habit_streak_shares_before_write would raise 42501.
-- XP-only updates do not change completion, so skipping streak sync is safe.
do $$
begin
  alter table public.habit_checkins disable trigger habit_checkins_before_write;
  alter table public.habit_checkins disable trigger habit_checkins_xp_before_write;
  alter table public.habit_checkins disable trigger habit_streak_shares_sync_on_checkin;

  begin
    alter table public.habit_checkins disable trigger habit_xp_shares_sync_on_checkin;
  exception
    when undefined_object then
      null;
  end;
end $$;

update public.habit_checkins c
set xp_awarded = public.habit_base_xp(h.habit_key)
from public.habits h
where h.id = c.habit_id
  and c.completed = true
  and c.xp_awarded = 0;

update public.habit_checkins
set xp_awarded = 0
where completed = false
  and xp_awarded <> 0;

do $$
begin
  alter table public.habit_checkins enable trigger habit_checkins_before_write;
  alter table public.habit_checkins enable trigger habit_checkins_xp_before_write;
  alter table public.habit_checkins enable trigger habit_streak_shares_sync_on_checkin;

  begin
    alter table public.habit_checkins enable trigger habit_xp_shares_sync_on_checkin;
  exception
    when undefined_object then
      null;
  end;
end $$;

-- ---------------------------------------------------------------------------
-- Projection table (one row per user)
-- ---------------------------------------------------------------------------
create table if not exists public.habit_xp_shares (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  lifetime_xp integer not null default 0,
  is_active boolean not null default false,
  shared_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint habit_xp_shares_one_per_user unique (user_id),
  constraint habit_xp_shares_xp_nonneg check (lifetime_xp >= 0)
);

create index if not exists habit_xp_shares_active_xp_idx
  on public.habit_xp_shares (is_active, lifetime_xp desc);

alter table public.habit_xp_shares enable row level security;

drop policy if exists "Users can read own habit xp shares"
  on public.habit_xp_shares;
create policy "Users can read own habit xp shares"
  on public.habit_xp_shares for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own habit xp shares"
  on public.habit_xp_shares;
create policy "Users can insert own habit xp shares"
  on public.habit_xp_shares for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own habit xp shares"
  on public.habit_xp_shares;
create policy "Users can update own habit xp shares"
  on public.habit_xp_shares for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own habit xp shares"
  on public.habit_xp_shares;
create policy "Users can delete own habit xp shares"
  on public.habit_xp_shares for delete
  using (auth.uid() = user_id);

revoke all on table public.habit_xp_shares from public;
revoke all on table public.habit_xp_shares from anon;
grant select, insert, update, delete on table public.habit_xp_shares
  to authenticated;

create or replace function public.compute_user_lifetime_habit_xp(p_user_id uuid)
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(sum(c.xp_awarded), 0)::integer
  from public.habit_checkins c
  where c.user_id = p_user_id
    and c.completed = true
    and c.xp_awarded > 0;
$$;

revoke all on function public.compute_user_lifetime_habit_xp(uuid) from public;
revoke all on function public.compute_user_lifetime_habit_xp(uuid) from anon;
revoke all on function public.compute_user_lifetime_habit_xp(uuid)
  from authenticated;

create or replace function public.habit_xp_shares_before_write()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  profile_name text;
begin
  if auth.uid() is null or new.user_id <> auth.uid() then
    raise exception 'Not allowed to write habit XP shares for another user'
      using errcode = '42501';
  end if;

  if new.is_active then
    select lp.leaderboard_name
      into profile_name
    from public.leaderboard_profiles lp
    where lp.user_id = new.user_id;

    if profile_name is null or btrim(profile_name) = '' then
      raise exception 'A Leaderboard Name is required before sharing your habit XP'
        using errcode = 'P0001';
    end if;

    if new.shared_at is null then
      new.shared_at := now();
    end if;
  end if;

  new.lifetime_xp := public.compute_user_lifetime_habit_xp(new.user_id);
  new.updated_at := now();

  if tg_op = 'INSERT' and new.created_at is null then
    new.created_at := now();
  end if;

  return new;
end;
$$;

drop trigger if exists habit_xp_shares_before_write on public.habit_xp_shares;
create trigger habit_xp_shares_before_write
  before insert or update on public.habit_xp_shares
  for each row
  execute function public.habit_xp_shares_before_write();

create or replace function public.habit_xp_shares_sync_from_private()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid;
begin
  uid := coalesce(new.user_id, old.user_id);
  if uid is null then
    return coalesce(new, old);
  end if;

  if not exists (
    select 1
    from public.leaderboard_profiles lp
    where lp.user_id = uid
      and char_length(btrim(lp.leaderboard_name)) > 0
  ) then
    update public.habit_xp_shares s
    set is_active = false,
        updated_at = now()
    where s.user_id = uid
      and s.is_active = true;
    return coalesce(new, old);
  end if;

  update public.habit_xp_shares s
  set lifetime_xp = public.compute_user_lifetime_habit_xp(uid),
      updated_at = now()
  where s.user_id = uid
    and s.is_active = true;

  return coalesce(new, old);
end;
$$;

drop trigger if exists habit_xp_shares_sync_on_checkin on public.habit_checkins;
create trigger habit_xp_shares_sync_on_checkin
  after insert or update or delete on public.habit_checkins
  for each row
  execute function public.habit_xp_shares_sync_from_private();

create or replace function public.set_habit_xp_share(p_is_active boolean)
returns public.habit_xp_shares
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  row_out public.habit_xp_shares;
begin
  if uid is null then
    raise exception 'Not authenticated'
      using errcode = 'P0001';
  end if;

  insert into public.habit_xp_shares as s (user_id, is_active, shared_at)
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

revoke all on function public.set_habit_xp_share(boolean) from public;
grant execute on function public.set_habit_xp_share(boolean) to authenticated;

-- ---------------------------------------------------------------------------
-- Public RPC — lifetime XP board (all_time)
-- ---------------------------------------------------------------------------
create or replace function public.get_public_habit_xp(
  p_period text default 'all_time'
)
returns table (
  rank bigint,
  leaderboard_name text,
  lifetime_xp integer,
  award_running text,
  award_strength text,
  award_crown boolean,
  avatar_id text
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
    raise exception 'Invalid habit XP period'
      using errcode = '22023';
  end if;

  return query
  with eligible as (
    select
      p.leaderboard_name as name,
      s.lifetime_xp as xp_value,
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
      end as acrown,
      case
        when pr.avatar_id in (
          'mark-sun',
          'mark-pulse',
          'mark-shield',
          'mark-peak',
          'mark-bolt'
        ) then pr.avatar_id
        else 'mark-sun'
      end as avid
    from public.habit_xp_shares s
    inner join public.leaderboard_profiles p
      on p.user_id = s.user_id
    left join public.profiles pr
      on pr.id = s.user_id
    where s.is_active = true
      and s.lifetime_xp >= 0
      and char_length(btrim(p.leaderboard_name)) > 0
  ),
  ranked as (
    select
      dense_rank() over (
        order by e.xp_value desc
      ) as rnk,
      e.name,
      e.xp_value,
      e.arun,
      e.astr,
      e.acrown,
      e.avid
    from eligible e
  )
  select
    ranked.rnk,
    ranked.name,
    ranked.xp_value,
    ranked.arun,
    ranked.astr,
    ranked.acrown,
    ranked.avid
  from ranked
  order by ranked.rnk asc, lower(ranked.name) asc
  limit 100;
end;
$$;

revoke all on function public.get_public_habit_xp(text) from public;
grant execute on function public.get_public_habit_xp(text)
  to anon, authenticated;

comment on function public.get_public_habit_xp(text) is
  'Public habit lifetime XP board. Rank, leaderboard_name, lifetime_xp, avatar, awards.';

comment on table public.habit_xp_shares is
  'Opt-in public habit lifetime XP projection. No habit/check-in details. Own-row RLS; public via RPC only.';

-- ---------------------------------------------------------------------------
-- Clear Leaderboard Name → also deactivate XP shares
-- ---------------------------------------------------------------------------
create or replace function public.leaderboard_profiles_after_delete_deactivate_shares()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return old;
  end if;

  perform set_config('request.skip_share_rate_limit', '1', true);

  update public.leaderboard_shares s
  set is_active = false,
      updated_at = now()
  where s.user_id = old.user_id
    and s.is_active = true;

  update public.habit_streak_shares s
  set is_active = false,
      updated_at = now()
  where s.user_id = old.user_id
    and s.is_active = true;

  update public.habit_xp_shares s
  set is_active = false,
      updated_at = now()
  where s.user_id = old.user_id
    and s.is_active = true;

  return old;
end;
$$;

-- ---------------------------------------------------------------------------
-- Account deletion (extend latest groups-aware version)
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

  perform set_config('request.skip_name_rate_limit', '1', true);
  perform set_config('request.skip_share_rate_limit', '1', true);

  delete from public.write_rate_limit_events where user_id = uid;
  delete from public.habit_xp_shares where user_id = uid;
  delete from public.habit_streak_shares where user_id = uid;
  delete from public.habit_checkins where user_id = uid;
  delete from public.habits where user_id = uid;
  delete from public.leaderboard_shares where user_id = uid;
  delete from public.leaderboard_profiles where user_id = uid;
  delete from public.fitness_score_snapshots where user_id = uid;
  delete from public.group_assessment_shares where user_id = uid;
  delete from public.group_activity_logs where user_id = uid;
  delete from public.performance_records where user_id = uid;
  delete from public.user_defaults where user_id = uid;
  delete from public.group_members where user_id = uid;
  delete from public.groups where created_by = uid;
  delete from public.profiles where id = uid;
  delete from auth.users where id = uid;
end;
$$;

revoke all on function public.delete_own_account() from public;
grant execute on function public.delete_own_account() to authenticated;
