-- Groups overview defaults:
--   * New groups: only the first 3 seed activities show on Overview
--   * Existing groups still on the all-on default: trim to first 3
--   * Column default becomes false so new custom activities stay off Overview
-- Idempotent. Additive on 024–030.

-- ---------------------------------------------------------------------------
-- Column default: opt-in for Overview
-- ---------------------------------------------------------------------------
alter table public.group_activity_types
  alter column show_on_overview set default false;

-- ---------------------------------------------------------------------------
-- Seed: first 3 on Overview, rest off (logging + leaderboard still on)
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
    group_id, name, unit, higher_is_better, is_enabled,
    show_on_overview, show_on_leaderboard, weekly_goal, sort_order
  )
  values
    (p_group_id, 'Push-ups', 'reps', true, true, true, true, 500, 10),
    (p_group_id, 'Sit-ups', 'reps', true, true, true, true, 500, 20),
    (p_group_id, 'Pull-ups', 'reps', true, true, true, true, 100, 30),
    (p_group_id, 'Running', 'miles', true, true, false, true, 10, 40),
    (p_group_id, 'Squats', 'reps', true, true, false, true, 500, 50),
    (p_group_id, 'Plank', 'minutes', true, true, false, true, 30, 60)
  on conflict do nothing;
end;
$$;

-- ---------------------------------------------------------------------------
-- Backfill groups still on the all-on Overview default (>=4 picks, every
-- enabled activity on Overview) down to the first 3 by sort_order.
-- Groups that already customized Overview picks are left alone.
-- ---------------------------------------------------------------------------
with enabled as (
  select
    id,
    group_id,
    show_on_overview,
    row_number() over (
      partition by group_id
      order by sort_order nulls last, created_at, name
    ) as rn,
    count(*) over (partition by group_id) as enabled_n,
    count(*) filter (where show_on_overview) over (partition by group_id)
      as overview_n
  from public.group_activity_types
  where is_enabled
),
crowded as (
  select group_id
  from enabled
  group by group_id
  having max(enabled_n) >= 4
     and max(overview_n) = max(enabled_n)
)
update public.group_activity_types t
set show_on_overview = (e.rn <= 3)
from enabled e
inner join crowded c on c.group_id = e.group_id
where t.id = e.id
  and t.show_on_overview is distinct from (e.rn <= 3);
