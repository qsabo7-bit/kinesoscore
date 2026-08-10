import {
  habitDayProgress,
  isHabitDayComplete,
} from './habitStreaks.js'
import { localDateKey, shiftLocalDateKey } from './habitDates.js'

/**
 * Streak at risk when today is incomplete but yesterday (and prior) formed a streak.
 * Note: computeHabitStreak() is 0 until today is complete — do not use it alone.
 *
 * @returns {{
 *   streakAtRisk: number,
 *   progress: { completed: number, total: number, ratioLabel: string },
 *   todayKey: string,
 * } | null}
 */
export function resolveHabitStreakAtRisk(
  habits,
  checkins,
  todayKey = localDateKey(),
) {
  const active = (habits || []).filter((h) => h?.is_active !== false && h?.id)
  if (!active.length) return null

  if (isHabitDayComplete(todayKey, active, checkins, todayKey)) return null

  const yesterday = shiftLocalDateKey(todayKey, -1)
  let streakAtRisk = 0
  let cursor = yesterday
  for (let i = 0; i < 400; i += 1) {
    if (!isHabitDayComplete(cursor, active, checkins, todayKey)) break
    streakAtRisk += 1
    cursor = shiftLocalDateKey(cursor, -1)
  }

  if (streakAtRisk <= 0) return null

  const progress = habitDayProgress(todayKey, active, checkins, todayKey)
  return {
    streakAtRisk,
    progress: {
      completed: progress.completed,
      total: progress.total,
      ratioLabel: progress.ratioLabel,
    },
    todayKey,
  }
}
