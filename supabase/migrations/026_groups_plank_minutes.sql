-- Groups beta: Plank activity unit → minutes (clearer logging / leaderboard display).
-- Idempotent. Additive only — does not change RLS or other activity types.

update public.group_activity_types
set unit = 'minutes'
where lower(btrim(name)) = 'plank'
  and lower(btrim(unit)) in ('seconds', 'sec', 'secs');

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
    group_id, name, unit, higher_is_better, is_enabled, sort_order
  )
  values
    (p_group_id, 'Push-ups', 'reps', true, true, 10),
    (p_group_id, 'Sit-ups', 'reps', true, true, 20),
    (p_group_id, 'Pull-ups', 'reps', true, true, 30),
    (p_group_id, 'Running', 'miles', true, true, 40),
    (p_group_id, 'Squats', 'reps', true, true, 50),
    (p_group_id, 'Plank', 'minutes', true, true, 60)
  on conflict do nothing;
end;
$$;
