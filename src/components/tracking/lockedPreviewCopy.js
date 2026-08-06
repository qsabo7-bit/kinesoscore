import { BRAND } from '../../data/brand'

/** Shared guest CTA copy for every calculator's locked graph preview. */
export const DEFAULT_LOCKED_PREVIEW = {
  title: 'Want to save your progress?',
  lead: 'Log in to unlock:',
  benefits: [
    'Progress tracking',
    'Performance graphs',
    'Personal records',
    'History',
  ],
}

/** Guest CTA for the Dashboard page. */
export const DASHBOARD_LOCKED_PREVIEW = {
  title: 'Log in to unlock your dashboard.',
  lead: 'Create a free account to unlock:',
  benefits: [
    `Personal ${BRAND.scoreName} ring`,
    'Progress graphs across metrics',
    'Personal records',
    'Recent activity timeline',
    'Saved results history',
  ],
}

/** Guest CTA for the KinesoScore calculator. */
export const FPC_SCORE_LOCKED_PREVIEW = {
  title: 'Want to save your progress?',
  lead: 'Log in to unlock:',
  benefits: [
    `${BRAND.scoreName} history`,
    'Progress tracking',
    'Personal records',
    'Performance graphs',
  ],
}

export const BMI_LOCKED_PREVIEW = {
  title: 'Want to save your BMI?',
  lead: 'Log in to unlock:',
  benefits: [
    'BMI history',
    'Progress graphs',
    'Lowest / highest tracking',
    'Change over time',
  ],
}

export const FITNESS_AGE_LOCKED_PREVIEW = {
  title: 'Want to track Fitness Age?',
  lead: 'Log in to unlock:',
  benefits: [
    'Fitness Age history',
    'Best (lowest) age',
    'Progress graphs',
    'Assessment history',
  ],
}
