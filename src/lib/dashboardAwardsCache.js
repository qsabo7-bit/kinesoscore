/**
 * Session cache for dashboard award badges so revisits don't wait on the
 * fitness_score_snapshot round-trip before crests appear.
 */

const STORAGE_PREFIX = 'ks:dashAwards:v1:'
let memory = { userId: null, state: null }

function storageGet(key) {
  if (typeof sessionStorage !== 'undefined') {
    try {
      return sessionStorage.getItem(key)
    } catch {
      // fall through
    }
  }
  return null
}

function storageSet(key, value) {
  if (typeof sessionStorage !== 'undefined') {
    try {
      sessionStorage.setItem(key, value)
    } catch {
      // ignore quota / private mode
    }
  }
}

function storageRemove(key) {
  if (typeof sessionStorage !== 'undefined') {
    try {
      sessionStorage.removeItem(key)
    } catch {
      // ignore
    }
  }
}

/**
 * @param {string | null | undefined} userId
 * @returns {{
 *   fitnessScore: number,
 *   runningScore: number,
 *   strengthScore: number,
 *   awards: object,
 * } | null}
 */
export function readCachedDashboardAwards(userId) {
  if (!userId) return null
  if (memory.userId === userId && memory.state) return memory.state

  const raw = storageGet(`${STORAGE_PREFIX}${userId}`)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    if (!parsed?.awards) return null
    memory = { userId, state: parsed }
    return parsed
  } catch {
    return null
  }
}

/**
 * @param {string} userId
 * @param {object | null} state
 */
export function writeCachedDashboardAwards(userId, state) {
  if (!userId) return
  memory = { userId, state: state || null }
  const key = `${STORAGE_PREFIX}${userId}`
  if (!state) {
    storageRemove(key)
    return
  }
  storageSet(key, JSON.stringify(state))
}

export function clearCachedDashboardAwards() {
  if (memory.userId) {
    storageRemove(`${STORAGE_PREFIX}${memory.userId}`)
  }
  memory = { userId: null, state: null }
}
