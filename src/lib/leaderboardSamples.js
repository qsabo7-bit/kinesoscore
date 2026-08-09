/**
 * Placeholder leaderboard athletes shown only while a board has zero live rows.
 * Disappear automatically once real shares exist for that board/period.
 */

const SCORE_SAMPLES = [
  { rank: 1, leaderboard_name: 'NorthPeak', result_display: '91' },
  { rank: 2, leaderboard_name: 'IronHarbor', result_display: '87' },
  { rank: 3, leaderboard_name: 'CedarLine', result_display: '84' },
  { rank: 4, leaderboard_name: 'AtlasRun', result_display: '79' },
  { rank: 5, leaderboard_name: 'QuietWatt', result_display: '74' },
]

const RUNNING_SAMPLES = [
  { rank: 1, leaderboard_name: 'PaceForge', result_display: '18:42' },
  { rank: 2, leaderboard_name: 'RidgeTempo', result_display: '19:55' },
  { rank: 3, leaderboard_name: 'LakeSplit', result_display: '21:08' },
  { rank: 4, leaderboard_name: 'VoltStride', result_display: '22:31' },
  { rank: 5, leaderboard_name: 'MarbleMile', result_display: '24:16' },
]

const STRENGTH_SAMPLES = [
  { rank: 1, leaderboard_name: 'BarPath', result_display: '1,205 lb' },
  { rank: 2, leaderboard_name: 'SteelGrove', result_display: '1,090 lb' },
  { rank: 3, leaderboard_name: 'KineticOak', result_display: '980 lb' },
  { rank: 4, leaderboard_name: 'PlateNorth', result_display: '905 lb' },
  { rank: 5, leaderboard_name: 'LoadLine', result_display: '840 lb' },
]

const ASSESSMENT_SAMPLES = [
  { rank: 1, leaderboard_name: 'ReadyMark', result_display: '96 pts' },
  { rank: 2, leaderboard_name: 'DrillPoint', result_display: '91 pts' },
  { rank: 3, leaderboard_name: 'FieldEdge', result_display: '87 pts' },
  { rank: 4, leaderboard_name: 'CadenceCo', result_display: '83 pts' },
  { rank: 5, leaderboard_name: 'BaseLine', result_display: '78 pts' },
]

const HABIT_SAMPLES = [
  { rank: 1, leaderboard_name: 'DawnStack', result_display: '42 days' },
  { rank: 2, leaderboard_name: 'SteadyCue', result_display: '31 days' },
  { rank: 3, leaderboard_name: 'RoutineBay', result_display: '24 days' },
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
