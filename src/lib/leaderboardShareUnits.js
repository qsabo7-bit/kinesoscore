import { convertMass } from '../calculations/units.js'

/** Canonical mass unit for public strength ranks (avoids lb/kg mix). */
export const LEADERBOARD_MASS_UNIT = 'lb'

/**
 * Normalize mass share payloads to lb so rank_value is comparable.
 * Non-mass units pass through unchanged.
 *
 * @param {number} resultValue
 * @param {string | null | undefined} resultUnit
 */
export function canonicalizeLeaderboardShareValue(resultValue, resultUnit) {
  const value = Number(resultValue)
  const unit = String(resultUnit || '').toLowerCase()
  if (!Number.isFinite(value)) {
    return { resultValue, resultUnit }
  }
  if (unit === 'kg') {
    const lb = convertMass(value, 'kg', 'lb')
    return {
      resultValue: Math.round(lb * 10) / 10,
      resultUnit: LEADERBOARD_MASS_UNIT,
    }
  }
  if (unit === 'lb') {
    return {
      resultValue: Math.round(value * 10) / 10,
      resultUnit: LEADERBOARD_MASS_UNIT,
    }
  }
  return { resultValue: value, resultUnit }
}
