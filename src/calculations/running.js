/**
 * Running performance helpers.
 * Race predictions use the Riegel formula:
 * T2 = T1 × (D2 / D1)^1.06
 */

export const RACE_DISTANCES_MILES = [
  { id: 'mile', name: 'Mile', miles: 1 },
  { id: 'mile-1-5', name: '1.5 Mile', miles: 1.5 },
  { id: 'mile-2', name: '2 Mile', miles: 2 },
  { id: '5k', name: '5K', miles: 3.10686 },
  { id: 'mile-5', name: '5 Mile', miles: 5 },
  { id: '10k', name: '10K', miles: 6.21371 },
  { id: 'mile-10', name: '10 Mile', miles: 10 },
  { id: 'half', name: 'Half Marathon', miles: 13.1094 },
  { id: 'marathon', name: 'Marathon', miles: 26.2188 },
]

/**
 * Map an entered race distance to the nearest standard race.
 * @param {number} distanceMiles
 */
export function matchNearestRace(distanceMiles) {
  if (!Number.isFinite(distanceMiles) || distanceMiles <= 0) return null

  let best = RACE_DISTANCES_MILES[0]
  let bestDelta = Math.abs(distanceMiles - best.miles)

  for (const race of RACE_DISTANCES_MILES) {
    const delta = Math.abs(distanceMiles - race.miles)
    if (delta < bestDelta) {
      best = race
      bestDelta = delta
    }
  }

  return best
}

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
 * Format seconds as "22 min 05 sec" (or with hours when needed).
 * @param {number} totalSeconds
 */
export function formatDurationWords(totalSeconds) {
  const seconds = Math.max(0, Math.round(totalSeconds))
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  const secPart = `${String(s).padStart(2, '0')} sec`

  if (h > 0) {
    return `${h} hr ${m} min ${secPart}`
  }

  return `${m} min ${secPart}`
}

/**
 * @param {number} totalSeconds
 * @param {'clock' | 'words'} [format]
 */
export function formatRaceTime(totalSeconds, format = 'clock') {
  return format === 'words'
    ? formatDurationWords(totalSeconds)
    : formatDuration(totalSeconds)
}

/**
 * Friendly duration for improvement copy, e.g. "45 sec" or "1:05".
 * @param {number} totalSeconds
 */
export function formatFriendlyDuration(totalSeconds) {
  const seconds = Math.max(0, Math.round(Math.abs(totalSeconds)))
  if (seconds < 60) return `${seconds} sec`
  return formatDuration(seconds)
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
