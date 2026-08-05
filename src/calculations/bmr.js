import { convertMass, toCm } from './units.js'

export const MIFFLIN_ST_JEOR_SOURCE = {
  name: 'Mifflin–St Jeor equation',
  detail:
    'Mifflin et al. (1990) estimated resting metabolic rate from weight, height, age, and sex. The Academy of Nutrition and Dietetics recommends Mifflin–St Jeor over older Harris–Benedict equations for most adults.',
  url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/',
}

export const TDEE_ACTIVITY_SOURCE = {
  name: 'Activity multipliers for TDEE',
  detail:
    'Total Daily Energy Expenditure is estimated as BMR × activity factor. Factors follow common clinical/exercise-science practice derived from FAO/WHO/UNU energy-requirement frameworks and widely used Harris–Benedict-style activity bands.',
  url: 'https://www.ncbi.nlm.nih.gov/books/NBK278991/',
}

export const ACTIVITY_LEVELS = [
  {
    id: 'sedentary',
    label: 'Sedentary',
    factor: 1.2,
    detail: 'Little or no exercise',
  },
  {
    id: 'light',
    label: 'Lightly active',
    factor: 1.375,
    detail: 'Light exercise 1–3 days/week',
  },
  {
    id: 'moderate',
    label: 'Moderately active',
    factor: 1.55,
    detail: 'Moderate exercise 3–5 days/week',
  },
  {
    id: 'very',
    label: 'Very active',
    factor: 1.725,
    detail: 'Hard exercise 6–7 days/week',
  },
  {
    id: 'extra',
    label: 'Extra active',
    factor: 1.9,
    detail: 'Very hard exercise or physical job',
  },
]

/**
 * Mifflin–St Jeor BMR in kcal/day.
 * Men: 10w + 6.25h − 5a + 5
 * Women: 10w + 6.25h − 5a − 161
 * (w in kg, h in cm, a in years)
 *
 * @param {number} weightKg
 * @param {number} heightCm
 * @param {number} age
 * @param {'male' | 'female'} gender
 */
export function estimateMifflinStJeor(weightKg, heightCm, age, gender) {
  if (
    !Number.isFinite(weightKg) ||
    !Number.isFinite(heightCm) ||
    !Number.isFinite(age) ||
    weightKg <= 0 ||
    heightCm <= 0 ||
    age < 15 ||
    age > 100 ||
    (gender !== 'male' && gender !== 'female')
  ) {
    return null
  }

  const base = 10 * weightKg + 6.25 * heightCm - 5 * age
  return gender === 'male' ? base + 5 : base - 161
}

/**
 * @param {number} bmr
 * @param {number} activityFactor
 */
export function estimateTdee(bmr, activityFactor) {
  if (
    !Number.isFinite(bmr) ||
    !Number.isFinite(activityFactor) ||
    bmr <= 0 ||
    activityFactor <= 0
  ) {
    return null
  }
  return bmr * activityFactor
}

/**
 * Full BMR (+ optional TDEE) result for the UI.
 *
 * @param {object} input
 * @param {number} input.weight
 * @param {'lb' | 'kg'} input.massUnit
 * @param {number} input.height
 * @param {'in' | 'cm'} input.heightUnit
 * @param {number} input.age
 * @param {'male' | 'female'} input.gender
 * @param {string} [input.activityId]
 */
export function calculateBmr({
  weight,
  massUnit,
  height,
  heightUnit,
  age,
  gender,
  activityId,
}) {
  const weightKg = convertMass(weight, massUnit, 'kg')
  const heightCm = toCm(height, heightUnit)
  const bmr = estimateMifflinStJeor(weightKg, heightCm, age, gender)

  if (bmr == null) return null

  const activity = ACTIVITY_LEVELS.find((level) => level.id === activityId)
  const tdee = activity ? estimateTdee(bmr, activity.factor) : null

  return {
    bmr: Math.round(bmr),
    tdee: tdee == null ? null : Math.round(tdee),
    activity: activity ?? null,
    source: MIFFLIN_ST_JEOR_SOURCE,
    tdeeSource: activity ? TDEE_ACTIVITY_SOURCE : null,
  }
}
