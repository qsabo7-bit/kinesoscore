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
        ('assessment:navy-prt', 'navy-prt', 'Overall Score', true)
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

    new.period_week := (date_trunc('week', new.shared_at at time zone 'UTC'))::date;
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
  v_week date := (date_trunc('week', timezone('UTC', now())))::date;
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
        ('assessment:navy-prt')
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
        or s.period_week = v_week
      )
  ),
  ranked as (
    select
      dense_rank() over (
        order by e.rvalue desc, lower(e.name) asc
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
