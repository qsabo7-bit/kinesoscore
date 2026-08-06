import { calculateBmi } from './bmi.js'

/** Fitness Age estimates are only supported for adults 18+. */
export const MIN_FITNESS_AGE = 18

export const FITNESS_AGE_SOURCE = {
  name: 'KinesoScore Fitness Age model',
  detail:
    'A transparent composite estimate for adults 18+. Chronological age is adjusted using VO₂ max relative to an age-expected baseline, resting heart rate, BMI from height/weight, weekly training frequency, and optional body-fat, 5K, and strength inputs. Not a medical diagnosis and not based on proprietary wearable algorithms.',
  url: null,
}

/**
 * Blended recreational expected VO₂ max (ml/kg/min) by age.
 * Midpoint of common male/female linear decline approximations.
 */
export function expectedVo2ForAge(age) {
  return Math.max(20, 45 - 0.34 * age)
}

/**
 * Approximate recreational 5K finish (seconds) expected at a given age.
 */
export function expectedFiveKSeconds(age) {
  return Math.round(1680 + Math.max(0, age - 25) * 8)
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function ratingFromAdjustment(adjustment, goodMax = -1, fairMax = 1.5) {
  if (adjustment <= goodMax) return 'Strong'
  if (adjustment <= fairMax) return 'Average'
  return 'Needs work'
}

/**
 * Estimate FPC Fitness Age from transparent inputs.
 *
 * @param {object} input
 * @param {number} input.age - chronological age
 * @param {number} input.weight
 * @param {'lb' | 'kg'} input.massUnit
 * @param {number} input.height
 * @param {'in' | 'cm'} input.heightUnit
 * @param {number} input.restingHr - bpm
 * @param {number} input.vo2Max - ml/kg/min
 * @param {number} input.weeklySessions - sessions per week (0–14)
 * @param {number} [input.bodyFatPercent]
 * @param {number} [input.fiveKSeconds]
 * @param {number} [input.strengthScore] - 0–100 style score
 */
export function calculateFitnessAge({
  age,
  weight,
  massUnit,
  height,
  heightUnit,
  restingHr,
  vo2Max,
  weeklySessions,
  bodyFatPercent,
  fiveKSeconds,
  strengthScore,
}) {
  if (
    !Number.isFinite(age) ||
    age < MIN_FITNESS_AGE ||
    age > 90 ||
    !Number.isFinite(restingHr) ||
    restingHr < 30 ||
    restingHr > 120 ||
    !Number.isFinite(vo2Max) ||
    vo2Max < 10 ||
    vo2Max > 90 ||
    !Number.isFinite(weeklySessions) ||
    weeklySessions < 0
  ) {
    return null
  }

  const bmiResult = calculateBmi({ weight, massUnit, height, heightUnit })
  if (!bmiResult) return null

  const expectedVo2 = expectedVo2ForAge(age)
  // ~1 ml/kg/min above expected ≈ 1 year younger
  const cardioAdjustment = clamp(expectedVo2 - vo2Max, -15, 15)

  // Resting HR near 55–60 is favorable; each ~4 bpm above 58 ≈ +1 year
  const rhrAdjustment = clamp((restingHr - 58) / 4, -4, 10)

  // BMI distance from a healthy mid-range (~22)
  const bmi = bmiResult.bmi
  let bodyAdjustment = 0
  if (bmi < 18.5) bodyAdjustment = (18.5 - bmi) * 0.6
  else if (bmi > 25) bodyAdjustment = (bmi - 22) * 0.45
  else bodyAdjustment = Math.abs(bmi - 22) * 0.15
  bodyAdjustment = clamp(bodyAdjustment, -2, 12)

  // Training consistency: 0 sessions ages you; ~3–4 is neutral; 5+ younger
  const sessions = clamp(weeklySessions, 0, 14)
  let trainingAdjustment
  if (sessions <= 0) trainingAdjustment = 5
  else if (sessions <= 2) trainingAdjustment = 2.5 - sessions
  else if (sessions <= 4) trainingAdjustment = 0.5 - (sessions - 2) * 0.5
  else trainingAdjustment = -1.5 - Math.min(sessions - 4, 3) * 0.5
  trainingAdjustment = clamp(trainingAdjustment, -4, 6)

  let fatAdjustment = 0
  let hasBodyFat = false
  if (
    bodyFatPercent != null &&
    Number.isFinite(bodyFatPercent) &&
    bodyFatPercent > 0 &&
    bodyFatPercent < 70
  ) {
    hasBodyFat = true
    // Sex-neutral recreational midpoint ~20%
    fatAdjustment = clamp((bodyFatPercent - 20) * 0.2, -3, 8)
  }

  let runAdjustment = 0
  let hasFiveK = false
  if (
    fiveKSeconds != null &&
    Number.isFinite(fiveKSeconds) &&
    fiveKSeconds > 0
  ) {
    hasFiveK = true
    const expected = expectedFiveKSeconds(age)
    // Every 60s faster than expected ≈ 1 year younger
    runAdjustment = clamp((fiveKSeconds - expected) / 60, -8, 8)
  }

  let strengthAdjustment = 0
  let hasStrength = false
  if (
    strengthScore != null &&
    Number.isFinite(strengthScore) &&
    strengthScore >= 0 &&
    strengthScore <= 100
  ) {
    hasStrength = true
    // 50 = neutral; each 10 points ≈ 1 year
    strengthAdjustment = clamp((50 - strengthScore) / 10, -5, 5)
  }

  const totalAdjustment =
    cardioAdjustment +
    rhrAdjustment +
    bodyAdjustment +
    trainingAdjustment +
    fatAdjustment +
    runAdjustment +
    strengthAdjustment

  const fitnessAge = Math.round(
    clamp(age + totalAdjustment, MIN_FITNESS_AGE, 95),
  )
  const difference = age - fitnessAge

  let differenceLabel
  if (difference > 0) {
    differenceLabel = `Your fitness age is ${difference} year${difference === 1 ? '' : 's'} younger than your actual age.`
  } else if (difference < 0) {
    const older = Math.abs(difference)
    differenceLabel = `Your fitness age is ${older} year${older === 1 ? '' : 's'} older than your actual age.`
  } else {
    differenceLabel = 'Your fitness age matches your actual age.'
  }

  const categories = [
    {
      id: 'cardio',
      title: 'Cardiovascular Fitness',
      rating: ratingFromAdjustment(cardioAdjustment, -2, 1),
      detail: `VO₂ max ${vo2Max} ml/kg/min vs ~${Math.round(expectedVo2)} expected for age ${age}.`,
      adjustment: Math.round(cardioAdjustment * 10) / 10,
    },
    {
      id: 'strength',
      title: 'Strength',
      rating: hasStrength
        ? ratingFromAdjustment(strengthAdjustment, -1, 1)
        : 'Not provided',
      detail: hasStrength
        ? `Strength score ${strengthScore}/100.`
        : 'Add an optional strength score (0–100) for a fuller picture.',
      adjustment: hasStrength ? Math.round(strengthAdjustment * 10) / 10 : null,
    },
    {
      id: 'body',
      title: 'Body Composition',
      rating: ratingFromAdjustment(
        bodyAdjustment + fatAdjustment,
        0.5,
        2.5,
      ),
      detail: hasBodyFat
        ? `BMI ${bmi} (${bmiResult.category}); body fat ${bodyFatPercent}%.`
        : `BMI ${bmi} (${bmiResult.category}). Optional body-fat % refines this pillar.`,
      adjustment:
        Math.round((bodyAdjustment + fatAdjustment) * 10) / 10,
    },
    {
      id: 'training',
      title: 'Training Consistency',
      rating: ratingFromAdjustment(trainingAdjustment + runAdjustment, -1, 1),
      detail: hasFiveK
        ? `${sessions} session${sessions === 1 ? '' : 's'}/week plus a 5K input.`
        : `${sessions} hard session${sessions === 1 ? '' : 's'} per week.`,
      adjustment:
        Math.round((trainingAdjustment + runAdjustment) * 10) / 10,
    },
  ]

  return {
    actualAge: Math.round(age),
    fitnessAge,
    difference,
    differenceLabel,
    categories,
    bmi: bmiResult.bmi,
    bmiCategory: bmiResult.category,
    vo2Max: Math.round(vo2Max * 10) / 10,
    restingHr: Math.round(restingHr),
    weeklySessions: sessions,
    weightKg: bmiResult.weightKg,
    heightM: bmiResult.heightM,
    source: FITNESS_AGE_SOURCE,
  }
}
