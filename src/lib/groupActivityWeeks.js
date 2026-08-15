/**
 * Local Monday–Sunday week helpers for Groups activity (activity_date is a DATE).
 */

import { localDateKey, shiftLocalDateKey } from './habitDates.js'

const GROUP_SECTIONS = new Set([
  'overview',
  'activity',
  'leaderboard',
  'people',
  'settings',
])

/**
 * Monday YYYY-MM-DD for the local week containing `dateKey` (or today).
 * @param {string} [dateKey]
 * @returns {string}
 */
export function localWeekStartKey(dateKey = localDateKey()) {
  const [y, m, d] = String(dateKey).split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  const day = dt.getDay() // 0 Sun … 6 Sat
  const daysFromMonday = (day + 6) % 7
  dt.setDate(dt.getDate() - daysFromMonday)
  return localDateKey(dt)
}

/**
 * Sunday YYYY-MM-DD for the week starting on Monday `weekStartKey`.
 * @param {string} weekStartKey
 * @returns {string}
 */
export function localWeekEndKey(weekStartKey) {
  return shiftLocalDateKey(weekStartKey, 6)
}

/**
 * @param {string} weekStartKey Monday YYYY-MM-DD
 * @param {number} deltaWeeks
 * @returns {string}
 */
export function shiftLocalWeekStart(weekStartKey, deltaWeeks) {
  return shiftLocalDateKey(weekStartKey, deltaWeeks * 7)
}

/**
 * "Week of Aug 10–16" (same year) or "Week of Dec 29–Jan 4" across years.
 * @param {string} weekStartKey
 * @returns {string}
 */
export function formatLocalWeekRangeLabel(weekStartKey) {
  const endKey = localWeekEndKey(weekStartKey)
  const [ys, ms, ds] = String(weekStartKey).split('-').map(Number)
  const [ye, me, de] = String(endKey).split('-').map(Number)
  const start = new Date(ys, ms - 1, ds)
  const end = new Date(ye, me - 1, de)

  const startMonth = start.toLocaleDateString(undefined, { month: 'short' })
  const endMonth = end.toLocaleDateString(undefined, { month: 'short' })
  const startDay = start.getDate()
  const endDay = end.getDate()

  if (ys !== ye) {
    return `Week of ${startMonth} ${startDay}, ${ys}–${endMonth} ${endDay}, ${ye}`
  }
  if (ms !== me) {
    return `Week of ${startMonth} ${startDay}–${endMonth} ${endDay}`
  }
  return `Week of ${startMonth} ${startDay}–${endDay}`
}

/**
 * Format a summed activity amount for display.
 * @param {number} amount
 * @param {string} unit
 * @param {{ withTotalSuffix?: boolean }} [opts]
 */
export function formatActivityAmount(amount, unit, opts = {}) {
  const n = Number(amount) || 0
  const u = String(unit || '').toLowerCase()
  const isMiles = u === 'miles' || u === 'mile' || u === 'mi'
  const isDecimal = isMiles || (!Number.isInteger(n) && n % 1 !== 0)
  const formatted = isDecimal
    ? n.toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: n % 1 === 0 ? 0 : 1,
      })
    : Math.round(n).toLocaleString()

  if (isMiles) return `${formatted} miles`
  if (u === 'seconds' || u === 'sec' || u === 'secs') {
    return opts.withTotalSuffix ? `${formatted} sec total` : `${formatted} sec`
  }
  if (u === 'reps' || u === 'rep' || !unit) {
    return opts.withTotalSuffix ? `${formatted} total` : formatted
  }
  return opts.withTotalSuffix
    ? `${formatted} ${unit} total`
    : `${formatted} ${unit}`
}

/**
 * @param {string} pathname
 * @returns {{ groupId: string | null, section: string | null }}
 */
export function parseGroupsRoute(pathname) {
  const normalized =
    !pathname || pathname === '/'
      ? '/'
      : pathname.replace(/\/+$/, '') || '/'

  if (normalized === '/groups') {
    return { groupId: null, section: null }
  }

  const withSection = normalized.match(/^\/groups\/([^/]+)\/([^/]+)$/)
  if (withSection) {
    const section = decodeURIComponent(withSection[2]).toLowerCase()
    return {
      groupId: decodeURIComponent(withSection[1]),
      section: GROUP_SECTIONS.has(section) ? section : 'overview',
    }
  }

  const withId = normalized.match(/^\/groups\/([^/]+)$/)
  if (withId) {
    return {
      groupId: decodeURIComponent(withId[1]),
      section: null,
    }
  }

  return { groupId: null, section: null }
}

/**
 * @param {string} pathname
 * @returns {string | null}
 */
export function parseGroupIdFromPath(pathname) {
  return parseGroupsRoute(pathname).groupId
}

/**
 * Relative time for activity feeds ("2h ago").
 * @param {string | Date | null | undefined} iso
 * @returns {string}
 */
export function formatRelativeActivityTime(iso) {
  if (!iso) return ''
  const t = new Date(iso).getTime()
  if (!Number.isFinite(t)) return ''
  const diff = Date.now() - t
  if (diff < 45_000) return 'just now'
  if (diff < 3_600_000) return `${Math.max(1, Math.floor(diff / 60_000))}m ago`
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`
  if (diff < 604_800_000) return `${Math.floor(diff / 86_400_000)}d ago`
  try {
    return new Date(t).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}

/**
 * Consecutive local days (ending today) where the user logged at least once.
 * @param {Array<{ user_id: string, activity_date: string }>} logs
 * @param {string} userId
 * @returns {number}
 */
export function computeGroupLogStreak(logs, userId) {
  if (!userId) return 0
  const days = new Set()
  for (const row of logs || []) {
    if (row.user_id === userId && row.activity_date) {
      days.add(String(row.activity_date))
    }
  }
  if (!days.size) return 0
  let streak = 0
  let cursor = localDateKey()
  while (days.has(cursor)) {
    streak += 1
    cursor = shiftLocalDateKey(cursor, -1)
  }
  return streak
}

/**
 * Unique members who logged at least once in the provided logs.
 * @param {Array<{ user_id: string }> | null | undefined} logs
 * @returns {number}
 */
export function countUniqueLoggers(logs) {
  const ids = new Set()
  for (const row of logs || []) {
    if (row?.user_id) ids.add(row.user_id)
  }
  return ids.size
}

/**
 * @param {Array<{ activity_type_id: string, amount: number|string, user_id: string }>} logs
 * @param {string} [userId]
 * @returns {{ groupTotals: Map<string, number>, userTotals: Map<string, number> }}
 */
export function aggregateActivityTotals(logs, userId = '') {
  const groupTotals = new Map()
  const userTotals = new Map()
  for (const row of logs || []) {
    const typeId = row.activity_type_id
    const amount = Number(row.amount) || 0
    groupTotals.set(typeId, (groupTotals.get(typeId) || 0) + amount)
    if (userId && row.user_id === userId) {
      userTotals.set(typeId, (userTotals.get(typeId) || 0) + amount)
    }
  }
  return { groupTotals, userTotals }
}

/**
 * @param {string} groupId
 * @param {string} [section]
 */
export function pathForGroup(groupId, section = null) {
  if (!groupId) return '/groups'
  const sec = section || 'overview'
  if (sec === 'overview') return `/groups/${groupId}`
  if (GROUP_SECTIONS.has(sec)) return `/groups/${groupId}/${sec}`
  return `/groups/${groupId}`
}

/**
 * @param {{ leaderboard_name?: string | null, display_name?: string | null }} member
 * @returns {string} e.g. "@alex" or a fallback label
 */
export function formatMemberHandle(member) {
  const name = String(member?.leaderboard_name || '').trim()
  if (name) return `@${name}`
  const display = String(member?.display_name || '').trim()
  if (display) return display
  return 'Member'
}

/**
 * Leaderboard / feed amount with unit label (reps, miles, minutes).
 * Seconds are shown as minutes for plank-style activities.
 * @param {number} amount
 * @param {string} unit
 */
export function formatLeaderboardAmount(amount, unit) {
  const u = String(unit || '').toLowerCase()
  let n = Number(amount) || 0
  let label = unit || ''

  if (u === 'seconds' || u === 'sec' || u === 'secs') {
    n = n / 60
    label = 'minutes'
  } else if (u === 'minutes' || u === 'minute' || u === 'min' || u === 'mins') {
    label = 'minutes'
  } else if (u === 'miles' || u === 'mile' || u === 'mi') {
    label = 'miles'
  } else if (u === 'reps' || u === 'rep') {
    label = 'reps'
  }

  const isDecimal =
    label === 'miles' ||
    label === 'minutes' ||
    (!Number.isInteger(n) && n % 1 !== 0)
  const formatted = isDecimal
    ? n.toLocaleString(undefined, {
        maximumFractionDigits: 2,
        minimumFractionDigits: n % 1 === 0 ? 0 : 1,
      })
    : Math.round(n).toLocaleString()

  return `${formatted} ${label}`
}

/**
 * Per-user totals for one activity type in a week, ranked dense.
 *
 * @param {Array<{ user_id: string, activity_type_id: string, amount: number|string }>} logs
 * @param {string} activityTypeId
 * @param {Map<string, { user_id: string, leaderboard_name?: string|null, display_name?: string|null }>} membersById
 * @param {{ higherIsBetter?: boolean }} [opts]
 * @returns {Array<{ user_id: string, total: number, rank: number, handle: string, member: object }>}
 */
export function buildActivityLeaderboard(
  logs,
  activityTypeId,
  membersById,
  opts = {},
) {
  const higherIsBetter = opts.higherIsBetter !== false
  const totals = new Map()
  for (const row of logs || []) {
    if (row.activity_type_id !== activityTypeId) continue
    const amount = Number(row.amount) || 0
    if (amount <= 0) continue
    totals.set(row.user_id, (totals.get(row.user_id) || 0) + amount)
  }

  const rows = [...totals.entries()].map(([userId, total]) => {
    const member = membersById?.get(userId) || {
      user_id: userId,
      leaderboard_name: null,
      display_name: null,
    }
    return {
      user_id: userId,
      total,
      member,
      handle: formatMemberHandle(member),
    }
  })

  rows.sort((a, b) => {
    if (a.total !== b.total) {
      return higherIsBetter ? b.total - a.total : a.total - b.total
    }
    return a.handle.localeCompare(b.handle)
  })

  let rank = 0
  let prev = null
  return rows.map((row) => {
    if (prev === null || row.total !== prev) {
      rank += 1
      prev = row.total
    }
    return { ...row, rank }
  })
}

/**
 * Top entry for an activity type, or null.
 * @param {ReturnType<typeof buildActivityLeaderboard>} board
 */
export function topLeaderboardEntry(board) {
  if (!board?.length) return null
  return board[0]
}

/**
 * Feed line for a log row.
 * @param {{ amount: number|string }} log
 * @param {{ name: string, unit: string } | null | undefined} type
 * @param {{ leaderboard_name?: string|null, display_name?: string|null }} member
 */
export function formatActivityFeedLine(log, type, member) {
  const handle = formatMemberHandle(member)
  const typeName = String(type?.name || 'activity').toLowerCase()
  const unit = String(type?.unit || '').toLowerCase()
  const amountLabel = formatLeaderboardAmount(log.amount, type?.unit || 'reps')

  if (
    unit === 'miles' ||
    unit === 'mile' ||
    unit === 'mi' ||
    unit === 'seconds' ||
    unit === 'sec' ||
    unit === 'secs' ||
    unit === 'minutes' ||
    unit === 'minute' ||
    unit === 'min' ||
    unit === 'mins'
  ) {
    return `${handle} logged ${amountLabel}`
  }

  // reps-style: "@alex logged 50 push-ups"
  const numeric = amountLabel.replace(/\s+reps$/i, '')
  return `${handle} logged ${numeric} ${typeName}`
}
