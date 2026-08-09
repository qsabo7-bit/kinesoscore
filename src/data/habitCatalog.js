/**
 * Stage 7 Habit Tracker catalog.
 * Small, expandable list of general wellness habits — not medical advice.
 */
export const HABIT_CATALOG = [
  {
    key: 'sleep_7_8',
    name: 'Sleep 7–8 hours',
    emoji: '😴',
    description: 'Aim for a full night of rest when it fits your schedule.',
  },
  {
    key: 'protein',
    name: 'Eat enough protein',
    emoji: '🥩',
    description: 'Hit a protein target that supports your training goals.',
  },
  {
    key: 'water',
    name: 'Drink water',
    emoji: '💧',
    description: 'Stay hydrated across the day.',
  },
  {
    key: 'exercise',
    name: 'Exercise',
    emoji: '💪',
    description: 'Complete a planned training or workout session.',
  },
  {
    key: 'walk_move',
    name: 'Walk / get daily movement',
    emoji: '🚶',
    description: 'Get light movement or steps outside structured workouts.',
  },
  {
    key: 'mobility',
    name: 'Stretch or mobility',
    emoji: '🧘',
    description: 'Spend a few minutes on mobility or stretching.',
  },
  {
    key: 'recovery_day',
    name: 'Take a rest/recovery day',
    emoji: '😌',
    description: 'Prioritize recovery when your plan calls for it.',
  },
  {
    key: 'screen_limit',
    name: 'Limit screens before bed',
    emoji: '📵',
    description: 'Reduce evening screen time to support wind-down.',
  },
  {
    key: 'sleep_schedule',
    name: 'Consistent sleep schedule',
    emoji: '⏰',
    description: 'Keep bedtime and wake time roughly consistent.',
  },
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
