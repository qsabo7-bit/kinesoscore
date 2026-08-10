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

const TIER_RANK = {
  bronze: 1,
  silver: 2,
  gold: 3,
  diamond: 4,
}

/**
 * Messages for newly earned / upgraded awards (private unlock ceremony).
 * @param {{ running?: string | null, strength?: string | null, crown?: boolean } | null} previous
 * @param {{ running?: string | null, strength?: string | null, crown?: boolean } | null} next
 * @returns {string[]}
 */
export function detectAwardUnlocks(previous, next) {
  if (!next) return []
  const messages = []
  for (const kind of /** @type {const} */ (['strength', 'running'])) {
    const prevTier = previous?.[kind] || null
    const nextTier = next?.[kind] || null
    if (
      nextTier &&
      (!prevTier || (TIER_RANK[nextTier] || 0) > (TIER_RANK[prevTier] || 0))
    ) {
      const label = kind === 'strength' ? 'Strength' : 'Running'
      messages.push(`${AWARD_LABELS[nextTier]} ${label} unlocked`)
    }
  }
  if (next.crown && !previous?.crown) {
    messages.push('Crown unlocked')
  }
  return messages
}
