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
    exerciseName: 'Overall FPC Score',
    yAxisLabel: 'FPC Score',
    higherIsBetter: true,
  },
]

/** Stored in performance_records.calculator_type for scoring saves. */
export const FPC_SCORE_CALCULATOR_TYPE = 'FPC Score'

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

export const FITNESS_AGE_TRACKS = [
  {
    id: 'fitness-age',
    label: 'Fitness Age',
    exerciseName: 'FPC Fitness Age',
    yAxisLabel: 'Fitness Age',
    higherIsBetter: false,
  },
]
