/**
 * Placeholder leaderboard athletes shown only while a board has zero live rows.
 * Disappear automatically once real shares exist for that board/period.
 */

const SAMPLE_AWARDS_TOP = {
  strength: 'gold',
  running: 'diamond',
  crown: false,
}
const SAMPLE_AWARDS_MID = {
  strength: 'silver',
  running: 'bronze',
  crown: false,
}
const SAMPLE_AWARDS_CROWN = {
  strength: 'diamond',
  running: 'diamond',
  crown: true,
}

const SCORE_SAMPLES = [
  {
    rank: 1,
    leaderboard_name: 'NorthPeak',
    result_display: '91',
    awards: SAMPLE_AWARDS_CROWN,
  },
  {
    rank: 2,
    leaderboard_name: 'IronHarbor',
    result_display: '87',
    awards: SAMPLE_AWARDS_TOP,
  },
  {
    rank: 3,
    leaderboard_name: 'CedarLine',
    result_display: '84',
    awards: SAMPLE_AWARDS_MID,
  },
  { rank: 4, leaderboard_name: 'AtlasRun', result_display: '79' },
  { rank: 5, leaderboard_name: 'QuietWatt', result_display: '74' },
]

const RUNNING_SAMPLES = [
  {
    rank: 1,
    leaderboard_name: 'PaceForge',
    result_display: '18:42',
    awards: SAMPLE_AWARDS_TOP,
  },
  {
    rank: 2,
    leaderboard_name: 'RidgeTempo',
    result_display: '19:55',
    awards: SAMPLE_AWARDS_MID,
  },
  { rank: 3, leaderboard_name: 'LakeSplit', result_display: '21:08' },
  { rank: 4, leaderboard_name: 'VoltStride', result_display: '22:31' },
  { rank: 5, leaderboard_name: 'MarbleMile', result_display: '24:16' },
]

const STRENGTH_SAMPLES = [
  {
    rank: 1,
    leaderboard_name: 'BarPath',
    result_display: '1,205 lb',
    awards: SAMPLE_AWARDS_CROWN,
  },
  {
    rank: 2,
    leaderboard_name: 'SteelGrove',
    result_display: '1,090 lb',
    awards: SAMPLE_AWARDS_TOP,
  },
  { rank: 3, leaderboard_name: 'KineticOak', result_display: '980 lb' },
  { rank: 4, leaderboard_name: 'PlateNorth', result_display: '905 lb' },
  { rank: 5, leaderboard_name: 'LoadLine', result_display: '840 lb' },
]

// Match live formatLeaderboardResult for result_unit: 'points' (bare number).
const ASSESSMENT_SAMPLES = [
  {
    rank: 1,
    leaderboard_name: 'ReadyMark',
    result_display: '96',
    awards: SAMPLE_AWARDS_CROWN,
  },
  {
    rank: 2,
    leaderboard_name: 'DrillPoint',
    result_display: '91',
    awards: SAMPLE_AWARDS_TOP,
  },
  {
    rank: 3,
    leaderboard_name: 'FieldEdge',
    result_display: '87',
    awards: SAMPLE_AWARDS_MID,
  },
  { rank: 4, leaderboard_name: 'CadenceCo', result_display: '83' },
  { rank: 5, leaderboard_name: 'BaseLine', result_display: '78' },
]

const FITNESS_TIME_SAMPLES = [
  {
    rank: 1,
    leaderboard_name: 'BarPath',
    result_display: '2:48',
    awards: SAMPLE_AWARDS_CROWN,
  },
  {
    rank: 2,
    leaderboard_name: 'SteelGrove',
    result_display: '3:12',
    awards: SAMPLE_AWARDS_TOP,
  },
  {
    rank: 3,
    leaderboard_name: 'KineticOak',
    result_display: '3:41',
    awards: SAMPLE_AWARDS_MID,
  },
  { rank: 4, leaderboard_name: 'PlateNorth', result_display: '4:05' },
  { rank: 5, leaderboard_name: 'LoadLine', result_display: '4:33' },
]

// Match live formatLeaderboardResult for result_unit: 'reps'.
const FITNESS_REPS_SAMPLES = [
  {
    rank: 1,
    leaderboard_name: 'PullCrew',
    result_display: '52 reps',
    awards: SAMPLE_AWARDS_TOP,
  },
  {
    rank: 2,
    leaderboard_name: 'PressLine',
    result_display: '47 reps',
    awards: SAMPLE_AWARDS_MID,
  },
  { rank: 3, leaderboard_name: 'HangTight', result_display: '41 reps' },
  { rank: 4, leaderboard_name: 'FloorWork', result_display: '36 reps' },
  { rank: 5, leaderboard_name: 'RepForge', result_display: '30 reps' },
]

// Match live Cindy boards (rounds + leftover, not raw work reps).
const FITNESS_CINDY_SAMPLES = [
  {
    rank: 1,
    leaderboard_name: 'RoundCrew',
    result_display: '18 + 4',
    awards: SAMPLE_AWARDS_TOP,
  },
  {
    rank: 2,
    leaderboard_name: 'AmrapBay',
    result_display: '16 + 12',
    awards: SAMPLE_AWARDS_MID,
  },
  { rank: 3, leaderboard_name: 'PullSquat', result_display: '14 + 8' },
  { rank: 4, leaderboard_name: 'TwentyCap', result_display: '12 + 20' },
  { rank: 5, leaderboard_name: 'ChipPace', result_display: '10 + 6' },
]

const HABIT_SAMPLES = [
  {
    rank: 1,
    leaderboard_name: 'DawnStack',
    result_display: '42 days',
    awards: SAMPLE_AWARDS_CROWN,
  },
  {
    rank: 2,
    leaderboard_name: 'SteadyCue',
    result_display: '31 days',
    awards: SAMPLE_AWARDS_TOP,
  },
  {
    rank: 3,
    leaderboard_name: 'RoutineBay',
    result_display: '24 days',
    awards: SAMPLE_AWARDS_MID,
  },
  { rank: 4, leaderboard_name: 'CheckInCo', result_display: '18 days' },
  { rank: 5, leaderboard_name: 'HabitArc', result_display: '12 days' },
]

/**
 * @param {string} boardKey
 * @returns {Array<{ rank: number, leaderboard_name: string, result_display: string }>}
 */
export function getLeaderboardSampleRows(boardKey) {
  const key = String(boardKey || '')
  if (key === 'habits:streak') return HABIT_SAMPLES
  if (key === 'mykinesoscore') return SCORE_SAMPLES
  if (key.startsWith('running:')) return RUNNING_SAMPLES
  if (key.startsWith('strength:')) return STRENGTH_SAMPLES
  if (key.startsWith('assessment:')) return ASSESSMENT_SAMPLES
  if (
    key.startsWith('fitness:fran') ||
    key.startsWith('fitness:murph')
  ) {
    return FITNESS_TIME_SAMPLES
  }
  if (key.startsWith('fitness:cindy')) return FITNESS_CINDY_SAMPLES
  if (key.startsWith('fitness:')) return FITNESS_REPS_SAMPLES
  return SCORE_SAMPLES
}

/**
 * Prefer live rows; fall back to samples when empty.
 * @param {string} boardKey
 * @param {unknown[]} rows
 */
export function resolveLeaderboardRows(boardKey, rows) {
  const live = Array.isArray(rows) ? rows : []
  if (live.length > 0) {
    return { rows: live, isSample: false }
  }
  return {
    rows: getLeaderboardSampleRows(boardKey),
    isSample: true,
  }
}
