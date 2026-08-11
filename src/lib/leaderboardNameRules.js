import { containsBlockedNameTerm } from './blockedNameTerms.js'

/** Matches Stage 1 DB CHECKs on public.leaderboard_profiles. */
export const LEADERBOARD_NAME_MIN = 3
export const LEADERBOARD_NAME_MAX = 24
export const LEADERBOARD_NAME_PATTERN = /^[A-Za-z0-9_-]+$/

/**
 * Stage 10 reserved names — mirror of public.reserved_leaderboard_names.
 * DB trigger remains the source of truth; this is UX-only.
 */
export const RESERVED_LEADERBOARD_NAMES = Object.freeze([
  'admin',
  'administrator',
  'kinesoscore',
  'kineso',
  'support',
  'staff',
  'moderator',
  'system',
  'official',
  'leaderboard',
  'api',
  'root',
  'help',
  'null',
  'undefined',
])

const RESERVED_LEADERBOARD_NAME_SET = new Set(RESERVED_LEADERBOARD_NAMES)

/**
 * @param {string} name
 * @returns {boolean}
 */
export function isReservedLeaderboardName(name) {
  return RESERVED_LEADERBOARD_NAME_SET.has(String(name || '').trim().toLowerCase())
}

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
  if (isReservedLeaderboardName(name)) {
    return {
      ok: false,
      error: 'That Leaderboard Name is reserved. Choose another.',
    }
  }
  if (containsBlockedNameTerm(name)) {
    return {
      ok: false,
      error: 'That Leaderboard Name is not allowed. Choose another.',
    }
  }
  return { ok: true, name }
}

/**
 * Pure error-message mapping for Leaderboard Name mutations (no network).
 * @param {unknown} err
 * @param {string} [fallback]
 */
export function friendlyLeaderboardNameError(
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

  if (/Leaderboard Name is reserved/i.test(text)) {
    return 'That Leaderboard Name is reserved. Choose another.'
  }

  if (/Leaderboard Name is not allowed/i.test(text)) {
    return 'That Leaderboard Name is not allowed. Choose another.'
  }

  if (/Rate limit exceeded for leaderboard_name/i.test(text)) {
    return 'Too many Leaderboard Name changes. Try again in a little while.'
  }

  if (/A Leaderboard Name is required before sharing/i.test(text)) {
    return 'Could not clear Leaderboard Name while public shares were still linked. Refresh and try again, or run the latest database update.'
  }

  if (
    code === 'PGRST205' ||
    /Could not find the table .*leaderboard_profiles/i.test(text)
  ) {
    return 'Leaderboard Name is not available right now. Please try again later.'
  }

  if (/permission denied|42501|row-level security/i.test(text)) {
    return 'Could not update Leaderboard Name right now. Please try again later.'
  }

  if (/failed to fetch|networkerror|network request failed|load failed/i.test(text)) {
    return 'Network error. Check your connection and try again.'
  }

  if (/check constraint|leaderboard_profiles_name_/i.test(text)) {
    return 'Use 3–24 characters: letters, numbers, underscores, and hyphens only.'
  }

  return fallback
}

/**
 * Pure error-message mapping for share rate-limit (and related) failures.
 * @param {string} text
 * @returns {string | null}
 */
export function friendlyLeaderboardShareRateLimitMessage(text) {
  if (/Rate limit exceeded for leaderboard_share/i.test(String(text || ''))) {
    return 'Too many leaderboard share updates. Your result was saved privately — try sharing again in a few minutes.'
  }
  return null
}
