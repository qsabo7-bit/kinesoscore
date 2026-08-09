/**
 * Stage 9 — private award derivation from myKinesoScore component percentiles.
 * Does not alter score formulas; awards are derived from stored/computed scores.
 *
 * Component scores are 0–100. Thresholds (Running and Strength independently):
 *   <50       → none
 *   50–64     → bronze
 *   65–79     → silver
 *   80–89     → gold
 *   90–100    → diamond
 *
 * Crown: running >= 90 AND strength >= 90 (not composite or sum).
 */

/** @typedef {'bronze' | 'silver' | 'gold' | 'diamond'} AwardTier */

export const AWARD_TIERS = /** @type {const} */ ([
  'bronze',
  'silver',
  'gold',
  'diamond',
])

export const AWARD_LABELS = {
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  diamond: 'Diamond',
}

/**
 * @param {unknown} score
 * @returns {AwardTier | null}
 */
export function deriveComponentAward(score) {
  const n = Number(score)
  if (!Number.isFinite(n)) return null
  if (n < 50) return null
  if (n < 65) return 'bronze'
  if (n < 80) return 'silver'
  if (n < 90) return 'gold'
  return 'diamond'
}

/**
 * @param {unknown} runningScore
 * @param {unknown} strengthScore
 * @returns {boolean}
 */
export function deriveCrown(runningScore, strengthScore) {
  const running = Number(runningScore)
  const strength = Number(strengthScore)
  return (
    Number.isFinite(running) &&
    Number.isFinite(strength) &&
    running >= 90 &&
    strength >= 90
  )
}

/**
 * @param {{ runningScore?: unknown, strengthScore?: unknown }} scores
 */
export function deriveAwards(scores = {}) {
  const runningScore = scores.runningScore
  const strengthScore = scores.strengthScore
  return {
    running: deriveComponentAward(runningScore),
    strength: deriveComponentAward(strengthScore),
    crown: deriveCrown(runningScore, strengthScore),
  }
}
