/**
 * Client-side achievement unlocks (local). No public habit details.
 * Keys are stable; do not rename without a migration map.
 */

/** @typedef {{ id: string, title: string, blurb: string, category: string }} AchievementDef */

/** @type {AchievementDef[]} */
export const ACHIEVEMENT_CATALOG = [
  {
    id: 'first_habit',
    title: 'Routine Started',
    blurb: 'Add your first habit card.',
    category: 'habits',
  },
  {
    id: 'first_checkin',
    title: 'First Log',
    blurb: 'Complete a habit for the first time.',
    category: 'habits',
  },
  {
    id: 'perfect_day',
    title: 'Clean Day',
    blurb: 'Finish every active habit in one day.',
    category: 'habits',
  },
  {
    id: 'habit_streak_7',
    title: 'Week Stack',
    blurb: 'Hold a 7-day all-habits streak.',
    category: 'habits',
  },
  {
    id: 'habit_level_5',
    title: 'Level 5',
    blurb: 'Reach habit level 5.',
    category: 'habits',
  },
  {
    id: 'consistency_75',
    title: 'Steady Hand',
    blurb: 'Hit 75% consistency over 30 days.',
    category: 'habits',
  },
  {
    id: 'first_save',
    title: 'First Save',
    blurb: 'Save a calculator result.',
    category: 'performance',
  },
  {
    id: 'first_share',
    title: 'On the Board',
    blurb: 'Share a result or habit XP publicly.',
    category: 'social',
  },
  {
    id: 'leaderboard_name',
    title: 'Named Up',
    blurb: 'Set a Leaderboard Name.',
    category: 'social',
  },
  {
    id: 'first_group_log',
    title: 'Team Log',
    blurb: 'Log activity in a group.',
    category: 'social',
  },
  {
    id: 'week_rank',
    title: 'This Week',
    blurb: 'Appear on a This Week board.',
    category: 'social',
  },
  {
    id: 'day_one_quest',
    title: 'Day One',
    blurb: 'Finish the Day One onboarding quest.',
    category: 'onboarding',
  },
]

export function achievementById(id) {
  return ACHIEVEMENT_CATALOG.find((item) => item.id === id) || null
}
