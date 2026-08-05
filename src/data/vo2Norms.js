/**
 * Cardiorespiratory fitness norms (VO2 max, ml/kg/min).
 *
 * Values are Cooper Institute Aerobics Center Longitudinal Study percentiles
 * reproduced in ACSM’s Guidelines for Exercise Testing and Prescription
 * (11th ed., Table 4.7). Percentile = % of same age/sex adults outperformed.
 */

export const VO2_NORM_SOURCE = {
  name: 'Cooper Institute / ACSM VO₂ max norms',
  detail:
    'Age- and sex-specific VO₂ max percentiles from the Cooper Institute Aerobics Center Longitudinal Study, as published in ACSM’s Guidelines for Exercise Testing and Prescription (11th ed.). Categories follow ACSM bands (Poor → Superior).',
  url: 'https://www.acsm.org/education-resources/books/guidelines-exercise-testing-prescription',
}

/** @type {Record<'male' | 'female', Record<string, Array<{ value: number, percentile: number }>>>} */
const VO2_PERCENTILES = {
  male: {
    '20-29': [
      { value: 29.0, percentile: 5 },
      { value: 32.1, percentile: 10 },
      { value: 40.1, percentile: 25 },
      { value: 48.0, percentile: 50 },
      { value: 55.2, percentile: 75 },
      { value: 61.8, percentile: 90 },
      { value: 66.3, percentile: 95 },
    ],
    '30-39': [
      { value: 27.2, percentile: 5 },
      { value: 30.2, percentile: 10 },
      { value: 35.9, percentile: 25 },
      { value: 42.4, percentile: 50 },
      { value: 49.2, percentile: 75 },
      { value: 56.5, percentile: 90 },
      { value: 59.8, percentile: 95 },
    ],
    '40-49': [
      { value: 24.2, percentile: 5 },
      { value: 26.8, percentile: 10 },
      { value: 31.9, percentile: 25 },
      { value: 37.8, percentile: 50 },
      { value: 45.0, percentile: 75 },
      { value: 52.1, percentile: 90 },
      { value: 55.6, percentile: 95 },
    ],
    '50-59': [
      { value: 20.9, percentile: 5 },
      { value: 22.8, percentile: 10 },
      { value: 27.1, percentile: 25 },
      { value: 32.6, percentile: 50 },
      { value: 39.7, percentile: 75 },
      { value: 45.6, percentile: 90 },
      { value: 50.7, percentile: 95 },
    ],
    '60-69': [
      { value: 17.4, percentile: 5 },
      { value: 19.8, percentile: 10 },
      { value: 23.7, percentile: 25 },
      { value: 28.2, percentile: 50 },
      { value: 34.5, percentile: 75 },
      { value: 40.3, percentile: 90 },
      { value: 43.0, percentile: 95 },
    ],
    '70-79': [
      { value: 16.3, percentile: 5 },
      { value: 17.1, percentile: 10 },
      { value: 20.4, percentile: 25 },
      { value: 24.4, percentile: 50 },
      { value: 30.4, percentile: 75 },
      { value: 36.6, percentile: 90 },
      { value: 39.7, percentile: 95 },
    ],
  },
  female: {
    '20-29': [
      { value: 21.7, percentile: 5 },
      { value: 23.9, percentile: 10 },
      { value: 30.5, percentile: 25 },
      { value: 37.6, percentile: 50 },
      { value: 44.7, percentile: 75 },
      { value: 51.3, percentile: 90 },
      { value: 56.0, percentile: 95 },
    ],
    '30-39': [
      { value: 19.0, percentile: 5 },
      { value: 20.9, percentile: 10 },
      { value: 25.3, percentile: 25 },
      { value: 30.2, percentile: 50 },
      { value: 36.1, percentile: 75 },
      { value: 41.4, percentile: 90 },
      { value: 45.8, percentile: 95 },
    ],
    '40-49': [
      { value: 17.0, percentile: 5 },
      { value: 18.8, percentile: 10 },
      { value: 22.1, percentile: 25 },
      { value: 26.7, percentile: 50 },
      { value: 32.4, percentile: 75 },
      { value: 38.4, percentile: 90 },
      { value: 41.7, percentile: 95 },
    ],
    '50-59': [
      { value: 16.0, percentile: 5 },
      { value: 17.3, percentile: 10 },
      { value: 19.9, percentile: 25 },
      { value: 23.4, percentile: 50 },
      { value: 27.6, percentile: 75 },
      { value: 32.0, percentile: 90 },
      { value: 35.9, percentile: 95 },
    ],
    '60-69': [
      { value: 13.4, percentile: 5 },
      { value: 14.6, percentile: 10 },
      { value: 17.2, percentile: 25 },
      { value: 20.0, percentile: 50 },
      { value: 23.8, percentile: 75 },
      { value: 27.0, percentile: 90 },
      { value: 29.4, percentile: 95 },
    ],
    '70-79': [
      { value: 13.1, percentile: 5 },
      { value: 13.6, percentile: 10 },
      { value: 15.6, percentile: 25 },
      { value: 18.3, percentile: 50 },
      { value: 20.8, percentile: 75 },
      { value: 23.1, percentile: 90 },
      { value: 24.1, percentile: 95 },
    ],
  },
}

function ageBandKey(age) {
  if (age < 30) return '20-29'
  if (age < 40) return '30-39'
  if (age < 50) return '40-49'
  if (age < 60) return '50-59'
  if (age < 70) return '60-69'
  return '70-79'
}

/**
 * @param {'male' | 'female'} gender
 * @param {number} age
 */
export function getVo2NormPoints(gender, age) {
  if (gender !== 'male' && gender !== 'female') return null
  if (!Number.isFinite(age) || age < 18 || age > 89) return null

  const key = ageBandKey(age)
  const points = VO2_PERCENTILES[gender][key]
  if (!points) return null

  return {
    points,
    ageLabel: key.replace('-', '–'),
    gender,
  }
}
