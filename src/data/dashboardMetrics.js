/**
 * Dashboard overview metric definitions.
 * Maps UI selectors → performance_records filters + calculator deep-links.
 */

export const DASHBOARD_GRAPH_METRICS = [
  {
    id: 'fpc-score',
    label: 'FPC Score',
    calculatorType: 'FPC Score',
    exerciseName: 'Overall FPC Score',
    valueKind: 'number',
    yAxisLabel: 'FPC Score',
    higherIsBetter: true,
    tab: 'scoring',
    unit: 'points',
  },
  {
    id: 'fitness-age',
    label: 'Fitness Age',
    calculatorType: 'fitness_age',
    exerciseName: 'FPC Fitness Age',
    valueKind: 'number',
    yAxisLabel: 'Fitness Age',
    higherIsBetter: false,
    tab: 'fitness-age',
    unit: 'yr',
  },
  {
    id: 'bmi',
    label: 'BMI',
    calculatorType: 'bmi',
    exerciseName: 'BMI',
    valueKind: 'number',
    yAxisLabel: 'BMI',
    higherIsBetter: false,
    tab: 'bmi',
    unit: 'BMI',
  },
  {
    id: 'bench',
    label: 'Bench',
    calculatorType: 'strength',
    exerciseName: 'Bench Press',
    valueKind: 'mass',
    yAxisLabel: '1RM',
    higherIsBetter: true,
    tab: 'strength',
  },
  {
    id: 'squat',
    label: 'Squat',
    calculatorType: 'strength',
    exerciseName: 'Squat',
    valueKind: 'mass',
    yAxisLabel: '1RM',
    higherIsBetter: true,
    tab: 'strength',
  },
  {
    id: 'deadlift',
    label: 'Deadlift',
    calculatorType: 'strength',
    exerciseName: 'Deadlift',
    valueKind: 'mass',
    yAxisLabel: '1RM',
    higherIsBetter: true,
    tab: 'strength',
  },
  {
    id: 'running',
    label: 'Running',
    calculatorType: 'running',
    exerciseName: '5K',
    valueKind: 'duration',
    yAxisLabel: '5K Time',
    higherIsBetter: false,
    tab: 'running',
    unit: 'sec',
  },
]

export const ACTIVITY_META = {
  'FPC Score': {
    title: 'FPC Score',
    tab: 'scoring',
    valueKind: 'number',
  },
  fitness_age: {
    title: 'Fitness Age Assessment',
    tab: 'fitness-age',
    valueKind: 'number',
  },
  bmi: {
    title: 'BMI',
    tab: 'bmi',
    valueKind: 'number',
  },
  strength: {
    tab: 'strength',
    valueKind: 'mass',
  },
  running: {
    tab: 'running',
    valueKind: 'duration',
  },
  vo2max: {
    title: 'VO₂ Max',
    tab: 'vo2max',
    valueKind: 'number',
  },
}
