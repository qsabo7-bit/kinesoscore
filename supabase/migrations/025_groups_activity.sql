-- Groups beta: weekly activity types + logs.
-- Idempotent — safe to re-run in Supabase Dashboard → SQL Editor.
--
-- Additive only on top of 024_groups_beta:
--   * group_activity_types (per-group catalog; disable instead of delete)
--   * group_activity_logs (member-owned amounts by date)
--   * membership-scoped RLS
--   * default types seeded on group create + backfill for existing groups
--   * extends delete_own_account() for activity logs
-- Does not add formal assessments or chart UIs.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table if not exists public.group_activity_types (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups (id) on delete cascade,
  name text not null,
  unit text not null,
  higher_is_better boolean not null default true,
  is_enabled boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  constraint group_activity_types_name_nonempty
    check (char_length(btrim(name)) between 1 and 60),
  constraint group_activity_types_unit_nonempty
    check (char_length(btrim(unit)) between 1 and 24)
);

create unique index if not exists group_activity_types_group_name_ci_uidx
  on public.group_activity_types (group_id, lower(btrim(name)));

create index if not exists group_activity_types_group_enabled_idx
  on public.group_activity_types (group_id, is_enabled, sort_order);

create table if not exists public.group_activity_logs (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  activity_type_id uuid not null references public.group_activity_types (id) on delete restrict,
  amount numeric not null,
  activity_date date not null,
  created_at timestamptz not null default now(),
  constraint group_activity_logs_amount_positive check (amount > 0)
);

create index if not exists group_activity_logs_group_date_idx
  on public.group_activity_logs (group_id, activity_date desc);

create index if not exists group_activity_logs_user_date_idx
  on public.group_activity_logs (user_id, activity_date desc);

create index if not exists group_activity_logs_type_date_idx
  on public.group_activity_logs (activity_type_id, activity_date desc);

-- ---------------------------------------------------------------------------
-- Seed defaults
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
    group_id, name, unit, higher_is_better, is_enabled, sort_order
  )
  values
    (p_group_id, 'Push-ups', 'reps', true, true, 10),
    (p_group_id, 'Sit-ups', 'reps', true, true, 20),
    (p_group_id, 'Pull-ups', 'reps', true, true, 30),
    (p_group_id, 'Running', 'miles', true, true, 40),
    (p_group_id, 'Squats', 'reps', true, true, 50),
    (p_group_id, 'Plank', 'seconds', true, true, 60)
  on conflict do nothing;
end;
$$;

revoke all on function public.seed_default_group_activity_types(uuid) from public;

-- Keep creator membership + seed activity types on new groups.
create or replace function public.groups_after_insert_add_creator()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.group_members (group_id, user_id, role)
  values (new.id, new.created_by, 'admin')
  on conflict (group_id, user_id) do nothing;

  perform public.seed_default_group_activity_types(new.id);
  return new;
end;
$$;

-- Backfill defaults for existing groups that have no activity types yet.
do $$
declare
  g record;
begin
  for g in
    select gr.id
    from public.groups gr
    where not exists (
      select 1
      from public.group_activity_types t
      where t.group_id = gr.id
    )
  loop
    perform public.seed_default_group_activity_types(g.id);
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- Write guards
-- ---------------------------------------------------------------------------
create or replace function public.group_activity_logs_before_write()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  type_group uuid;
  type_enabled boolean;
begin
  if tg_op = 'INSERT' or tg_op = 'UPDATE' then
    if new.amount is null or new.amount <= 0 then
      raise exception 'Activity amount must be greater than zero';
    end if;

    if new.user_id is distinct from auth.uid() then
      raise exception 'You can only log activity for yourself';
    end if;

    if not public.is_group_member(new.group_id) then
      raise exception 'Not a member of this group';
    end if;

    select t.group_id, t.is_enabled
      into type_group, type_enabled
    from public.group_activity_types t
    where t.id = new.activity_type_id;

    if type_group is null then
      raise exception 'Unknown activity type';
    end if;

    if type_group is distinct from new.group_id then
      raise exception 'Activity type does not belong to this group';
    end if;

    if tg_op = 'INSERT' and not coalesce(type_enabled, false) then
      raise exception 'That activity is disabled for this group';
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists group_activity_logs_before_write on public.group_activity_logs;
create trigger group_activity_logs_before_write
  before insert or update on public.group_activity_logs
  for each row
  execute function public.group_activity_logs_before_write();

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.group_activity_types enable row level security;
alter table public.group_activity_logs enable row level security;

drop policy if exists "Members can read group activity types"
  on public.group_activity_types;
create policy "Members can read group activity types"
  on public.group_activity_types for select
  to authenticated
  using (public.is_group_member(group_id));

drop policy if exists "Admins can create group activity types"
  on public.group_activity_types;
create policy "Admins can create group activity types"
  on public.group_activity_types for insert
  to authenticated
  with check (public.is_group_admin(group_id));

drop policy if exists "Admins can update group activity types"
  on public.group_activity_types;
create policy "Admins can update group activity types"
  on public.group_activity_types for update
  to authenticated
  using (public.is_group_admin(group_id))
  with check (public.is_group_admin(group_id));

-- No DELETE policy: disable / archive via is_enabled instead.

drop policy if exists "Members can read group activity logs"
  on public.group_activity_logs;
create policy "Members can read group activity logs"
  on public.group_activity_logs for select
  to authenticated
  using (public.is_group_member(group_id));

drop policy if exists "Members can insert own group activity logs"
  on public.group_activity_logs;
create policy "Members can insert own group activity logs"
  on public.group_activity_logs for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and public.is_group_member(group_id)
  );

drop policy if exists "Members can update own group activity logs"
  on public.group_activity_logs;
create policy "Members can update own group activity logs"
  on public.group_activity_logs for update
  to authenticated
  using (
    auth.uid() = user_id
    and public.is_group_member(group_id)
  )
  with check (
    auth.uid() = user_id
    and public.is_group_member(group_id)
  );

drop policy if exists "Members can delete own group activity logs"
  on public.group_activity_logs;
create policy "Members can delete own group activity logs"
  on public.group_activity_logs for delete
  to authenticated
  using (
    auth.uid() = user_id
    and public.is_group_member(group_id)
  );

grant select on table public.group_activity_types to authenticated;
grant insert, update on table public.group_activity_types to authenticated;
grant select, insert, update, delete on table public.group_activity_logs
  to authenticated;

-- ---------------------------------------------------------------------------
-- Admin RPCs (clearer errors than raw table writes)
-- ---------------------------------------------------------------------------
create or replace function public.create_group_activity_type(
  p_group_id uuid,
  p_name text,
  p_unit text,
  p_higher_is_better boolean default true
)
returns public.group_activity_types
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  cleaned_name text := btrim(coalesce(p_name, ''));
  cleaned_unit text := btrim(coalesce(p_unit, ''));
  next_sort integer;
  created public.group_activity_types;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if not public.is_group_admin(p_group_id) then
    raise exception 'Only group admins can manage activities';
  end if;

  if char_length(cleaned_name) < 1 or char_length(cleaned_name) > 60 then
    raise exception 'Activity name must be between 1 and 60 characters';
  end if;

  if char_length(cleaned_unit) < 1 or char_length(cleaned_unit) > 24 then
    raise exception 'Activity unit must be between 1 and 24 characters';
  end if;

  select coalesce(max(t.sort_order), 0) + 10
    into next_sort
  from public.group_activity_types t
  where t.group_id = p_group_id;

  insert into public.group_activity_types (
    group_id, name, unit, higher_is_better, is_enabled, sort_order
  )
  values (
    p_group_id,
    cleaned_name,
    cleaned_unit,
    coalesce(p_higher_is_better, true),
    true,
    next_sort
  )
  returning * into created;

  return created;
exception
  when unique_violation then
    raise exception 'An activity with that name already exists in this group';
end;
$$;

revoke all on function public.create_group_activity_type(uuid, text, text, boolean)
  from public;
grant execute on function public.create_group_activity_type(uuid, text, text, boolean)
  to authenticated;

create or replace function public.set_group_activity_type_enabled(
  p_activity_type_id uuid,
  p_enabled boolean
)
returns public.group_activity_types
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  target public.group_activity_types;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  select * into target
  from public.group_activity_types t
  where t.id = p_activity_type_id;

  if target.id is null then
    raise exception 'Activity type not found';
  end if;

  if not public.is_group_admin(target.group_id) then
    raise exception 'Only group admins can manage activities';
  end if;

  update public.group_activity_types
  set is_enabled = coalesce(p_enabled, false)
  where id = target.id
  returning * into target;

  return target;
end;
$$;

revoke all on function public.set_group_activity_type_enabled(uuid, boolean)
  from public;
grant execute on function public.set_group_activity_type_enabled(uuid, boolean)
  to authenticated;

-- ---------------------------------------------------------------------------
-- Account deletion
-- ---------------------------------------------------------------------------
create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  perform set_config('request.skip_name_rate_limit', '1', true);
  perform set_config('request.skip_share_rate_limit', '1', true);

  delete from public.write_rate_limit_events where user_id = uid;
  delete from public.habit_streak_shares where user_id = uid;
  delete from public.habit_checkins where user_id = uid;
  delete from public.habits where user_id = uid;
  delete from public.leaderboard_shares where user_id = uid;
  delete from public.leaderboard_profiles where user_id = uid;
  delete from public.fitness_score_snapshots where user_id = uid;
  delete from public.performance_records where user_id = uid;
  delete from public.user_defaults where user_id = uid;
  delete from public.group_activity_logs where user_id = uid;
  delete from public.group_members where user_id = uid;
  delete from public.groups where created_by = uid;
  delete from public.profiles where id = uid;
  delete from auth.users where id = uid;
end;
$$;

revoke all on function public.delete_own_account() from public;
grant execute on function public.delete_own_account() to authenticated;
