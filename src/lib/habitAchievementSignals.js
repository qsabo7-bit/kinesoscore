import { computeHabitConsistency } from './habitConsistency.js'
import { habitLevelFromXp } from './habitLevels.js'
import { sumLifetimeHabitXp } from './habitXp.js'
import {
  computeHabitStreak,
  isHabitDayComplete,
} from './habitStreaks.js'
import { localDateKey } from './habitDates.js'
import { evaluateAchievements } from './achievements.js'

/**
 * Evaluate habit-related achievement unlocks from current routine state.
 *
 * @param {string} userId
 * @param {Array<{ id: string, is_active?: boolean }>} habits
 * @param {Array<{ habit_id: string, checkin_date: string, completed?: boolean, xp_awarded?: number }>} checkins
 * @param {string} [todayKey]
 */
export function evaluateHabitAchievementSignals(
  userId,
  habits,
  checkins,
  todayKey = localDateKey(),
) {
  if (!userId) return []
  const active = (habits || []).filter((h) => h?.is_active !== false && h?.id)
  const lifetimeXp = sumLifetimeHabitXp(checkins)
  const level = habitLevelFromXp(lifetimeXp).level
  const consistency30 = computeHabitConsistency(habits, checkins, {
    windowDays: 30,
    todayKey,
  })
  const habitStreak = computeHabitStreak(habits, checkins, { todayKey })
  const hasCheckin = (checkins || []).some((row) => row?.completed)
  const perfectDay = isHabitDayComplete(todayKey, active, checkins, todayKey)

  return evaluateAchievements(userId, {
    hasHabits: active.length > 0,
    hasCheckin,
    perfectDay,
    habitStreak,
    habitLevel: level,
    consistency30: consistency30.percent,
  })
}
