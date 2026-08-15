-- Groups: admins can delete any member activity logs and assessment shares.
-- Idempotent. Additive on 024–032.

-- ---------------------------------------------------------------------------
-- RLS: activity logs — owner or group admin may delete
-- ---------------------------------------------------------------------------
drop policy if exists "Members can delete own group activity logs"
  on public.group_activity_logs;
drop policy if exists "Members or admins can delete group activity logs"
  on public.group_activity_logs;
create policy "Members or admins can delete group activity logs"
  on public.group_activity_logs for delete
  to authenticated
  using (
    public.is_group_member(group_id)
    and (
      auth.uid() = user_id
      or public.is_group_admin(group_id)
    )
  );

-- ---------------------------------------------------------------------------
-- RLS: assessment shares — owner or group admin may delete
-- ---------------------------------------------------------------------------
drop policy if exists "Members can delete own group assessment shares"
  on public.group_assessment_shares;
drop policy if exists "Members or admins can delete group assessment shares"
  on public.group_assessment_shares;
create policy "Members or admins can delete group assessment shares"
  on public.group_assessment_shares for delete
  to authenticated
  using (
    public.is_group_member(group_id)
    and (
      auth.uid() = user_id
      or public.is_group_admin(group_id)
    )
  );

-- ---------------------------------------------------------------------------
-- Delete one activity log (owner or admin)
-- ---------------------------------------------------------------------------
create or replace function public.delete_group_activity_log(p_log_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  target public.group_activity_logs;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  select l.* into target
  from public.group_activity_logs l
  where l.id = p_log_id;

  if target.id is null then
    raise exception 'Activity log not found';
  end if;

  if not public.is_group_member(target.group_id) then
    raise exception 'Not a member of this group';
  end if;

  if target.user_id is distinct from uid
     and not public.is_group_admin(target.group_id) then
    raise exception 'Only the owner or a group admin can delete this log';
  end if;

  delete from public.group_activity_logs where id = p_log_id;
end;
$$;

revoke all on function public.delete_group_activity_log(uuid) from public;
grant execute on function public.delete_group_activity_log(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Admin: clear one member's week total for an activity type (leaderboard)
-- ---------------------------------------------------------------------------
create or replace function public.delete_group_member_week_activity(
  p_group_id uuid,
  p_user_id uuid,
  p_activity_type_id uuid,
  p_week_start date,
  p_week_end date
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  removed integer := 0;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if not public.is_group_admin(p_group_id) then
    raise exception 'Only group admins can remove member leaderboard results';
  end if;

  if p_user_id is null or p_activity_type_id is null then
    raise exception 'Member and activity are required';
  end if;

  if p_week_start is null or p_week_end is null or p_week_end < p_week_start then
    raise exception 'Valid week range is required';
  end if;

  delete from public.group_activity_logs
  where group_id = p_group_id
    and user_id = p_user_id
    and activity_type_id = p_activity_type_id
    and activity_date >= p_week_start
    and activity_date <= p_week_end;

  get diagnostics removed = row_count;
  return removed;
end;
$$;

revoke all on function public.delete_group_member_week_activity(
  uuid, uuid, uuid, date, date
) from public;
grant execute on function public.delete_group_member_week_activity(
  uuid, uuid, uuid, date, date
) to authenticated;

-- ---------------------------------------------------------------------------
-- Remove assessment share from group board (owner or admin)
-- ---------------------------------------------------------------------------
create or replace function public.remove_group_assessment_share(
  p_group_id uuid,
  p_user_id uuid,
  p_board_key text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  cleaned text := btrim(coalesce(p_board_key, ''));
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if not public.is_group_member(p_group_id) then
    raise exception 'Not a member of this group';
  end if;

  if cleaned = '' or p_user_id is null then
    raise exception 'Board and member are required';
  end if;

  if p_user_id is distinct from uid
     and not public.is_group_admin(p_group_id) then
    raise exception 'Only the owner or a group admin can remove this result';
  end if;

  delete from public.group_assessment_shares
  where group_id = p_group_id
    and user_id = p_user_id
    and board_key = cleaned;
end;
$$;

revoke all on function public.remove_group_assessment_share(uuid, uuid, text)
  from public;
grant execute on function public.remove_group_assessment_share(uuid, uuid, text)
  to authenticated;
