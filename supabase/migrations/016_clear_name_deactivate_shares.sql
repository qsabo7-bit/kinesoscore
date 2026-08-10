-- Fix: clearing Leaderboard Name failed when the user had active shares.
--
-- Stage 10 after-delete trigger deactivates leaderboard_shares, but
-- leaderboard_shares_before_write required a live Leaderboard Name on every
-- UPDATE — including deactivation — so the clear rolled back.

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
    -- (includes clear Leaderboard Name → deactivate shares after profile delete).
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

comment on function public.leaderboard_shares_before_write() is
  'Validates leaderboard share writes. Deactivation allowed without a live Leaderboard Name so clear-name can deactivate shares.';
