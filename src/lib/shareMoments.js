/**
 * Global share-moment bus + dismiss rules + light analytics.
 * Internal virality: requestShareMoment() opens ShareMomentHost studio.
 */

export const SHARE_MOMENT_EVENT = 'ks:share-moment'

/** @typedef {'score_saved' | 'award_unlock' | 'this_week_rank' | 'week_recap' | 'onboarding_complete' | 'manual'} ShareMomentType */

export const SHARE_MOMENT_TYPES = Object.freeze([
  'score_saved',
  'award_unlock',
  'this_week_rank',
  'week_recap',
  'onboarding_complete',
  'manual',
])

const DISMISS_PREFIX = 'ks:shareDismiss:v1:'
const SESSION_PROMPT_KEY = 'ks:sharePromptSession'

const memoryDismiss = new Map()

function storageGet(key) {
  if (typeof sessionStorage !== 'undefined') {
    try {
      return sessionStorage.getItem(key)
    } catch {
      // fall through
    }
  }
  return memoryDismiss.has(key) ? memoryDismiss.get(key) : null
}

function storageSet(key, value) {
  if (typeof sessionStorage !== 'undefined') {
    try {
      sessionStorage.setItem(key, value)
      return
    } catch {
      // fall through
    }
  }
  memoryDismiss.set(key, value)
}

/**
 * @param {ShareMomentType | string} type
 */
export function isShareMomentDismissed(type) {
  return storageGet(`${DISMISS_PREFIX}${type}`) === '1'
}

/**
 * @param {ShareMomentType | string} type
 */
export function dismissShareMoment(type) {
  storageSet(`${DISMISS_PREFIX}${type}`, '1')
  trackShareEvent('share_moment_dismiss', { type })
}

export function clearShareMomentDismissals() {
  for (const type of SHARE_MOMENT_TYPES) {
    if (typeof sessionStorage !== 'undefined') {
      try {
        sessionStorage.removeItem(`${DISMISS_PREFIX}${type}`)
      } catch {
        // ignore
      }
    }
    memoryDismiss.delete(`${DISMISS_PREFIX}${type}`)
  }
  if (typeof sessionStorage !== 'undefined') {
    try {
      sessionStorage.removeItem(SESSION_PROMPT_KEY)
    } catch {
      // ignore
    }
  }
  memoryDismiss.delete(SESSION_PROMPT_KEY)
}

/** At most one interruptive auto-prompt per tab session. */
export function hasUsedSessionSharePrompt() {
  return storageGet(SESSION_PROMPT_KEY) === '1'
}

export function markSessionSharePromptUsed() {
  storageSet(SESSION_PROMPT_KEY, '1')
}

/**
 * @param {ShareMomentType | string} type
 * @param {{ force?: boolean }} [opts]
 */
export function shouldAutoPromptShareMoment(type, opts = {}) {
  if (opts.force) return true
  if (hasUsedSessionSharePrompt()) return false
  if (isShareMomentDismissed(type)) return false
  return true
}

/**
 * @param {string} name
 * @param {Record<string, unknown>} [payload]
 */
export function trackShareEvent(name, payload = {}) {
  try {
    if (typeof window !== 'undefined' && window.va?.track) {
      window.va.track(name, payload)
    }
  } catch {
    // analytics must never break share UX
  }
  if (typeof console !== 'undefined' && console.debug) {
    console.debug('[share]', name, payload)
  }
}

/**
 * Open the global share studio (handled by ShareMomentHost).
 *
 * @param {{
 *   type?: ShareMomentType | string,
 *   title?: string,
 *   primary: string,
 *   secondary?: string,
 *   filename?: string,
 *   athleteName?: string | null,
 *   awards?: object | null,
 *   fitnessScore?: number | null,
 *   strengthScore?: number | null,
 *   runningScore?: number | null,
 *   autoOpen?: boolean,
 *   respectDismiss?: boolean,
 *   climaxTitle?: string,
 *   climaxBody?: string,
 * }} payload
 * @returns {boolean} true if event was dispatched
 */
export function requestShareMoment(payload) {
  if (!payload?.primary) return false
  const type = payload.type || 'manual'
  const autoOpen = Boolean(payload.autoOpen)
  const respectDismiss = payload.respectDismiss !== false

  trackShareEvent('share_moment_request', {
    type,
    autoOpen,
  })

  if (
    autoOpen &&
    respectDismiss &&
    !shouldAutoPromptShareMoment(type, { force: payload.force })
  ) {
    trackShareEvent('share_moment_suppressed', { type })
    return false
  }

  if (autoOpen) markSessionSharePromptUsed()

  if (typeof window === 'undefined') return false

  window.dispatchEvent(
    new CustomEvent(SHARE_MOMENT_EVENT, {
      detail: {
        ...payload,
        type,
        autoOpen,
      },
    }),
  )
  return true
}

/**
 * @param {(payload: object) => void} handler
 * @returns {() => void}
 */
export function subscribeShareMoment(handler) {
  if (typeof window === 'undefined') return () => {}
  const listener = (event) => {
    handler(event.detail || {})
  }
  window.addEventListener(SHARE_MOMENT_EVENT, listener)
  return () => window.removeEventListener(SHARE_MOMENT_EVENT, listener)
}

/**
 * Build a score-share payload from myKinesoScore result fields.
 */
export function buildScoreShareMoment({
  fitnessScore,
  strengthScore,
  runningScore,
  awards = null,
  athleteName = null,
  unlock = false,
}) {
  const score = Math.round(Number(fitnessScore))
  return {
    type: unlock ? 'award_unlock' : 'score_saved',
    title: unlock ? 'New award' : 'myKinesoScore',
    primary: Number.isFinite(score) ? String(score) : '—',
    secondary: unlock ? 'Award unlocked' : 'Strength + Running',
    filename: unlock
      ? 'kinesoscore-award.png'
      : 'kinesoscore-score.png',
    fitnessScore: Number.isFinite(score) ? score : null,
    strengthScore: Number.isFinite(Number(strengthScore))
      ? Math.round(Number(strengthScore))
      : null,
    runningScore: Number.isFinite(Number(runningScore))
      ? Math.round(Number(runningScore))
      : null,
    awards,
    athleteName,
    climaxTitle: unlock ? 'Share your award' : 'Share your score',
    climaxBody: unlock
      ? 'Show the badge on a premium KinesoScore card.'
      : 'Post your myKinesoScore™ — Instagram-ready, not a screenshot.',
  }
}
