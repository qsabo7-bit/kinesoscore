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

/**
 * Time at a target percentile, linearly interpolating when the ladder skips
 * the exact point (e.g. 70 → 80 for a requested 75th / "top 25%").
 */
function timeAtPercentile(points, targetPercentile) {
  const sorted = [...points].sort((a, b) => a.percentile - b.percentile)
  if (!sorted.length) return undefined

  if (targetPercentile <= sorted[0].percentile) return sorted[0].value
  const last = sorted[sorted.length - 1]
  if (targetPercentile >= last.percentile) return last.value

  for (let i = 1; i < sorted.length; i += 1) {
    const lo = sorted[i - 1]
    const hi = sorted[i]
    if (targetPercentile > hi.percentile) continue
    const span = hi.percentile - lo.percentile
    if (span <= 0) return hi.value
    const t = (targetPercentile - lo.percentile) / span
    return lo.value + t * (hi.value - lo.value)
  }

  return last.value
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
  const top25Seconds = timeAtPercentile(norms.points, 75)

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
