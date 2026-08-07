/**
 * Map Supabase / network auth errors to safe, user-facing copy.
 * Avoids leaking whether an account exists or token internals.
 */
export function friendlyAuthError(err, fallback = 'Something went wrong. Please try again.') {
  const text = String(err?.message || err || '')

  if (!text) return fallback

  if (/failed to fetch|networkerror|network request failed|load failed/i.test(text)) {
    return 'Network error. Check your connection and try again.'
  }

  if (/rate limit|too many requests|over_email_send_rate_limit/i.test(text)) {
    return 'Too many attempts. Please wait a moment and try again.'
  }

  if (
    /otp_expired|expired|invalid.*(token|link)|access_denied|flow_state|same.?email/i.test(
      text,
    )
  ) {
    return 'This email link is invalid or has expired. Request a new one from the login page.'
  }

  if (/email.?not.?confirmed|confirm.?your.?email/i.test(text)) {
    return 'Please confirm your email before signing in. Check your inbox for the confirmation link.'
  }

  if (/invalid email|email address.*invalid|unable to validate email/i.test(text)) {
    return 'Please enter a valid email address.'
  }

  if (/invalid login credentials/i.test(text)) {
    return 'Incorrect email or password. Please try again.'
  }

  if (/user already registered|already been registered/i.test(text)) {
    return 'An account with this email already exists. Try logging in.'
  }

  if (/password.*at least|password.*characters|weak password/i.test(text)) {
    return 'Password must be at least 6 characters.'
  }

  return fallback
}
