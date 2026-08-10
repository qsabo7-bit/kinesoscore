/**
 * UTC calendar week helpers for performance "This Week" leaderboards.
 * Week = Monday 00:00 UTC → next Monday 00:00 UTC (matches Postgres date_trunc('week')).
 */

const DAY_MS = 24 * 60 * 60 * 1000
const HOUR_MS = 60 * 60 * 1000
const MINUTE_MS = 60 * 1000

/**
 * Monday 00:00:00.000 UTC containing `date` (ISO week start).
 * @param {Date} [date]
 * @returns {Date}
 */
export function utcWeekStart(date = new Date()) {
  const d = date instanceof Date ? date : new Date(date)
  const day = d.getUTCDay() // 0 Sun … 6 Sat
  const daysFromMonday = (day + 6) % 7
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - daysFromMonday),
  )
}

/**
 * Next Monday 00:00:00.000 UTC after the current week start (exclusive end).
 * @param {Date} [date]
 * @returns {Date}
 */
export function utcWeekEnd(date = new Date()) {
  return new Date(utcWeekStart(date).getTime() + 7 * DAY_MS)
}

/**
 * @param {Date} [now]
 * @param {Date} [end]
 * @returns {{ totalMs: number, days: number, hours: number, minutes: number }}
 */
export function utcWeekRemainingParts(now = new Date(), end = utcWeekEnd(now)) {
  const totalMs = Math.max(0, end.getTime() - now.getTime())
  const days = Math.floor(totalMs / DAY_MS)
  const hours = Math.floor((totalMs % DAY_MS) / HOUR_MS)
  const minutes = Math.floor((totalMs % HOUR_MS) / MINUTE_MS)
  return { totalMs, days, hours, minutes }
}

/**
 * Compact countdown label for UI ("2d 5h", "3h 12m", "under 1m").
 * @param {Date} [now]
 * @param {Date} [end]
 * @returns {string}
 */
export function formatUtcWeekCountdown(now = new Date(), end = utcWeekEnd(now)) {
  const { totalMs, days, hours, minutes } = utcWeekRemainingParts(now, end)
  if (totalMs <= 0) return 'resetting…'
  if (days > 0) return `${days}d ${hours}h`
  if (hours > 0) return `${hours}h ${minutes}m`
  if (minutes > 0) return `${minutes}m`
  return 'under 1m'
}

/** True when less than 24 hours remain in the UTC week. */
export function isUtcWeekEndingSoon(now = new Date(), end = utcWeekEnd(now)) {
  return utcWeekRemainingParts(now, end).totalMs < DAY_MS
}

/**
 * Find dense rank for a Leaderboard Name in public board rows.
 * @param {Array<{ leaderboard_name?: string, rank?: number }>} rows
 * @param {string} leaderboardName
 * @returns {number | null}
 */
export function findLeaderboardRankByName(rows, leaderboardName) {
  const needle = String(leaderboardName || '')
    .trim()
    .toLowerCase()
  if (!needle || !Array.isArray(rows)) return null
  const match = rows.find(
    (row) => String(row?.leaderboard_name || '').trim().toLowerCase() === needle,
  )
  if (!match) return null
  const rank = Number(match.rank)
  return Number.isFinite(rank) && rank > 0 ? rank : null
}
