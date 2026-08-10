/** Product branding used across the UI. */
export const BRAND = {
  /** Legacy compact text mark (header now uses favicon icon on Home / About). */
  mark: 'KS',
  /** Website / platform name (no trademark suffix). */
  short: 'KinesoScore',
  full: 'KinesoScore',
  /**
   * Overall strength + running fitness score calculator name.
   * Keep brand-casing class wherever uppercase styles apply.
   */
  scoreName: 'myKinesoScore™',
  tagline:
    'A comprehensive fitness performance platform combining strength, endurance, military fitness standards, and cardiovascular fitness tracking.',
  metaDescription:
    'KinesoScore is a comprehensive fitness performance platform combining strength, endurance, military fitness standards, and cardiovascular fitness tracking.',
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

/** True when a label includes the overall score product name or platform name. */
export function includesScoreBrand(text) {
  if (text == null) return false
  const value = String(text)
  return (
    value.includes(BRAND.scoreName) ||
    value.includes('myKinesoScore') ||
    value.includes(BRAND.short)
  )
}
