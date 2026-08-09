/**
 * Local calendar-date helpers for Habit Tracker.
 *
 * Stage 10 timezone model (intentional — do not merge without an approved design):
 *   * Private Habit Tracker / client streak: browser **local** calendar day
 *     (`getFullYear` / `getMonth` / `getDate`). A habit day follows the user's
 *     intended local day, not UTC midnight.
 *   * Server-published streak (`compute_user_habit_streak` / share as-of):
 *     **UTC** calendar date. `set_habit_streak_share` accepts `p_as_of` only in
 *     UTC today ± 1 day so a local "today" near midnight usually still validates.
 *   * Performance "This Week" leaderboards: **UTC Monday** week start
 *     (`date_trunc('week', timezone('UTC', now()))`).
 *
 * Near local midnight far from UTC, private streak display and the published
 * streak can briefly disagree until the next sync. That is known Stage 10
 * behavior, not a silent algorithm change.
 */

/**
 * @param {Date} [date]
 * @returns {string} YYYY-MM-DD in local time
 */
export function localDateKey(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * @param {string} dateKey YYYY-MM-DD
 * @param {number} deltaDays
 * @returns {string}
 */
export function shiftLocalDateKey(dateKey, deltaDays) {
  const [y, m, d] = String(dateKey).split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  dt.setDate(dt.getDate() + deltaDays)
  return localDateKey(dt)
}

/**
 * @param {string} dateKey YYYY-MM-DD
 * @param {Intl.DateTimeFormatOptions} [options]
 */
export function formatLocalDateLabel(
  dateKey,
  options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
) {
  const [y, m, d] = String(dateKey).split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(undefined, options)
}

/** @param {string} dateKey @param {string} todayKey */
export function isFutureLocalDate(dateKey, todayKey = localDateKey()) {
  return String(dateKey) > String(todayKey)
}

/**
 * UTC calendar YYYY-MM-DD for the given instant (server streak / share window).
 * @param {Date} [date]
 * @returns {string}
 */
export function utcDateKey(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date)
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/**
 * Whether a local as-of date is within the server share window (UTC today ± 1).
 * Mirrors Stage 8 SQL validation in set_habit_streak_share / before_write.
 *
 * @param {string} asOfKey YYYY-MM-DD (usually local today from Habit Tracker)
 * @param {string} utcTodayKey YYYY-MM-DD UTC
 * @returns {boolean}
 */
export function isWithinUtcShareAsOfWindow(asOfKey, utcTodayKey) {
  const asOf = String(asOfKey || '')
  const utc = String(utcTodayKey || '')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(asOf) || !/^\d{4}-\d{2}-\d{2}$/.test(utc)) {
    return false
  }
  const asOfMs = Date.UTC(
    Number(asOf.slice(0, 4)),
    Number(asOf.slice(5, 7)) - 1,
    Number(asOf.slice(8, 10)),
  )
  const utcMs = Date.UTC(
    Number(utc.slice(0, 4)),
    Number(utc.slice(5, 7)) - 1,
    Number(utc.slice(8, 10)),
  )
  const dayMs = 24 * 60 * 60 * 1000
  const deltaDays = (asOfMs - utcMs) / dayMs
  return deltaDays >= -1 && deltaDays <= 1
}
