-- Stage 3: Leaderboard sharing foundation (private projection only).
-- Prefer migrations/003_leaderboard_shares.sql. Safe to re-run in SQL Editor.
-- Requires Stage 1 leaderboard_profiles (+ delete_own_account baseline).
-- Private by default — no public SELECT / no auto-share.

-- ---------------------------------------------------------------------------
-- Table: explicitly shared leaderboard entries (opt-in projection)
-- ---------------------------------------------------------------------------
create table if not exists public.leaderboard_shares (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  -- Optional link to private history; share remains if source is deleted.
  source_record_id uuid references public.performance_records (id) on delete set null,
  -- Stable board identity, e.g. mykinesoscore | running:5K | strength:SBD Total | assessment:army-aft
  board_key text not null,
  -- Frozen legacy calculator identity strings (same values as performance_records).
  calculator_type text not null,
  exercise_name text not null,
  result_value numeric not null,
  result_unit text,
  higher_is_better boolean not null,
  -- Comparable sort key: result_value or -result_value (always set by trigger).
  rank_value numeric not null default 0,
  -- Snapshot of leaderboard_profiles.leaderboard_name at write time (set by trigger).
  display_name text not null default 'pending',
  -- UTC Monday of the share window (for future this-week boards; set by trigger).
  period_week date not null default date '1970-01-01',
  is_active boolean not null default true,
  shared_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  constraint leaderboard_shares_board_key_nonempty
    check (char_length(btrim(board_key)) > 0),
  constraint leaderboard_shares_calc_nonempty
    check (char_length(btrim(calculator_type)) > 0),
  constraint leaderboard_shares_exercise_nonempty
    check (char_length(btrim(exercise_name)) > 0),
  constraint leaderboard_shares_display_name_nonempty
    check (char_length(btrim(display_name)) > 0),
  constraint leaderboard_shares_one_per_user_board
    unique (user_id, board_key)
);

-- Future board queries (still private under RLS until Stage 5 projection).
create index if not exists leaderboard_shares_user_idx
  on public.leaderboard_shares (user_id);

create index if not exists leaderboard_shares_active_board_rank_idx
  on public.leaderboard_shares (board_key, is_active, rank_value desc);

create index if not exists leaderboard_shares_active_board_shared_idx
  on public.leaderboard_shares (board_key, is_active, shared_at desc);

create index if not exists leaderboard_shares_active_board_week_rank_idx
  on public.leaderboard_shares (board_key, is_active, period_week, rank_value desc);

-- ---------------------------------------------------------------------------
-- Allowlisted board targets (excludes Estimated 5K, Fitness Age, BMR, BMI, VO₂)
-- ---------------------------------------------------------------------------
create or replace function public.leaderboard_share_target_allowed(
  p_board_key text,
  p_calculator_type text,
  p_exercise_name text,
  p_higher_is_better boolean
)
returns boolean
language sql
immutable
as $$
  select exists (
    select 1
    from (
      values
        -- myKinesoScore™ (legacy storage keys)
        ('mykinesoscore', 'FPC Score', 'Overall FPC Score', true),
        -- Strength
        ('strength:Bench Press', 'strength', 'Bench Press', true),
        ('strength:Squat', 'strength', 'Squat', true),
        ('strength:Deadlift', 'strength', 'Deadlift', true),
        ('strength:SBD Total', 'strength', 'SBD Total', true),
        -- Running (actual distances only — never Estimated 5K)
        ('running:Mile', 'running', 'Mile', false),
        ('running:1.5 Mile', 'running', '1.5 Mile', false),
        ('running:2 Mile', 'running', '2 Mile', false),
        ('running:5K', 'running', '5K', false),
        ('running:5 Mile', 'running', '5 Mile', false),
        ('running:10K', 'running', '10K', false),
        ('running:10 Mile', 'running', '10 Mile', false),
        ('running:Half Marathon', 'running', 'Half Marathon', false),
        ('running:Marathon', 'running', 'Marathon', false),
        -- Fitness assessments (military overalls)
        ('assessment:air-force-pfra', 'air-force-pfra', 'Overall Score', true),
        ('assessment:air-force-pfa', 'air-force-pfa', 'Overall Score', true),
        ('assessment:army-aft', 'army-aft', 'Overall Score', true),
        ('assessment:marine-pft', 'marine-pft', 'Overall Score', true),
        ('assessment:navy-prt', 'navy-prt', 'Overall Score', true),
        ('fitness:max-pushups', 'max-pushups', 'Max Push-ups', true),
        ('fitness:max-pullups', 'max-pullups', 'Max Pull-ups', true),
        ('fitness:fran-rx', 'fran', 'Fran Rx', false),
        ('fitness:fran-scaled', 'fran', 'Fran Scaled', false),
        ('fitness:murph-rx', 'murph', 'Murph Rx', false),
        ('fitness:murph-scaled', 'murph', 'Murph Scaled', false),
        ('fitness:cindy', 'cindy', 'Cindy', true)
    ) as allowed(board_key, calculator_type, exercise_name, higher_is_better)
    where allowed.board_key = p_board_key
      and allowed.calculator_type = p_calculator_type
      and allowed.exercise_name = p_exercise_name
      and allowed.higher_is_better = p_higher_is_better
  );
$$;

revoke all on function public.leaderboard_share_target_allowed(text, text, text, boolean)
  from public;
grant execute on function public.leaderboard_share_target_allowed(text, text, text, boolean)
  to authenticated;

-- ---------------------------------------------------------------------------
-- Before write: require Leaderboard Name, snapshot it, validate target/source
-- ---------------------------------------------------------------------------
create or replace function public.leaderboard_shares_before_write()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  profile_name text;
  source_owner uuid;
begin
  if tg_op = 'INSERT' or tg_op = 'UPDATE' then
    if auth.uid() is null or new.user_id <> auth.uid() then
      raise exception 'Not allowed to write leaderboard shares for another user'
        using errcode = '42501';
    end if;

    -- Lifecycle / unshare paths must not re-validate name, allowlist, or source
    -- (includes clear Leaderboard Name → deactivate shares after profile delete).
    if tg_op = 'UPDATE' and new.is_active is false then
      new.updated_at := now();
      return new;
    end if;

    select lp.leaderboard_name
      into profile_name
    from public.leaderboard_profiles lp
    where lp.user_id = new.user_id;

    if profile_name is null or btrim(profile_name) = '' then
      raise exception 'A Leaderboard Name is required before sharing to leaderboards'
        using errcode = 'P0001';
    end if;

    -- Always snapshot from leaderboard_profiles (ignore client-supplied spoofing).
    new.display_name := profile_name;

    if not public.leaderboard_share_target_allowed(
      new.board_key,
      new.calculator_type,
      new.exercise_name,
      new.higher_is_better
    ) then
      raise exception 'This calculator result cannot be shared to leaderboards'
        using errcode = 'P0001';
    end if;

    if new.source_record_id is not null then
      select pr.user_id
        into source_owner
      from public.performance_records pr
      where pr.id = new.source_record_id;

      if source_owner is null then
        raise exception 'Shared source record was not found'
          using errcode = 'P0001';
      end if;

      if source_owner <> new.user_id then
        raise exception 'Shared source record must belong to the same user'
          using errcode = '42501';
      end if;
    end if;

    if new.result_value is null or new.result_value <> new.result_value then
      raise exception 'Shared result value must be a finite number'
        using errcode = 'P0001';
    end if;

    new.rank_value := case
      when new.higher_is_better then new.result_value
      else -new.result_value
    end;

    if new.shared_at is null then
      new.shared_at := now();
    end if;

    -- UTC Monday week start (kept in sync with get_public_leaderboard This Week).
    new.period_week :=
      (date_trunc('week', timezone('UTC', new.shared_at)))::date;

    new.updated_at := now();

    if tg_op = 'INSERT' and new.created_at is null then
      new.created_at := now();
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists leaderboard_shares_before_write on public.leaderboard_shares;
create trigger leaderboard_shares_before_write
  before insert or update on public.leaderboard_shares
  for each row
  execute function public.leaderboard_shares_before_write();

-- ---------------------------------------------------------------------------
-- RLS: own-row only — no public / cross-user SELECT
-- ---------------------------------------------------------------------------
alter table public.leaderboard_shares enable row level security;

drop policy if exists "Users can read own leaderboard shares"
  on public.leaderboard_shares;
create policy "Users can read own leaderboard shares"
  on public.leaderboard_shares for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own leaderboard shares"
  on public.leaderboard_shares;
create policy "Users can insert own leaderboard shares"
  on public.leaderboard_shares for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own leaderboard shares"
  on public.leaderboard_shares;
create policy "Users can update own leaderboard shares"
  on public.leaderboard_shares for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own leaderboard shares"
  on public.leaderboard_shares;
create policy "Users can delete own leaderboard shares"
  on public.leaderboard_shares for delete
  using (auth.uid() = user_id);

grant select, insert, update, delete on table public.leaderboard_shares
  to authenticated;

-- ---------------------------------------------------------------------------
-- Account deletion: remove shares before profiles / auth.users
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
