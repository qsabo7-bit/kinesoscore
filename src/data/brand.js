/** Product branding used across the UI. */
export const BRAND = {
  /** Compact mark for header on Home / About */
  mark: 'KS',
  short: 'KinesoScore',
  full: 'KinesoScore',
  /** User-facing name of the overall fitness calculator (includes trademark). */
  scoreName: 'KinesoScore™',
  tagline:
    'A comprehensive fitness performance platform combining strength, endurance, military fitness standards, and cardiovascular fitness tracking.',
  metaDescription:
    'KinesoScore™ is a comprehensive fitness performance platform combining strength, endurance, military fitness standards, and cardiovascular fitness tracking.',
  businessEmail: 'kinesoscore@gmail.com',
  /*
   * Legacy keys stored in performance_records — do not rename.
   * Existing rows use these exact strings.
   */
  scoreCalculatorType: 'FPC Score',
  scoreExerciseName: 'Overall FPC Score',
  fitnessAgeExerciseName: 'FPC Fitness Age',
}

/** CSS class that preserves brand capitalization against uppercase UI styles. */
export const BRAND_CASING_CLASS = 'brand-casing'

/** True when a label includes the KinesoScore product name. */
export function includesScoreBrand(text) {
  if (text == null) return false
  const value = String(text)
  return value.includes(BRAND.scoreName) || value.includes(BRAND.short)
}
