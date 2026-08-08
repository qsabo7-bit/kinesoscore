import { BRAND } from '../data/brand.js'
import { supabase, isSupabaseConfigured } from '../supabaseClient'

/**
 * Stage 3 allowlist — board_key + frozen performance_records identity.
 * Keep in sync with public.leaderboard_share_target_allowed(...).
 */
export const LEADERBOARD_SHARE_TARGETS = [
  {
    boardKey: 'mykinesoscore',
    calculatorType: BRAND.scoreCalculatorType,
    exerciseName: BRAND.scoreExerciseName,
    higherIsBetter: true,
  },
  {
    boardKey: 'strength:Bench Press',
    calculatorType: 'strength',
    exerciseName: 'Bench Press',
    higherIsBetter: true,
  },
  {
    boardKey: 'strength:Squat',
    calculatorType: 'strength',
    exerciseName: 'Squat',
    higherIsBetter: true,
  },
  {
    boardKey: 'strength:Deadlift',
    calculatorType: 'strength',
    exerciseName: 'Deadlift',
    higherIsBetter: true,
  },
  {
    boardKey: 'strength:SBD Total',
    calculatorType: 'strength',
    exerciseName: 'SBD Total',
    higherIsBetter: true,
  },
  {
    boardKey: 'running:Mile',
    calculatorType: 'running',
    exerciseName: 'Mile',
    higherIsBetter: false,
  },
  {
    boardKey: 'running:1.5 Mile',
    calculatorType: 'running',
    exerciseName: '1.5 Mile',
    higherIsBetter: false,
  },
  {
    boardKey: 'running:2 Mile',
    calculatorType: 'running',
    exerciseName: '2 Mile',
    higherIsBetter: false,
  },
  {
    boardKey: 'running:5K',
    calculatorType: 'running',
    exerciseName: '5K',
    higherIsBetter: false,
  },
  {
    boardKey: 'running:5 Mile',
    calculatorType: 'running',
    exerciseName: '5 Mile',
    higherIsBetter: false,
  },
  {
    boardKey: 'running:10K',
    calculatorType: 'running',
    exerciseName: '10K',
    higherIsBetter: false,
  },
  {
    boardKey: 'running:10 Mile',
    calculatorType: 'running',
    exerciseName: '10 Mile',
    higherIsBetter: false,
  },
  {
    boardKey: 'running:Half Marathon',
    calculatorType: 'running',
    exerciseName: 'Half Marathon',
    higherIsBetter: false,
  },
  {
    boardKey: 'running:Marathon',
    calculatorType: 'running',
    exerciseName: 'Marathon',
    higherIsBetter: false,
  },
  {
    boardKey: 'assessment:air-force-pfra',
    calculatorType: 'air-force-pfra',
    exerciseName: 'Overall Score',
    higherIsBetter: true,
  },
  {
    boardKey: 'assessment:air-force-pfa',
    calculatorType: 'air-force-pfa',
    exerciseName: 'Overall Score',
    higherIsBetter: true,
  },
  {
    boardKey: 'assessment:army-aft',
    calculatorType: 'army-aft',
    exerciseName: 'Overall Score',
    higherIsBetter: true,
  },
  {
    boardKey: 'assessment:marine-pft',
    calculatorType: 'marine-pft',
    exerciseName: 'Overall Score',
    higherIsBetter: true,
  },
  {
    boardKey: 'assessment:navy-prt',
    calculatorType: 'navy-prt',
    exerciseName: 'Overall Score',
    higherIsBetter: true,
  },
]

/**
 * @param {string} calculatorType
 * @param {string} exerciseName
 * @param {boolean} [higherIsBetter]
 * @returns {(typeof LEADERBOARD_SHARE_TARGETS)[number] | null}
 */
export function resolveLeaderboardShareTarget(
  calculatorType,
  exerciseName,
  higherIsBetter = true,
) {
  const hib = higherIsBetter !== false
  return (
    LEADERBOARD_SHARE_TARGETS.find(
      (target) =>
        target.calculatorType === calculatorType &&
        target.exerciseName === exerciseName &&
        target.higherIsBetter === hib,
    ) || null
  )
}

function requireConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.')
  }
}

/**
 * @param {unknown} err
 * @param {string} [fallback]
 */
export function friendlyLeaderboardShareError(
  err,
  fallback = 'Could not update global leaderboard sharing. Your result was saved privately.',
) {
  const code = err?.code || err?.error?.code
  const text = String(err?.message || err || '')

  if (
    /Leaderboard Name is required/i.test(text) ||
    (/P0001/.test(String(code)) && /Leaderboard Name/i.test(text))
  ) {
    return 'A Leaderboard Name is required to share results globally. Add one in Account Settings. Your result was saved privately.'
  }

  if (
    code === '23505' ||
    /duplicate key|unique constraint|leaderboard_shares_one_per_user_board/i.test(
      text,
    )
  ) {
    return 'Could not update your shared leaderboard entry. Your result was saved privately.'
  }

  if (/cannot be shared to leaderboards/i.test(text)) {
    return 'This result cannot be shared to the global leaderboard. Your result was saved privately.'
  }

  if (/source record/i.test(text)) {
    return 'Could not link this result for sharing. Your result was saved privately.'
  }

  if (
    code === 'PGRST205' ||
    /Could not find the table .*leaderboard_shares/i.test(text)
  ) {
    return 'Leaderboard sharing is not available yet. Your result was saved privately.'
  }

  if (/permission denied|42501|row-level security|Not allowed to write/i.test(text)) {
    return 'Could not share this result (permission denied). Your result was saved privately.'
  }

  if (/failed to fetch|networkerror|network request failed|load failed/i.test(text)) {
    return 'Network error while sharing. Your result was saved privately — try sharing again when you are back online.'
  }

  return fallback
}

/**
 * @param {string} userId
 * @param {string} boardKey
 * @returns {Promise<{ id: string, is_active: boolean } | null>}
 */
export async function fetchActiveLeaderboardShare(userId, boardKey) {
  requireConfigured()
  if (!userId || !boardKey) return null

  const { data, error } = await supabase
    .from('leaderboard_shares')
    .select('id, is_active')
    .eq('user_id', userId)
    .eq('board_key', boardKey)
    .maybeSingle()

  if (error) throw error
  if (!data?.is_active) return null
  return data
}

/**
 * Upsert an active share. Server trigger sets display_name, rank_value, period_week.
 * @param {object} input
 */
export async function upsertLeaderboardShare({
  userId,
  sourceRecordId,
  boardKey,
  calculatorType,
  exerciseName,
  resultValue,
  resultUnit = null,
  higherIsBetter,
}) {
  requireConfigured()

  const { data, error } = await supabase
    .from('leaderboard_shares')
    .upsert(
      {
        user_id: userId,
        source_record_id: sourceRecordId,
        board_key: boardKey,
        calculator_type: calculatorType,
        exercise_name: exerciseName,
        result_value: resultValue,
        result_unit: resultUnit,
        higher_is_better: higherIsBetter,
        is_active: true,
        shared_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,board_key' },
    )
    .select('id, is_active, display_name, board_key')
    .single()

  if (error) throw error
  return data
}

/**
 * Deactivate an existing share without deleting private performance history.
 * @param {string} userId
 * @param {string} boardKey
 */
export async function deactivateLeaderboardShare(userId, boardKey) {
  requireConfigured()
  if (!userId || !boardKey) return

  const { error } = await supabase
    .from('leaderboard_shares')
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .eq('board_key', boardKey)
    .eq('is_active', true)

  if (error) throw error
}
