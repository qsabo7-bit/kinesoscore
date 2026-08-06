-- Shared calculator defaults for signed-in users.
-- Run in Supabase Dashboard → SQL Editor if not already applied via schema.sql.

create table if not exists public.user_defaults (
  user_id uuid primary key references auth.users (id) on delete cascade,
  defaults jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_defaults enable row level security;

drop policy if exists "Users can read own defaults" on public.user_defaults;
create policy "Users can read own defaults"
  on public.user_defaults for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own defaults" on public.user_defaults;
create policy "Users can insert own defaults"
  on public.user_defaults for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update own defaults" on public.user_defaults;
create policy "Users can update own defaults"
  on public.user_defaults for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own defaults" on public.user_defaults;
create policy "Users can delete own defaults"
  on public.user_defaults for delete
  using (auth.uid() = user_id);
