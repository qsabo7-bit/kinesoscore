import { utcWeekStart } from './utcLeaderboardWeek.js'

const SNAPSHOT_PREFIX = 'ks:weekSnapshot:v1:'
const SEEN_PREFIX = 'ks:weekRecapSeen:v1:'
const memory = new Map()

function storageGet(key) {
  if (typeof localStorage !== 'undefined') {
    try {
      return localStorage.getItem(key)
    } catch {
      // fall through
    }
  }
  return memory.has(key) ? memory.get(key) : null
}

function storageSet(key, value) {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(key, value)
      return
    } catch {
      // fall through
    }
  }
  memory.set(key, value)
}

function weekStartIso(now = new Date()) {
  return utcWeekStart(now).toISOString()
}

/**
 * Persist best This Week rank while the week is live (for Monday recap).
 * @param {string} userId
 * @param {{ rank: number, boardKey: string, boardLabel: string } | null} best
 */
export function rememberWeekRankSnapshot(userId, best) {
  if (!userId || !best?.rank || !best?.boardKey) return
  const weekStart = weekStartIso()
  const payload = {
    weekStart,
    rank: best.rank,
    boardKey: best.boardKey,
    boardLabel: best.boardLabel || best.boardKey,
    savedAt: new Date().toISOString(),
  }
  storageSet(`${SNAPSHOT_PREFIX}${userId}`, JSON.stringify(payload))
}

/**
 * Instant Dashboard Today paint: current-week rank from the last successful fetch.
 * @param {string} userId
 * @returns {{ rank: number, boardKey: string, boardLabel: string } | null}
 */
export function readWeekRankSnapshot(userId) {
  if (!userId) return null
  const currentWeekStart = weekStartIso()
  const raw = storageGet(`${SNAPSHOT_PREFIX}${userId}`)
  let snapshot = null
  try {
    snapshot = raw ? JSON.parse(raw) : null
  } catch {
    snapshot = null
  }
  if (
    !snapshot?.weekStart ||
    snapshot.weekStart !== currentWeekStart ||
    !(Number(snapshot.rank) > 0) ||
    !snapshot.boardKey
  ) {
    return null
  }
  return {
    rank: Number(snapshot.rank),
    boardKey: String(snapshot.boardKey),
    boardLabel: String(snapshot.boardLabel || snapshot.boardKey),
  }
}

/**
 * If the UTC week rolled and we have a prior-week snapshot, return recap once.
 * @param {string} userId
 * @returns {{
 *   previousRank: number,
 *   boardLabel: string,
 *   boardKey: string,
 *   previousWeekStart: string,
 *   currentWeekStart: string,
 * } | null}
 */
export function consumeWeekRecap(userId) {
  if (!userId) return null
  const currentWeekStart = weekStartIso()
  const seenKey = `${SEEN_PREFIX}${userId}`
  const seen = storageGet(seenKey)
  if (seen === currentWeekStart) return null

  const raw = storageGet(`${SNAPSHOT_PREFIX}${userId}`)
  let snapshot = null
  try {
    snapshot = raw ? JSON.parse(raw) : null
  } catch {
    snapshot = null
  }

  // First visit this week after a prior week had a rank.
  if (
    snapshot?.weekStart &&
    snapshot.weekStart !== currentWeekStart &&
    Number(snapshot.rank) > 0
  ) {
    storageSet(seenKey, currentWeekStart)
    return {
      previousRank: Number(snapshot.rank),
      boardLabel: String(snapshot.boardLabel || snapshot.boardKey || 'the board'),
      boardKey: String(snapshot.boardKey || ''),
      previousWeekStart: String(snapshot.weekStart),
      currentWeekStart,
    }
  }

  // Mark week seen even without a recap so we don't re-check forever.
  storageSet(seenKey, currentWeekStart)
  return null
}

/** Test helper */
export function __resetWeekRecapMemoryForTests() {
  memory.clear()
}
