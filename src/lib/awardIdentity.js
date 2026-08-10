import { deriveAwards } from './fitnessAwards.js'
import { normalizeAwardTier } from './awardIdentityFormat.js'
import { fetchLatestFitnessScoreSnapshot } from './fitnessScoreSnapshots.js'
import { supabase, isSupabaseConfigured } from '../supabaseClient'

export {
  formatPublicAwardCaption,
  mapPublicAwardIdentity,
  normalizeAwardTier,
} from './awardIdentityFormat.js'

function requireConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.')
  }
}

/**
 * @param {string} userId
 * @returns {Promise<{
 *   showAwardsPublicly: boolean,
 *   running: string | null,
 *   strength: string | null,
 *   crown: boolean,
 * } | null>}
 */
export async function fetchAwardIdentitySettings(userId) {
  requireConfigured()
  if (!userId) return null

  const { data, error } = await supabase
    .from('leaderboard_profiles')
    .select(
      'show_awards_publicly, award_running, award_strength, award_crown',
    )
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  return {
    showAwardsPublicly: Boolean(data.show_awards_publicly),
    running: normalizeAwardTier(data.award_running),
    strength: normalizeAwardTier(data.award_strength),
    crown: Boolean(data.award_crown),
  }
}

/**
 * Opt in/out and optionally refresh tiers from provided awards.
 *
 * @param {{
 *   userId: string,
 *   showAwardsPublicly: boolean,
 *   awards?: { running?: string | null, strength?: string | null, crown?: boolean } | null,
 * }} args
 */
export async function saveAwardIdentitySettings({
  userId,
  showAwardsPublicly,
  awards = null,
}) {
  requireConfigured()
  if (!userId) throw new Error('Missing user.')

  const payload = {
    show_awards_publicly: Boolean(showAwardsPublicly),
    awards_updated_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  if (showAwardsPublicly && awards) {
    payload.award_running = normalizeAwardTier(awards.running)
    payload.award_strength = normalizeAwardTier(awards.strength)
    payload.award_crown = Boolean(awards.crown)
  }

  if (!showAwardsPublicly) {
    payload.award_running = null
    payload.award_strength = null
    payload.award_crown = false
  }

  const { data, error } = await supabase
    .from('leaderboard_profiles')
    .update(payload)
    .eq('user_id', userId)
    .select('user_id')
    .maybeSingle()

  if (error) throw error
  if (!data?.user_id) {
    throw new Error(
      'Set a Leaderboard Name before showing awards publicly.',
    )
  }
}

/**
 * Refresh public tiers from latest private snapshot when opted in.
 * No-op when profile missing or awards are private.
 *
 * @param {string} userId
 * @param {{ runningScore?: unknown, strengthScore?: unknown } | null} [scores]
 */
export async function syncPublicAwardIdentityFromScores(userId, scores = null) {
  requireConfigured()
  if (!userId) return

  const settings = await fetchAwardIdentitySettings(userId)
  if (!settings?.showAwardsPublicly) return

  let runningScore = scores?.runningScore
  let strengthScore = scores?.strengthScore

  if (
    !Number.isFinite(Number(runningScore)) ||
    !Number.isFinite(Number(strengthScore))
  ) {
    const snapshot = await fetchLatestFitnessScoreSnapshot(userId)
    if (!snapshot) {
      // Opted in but no remaining snapshot (e.g. jump discard) — clear public tiers.
      await saveAwardIdentitySettings({
        userId,
        showAwardsPublicly: true,
        awards: { running: null, strength: null, crown: false },
      })
      return
    }
    runningScore = snapshot.running_score
    strengthScore = snapshot.strength_score
  }

  const awards = deriveAwards({ runningScore, strengthScore })
  await saveAwardIdentitySettings({
    userId,
    showAwardsPublicly: true,
    awards,
  })
}

export function friendlyAwardIdentityError(err, fallback) {
  const text = String(err?.message || err || '')
  if (/Leaderboard Name|leaderboard_profiles/i.test(text)) {
    return 'Set a Leaderboard Name before showing awards publicly.'
  }
  if (/failed to fetch|networkerror|network request failed|load failed/i.test(text)) {
    return 'Network error. Check your connection and try again.'
  }
  return fallback || 'Could not update public awards. Please try again.'
}
