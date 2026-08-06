/**
 * Recreational relative-strength norms (estimated 1RM ÷ bodyweight) by age, sex,
 * and lift — used for strength percentiles inside Fitness Score and peer comparison.
 *
 * Reference population: typical recreational gym-goers / average adults who train
 * with free weights, not competitive powerlifters and not the fully sedentary
 * general population.
 *
 * How percentiles are anchored (young-adult 18–29 baselines):
 *   p5  ≈ beginner / early training (Strength Level–style “beginner”)
 *   p25 ≈ novice / casual regular (roughly Strength Level “novice”)
 *   p50 ≈ typical recreational trainee after consistent practice
 *   p75 ≈ dedicated intermediate gym-goer
 *   p95 ≈ advanced recreational (well below competitive powerlifting norms)
 *
 * Scientific / practical basis:
 * - Relative strength (load ÷ body mass) is the standard way to compare strength
 *   across body sizes in exercise science and coaching practice.
 * - 1RM is estimated with the Epley equation from a submaximal set.
 * - Young-adult ratio ladders are aligned with widely published recreational
 *   standards (Strength Level crowd-sourced gym data; Barbell Medicine’s
 *   recreational year-1 guidance: squat ~1–1.5×, bench ~0.7–1.1×, deadlift
 *   ~1.25–1.75× bodyweight for typical trainees).
 * - p50 is set near the middle of those recreational ranges — not competitive
 *   meet medians — so an ordinary gym member lands near average, not near the
 *   bottom of the chart.
 * - Age scaling follows documented age-related strength decline in adults
 *   (~0.5–1% per year through midlife in general populations; slower with
 *   continued training). See e.g. Latella et al. powerlifting age norms
 *   (J Sci Med Sport, 2024) and reviews of age-related strength loss.
 */

export const STRENGTH_NORM_SOURCE = {
  name: 'Recreational strength standards by age & gender',
  detail:
    'Compared with typical recreational gym-goers in your age and gender group using bodyweight-relative estimated 1RM. Anchors follow recreational beginner→elite ladders (Strength Level–style gym standards and Barbell Medicine recreational guidance), not competitive powerlifting meet data. Age bands scale for documented midlife strength decline.',
  url: 'https://www.barbellmedicine.com/blog/strength-standards/',
}

export const STRENGTH_LIFTS = [
  { id: 'bench', name: 'Bench Press' },
  { id: 'squat', name: 'Squat' },
  { id: 'deadlift', name: 'Deadlift' },
]

/** Strength calculator top tabs — SBD Total first as the default mode. */
export const STRENGTH_MODES = [
  { id: 'sbd-total', name: 'SBD Total' },
  ...STRENGTH_LIFTS,
]

export const SBD_TOTAL_EXERCISE_NAME = 'SBD Total'
export const SBD_TOTAL_MODE_ID = 'sbd-total'

/**
 * Young-adult (18–29) recreational bodyweight ratios by lift and sex.
 * Tuned so p50 ≈ ordinary consistent gym trainee, not dedicated intermediate.
 */
const BASE_RATIOS = {
  deadlift: {
    male: { p5: 0.75, p25: 1.1, p50: 1.45, p75: 1.9, p95: 2.4 },
    female: { p5: 0.5, p25: 0.8, p50: 1.15, p75: 1.55, p95: 2.0 },
  },
  squat: {
    male: { p5: 0.6, p25: 0.95, p50: 1.25, p75: 1.7, p95: 2.2 },
    female: { p5: 0.4, p25: 0.65, p50: 0.95, p75: 1.3, p95: 1.75 },
  },
  bench: {
    male: { p5: 0.4, p25: 0.65, p50: 0.9, p75: 1.25, p95: 1.6 },
    female: { p5: 0.2, p25: 0.35, p50: 0.55, p75: 0.8, p95: 1.1 },
  },
}

/** SBD Total recreational ratios = sum of the three lift ladders. */
function sumSexRatios(sex) {
  const bench = BASE_RATIOS.bench[sex]
  const squat = BASE_RATIOS.squat[sex]
  const deadlift = BASE_RATIOS.deadlift[sex]
  return {
    p5: roundRatio(bench.p5 + squat.p5 + deadlift.p5),
    p25: roundRatio(bench.p25 + squat.p25 + deadlift.p25),
    p50: roundRatio(bench.p50 + squat.p50 + deadlift.p50),
    p75: roundRatio(bench.p75 + squat.p75 + deadlift.p75),
    p95: roundRatio(bench.p95 + squat.p95 + deadlift.p95),
  }
}

BASE_RATIOS.sbd = {
  male: sumSexRatios('male'),
  female: sumSexRatios('female'),
}

/**
 * Age multipliers applied to the 18–29 recreational baselines.
 * Peak strength in young adulthood; gradual decline thereafter for recreational
 * trainees (milder than sedentary population curves).
 */
const AGE_BANDS = [
  { minAge: 12, maxAge: 17, factor: 0.88, label: '12–17' },
  { minAge: 18, maxAge: 29, factor: 1.0, label: '18–29' },
  { minAge: 30, maxAge: 39, factor: 0.97, label: '30–39' },
  { minAge: 40, maxAge: 49, factor: 0.91, label: '40–49' },
  { minAge: 50, maxAge: 59, factor: 0.82, label: '50–59' },
  { minAge: 60, maxAge: 110, factor: 0.7, label: '60+' },
]

function scaleRatios(ratios, factor) {
  return {
    p5: roundRatio(ratios.p5 * factor),
    p25: roundRatio(ratios.p25 * factor),
    p50: roundRatio(ratios.p50 * factor),
    p75: roundRatio(ratios.p75 * factor),
    p95: roundRatio(ratios.p95 * factor),
  }
}

function roundRatio(value) {
  return Math.round(value * 100) / 100
}

function buildLiftNorms(liftId) {
  const base = BASE_RATIOS[liftId]

  return AGE_BANDS.map((band) => ({
    minAge: band.minAge,
    maxAge: band.maxAge,
    label: band.label,
    male: scaleRatios(base.male, band.factor),
    female: scaleRatios(base.female, band.factor),
  }))
}

/** @type {Record<string, Array<{ minAge: number, maxAge: number, label: string, male: object, female: object }>>} */
export const STRENGTH_NORMS = {
  deadlift: buildLiftNorms('deadlift'),
  squat: buildLiftNorms('squat'),
  bench: buildLiftNorms('bench'),
  sbd: buildLiftNorms('sbd'),
}
