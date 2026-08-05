import {
  getRunningNormPoints,
  RUNNING_COMPARE_DISTANCE_MILES,
  RUNNING_NORM_SOURCE,
} from '../data/runningNorms.js'
import { formatDuration, predictRaceTime } from './running.js'
import {
  estimatePercentOutperformed,
  formatOrdinal,
} from './percentile.js'

function formatGender(gender) {
  if (gender === 'male') return 'Male'
  if (gender === 'female') return 'Female'
  return gender
}

function timeAtOrAbovePercentile(points, targetPercentile) {
  const sorted = [...points].sort((a, b) => a.percentile - b.percentile)
  const hit = sorted.find((point) => point.percentile >= targetPercentile)
  return hit?.value ?? sorted[sorted.length - 1]?.value
}

/**
 * Compare a run to empirical 5K race-result norms (RunRepeat + age medians).
 *
 * Percentile = percent of race finishers you outperform (faster than).
 *
 * @param {number} distanceMiles
 * @param {number} timeSeconds
 * @param {number} age
 * @param {'male' | 'female'} gender
 */
export function compareRunningToNorms(distanceMiles, timeSeconds, age, gender) {
  const norms = getRunningNormPoints(gender, age)
  if (!norms) return null

  const fiveKSeconds = predictRaceTime(
    distanceMiles,
    timeSeconds,
    RUNNING_COMPARE_DISTANCE_MILES,
  )

  const betterThanPercent = estimatePercentOutperformed(
    fiveKSeconds,
    norms.points,
    { higherIsBetter: false },
  )

  const ordinal = formatOrdinal(betterThanPercent)
  const top25Seconds = timeAtOrAbovePercentile(norms.points, 75)

  return {
    fiveKSeconds,
    fiveKLabel: formatDuration(fiveKSeconds),
    averageLabel: formatDuration(norms.medianSeconds),
    top25Label: formatDuration(top25Seconds),
    percentile: betterThanPercent,
    percentileLabel: ordinal,
    betterThanPercent,
    summary: `You are faster than about ${betterThanPercent} out of 100 race finishers in your age and gender group (${ordinal} percentile), based on large-scale race-result research.`,
    ageLabel: norms.label,
    genderLabel: formatGender(gender),
    gender,
    source: RUNNING_NORM_SOURCE,
  }
}
