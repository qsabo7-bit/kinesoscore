-- Stage 10 correction: deactivate leaderboard shares when their source
-- performance_records row is deleted.
-- Idempotent — safe to re-run in Supabase Dashboard → SQL Editor.
--
-- Why BEFORE DELETE (not AFTER):
--   leaderboard_shares.source_record_id is ON DELETE SET NULL.
--   By AFTER DELETE time, source_record_id is already null, so the share
--   cannot be matched. BEFORE DELETE still sees source_record_id = OLD.id.
--
-- Account deletion:
--   delete_own_account removes leaderboard_shares before performance_records,
--   so this trigger is a no-op during normal account deletion.
--   When auth.uid() is null (raw auth.users cascade), skip updates; share rows
--   are removed by FK cascade.
--
-- Does NOT:
--   * delete leaderboard_profiles
--   * delete share history rows (deactivates only)
--   * change public RPC payloads / LIMIT 100
--   * change habit streak sharing, awards, or snapshots

create or replace function public.performance_records_before_delete_deactivate_shares()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Cascade deletes from auth.users may run without a JWT; shares are removed
  -- by FK cascade in that path.
  if auth.uid() is null then
    return old;
  end if;

  -- Skip Stage 10 share write rate limits for this lifecycle path.
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
