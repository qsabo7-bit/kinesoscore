/**
 * Capture Supabase auth redirect params before the client clears the URL hash.
 * Call captureAuthCallbackParams() once before createClient().
 */

const AUTH_INTENT_KEY = 'kinesoscore_auth_intent'

let captured = null

function emptyParams() {
  return {
    type: null,
    error: null,
    errorDescription: null,
    hasAuthTokens: false,
    code: null,
  }
}

function readParams() {
  if (typeof window === 'undefined') return emptyParams()

  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''))
  const searchParams = new URLSearchParams(window.location.search)

  const type = hashParams.get('type') || searchParams.get('type') || null
  const error =
    hashParams.get('error') || searchParams.get('error') || null
  const errorDescription =
    hashParams.get('error_description') ||
    searchParams.get('error_description') ||
    null
  const accessToken =
    hashParams.get('access_token') || searchParams.get('access_token')
  const code = searchParams.get('code') || hashParams.get('code') || null

  return {
    type,
    error,
    errorDescription,
    hasAuthTokens: Boolean(accessToken || code),
    code,
  }
}

function persistIntent(intent) {
  if (typeof window === 'undefined' || !intent) return
  try {
    window.sessionStorage.setItem(AUTH_INTENT_KEY, intent)
  } catch {
    // Ignore private-mode / storage failures.
  }
}

function readPersistedIntent() {
  if (typeof window === 'undefined') return null
  try {
    return window.sessionStorage.getItem(AUTH_INTENT_KEY)
  } catch {
    return null
  }
}

function pathnameOnly() {
  if (typeof window === 'undefined') return '/'
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

/** Snapshot auth callback params once (before Supabase strips the hash). */
export function captureAuthCallbackParams() {
  if (!captured) {
    const params = readParams()
    let type = params.type

    // Infer recovery only when reset-password still carries auth tokens/code.
    // Do not treat a bare /reset-password visit as recovery (prevents loops).
    if (
      !type &&
      pathnameOnly() === '/reset-password' &&
      (params.hasAuthTokens || params.code)
    ) {
      type = 'recovery'
    }

    captured = { ...params, type }

    if (isPasswordRecoveryType(type)) {
      persistIntent('recovery')
    } else if (isEmailConfirmType(type)) {
      persistIntent('signup')
    }
  }
  return captured
}

export function getCapturedAuthCallbackParams() {
  return captured || captureAuthCallbackParams()
}

export function isPasswordRecoveryType(type) {
  return type === 'recovery'
}

/** Email confirmation / invite — not password reset. */
export function isEmailConfirmType(type) {
  return type === 'signup' || type === 'email' || type === 'invite'
}

/**
 * Effective auth callback intent.
 * Uses the captured snapshot + sessionStorage. After clearAuthIntent(), a bare
 * leftover ?type= in the address bar must NOT reopen recovery.
 * A truly new callback (tokens/code present) can re-arm intent without reload.
 */
export function getAuthIntent() {
  getCapturedAuthCallbackParams()

  if (isPasswordRecoveryType(captured?.type)) return 'recovery'
  if (isEmailConfirmType(captured?.type)) return 'signup'

  const live = readParams()
  if (live.hasAuthTokens || live.code) {
    if (isPasswordRecoveryType(live.type)) {
      captured = { ...captured, ...live, type: 'recovery' }
      persistIntent('recovery')
      return 'recovery'
    }
    if (isEmailConfirmType(live.type)) {
      captured = { ...captured, ...live, type: live.type }
      persistIntent('signup')
      return 'signup'
    }
  }

  const persisted = readPersistedIntent()
  if (persisted === 'recovery' || persisted === 'signup') return persisted
  return null
}

export function markRecoveryIntent() {
  persistIntent('recovery')
  if (captured) {
    captured = { ...captured, type: 'recovery' }
  }
}

/**
 * End signup/recovery callback handling.
 * Must clear sessionStorage, in-memory captured type, and leftover URL params,
 * or SIGNED_IN after a successful password update will reopen the reset form.
 */
export function clearAuthIntent() {
  if (captured) {
    captured = {
      ...captured,
      type: null,
      error: null,
      errorDescription: null,
      hasAuthTokens: false,
      code: null,
    }
  }
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(AUTH_INTENT_KEY)
  } catch {
    // Ignore.
  }
  clearAuthCallbackFromUrl()
}

export function hasPendingAuthCallbackInUrl() {
  const live = readParams()
  return Boolean(
    live.type ||
      live.hasAuthTokens ||
      live.code ||
      live.error ||
      live.errorDescription,
  )
}

/**
 * Remove auth callback query/hash residue after we've captured intent.
 * Keeps the path; safe once tokens are no longer needed by the client.
 */
export function clearAuthCallbackFromUrl() {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)
  ;[
    'type',
    'code',
    'error',
    'error_description',
    'access_token',
    'refresh_token',
    'expires_in',
    'token_type',
  ].forEach((key) => url.searchParams.delete(key))

  const hashParams = new URLSearchParams(url.hash.replace(/^#/, ''))
  const authHashKeys = [
    'type',
    'access_token',
    'refresh_token',
    'expires_in',
    'token_type',
    'error',
    'error_description',
  ]
  const hashLooksAuth =
    authHashKeys.some((key) => hashParams.has(key)) || hashParams.has('code')

  const nextHash = hashLooksAuth ? '' : url.hash
  const next = `${url.pathname}${url.search}${nextHash}`
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`
  if (next !== current) {
    const title =
      typeof document !== 'undefined' ? document.title : ''
    window.history.replaceState({}, title, next || '/')
  }
}
