-- Groups BETA completion:
--   * 3-group membership cap (DB-enforced)
--   * name ≤ 40 / description ≤ 200
--   * show_on_leaderboard vs is_enabled for activity types
--   * leave/kick cleanup of activity logs (+ admin leave deletes group)
--   * group_leaderboard_assessments (which assessment boards appear)
--   * group_assessment_shares (explicit share of performance_records)
--   * update_group + assessment share/leaderboard RPCs
-- Idempotent. Additive on 024–026.

-- ---------------------------------------------------------------------------
-- Constraints: name 40 / description 200
-- ---------------------------------------------------------------------------
-- Truncate legacy over-long rows first, then tighten checks.
update public.groups
set name = left(btrim(name), 40)
where char_length(btrim(name)) > 40;

update public.groups
set description = left(description, 200)
where description is not null and char_length(description) > 200;

alter table public.groups
  drop constraint if exists groups_name_nonempty;
alter table public.groups
  add constraint groups_name_nonempty
  check (char_length(btrim(name)) between 1 and 40);

alter table public.groups
  drop constraint if exists groups_description_length;
alter table public.groups
  add constraint groups_description_length
  check (description is null or char_length(description) <= 200);

-- ---------------------------------------------------------------------------
-- Activity: separate logging enable vs leaderboard tab
-- ---------------------------------------------------------------------------
alter table public.group_activity_types
  add column if not exists show_on_leaderboard boolean not null default true;

-- ---------------------------------------------------------------------------
-- Assessment leaderboard tab config (per group)
-- ---------------------------------------------------------------------------
create table if not exists public.group_leaderboard_assessments (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups (id) on delete cascade,
  board_key text not null,
  is_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  constraint group_leaderboard_assessments_board_nonempty
    check (char_length(btrim(board_key)) > 0),
  constraint group_leaderboard_assessments_group_board_unique
    unique (group_id, board_key)
);

create index if not exists group_leaderboard_assessments_group_idx
  on public.group_leaderboard_assessments (group_id, is_enabled);

alter table public.group_leaderboard_assessments enable row level security;

drop policy if exists "Members can read group assessment boards"
  on public.group_leaderboard_assessments;
create policy "Members can read group assessment boards"
  on public.group_leaderboard_assessments for select
  to authenticated
  using (public.is_group_member(group_id));

drop policy if exists "Admins can insert group assessment boards"
  on public.group_leaderboard_assessments;
create policy "Admins can insert group assessment boards"
  on public.group_leaderboard_assessments for insert
  to authenticated
  with check (public.is_group_admin(group_id));

drop policy if exists "Admins can update group assessment boards"
  on public.group_leaderboard_assessments;
create policy "Admins can update group assessment boards"
  on public.group_leaderboard_assessments for update
  to authenticated
  using (public.is_group_admin(group_id))
  with check (public.is_group_admin(group_id));

drop policy if exists "Admins can delete group assessment boards"
  on public.group_leaderboard_assessments;
create policy "Admins can delete group assessment boards"
  on public.group_leaderboard_assessments for delete
  to authenticated
  using (public.is_group_admin(group_id));

grant select, insert, update, delete
  on table public.group_leaderboard_assessments to authenticated;

-- ---------------------------------------------------------------------------
-- Explicit group assessment shares (reference original performance_records)
-- ---------------------------------------------------------------------------
create table if not exists public.group_assessment_shares (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.groups (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  source_record_id uuid not null
    references public.performance_records (id) on delete cascade,
  board_key text not null,
  shared_at timestamptz not null default now(),
  constraint group_assessment_shares_board_nonempty
    check (char_length(btrim(board_key)) > 0),
  constraint group_assessment_shares_group_record_unique
    unique (group_id, source_record_id)
);

create index if not exists group_assessment_shares_group_board_idx
  on public.group_assessment_shares (group_id, board_key, shared_at desc);

create index if not exists group_assessment_shares_user_idx
  on public.group_assessment_shares (user_id);

alter table public.group_assessment_shares enable row level security;

drop policy if exists "Members can read group assessment shares"
  on public.group_assessment_shares;
create policy "Members can read group assessment shares"
  on public.group_assessment_shares for select
  to authenticated
  using (public.is_group_member(group_id));

drop policy if exists "Members can insert own group assessment shares"
  on public.group_assessment_shares;
create policy "Members can insert own group assessment shares"
  on public.group_assessment_shares for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and public.is_group_member(group_id)
  );

drop policy if exists "Members can delete own group assessment shares"
  on public.group_assessment_shares;
create policy "Members can delete own group assessment shares"
  on public.group_assessment_shares for delete
  to authenticated
  using (
    auth.uid() = user_id
    and public.is_group_member(group_id)
  );

grant select, insert, delete on table public.group_assessment_shares
  to authenticated;

-- ---------------------------------------------------------------------------
-- Membership cap helper
-- ---------------------------------------------------------------------------
create or replace function public.user_group_membership_count(p_user_id uuid)
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select count(*)::integer
  from public.group_members gm
  where gm.user_id = p_user_id;
$$;

revoke all on function public.user_group_membership_count(uuid) from public;
grant execute on function public.user_group_membership_count(uuid) to authenticated;

create or replace function public.assert_under_group_limit(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.user_group_membership_count(p_user_id) >= 3 then
    raise exception
      'You can belong to a maximum of 3 groups. Leave a group before joining another.';
  end if;
end;
$$;

revoke all on function public.assert_under_group_limit(uuid) from public;

-- ---------------------------------------------------------------------------
-- create_group: 40/200 + 3-group cap
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

  perform public.assert_under_group_limit(uid);

  if char_length(cleaned_name) < 1 or char_length(cleaned_name) > 40 then
    raise exception 'Group name must be between 1 and 40 characters';
  end if;

  if cleaned_description is not null and char_length(cleaned_description) > 200 then
    raise exception 'Group description must be 200 characters or fewer';
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

-- ---------------------------------------------------------------------------
-- join_group_by_invite: 3-group cap + clearer invalid code
-- ---------------------------------------------------------------------------
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
    raise exception 'That invite code isn''t valid.';
  end if;

  if exists (
    select 1
    from public.group_members gm
    where gm.group_id = target.id
      and gm.user_id = uid
  ) then
    raise exception 'You are already a member of this group';
  end if;

  perform public.assert_under_group_limit(uid);

  insert into public.group_members (group_id, user_id, role)
  values (target.id, uid, 'member');

  return target;
end;
$$;

-- ---------------------------------------------------------------------------
-- Cleanup helper for leave / kick
-- ---------------------------------------------------------------------------
create or replace function public.cleanup_user_group_data(
  p_group_id uuid,
  p_user_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.group_assessment_shares
  where group_id = p_group_id
    and user_id = p_user_id;

  delete from public.group_activity_logs
  where group_id = p_group_id
    and user_id = p_user_id;
end;
$$;

revoke all on function public.cleanup_user_group_data(uuid, uuid) from public;

-- ---------------------------------------------------------------------------
-- leave_group: admin leave deletes whole group; member cleans data
-- ---------------------------------------------------------------------------
create or replace function public.leave_group(p_group_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  my_role text;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  select gm.role into my_role
  from public.group_members gm
  where gm.group_id = p_group_id
    and gm.user_id = uid;

  if my_role is null then
    raise exception 'Not a member of this group';
  end if;

  if my_role = 'admin' then
    -- Admin cannot orphan the group — leaving deletes it for everyone.
    delete from public.groups where id = p_group_id;
    return;
  end if;

  perform public.cleanup_user_group_data(p_group_id, uid);

  delete from public.group_members
  where group_id = p_group_id
    and user_id = uid;
end;
$$;

-- ---------------------------------------------------------------------------
-- remove_group_member: kick cleans activity + shares
-- ---------------------------------------------------------------------------
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
  target_role text;
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

  select gm.role into target_role
  from public.group_members gm
  where gm.group_id = p_group_id
    and gm.user_id = p_user_id;

  if target_role is null then
    raise exception 'Member not found';
  end if;

  if target_role = 'admin' then
    raise exception 'Cannot remove the group admin';
  end if;

  perform public.cleanup_user_group_data(p_group_id, p_user_id);

  delete from public.group_members
  where group_id = p_group_id
    and user_id = p_user_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- update_group (admin only)
-- ---------------------------------------------------------------------------
create or replace function public.update_group(
  p_group_id uuid,
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

  update public.groups
  set
    name = cleaned_name,
    description = cleaned_description
  where id = p_group_id
  returning * into updated;

  if updated.id is null then
    raise exception 'Group not found';
  end if;

  return updated;
end;
$$;

revoke all on function public.update_group(uuid, text, text) from public;
grant execute on function public.update_group(uuid, text, text) to authenticated;

-- ---------------------------------------------------------------------------
-- Activity leaderboard visibility toggle
-- ---------------------------------------------------------------------------
create or replace function public.set_group_activity_show_on_leaderboard(
  p_activity_type_id uuid,
  p_show boolean
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
  set show_on_leaderboard = coalesce(p_show, false)
  where id = target.id
  returning * into target;

  return target;
end;
$$;

revoke all on function public.set_group_activity_show_on_leaderboard(uuid, boolean)
  from public;
grant execute on function public.set_group_activity_show_on_leaderboard(uuid, boolean)
  to authenticated;

-- ---------------------------------------------------------------------------
-- Assessment leaderboard tab toggle
-- ---------------------------------------------------------------------------
create or replace function public.set_group_assessment_leaderboard(
  p_group_id uuid,
  p_board_key text,
  p_enabled boolean
)
returns public.group_leaderboard_assessments
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  cleaned text := btrim(coalesce(p_board_key, ''));
  row public.group_leaderboard_assessments;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if not public.is_group_admin(p_group_id) then
    raise exception 'Only group admins can configure leaderboards';
  end if;

  if cleaned = '' then
    raise exception 'Board key is required';
  end if;

  insert into public.group_leaderboard_assessments (group_id, board_key, is_enabled)
  values (p_group_id, cleaned, coalesce(p_enabled, false))
  on conflict (group_id, board_key)
  do update set is_enabled = excluded.is_enabled
  returning * into row;

  return row;
end;
$$;

revoke all on function public.set_group_assessment_leaderboard(uuid, text, boolean)
  from public;
grant execute on function public.set_group_assessment_leaderboard(uuid, text, boolean)
  to authenticated;

-- ---------------------------------------------------------------------------
-- Share / unshare assessment with a group
-- ---------------------------------------------------------------------------
create or replace function public.share_assessment_with_group(
  p_group_id uuid,
  p_source_record_id uuid,
  p_board_key text
)
returns public.group_assessment_shares
language plpgsql
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  cleaned text := btrim(coalesce(p_board_key, ''));
  rec public.performance_records;
  created public.group_assessment_shares;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if not public.is_group_member(p_group_id) then
    raise exception 'Not a member of this group';
  end if;

  if cleaned = '' then
    raise exception 'Board key is required';
  end if;

  select * into rec
  from public.performance_records pr
  where pr.id = p_source_record_id;

  if rec.id is null then
    raise exception 'Assessment result not found';
  end if;

  if rec.user_id is distinct from uid then
    raise exception 'You can only share your own assessments';
  end if;

  insert into public.group_assessment_shares (
    group_id, user_id, source_record_id, board_key
  )
  values (p_group_id, uid, p_source_record_id, cleaned)
  on conflict (group_id, source_record_id)
  do update set
    board_key = excluded.board_key,
    shared_at = now()
  returning * into created;

  return created;
end;
$$;

revoke all on function public.share_assessment_with_group(uuid, uuid, text)
  from public;
grant execute on function public.share_assessment_with_group(uuid, uuid, text)
  to authenticated;

create or replace function public.unshare_assessment_from_group(
  p_group_id uuid,
  p_source_record_id uuid
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

  delete from public.group_assessment_shares
  where group_id = p_group_id
    and source_record_id = p_source_record_id
    and user_id = uid;

  if not found then
    -- Also allow unshare by board if row belonged to user in this group
    null;
  end if;
end;
$$;

revoke all on function public.unshare_assessment_from_group(uuid, uuid)
  from public;
grant execute on function public.unshare_assessment_from_group(uuid, uuid)
  to authenticated;

-- ---------------------------------------------------------------------------
-- Group assessment leaderboard read (members only; shared rows only)
-- ---------------------------------------------------------------------------
create or replace function public.get_group_assessment_leaderboard(
  p_group_id uuid,
  p_board_key text
)
returns table (
  user_id uuid,
  leaderboard_name text,
  result_value numeric,
  result_unit text,
  source_record_id uuid,
  shared_at timestamptz
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  uid uuid := auth.uid();
  cleaned text := btrim(coalesce(p_board_key, ''));
  board_on boolean;
begin
  if uid is null then
    raise exception 'Not authenticated';
  end if;

  if not public.is_group_member(p_group_id) then
    raise exception 'Not a member of this group';
  end if;

  select coalesce(bool_or(gla.is_enabled), false) into board_on
  from public.group_leaderboard_assessments gla
  where gla.group_id = p_group_id
    and gla.board_key = cleaned;

  if not coalesce(board_on, false) then
    raise exception 'That assessment leaderboard is not enabled for this group';
  end if;

  return query
  select
    gas.user_id,
    lp.leaderboard_name,
    pr.result_value,
    pr.result_unit,
    gas.source_record_id,
    gas.shared_at
  from public.group_assessment_shares gas
  inner join public.performance_records pr
    on pr.id = gas.source_record_id
  left join public.leaderboard_profiles lp
    on lp.user_id = gas.user_id
  where gas.group_id = p_group_id
    and gas.board_key = cleaned;
end;
$$;

revoke all on function public.get_group_assessment_leaderboard(uuid, text)
  from public;
grant execute on function public.get_group_assessment_leaderboard(uuid, text)
  to authenticated;

-- ---------------------------------------------------------------------------
-- Account deletion cleanup
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
  delete from public.group_assessment_shares where user_id = uid;
  delete from public.group_activity_logs where user_id = uid;
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
