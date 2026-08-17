import { BRAND } from '../data/brand.js'

const STORAGE_PREFIX = 'ks:onboarding:v1:'
const SHARE_HINT_KEY = 'ks:onboardingShareHint'

/** In-memory fallback when localStorage is unavailable (tests / private mode). */
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

/**
 * First-session tracks — maps to calculator / Habits tabs.
 * Keep copy short; one job per choice.
 */
export const ONBOARDING_TRACKS = [
  {
    id: 'score',
    label: BRAND.scoreName.replace('™', ''),
    blurb: 'Your full fitness score',
    tab: 'scoring',
  },
  {
    id: 'strength',
    label: 'Strength',
    blurb: 'Bench, squat, deadlift',
    tab: 'strength',
  },
  {
    id: 'running',
    label: 'Running',
    blurb: 'Times from mile to marathon',
    tab: 'running',
  },
  {
    id: 'military',
    label: 'Military',
    blurb: 'AFT, PFRA, PFT, PRT',
    tab: 'army-aft',
  },
  {
    id: 'habits',
    label: 'Habits',
    blurb: 'Picture cards + habit XP',
    tab: 'habits',
  },
]

function storageKey(userId) {
  return `${STORAGE_PREFIX}${userId}`
}

/**
 * @param {string} userId
 * @returns {{ completed?: boolean, trackId?: string, skipped?: boolean } | null}
 */
export function readOnboardingState(userId) {
  if (!userId) return null
  try {
    const raw = storageGet(storageKey(userId))
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

/**
 * @param {string} userId
 * @param {{ completed?: boolean, trackId?: string, skipped?: boolean }} patch
 */
export function writeOnboardingState(userId, patch) {
  if (!userId) return
  try {
    const prev = readOnboardingState(userId) || {}
    storageSet(
      storageKey(userId),
      JSON.stringify({ ...prev, ...patch, updatedAt: Date.now() }),
    )
  } catch {
    // Ignore quota / private mode.
  }
}

export function isOnboardingFinished(userId) {
  const state = readOnboardingState(userId)
  return Boolean(state?.completed || state?.skipped)
}

export function markOnboardingCompleted(userId, trackId) {
  writeOnboardingState(userId, {
    completed: true,
    skipped: false,
    ...(trackId ? { trackId } : {}),
  })
}

export function markOnboardingSkipped(userId) {
  writeOnboardingState(userId, { skipped: true, completed: false })
}

/**
 * Existing members with a name + saves should not see the wizard again.
 * QA: append `?onboarding=1` on Dashboard to force the wizard once.
 * @param {string} userId
 * @param {{ hasLeaderboardName: boolean, hasPerformanceData: boolean }} flags
 */
export function shouldShowOnboarding(userId, flags) {
  if (!userId) return false

  if (typeof window !== 'undefined') {
    try {
      if (new URLSearchParams(window.location.search).get('onboarding') === '1') {
        return true
      }
    } catch {
      // ignore
    }
  }

  if (isOnboardingFinished(userId)) return false
  if (flags.hasLeaderboardName && flags.hasPerformanceData) {
    markOnboardingCompleted(userId)
    return false
  }
  return true
}

function sessionGet(key) {
  if (typeof sessionStorage !== 'undefined') {
    try {
      return sessionStorage.getItem(key)
    } catch {
      // fall through
    }
  }
  return memoryStore.has(key) ? memoryStore.get(key) : null
}

function sessionSet(key, value) {
  if (typeof sessionStorage !== 'undefined') {
    try {
      sessionStorage.setItem(key, value)
      return
    } catch {
      // fall through
    }
  }
  memoryStore.set(key, value)
}

function sessionRemove(key) {
  if (typeof sessionStorage !== 'undefined') {
    try {
      sessionStorage.removeItem(key)
    } catch {
      // fall through
    }
  }
  memoryStore.delete(key)
}

export function markOnboardingShareHint() {
  sessionSet(SHARE_HINT_KEY, '1')
}

/** @returns {boolean} */
export function consumeOnboardingShareHint() {
  const hit = sessionGet(SHARE_HINT_KEY) === '1'
  sessionRemove(SHARE_HINT_KEY)
  return hit
}

export function trackById(trackId) {
  return ONBOARDING_TRACKS.find((t) => t.id === trackId) || null
}
