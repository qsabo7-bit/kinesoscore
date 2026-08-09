-- Reliable own-row performance delete (myKinesoScore + all calculators).
-- Idempotent — safe to re-run in Supabase Dashboard → SQL Editor.
--
-- Fixes:
--   1) Client DELETE can fail when fitness_score_snapshots still references the
--      row (FK / RLS edge cases). This RPC deletes the snapshot then the record
--      as SECURITY DEFINER after verifying ownership.
--   2) BEFORE DELETE / ON DELETE SET NULL updates leaderboard_shares. The old
--      before_write trigger re-required a Leaderboard Name on those updates, so
--      deletes failed for accounts without a name (often test accounts) while
--      working for accounts that still have one. Inactive-share updates now skip
--      eligibility checks.
--
-- Does NOT change calculator formulas or public leaderboard RPC payloads.

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

    -- Lifecycle / unshare paths must not re-validate name, allowlist, or source:
    --   * is_active true → false (explicit unshare / record delete)
    --   * any update that leaves the row inactive (includes FK ON DELETE SET NULL
    --     clearing source_record_id on already-inactive shares)
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

    new.period_week := (date_trunc('week', new.shared_at at time zone 'UTC'))::date;
    new.updated_at := now();

    if tg_op = 'INSERT' and new.created_at is null then
      new.created_at := now();
    end if;
  end if;

  return new;
end;
$$;

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

  -- Deactivate + detach shares before the row delete so FK SET NULL is a no-op.
  update public.leaderboard_shares s
  set is_active = false,
      source_record_id = null,
      updated_at = now()
  where s.source_record_id = p_record_id
    and s.user_id = uid;

  -- Clear awards snapshot (myKinesoScore). Ownership already verified above.
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
