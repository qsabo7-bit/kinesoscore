import { calculateOneRepMax, estimateOneRepMax } from './oneRepMax.js'
import { compareStrengthToNorms } from './strengthComparison.js'
import { compareRunningToNorms } from './runningComparison.js'
import { formatOrdinal } from './percentile.js'

export const FITNESS_SCORE_SOURCE = {
  name: 'FPC composite score',
  detail:
    'Equal-weighted average of your strength percentile (van den Hoek et al., 2024) and running percentile (RunRepeat race-result curves). Score = how many people out of 100 you outperform on average across both domains.',
  url: 'https://doi.org/10.1016/j.jsams.2024.07.005',
}

/**
 * @param {number} score
 * @returns {'Building' | 'Developing' | 'Capable' | 'Strong' | 'Elite'}
 */
export function getFitnessBand(score) {
  if (score >= 90) return 'Elite'
  if (score >= 75) return 'Strong'
  if (score >= 50) return 'Capable'
  if (score >= 25) return 'Developing'
  return 'Building'
}

/**
 * @param {number} strengthScore
 * @param {number} runningScore
 * @returns {'Balanced' | 'Strength-leaning' | 'Running-leaning'}
 */
export function getBalanceLabel(strengthScore, runningScore) {
  const gap = strengthScore - runningScore
  if (Math.abs(gap) < 12) return 'Balanced'
  return gap > 0 ? 'Strength-leaning' : 'Running-leaning'
}

/**
 * Build a combined FPC score from strength + running inputs.
 *
 * Mission: one transparent score that balances lifting and endurance using the
 * same peer-reviewed / large-dataset percentiles as the standalone tools.
 *
 * @param {object} input
 * @param {number} input.weight
 * @param {number} input.reps
 * @param {number} input.bodyweight
 * @param {'deadlift' | 'squat' | 'bench'} input.lift
 * @param {number} input.distanceMiles
 * @param {number} input.timeSeconds
 * @param {number} input.age
 * @param {'male' | 'female'} input.gender
 */
export function calculateFitnessScore({
  weight,
  reps,
  bodyweight,
  lift,
  distanceMiles,
  timeSeconds,
  age,
  gender,
}) {
  const oneRepMax = calculateOneRepMax(weight, reps)
  // Use the unrounded Epley estimate for ratio so lb/kg inputs match exactly.
  const ratio = estimateOneRepMax(weight, reps) / bodyweight

  const strengthPeer = compareStrengthToNorms(ratio, age, gender, lift)
  const runningPeer = compareRunningToNorms(
    distanceMiles,
    timeSeconds,
    age,
    gender,
  )

  if (!strengthPeer || !runningPeer) return null

  const strengthScore = strengthPeer.betterThanPercent
  const runningScore = runningPeer.betterThanPercent
  const FPCScore = Math.round((strengthScore + runningScore) / 2)
  const band = getFitnessBand(FPCScore)
  const balance = getBalanceLabel(strengthScore, runningScore)
  const ordinal = formatOrdinal(FPCScore)

  return {
    FPCScore,
    percentileLabel: ordinal,
    band,
    balance,
    oneRepMax,
    ratio,
    strengthScore,
    runningScore,
    strengthPeer,
    runningPeer,
    summary: `Your FPC Score is ${FPCScore} — about the ${ordinal} percentile across strength and running combined. That means you outperform roughly ${FPCScore} out of 100 people on average in both domains for your age and gender group.`,
    source: FITNESS_SCORE_SOURCE,
  }
}
