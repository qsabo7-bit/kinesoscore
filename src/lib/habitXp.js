import {
  awardHabitXp,
  habitBaseXp,
  habitXpMultiplier,
} from '../data/habitCatalog.js'
import { localDateKey, shiftLocalDateKey } from './habitDates.js'

/**
 * Count consecutive completed days for one habit ending on `endDateKey` (inclusive).
 * @param {string} habitId
 * @param {Array<{ habit_id: string, checkin_date: string, completed: boolean }>} checkins
 * @param {string} endDateKey
 * @returns {number}
 */
export function perHabitStreakEndingOn(habitId, checkins, endDateKey) {
  if (!habitId || !endDateKey) return 0
  const completed = new Set()
  for (const row of checkins || []) {
    if (row.habit_id !== habitId) continue
    if (!row.completed) continue
    completed.add(String(row.checkin_date))
  }
  let streak = 0
  let cursor = String(endDateKey)
  while (completed.has(cursor)) {
    streak += 1
    cursor = shiftLocalDateKey(cursor, -1)
  }
  return streak
}

/**
 * XP that would be awarded for completing a habit on `dateKey`
 * (uses prior consecutive days + today as streak length).
 * @param {{ habit_key?: string, key?: string, id?: string }} habit
 * @param {Array<{ habit_id: string, checkin_date: string, completed: boolean }>} checkins
 * @param {string} [dateKey]
 */
export function previewHabitXpForDate(habit, checkins, dateKey = localDateKey()) {
  const habitId = habit?.id
  const prior = habitId
    ? perHabitStreakEndingOn(habitId, checkins, shiftLocalDateKey(dateKey, -1))
    : 0
  const streakDays = prior + 1
  const base = habitBaseXp(habit)
  return {
    baseXp: base,
    streakDays,
    multiplier: habitXpMultiplier(streakDays),
    xp: awardHabitXp(base, streakDays),
  }
}

/**
 * Lifetime XP from awarded check-in rows (server `xp_awarded` preferred).
 * @param {Array<{ completed?: boolean, xp_awarded?: number }>} checkins
 */
export function sumLifetimeHabitXp(checkins) {
  let total = 0
  for (const row of checkins || []) {
    if (row.completed === false) continue
    const xp = Number(row.xp_awarded)
    if (Number.isFinite(xp) && xp > 0) total += Math.floor(xp)
  }
  return total
}

/**
 * Sum XP earned per local calendar day.
 * @param {Array<{ checkin_date: string, completed?: boolean, xp_awarded?: number }>} checkins
 * @returns {Map<string, number>}
 */
export function habitXpByDay(checkins) {
  const map = new Map()
  for (const row of checkins || []) {
    if (row.completed === false) continue
    const xp = Number(row.xp_awarded)
    if (!Number.isFinite(xp) || xp <= 0) continue
    const key = String(row.checkin_date)
    map.set(key, (map.get(key) || 0) + Math.floor(xp))
  }
  return map
}

/**
 * ProgressGraph-compatible daily XP series for a graph range.
 * @param {Array<{ checkin_date: string, completed?: boolean, xp_awarded?: number }>} checkins
 * @param {'1w' | '1m' | '3m' | '6m' | '1y' | 'all'} rangeId
 * @param {string} [todayKey]
 */
export function habitXpDailyRecords(
  checkins,
  rangeId = '1m',
  todayKey = localDateKey(),
) {
  const byDay = habitXpByDay(checkins)
  const records = [...byDay.entries()]
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([dateKey, xp]) => ({
      id: `xp-${dateKey}`,
      created_at: `${dateKey}T12:00:00`,
      result_value: xp,
      result_unit: 'xp',
    }))

  if (rangeId === 'all') return records

  // Include zero-filled days in the window so the chart spans the range.
  const windowStart = rangeWindowStart(todayKey, rangeId)
  if (!windowStart) return records

  const filled = []
  let cursor = windowStart
  while (cursor <= todayKey) {
    filled.push({
      id: `xp-${cursor}`,
      created_at: `${cursor}T12:00:00`,
      result_value: byDay.get(cursor) || 0,
      result_unit: 'xp',
    })
    cursor = shiftLocalDateKey(cursor, 1)
  }
  return filled
}

/**
 * @param {string} todayKey
 * @param {string} rangeId
 */
function rangeWindowStart(todayKey, rangeId) {
  switch (rangeId) {
    case '1w':
      return shiftLocalDateKey(todayKey, -6)
    case '1m':
      return shiftLocalDateKey(todayKey, -29)
    case '3m':
      return shiftLocalDateKey(todayKey, -89)
    case '6m':
      return shiftLocalDateKey(todayKey, -179)
    case '1y':
      return shiftLocalDateKey(todayKey, -364)
    default:
      return null
  }
}
