-- Groups feature expansion:
--   * group avatar_id (same catalog as profiles)
--   * show_on_overview (admin picks 1–6 for totals/goals)
--   * weekly challenge fields
--   * activity reactions
--   * transfer admin
-- Idempotent. Additive on 024–029.

-- ---------------------------------------------------------------------------
-- Group icon
-- ---------------------------------------------------------------------------
alter table public.groups
  add column if not exists avatar_id text not null default 'mark-sun';

alter table public.groups
  drop constraint if exists groups_avatar_id_check;
alter table public.groups
  add constraint groups_avatar_id_check
  check (
    avatar_id in (
      'mark-sun', 'mark-pulse', 'mark-shield', 'mark-peak', 'mark-bolt'
    )
  );

-- ---------------------------------------------------------------------------
-- Overview picks (1–6) + weekly challenge
-- ---------------------------------------------------------------------------
alter table public.group_activity_types
  add column if not exists show_on_overview boolean not null default true;

alter table public.groups
  add column if not exists challenge_activity_type_id uuid
    references public.group_activity_types (id) on delete set null;

alter table public.groups
  add column if not exists challenge_goal numeric
    check (challenge_goal is null or challenge_goal > 0);

-- Cap overview picks at 6
create or replace function public.assert_overview_pick_limit(p_group_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  n integer;
begin
  select count(*)::integer into n
  from public.group_activity_types t
  where t.group_id = p_group_id
    and t.is_enabled
    and t.show_on_overview;

  if n > 6 then
    raise exception 'Overview can show at most 6 activities';
  end if;
end;
$$;

create or replace function public.set_group_activity_show_on_overview(
  p_activity_type_id uuid,
  p_show boolean
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
    raise exception 'Not authenticated';
  end if;

  select t.* into target
  from public.group_activity_types t
  where t.id = p_activity_type_id;

  if target.id is null then
    raise exception 'Activity type not found';
  end if;

  if not public.is_group_admin(target.group_id) then
    raise exception 'Only group admins can update this group';
  end if;

  update public.group_activity_types
  set show_on_overview = coalesce(p_show, false)
  where id = p_activity_type_id
  returning * into target;

  perform public.assert_overview_pick_limit(target.group_id);
  return target;
end;
$$;

revoke all on function public.set_group_activity_show_on_overview(uuid, boolean)
  from public;
grant execute on function public.set_group_activity_show_on_overview(uuid, boolean)
  to authenticated;

-- ---------------------------------------------------------------------------
-- Reactions
-- ---------------------------------------------------------------------------
create table if not exists public.group_activity_reactions (
  id uuid primary key default gen_random_uuid(),
  log_id uuid not null
    references public.group_activity_logs (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  reaction text not null default 'thumbsup',
  created_at timestamptz not null default now(),
  constraint group_activity_reactions_reaction_check
    check (reaction in ('thumbsup')),
  constraint group_activity_reactions_unique
    unique (log_id, user_id, reaction)
);

create index if not exists group_activity_reactions_log_idx
  on public.group_activity_reactions (log_id);

alter table public.group_activity_reactions enable row level security;

drop policy if exists "Members can read group reactions"
  on public.group_activity_reactions;
create policy "Members can read group reactions"
  on public.group_activity_reactions for select
  to authenticated
  using (
    exists (
      select 1
      from public.group_activity_logs l
      where l.id = log_id
        and public.is_group_member(l.group_id)
    )
  );

drop policy if exists "Members can insert own reactions"
  on public.group_activity_reactions;
create policy "Members can insert own reactions"
  on public.group_activity_reactions for insert
  to authenticated
  with check (
    user_id = auth.uid()
    and exists (
      select 1
      from public.group_activity_logs l
      where l.id = log_id
        and public.is_group_member(l.group_id)
    )
  );

drop policy if exists "Members can delete own reactions"
  on public.group_activity_reactions;
create policy "Members can delete own reactions"
  on public.group_activity_reactions for delete
  to authenticated
  using (user_id = auth.uid());

grant select, insert, delete on table public.group_activity_reactions
  to authenticated;

-- ---------------------------------------------------------------------------
-- update_group: name, description, avatar
-- ---------------------------------------------------------------------------
drop function if exists public.update_group(uuid, text, text);

create or replace function public.update_group(
  p_group_id uuid,
  p_name text,
  p_description text default null,
  p_avatar_id text default null
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
  next_avatar text;
  updated public.groups;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if not public.is_group_admin(p_group_id) then
    raise exception 'Only group admins can update this group';
  end if;

  if char_length(cleaned_name) < 1 or char_length(cleaned_name) > 40 then
    raise exception 'Group name must be between 1 and 40 characters';
  end if;

  if cleaned_description is not null and char_length(cleaned_description) > 200 then
    raise exception 'Group description must be 200 characters or fewer';
  end if;

  select g.avatar_id into next_avatar
  from public.groups g
  where g.id = p_group_id;

  if p_avatar_id is not null then
    next_avatar := btrim(p_avatar_id);
    if next_avatar not in (
      'mark-sun', 'mark-pulse', 'mark-shield', 'mark-peak', 'mark-bolt'
    ) then
      raise exception 'Invalid group icon';
    end if;
  end if;

  update public.groups
  set
    name = cleaned_name,
    description = cleaned_description,
    avatar_id = coalesce(next_avatar, 'mark-sun')
  where id = p_group_id
  returning * into updated;

  if updated.id is null then
    raise exception 'Group not found';
  end if;

  return updated;
end;
$$;

revoke all on function public.update_group(uuid, text, text, text) from public;
grant execute on function public.update_group(uuid, text, text, text)
  to authenticated;

-- ---------------------------------------------------------------------------
-- Weekly challenge
-- ---------------------------------------------------------------------------
create or replace function public.set_group_weekly_challenge(
  p_group_id uuid,
  p_activity_type_id uuid,
  p_goal numeric
)
returns public.groups
language plpgsql
security definer
set search_path = public
as $$
declare
  updated public.groups;
  type_row public.group_activity_types;
begin
  if auth.uid() is null then
    raise exception 'Not authenticated';
  end if;
  if not public.is_group_admin(p_group_id) then
    raise exception 'Only group admins can update this group';
  end if;

  if p_activity_type_id is null then
    update public.groups
    set challenge_activity_type_id = null, challenge_goal = null
    where id = p_group_id
    returning * into updated;
    return updated;
  end if;

  if p_goal is null or p_goal <= 0 then
    raise exception 'Challenge goal must be greater than zero';
  end if;

  select t.* into type_row
  from public.group_activity_types t
  where t.id = p_activity_type_id
    and t.group_id = p_group_id
    and t.is_enabled;

  if type_row.id is null then
    raise exception 'Challenge activity must be an enabled group activity';
  end if;

  update public.groups
  set
    challenge_activity_type_id = p_activity_type_id,
    challenge_goal = p_goal
  where id = p_group_id
  returning * into updated;

  return updated;
end;
$$;

revoke all on function public.set_group_weekly_challenge(uuid, uuid, numeric)
  from public;
grant execute on function public.set_group_weekly_challenge(uuid, uuid, numeric)
  to authenticated;

-- ---------------------------------------------------------------------------
-- Transfer admin
-- ---------------------------------------------------------------------------
create or replace function public.transfer_group_admin(
  p_group_id uuid,
  p_new_admin_user_id uuid
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
    raise exception 'Only group admins can transfer admin';
  end if;
  if p_new_admin_user_id is null or p_new_admin_user_id = uid then
    raise exception 'Pick another member to become admin';
  end if;
  if not exists (
    select 1 from public.group_members m
    where m.group_id = p_group_id and m.user_id = p_new_admin_user_id
  ) then
    raise exception 'That user is not a member of this group';
  end if;

  update public.group_members
  set role = 'member'
  where group_id = p_group_id and user_id = uid;

  update public.group_members
  set role = 'admin'
  where group_id = p_group_id and user_id = p_new_admin_user_id;

  update public.groups
  set created_by = p_new_admin_user_id
  where id = p_group_id;
end;
$$;

revoke all on function public.transfer_group_admin(uuid, uuid) from public;
grant execute on function public.transfer_group_admin(uuid, uuid)
  to authenticated;

-- ---------------------------------------------------------------------------
-- list_my_groups: avatar_id
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
  avatar_id text,
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
    g.avatar_id,
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

-- Ensure seed types show on overview by default (already true via column default)
update public.group_activity_types
set show_on_overview = true
where show_on_overview is distinct from true
  and is_enabled;
