/**
 * Pure calculation helpers for KinesoScore.
 * Keep math separate from React components.
 */

export { calculateOneRepMax, estimateOneRepMax } from './oneRepMax.js'
export { getStrengthLevel } from './strengthLevel.js'
export { compareStrengthToNorms } from './strengthComparison.js'
export {
  calculateSbdTotal,
  compareSbdToNorms,
  getSbdStrengthLevel,
} from './sbdTotal.js'
export {
  calculatePace,
  formatDuration,
  formatDurationWords,
  formatFriendlyDuration,
  formatRaceTime,
  matchNearestRace,
  predictCommonRaces,
  predictRaceTime,
  RACE_DISTANCES_MILES,
} from './running.js'
export { compareRunningToNorms } from './runningComparison.js'
export {
  calculateFitnessScore,
  getBalanceLabel,
  getFitnessBand,
  FITNESS_SCORE_SOURCE,
} from './fitnessScore.js'
export { formatOrdinal, estimatePercentOutperformed, interpolatePercentile } from './percentile.js'
export {
  ACTIVITY_LEVELS,
  calculateBmr,
  estimateMifflinStJeor,
  estimateTdee,
  MIFFLIN_ST_JEOR_SOURCE,
  TDEE_ACTIVITY_SOURCE,
} from './bmr.js'
export {
  BMI_DISCLAIMER,
  BMI_SOURCE,
  calculateBmi,
  getBmiCategory,
} from './bmi.js'
export {
  FITNESS_AGE_MODEL,
  FITNESS_AGE_SOURCE,
  MAX_FITNESS_AGE,
  MIN_FITNESS_AGE,
  calculateFitnessAge,
  estimateVo2FromFiveK,
  expectedFiveKSeconds,
  expectedVo2ForAge,
  invertVo2ToFitnessAge,
  medianVo2ForAge,
} from './fitnessAge.js'
export {
  calculateCooperVo2,
  calculateRockportVo2,
  compareVo2ToNorms,
  COOPER_VO2_SOURCE,
  estimateVo2FromCooper,
  estimateVo2FromRockport,
  getVo2FitnessCategory,
  ROCKPORT_VO2_SOURCE,
  VO2_NORM_SOURCE,
} from './vo2max.js'
export {
  convertDistance,
  convertHeight,
  convertMass,
  DISTANCE_UNITS,
  formatConverted,
  HEIGHT_UNITS,
  KM_PER_MILE,
  kmToMi,
  LB_PER_KG,
  lbToKg,
  MASS_UNITS,
  miToKm,
  toCm,
  toMiles,
} from './units.js'
export {
  pointsFromAscendingSteps,
  pointsFromDescendingTimeSteps,
  sumEventPoints,
} from './military/scoreEvents.js'
