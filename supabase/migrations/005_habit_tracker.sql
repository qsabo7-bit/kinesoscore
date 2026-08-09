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

-- ---------------------------------------------------------------------------
-- Account deletion: habit data before existing cleanup chain
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

comment on table public.habits is
  'Stage 7 private Habit Tracker selections. No public read. Soft-deactivate preserves checkin history.';
comment on table public.habit_checkins is
  'Stage 7 private daily habit completion. One row per user/habit/local date. No public read.';
