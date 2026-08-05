/**
 * Recreational strength standards based on 1RM ÷ bodyweight.
 * Tuned as a general lift-agnostic guide — adjust as needed per lift later.
 */
const STRENGTH_THRESHOLDS = {
  intermediate: 1.0,
  advanced: 1.5,
  elite: 2.0,
}

/**
 * Classify strength from estimated 1RM relative to bodyweight.
 *
 * @param {number} oneRepMax - Estimated one-rep max
 * @param {number} bodyweight - Athlete bodyweight (same units as oneRepMax)
 * @returns {'Beginner' | 'Intermediate' | 'Advanced' | 'Elite'}
 */
export function getStrengthLevel(oneRepMax, bodyweight) {
  const ratio = oneRepMax / bodyweight

  if (ratio >= STRENGTH_THRESHOLDS.elite) return 'Elite'
  if (ratio >= STRENGTH_THRESHOLDS.advanced) return 'Advanced'
  if (ratio >= STRENGTH_THRESHOLDS.intermediate) return 'Intermediate'
  return 'Beginner'
}
