/**
 * Habit Tracker catalog — picture cards + base XP for the XP loop.
 * Optional wellness prompts, not medical advice.
 */

/** @typedef {{ key: string, name: string, emoji: string, description: string, baseXp: number, image?: string }} HabitCatalogItem */

/** Streak length → XP multiplier (caps at 1.5× on day 5+). */
export const HABIT_XP_MULTIPLIERS = Object.freeze({
  1: 1.0,
  2: 1.1,
  3: 1.2,
  4: 1.35,
  5: 1.5,
})

/**
 * @param {number} streakDays consecutive completed days including today (min 1)
 * @returns {number}
 */
export function habitXpMultiplier(streakDays) {
  const n = Math.max(1, Math.floor(Number(streakDays) || 1))
  if (n >= 5) return HABIT_XP_MULTIPLIERS[5]
  return HABIT_XP_MULTIPLIERS[n] ?? 1
}

/**
 * @param {number} baseXp
 * @param {number} streakDays
 * @returns {number}
 */
export function awardHabitXp(baseXp, streakDays) {
  const base = Math.max(0, Math.floor(Number(baseXp) || 0))
  return Math.round(base * habitXpMultiplier(streakDays))
}

/** @type {HabitCatalogItem[]} */
export const HABIT_CATALOG = [
  {
    key: 'sleep_7_8',
    name: 'Sleep 7–8 hours',
    emoji: '😴',
    description: 'Aim for a full night of rest when it fits your schedule.',
    baseXp: 15,
    image: '/habits/sleep.jpg',
  },
  {
    key: 'protein',
    name: 'Eat ≥ 0.7g protein × bodyweight',
    emoji: '🥩',
    description: 'Hit a protein target that supports your training goals.',
    baseXp: 15,
    image: '/habits/protein.jpg',
  },
  {
    key: 'water',
    name: 'Drink ≥ 2.5 L water',
    emoji: '💧',
    description: 'Stay hydrated across the day.',
    baseXp: 10,
    image: '/habits/water.jpg',
  },
  {
    key: 'mobility',
    name: 'Stretch or mobility',
    emoji: '🧘',
    description: 'Spend a few minutes on mobility, stretching, or recovery work.',
    baseXp: 20,
    image: '/habits/mobility.jpg',
  },
  {
    key: 'strength',
    name: 'Strength training',
    emoji: '🏋️',
    description: 'Complete a planned strength or lifting session.',
    baseXp: 30,
    image: '/habits/strength.jpg',
  },
  {
    key: 'nature',
    name: 'Connect with nature',
    emoji: '🌳',
    description: 'Get outside and put the phone down for a bit.',
    baseXp: 15,
    image: '/habits/nature.jpg',
  },
  {
    key: 'exercise',
    name: 'Exercise / cardio',
    emoji: '💪',
    description: 'Complete a planned training, run, or workout session.',
    baseXp: 25,
    image: '/habits/exercise.jpg',
  },
  {
    key: 'walk_move',
    name: 'Walk / get daily movement',
    emoji: '🚶',
    description: 'Get light movement or steps outside structured workouts.',
    baseXp: 12,
    image: '/habits/walk_move.jpg',
  },
  {
    key: 'sleep_schedule',
    name: 'Consistent sleep schedule',
    emoji: '⏰',
    description: 'Keep bedtime and wake time roughly consistent.',
    baseXp: 15,
    image: '/habits/sleep_schedule.jpg',
  },
  {
    key: 'screen_limit',
    name: 'Limit screens before bed',
    emoji: '📵',
    description: 'Reduce evening screen time to support wind-down.',
    baseXp: 12,
    image: '/habits/screen_limit.jpg',
  },
  {
    key: 'recovery_day',
    name: 'Take a rest/recovery day',
    emoji: '😌',
    description: 'Prioritize recovery when your plan calls for it.',
    baseXp: 15,
    image: '/habits/recovery_day.jpg',
  },
  {
    key: 'meditation',
    name: 'Meditate',
    emoji: '🧘‍♂️',
    description: 'Sit quietly for a few minutes — breathwork, stillness, or guided meditation.',
    baseXp: 15,
    image: '/habits/meditation.jpg',
  },
]

/** Picture-card habits shown first in the add catalog. */
export const HABIT_FEATURED_KEYS = [
  'sleep_7_8',
  'protein',
  'water',
  'mobility',
  'strength',
  'nature',
  'exercise',
  'walk_move',
  'sleep_schedule',
  'screen_limit',
  'recovery_day',
  'meditation',
]

export function habitCatalogByKey(key) {
  return HABIT_CATALOG.find((item) => item.key === key) || null
}

/**
 * Display label with trailing emoji for Dashboard / Habits UI.
 * Stored `habit_name` stays plain; emoji comes from the catalog by key.
 *
 * @param {{ habit_key?: string, habit_name?: string, key?: string, name?: string, emoji?: string } | string} habit
 * @param {string} [fallbackName]
 */
export function habitDisplayName(habit, fallbackName = '') {
  const key =
    typeof habit === 'string' ? habit : habit?.habit_key || habit?.key || ''
  const catalog = key ? habitCatalogByKey(key) : null
  const name =
    (typeof habit === 'string'
      ? fallbackName
      : habit?.habit_name || habit?.name || catalog?.name) ||
    fallbackName ||
    ''
  const emoji =
    (typeof habit === 'object' && habit?.emoji) || catalog?.emoji || ''
  if (!name) return ''
  if (!emoji) return name
  if (name.includes(emoji)) return name
  return `${name} ${emoji}`
}

/**
 * @param {{ habit_key?: string, key?: string } | string} habit
 * @returns {string | null}
 */
export function habitCardImage(habit) {
  const key =
    typeof habit === 'string' ? habit : habit?.habit_key || habit?.key || ''
  const catalog = key ? habitCatalogByKey(key) : null
  return catalog?.image || null
}

/**
 * @param {{ habit_key?: string, key?: string } | string} habit
 * @returns {number}
 */
export function habitBaseXp(habit) {
  const key =
    typeof habit === 'string' ? habit : habit?.habit_key || habit?.key || ''
  const catalog = key ? habitCatalogByKey(key) : null
  const n = Number(catalog?.baseXp)
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 10
}
