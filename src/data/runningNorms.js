/**
 * 5K running percentile norms backed by large race-result research.
 *
 * Primary distribution (sex-specific percentile curve):
 *   RunRepeat finish-time percentile calculator — ~35 million results from
 *   28,000+ races over ~20 years.
 *   https://runrepeat.com/how-do-you-masure-up-the-runners-percentile-calculator
 *
 * RunRepeat lists percentiles from the fast end (1st = fastest ~1%).
 * FPC converts those to “percent outperformed” (better than N%).
 *
 * Age centering:
 *   Age-group median 5K times from large race-result reporting (Outside Online
 *   / Running USA style age-band analyses). The RunRepeat curve shape is scaled
 *   so its median matches the age-band median (preserves empirical distribution
 *   shape while adjusting for age). Age-related endurance decline is also
 *   documented in exercise physiology (e.g. Tanaka & Seals, 2008).
 *
 * Population: organized race finishers (self-selected active runners), not the
 * full general public.
 */

function parseTime(label) {
  const [minutes, seconds] = label.split(':').map(Number)
  return minutes * 60 + seconds
}

export const RUNNING_NORM_SOURCE = {
  name: 'RunRepeat race-result percentiles (≈35M finishes) + age-band medians',
  detail:
    'Sex-specific 5K percentile curve from RunRepeat’s multi-million race dataset, age-centered using published age-group median finish times. Population: race finishers, not the general public.',
  url: 'https://runrepeat.com/how-do-you-masure-up-the-runners-percentile-calculator',
}

/** Reference distance used for peer comparison (miles). */
export const RUNNING_COMPARE_DISTANCE_MILES = 3.10686

/**
 * RunRepeat 5K tables: percentileFromFastest → finish time.
 * 1 = ~fastest 1%, 50 = median, 90 = slower end of the field.
 */
export const RUNREPEAT_5K_FROM_FASTEST = {
  male: [
    { fromFastest: 1, seconds: parseTime('17:30') },
    { fromFastest: 10, seconds: parseTime('23:26') },
    { fromFastest: 20, seconds: parseTime('26:04') },
    { fromFastest: 30, seconds: parseTime('27:58') },
    { fromFastest: 40, seconds: parseTime('29:41') },
    { fromFastest: 50, seconds: parseTime('31:28') },
    { fromFastest: 60, seconds: parseTime('33:28') },
    { fromFastest: 70, seconds: parseTime('35:55') },
    { fromFastest: 80, seconds: parseTime('39:21') },
    { fromFastest: 90, seconds: parseTime('45:43') },
  ],
  female: [
    { fromFastest: 1, seconds: parseTime('21:39') },
    { fromFastest: 10, seconds: parseTime('28:24') },
    { fromFastest: 20, seconds: parseTime('31:09') },
    { fromFastest: 30, seconds: parseTime('33:19') },
    { fromFastest: 40, seconds: parseTime('35:21') },
    { fromFastest: 50, seconds: parseTime('37:28') },
    { fromFastest: 60, seconds: parseTime('39:47') },
    { fromFastest: 70, seconds: parseTime('42:36') },
    { fromFastest: 80, seconds: parseTime('46:23') },
    { fromFastest: 90, seconds: parseTime('52:24') },
  ],
}

export const RUNREPEAT_5K_MEDIAN = {
  male: parseTime('31:28'),
  female: parseTime('37:28'),
}

/**
 * Age-group median 5K finish times (seconds) from large race-result age-band
 * reporting used to center the RunRepeat distribution by age.
 */
export const AGE_BAND_5K_MEDIANS = [
  {
    minAge: 15,
    maxAge: 18,
    label: '15–18',
    male: parseTime('26:16'),
    female: parseTime('33:44'),
  },
  {
    minAge: 19,
    maxAge: 22,
    label: '19–22',
    male: parseTime('28:01'),
    female: parseTime('34:29'),
  },
  {
    minAge: 23,
    maxAge: 29,
    label: '23–29',
    male: parseTime('29:41'),
    female: parseTime('35:26'),
  },
  {
    minAge: 30,
    maxAge: 39,
    label: '30–39',
    male: parseTime('30:32'),
    female: parseTime('36:34'),
  },
  {
    minAge: 40,
    maxAge: 49,
    label: '40–49',
    male: parseTime('31:49'),
    female: parseTime('38:11'),
  },
  {
    minAge: 50,
    maxAge: 59,
    label: '50–59',
    male: parseTime('33:04'),
    female: parseTime('41:05'),
  },
  {
    minAge: 60,
    maxAge: 69,
    label: '60–69',
    male: parseTime('35:23'),
    female: parseTime('44:28'),
  },
  {
    minAge: 70,
    maxAge: 110,
    label: '70+',
    male: parseTime('39:38'),
    female: parseTime('47:56'),
  },
]

/**
 * Build FPC percentile points for an age/gender group.
 * `percentile` = percent of race finishers outperformed (higher is better).
 *
 * @param {'male' | 'female'} gender
 * @param {number} age
 * @returns {{ label: string, medianSeconds: number, points: Array<{ value: number, percentile: number }> } | null}
 */
export function getRunningNormPoints(gender, age) {
  const band = AGE_BAND_5K_MEDIANS.find(
    (item) => age >= item.minAge && age <= item.maxAge,
  )
  const base = RUNREPEAT_5K_FROM_FASTEST[gender]
  const baseMedian = RUNREPEAT_5K_MEDIAN[gender]

  if (!band || !base || !baseMedian) return null

  const ageMedian = band[gender]
  const scale = ageMedian / baseMedian

  const points = base.map((row) => ({
    value: Math.round(row.seconds * scale),
    // RunRepeat 10th-from-fastest ≈ better than 90% of finishers.
    percentile: 100 - row.fromFastest,
  }))

  return {
    label: band.label,
    medianSeconds: ageMedian,
    points,
  }
}
