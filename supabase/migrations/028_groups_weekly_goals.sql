-- Groups weekly activity goals (admin-set) for Overview progress.
-- Idempotent. Additive on 024–027.

alter table public.group_activity_types
  add column if not exists weekly_goal numeric
    check (weekly_goal is null or weekly_goal > 0);

create or replace function public.set_group_activity_weekly_goal(
  p_activity_type_id uuid,
  p_weekly_goal numeric
)
returns public.group_activity_types
language plpgsql
security definer
set search_path = public
as $$
declare
  target public.group_activity_types;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated' using errcode = '28000';
  end if;

  select t.*
  into target
  from public.group_activity_types t
  where t.id = p_activity_type_id;

  if target.id is null then
    raise exception 'Activity type not found' using errcode = 'P0002';
  end if;

  if not public.is_group_admin(target.group_id) then
    raise exception 'Only the group admin can set goals' using errcode = '42501';
  end if;

  if p_weekly_goal is not null and p_weekly_goal <= 0 then
    raise exception 'Weekly goal must be greater than zero' using errcode = '22023';
  end if;

  update public.group_activity_types
  set weekly_goal = p_weekly_goal
  where id = p_activity_type_id
  returning * into target;

  return target;
end;
$$;

revoke all on function public.set_group_activity_weekly_goal(uuid, numeric)
  from public;
grant execute on function public.set_group_activity_weekly_goal(uuid, numeric)
  to authenticated;
