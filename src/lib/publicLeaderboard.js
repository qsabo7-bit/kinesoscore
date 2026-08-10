import { BRAND } from '../data/brand.js'
import { assignDenseRanks } from './leaderboardDenseRank.js'
import { formatRecordValue, isCindyResult } from './performanceRecords.js'
import { LEADERBOARD_SHARE_TARGETS } from './leaderboardShares.js'
import { supabase, isSupabaseConfigured } from '../supabaseClient'

/** @typedef {'all_time' | 'this_week'} LeaderboardPeriod */

/**
 * UI category groups built from the Stage 3/4 allowlist (single source of truth).
 */
export const LEADERBOARD_UI_CATEGORIES = [
  {
    id: 'score',
    label: BRAND.scoreName.replace('™', ''),
    boardKeys: ['mykinesoscore'],
  },
  {
    id: 'running',
    label: 'Running',
    boardKeys: LEADERBOARD_SHARE_TARGETS.filter((t) =>
      t.boardKey.startsWith('running:'),
    ).map((t) => t.boardKey),
  },
  {
    id: 'strength',
    label: 'Strength',
    boardKeys: LEADERBOARD_SHARE_TARGETS.filter((t) =>
      t.boardKey.startsWith('strength:'),
    ).map((t) => t.boardKey),
  },
  {
    id: 'fitness',
    label: 'Fitness Assessments',
    boardKeys: LEADERBOARD_SHARE_TARGETS.filter((t) =>
      t.boardKey.startsWith('fitness:'),
    ).map((t) => t.boardKey),
  },
  {
    id: 'assessments',
    label: 'Military Assessments',
    boardKeys: LEADERBOARD_SHARE_TARGETS.filter((t) =>
      t.boardKey.startsWith('assessment:'),
    ).map((t) => t.boardKey),
  },
  {
    id: 'habits',
    label: 'Habit Streaks',
    boardKeys: ['habits:streak'],
  },
]

const BOARD_LABELS = {
  mykinesoscore: BRAND.scoreName,
  'habits:streak': 'Habit Streaks',
  'strength:Bench Press': 'Bench Press',
  'strength:Squat': 'Squat',
  'strength:Deadlift': 'Deadlift',
  'strength:SBD Total': 'SBD Total',
  'running:Mile': 'Mile',
  'running:1.5 Mile': '1.5 Mile',
  'running:2 Mile': '2 Mile',
  'running:5K': '5K',
  'running:5 Mile': '5 Mile',
  'running:10K': '10K',
  'running:10 Mile': '10 Mile',
  'running:Half Marathon': 'Half Marathon',
  'running:Marathon': 'Marathon',
  'assessment:air-force-pfra': 'Air Force PFRA',
  'assessment:air-force-pfa': 'Air Force PFA',
  'assessment:army-aft': 'Army AFT',
  'assessment:marine-pft': 'Marine PFT',
  'assessment:navy-prt': 'Navy PRT',
  'fitness:max-pushups': 'Max Push-ups',
  'fitness:max-pullups': 'Max Pull-ups',
  'fitness:fran-rx': 'Fran Rx',
  'fitness:fran-scaled': 'Fran Scaled',
  'fitness:murph-rx': 'Murph Rx',
  'fitness:murph-scaled': 'Murph Scaled',
  'fitness:cindy': 'Cindy',
}

export function leaderboardBoardLabel(boardKey) {
  return BOARD_LABELS[boardKey] || boardKey
}

/**
 * Calculator / Habits tab to open when inviting the first real share
 * for a given public board.
 * @param {string} boardKey
 * @returns {string}
 */
export function calculatorTabForBoardKey(boardKey) {
  const key = String(boardKey || '')
  if (key === 'habits:streak') return 'habits'
  const target = LEADERBOARD_SHARE_TARGETS.find((item) => item.boardKey === key)
  if (!target) return 'scoring'
  if (target.calculatorType === BRAND.scoreCalculatorType) return 'scoring'
  return target.calculatorType
}

export function leaderboardValueKind(boardKey) {
  const key = String(boardKey)
  if (key.startsWith('running:')) return 'duration'
  // Timed benchmark WODs store seconds.
  if (
    key.startsWith('fitness:fran') ||
    key.startsWith('fitness:murph')
  ) {
    return 'duration'
  }
  return 'number'
}

/**
 * Format a public leaderboard result using existing app conventions.
 * @param {{ result_value: number, result_unit?: string | null, board_key: string }} row
 */
export function formatLeaderboardResult(row) {
  if (isCindyResult(row.board_key) || isCindyResult(row)) {
    return formatRecordValue(row.result_value, 'cindy')
  }
  const kind = leaderboardValueKind(row.board_key)
  if (kind === 'duration') {
    return formatRecordValue(row.result_value, 'duration', null, 'clock')
  }
  const unit = row.result_unit || null
  // Scores / assessments: show number; append unit when meaningful (lb/kg/points).
  if (unit === 'points' || unit === 'sec') {
    return formatRecordValue(row.result_value, 'number', null)
  }
  return formatRecordValue(row.result_value, 'number', unit)
}

/** Sample rows for locked/phased preview only — never mixed with live RPC data. */
export const SAMPLE_LEADERBOARD_ROWS = [
  { rank: 1, leaderboard_name: 'TrailRunner_7', result_display: '72' },
  { rank: 2, leaderboard_name: 'IronPace', result_display: '68' },
  { rank: 3, leaderboard_name: 'SteadyState', result_display: '61' },
  { rank: 4, leaderboard_name: 'BaseBuilder', result_display: '54' },
  { rank: 5, leaderboard_name: 'WeekendPR', result_display: '49' },
]

/** Habit streak locked preview — same shape as live streak rows; never mixed with RPC data. */
export const SAMPLE_HABIT_STREAK_ROWS = [
  { rank: 1, leaderboard_name: 'TrailRunner_7', result_display: '48 days' },
  { rank: 2, leaderboard_name: 'IronPace', result_display: '36 days' },
  { rank: 3, leaderboard_name: 'SteadyState', result_display: '29 days' },
  { rank: 4, leaderboard_name: 'BaseBuilder', result_display: '21 days' },
  { rank: 5, leaderboard_name: 'WeekendPR', result_display: '14 days' },
]

/**
 * @param {string} boardKey
 * @param {LeaderboardPeriod} period
 */
export async function fetchPublicLeaderboard(boardKey, period = 'all_time') {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.')
  }

  const { data, error } = await supabase.rpc('get_public_leaderboard', {
    p_board_key: boardKey,
    p_period: period,
  })

  if (error) throw error

  const mapped = (data || []).map((row) => ({
    rank: Number(row.rank),
    leaderboard_name: String(row.leaderboard_name || ''),
    board_key: String(row.board_key || boardKey),
    result_value: Number(row.result_value),
    result_unit: row.result_unit ?? null,
    higher_is_better: Boolean(row.higher_is_better),
    result_display: formatLeaderboardResult({
      result_value: row.result_value,
      result_unit: row.result_unit,
      board_key: row.board_key || boardKey,
    }),
  }))

  // Re-apply dense ranks by score so equal values tie even before SQL migration.
  return assignDenseRanks(mapped, (row) => row.result_value)
}

export function friendlyPublicLeaderboardError(err) {
  const text = String(err?.message || err || '')
  if (/Invalid leaderboard/i.test(text)) {
    return 'That leaderboard category is not available.'
  }
  if (/failed to fetch|networkerror|network request failed|load failed/i.test(text)) {
    return 'Network error. Check your connection and try again.'
  }
  if (/Could not find the function|PGRST202/i.test(text)) {
    return 'Leaderboards are not available yet. Please try again later.'
  }
  return 'Could not load the leaderboard. Please try again.'
}
