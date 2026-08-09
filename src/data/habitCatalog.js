/**
 * Stage 7 Habit Tracker catalog.
 * Small, expandable list of general wellness habits — not medical advice.
 */
export const HABIT_CATALOG = [
  {
    key: 'sleep_7_8',
    name: 'Sleep 7–8 hours',
    description: 'Aim for a full night of rest when it fits your schedule.',
  },
  {
    key: 'protein',
    name: 'Eat enough protein',
    description: 'Hit a protein target that supports your training goals.',
  },
  {
    key: 'water',
    name: 'Drink water',
    description: 'Stay hydrated across the day.',
  },
  {
    key: 'exercise',
    name: 'Exercise',
    description: 'Complete a planned training or workout session.',
  },
  {
    key: 'walk_move',
    name: 'Walk / get daily movement',
    description: 'Get light movement or steps outside structured workouts.',
  },
  {
    key: 'mobility',
    name: 'Stretch or mobility',
    description: 'Spend a few minutes on mobility or stretching.',
  },
  {
    key: 'recovery_day',
    name: 'Take a rest/recovery day',
    description: 'Prioritize recovery when your plan calls for it.',
  },
  {
    key: 'screen_limit',
    name: 'Limit screens before bed',
    description: 'Reduce evening screen time to support wind-down.',
  },
  {
    key: 'sleep_schedule',
    name: 'Consistent sleep schedule',
    description: 'Keep bedtime and wake time roughly consistent.',
  },
]

export function habitCatalogByKey(key) {
  return HABIT_CATALOG.find((item) => item.key === key) || null
}
