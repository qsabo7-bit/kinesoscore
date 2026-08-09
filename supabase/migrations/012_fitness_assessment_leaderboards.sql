-- Fitness Assessments leaderboard boards (max tests + benchmark WODs).
-- Keep aligned with src/lib/leaderboardShares.js LEADERBOARD_SHARE_TARGETS.

create or replace function public.leaderboard_share_target_allowed(
  p_board_key text,
  p_calculator_type text,
  p_exercise_name text,
  p_higher_is_better boolean
)
returns boolean
language sql
immutable
as $$
  select exists (
    select 1
    from (
      values
        ('mykinesoscore', 'FPC Score', 'Overall FPC Score', true),
        ('strength:Bench Press', 'strength', 'Bench Press', true),
        ('strength:Squat', 'strength', 'Squat', true),
        ('strength:Deadlift', 'strength', 'Deadlift', true),
        ('strength:SBD Total', 'strength', 'SBD Total', true),
        ('running:Mile', 'running', 'Mile', false),
        ('running:1.5 Mile', 'running', '1.5 Mile', false),
        ('running:2 Mile', 'running', '2 Mile', false),
        ('running:5K', 'running', '5K', false),
        ('running:5 Mile', 'running', '5 Mile', false),
        ('running:10K', 'running', '10K', false),
        ('running:10 Mile', 'running', '10 Mile', false),
        ('running:Half Marathon', 'running', 'Half Marathon', false),
        ('running:Marathon', 'running', 'Marathon', false),
        ('assessment:air-force-pfra', 'air-force-pfra', 'Overall Score', true),
        ('assessment:air-force-pfa', 'air-force-pfa', 'Overall Score', true),
        ('assessment:army-aft', 'army-aft', 'Overall Score', true),
        ('assessment:marine-pft', 'marine-pft', 'Overall Score', true),
        ('assessment:navy-prt', 'navy-prt', 'Overall Score', true),
        ('fitness:max-pushups', 'max-pushups', 'Max Push-ups', true),
        ('fitness:max-pullups', 'max-pullups', 'Max Pull-ups', true),
        ('fitness:fran-rx', 'fran', 'Fran Rx', false),
        ('fitness:fran-scaled', 'fran', 'Fran Scaled', false),
        ('fitness:murph-rx', 'murph', 'Murph Rx', false),
        ('fitness:murph-scaled', 'murph', 'Murph Scaled', false),
        ('fitness:cindy', 'cindy', 'Cindy', true)
    ) as allowed(board_key, calculator_type, exercise_name, higher_is_better)
    where allowed.board_key = p_board_key
      and allowed.calculator_type = p_calculator_type
      and allowed.exercise_name = p_exercise_name
      and allowed.higher_is_better = p_higher_is_better
  );
$$;

revoke all on function public.leaderboard_share_target_allowed(text, text, text, boolean)
  from public;
grant execute on function public.leaderboard_share_target_allowed(text, text, text, boolean)
  to authenticated;

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
  v_week date := (date_trunc('week', timezone('UTC', now())))::date;
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
        or s.period_week = v_week
      )
  ),
  ranked as (
    select
      dense_rank() over (
        order by e.rvalue desc, lower(e.name) asc
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
