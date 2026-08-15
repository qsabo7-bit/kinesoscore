-- Groups UX polish:
--   * default weekly goals on seed + backfill
--   * list_my_groups includes last_activity_at
-- Idempotent. Additive on 024–028.

-- ---------------------------------------------------------------------------
-- Seed defaults with weekly goals (new groups)
-- ---------------------------------------------------------------------------
create or replace function public.seed_default_group_activity_types(p_group_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_group_id is null then
    return;
  end if;

  insert into public.group_activity_types (
    group_id, name, unit, higher_is_better, is_enabled, weekly_goal, sort_order
  )
  values
    (p_group_id, 'Push-ups', 'reps', true, true, 500, 10),
    (p_group_id, 'Sit-ups', 'reps', true, true, 500, 20),
    (p_group_id, 'Pull-ups', 'reps', true, true, 100, 30),
    (p_group_id, 'Running', 'miles', true, true, 10, 40),
    (p_group_id, 'Squats', 'reps', true, true, 500, 50),
    (p_group_id, 'Plank', 'minutes', true, true, 30, 60)
  on conflict do nothing;
end;
$$;

-- Backfill default goals only where still unset (admin may have cleared intentionally —
-- we only fill classic seed names that still have null goals).
update public.group_activity_types
set weekly_goal = case lower(btrim(name))
  when 'push-ups' then 500
  when 'sit-ups' then 500
  when 'pull-ups' then 100
  when 'running' then 10
  when 'squats' then 500
  when 'plank' then 30
  else weekly_goal
end
where weekly_goal is null
  and lower(btrim(name)) in (
    'push-ups', 'sit-ups', 'pull-ups', 'running', 'squats', 'plank'
  );

-- ---------------------------------------------------------------------------
-- list_my_groups: last activity timestamp for home cards
-- ---------------------------------------------------------------------------
drop function if exists public.list_my_groups();

create or replace function public.list_my_groups()
returns table (
  id uuid,
  name text,
  description text,
  invite_code text,
  created_by uuid,
  created_at timestamptz,
  my_role text,
  member_count bigint,
  last_activity_at timestamptz
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  return query
  select
    g.id,
    g.name,
    g.description,
    g.invite_code,
    g.created_by,
    g.created_at,
    mine.role as my_role,
    (
      select count(*)::bigint
      from public.group_members gm
      where gm.group_id = g.id
    ) as member_count,
    (
      select max(l.created_at)
      from public.group_activity_logs l
      where l.group_id = g.id
    ) as last_activity_at
  from public.groups g
  inner join public.group_members mine
    on mine.group_id = g.id
   and mine.user_id = uid
  order by g.created_at desc;
end;
$$;

revoke all on function public.list_my_groups() from public;
grant execute on function public.list_my_groups() to authenticated;
