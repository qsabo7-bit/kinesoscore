import { BRAND } from './brand'
import { RUNNING_GRAPH_TRACKS } from './trackingTracks'

/**
 * Dashboard overview metric definitions.
 * Maps UI selectors → performance_records filters + calculator deep-links.
 */

export const DASHBOARD_GRAPH_METRICS = [
  {
    id: 'fpc-score',
    label: BRAND.scoreName,
    calculatorType: BRAND.scoreCalculatorType,
    exerciseName: BRAND.scoreExerciseName,
    valueKind: 'number',
    yAxisLabel: BRAND.scoreName,
    higherIsBetter: true,
    tab: 'scoring',
    unit: 'points',
  },
  {
    id: 'fitness-age',
    label: 'Fitness Age',
    calculatorType: 'fitness_age',
    exerciseName: BRAND.fitnessAgeExerciseName,
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
    id: 'sbd-total',
    label: 'SBD Total',
    calculatorType: 'strength',
    exerciseName: 'SBD Total',
    valueKind: 'mass',
    yAxisLabel: 'SBD Total',
    higherIsBetter: true,
    tab: 'strength',
  },
  {
    id: 'running',
    label: 'Running',
    calculatorType: 'running',
    /** All running rows; Dashboard filters by RUNNING_GRAPH_TRACKS sub-tab. */
    exerciseName: null,
    valueKind: 'duration',
    yAxisLabel: 'Time',
    higherIsBetter: false,
    tab: 'running',
    unit: 'sec',
    tracks: RUNNING_GRAPH_TRACKS,
    defaultTrackId: 'estimated-5k',
  },
]

export const ACTIVITY_META = {
  [BRAND.scoreCalculatorType]: {
    title: BRAND.scoreName,
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
  bmr: {
    title: 'BMR',
    tab: 'bmr',
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
  'air-force-pfra': {
    title: 'Air Force PFRA',
    tab: 'air-force-pfra',
    valueKind: 'number',
  },
  'air-force-pfa': {
    title: 'Air Force PFA',
    tab: 'air-force-pfa',
    valueKind: 'number',
  },
  'army-aft': {
    title: 'Army AFT',
    tab: 'army-aft',
    valueKind: 'number',
  },
  'marine-pft': {
    title: 'Marine Corps PFT',
    tab: 'marine-pft',
    valueKind: 'number',
  },
  'navy-prt': {
    title: 'Navy PRT',
    tab: 'navy-prt',
    valueKind: 'number',
  },
  'max-pushups': {
    title: 'Max Push-ups',
    tab: 'max-pushups',
    valueKind: 'number',
  },
  'max-pullups': {
    title: 'Max Pull-ups',
    tab: 'max-pullups',
    valueKind: 'number',
  },
  fran: {
    title: 'Fran',
    tab: 'fran',
    valueKind: 'duration',
  },
  murph: {
    title: 'Murph',
    tab: 'murph',
    valueKind: 'duration',
  },
  cindy: {
    title: 'Cindy',
    tab: 'cindy',
    valueKind: 'number',
  },
}
