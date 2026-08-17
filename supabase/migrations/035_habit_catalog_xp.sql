-- Habit catalog XP updates: meditation + adjusted base XP for pictured habits.
-- Idempotent. Safe after 034_habit_xp.sql.

create or replace function public.habit_base_xp(p_habit_key text)
returns integer
language sql
immutable
as $$
  select case lower(btrim(coalesce(p_habit_key, '')))
    when 'water' then 10
    when 'walk_move' then 12
    when 'screen_limit' then 12
    when 'sleep_7_8' then 15
    when 'protein' then 15
    when 'nature' then 15
    when 'sleep_schedule' then 15
    when 'recovery_day' then 15
    when 'meditation' then 15
    when 'mobility' then 20
    when 'exercise' then 25
    when 'strength' then 30
    else 10
  end;
$$;

revoke all on function public.habit_base_xp(text) from public;
grant execute on function public.habit_base_xp(text) to authenticated;

comment on function public.habit_base_xp(text) is
  'Base habit XP by habit_key. Mirrors src/data/habitCatalog.js baseXp values.';
