/**
 * Pure calculation helpers for FPC.
 * Keep math separate from React components.
 */

export { calculateOneRepMax, estimateOneRepMax } from './oneRepMax.js'
export { getStrengthLevel } from './strengthLevel.js'
export { compareStrengthToNorms } from './strengthComparison.js'
export {
  calculatePace,
  formatDuration,
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
  convertDistance,
  convertMass,
  DISTANCE_UNITS,
  formatConverted,
  KM_PER_MILE,
  kmToMi,
  LB_PER_KG,
  lbToKg,
  MASS_UNITS,
  miToKm,
  toMiles,
} from './units.js'
