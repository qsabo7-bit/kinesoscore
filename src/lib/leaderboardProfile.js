import { supabase, isSupabaseConfigured } from '../supabaseClient'

/** Matches Stage 1 DB CHECKs on public.leaderboard_profiles. */
export const LEADERBOARD_NAME_MIN = 3
export const LEADERBOARD_NAME_MAX = 24
export const LEADERBOARD_NAME_PATTERN = /^[A-Za-z0-9_-]+$/

/**
 * @param {string} raw
 * @returns {{ ok: true, name: string } | { ok: false, error: string }}
 */
export function validateLeaderboardName(raw) {
  const name = String(raw ?? '').trim()
  if (!name) {
    return { ok: false, error: 'Enter a Leaderboard Name, or clear it to remove.' }
  }
  if (
    name.length < LEADERBOARD_NAME_MIN ||
    name.length > LEADERBOARD_NAME_MAX
  ) {
    return {
      ok: false,
      error: `Leaderboard Name must be ${LEADERBOARD_NAME_MIN}–${LEADERBOARD_NAME_MAX} characters.`,
    }
  }
  if (!LEADERBOARD_NAME_PATTERN.test(name)) {
    return {
      ok: false,
      error: 'Use only letters, numbers, underscores, and hyphens.',
    }
  }
  return { ok: true, name }
}

/**
 * @param {unknown} err
 * @param {string} [fallback]
 */
export function friendlyLeaderboardError(
  err,
  fallback = 'Could not update Leaderboard Name. Please try again.',
) {
  const code = err?.code || err?.error?.code
  const text = String(err?.message || err || '')

  if (
    code === '23505' ||
    /duplicate key|unique constraint|leaderboard_profiles_name_ci/i.test(text)
  ) {
    return 'That Leaderboard Name is already taken. Try another.'
  }

  if (
    code === 'PGRST205' ||
    /Could not find the table .*leaderboard_profiles/i.test(text)
  ) {
    return 'Leaderboard Name is not available yet. Run the Stage 1 SQL migration in Supabase, then try again.'
  }

  if (/permission denied|42501|row-level security/i.test(text)) {
    return 'Could not update Leaderboard Name (permission denied). Check Supabase RLS/grants for leaderboard_profiles.'
  }

  if (/failed to fetch|networkerror|network request failed|load failed/i.test(text)) {
    return 'Network error. Check your connection and try again.'
  }

  if (/check constraint|leaderboard_profiles_name_/i.test(text)) {
    return 'Use 3–24 characters: letters, numbers, underscores, and hyphens only.'
  }

  return fallback
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
