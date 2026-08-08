-- Stage 1: Leaderboard Name foundation (optional, private, own-row only).
-- Idempotent — safe to re-run in Supabase Dashboard → SQL Editor.
--
-- Additive only:
--   * creates public.leaderboard_profiles
--   * own-row RLS (no cross-user / public reads)
--   * extends delete_own_account() cleanup
-- Does not alter profiles, performance_records, user_defaults, or auth flows.
-- Does not publish any data.

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

-- Case-insensitive uniqueness (rejects "Alex" vs "alex").
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

-- PostgREST / authenticated client access (RLS still enforces own-row).
grant select, insert, update, delete on table public.leaderboard_profiles
  to authenticated;

-- Keep delete_own_account aligned with explicit child cleanup (then auth.users).
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
-- Post-apply verification (run manually as a superuser / SQL Editor).
-- Replace the sample UUIDs with real auth.users ids when testing RLS as those users.
-- ---------------------------------------------------------------------------
-- 1) Case-insensitive uniqueness:
--    insert into public.leaderboard_profiles (user_id, leaderboard_name)
--      values ('<user-a>', 'TestRunner');
--    insert into public.leaderboard_profiles (user_id, leaderboard_name)
--      values ('<user-b>', 'testrunner');  -- must fail unique_violation
--
-- 2) Optional (no row required): users without a row keep working; no FK from profiles.
--
-- 3) Clear own name: delete from public.leaderboard_profiles where user_id = auth.uid();
--
-- 4) delete_own_account() must remove leaderboard_profiles for auth.uid() before auth.users.
--
-- 5) Confirm no public/cross-user policy:
--    select polname, cmd, qual, with_check
--    from pg_policies
--    where tablename = 'leaderboard_profiles';
--    -- expect only own-row SELECT/INSERT/UPDATE/DELETE
