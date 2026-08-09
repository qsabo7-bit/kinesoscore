import { STRENGTH_NORM_SOURCE } from '../data/strengthNorms.js'
import { compareStrengthToNorms } from './strengthComparison.js'

/**
 * Sum of Bench + Squat + Deadlift one-rep maxes.
 * @param {number} bench
 * @param {number} squat
 * @param {number} deadlift
 */
export function calculateSbdTotal(bench, squat, deadlift) {
  const total = Number(bench) + Number(squat) + Number(deadlift)
  if (!Number.isFinite(total) || total <= 0) return null
  return Math.round(total * 10) / 10
}

/**
 * Recreational SBD total level from total ÷ bodyweight.
 * Thresholds ≈ sum of single-lift recreational ladders.
 *
 * @param {number} sbdTotal
 * @param {number} bodyweight
 * @returns {'Beginner' | 'Intermediate' | 'Advanced' | 'Elite'}
 */
export function getSbdStrengthLevel(sbdTotal, bodyweight) {
  const ratio = Number(sbdTotal) / Number(bodyweight)
  if (!Number.isFinite(ratio) || ratio <= 0) return 'Beginner'
  // Aligned with percentile labels: Elite reserved for top recreational band.
  if (ratio >= 6.0) return 'Elite'
  if (ratio >= 4.0) return 'Advanced'
  if (ratio >= 2.7) return 'Intermediate'
  return 'Beginner'
}

/**
 * Peer comparison for SBD Total using summed recreational lift norms.
 *
 * @param {number} ratio - SBD Total / bodyweight
 * @param {number} age
 * @param {'male' | 'female'} gender
 */
export function compareSbdToNorms(ratio, age, gender) {
  const peer = compareStrengthToNorms(ratio, age, gender, 'sbd')
  if (!peer) return null

  return {
    ...peer,
    lift: 'sbd',
    summary: `Your SBD Total is stronger than about ${peer.betterThanPercent} out of 100 recreational gym-goers in your age, gender, and bodyweight category (${peer.percentileLabel} percentile).`,
    source: {
      ...STRENGTH_NORM_SOURCE,
      detail:
        'Compared with typical recreational gym-goers using bodyweight-relative SBD Total (Bench + Squat + Deadlift). Norms are the sum of the recreational single-lift ladders used elsewhere in KinesoScore.',
    },
  }
}
