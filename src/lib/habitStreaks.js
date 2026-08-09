import {
  isFutureLocalDate,
  localDateKey,
  shiftLocalDateKey,
} from './habitDates.js'

/**
 * @typedef {{ id: string, is_active?: boolean }} HabitLike
 * @typedef {{ habit_id: string, checkin_date: string, completed: boolean }} CheckinLike
 */

/**
 * Whether a local calendar day counts toward a streak.
 * A day counts only when every currently-active habit is completed that day.
 * No active habits → day does not count (streak foundation stays 0).
 *
 * @param {string} dateKey YYYY-MM-DD
 * @param {HabitLike[]} habits
 * @param {CheckinLike[]} checkins
 * @param {string} [todayKey]
 */
export function isHabitDayComplete(
  dateKey,
  habits,
  checkins,
  todayKey = localDateKey(),
) {
  if (!dateKey || isFutureLocalDate(dateKey, todayKey)) return false

  const active = (habits || []).filter((h) => h?.is_active !== false && h?.id)
  if (!active.length) return false

  const byHabit = new Map()
  for (const row of checkins || []) {
    if (String(row.checkin_date) !== String(dateKey)) continue
    byHabit.set(row.habit_id, Boolean(row.completed))
  }

  return active.every((habit) => byHabit.get(habit.id) === true)
}

/**
 * Count completed active habits for a day.
 * @returns {{ completed: number, total: number, ratioLabel: string, isComplete: boolean }}
 */
export function habitDayProgress(
  dateKey,
  habits,
  checkins,
  todayKey = localDateKey(),
) {
  const active = (habits || []).filter((h) => h?.is_active !== false && h?.id)
  const total = active.length
  if (!total || isFutureLocalDate(dateKey, todayKey)) {
    return {
      completed: 0,
      total,
      ratioLabel: `${0}/${total}`,
      isComplete: false,
    }
  }

  const byHabit = new Map()
  for (const row of checkins || []) {
    if (String(row.checkin_date) !== String(dateKey)) continue
    byHabit.set(row.habit_id, Boolean(row.completed))
  }

  const completed = active.filter((h) => byHabit.get(h.id) === true).length
  return {
    completed,
    total,
    ratioLabel: `${completed}/${total}`,
    isComplete: completed === total,
  }
}

/**
 * Current streak ending on todayKey: consecutive local days (today backward)
 * where every active habit was completed. Gaps or partial days break the streak.
 *
 * @param {HabitLike[]} habits
 * @param {CheckinLike[]} checkins
 * @param {{ todayKey?: string, maxLookbackDays?: number }} [options]
 * @returns {number}
 */
export function computeHabitStreak(habits, checkins, options = {}) {
  const todayKey = options.todayKey || localDateKey()
  const maxLookbackDays = options.maxLookbackDays ?? 400
  const active = (habits || []).filter((h) => h?.is_active !== false && h?.id)
  if (!active.length) return 0

  let streak = 0
  let cursor = todayKey

  for (let i = 0; i < maxLookbackDays; i += 1) {
    if (!isHabitDayComplete(cursor, active, checkins, todayKey)) break
    streak += 1
    cursor = shiftLocalDateKey(cursor, -1)
  }

  return streak
}
