-- Public profile icons next to Leaderboard Names.
-- avatar_id is a closed catalog (no PII). Returned only via SECURITY DEFINER
-- RPCs — anon still has no SELECT on profiles.

-- Return-type change requires drop.
drop function if exists public.get_public_leaderboard(text, text);

create function public.get_public_leaderboard(
  p_board_key text,
  p_period text default 'all_time'
)
returns table (
  rank bigint,
  leaderboard_name text,
  board_key text,
  result_value numeric,
  result_unit text,
  higher_is_better boolean,
  award_running text,
  award_strength text,
  award_crown boolean,
  avatar_id text
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_period text := lower(btrim(coalesce(p_period, 'all_time')));
  v_board text := btrim(coalesce(p_board_key, ''));
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
      s.rank_value as rvalue,
      case
        when p.show_awards_publicly then p.award_running
        else null
      end as arun,
      case
        when p.show_awards_publicly then p.award_strength
        else null
      end as astr,
      case
        when p.show_awards_publicly then coalesce(p.award_crown, false)
        else false
      end as acrown,
      case
        when pr.avatar_id in (
          'none',
          'mark-sun',
          'mark-pulse',
          'mark-shield',
          'mark-peak',
          'mark-bolt'
        ) then pr.avatar_id
        else 'none'
      end as avid
    from public.leaderboard_shares s
    inner join public.leaderboard_profiles p
      on p.user_id = s.user_id
    left join public.profiles pr
      on pr.id = s.user_id
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
      e.hib,
      e.arun,
      e.astr,
      e.acrown,
      e.avid
    from eligible e
  )
  select
    ranked.rnk,
    ranked.name,
    ranked.bkey,
    ranked.value,
    ranked.unit,
    ranked.hib,
    ranked.arun,
    ranked.astr,
    ranked.acrown,
    ranked.avid
  from ranked
  order by ranked.rnk asc, lower(ranked.name) asc
  limit 100;
end;
$$;

revoke all on function public.get_public_leaderboard(text, text) from public;
grant execute on function public.get_public_leaderboard(text, text)
  to anon, authenticated;

comment on function public.get_public_leaderboard(text, text) is
  'Public leaderboard read. Includes avatar catalog id + opt-in award tiers/crown (never raw scores).';

drop function if exists public.get_public_habit_streaks(text);

create function public.get_public_habit_streaks(
  p_period text default 'all_time'
)
returns table (
  rank bigint,
  leaderboard_name text,
  streak integer,
  award_running text,
  award_strength text,
  award_crown boolean,
  avatar_id text
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_period text := lower(btrim(coalesce(p_period, 'all_time')));
begin
  if v_period is distinct from 'all_time' then
    raise exception 'Invalid habit streak period'
      using errcode = '22023';
  end if;

  return query
  with eligible as (
    select
      p.leaderboard_name as name,
      s.streak as streak_value,
      case
        when p.show_awards_publicly then p.award_running
        else null
      end as arun,
      case
        when p.show_awards_publicly then p.award_strength
        else null
      end as astr,
      case
        when p.show_awards_publicly then coalesce(p.award_crown, false)
        else false
      end as acrown,
      case
        when pr.avatar_id in (
          'none',
          'mark-sun',
          'mark-pulse',
          'mark-shield',
          'mark-peak',
          'mark-bolt'
        ) then pr.avatar_id
        else 'none'
      end as avid
    from public.habit_streak_shares s
    inner join public.leaderboard_profiles p
      on p.user_id = s.user_id
    left join public.profiles pr
      on pr.id = s.user_id
    where s.is_active = true
      and s.streak >= 0
      and char_length(btrim(p.leaderboard_name)) > 0
  ),
  ranked as (
    select
      dense_rank() over (
        order by e.streak_value desc
      ) as rnk,
      e.name,
      e.streak_value,
      e.arun,
      e.astr,
      e.acrown,
      e.avid
    from eligible e
  )
  select
    ranked.rnk,
    ranked.name,
    ranked.streak_value,
    ranked.arun,
    ranked.astr,
    ranked.acrown,
    ranked.avid
  from ranked
  order by ranked.rnk asc, lower(ranked.name) asc
  limit 100;
end;
$$;

revoke all on function public.get_public_habit_streaks(text) from public;
grant execute on function public.get_public_habit_streaks(text)
  to anon, authenticated;

comment on function public.get_public_habit_streaks(text) is
  'Public habit streak board. Includes avatar catalog id + opt-in award tiers/crown.';

comment on column public.profiles.avatar_id is
  'Preset avatar catalog id shown in private UI and next to Leaderboard Name on public boards.';
