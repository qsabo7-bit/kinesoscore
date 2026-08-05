/**
 * Recreational relative-strength norms (1RM ÷ bodyweight) by age, sex, and lift.
 *
 * Tuned for typical gym-goers / “average Joe” recreational lifters — not
 * competitive powerlifters. Anchors follow common recreational strength
 * standards (beginner → novice → intermediate → advanced → elite) used by
 * tools like Strength Level and discussed in recreational coaching references
 * such as Barbell Medicine’s strength-standards guidance.
 *
 * Percentile anchors:
 *   p5  ≈ beginner
 *   p25 ≈ novice
 *   p50 ≈ intermediate (about average among recreational lifters)
 *   p75 ≈ advanced
 *   p95 ≈ elite recreational
 *
 * Age scaling follows published recreational age adjustments (strength peaks
 * in young adulthood and declines with each decade).
 */

export const STRENGTH_NORM_SOURCE = {
  name: 'Recreational strength standards by age & gender',
  detail:
    'Compared with typical recreational lifters / average gym-goers in your age and gender group (bodyweight-relative 1RM). Not competitive powerlifting data.',
  url: 'https://www.barbellmedicine.com/blog/strength-standards/',
}

export const STRENGTH_LIFTS = [
  { id: 'deadlift', name: 'Deadlift' },
  { id: 'squat', name: 'Squat' },
  { id: 'bench', name: 'Bench press' },
]

/** Young-adult (18–29) recreational bodyweight ratios by lift and sex. */
const BASE_RATIOS = {
  deadlift: {
    male: { p5: 1.0, p25: 1.5, p50: 2.0, p75: 2.5, p95: 3.0 },
    female: { p5: 0.5, p25: 0.9, p50: 1.35, p75: 1.75, p95: 2.25 },
  },
  squat: {
    male: { p5: 0.75, p25: 1.25, p50: 1.75, p75: 2.25, p95: 2.75 },
    female: { p5: 0.45, p25: 0.8, p50: 1.2, p75: 1.6, p95: 2.1 },
  },
  bench: {
    male: { p5: 0.5, p25: 0.75, p50: 1.15, p75: 1.5, p95: 1.9 },
    female: { p5: 0.25, p25: 0.4, p50: 0.7, p75: 1.0, p95: 1.35 },
  },
}

/**
 * Age multipliers applied to the 18–29 recreational baselines.
 */
const AGE_BANDS = [
  { minAge: 12, maxAge: 17, factor: 0.88, label: '12–17' },
  { minAge: 18, maxAge: 29, factor: 1.0, label: '18–29' },
  { minAge: 30, maxAge: 39, factor: 0.98, label: '30–39' },
  { minAge: 40, maxAge: 49, factor: 0.92, label: '40–49' },
  { minAge: 50, maxAge: 59, factor: 0.83, label: '50–59' },
  { minAge: 60, maxAge: 110, factor: 0.72, label: '60+' },
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
}
