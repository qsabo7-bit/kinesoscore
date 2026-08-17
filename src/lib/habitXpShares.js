import { supabase, isSupabaseConfigured } from '../supabaseClient'

function requireConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.')
  }
}

/**
 * @param {unknown} err
 * @param {string} [fallback]
 */
export function friendlyHabitXpShareError(
  err,
  fallback = 'Could not update habit XP sharing. Please try again.',
) {
  const text = String(err?.message || err || '')
  if (/Leaderboard Name is required/i.test(text)) {
    return 'Add a Leaderboard Name in Account Settings before sharing your XP.'
  }
  if (/Not authenticated/i.test(text)) {
    return 'Sign in to share your habit XP.'
  }
  if (/failed to fetch|networkerror|network request failed|load failed/i.test(text)) {
    return 'Network error. Check your connection and try again.'
  }
  if (
    /Could not find the table|Could not find the function|PGRST202|PGRST205/i.test(
      text,
    )
  ) {
    return 'Habit XP sharing is not available yet. Please try again later.'
  }
  return fallback
}

/** @param {string} userId */
export async function fetchHabitXpShare(userId) {
  requireConfigured()
  const { data, error } = await supabase
    .from('habit_xp_shares')
    .select(
      'id, user_id, lifetime_xp, is_active, shared_at, created_at, updated_at',
    )
    .eq('user_id', userId)
    .maybeSingle()
  if (error) throw error
  return data
}

/**
 * Opt in/out of public lifetime XP sharing. Server recomputes total XP.
 * @param {boolean} isActive
 */
export async function setHabitXpShare(isActive) {
  requireConfigured()
  const { data, error } = await supabase.rpc('set_habit_xp_share', {
    p_is_active: Boolean(isActive),
  })
  if (error) throw error
  return data
}
