import { STRENGTH_NORM_SOURCE } from './strengthNorms.js'
import { RUNNING_NORM_SOURCE } from './runningNorms.js'
import { FITNESS_SCORE_SOURCE } from '../calculations/fitnessScore.js'
import {
  COOPER_VO2_SOURCE,
  ROCKPORT_VO2_SOURCE,
  VO2_NORM_SOURCE,
} from '../calculations/vo2max.js'
import {
  MIFFLIN_ST_JEOR_SOURCE,
  TDEE_ACTIVITY_SOURCE,
} from '../calculations/bmr.js'
import { BRAND } from './brand.js'

/**
 * Public citations for Fitness Performance Calculator formulas and data.
 * About page renders this list. Live calculator sources are included so
 * About stays aligned with peer-comparison panels.
 */
export const sources = [
  {
    id: 'epley',
    category: 'Strength formulas',
    title: 'Epley one-rep max formula',
    detail: `${BRAND.full} estimates 1RM with the Epley equation: 1RM = weight × (1 + reps / 30). This is a widely used practical estimate for submaximal sets.`,
    url: 'https://en.wikipedia.org/wiki/One-repetition_maximum#Epley_formula',
    linkLabel: 'One-repetition maximum (Epley formula)',
  },
  {
    id: 'recreational-strength',
    category: 'Strength percentiles',
    title: STRENGTH_NORM_SOURCE.name,
    detail: `${STRENGTH_NORM_SOURCE.detail} Standards follow common recreational beginner → elite bodyweight-ratio ladders (similar to Strength Level–style gym standards) with age scaling for older adults.`,
    url: STRENGTH_NORM_SOURCE.url,
    linkLabel: 'Barbell Medicine strength standards (recreational context)',
  },
  {
    id: 'strength-level-context',
    category: 'Strength percentiles',
    title: 'Recreational gym strength ladders',
    detail:
      'Beginner, novice, intermediate, advanced, and elite recreational bodyweight ratios for squat, bench, and deadlift are widely published for everyday lifters. FPC uses that recreational framing — not competitive powerlifting meet data — when estimating strength percentiles.',
    url: 'https://strengthlevel.com/strength-standards',
    linkLabel: 'Strength Level strength standards',
  },
  {
    id: 'riegel',
    category: 'Running formulas',
    title: 'Riegel race-time prediction formula',
    detail: `${BRAND.full} predicts equivalent race times with the Riegel model: T2 = T1 × (D2 / D1)^1.06. This is a common endurance prediction formula for converting between distances.`,
    url: 'https://en.wikipedia.org/wiki/Peter_Riegel',
    linkLabel: 'Peter Riegel / race prediction formula',
  },
  {
    id: 'runrepeat',
    category: 'Running percentiles',
    title: RUNNING_NORM_SOURCE.name,
    detail: RUNNING_NORM_SOURCE.detail,
    url: RUNNING_NORM_SOURCE.url,
    linkLabel: 'RunRepeat percentile calculator',
  },
  {
    id: 'age-band-medians',
    category: 'Running age adjustment',
    title: 'Age-group median race times',
    detail:
      'Age bands are centered using published age-group median 5K finish times from large race-result reporting. This preserves the RunRepeat distribution shape while adjusting for age. Age-related endurance decline is also documented in exercise physiology literature (for example, Tanaka & Seals, 2008).',
    url: 'https://run.outsideonline.com/road/road-racing/whats-a-good-5k-time-heres-what-the-latest-data-says/',
    linkLabel: 'Outside Online 5K age-group reporting',
  },
  {
    id: 'fpc-score',
    category: 'Fitness Scoring',
    title: FITNESS_SCORE_SOURCE.name,
    detail: FITNESS_SCORE_SOURCE.detail,
    url: FITNESS_SCORE_SOURCE.url,
    linkLabel: 'Recreational strength standards used in the composite',
  },
  {
    id: 'cooper-vo2',
    category: 'VO₂ Max formulas',
    title: COOPER_VO2_SOURCE.name,
    detail: COOPER_VO2_SOURCE.detail,
    url: COOPER_VO2_SOURCE.url,
    linkLabel: 'Cooper test (Wikipedia)',
  },
  {
    id: 'rockport-vo2',
    category: 'VO₂ Max formulas',
    title: ROCKPORT_VO2_SOURCE.name,
    detail: ROCKPORT_VO2_SOURCE.detail,
    url: ROCKPORT_VO2_SOURCE.url,
    linkLabel: 'Kline et al., 1987 (PubMed)',
  },
  {
    id: 'vo2-norms',
    category: 'VO₂ Max percentiles',
    title: VO2_NORM_SOURCE.name,
    detail: VO2_NORM_SOURCE.detail,
    url: VO2_NORM_SOURCE.url,
    linkLabel: 'ACSM Guidelines for Exercise Testing and Prescription',
  },
  {
    id: 'mifflin-st-jeor',
    category: 'Metabolism formulas',
    title: MIFFLIN_ST_JEOR_SOURCE.name,
    detail: MIFFLIN_ST_JEOR_SOURCE.detail,
    url: MIFFLIN_ST_JEOR_SOURCE.url,
    linkLabel: 'Mifflin et al., 1990 (PubMed)',
  },
  {
    id: 'tdee-activity',
    category: 'Metabolism formulas',
    title: TDEE_ACTIVITY_SOURCE.name,
    detail: TDEE_ACTIVITY_SOURCE.detail,
    url: TDEE_ACTIVITY_SOURCE.url,
    linkLabel: 'Dietary Guidelines energy needs context (NCBI Bookshelf)',
  },
]
