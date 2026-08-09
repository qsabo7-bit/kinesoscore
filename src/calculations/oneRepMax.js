/**
 * Estimate one-rep max using the Epley formula:
 * 1RM = weight × (1 + reps / 30)
 *
 * When reps ≤ 1, the lift is treated as a true 1RM (no inflation).
 *
 * @param {number} weight - Lifted weight (any mass unit)
 * @param {number} reps - Reps completed
 * @returns {number} Unrounded estimated 1RM in the same unit as weight
 */
export function estimateOneRepMax(weight, reps) {
  const w = Number(weight)
  const r = Number(reps)
  if (!Number.isFinite(w) || w <= 0) return NaN
  if (!Number.isFinite(r) || r <= 1) return w
  return w * (1 + r / 30)
}

/**
 * Estimated 1RM rounded to the nearest whole number for display.
 *
 * @param {number} weight
 * @param {number} reps
 * @returns {number}
 */
export function calculateOneRepMax(weight, reps) {
  return Math.round(estimateOneRepMax(weight, reps))
}
