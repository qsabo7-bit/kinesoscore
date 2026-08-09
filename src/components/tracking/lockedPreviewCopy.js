import { BRAND } from '../../data/brand'

/** Shared guest CTA copy for every calculator's locked graph preview. */
export const DEFAULT_LOCKED_PREVIEW = {
  title: 'Save your progress',
  lead: 'Create a free account to unlock:',
  benefits: [
    'Progress tracking',
    'Performance graphs',
    'Personal records',
    'History',
  ],
}

/** Guest CTA for the Dashboard page. */
export const DASHBOARD_LOCKED_PREVIEW = {
  title: 'Track your fitness progress',
  lead: 'Create a free account to unlock your dashboard:',
  benefits: [
    `Personal ${BRAND.scoreName} ring`,
    'Progress graphs across metrics',
    'Habits streak tracking',
    'Personal records',
    'Recent activity timeline',
    'Saved results history',
  ],
}

/** Guest CTA for the KinesoScore calculator. */
export const FPC_SCORE_LOCKED_PREVIEW = {
  title: `Save your ${BRAND.scoreName}`,
  lead: 'Create a free account to unlock:',
  benefits: [
    `${BRAND.scoreName} history`,
    'Progress tracking',
    'Personal records',
    'Performance graphs',
  ],
}

export const BMI_LOCKED_PREVIEW = {
  title: 'Save your BMI history',
  lead: 'Create a free account to unlock:',
  benefits: [
    'BMI history',
    'Progress graphs',
    'Lowest / highest tracking',
    'Change over time',
  ],
}

export const BMR_LOCKED_PREVIEW = {
  title: 'Save your BMR history',
  lead: 'Create a free account to unlock:',
  benefits: [
    'BMR history',
    'Progress graphs',
    'Personal records',
    'Change over time',
  ],
}

export const HABITS_LOCKED_PREVIEW = {
  title: 'Private habit tracking',
  lead: 'Create a free account to unlock:',
  benefits: [
    'Daily habit checklist',
    'Completion streaks',
    'Optional Habit Streak sharing',
    'Private check-in history',
  ],
}

export const ACCOUNT_LOCKED_PREVIEW = {
  title: 'Account Settings',
  lead: 'Create a free account to unlock:',
  benefits: [
    'Profile & Leaderboard Name',
    'Saved calculator history',
    'Habits and progress sync',
    'Account security controls',
  ],
}

export const FITNESS_AGE_LOCKED_PREVIEW = {
  title: 'Track Fitness Age over time',
  lead: 'Create a free account to unlock:',
  benefits: [
    'Fitness Age history',
    'Best (lowest) age',
    'Progress graphs',
    'Assessment history',
  ],
}
