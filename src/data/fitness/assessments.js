/**
 * Fitness Assessments configs (benchmark WODs + max tests).
 * Distinct from military assessments — no official point tables.
 */

import { FITNESS_ASSESSMENT_DISCLAIMER } from './wodStandards.js'

const GENDERS = [
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
]

const PRESCRIPTION_OPTIONS = [
  { id: 'rx', label: 'Rx' },
  { id: 'scaled', label: 'Scaled' },
]

export const FITNESS_ASSESSMENTS = {
  'max-pushups': {
    id: 'max-pushups',
    name: 'Max Push-ups',
    shortName: 'Max Push-ups',
    eyebrow: 'Fitness Assessments',
    lead: 'Count max push-ups completed in 60 seconds. Chest to deck, lockout at the top — use a consistent standard every attempt.',
    infoStatus: 'Benchmark capacity test',
    scoringReady: true,
    resultKind: 'reps',
    showGender: false,
    showPrescription: false,
    genders: GENDERS,
    standardNote:
      '60-second clock. Chest to deck, full lockout at the top — keep the same standard every attempt.',
    events: [
      {
        id: 'reps',
        label: 'Push-ups completed',
        kind: 'reps',
        placeholder: '45',
        hint: 'Count every valid rep finished inside 60 seconds.',
      },
    ],
    exerciseName: 'Max Push-ups',
    trackId: 'max-pushups',
    higherIsBetter: true,
    resultUnit: 'reps',
    heroLabel: 'Reps in 1 minute',
    source: {
      name: 'KinesoScore capacity test',
      detail:
        'Self-timed 60-second max push-up test. Use the same standard (depth and lockout) for fair progress tracking.',
      url: null,
    },
    disclaimer: FITNESS_ASSESSMENT_DISCLAIMER,
  },
  'max-pullups': {
    id: 'max-pullups',
    name: 'Max Pull-ups',
    shortName: 'Max Pull-ups',
    eyebrow: 'Fitness Assessments',
    lead: 'Count max pull-ups completed in 60 seconds. Chin clearly over the bar each rep — kipping allowed only if you always record the same style.',
    infoStatus: 'Benchmark capacity test',
    scoringReady: true,
    resultKind: 'reps',
    showGender: false,
    showPrescription: false,
    genders: GENDERS,
    standardNote:
      '60-second clock. Chin clearly over the bar each rep. Note strict vs kipping and keep one style when tracking.',
    events: [
      {
        id: 'reps',
        label: 'Pull-ups completed',
        kind: 'reps',
        placeholder: '20',
        hint: 'Count every valid rep finished inside 60 seconds.',
      },
    ],
    exerciseName: 'Max Pull-ups',
    trackId: 'max-pullups',
    higherIsBetter: true,
    resultUnit: 'reps',
    heroLabel: 'Reps in 1 minute',
    source: {
      name: 'KinesoScore capacity test',
      detail:
        'Self-timed 60-second max pull-up test. Note strict vs kipping and keep the style consistent when tracking.',
      url: null,
    },
    disclaimer: FITNESS_ASSESSMENT_DISCLAIMER,
  },
  fran: {
    id: 'fran',
    name: 'Fran',
    shortName: 'Fran',
    eyebrow: 'Fitness Assessments',
    lead: 'Log your Fran finish time. Rx thruster loads differ by gender — keep Rx and Scaled on separate boards for fair comparisons.',
    guideTab: 'fran-guide',
    guideLabel: 'What is Fran?',
    infoStatus: 'Benchmark WOD (for time)',
    scoringReady: true,
    resultKind: 'forTime',
    showGender: true,
    showPrescription: true,
    genders: GENDERS,
    prescriptionOptions: PRESCRIPTION_OPTIONS,
    wodId: 'fran',
    events: [
      {
        id: 'finish',
        label: 'Finish time',
        kind: 'duration',
        unit: 'hr:min:sec',
        showHours: true,
        placeholderHr: '0',
        placeholderMin: '3',
        placeholderSec: '30',
        hint: 'From start to last pull-up. Use Hr when over 60 minutes.',
      },
    ],
    higherIsBetter: false,
    resultUnit: 'sec',
    heroLabel: 'Finish time',
    source: {
      name: 'Benchmark WOD — Fran',
      detail:
        'Classic for-time couplet: 21-15-9 thrusters and pull-ups. Rx loads are commonly 95 lb (male) / 65 lb (female). Educational tracking only.',
      url: null,
    },
    disclaimer: FITNESS_ASSESSMENT_DISCLAIMER,
  },
  murph: {
    id: 'murph',
    name: 'Murph',
    shortName: 'Murph',
    eyebrow: 'Fitness Assessments',
    lead: 'Log your Murph finish time. Rx commonly includes a weighted vest with gender-specific loads — record Rx and Scaled separately.',
    guideTab: 'murph-guide',
    guideLabel: 'What is Murph?',
    infoStatus: 'Benchmark WOD (for time)',
    scoringReady: true,
    resultKind: 'forTime',
    showGender: true,
    showPrescription: true,
    genders: GENDERS,
    prescriptionOptions: PRESCRIPTION_OPTIONS,
    wodId: 'murph',
    events: [
      {
        id: 'finish',
        label: 'Finish time',
        kind: 'duration',
        unit: 'hr:min:sec',
        showHours: true,
        placeholderHr: '0',
        placeholderMin: '45',
        placeholderSec: '00',
        hint: 'Total time including both miles and calisthenics. Use Hr when over 60 minutes.',
      },
    ],
    higherIsBetter: false,
    resultUnit: 'sec',
    heroLabel: 'Finish time',
    source: {
      name: 'Benchmark WOD — Murph',
      detail:
        '1-mile run, 100 pull-ups, 200 push-ups, 300 air squats, 1-mile run. Partitioning is allowed. Vest Rx is commonly 20 lb / 14 lb. Educational tracking only.',
      url: null,
    },
    disclaimer: FITNESS_ASSESSMENT_DISCLAIMER,
  },
  cindy: {
    id: 'cindy',
    name: 'Cindy',
    shortName: 'Cindy',
    eyebrow: 'Fitness Assessments',
    lead: 'Log completed rounds plus leftover reps in the 20-minute Cindy AMRAP. Ranking uses total work (each round = 30 reps).',
    guideTab: 'cindy-guide',
    guideLabel: 'What is Cindy?',
    infoStatus: 'Benchmark WOD (AMRAP)',
    scoringReady: true,
    resultKind: 'amrap',
    showGender: false,
    showPrescription: false,
    genders: GENDERS,
    wodId: 'cindy',
    events: [
      {
        id: 'rounds',
        label: 'Full rounds',
        kind: 'reps',
        placeholder: '15',
        hint: 'Enter 0 if you did not finish a full round.',
      },
      {
        id: 'extraReps',
        label: 'Extra reps into next round',
        kind: 'reps',
        placeholder: '8',
        max: 29,
        hint: 'Leftover reps in order: pull-ups → push-ups → squats (0–29).',
      },
    ],
    exerciseName: 'Cindy',
    trackId: 'cindy',
    higherIsBetter: true,
    resultUnit: 'reps',
    heroLabel: 'Rounds + reps',
    source: {
      name: 'Benchmark WOD — Cindy',
      detail:
        '20-minute AMRAP: 5 pull-ups, 10 push-ups, 15 air squats. Leaderboard rank uses total reps (rounds × 30 + extras). Educational tracking only.',
      url: null,
    },
    disclaimer: FITNESS_ASSESSMENT_DISCLAIMER,
  },
}

export function getFitnessAssessment(id) {
  return FITNESS_ASSESSMENTS[id] || null
}

export const fitnessAssessmentIds = Object.keys(FITNESS_ASSESSMENTS)
