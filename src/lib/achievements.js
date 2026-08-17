import { ACHIEVEMENT_CATALOG, achievementById } from '../data/achievementsCatalog.js'

const PREFIX = 'ks:achievements:v1:'

const memoryStore = new Map()

function storageKey(userId) {
  return `${PREFIX}${userId}`
}

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

/**
 * @param {string} userId
 * @returns {Record<string, number>} map of achievementId → unlockedAt ms
 */
export function readAchievements(userId) {
  if (!userId) return {}
  try {
    const raw = storageGet(storageKey(userId))
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

/**
 * @param {string} userId
 * @param {string} achievementId
 * @returns {{ unlocked: boolean, firstTime: boolean, def: object | null }}
 */
export function unlockAchievement(userId, achievementId) {
  const def = achievementById(achievementId)
  if (!userId || !def) {
    return { unlocked: false, firstTime: false, def: null }
  }
  const map = readAchievements(userId)
  if (map[achievementId]) {
    return { unlocked: true, firstTime: false, def }
  }
  map[achievementId] = Date.now()
  storageSet(storageKey(userId), JSON.stringify(map))
  return { unlocked: true, firstTime: true, def }
}

/**
 * Broadcast newly unlocked achievements for the global toast host.
 * @param {Array<{ id: string, title: string, blurb: string }>} items
 */
export function emitAchievements(items = []) {
  if (typeof window === 'undefined' || !items.length) return
  window.dispatchEvent(new CustomEvent('kineso:achievements', { detail: items }))
}

/**
 * Evaluate known signals and unlock any newly earned achievements.
 * @param {string} userId
 * @param {{
 *   hasHabits?: boolean,
 *   hasCheckin?: boolean,
 *   perfectDay?: boolean,
 *   habitStreak?: number,
 *   habitLevel?: number,
 *   consistency30?: number,
 *   hasSave?: boolean,
 *   hasShare?: boolean,
 *   hasLeaderboardName?: boolean,
 *   hasGroupLog?: boolean,
 *   hasWeekRank?: boolean,
 *   dayOneQuest?: boolean,
 * }} signals
 * @returns {Array<{ id: string, title: string, blurb: string }>} newly unlocked
 */
export function evaluateAchievements(userId, signals = {}) {
  if (!userId) return []
  /** @type {string[]} */
  const candidates = []
  if (signals.hasHabits) candidates.push('first_habit')
  if (signals.hasCheckin) candidates.push('first_checkin')
  if (signals.perfectDay) candidates.push('perfect_day')
  if ((signals.habitStreak || 0) >= 7) candidates.push('habit_streak_7')
  if ((signals.habitLevel || 0) >= 5) candidates.push('habit_level_5')
  if ((signals.consistency30 || 0) >= 75) candidates.push('consistency_75')
  if (signals.hasSave) candidates.push('first_save')
  if (signals.hasShare) candidates.push('first_share')
  if (signals.hasLeaderboardName) candidates.push('leaderboard_name')
  if (signals.hasGroupLog) candidates.push('first_group_log')
  if (signals.hasWeekRank) candidates.push('week_rank')
  if (signals.dayOneQuest) candidates.push('day_one_quest')

  const fresh = []
  for (const id of candidates) {
    const result = unlockAchievement(userId, id)
    if (result.firstTime && result.def) {
      fresh.push({
        id: result.def.id,
        title: result.def.title,
        blurb: result.def.blurb,
      })
    }
  }
  if (fresh.length) emitAchievements(fresh)
  return fresh
}

/**
 * @param {string} userId
 */
export function listAchievementsForUser(userId) {
  const unlocked = readAchievements(userId)
  return ACHIEVEMENT_CATALOG.map((def) => ({
    ...def,
    unlocked: Boolean(unlocked[def.id]),
    unlockedAt: unlocked[def.id] || null,
  }))
}
