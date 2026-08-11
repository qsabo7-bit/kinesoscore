import { calculateOneRepMax, estimateOneRepMax } from './oneRepMax.js'
import { compareStrengthToNorms } from './strengthComparison.js'
import { compareSbdToNorms } from './sbdTotal.js'
import { compareRunningToNorms } from './runningComparison.js'
import { formatOrdinal } from './percentile.js'
import { BRAND } from '../data/brand.js'

export const FITNESS_SCORE_SOURCE = {
  name: `${BRAND.scoreName} composite`,
  detail:
    'Equal-weighted average of your recreational strength percentile (bodyweight-relative estimated 1RM or SBD Total vs gym-goer norms) and running percentile (RunRepeat race-result curves). Score = how many people out of 100 you outperform on average across both domains.',
  url: 'https://www.barbellmedicine.com/blog/strength-standards/',
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
 * Build a combined KinesoScore from strength + running inputs.
 *
 * Strength prefers SBD Total when provided; otherwise uses a single lift.
 *
 * @param {object} input
 * @param {number} [input.weight]
 * @param {number} [input.reps]
 * @param {number} input.bodyweight
 * @param {'deadlift' | 'squat' | 'bench'} [input.lift]
 * @param {number} [input.sbdTotal] - Absolute Bench+Squat+Deadlift total
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
  sbdTotal,
  distanceMiles,
  timeSeconds,
  age,
  gender,
}) {
  const runningPeer = compareRunningToNorms(
    distanceMiles,
    timeSeconds,
    age,
    gender,
  )
  if (!runningPeer) return null

  let strengthPeer
  let oneRepMax
  let ratio
  let strengthMetric = 'lift'

  const total = Number(sbdTotal)
  if (Number.isFinite(total) && total > 0) {
    ratio = total / bodyweight
    strengthPeer = compareSbdToNorms(ratio, age, gender)
    strengthMetric = 'sbd'
    oneRepMax = Math.round(total * 10) / 10
  } else {
    oneRepMax = calculateOneRepMax(weight, reps)
    ratio = estimateOneRepMax(weight, reps) / bodyweight
    strengthPeer = compareStrengthToNorms(ratio, age, gender, lift)
  }

  if (!strengthPeer) return null

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
    strengthMetric,
    summary: `Your ${BRAND.scoreName} is ${FPCScore} — about the ${ordinal} percentile across strength and running combined. That means you outperform roughly ${FPCScore} out of 100 recreational peers on average (gym-goers for strength, race finishers for running) in your age and gender group.`,
    source: FITNESS_SCORE_SOURCE,
  }
}
