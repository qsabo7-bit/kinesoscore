import { containsBlockedNameTerm } from './blockedNameTerms.js'

export const FIRST_NAME_MIN = 1
export const FIRST_NAME_MAX = 40

/** Letters (any language), spaces, hyphens, and apostrophes. */
export const FIRST_NAME_PATTERN = /^[\p{L}](?:[\p{L}\s'-]*[\p{L}])?$/u

/**
 * @param {string} raw
 * @returns {{ ok: true, name: string } | { ok: false, error: string }}
 */
export function validateFirstName(raw) {
  const name = String(raw ?? '').trim().replace(/\s+/g, ' ')
  if (!name) {
    return { ok: false, error: 'Please enter your name.' }
  }
  if (name.length < FIRST_NAME_MIN || name.length > FIRST_NAME_MAX) {
    return {
      ok: false,
      error: `Name must be ${FIRST_NAME_MIN}–${FIRST_NAME_MAX} characters.`,
    }
  }
  if (!FIRST_NAME_PATTERN.test(name)) {
    return {
      ok: false,
      error: 'Use letters, spaces, hyphens, or apostrophes only.',
    }
  }
  if (containsBlockedNameTerm(name)) {
    return {
      ok: false,
      error: 'That name is not allowed. Choose another.',
    }
  }
  return { ok: true, name }
}

/**
 * @param {unknown} err
 * @param {string} [fallback]
 */
export function friendlyFirstNameError(
  err,
  fallback = 'Could not update name. Please try again.',
) {
  const code = err?.code || err?.error?.code
  const text = String(err?.message || err || '')

  if (code === 'VALIDATION') {
    return err.message || fallback
  }

  if (
    code === 'PGRST205' ||
    /Could not find the table .*profiles/i.test(text)
  ) {
    return 'Name updates are not available right now. Please try again later.'
  }

  if (/permission denied|42501|row-level security/i.test(text)) {
    return 'Could not update name right now. Please try again later.'
  }

  if (/failed to fetch|networkerror|network request failed|load failed/i.test(text)) {
    return 'Network error. Check your connection and try again.'
  }

  return fallback
}

/**
 * Update private profile first_name and mirror into auth user_metadata.
 * @param {string} userId
 * @param {string} rawName
 * @returns {Promise<string>}
 */
export async function saveFirstName(userId, rawName) {
  const checked = validateFirstName(rawName)
  if (!checked.ok) {
    const err = new Error(checked.error)
    err.code = 'VALIDATION'
    throw err
  }

  if (!userId) {
    const err = new Error('You must be signed in to update your name.')
    err.code = 'VALIDATION'
    throw err
  }

  const { isSupabaseConfigured, supabase } = await import('../supabaseClient.js')

  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.')
  }

  const { data, error } = await supabase
    .from('profiles')
    .update({ first_name: checked.name })
    .eq('id', userId)
    .select('first_name')
    .maybeSingle()

  if (error) throw error
  if (!data) {
    const err = new Error('Could not update name. Try refreshing the page.')
    err.code = 'NOT_FOUND'
    throw err
  }

  // Best-effort metadata sync for Welcome fallbacks before profile reload.
  try {
    await supabase.auth.updateUser({
      data: { first_name: checked.name },
    })
  } catch {
    // Profile row is source of truth for Account / Header.
  }

  return data.first_name
}
