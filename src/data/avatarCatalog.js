/** Stable fallback when an id is missing/invalid (display only). */
export const DEFAULT_AVATAR_ID = 'mark-sun'

/**
 * Preset avatar catalog (picker + public leaderboard name row).
 * IDs must stay in sync with profiles_avatar_id_check in SQL.
 *
 * @type {ReadonlyArray<{ id: string, label: string, color: string }>}
 */
export const AVATAR_CATALOG = Object.freeze([
  { id: 'mark-sun', label: 'Sun', color: '#e8c56a' },
  { id: 'mark-pulse', label: 'Pulse', color: '#7dffb3' },
  { id: 'mark-shield', label: 'Shield', color: '#ef4444' },
  { id: 'mark-peak', label: 'Peak', color: '#6eb6ff' },
  { id: 'mark-bolt', label: 'Bolt', color: '#b794f6' },
])

/** @type {ReadonlyArray<string>} */
export const AVATAR_MARK_IDS = Object.freeze(
  AVATAR_CATALOG.map((item) => item.id),
)

const AVATAR_ID_SET = new Set(AVATAR_MARK_IDS)

/**
 * Random mark for new member signup.
 * @returns {string}
 */
export function pickRandomAvatarId() {
  const index = Math.floor(Math.random() * AVATAR_MARK_IDS.length)
  return AVATAR_MARK_IDS[index] || DEFAULT_AVATAR_ID
}

/**
 * @param {unknown} id
 * @returns {boolean}
 */
export function isValidAvatarId(id) {
  return typeof id === 'string' && AVATAR_ID_SET.has(id)
}

/**
 * @param {unknown} id
 * @returns {string}
 */
export function normalizeAvatarId(id) {
  if (id === 'none') return DEFAULT_AVATAR_ID
  return isValidAvatarId(id) ? id : DEFAULT_AVATAR_ID
}

/**
 * @param {string} id
 * @returns {{ id: string, label: string, color: string } | undefined}
 */
export function getAvatarCatalogEntry(id) {
  return AVATAR_CATALOG.find((item) => item.id === id)
}

/**
 * @param {unknown} err
 * @param {string} [fallback]
 */
export function friendlyAvatarError(err, fallback) {
  const message = String(err?.message || '')
  if (/Could not find.*avatar_id|column.*avatar_id/i.test(message)) {
    return 'Avatar settings are not available yet. Try again after the next update.'
  }
  if (/profiles_avatar_id_check|check constraint.*avatar/i.test(message)) {
    return 'That avatar is not available. Pick another from the catalog.'
  }
  if (err?.code === 'NOT_FOUND' || /Could not update avatar/i.test(message)) {
    return 'Could not update avatar. Try refreshing the page.'
  }
  return fallback || message || 'Could not update avatar.'
}
