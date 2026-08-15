/**
 * Topic Library vocabulary for KinesoScore content / n8n automation.
 * Grounded in features that exist in the current codebase.
 */

/** @typedef {'beginner' | 'intermediate' | 'advanced'} TopicDifficulty */

/**
 * @typedef {'educational'
 * | 'fitness_fact'
 * | 'misconception'
 * | 'comparison'
 * | 'training_concept'
 * | 'calculator_explanation'
 * | 'performance_question'
 * | 'data_interpretation'
 * | 'product_education'} ContentType
 */

/**
 * Categories supported by current KinesoScore features / education.
 * Only retain categories with real product or methodological grounding.
 */
export const TOPIC_CATEGORIES = Object.freeze({
  strength: {
    id: 'strength',
    label: 'Strength',
    description: 'General barbell strength concepts, bodyweight-relative strength, and recreational strength context.',
  },
  bench_press: {
    id: 'bench_press',
    label: 'Bench Press',
    description: 'Bench press as a tracked upper-body strength lift.',
  },
  squat: {
    id: 'squat',
    label: 'Squat',
    description: 'Squat as a tracked lower-body strength lift.',
  },
  deadlift: {
    id: 'deadlift',
    label: 'Deadlift',
    description: 'Deadlift as a tracked posterior-chain strength lift.',
  },
  sbd: {
    id: 'sbd',
    label: 'SBD / Combined Strength',
    description: 'Combined squat + bench + deadlift (SBD Total) as a high-level strength measure.',
  },
  one_rm: {
    id: 'one_rm',
    label: '1RM / Epley',
    description: 'One-rep max concepts and the public Epley estimation formula.',
  },
  fitness_score: {
    id: 'fitness_score',
    label: 'Fitness Score',
    description: 'myKinesoScore™ — equal-weight strength + running percentile composite (public description only).',
  },
  fitness_age: {
    id: 'fitness_age',
    label: 'Fitness Age',
    description: 'Cardiorespiratory fitness age concepts grounded in the public Fitness Age source text.',
  },
  fitness_tracking: {
    id: 'fitness_tracking',
    label: 'Fitness Tracking',
    description: 'Saving, trending, and comparing performances over time.',
  },
  performance_measurement: {
    id: 'performance_measurement',
    label: 'Performance Measurement',
    description: 'Percentiles, peer context, field tests, and interpreting measured results.',
  },
  training_concepts: {
    id: 'training_concepts',
    label: 'Training Concepts',
    description: 'General training ideas that support measurement literacy (not programming prescriptions).',
  },
  running: {
    id: 'running',
    label: 'Running / Endurance',
    description: 'Race distances, Riegel prediction, pace, and running peer context.',
  },
  vo2_max: {
    id: 'vo2_max',
    label: 'VO₂ Max',
    description: 'VO₂ max field tests (Cooper, Rockport) and cardiorespiratory fitness norms.',
  },
  metabolism: {
    id: 'metabolism',
    label: 'Metabolism & Body Metrics',
    description: 'BMR (Mifflin–St Jeor), TDEE activity factors, and BMI as a screening tool.',
  },
  fitness_assessments: {
    id: 'fitness_assessments',
    label: 'Fitness Assessments',
    description: 'Max push-ups/pull-ups and benchmark WODs (Fran, Murph, Cindy) as defined in-product.',
  },
  military_assessments: {
    id: 'military_assessments',
    label: 'Military Assessments',
    description: 'Unofficial educational overviews of AFT, PFRA, PFA, Marine PFT, and Navy PRT event lists.',
  },
  habits: {
    id: 'habits',
    label: 'Habits & Consistency',
    description: 'Habit tracking and streaks as product features for consistent training support.',
  },
  general_fitness_education: {
    id: 'general_fitness_education',
    label: 'General Fitness Education',
    description: 'Broad fitness literacy that remains true without inventing stats or medical claims.',
  },
  product_education: {
    id: 'product_education',
    label: 'KinesoScore Product Education',
    description: 'What KinesoScore tools do, how they relate, and what they are not (soft, non-hype).',
  },
})

export const CONTENT_TYPES = Object.freeze([
  'educational',
  'fitness_fact',
  'misconception',
  'comparison',
  'training_concept',
  'calculator_explanation',
  'performance_question',
  'data_interpretation',
  'product_education',
])

export const DIFFICULTIES = Object.freeze([
  'beginner',
  'intermediate',
  'advanced',
])

/**
 * Source ids that exist in src/data/sources.js.
 * Topics may reference these; do not invent new citation ids here.
 */
export const KNOWN_SOURCE_IDS = Object.freeze([
  'epley',
  'recreational-strength',
  'strength-level-context',
  'strength-age-decline',
  'riegel',
  'runrepeat',
  'age-band-medians',
  'fpc-score',
  'cooper-vo2',
  'rockport-vo2',
  'vo2-norms',
  'mifflin-st-jeor',
  'tdee-activity',
])
