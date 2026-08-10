import { AWARD_LABELS, AWARD_TIERS } from './fitnessAwards.js'

const TIER_SET = new Set(AWARD_TIERS)

/**
 * @param {unknown} tier
 * @returns {'bronze' | 'silver' | 'gold' | 'diamond' | null}
 */
export function normalizeAwardTier(tier) {
  const value = String(tier || '').toLowerCase()
  return TIER_SET.has(value) ? value : null
}

/**
 * Map a public RPC / profile row into a compact award identity.
 * @param {{
 *   award_running?: unknown,
 *   award_strength?: unknown,
 *   award_crown?: unknown,
 *   running?: unknown,
 *   strength?: unknown,
 *   crown?: unknown,
 * }} row
 */
export function mapPublicAwardIdentity(row = {}) {
  const running = normalizeAwardTier(row.award_running ?? row.running)
  const strength = normalizeAwardTier(row.award_strength ?? row.strength)
  const crown = Boolean(row.award_crown ?? row.crown)
  if (!running && !strength && !crown) return null
  return { running, strength, crown }
}

/**
 * Short caption fragment for social share text.
 * @param {{ running?: string | null, strength?: string | null, crown?: boolean } | null} awards
 */
export function formatPublicAwardCaption(awards) {
  if (!awards) return ''
  if (awards.crown) return 'Crown athlete'
  const parts = []
  if (awards.strength) {
    parts.push(`${AWARD_LABELS[awards.strength]} Strength`)
  }
  if (awards.running) {
    parts.push(`${AWARD_LABELS[awards.running]} Running`)
  }
  return parts.join(' · ')
}
