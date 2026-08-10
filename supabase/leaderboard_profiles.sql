-- Optional Leaderboard Name (private, own-row only).
-- Run in Supabase Dashboard → SQL Editor if not already applied via schema.sql
-- or migrations/002_leaderboard_profiles.sql.
--
-- Stage 1 foundation only — no public reads, no auto-share.

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

-- Stage C: opt-in public award identity (tiers/crown only — never raw scores).
alter table public.leaderboard_profiles
  add column if not exists show_awards_publicly boolean not null default true;
alter table public.leaderboard_profiles
  add column if not exists award_running text;
alter table public.leaderboard_profiles
  add column if not exists award_strength text;
alter table public.leaderboard_profiles
  add column if not exists award_crown boolean not null default false;
alter table public.leaderboard_profiles
  add column if not exists awards_updated_at timestamptz;

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

-- If applying this file alone, also ensure delete_own_account() deletes
-- leaderboard_profiles (see migrations/002_leaderboard_profiles.sql).
