-- Stage 9: Private fitness_score_snapshots on myKinesoScore save + awards foundation.
-- Idempotent — safe to re-run in Supabase Dashboard → SQL Editor.
--
-- Privacy:
--   * Own-row RLS only (authenticated)
--   * No anon/public table privileges
--   * Never exposed on public leaderboard RPCs
--   * Awards are derived in the client from stored component scores
--
-- Does NOT change calculator formulas or public leaderboard payloads.

-- ---------------------------------------------------------------------------
-- Snapshots (append-only; one row per myKinesoScore performance_records save)
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

-- ---------------------------------------------------------------------------
-- Account deletion: snapshots before performance_records
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
  delete from public.fitness_score_snapshots where user_id = uid;
  delete from public.performance_records where user_id = uid;
  delete from public.user_defaults where user_id = uid;
  delete from public.profiles where id = uid;
  delete from auth.users where id = uid;
end;
$$;

revoke all on function public.delete_own_account() from public;
grant execute on function public.delete_own_account() to authenticated;
