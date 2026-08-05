/**
 * Running performance helpers.
 * Race predictions use the Riegel formula:
 * T2 = T1 × (D2 / D1)^1.06
 */

export const RACE_DISTANCES_MILES = [
  { id: '5k', name: '5K', miles: 3.10686 },
  { id: '10k', name: '10K', miles: 6.21371 },
  { id: 'half', name: 'Half Marathon', miles: 13.1094 },
  { id: 'marathon', name: 'Marathon', miles: 26.2188 },
]

/**
 * Predict time for a target distance from a known race result.
 *
 * @param {number} knownDistance - Distance already run (same units as target)
 * @param {number} knownTimeSeconds - Finishing time in seconds
 * @param {number} targetDistance - Distance to predict
 * @returns {number} Predicted time in whole seconds
 */
export function predictRaceTime(knownDistance, knownTimeSeconds, targetDistance) {
  const predicted =
    knownTimeSeconds * (targetDistance / knownDistance) ** 1.06
  return Math.round(predicted)
}

/**
 * Average pace in seconds per mile (or per km if distance is in km).
 *
 * @param {number} distance
 * @param {number} timeSeconds
 * @returns {number} Pace in whole seconds per unit distance
 */
export function calculatePace(distance, timeSeconds) {
  return Math.round(timeSeconds / distance)
}

/**
 * Format seconds as h:mm:ss or m:ss.
 *
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatDuration(totalSeconds) {
  const seconds = Math.max(0, Math.round(totalSeconds))
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  return `${m}:${String(s).padStart(2, '0')}`
}

/**
 * Build predicted times for common race distances.
 *
 * @param {number} knownDistanceMiles
 * @param {number} knownTimeSeconds
 * @returns {Array<{ id: string, name: string, timeSeconds: number, timeLabel: string }>}
 */
export function predictCommonRaces(knownDistanceMiles, knownTimeSeconds) {
  return RACE_DISTANCES_MILES.map((race) => {
    const timeSeconds = predictRaceTime(
      knownDistanceMiles,
      knownTimeSeconds,
      race.miles,
    )

    return {
      id: race.id,
      name: race.name,
      timeSeconds,
      timeLabel: formatDuration(timeSeconds),
    }
  })
}
