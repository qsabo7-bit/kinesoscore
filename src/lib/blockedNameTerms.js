/**
 * Profanity / abuse terms for Leaderboard Names.
 * DB trigger (023) is source of truth; this list must stay in sync for UX.
 *
 * - exact: whole name or any _/- token equals the term
 * - contains: term appears inside the separator-stripped name (high-confidence only)
 */

/** Short / ambiguous words — exact token or full name only. */
export const BLOCKED_NAME_EXACT = Object.freeze([
  'anal',
  'anus',
  'ass',
  'arse',
  'balls',
  'clit',
  'cock',
  'coon',
  'crap',
  'cum',
  'damn',
  'dick',
  'dyke',
  'fag',
  'hell',
  'homo',
  'jap',
  'jizz',
  'kike',
  'piss',
  'poop',
  'porn',
  'rape',
  'sex',
  'slut',
  'spic',
  'tit',
  'tits',
  'twat',
  'wank',
  'wanker',
])

/** Clear abuse — reject if the term appears anywhere in the normalized name. */
export const BLOCKED_NAME_CONTAINS = Object.freeze([
  'asshole',
  'bastard',
  'bitch',
  'bollocks',
  'chink',
  'cocksuck',
  'cunt',
  'dickhead',
  'faggot',
  'fagg0t',
  'fuck',
  'fuk',
  'fvck',
  'gook',
  'hitler',
  'motherfuck',
  'nazi',
  'nigga',
  'nigger',
  'niggr',
  'onlyfans',
  'penis',
  'pussy',
  'retard',
  'shit',
  'sh1t',
  'vagina',
  'whore',
])

const EXACT_SET = new Set(BLOCKED_NAME_EXACT)
const CONTAINS_LIST = BLOCKED_NAME_CONTAINS

/**
 * Lowercase + strip separators for contains checks.
 * @param {string} raw
 */
export function normalizeNameForBlockCheck(raw) {
  return String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

/**
 * @param {string} raw
 * @returns {string[]}
 */
export function nameTokensForBlockCheck(raw) {
  const trimmed = String(raw || '').trim().toLowerCase()
  if (!trimmed) return []
  const tokens = trimmed.split(/[^a-z0-9]+/).filter(Boolean)
  return tokens.length ? tokens : [trimmed]
}

/**
 * @param {string} raw
 * @returns {boolean}
 */
export function containsBlockedNameTerm(raw) {
  const tokens = nameTokensForBlockCheck(raw)
  const full = String(raw || '').trim().toLowerCase()
  if (!full) return false

  if (EXACT_SET.has(full) || tokens.some((t) => EXACT_SET.has(t))) {
    return true
  }

  const compact = normalizeNameForBlockCheck(raw)
  if (!compact) return false
  return CONTAINS_LIST.some((term) => compact.includes(term))
}
