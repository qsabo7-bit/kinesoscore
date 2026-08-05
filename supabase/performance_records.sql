-- Run this in Supabase → SQL Editor if you only need result tracking.

create table if not exists public.performance_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  calculator_type text not null,
  result_value numeric not null,
  result_unit text,
  created_at timestamptz not null default now()
);

create index if not exists performance_records_user_calc_idx
  on public.performance_records (user_id, calculator_type, created_at desc);

alter table public.performance_records enable row level security;

drop policy if exists "Users can read own performance records"
  on public.performance_records;
create policy "Users can read own performance records"
  on public.performance_records for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own performance records"
  on public.performance_records;
create policy "Users can insert own performance records"
  on public.performance_records for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own performance records"
  on public.performance_records;
create policy "Users can delete own performance records"
  on public.performance_records for delete
  using (auth.uid() = user_id);
