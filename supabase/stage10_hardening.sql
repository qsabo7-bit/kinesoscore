-- Stage 10: Production hardening (privileges, reserved names, name-clear
-- share hygiene, light write-path rate limits).
-- Idempotent — safe to re-run in Supabase Dashboard → SQL Editor.
--
-- Does NOT:
--   * alter RLS policies
--   * change public leaderboard / habit streak RPC payloads
--   * change streak algorithms or award thresholds
--   * rate-limit public leaderboard RPCs (use infrastructure/edge)
--   * rate-limit calculator performance_records saves

-- ===========================================================================
-- 1) Privilege hardening — older private tables
--    Revoke residual public/anon (and authenticated, then re-grant intended).
-- ===========================================================================

-- profiles: full own-row CRUD
revoke all on table public.profiles from public;
revoke all on table public.profiles from anon;
revoke all on table public.profiles from authenticated;
grant select, insert, update, delete on table public.profiles to authenticated;

-- performance_records: select/insert/delete (no update policy)
revoke all on table public.performance_records from public;
revoke all on table public.performance_records from anon;
revoke all on table public.performance_records from authenticated;
grant select, insert, delete on table public.performance_records to authenticated;

-- user_defaults: full own-row CRUD
revoke all on table public.user_defaults from public;
revoke all on table public.user_defaults from anon;
revoke all on table public.user_defaults from authenticated;
grant select, insert, update, delete on table public.user_defaults to authenticated;

-- leaderboard_profiles
revoke all on table public.leaderboard_profiles from public;
revoke all on table public.leaderboard_profiles from anon;
revoke all on table public.leaderboard_profiles from authenticated;
grant select, insert, update, delete
  on table public.leaderboard_profiles to authenticated;

-- leaderboard_shares
revoke all on table public.leaderboard_shares from public;
revoke all on table public.leaderboard_shares from anon;
revoke all on table public.leaderboard_shares from authenticated;
grant select, insert, update, delete
  on table public.leaderboard_shares to authenticated;

-- habits
revoke all on table public.habits from public;
revoke all on table public.habits from anon;
revoke all on table public.habits from authenticated;
grant select, insert, update, delete on table public.habits to authenticated;

-- habit_checkins
revoke all on table public.habit_checkins from public;
revoke all on table public.habit_checkins from anon;
revoke all on table public.habit_checkins from authenticated;
grant select, insert, update, delete
  on table public.habit_checkins to authenticated;

-- Re-assert Stage 8/9 least privilege (idempotent)
revoke all on table public.habit_streak_shares from public;
revoke all on table public.habit_streak_shares from anon;
revoke all on table public.habit_streak_shares from authenticated;
grant select, insert, update, delete
  on table public.habit_streak_shares to authenticated;

revoke all on table public.fitness_score_snapshots from public;
revoke all on table public.fitness_score_snapshots from anon;
revoke all on table public.fitness_score_snapshots from authenticated;
grant select, insert, delete
  on table public.fitness_score_snapshots to authenticated;

-- ===========================================================================
-- 2) Reserved Leaderboard Names (DB source of truth, case-insensitive)
-- ===========================================================================

create table if not exists public.reserved_leaderboard_names (
  name text primary key
);

comment on table public.reserved_leaderboard_names is
  'Stage 10 small reserved Leaderboard Name blocklist (lowercase). Enforced by trigger.';

insert into public.reserved_leaderboard_names (name) values
  ('admin'),
  ('administrator'),
  ('kinesoscore'),
  ('kineso'),
  ('support'),
  ('staff'),
  ('moderator'),
  ('system'),
  ('official'),
  ('leaderboard'),
  ('api'),
  ('root'),
  ('help'),
  ('null'),
  ('undefined')
on conflict (name) do nothing;

revoke all on table public.reserved_leaderboard_names from public;
revoke all on table public.reserved_leaderboard_names from anon;
revoke all on table public.reserved_leaderboard_names from authenticated;

create or replace function public.leaderboard_profiles_reject_reserved_name()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists (
    select 1
    from public.reserved_leaderboard_names r
    where r.name = lower(btrim(new.leaderboard_name))
  ) then
    raise exception 'Leaderboard Name is reserved'
      using errcode = 'P0001';
  end if;
  return new;
end;
$$;

drop trigger if exists leaderboard_profiles_reject_reserved_name
  on public.leaderboard_profiles;
create trigger leaderboard_profiles_reject_reserved_name
  before insert or update of leaderboard_name on public.leaderboard_profiles
  for each row
  execute function public.leaderboard_profiles_reject_reserved_name();

revoke all on function public.leaderboard_profiles_reject_reserved_name()
  from public;
revoke all on function public.leaderboard_profiles_reject_reserved_name()
  from anon;
revoke all on function public.leaderboard_profiles_reject_reserved_name()
  from authenticated;

-- ===========================================================================
-- 3) Clear Leaderboard Name → immediately deactivate share projections
--    Does not delete historical share rows. Public RPCs unchanged (still JOIN).
-- ===========================================================================

create or replace function public.leaderboard_profiles_after_delete_deactivate_shares()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- User-initiated clear has auth.uid(). Cascade deletes from auth.users may not;
  -- share rows are removed by FK cascade in that path, so skip updates.
  if auth.uid() is null then
    return old;
  end if;

  -- Skip share write rate limits for this hygiene path.
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

  return old;
end;
$$;

drop trigger if exists leaderboard_profiles_after_delete_deactivate_shares
  on public.leaderboard_profiles;
create trigger leaderboard_profiles_after_delete_deactivate_shares
  after delete on public.leaderboard_profiles
  for each row
  execute function public.leaderboard_profiles_after_delete_deactivate_shares();

revoke all on function public.leaderboard_profiles_after_delete_deactivate_shares()
  from public;
revoke all on function public.leaderboard_profiles_after_delete_deactivate_shares()
  from anon;
revoke all on function public.leaderboard_profiles_after_delete_deactivate_shares()
  from authenticated;

comment on function public.leaderboard_profiles_after_delete_deactivate_shares() is
  'Stage 10: clearing Leaderboard Name deactivates leaderboard_shares and habit_streak_shares immediately.';

-- ===========================================================================
-- 4) Light write-path rate limits (authenticated mutations only)
--    * leaderboard_name: 5 / hour / user
--    * leaderboard_share: 30 / 10 minutes / user
-- ===========================================================================

create table if not exists public.write_rate_limit_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  action text not null,
  created_at timestamptz not null default now(),
  constraint write_rate_limit_events_action_check
    check (action in ('leaderboard_name', 'leaderboard_share'))
);

create index if not exists write_rate_limit_events_lookup_idx
  on public.write_rate_limit_events (user_id, action, created_at desc);

comment on table public.write_rate_limit_events is
  'Stage 10 write-path rate limit event log. No client grants; SECURITY DEFINER only.';

revoke all on table public.write_rate_limit_events from public;
revoke all on table public.write_rate_limit_events from anon;
revoke all on table public.write_rate_limit_events from authenticated;

create or replace function public.enforce_write_rate_limit(
  p_user_id uuid,
  p_action text,
  p_max_hits integer,
  p_window interval
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer;
begin
  if p_user_id is null then
    raise exception 'Not authenticated'
      using errcode = '42501';
  end if;

  if p_action is distinct from 'leaderboard_name'
    and p_action is distinct from 'leaderboard_share'
  then
    raise exception 'Invalid rate limit action'
      using errcode = '22023';
  end if;

  delete from public.write_rate_limit_events
  where user_id = p_user_id
    and action = p_action
    and created_at < now() - (p_window * 2);

  select count(*)::integer
    into v_count
  from public.write_rate_limit_events
  where user_id = p_user_id
    and action = p_action
    and created_at >= now() - p_window;

  if v_count >= p_max_hits then
    raise exception 'Rate limit exceeded for %', p_action
      using errcode = 'P0001';
  end if;

  insert into public.write_rate_limit_events (user_id, action)
  values (p_user_id, p_action);
end;
$$;

revoke all on function public.enforce_write_rate_limit(uuid, text, integer, interval)
  from public;
revoke all on function public.enforce_write_rate_limit(uuid, text, integer, interval)
  from anon;
revoke all on function public.enforce_write_rate_limit(uuid, text, integer, interval)
  from authenticated;

-- Leaderboard Name: 5 changes / hour (insert or rename only; clear/delete free)
create or replace function public.leaderboard_profiles_enforce_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid;
  v_skip text;
begin
  begin
    v_skip := nullif(current_setting('request.skip_name_rate_limit', true), '');
  exception when others then
    v_skip := null;
  end;

  -- Account deletion sets this so delete_own_account cannot be blocked.
  if v_skip = '1' then
    return coalesce(new, old);
  end if;

  -- Clear Name / profile delete: never rate-limited (privacy exit).
  if tg_op = 'DELETE' then
    return old;
  end if;

  -- Award toggles and other non-name updates do not count as a name change.
  if tg_op = 'UPDATE'
     and new.leaderboard_name is not distinct from old.leaderboard_name then
    return new;
  end if;

  uid := coalesce(new.user_id, old.user_id);
  perform public.enforce_write_rate_limit(
    uid,
    'leaderboard_name',
    5,
    interval '1 hour'
  );
  return coalesce(new, old);
end;
$$;

drop trigger if exists leaderboard_profiles_enforce_rate_limit
  on public.leaderboard_profiles;
create trigger leaderboard_profiles_enforce_rate_limit
  before insert or update or delete on public.leaderboard_profiles
  for each row
  execute function public.leaderboard_profiles_enforce_rate_limit();

revoke all on function public.leaderboard_profiles_enforce_rate_limit()
  from public;
revoke all on function public.leaderboard_profiles_enforce_rate_limit()
  from anon;
revoke all on function public.leaderboard_profiles_enforce_rate_limit()
  from authenticated;

-- Leaderboard share toggles/upserts: 30 / 10 minutes
create or replace function public.leaderboard_shares_enforce_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_skip text;
begin
  begin
    v_skip := nullif(current_setting('request.skip_share_rate_limit', true), '');
  exception when others then
    v_skip := null;
  end;

  if v_skip = '1' then
    return new;
  end if;

  perform public.enforce_write_rate_limit(
    new.user_id,
    'leaderboard_share',
    30,
    interval '10 minutes'
  );
  return new;
end;
$$;

drop trigger if exists leaderboard_shares_enforce_rate_limit
  on public.leaderboard_shares;
create trigger leaderboard_shares_enforce_rate_limit
  before insert or update on public.leaderboard_shares
  for each row
  execute function public.leaderboard_shares_enforce_rate_limit();

revoke all on function public.leaderboard_shares_enforce_rate_limit()
  from public;
revoke all on function public.leaderboard_shares_enforce_rate_limit()
  from anon;
revoke all on function public.leaderboard_shares_enforce_rate_limit()
  from authenticated;

-- Account deletion: remove rate-limit rows before auth.users (CASCADE also covers)
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

  -- Do not let Stage 10 write-path rate limits block account deletion.
  perform set_config('request.skip_name_rate_limit', '1', true);
  perform set_config('request.skip_share_rate_limit', '1', true);

  delete from public.write_rate_limit_events where user_id = uid;
  delete from public.habit_streak_shares where user_id = uid;
  delete from public.habit_checkins where user_id = uid;
  delete from public.habits where user_id = uid;
  delete from public.leaderboard_shares where user_id = uid;
  delete from public.leaderboard_profiles where user_id = uid;
  delete from public.fitness_score_snapshots where user_id = uid;
  delete from public.performance_records where user_id = uid;
  delete from public.user_defaults where user_id = uid;
  delete from public.profiles where id = uid;
  delete from auth.users where id = uid;
end;
$$;

revoke all on function public.delete_own_account() from public;
grant execute on function public.delete_own_account() to authenticated;
