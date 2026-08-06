-- FPC auth support: profiles + full account deletion
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

-- Deletes the signed-in auth user (cascades to profiles / related rows).
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

  delete from public.performance_records where user_id = uid;
  delete from public.user_defaults where user_id = uid;
  delete from public.profiles where id = uid;
  delete from auth.users where id = uid;
end;
$$;

revoke all on function public.delete_own_account() from public;
grant execute on function public.delete_own_account() to authenticated;
