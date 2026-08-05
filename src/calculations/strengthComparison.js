import { STRENGTH_NORMS, STRENGTH_NORM_SOURCE } from '../data/strengthNorms.js'
import {
  estimatePercentOutperformed,
  formatOrdinal,
} from './percentile.js'

function getAgeBand(lift, age) {
  return STRENGTH_NORMS[lift]?.find(
    (band) => age >= band.minAge && age <= band.maxAge,
  )
}

function formatGender(gender) {
  if (gender === 'male') return 'Male'
  if (gender === 'female') return 'Female'
  return gender
}

/**
 * Compare relative strength to peer-reviewed powerlifting norms
 * (van den Hoek et al., 2024).
 *
 * Percentile = percent of that reference group you outperform.
 *
 * @param {number} ratio - 1RM / bodyweight
 * @param {number} age
 * @param {'male' | 'female'} gender
 * @param {'deadlift' | 'squat' | 'bench'} lift
 */
export function compareStrengthToNorms(ratio, age, gender, lift = 'deadlift') {
  const band = getAgeBand(lift, age)
  if (!band) return null

  const values = band[gender]
  if (!values) return null

  const betterThanPercent = estimatePercentOutperformed(ratio, [
    { value: values.p5, percentile: 5 },
    { value: values.p25, percentile: 25 },
    { value: values.p50, percentile: 50 },
    { value: values.p75, percentile: 75 },
    { value: values.p95, percentile: 95 },
  ])

  const ordinal = formatOrdinal(betterThanPercent)

  return {
    percentile: betterThanPercent,
    percentileLabel: ordinal,
    betterThanPercent,
    summary: `You are stronger than about ${betterThanPercent} out of 100 competitive powerlifters in your age and gender group for this lift (${ordinal} percentile), based on peer-reviewed norms from 809,986 competition entries.`,
    ageLabel: band.label,
    genderLabel: formatGender(gender),
    gender,
    lift,
    medianRatio: values.p50,
    source: STRENGTH_NORM_SOURCE,
  }
}
