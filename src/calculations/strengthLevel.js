/**
 * Recreational strength labels aligned with strengthNorms language:
 *   p25 ≈ novice, p50 ≈ typical, p75 ≈ dedicated intermediate, p95 ≈ advanced.
 * Elite is reserved for the top recreational band (≥90).
 */

/** Ratio fallbacks when peer percentiles are unavailable (lift-agnostic). */
const STRENGTH_THRESHOLDS = {
  intermediate: 1.0,
  advanced: 1.5,
  elite: 2.25,
}

/**
 * Map a peer percentile (better-than %) to Beginner→Elite.
 *
 * @param {unknown} percentile
 * @returns {'Beginner' | 'Intermediate' | 'Advanced' | 'Elite' | null}
 */
export function getStrengthLevelFromPercentile(percentile) {
  const n = Number(percentile)
  if (!Number.isFinite(n)) return null
  if (n >= 90) return 'Elite'
  if (n >= 75) return 'Advanced'
  if (n >= 25) return 'Intermediate'
  return 'Beginner'
}

/**
 * Classify strength from estimated 1RM relative to bodyweight.
 * Prefer {@link getStrengthLevelFromPercentile} when peer norms are available.
 *
 * @param {number} oneRepMax - Estimated one-rep max
 * @param {number} bodyweight - Athlete bodyweight (same units as oneRepMax)
 * @returns {'Beginner' | 'Intermediate' | 'Advanced' | 'Elite'}
 */
export function getStrengthLevel(oneRepMax, bodyweight) {
  const ratio = Number(oneRepMax) / Number(bodyweight)
  if (!Number.isFinite(ratio) || ratio <= 0) return 'Beginner'

  if (ratio >= STRENGTH_THRESHOLDS.elite) return 'Elite'
  if (ratio >= STRENGTH_THRESHOLDS.advanced) return 'Advanced'
  if (ratio >= STRENGTH_THRESHOLDS.intermediate) return 'Intermediate'
  return 'Beginner'
}
