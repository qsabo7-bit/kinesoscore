-- Groups beta: private groups + membership + invite codes.
-- Idempotent — safe to re-run in Supabase Dashboard → SQL Editor.
--
-- Additive only:
--   * creates public.groups + public.group_members
--   * membership-scoped RLS (no "all authenticated can read all groups")
--   * SECURITY DEFINER helpers/RPCs for invite join + member directory
--   * reuses leaderboard_profiles / profiles.first_name (no second username system)
--   * extends delete_own_account() cleanup
-- Does not add activity logging or group leaderboards yet.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  invite_code text not null,
  created_by uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  constraint groups_name_nonempty check (char_length(btrim(name)) between 1 and 80),
  constraint groups_description_length check (
    description is null or char_length(description) <= 500
  ),
  constraint groups_invite_code_format check (invite_code ~ '^KS-[A-Z0-9]{6}$')
);

create unique index if not exists groups_invite_code_uidx
  on public.groups (invite_code);

create index if not exists groups_created_by_idx
  on public.groups (created_by);

create table if not exists public.group_members (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'member',
  joined_at timestamptz not null default now(),
  constraint group_members_role_check check (role in ('admin', 'member')),
  constraint group_members_group_user_unique unique (group_id, user_id)
);

create index if not exists group_members_user_id_idx
  on public.group_members (user_id);

create index if not exists group_members_group_id_idx
  on public.group_members (group_id);

-- ---------------------------------------------------------------------------
-- Membership helpers (SECURITY DEFINER — avoids recursive RLS)
-- ---------------------------------------------------------------------------
create or replace function public.is_group_member(p_group_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.group_members gm
    where gm.group_id = p_group_id
      and gm.user_id = auth.uid()
  );
$$;

create or replace function public.is_group_admin(p_group_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.group_members gm
    where gm.group_id = p_group_id
      and gm.user_id = auth.uid()
      and gm.role = 'admin'
  );
$$;

revoke all on function public.is_group_member(uuid) from public;
revoke all on function public.is_group_admin(uuid) from public;
grant execute on function public.is_group_member(uuid) to authenticated;
grant execute on function public.is_group_admin(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Invite code generator
-- ---------------------------------------------------------------------------
create or replace function public.generate_group_invite_code()
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  alphabet constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  candidate text;
  i int;
begin
  loop
    candidate := 'KS-';
    for i in 1..6 loop
      candidate :=
        candidate
        || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    end loop;
    exit when not exists (
      select 1 from public.groups g where g.invite_code = candidate
    );
  end loop;
  return candidate;
end;
$$;

revoke all on function public.generate_group_invite_code() from public;

-- ---------------------------------------------------------------------------
-- RLS
-- ---------------------------------------------------------------------------
alter table public.groups enable row level security;
alter table public.group_members enable row level security;

drop policy if exists "Members can read own groups" on public.groups;
create policy "Members can read own groups"
  on public.groups for select
  to authenticated
  using (public.is_group_member(id));

-- Group creation goes through create_group() (security definer) so invite codes
-- are always server-generated. No direct client INSERT policy.

drop policy if exists "Authenticated users can create groups" on public.groups;

drop policy if exists "Admins can update own groups" on public.groups;
create policy "Admins can update own groups"
  on public.groups for update
  to authenticated
  using (public.is_group_admin(id))
  with check (public.is_group_admin(id));

drop policy if exists "Admins can delete own groups" on public.groups;
create policy "Admins can delete own groups"
  on public.groups for delete
  to authenticated
  using (public.is_group_admin(id));

drop policy if exists "Members can read fellow members" on public.group_members;
create policy "Members can read fellow members"
  on public.group_members for select
  to authenticated
  using (public.is_group_member(group_id));

-- Direct client inserts into group_members are not allowed.
-- Membership is created by create_group / join_group_by_invite (security definer).

drop policy if exists "Members can leave groups" on public.group_members;
create policy "Members can leave groups"
  on public.group_members for delete
  to authenticated
  using (
    user_id = auth.uid()
    or public.is_group_admin(group_id)
  );

-- No update policy: role changes are not part of beta.

grant select, update, delete on table public.groups to authenticated;
grant select, delete on table public.group_members to authenticated;

-- ---------------------------------------------------------------------------
-- Auto-add creator as admin after group insert
-- ---------------------------------------------------------------------------
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
  return new;
end;
$$;

drop trigger if exists groups_after_insert_add_creator on public.groups;
create trigger groups_after_insert_add_creator
  after insert on public.groups
  for each row
  execute function public.groups_after_insert_add_creator();

-- ---------------------------------------------------------------------------
-- RPCs
-- ---------------------------------------------------------------------------
create or replace function public.create_group(
  p_name text,
  p_description text default null
)
returns public.groups
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  cleaned_name text := btrim(coalesce(p_name, ''));
  cleaned_description text := nullif(btrim(coalesce(p_description, '')), '');
  created public.groups;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if char_length(cleaned_name) < 1 or char_length(cleaned_name) > 80 then
    raise exception 'Group name must be between 1 and 80 characters';
  end if;

  if cleaned_description is not null and char_length(cleaned_description) > 500 then
    raise exception 'Group description must be 500 characters or fewer';
  end if;

  insert into public.groups (name, description, invite_code, created_by)
  values (
    cleaned_name,
    cleaned_description,
    public.generate_group_invite_code(),
    uid
  )
  returning * into created;

  return created;
end;
$$;

revoke all on function public.create_group(text, text) from public;
grant execute on function public.create_group(text, text) to authenticated;

create or replace function public.join_group_by_invite(p_invite_code text)
returns public.groups
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  raw text := upper(btrim(coalesce(p_invite_code, '')));
  normalized text;
  target public.groups;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if raw = '' then
    raise exception 'Enter an invite code';
  end if;

  if raw like 'KS-%' then
    normalized := raw;
  else
    normalized := 'KS-' || raw;
  end if;

  select * into target
  from public.groups g
  where g.invite_code = normalized;

  if target.id is null then
    raise exception 'Invalid invite code';
  end if;

  if exists (
    select 1
    from public.group_members gm
    where gm.group_id = target.id
      and gm.user_id = uid
  ) then
    raise exception 'You are already a member of this group';
  end if;

  insert into public.group_members (group_id, user_id, role)
  values (target.id, uid, 'member');

  return target;
end;
$$;

revoke all on function public.join_group_by_invite(text) from public;
grant execute on function public.join_group_by_invite(text) to authenticated;

create or replace function public.list_my_groups()
returns table (
  id uuid,
  name text,
  description text,
  invite_code text,
  created_by uuid,
  created_at timestamptz,
  my_role text,
  member_count bigint
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
    ) as member_count
  from public.groups g
  inner join public.group_members mine
    on mine.group_id = g.id
   and mine.user_id = uid
  order by g.created_at desc;
end;
$$;

revoke all on function public.list_my_groups() from public;
grant execute on function public.list_my_groups() to authenticated;

create or replace function public.get_group_members(p_group_id uuid)
returns table (
  user_id uuid,
  role text,
  joined_at timestamptz,
  leaderboard_name text,
  display_name text,
  avatar_id text
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

  if p_group_id is null or not public.is_group_member(p_group_id) then
    raise exception 'Not a member of this group';
  end if;

  return query
  select
    gm.user_id,
    gm.role,
    gm.joined_at,
    lp.leaderboard_name,
    nullif(btrim(coalesce(pr.first_name, '')), '') as display_name,
    case
      when pr.avatar_id in (
        'mark-sun',
        'mark-pulse',
        'mark-shield',
        'mark-peak',
        'mark-bolt'
      ) then pr.avatar_id
      else null
    end as avatar_id
  from public.group_members gm
  left join public.leaderboard_profiles lp on lp.user_id = gm.user_id
  left join public.profiles pr on pr.id = gm.user_id
  where gm.group_id = p_group_id
  order by
    case when gm.role = 'admin' then 0 else 1 end,
    lower(coalesce(lp.leaderboard_name, pr.first_name, gm.user_id::text));
end;
$$;

revoke all on function public.get_group_members(uuid) from public;
grant execute on function public.get_group_members(uuid) to authenticated;

create or replace function public.leave_group(p_group_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  member_count int;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if not public.is_group_member(p_group_id) then
    raise exception 'Not a member of this group';
  end if;

  delete from public.group_members
  where group_id = p_group_id
    and user_id = uid;

  select count(*)::int into member_count
  from public.group_members
  where group_id = p_group_id;

  if member_count = 0 then
    delete from public.groups where id = p_group_id;
  end if;
end;
$$;

revoke all on function public.leave_group(uuid) from public;
grant execute on function public.leave_group(uuid) to authenticated;

create or replace function public.remove_group_member(
  p_group_id uuid,
  p_user_id uuid
)
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

  if not public.is_group_admin(p_group_id) then
    raise exception 'Only group admins can remove members';
  end if;

  if p_user_id is null or p_user_id = uid then
    raise exception 'Use leave group to remove yourself';
  end if;

  delete from public.group_members
  where group_id = p_group_id
    and user_id = p_user_id;

  if not found then
    raise exception 'Member not found';
  end if;
end;
$$;

revoke all on function public.remove_group_member(uuid, uuid) from public;
grant execute on function public.remove_group_member(uuid, uuid) to authenticated;

create or replace function public.delete_group(p_group_id uuid)
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

  if not public.is_group_admin(p_group_id) then
    raise exception 'Only group admins can delete this group';
  end if;

  delete from public.groups where id = p_group_id;
end;
$$;

revoke all on function public.delete_group(uuid) from public;
grant execute on function public.delete_group(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- Account deletion cleanup (keep aligned with Stage 10 delete_own_account)
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

  -- Do not let Stage 10 write-path rate limits block account deletion.
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
  delete from public.group_members where user_id = uid;
  delete from public.groups where created_by = uid;
  delete from public.profiles where id = uid;
  delete from auth.users where id = uid;
end;
$$;

revoke all on function public.delete_own_account() from public;
grant execute on function public.delete_own_account() to authenticated;
