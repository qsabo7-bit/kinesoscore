-- This Week leaderboard: use shared_at in the current UTC calendar week.
--
-- Product rule (unchanged):
--   * This Week = UTC Monday 00:00 → next Monday
--   * Share during that week → All Time + This Week
--   * After the UTC week rolls, rows drop off This Week only
--
-- Why:
--   Filtering only on period_week missed rows when period_week was stale /
--   left at the 1970-01-01 default, so This Week looked empty while All Time
--   still worked. shared_at is the source of truth for "when was this posted".

-- Backfill period_week from shared_at (UTC Monday week start) for consistency.
update public.leaderboard_shares
set period_week = (date_trunc('week', timezone('UTC', shared_at)))::date
where period_week is distinct from
  (date_trunc('week', timezone('UTC', shared_at)))::date;

create or replace function public.leaderboard_shares_before_write()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  profile_name text;
  source_owner uuid;
begin
  if tg_op = 'INSERT' or tg_op = 'UPDATE' then
    if auth.uid() is null or new.user_id <> auth.uid() then
      raise exception 'Not allowed to write leaderboard shares for another user'
        using errcode = '42501';
    end if;

    select lp.leaderboard_name
      into profile_name
    from public.leaderboard_profiles lp
    where lp.user_id = new.user_id;

    if profile_name is null or btrim(profile_name) = '' then
      raise exception 'A Leaderboard Name is required before sharing to leaderboards'
        using errcode = 'P0001';
    end if;

    new.display_name := profile_name;

    if not public.leaderboard_share_target_allowed(
      new.board_key,
      new.calculator_type,
      new.exercise_name,
      new.higher_is_better
    ) then
      raise exception 'This calculator result cannot be shared to leaderboards'
        using errcode = 'P0001';
    end if;

    if new.source_record_id is not null then
      select pr.user_id
        into source_owner
      from public.performance_records pr
      where pr.id = new.source_record_id;

      if source_owner is null then
        raise exception 'Shared source record was not found'
          using errcode = 'P0001';
      end if;

      if source_owner <> new.user_id then
        raise exception 'Shared source record must belong to the same user'
          using errcode = '42501';
      end if;
    end if;

    if new.result_value is null or new.result_value <> new.result_value then
      raise exception 'Shared result value must be a finite number'
        using errcode = 'P0001';
    end if;

    new.rank_value := case
      when new.higher_is_better then new.result_value
      else -new.result_value
    end;

    if new.shared_at is null then
      new.shared_at := now();
    end if;

    -- Keep period_week aligned with shared_at (UTC Monday week start).
    new.period_week :=
      (date_trunc('week', timezone('UTC', new.shared_at)))::date;

    new.updated_at := now();

    if tg_op = 'INSERT' and new.created_at is null then
      new.created_at := now();
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists leaderboard_shares_before_write on public.leaderboard_shares;
create trigger leaderboard_shares_before_write
  before insert or update on public.leaderboard_shares
  for each row
  execute function public.leaderboard_shares_before_write();

create or replace function public.get_public_leaderboard(
  p_board_key text,
  p_period text default 'all_time'
)
returns table (
  rank bigint,
  leaderboard_name text,
  board_key text,
  result_value numeric,
  result_unit text,
  higher_is_better boolean
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_period text := lower(btrim(coalesce(p_period, 'all_time')));
  v_board text := btrim(coalesce(p_board_key, ''));
  -- Monday 00:00:00 UTC of the current ISO week (timestamptz).
  v_week_start timestamptz :=
    date_trunc('week', timezone('UTC', now())) at time zone 'UTC';
  v_board_ok boolean;
begin
  if v_period not in ('all_time', 'this_week') then
    raise exception 'Invalid leaderboard period'
      using errcode = '22023';
  end if;

  if v_board = '' then
    raise exception 'Invalid leaderboard board'
      using errcode = '22023';
  end if;

  select exists (
    select 1
    from (
      values
        ('mykinesoscore'),
        ('strength:Bench Press'),
        ('strength:Squat'),
        ('strength:Deadlift'),
        ('strength:SBD Total'),
        ('running:Mile'),
        ('running:1.5 Mile'),
        ('running:2 Mile'),
        ('running:5K'),
        ('running:5 Mile'),
        ('running:10K'),
        ('running:10 Mile'),
        ('running:Half Marathon'),
        ('running:Marathon'),
        ('assessment:air-force-pfra'),
        ('assessment:air-force-pfa'),
        ('assessment:army-aft'),
        ('assessment:marine-pft'),
        ('assessment:navy-prt'),
        ('fitness:max-pushups'),
        ('fitness:max-pullups'),
        ('fitness:fran-rx'),
        ('fitness:fran-scaled'),
        ('fitness:murph-rx'),
        ('fitness:murph-scaled'),
        ('fitness:cindy')
    ) as allowed(board_key)
    where allowed.board_key = v_board
  )
  into v_board_ok;

  if not v_board_ok then
    raise exception 'Invalid leaderboard board'
      using errcode = '22023';
  end if;

  return query
  with eligible as (
    select
      p.leaderboard_name as name,
      s.board_key as bkey,
      s.result_value as value,
      s.result_unit as unit,
      s.higher_is_better as hib,
      s.rank_value as rvalue
    from public.leaderboard_shares s
    inner join public.leaderboard_profiles p
      on p.user_id = s.user_id
    where s.is_active = true
      and s.board_key = v_board
      and char_length(btrim(p.leaderboard_name)) > 0
      and public.leaderboard_share_target_allowed(
        s.board_key,
        s.calculator_type,
        s.exercise_name,
        s.higher_is_better
      )
      and (
        v_period = 'all_time'
        -- Source of truth: posted during the current UTC calendar week.
        or s.shared_at >= v_week_start
      )
  ),
  ranked as (
    select
      dense_rank() over (
        order by e.rvalue desc
      ) as rnk,
      e.name,
      e.bkey,
      e.value,
      e.unit,
      e.hib
    from eligible e
  )
  select
    ranked.rnk,
    ranked.name,
    ranked.bkey,
    ranked.value,
    ranked.unit,
    ranked.hib
  from ranked
  order by ranked.rnk asc, lower(ranked.name) asc
  limit 100;
end;
$$;

revoke all on function public.get_public_leaderboard(text, text) from public;
grant execute on function public.get_public_leaderboard(text, text)
  to anon, authenticated;

comment on function public.get_public_leaderboard(text, text) is
  'Public leaderboard read. This Week = shared_at in current UTC Mon–Sun week; All Time = all active shares. Equal scores dense-rank tie.';
