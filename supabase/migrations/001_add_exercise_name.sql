-- Add exercise_name so each lift/metric keeps an independent history.
-- Run in Supabase → SQL Editor.

alter table public.performance_records
  add column if not exists exercise_name text;

create index if not exists performance_records_user_calc_exercise_idx
  on public.performance_records (user_id, calculator_type, exercise_name, created_at desc);

-- Optional: tag legacy strength rows so they remain visible under a generic series.
update public.performance_records
set exercise_name = 'Legacy'
where exercise_name is null;
