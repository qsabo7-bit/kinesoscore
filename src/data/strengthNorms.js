/**
 * Relative strength norms (1RM ÷ bodyweight) by age, sex, and lift.
 *
 * Source (peer-reviewed):
 *   van den Hoek et al. (2024). Normative data for the squat, bench press and
 *   deadlift exercises in powerlifting: Data from 809,986 competition entries.
 *   Journal of Science and Medicine in Sport.
 *   https://doi.org/10.1016/j.jsams.2024.07.005
 *
 * Reference population: drug-tested, unequipped competitive powerlifters
 * (n = 809,986; 571,650 male, 238,336 female).
 *
 * Tables below match values republished from that study via FitnessNorms /
 * The Strength Initiative (p5/p95 approximate study p10/p90).
 *
 * Important: these percentiles describe competitive powerlifters, not the
 * general public. Recreational gym-goers typically score lower on this scale
 * (Barbell Medicine notes ~1 year of training often near ~10th percentile here).
 */

export const STRENGTH_NORM_SOURCE = {
  name: 'van den Hoek et al. (2024), Journal of Science and Medicine in Sport',
  detail:
    'Percentiles from 809,986 drug-tested, unequipped powerlifting competition entries, by age and sex (bodyweight-relative 1RM). Recreational lifters usually rank lower than competitive powerlifters on this scale.',
  url: 'https://doi.org/10.1016/j.jsams.2024.07.005',
}

export const STRENGTH_LIFTS = [
  { id: 'deadlift', name: 'Deadlift' },
  { id: 'squat', name: 'Squat' },
  { id: 'bench', name: 'Bench press' },
]

/** @type {Record<string, Array<{ minAge: number, maxAge: number, label: string, male: object, female: object }>>} */
export const STRENGTH_NORMS = {
  deadlift: [
    {
      minAge: 12,
      maxAge: 17,
      label: '12–17',
      male: { p5: 1.61, p25: 1.93, p50: 2.28, p75: 2.6, p95: 2.9 },
      female: { p5: 1.26, p25: 1.49, p50: 1.76, p75: 2.04, p95: 2.3 },
    },
    {
      minAge: 18,
      maxAge: 35,
      label: '18–35',
      male: { p5: 2.03, p25: 2.31, p50: 2.63, p75: 2.95, p95: 3.25 },
      female: { p5: 1.49, p25: 1.75, p50: 2.05, p75: 2.37, p95: 2.66 },
    },
    {
      minAge: 36,
      maxAge: 59,
      label: '36–59',
      male: { p5: 1.75, p25: 2.02, p50: 2.34, p75: 2.66, p95: 2.98 },
      female: { p5: 1.32, p25: 1.57, p50: 1.88, p75: 2.2, p95: 2.51 },
    },
    {
      minAge: 60,
      maxAge: 79,
      label: '60–79',
      male: { p5: 1.42, p25: 1.68, p50: 2.02, p75: 2.35, p95: 2.64 },
      female: { p5: 1.11, p25: 1.33, p50: 1.6, p75: 1.91, p95: 2.19 },
    },
    {
      minAge: 80,
      maxAge: 110,
      label: '80+',
      male: { p5: 0.96, p25: 1.18, p50: 1.5, p75: 1.95, p95: 2.3 },
      female: { p5: 0.61, p25: 0.73, p50: 1.16, p75: 1.55, p95: 1.68 },
    },
  ],
  squat: [
    {
      minAge: 12,
      maxAge: 17,
      label: '12–17',
      male: { p5: 1.32, p25: 1.6, p50: 1.92, p75: 2.23, p95: 2.5 },
      female: { p5: 1.01, p25: 1.21, p50: 1.45, p75: 1.71, p95: 1.95 },
    },
    {
      minAge: 18,
      maxAge: 35,
      label: '18–35',
      male: { p5: 1.75, p25: 2.0, p50: 2.28, p75: 2.56, p95: 2.83 },
      female: { p5: 1.23, p25: 1.46, p50: 1.72, p75: 1.99, p95: 2.26 },
    },
    {
      minAge: 36,
      maxAge: 59,
      label: '36–59',
      male: { p5: 1.48, p25: 1.74, p50: 2.03, p75: 2.31, p95: 2.58 },
      female: { p5: 1.01, p25: 1.24, p50: 1.51, p75: 1.78, p95: 2.05 },
    },
    {
      minAge: 60,
      maxAge: 79,
      label: '60–79',
      male: { p5: 1.04, p25: 1.3, p50: 1.62, p75: 1.91, p95: 2.16 },
      female: { p5: 0.72, p25: 0.93, p50: 1.17, p75: 1.42, p95: 1.65 },
    },
    {
      minAge: 80,
      maxAge: 110,
      label: '80+',
      male: { p5: 0.52, p25: 0.85, p50: 1.11, p75: 1.47, p95: 1.72 },
      female: { p5: 0.29, p25: 0.41, p50: 0.67, p75: 0.94, p95: 1.01 },
    },
  ],
  bench: [
    {
      minAge: 12,
      maxAge: 17,
      label: '12–17',
      male: { p5: 0.85, p25: 1.04, p50: 1.24, p75: 1.44, p95: 1.63 },
      female: { p5: 0.56, p25: 0.67, p50: 0.81, p75: 0.97, p95: 1.14 },
    },
    {
      minAge: 18,
      maxAge: 35,
      label: '18–35',
      male: { p5: 1.19, p25: 1.36, p50: 1.56, p75: 1.76, p95: 1.96 },
      female: { p5: 0.67, p25: 0.8, p50: 0.96, p75: 1.15, p95: 1.35 },
    },
    {
      minAge: 36,
      maxAge: 59,
      label: '36–59',
      male: { p5: 1.13, p25: 1.31, p50: 1.51, p75: 1.72, p95: 1.92 },
      female: { p5: 0.62, p25: 0.74, p50: 0.9, p75: 1.09, p95: 1.28 },
    },
    {
      minAge: 60,
      maxAge: 79,
      label: '60–79',
      male: { p5: 0.88, p25: 1.05, p50: 1.23, p75: 1.42, p95: 1.6 },
      female: { p5: 0.49, p25: 0.59, p50: 0.72, p75: 0.89, p95: 1.04 },
    },
    {
      minAge: 80,
      maxAge: 110,
      label: '80+',
      male: { p5: 0.61, p25: 0.76, p50: 0.93, p75: 1.15, p95: 1.31 },
      female: { p5: 0.41, p25: 0.44, p50: 0.54, p75: 0.68, p95: 0.92 },
    },
  ],
}
