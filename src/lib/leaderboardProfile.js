import { supabase, isSupabaseConfigured } from '../supabaseClient'
import {
  LEADERBOARD_NAME_MAX,
  LEADERBOARD_NAME_MIN,
  LEADERBOARD_NAME_PATTERN,
  RESERVED_LEADERBOARD_NAMES,
  friendlyLeaderboardNameError,
  isReservedLeaderboardName,
  validateLeaderboardName,
} from './leaderboardNameRules.js'

export {
  LEADERBOARD_NAME_MAX,
  LEADERBOARD_NAME_MIN,
  LEADERBOARD_NAME_PATTERN,
  RESERVED_LEADERBOARD_NAMES,
  isReservedLeaderboardName,
  validateLeaderboardName,
}

/**
 * @param {unknown} err
 * @param {string} [fallback]
 */
export function friendlyLeaderboardError(err, fallback) {
  return friendlyLeaderboardNameError(err, fallback)
}

function requireConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.')
  }
}

/**
 * @param {string} userId
 * @returns {Promise<string | null>}
 */
export async function fetchLeaderboardName(userId) {
  requireConfigured()
  if (!userId) return null

  const { data, error } = await supabase
    .from('leaderboard_profiles')
    .select('leaderboard_name')
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error
  return data?.leaderboard_name ?? null
}

/**
 * Create or replace the signed-in user's Leaderboard Name.
 * @param {string} userId
 * @param {string} rawName
 * @returns {Promise<string>} normalized name
 */
export async function saveLeaderboardName(userId, rawName) {
  requireConfigured()
  const checked = validateLeaderboardName(rawName)
  if (!checked.ok) {
    const err = new Error(checked.error)
    err.code = 'VALIDATION'
    throw err
  }

  const now = new Date().toISOString()
  const { error } = await supabase.from('leaderboard_profiles').upsert(
    {
      user_id: userId,
      leaderboard_name: checked.name,
      updated_at: now,
    },
    { onConflict: 'user_id' },
  )

  if (error) throw error
  return checked.name
}

/**
 * Remove the signed-in user's Leaderboard Name (optional again).
 * @param {string} userId
 */
export async function clearLeaderboardName(userId) {
  requireConfigured()
  if (!userId) return

  const { error } = await supabase
    .from('leaderboard_profiles')
    .delete()
    .eq('user_id', userId)

  if (error) throw error
}
