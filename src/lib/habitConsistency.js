import { isHabitDayComplete } from './habitStreaks.js'
import { localDateKey, shiftLocalDateKey } from './habitDates.js'

/**
 * Consistency = share of recent local days where every active habit was completed.
 * Days with zero active habits do not count toward the denominator.
 *
 * @param {Array<{ id: string, is_active?: boolean }>} habits
 * @param {Array<{ habit_id: string, checkin_date: string, completed: boolean }>} checkins
 * @param {{ windowDays?: number, todayKey?: string }} [opts]
 * @returns {{
 *   windowDays: number,
 *   scoredDays: number,
 *   completeDays: number,
 *   percent: number,
 *   label: string,
 * }}
 */
export function computeHabitConsistency(habits, checkins, opts = {}) {
  const windowDays = Math.max(1, Math.floor(Number(opts.windowDays) || 30))
  const todayKey = opts.todayKey || localDateKey()
  const active = (habits || []).filter((h) => h?.is_active !== false && h?.id)

  if (!active.length) {
    return {
      windowDays,
      scoredDays: 0,
      completeDays: 0,
      percent: 0,
      label: '—',
    }
  }

  let scoredDays = 0
  let completeDays = 0

  for (let i = 0; i < windowDays; i += 1) {
    const dateKey = shiftLocalDateKey(todayKey, -i)
    // Only count days on/after first habit creation if we had that — without it,
    // count every day in the window (new users start low, which is fine).
    scoredDays += 1
    if (isHabitDayComplete(dateKey, active, checkins, todayKey)) {
      completeDays += 1
    }
  }

  const percent =
    scoredDays > 0 ? Math.round((completeDays / scoredDays) * 100) : 0

  return {
    windowDays,
    scoredDays,
    completeDays,
    percent,
    label: `${percent}%`,
  }
}

/**
 * Short title from consistency percent (private display / soft flair).
 * @param {number} percent
 */
export function consistencyTitle(percent) {
  const n = Math.max(0, Math.floor(Number(percent) || 0))
  if (n >= 90) return 'Locked In'
  if (n >= 75) return 'Steady'
  if (n >= 50) return 'Building'
  if (n >= 25) return 'Starting'
  return 'Warming Up'
}
