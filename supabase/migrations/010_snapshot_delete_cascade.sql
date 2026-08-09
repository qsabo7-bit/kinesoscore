-- Ensure myKinesoScore history deletes are not blocked by fitness_score_snapshots.
-- Idempotent — safe to re-run in Supabase Dashboard → SQL Editor.
--
-- Why:
--   CREATE TABLE IF NOT EXISTS does not alter an existing FK. If the table was
--   created without ON DELETE CASCADE (or RLS/grants were incomplete), deleting
--   a performance_records row that has a snapshot fails — only myKinesoScore.
--
-- Does NOT change calculator formulas or public leaderboard RPCs.

-- ---------------------------------------------------------------------------
-- FK: source_record_id → performance_records(id) ON DELETE CASCADE
-- ---------------------------------------------------------------------------
do $$
declare
  conname text;
begin
  select c.conname into conname
  from pg_constraint c
  join pg_class rel on rel.oid = c.conrelid
  join pg_namespace nsp on nsp.oid = rel.relnamespace
  where nsp.nspname = 'public'
    and rel.relname = 'fitness_score_snapshots'
    and c.contype = 'f'
    and pg_get_constraintdef(c.oid) ilike '%source_record_id%performance_records%';

  if conname is not null then
    execute format(
      'alter table public.fitness_score_snapshots drop constraint %I',
      conname
    );
  end if;
end $$;

alter table public.fitness_score_snapshots
  add constraint fitness_score_snapshots_source_record_id_fkey
  foreign key (source_record_id)
  references public.performance_records (id)
  on delete cascade;

-- ---------------------------------------------------------------------------
-- Privileges + delete policy (own rows only)
-- ---------------------------------------------------------------------------
alter table public.fitness_score_snapshots enable row level security;

drop policy if exists "Users can delete own fitness score snapshots"
  on public.fitness_score_snapshots;
create policy "Users can delete own fitness score snapshots"
  on public.fitness_score_snapshots for delete
  using (auth.uid() = user_id);

revoke all on table public.fitness_score_snapshots from public;
revoke all on table public.fitness_score_snapshots from anon;
revoke all on table public.fitness_score_snapshots from authenticated;

grant select, insert, delete
on table public.fitness_score_snapshots
to authenticated;
