import { supabase, isSupabaseConfigured } from '../supabaseClient'
import { localDateKey } from './habitDates.js'

function requireConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.')
  }
}

/**
 * @param {unknown} err
 * @param {string} [fallback]
 */
export function friendlyHabitStreakShareError(
  err,
  fallback = 'Could not update habit streak sharing. Please try again.',
) {
  const text = String(err?.message || err || '')
  if (/Leaderboard Name is required/i.test(text)) {
    return 'Add a Leaderboard Name in Account Settings before sharing your streak.'
  }
  if (/Invalid habit streak/i.test(text)) {
    return 'Could not share your streak for today’s date. Please try again.'
  }
  if (/Not authenticated/i.test(text)) {
    return 'Sign in to share your habit streak.'
  }
  if (/failed to fetch|networkerror|network request failed|load failed/i.test(text)) {
    return 'Network error. Check your connection and try again.'
  }
  if (
    /Could not find the table|Could not find the function|PGRST202|PGRST205/i.test(
      text,
    )
  ) {
    return 'Habit streak sharing is not available yet. Please try again later.'
  }
  return fallback
}

/** @param {string} userId */
export async function fetchHabitStreakShare(userId) {
  requireConfigured()
  const { data, error } = await supabase
    .from('habit_streak_shares')
    .select('id, user_id, streak, is_active, shared_at, created_at, updated_at')
    .eq('user_id', userId)
    .maybeSingle()
  if (error) throw error
  return data
}

/**
 * Opt in/out of public streak sharing. Server recomputes streak.
 * @param {boolean} isActive
 * @param {string} [asOfDate] local YYYY-MM-DD
 */
export async function setHabitStreakShare(isActive, asOfDate = localDateKey()) {
  requireConfigured()
  const { data, error } = await supabase.rpc('set_habit_streak_share', {
    p_is_active: Boolean(isActive),
    p_as_of: asOfDate,
  })
  if (error) throw error
  return data
}
