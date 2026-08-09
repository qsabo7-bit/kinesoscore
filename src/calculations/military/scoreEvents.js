/**
 * Lookup helpers for official military scoring tables.
 *
 * Only call these with complete, officially published step tables.
 * Do not invent thresholds, interpolate between unpublished steps,
 * or fabricate pass criteria.
 */

/**
 * Parse a required numeric field. Empty string is missing (not zero).
 * @param {unknown} raw
 * @returns {number | null}
 */
export function parseRequiredNumber(raw) {
  if (raw === '' || raw == null) return null
  const num = Number(raw)
  if (!Number.isFinite(num)) return null
  return num
}

/**
 * Duration from Min/Sec fields. Minutes required; empty seconds = 0.
 * Seconds must be 0–59.
 * @param {unknown} min
 * @param {unknown} sec
 * @returns {number | null}
 */
export function toDurationSeconds(min, sec) {
  if (min === '' || min == null) return null
  const m = Number(min)
  const s = sec === '' || sec == null ? 0 : Number(sec)
  if (!Number.isFinite(m) || m < 0) return null
  if (!Number.isFinite(s) || s < 0 || s > 59) return null
  return m * 60 + s
}

/**
 * Sum event points for save/display; null points count as 0 so failed
 * attempts with complete inputs can still be tracked.
 * @param {Array<{ points?: number | null }>} events
 * @returns {number}
 */
export function totalFromEventPoints(events) {
  let total = 0
  for (const event of events) {
    total += Number.isFinite(event?.points) ? event.points : 0
  }
  return total
}

/**
 * Higher-is-better lookup (reps, weight, plank seconds when tables increase with performance).
 * `steps` must be sorted ascending by threshold, each `{ threshold, points }`.
 * Returns the points for the highest threshold the value meets, or null if below all.
 */
export function pointsFromAscendingSteps(value, steps) {
  if (!Array.isArray(steps) || !steps.length) return null
  const num = Number(value)
  if (!Number.isFinite(num)) return null

  let points = null
  for (const step of steps) {
    if (num >= step.threshold) points = step.points
    else break
  }
  return points
}

/**
 * Lower-is-better lookup (run / SDC times in seconds).
 * `steps` must be sorted ascending by threshold (faster → usually listed as lower seconds with higher points),
 * or as published. Expect steps sorted by threshold ascending; returns points for the best
 * (lowest) threshold the time still satisfies: time <= threshold.
 */
export function pointsFromDescendingTimeSteps(timeSeconds, steps) {
  if (!Array.isArray(steps) || !steps.length) return null
  const num = Number(timeSeconds)
  if (!Number.isFinite(num) || num <= 0) return null

  let points = null
  for (const step of steps) {
    if (num <= step.threshold) {
      points = step.points
      break
    }
  }
  return points
}

export function sumEventPoints(eventResults) {
  if (!Array.isArray(eventResults) || !eventResults.length) return null
  let total = 0
  for (const event of eventResults) {
    if (!Number.isFinite(event?.points)) return null
    total += event.points
  }
  return total
}
