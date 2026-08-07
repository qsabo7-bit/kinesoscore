/**
 * Auth email redirect targets.
 * Uses the current origin so local (http://localhost:5173) and production
 * (https://kinesoscore.com) both work when Site URL / Redirect URLs are configured
 * in the Supabase dashboard.
 */

export function authOrigin() {
  if (typeof window === 'undefined') return 'https://kinesoscore.com'
  return window.location.origin.replace(/\/$/, '')
}

/** Signup / email confirmation callback. */
export function signupConfirmRedirectTo() {
  return `${authOrigin()}/?type=signup`
}

/** Password recovery callback — must open reset UI once, then clear intent. */
export function passwordRecoveryRedirectTo() {
  return `${authOrigin()}/reset-password?type=recovery`
}
