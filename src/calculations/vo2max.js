import { VO2_NORM_SOURCE, getVo2NormPoints } from '../data/vo2Norms.js'
import { convertMass } from './units.js'
import {
  estimatePercentOutperformed,
  formatOrdinal,
} from './percentile.js'

export const COOPER_VO2_SOURCE = {
  name: 'Cooper 12-minute run test',
  detail:
    'Kenneth H. Cooper (1968) estimated VO₂ max from distance covered in 12 minutes of continuous running/walking: VO₂ max = (distance_m − 504.9) / 44.73.',
  url: 'https://en.wikipedia.org/wiki/Cooper_test',
}

export const ROCKPORT_VO2_SOURCE = {
  name: 'Rockport Fitness Walking Test',
  detail:
    'Kline et al. (1987) estimated VO₂ max from a brisk 1-mile walk plus ending heart rate, age, sex, and bodyweight — validated against laboratory gas analysis.',
  url: 'https://pubmed.ncbi.nlm.nih.gov/3431879/',
}

export { VO2_NORM_SOURCE }

const METERS_PER_MILE = 1609.344

/**
 * Cooper 12-minute run VO₂ max (ml/kg/min).
 * @param {number} distanceMeters
 */
export function estimateVo2FromCooper(distanceMeters) {
  if (!Number.isFinite(distanceMeters) || distanceMeters <= 0) return null
  return (distanceMeters - 504.9) / 44.73
}

/**
 * Rockport 1-mile walk VO₂ max (ml/kg/min).
 * Gender coding: male = 1, female = 0 (Kline et al., 1987).
 *
 * @param {number} weightLb
 * @param {number} age
 * @param {'male' | 'female'} gender
 * @param {number} timeMinutes total walk time in decimal minutes
 * @param {number} heartRate ending heart rate (bpm)
 */
export function estimateVo2FromRockport(
  weightLb,
  age,
  gender,
  timeMinutes,
  heartRate,
) {
  if (
    !Number.isFinite(weightLb) ||
    !Number.isFinite(age) ||
    !Number.isFinite(timeMinutes) ||
    !Number.isFinite(heartRate) ||
    weightLb <= 0 ||
    age < 18 ||
    age > 100 ||
    timeMinutes <= 0 ||
    heartRate < 40 ||
    heartRate > 220 ||
    (gender !== 'male' && gender !== 'female')
  ) {
    return null
  }

  const sexFactor = gender === 'male' ? 1 : 0
  return (
    132.853 -
    0.0769 * weightLb -
    0.3877 * age +
    6.315 * sexFactor -
    3.2649 * timeMinutes -
    0.1565 * heartRate
  )
}

/**
 * Convert entered Cooper distance to meters.
 * @param {number} distance
 * @param {'mi' | 'km'} unit
 */
export function cooperDistanceToMeters(distance, unit) {
  if (!Number.isFinite(distance) || distance <= 0) return null
  return unit === 'km' ? distance * 1000 : distance * METERS_PER_MILE
}

/**
 * ACSM fitness category from age/sex percentile.
 * @param {number} betterThanPercent
 */
export function getVo2FitnessCategory(betterThanPercent) {
  if (betterThanPercent >= 95) return 'Superior'
  if (betterThanPercent >= 80) return 'Excellent'
  if (betterThanPercent >= 60) return 'Good'
  if (betterThanPercent >= 40) return 'Average'
  if (betterThanPercent >= 20) return 'Fair'
  return 'Poor'
}

function formatGender(gender) {
  if (gender === 'male') return 'Male'
  if (gender === 'female') return 'Female'
  return gender
}

/**
 * Compare estimated VO₂ max to Cooper Institute / ACSM norms.
 * @param {number} vo2Max
 * @param {number} age
 * @param {'male' | 'female'} gender
 */
export function compareVo2ToNorms(vo2Max, age, gender) {
  const norms = getVo2NormPoints(gender, age)
  if (!norms || !Number.isFinite(vo2Max) || vo2Max <= 0) return null

  const betterThanPercent = estimatePercentOutperformed(
    vo2Max,
    norms.points,
    { higherIsBetter: true },
  )
  const category = getVo2FitnessCategory(betterThanPercent)
  const median =
    norms.points.find((point) => point.percentile === 50)?.value ?? null

  return {
    betterThanPercent,
    percentileLabel: formatOrdinal(betterThanPercent),
    category,
    ageLabel: norms.ageLabel,
    genderLabel: formatGender(gender),
    median,
    summary: `Estimated ${formatOrdinal(betterThanPercent)} percentile (${category}) for ${formatGender(gender).toLowerCase()} adults ages ${norms.ageLabel}.`,
    source: VO2_NORM_SOURCE,
  }
}

/**
 * Build a complete VO₂ max result for the Cooper method.
 * @param {number} distance
 * @param {'mi' | 'km'} distanceUnit
 */
export function calculateCooperVo2(distance, distanceUnit) {
  const meters = cooperDistanceToMeters(distance, distanceUnit)
  if (meters == null) return null

  const vo2Max = estimateVo2FromCooper(meters)
  if (vo2Max == null || !Number.isFinite(vo2Max) || vo2Max <= 0) return null

  return {
    method: 'cooper',
    vo2Max: Math.round(vo2Max * 10) / 10,
    distanceMeters: Math.round(meters),
    source: COOPER_VO2_SOURCE,
  }
}

/**
 * Build a complete VO₂ max result for the Rockport method.
 * Weight may be entered in lb or kg; converted to lb for the published equation.
 *
 * @param {number} weight
 * @param {'lb' | 'kg'} massUnit
 * @param {number} age
 * @param {'male' | 'female'} gender
 * @param {number} timeMinutes
 * @param {number} heartRate
 */
export function calculateRockportVo2(
  weight,
  massUnit,
  age,
  gender,
  timeMinutes,
  heartRate,
) {
  const weightLb = convertMass(weight, massUnit, 'lb')
  const vo2Max = estimateVo2FromRockport(
    weightLb,
    age,
    gender,
    timeMinutes,
    heartRate,
  )

  if (vo2Max == null || !Number.isFinite(vo2Max) || vo2Max <= 0) return null

  return {
    method: 'rockport',
    vo2Max: Math.round(vo2Max * 10) / 10,
    source: ROCKPORT_VO2_SOURCE,
  }
}
