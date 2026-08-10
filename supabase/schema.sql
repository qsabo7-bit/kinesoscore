-- KinesoScore auth support: profiles + full account deletion
-- Run in Supabase Dashboard → SQL Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  first_name text not null,
  email text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Users can delete own profile" on public.profiles;
create policy "Users can delete own profile"
  on public.profiles for delete
  using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, first_name, email)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'first_name', ''), 'Athlete'),
    new.email
  )
  on conflict (id) do update
    set email = excluded.email,
        first_name = coalesce(nullif(excluded.first_name, ''), public.profiles.first_name);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Performance records (calculator result tracking)
-- ---------------------------------------------------------------------------
create table if not exists public.performance_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  calculator_type text not null,
  exercise_name text,
  result_value numeric not null,
  result_unit text,
  created_at timestamptz not null default now()
);

alter table public.performance_records
  add column if not exists exercise_name text;

create index if not exists performance_records_user_calc_idx
  on public.performance_records (user_id, calculator_type, created_at desc);

create index if not exists performance_records_user_calc_exercise_idx
  on public.performance_records (user_id, calculator_type, exercise_name, created_at desc);

alter table public.performance_records enable row level security;

drop policy if exists "Users can read own performance records"
  on public.performance_records;
create policy "Users can read own performance records"
  on public.performance_records for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own performance records"
  on public.performance_records;
create policy "Users can insert own performance records"
  on public.performance_records for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own performance records"
  on public.performance_records;
create policy "Users can delete own performance records"
  on public.performance_records for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Shared calculator defaults (age, weight, height, units, etc.)
-- ---------------------------------------------------------------------------
create table if not exists public.user_defaults (
  user_id uuid primary key references auth.users (id) on delete cascade,
  defaults jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_defaults enable row level security;

drop policy if exists "Users can read own defaults" on public.user_defaults;
create policy "Users can read own defaults"
  on public.user_defaults for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own defaults" on public.user_defaults;
create policy "Users can insert own defaults"
  on public.user_defaults for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own defaults" on public.user_defaults;
create policy "Users can update own defaults"
  on public.user_defaults for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own defaults" on public.user_defaults;
create policy "Users can delete own defaults"
  on public.user_defaults for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Leaderboard Name (optional, private — Stage 1 foundation)
-- Row absent = no Leaderboard Name. No public/cross-user read policies.
-- ---------------------------------------------------------------------------
create table if not exists public.leaderboard_profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  leaderboard_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint leaderboard_profiles_name_length
    check (char_length(leaderboard_name) between 3 and 24),
  constraint leaderboard_profiles_name_charset
    check (leaderboard_name ~ '^[A-Za-z0-9_-]+$')
);

create unique index if not exists leaderboard_profiles_name_ci_idx
  on public.leaderboard_profiles (lower(leaderboard_name));

alter table public.leaderboard_profiles enable row level security;

drop policy if exists "Users can read own leaderboard profile"
  on public.leaderboard_profiles;
create policy "Users can read own leaderboard profile"
  on public.leaderboard_profiles for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own leaderboard profile"
  on public.leaderboard_profiles;
create policy "Users can insert own leaderboard profile"
  on public.leaderboard_profiles for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own leaderboard profile"
  on public.leaderboard_profiles;
create policy "Users can update own leaderboard profile"
  on public.leaderboard_profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own leaderboard profile"
  on public.leaderboard_profiles;
create policy "Users can delete own leaderboard profile"
  on public.leaderboard_profiles for delete
  using (auth.uid() = user_id);

grant select, insert, update, delete on table public.leaderboard_profiles
  to authenticated;

-- ---------------------------------------------------------------------------
-- Leaderboard shares (Stage 3 — private opt-in projection only)
-- No public SELECT. Requires leaderboard_profiles name (enforced by trigger).
-- Full DDL mirrored in migrations/003_leaderboard_shares.sql.
-- ---------------------------------------------------------------------------
create table if not exists public.leaderboard_shares (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  source_record_id uuid references public.performance_records (id) on delete set null,
  board_key text not null,
  calculator_type text not null,
  exercise_name text not null,
  result_value numeric not null,
  result_unit text,
  higher_is_better boolean not null,
  rank_value numeric not null default 0,
  display_name text not null default 'pending',
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

create index if not exists leaderboard_shares_user_idx
  on public.leaderboard_shares (user_id);

create index if not exists leaderboard_shares_active_board_rank_idx
  on public.leaderboard_shares (board_key, is_active, rank_value desc);

create index if not exists leaderboard_shares_active_board_shared_idx
  on public.leaderboard_shares (board_key, is_active, shared_at desc);

create index if not exists leaderboard_shares_active_board_week_rank_idx
  on public.leaderboard_shares (board_key, is_active, period_week, rank_value desc);

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
        ('mykinesoscore', 'FPC Score', 'Overall FPC Score', true),
        ('strength:Bench Press', 'strength', 'Bench Press', true),
        ('strength:Squat', 'strength', 'Squat', true),
        ('strength:Deadlift', 'strength', 'Deadlift', true),
        ('strength:SBD Total', 'strength', 'SBD Total', true),
        ('running:Mile', 'running', 'Mile', false),
        ('running:1.5 Mile', 'running', '1.5 Mile', false),
        ('running:2 Mile', 'running', '2 Mile', false),
        ('running:5K', 'running', '5K', false),
        ('running:5 Mile', 'running', '5 Mile', false),
        ('running:10K', 'running', '10K', false),
        ('running:10 Mile', 'running', '10 Mile', false),
        ('running:Half Marathon', 'running', 'Half Marathon', false),
        ('running:Marathon', 'running', 'Marathon', false),
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
    -- (includes FK ON DELETE SET NULL clearing source_record_id on inactive shares).
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

-- Stage 7: Private Habit Tracker foundation (habits + daily checkins).
-- Idempotent — safe to re-run in Supabase Dashboard → SQL Editor.
--
-- Additive only:
--   * does NOT modify performance_records / leaderboard tables / public RPC
--   * no public-read policies
--   * no Stage 8 sharing columns
--
-- Extends delete_own_account() to remove habit_checkins + habits.

-- ---------------------------------------------------------------------------
-- habits: user's selected routine items
-- ---------------------------------------------------------------------------
create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  habit_key text not null,
  habit_name text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint habits_key_nonempty check (char_length(btrim(habit_key)) > 0),
  constraint habits_name_nonempty check (char_length(btrim(habit_name)) > 0),
  constraint habits_user_key_unique unique (user_id, habit_key)
);

create index if not exists habits_user_active_sort_idx
  on public.habits (user_id, is_active, sort_order);

alter table public.habits enable row level security;

drop policy if exists "Users can read own habits" on public.habits;
create policy "Users can read own habits"
  on public.habits for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own habits" on public.habits;
create policy "Users can insert own habits"
  on public.habits for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own habits" on public.habits;
create policy "Users can update own habits"
  on public.habits for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own habits" on public.habits;
create policy "Users can delete own habits"
  on public.habits for delete
  using (auth.uid() = user_id);

grant select, insert, update, delete on table public.habits to authenticated;

-- ---------------------------------------------------------------------------
-- habit_checkins: one completion state per habit per local calendar date
-- ---------------------------------------------------------------------------
create table if not exists public.habit_checkins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  habit_id uuid not null references public.habits (id) on delete cascade,
  checkin_date date not null,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint habit_checkins_user_habit_date_unique
    unique (user_id, habit_id, checkin_date)
);

create index if not exists habit_checkins_user_date_idx
  on public.habit_checkins (user_id, checkin_date desc);

create index if not exists habit_checkins_habit_date_idx
  on public.habit_checkins (habit_id, checkin_date desc);

-- Ensure checkins always belong to the same user as the habit row.
create or replace function public.habit_checkins_before_write()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  habit_owner uuid;
begin
  if auth.uid() is null or new.user_id <> auth.uid() then
    raise exception 'Not allowed to write habit checkins for another user'
      using errcode = '42501';
  end if;

  select h.user_id into habit_owner
  from public.habits h
  where h.id = new.habit_id;

  if habit_owner is null then
    raise exception 'Habit was not found'
      using errcode = 'P0001';
  end if;

  if habit_owner <> new.user_id then
    raise exception 'Habit checkin must reference your own habit'
      using errcode = '42501';
  end if;

  new.updated_at := now();
  if tg_op = 'INSERT' and new.created_at is null then
    new.created_at := now();
  end if;

  return new;
end;
$$;

drop trigger if exists habit_checkins_before_write on public.habit_checkins;
create trigger habit_checkins_before_write
  before insert or update on public.habit_checkins
  for each row
  execute function public.habit_checkins_before_write();

alter table public.habit_checkins enable row level security;

drop policy if exists "Users can read own habit checkins"
  on public.habit_checkins;
create policy "Users can read own habit checkins"
  on public.habit_checkins for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own habit checkins"
  on public.habit_checkins;
create policy "Users can insert own habit checkins"
  on public.habit_checkins for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own habit checkins"
  on public.habit_checkins;
create policy "Users can update own habit checkins"
  on public.habit_checkins for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own habit checkins"
  on public.habit_checkins;
create policy "Users can delete own habit checkins"
  on public.habit_checkins for delete
  using (auth.uid() = user_id);

grant select, insert, update, delete on table public.habit_checkins
  to authenticated;

-- Deletes the signed-in auth user (explicit child cleanup, then auth.users).
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
  delete from public.fitness_score_snapshots where user_id = uid;
  delete from public.performance_records where user_id = uid;
  delete from public.user_defaults where user_id = uid;
  delete from public.profiles where id = uid;
  delete from auth.users where id = uid;
end;
$$;

revoke all on function public.delete_own_account() from public;
grant execute on function public.delete_own_account() to authenticated;

-- ---------------------------------------------------------------------------
-- Stage 5: Public leaderboard read (narrow RPC — see migrations/004_*.sql)
-- ---------------------------------------------------------------------------
create or replace function public.get_public_leaderboard(
  p_board_key text,
  p_period text default 'all_time'
)
returns table (
  rank bigint,
  leaderboard_name text,
  board_key text,
  result_value numeric,
  result_unit text,
  higher_is_better boolean
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_period text := lower(btrim(coalesce(p_period, 'all_time')));
  v_board text := btrim(coalesce(p_board_key, ''));
  -- Monday 00:00:00 UTC of the current ISO week (timestamptz).
  v_week_start timestamptz :=
    date_trunc('week', timezone('UTC', now())) at time zone 'UTC';
  v_board_ok boolean;
begin
  if v_period not in ('all_time', 'this_week') then
    raise exception 'Invalid leaderboard period'
      using errcode = '22023';
  end if;

  if v_board = '' then
    raise exception 'Invalid leaderboard board'
      using errcode = '22023';
  end if;

  select exists (
    select 1
    from (
      values
        ('mykinesoscore'),
        ('strength:Bench Press'),
        ('strength:Squat'),
        ('strength:Deadlift'),
        ('strength:SBD Total'),
        ('running:Mile'),
        ('running:1.5 Mile'),
        ('running:2 Mile'),
        ('running:5K'),
        ('running:5 Mile'),
        ('running:10K'),
        ('running:10 Mile'),
        ('running:Half Marathon'),
        ('running:Marathon'),
        ('assessment:air-force-pfra'),
        ('assessment:air-force-pfa'),
        ('assessment:army-aft'),
        ('assessment:marine-pft'),
        ('assessment:navy-prt'),
        ('fitness:max-pushups'),
        ('fitness:max-pullups'),
        ('fitness:fran-rx'),
        ('fitness:fran-scaled'),
        ('fitness:murph-rx'),
        ('fitness:murph-scaled'),
        ('fitness:cindy')
    ) as allowed(board_key)
    where allowed.board_key = v_board
  )
  into v_board_ok;

  if not v_board_ok then
    raise exception 'Invalid leaderboard board'
      using errcode = '22023';
  end if;

  return query
  with eligible as (
    select
      p.leaderboard_name as name,
      s.board_key as bkey,
      s.result_value as value,
      s.result_unit as unit,
      s.higher_is_better as hib,
      s.rank_value as rvalue
    from public.leaderboard_shares s
    inner join public.leaderboard_profiles p
      on p.user_id = s.user_id
    where s.is_active = true
      and s.board_key = v_board
      and char_length(btrim(p.leaderboard_name)) > 0
      and public.leaderboard_share_target_allowed(
        s.board_key,
        s.calculator_type,
        s.exercise_name,
        s.higher_is_better
      )
      and (
        v_period = 'all_time'
        -- Posted during the current UTC calendar week (Mon 00:00 → next Mon).
        or s.shared_at >= v_week_start
      )
  ),
  ranked as (
    select
      -- Rank by score only so equal values tie; name is display order below.
      dense_rank() over (
        order by e.rvalue desc
      ) as rnk,
      e.name,
      e.bkey,
      e.value,
      e.unit,
      e.hib
    from eligible e
  )
  select
    ranked.rnk,
    ranked.name,
    ranked.bkey,
    ranked.value,
    ranked.unit,
    ranked.hib
  from ranked
  order by ranked.rnk asc, lower(ranked.name) asc
  limit 100;
end;
$$;

revoke all on function public.get_public_leaderboard(text, text) from public;
grant execute on function public.get_public_leaderboard(text, text)
  to anon, authenticated;

comment on function public.get_public_leaderboard(text, text) is
  'Public leaderboard read. This Week = shared_at in current UTC Mon–Sun week; All Time = all active shares. Equal scores dense-rank tie.';
-- ---------------------------------------------------------------------------
-- Stage 8: Habit streak sharing
-- ---------------------------------------------------------------------------
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
create or replace function public.get_public_habit_streaks(
  p_period text default 'all_time'
)
returns table (
  rank bigint,
  leaderboard_name text,
  streak integer
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
      s.streak as streak_value
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
      e.streak_value
    from eligible e
  )
  select
    ranked.rnk,
    ranked.name,
    ranked.streak_value
  from ranked
  order by ranked.rnk asc, lower(ranked.name) asc
  limit 100;
end;
$$;

revoke all on function public.get_public_habit_streaks(text) from public;
grant execute on function public.get_public_habit_streaks(text)
  to anon, authenticated;

comment on function public.get_public_habit_streaks(text) is
  'Stage 8 public habit streak board. Returns only rank, leaderboard_name, streak.';

comment on table public.habit_streak_shares is
  'Stage 8 opt-in public habit streak projection. No habit/check-in details. Own-row RLS; public via RPC only.';

-- ---------------------------------------------------------------------------
-- Stage 9: Private fitness_score_snapshots (see migrations/007_*.sql)
-- ---------------------------------------------------------------------------
create table if not exists public.fitness_score_snapshots (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  source_record_id uuid not null references public.performance_records (id)
    on delete cascade,
  fitness_score integer not null,
  strength_score integer not null,
  running_score integer not null,
  created_at timestamptz not null default now(),
  constraint fitness_score_snapshots_source_unique unique (source_record_id),
  constraint fitness_score_snapshots_fitness_range
    check (fitness_score >= 0 and fitness_score <= 100),
  constraint fitness_score_snapshots_strength_range
    check (strength_score >= 0 and strength_score <= 100),
  constraint fitness_score_snapshots_running_range
    check (running_score >= 0 and running_score <= 100)
);

create index if not exists fitness_score_snapshots_user_created_idx
  on public.fitness_score_snapshots (user_id, created_at desc);

alter table public.fitness_score_snapshots enable row level security;

drop policy if exists "Users can read own fitness score snapshots"
  on public.fitness_score_snapshots;
create policy "Users can read own fitness score snapshots"
  on public.fitness_score_snapshots for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own fitness score snapshots"
  on public.fitness_score_snapshots;
create policy "Users can insert own fitness score snapshots"
  on public.fitness_score_snapshots for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own fitness score snapshots"
  on public.fitness_score_snapshots;
create policy "Users can delete own fitness score snapshots"
  on public.fitness_score_snapshots for delete
  using (auth.uid() = user_id);

-- Supabase default privileges may grant broad table DML on CREATE.
-- Explicit least privilege: authenticated SELECT/INSERT/DELETE only.
revoke all on table public.fitness_score_snapshots from public;
revoke all on table public.fitness_score_snapshots from anon;
revoke all on table public.fitness_score_snapshots from authenticated;

grant select, insert, delete
on table public.fitness_score_snapshots
to authenticated;

comment on table public.fitness_score_snapshots is
  'Stage 9 private myKinesoScore snapshots (composite + strength + running). Own-row RLS; awards derived client-side; never public.';

-- ===========================================================================
-- Stage 10: Production hardening (mirrors migrations/008_stage10_hardening.sql)
-- ===========================================================================

-- Privilege hardening — older private tables
revoke all on table public.profiles from public;
revoke all on table public.profiles from anon;
revoke all on table public.profiles from authenticated;
grant select, insert, update, delete on table public.profiles to authenticated;

revoke all on table public.performance_records from public;
revoke all on table public.performance_records from anon;
revoke all on table public.performance_records from authenticated;
grant select, insert, delete on table public.performance_records to authenticated;

revoke all on table public.user_defaults from public;
revoke all on table public.user_defaults from anon;
revoke all on table public.user_defaults from authenticated;
grant select, insert, update, delete on table public.user_defaults to authenticated;

revoke all on table public.leaderboard_profiles from public;
revoke all on table public.leaderboard_profiles from anon;
revoke all on table public.leaderboard_profiles from authenticated;
grant select, insert, update, delete
  on table public.leaderboard_profiles to authenticated;

revoke all on table public.leaderboard_shares from public;
revoke all on table public.leaderboard_shares from anon;
revoke all on table public.leaderboard_shares from authenticated;
grant select, insert, update, delete
  on table public.leaderboard_shares to authenticated;

revoke all on table public.habits from public;
revoke all on table public.habits from anon;
revoke all on table public.habits from authenticated;
grant select, insert, update, delete on table public.habits to authenticated;

revoke all on table public.habit_checkins from public;
revoke all on table public.habit_checkins from anon;
revoke all on table public.habit_checkins from authenticated;
grant select, insert, update, delete
  on table public.habit_checkins to authenticated;

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

-- Reserved Leaderboard Names
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

-- Clear name → deactivate shares
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

-- Write-path rate limits
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

  if v_skip = '1' then
    return coalesce(new, old);
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

-- ===========================================================================
-- Stage 10 correction: performance record delete → deactivate linked shares
-- (mirrors migrations/009_performance_share_lifecycle.sql)
-- ===========================================================================

create or replace function public.performance_records_before_delete_deactivate_shares()
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
  where s.source_record_id = old.id
    and s.is_active = true;

  return old;
end;
$$;

drop trigger if exists performance_records_before_delete_deactivate_shares
  on public.performance_records;
create trigger performance_records_before_delete_deactivate_shares
  before delete on public.performance_records
  for each row
  execute function public.performance_records_before_delete_deactivate_shares();

revoke all on function public.performance_records_before_delete_deactivate_shares()
  from public;
revoke all on function public.performance_records_before_delete_deactivate_shares()
  from anon;
revoke all on function public.performance_records_before_delete_deactivate_shares()
  from authenticated;

comment on function public.performance_records_before_delete_deactivate_shares() is
  'Stage 10 correction: deleting a performance record deactivates leaderboard_shares linked via source_record_id.';

-- ===========================================================================
-- Own-row performance delete RPC (snapshot + record; mirrors 011)
-- ===========================================================================

create or replace function public.delete_own_performance_record(p_record_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  deleted_id uuid;
  owned boolean;
begin
  if uid is null then
    raise exception 'Not authenticated' using errcode = '42501';
  end if;

  if p_record_id is null then
    raise exception 'Missing result id.' using errcode = '22023';
  end if;

  select exists (
    select 1
    from public.performance_records pr
    where pr.id = p_record_id
      and pr.user_id = uid
  ) into owned;

  if not owned then
    raise exception 'Could not delete that result. Refresh your history and try again.'
      using errcode = 'P0001';
  end if;

  perform set_config('request.skip_share_rate_limit', '1', true);

  update public.leaderboard_shares s
  set is_active = false,
      source_record_id = null,
      updated_at = now()
  where s.source_record_id = p_record_id
    and s.user_id = uid;

  delete from public.fitness_score_snapshots
  where source_record_id = p_record_id;

  delete from public.performance_records
  where id = p_record_id
    and user_id = uid
  returning id into deleted_id;

  if deleted_id is null then
    raise exception 'Could not delete that result. Refresh your history and try again.'
      using errcode = 'P0001';
  end if;

  return deleted_id;
end;
$$;

revoke all on function public.delete_own_performance_record(uuid) from public;
revoke all on function public.delete_own_performance_record(uuid) from anon;
grant execute on function public.delete_own_performance_record(uuid) to authenticated;

comment on function public.delete_own_performance_record(uuid) is
  'Deletes the caller''s performance_records row and any linked fitness_score_snapshots.';
