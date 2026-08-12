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
  title: 'Your progress, in one place',
  lead: 'Sign in to open a private dashboard with:',
  benefits: [
    `Your latest ${BRAND.scoreName}`,
    'Trends across strength & running',
    'Personal records',
    'Recent saved results',
  ],
}

/** Guest CTA for the KinesoScore calculator (below the near-score save prompt). */
export const FPC_SCORE_LOCKED_PREVIEW = {
  title: 'See your progress over time',
  lead: 'With a free account you also unlock:',
  benefits: [
    `${BRAND.scoreName} history`,
    'Progress graphs',
    'Personal records',
    'Dashboard trends',
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
  title: 'Build a private routine',
  lead: 'Sign in to track habits on your account — nothing is public unless you opt in:',
  benefits: [
    'Daily checklist',
    'Streak tracking',
    'Optional streak sharing',
    'Private history',
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
