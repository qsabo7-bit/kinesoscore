/**
 * Optional Leaderboard Name chosen at signup, applied after email confirm / login.
 * Prefers localStorage so a confirm-link new tab can still pick it up.
 */

const PENDING_LB_NAME_KEY = 'ks:pendingLeaderboardName'
const memoryStore = new Map()

function storageGet(key) {
  if (typeof localStorage !== 'undefined') {
    try {
      return localStorage.getItem(key)
    } catch {
      // fall through
    }
  }
  return memoryStore.has(key) ? memoryStore.get(key) : null
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
  memoryStore.set(key, value)
}

function storageRemove(key) {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.removeItem(key)
    } catch {
      // fall through
    }
  }
  memoryStore.delete(key)
}

export function stashPendingLeaderboardName(name) {
  const trimmed = String(name || '').trim()
  if (!trimmed) {
    storageRemove(PENDING_LB_NAME_KEY)
    return
  }
  storageSet(PENDING_LB_NAME_KEY, trimmed)
}

/** Peek without removing (so failed applies can retry). */
export function peekPendingLeaderboardName() {
  return storageGet(PENDING_LB_NAME_KEY)
}

export function clearPendingLeaderboardName() {
  storageRemove(PENDING_LB_NAME_KEY)
}

/**
 * Apply pending name once the user is signed in. Clears stash only on success
 * or when no name is pending. Returns true if a name was saved.
 *
 * @param {string} userId
 * @param {(userId: string, name: string) => Promise<unknown>} saveName
 */
export async function applyPendingLeaderboardName(userId, saveName) {
  const pending = peekPendingLeaderboardName()
  if (!userId || !pending) return false
  await saveName(userId, pending)
  clearPendingLeaderboardName()
  return true
}
