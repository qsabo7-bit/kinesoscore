import { RACE_DISTANCES_MILES } from '../calculations/running'
import { BRAND } from './brand'

/** Strength: independent Bench Press / Squat / Deadlift series. */
export const STRENGTH_TRACKS = [
  {
    id: 'bench',
    label: 'Bench Press',
    exerciseName: 'Bench Press',
    yAxisLabel: '1RM',
    higherIsBetter: true,
  },
  {
    id: 'squat',
    label: 'Squat',
    exerciseName: 'Squat',
    yAxisLabel: '1RM',
    higherIsBetter: true,
  },
  {
    id: 'deadlift',
    label: 'Deadlift',
    exerciseName: 'Deadlift',
    yAxisLabel: '1RM',
    higherIsBetter: true,
  },
]

/** SBD Total track definition (also included in STRENGTH_GRAPH_TRACKS). */
export const SBD_TOTAL_TRACK = {
  id: 'sbd-total',
  label: 'SBD Total',
  exerciseName: 'SBD Total',
  yAxisLabel: 'SBD Total',
  higherIsBetter: true,
}

/** @deprecated Prefer STRENGTH_GRAPH_TRACKS; kept for any SBD-only callers. */
export const SBD_TOTAL_TRACKS = [SBD_TOTAL_TRACK]

/**
 * Strength progress graph tabs — SBD Total leftmost, then individual lifts.
 * Each tab still shows only that metric's history series.
 */
export const STRENGTH_GRAPH_TRACKS = [SBD_TOTAL_TRACK, ...STRENGTH_TRACKS]

/** Running: independent distance series (times stored in seconds). */
export const RUNNING_TRACKS = RACE_DISTANCES_MILES.map((race) => ({
  id: race.id,
  label: race.name,
  exerciseName: race.name,
  yAxisLabel: 'Time',
  higherIsBetter: false,
}))

export const SCORING_TRACKS = [
  {
    id: 'fpc-score',
    label: BRAND.scoreName,
    exerciseName: BRAND.scoreExerciseName,
    yAxisLabel: BRAND.scoreName,
    higherIsBetter: true,
  },
]

/** Stored in performance_records.calculator_type for scoring saves (legacy key). */
export const FPC_SCORE_CALCULATOR_TYPE = BRAND.scoreCalculatorType

export const VO2_TRACKS = [
  {
    id: 'vo2max',
    label: 'VO₂ Max',
    exerciseName: 'VO₂ Max',
    yAxisLabel: 'ml/kg/min',
    higherIsBetter: true,
  },
]

export const BMI_CALCULATOR_TYPE = 'bmi'

export const BMI_TRACKS = [
  {
    id: 'bmi',
    label: 'BMI',
    exerciseName: 'BMI',
    yAxisLabel: 'BMI',
    higherIsBetter: false,
  },
]

export const FITNESS_AGE_CALCULATOR_TYPE = 'fitness_age'

/** Companion metric saved with Fitness Age assessments. */
export const RESTING_HEART_RATE_EXERCISE_NAME = 'Resting Heart Rate'

export const FITNESS_AGE_TRACKS = [
  {
    id: 'fitness-age',
    label: 'Fitness Age',
    exerciseName: BRAND.fitnessAgeExerciseName,
    yAxisLabel: 'Fitness Age',
    higherIsBetter: false,
  },
]

const MILITARY_OVERALL_TRACK = {
  id: 'overall',
  label: 'Overall Score',
  exerciseName: 'Overall Score',
  yAxisLabel: 'Score',
  higherIsBetter: true,
}

export const NAVY_PRT_CALCULATOR_TYPE = 'navy-prt'
export const NAVY_PRT_TRACKS = [MILITARY_OVERALL_TRACK]

export const ARMY_AFT_CALCULATOR_TYPE = 'army-aft'
export const ARMY_AFT_TRACKS = [MILITARY_OVERALL_TRACK]

export const MARINE_PFT_CALCULATOR_TYPE = 'marine-pft'
export const MARINE_PFT_TRACKS = [MILITARY_OVERALL_TRACK]

export const AIR_FORCE_PFRA_CALCULATOR_TYPE = 'air-force-pfra'
export const AIR_FORCE_PFRA_TRACKS = [MILITARY_OVERALL_TRACK]

export const AIR_FORCE_PFA_CALCULATOR_TYPE = 'air-force-pfa'
export const AIR_FORCE_PFA_TRACKS = [MILITARY_OVERALL_TRACK]
