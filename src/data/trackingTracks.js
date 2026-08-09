import { RACE_DISTANCES_MILES } from '../calculations/running.js'
import { BRAND } from './brand.js'

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

/** Stored exercise_name for the canonical Estimated 5K series. */
export const ESTIMATED_5K_EXERCISE_NAME = 'Estimated 5K'

export const ESTIMATED_5K_TRACK = {
  id: 'estimated-5k',
  label: 'Estimated 5K',
  exerciseName: ESTIMATED_5K_EXERCISE_NAME,
  yAxisLabel: 'Time',
  higherIsBetter: false,
  /** Display-only series derived from actual distance saves (not stored). */
  derived: true,
  tooltip: `Calculated from your most recently saved running performance. This value is also used to autofill your ${BRAND.scoreName} Fitness Score calculation.`,
}

/**
 * Graph-supported actual race distances only (save targets).
 * Uses existing RACE_DISTANCES_MILES / historical exercise names.
 */
export const RUNNING_DISTANCE_TRACKS = RACE_DISTANCES_MILES.map((race) => ({
  id: race.id,
  label: race.name,
  exerciseName: race.name,
  yAxisLabel: 'Time',
  higherIsBetter: false,
}))

/**
 * Running progress tabs shared by Running calculator + Dashboard.
 * Estimated 5K sits immediately after the actual 5K tab.
 */
export const RUNNING_TRACKS = (() => {
  const tracks = []
  for (const track of RUNNING_DISTANCE_TRACKS) {
    tracks.push(track)
    if (track.id === '5k') tracks.push(ESTIMATED_5K_TRACK)
  }
  return tracks
})()

/** Alias for shared graph source (Running page + Dashboard). */
export const RUNNING_GRAPH_TRACKS = RUNNING_TRACKS

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

export const BMR_CALCULATOR_TYPE = 'bmr'

export const BMR_TRACKS = [
  {
    id: 'bmr',
    label: 'BMR',
    exerciseName: 'BMR',
    yAxisLabel: 'kcal/day',
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

/** Fitness Assessments — capacity tests + benchmark WODs */
export const MAX_PUSHUPS_CALCULATOR_TYPE = 'max-pushups'
export const MAX_PUSHUPS_TRACKS = [
  {
    id: 'max-pushups',
    label: 'Max Push-ups',
    exerciseName: 'Max Push-ups',
    yAxisLabel: 'Reps',
    higherIsBetter: true,
  },
]

export const MAX_PULLUPS_CALCULATOR_TYPE = 'max-pullups'
export const MAX_PULLUPS_TRACKS = [
  {
    id: 'max-pullups',
    label: 'Max Pull-ups',
    exerciseName: 'Max Pull-ups',
    yAxisLabel: 'Reps',
    higherIsBetter: true,
  },
]

export const FRAN_CALCULATOR_TYPE = 'fran'
export const FRAN_TRACKS = [
  {
    id: 'fran-rx',
    label: 'Fran Rx',
    exerciseName: 'Fran Rx',
    yAxisLabel: 'Time',
    higherIsBetter: false,
  },
  {
    id: 'fran-scaled',
    label: 'Fran Scaled',
    exerciseName: 'Fran Scaled',
    yAxisLabel: 'Time',
    higherIsBetter: false,
  },
]

export const MURPH_CALCULATOR_TYPE = 'murph'
export const MURPH_TRACKS = [
  {
    id: 'murph-rx',
    label: 'Murph Rx',
    exerciseName: 'Murph Rx',
    yAxisLabel: 'Time',
    higherIsBetter: false,
  },
  {
    id: 'murph-scaled',
    label: 'Murph Scaled',
    exerciseName: 'Murph Scaled',
    yAxisLabel: 'Time',
    higherIsBetter: false,
  },
]

export const CINDY_CALCULATOR_TYPE = 'cindy'
export const CINDY_TRACKS = [
  {
    id: 'cindy',
    label: 'Cindy',
    exerciseName: 'Cindy',
    yAxisLabel: 'Work reps',
    higherIsBetter: true,
  },
]
