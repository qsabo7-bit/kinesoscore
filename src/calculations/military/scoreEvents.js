/**
 * Lookup helpers for official military scoring tables.
 *
 * Only call these with complete, officially published step tables.
 * Do not invent thresholds, interpolate between unpublished steps,
 * or fabricate pass criteria.
 */

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
