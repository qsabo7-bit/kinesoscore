import { convertMass, toCm } from './units.js'

export const BMI_SOURCE = {
  name: 'WHO BMI classification',
  detail:
    'Body mass index is weight in kilograms divided by height in meters squared. Categories follow World Health Organization adult cutoffs.',
  url: 'https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight',
}

export const BMI_DISCLAIMER =
  'BMI is a screening tool and does not account for muscle mass, body composition, or athletic build.'

/**
 * @param {number} bmi
 * @returns {'Underweight' | 'Normal Range' | 'Overweight' | 'Obese' | null}
 */
export function getBmiCategory(bmi) {
  if (!Number.isFinite(bmi) || bmi <= 0) return null
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal Range'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

/**
 * @param {object} input
 * @param {number} input.weight
 * @param {'lb' | 'kg'} input.massUnit
 * @param {number} input.height
 * @param {'in' | 'cm'} input.heightUnit
 */
export function calculateBmi({ weight, massUnit, height, heightUnit }) {
  const weightKg = convertMass(weight, massUnit, 'kg')
  const heightCm = toCm(height, heightUnit)
  const heightM = heightCm / 100

  if (
    !Number.isFinite(weightKg) ||
    !Number.isFinite(heightM) ||
    weightKg <= 0 ||
    heightM <= 0
  ) {
    return null
  }

  const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10
  const category = getBmiCategory(bmi)

  return {
    bmi,
    category,
    weightKg: Math.round(weightKg * 10) / 10,
    heightM: Math.round(heightM * 100) / 100,
    source: BMI_SOURCE,
    disclaimer: BMI_DISCLAIMER,
  }
}
