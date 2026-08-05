/**
 * Estimate one-rep max using the Epley formula:
 * 1RM = weight × (1 + reps / 30)
 *
 * @param {number} weight - Lifted weight (any mass unit)
 * @param {number} reps - Reps completed
 * @returns {number} Unrounded estimated 1RM in the same unit as weight
 */
export function estimateOneRepMax(weight, reps) {
  return weight * (1 + reps / 30)
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
