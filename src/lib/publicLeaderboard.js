import { BRAND } from '../data/brand.js'
import { formatRecordValue } from './performanceRecords.js'
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
    id: 'assessments',
    label: 'Assessments',
    boardKeys: LEADERBOARD_SHARE_TARGETS.filter((t) =>
      t.boardKey.startsWith('assessment:'),
    ).map((t) => t.boardKey),
  },
]

const BOARD_LABELS = {
  mykinesoscore: BRAND.scoreName,
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
}

export function leaderboardBoardLabel(boardKey) {
  return BOARD_LABELS[boardKey] || boardKey
}

export function leaderboardValueKind(boardKey) {
  if (String(boardKey).startsWith('running:')) return 'duration'
  return 'number'
}

/**
 * Format a public leaderboard result using existing app conventions.
 * @param {{ result_value: number, result_unit?: string | null, board_key: string }} row
 */
export function formatLeaderboardResult(row) {
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

  return (data || []).map((row) => ({
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
