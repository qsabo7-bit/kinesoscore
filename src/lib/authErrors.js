/**
 * Map Supabase / network auth errors to safe, user-facing copy.
 * Avoids leaking whether an account exists or token internals.
 */
export function friendlyAuthError(
  err,
  fallback = 'Something went wrong. Please try again.',
) {
  const text = String(err?.message || err || '')
  const code = String(err?.code || '')

  if (!text && !code) return fallback

  if (
    /failed to fetch|networkerror|network request failed|load failed/i.test(
      text,
    )
  ) {
    return 'Network error. Check your connection and try again.'
  }

  if (
    code === 'over_email_send_rate_limit' ||
    /rate limit|too many requests|over_email_send_rate_limit/i.test(text)
  ) {
    return 'Too many attempts. Please wait a moment and try again.'
  }

  if (
    code === 'otp_expired' ||
    /otp_expired|expired|invalid.*(token|link)|access_denied|flow_state|same.?email/i.test(
      text,
    )
  ) {
    return 'This email link is invalid or has expired. Request a new one from the login page.'
  }

  if (
    code === 'email_not_confirmed' ||
    /email.?not.?confirmed|confirm.?your.?email/i.test(text)
  ) {
    return 'Please confirm your email before signing in. Check your inbox for the confirmation link.'
  }

  if (/invalid email|email address.*invalid|unable to validate email/i.test(text)) {
    return 'Please enter a valid email address.'
  }

  if (code === 'invalid_credentials' || /invalid login credentials/i.test(text)) {
    return 'Incorrect email or password. Please try again.'
  }

  if (
    code === 'user_already_exists' ||
    code === 'email_exists' ||
    /user already registered|already been registered|email_exists/i.test(text)
  ) {
    return 'An account with this email already exists. Try logging in.'
  }

  if (
    code === 'weak_password' ||
    /password.*at least|password.*characters|weak password/i.test(text)
  ) {
    return 'Password must be at least 6 characters.'
  }

  // Common when handle_new_user / profiles schema is out of sync with the app.
  if (
    code === 'unexpected_failure' ||
    /database error saving new user|error saving new user|unexpected_failure/i.test(
      text,
    )
  ) {
    return 'Account setup hit a server issue. Please try again in a minute. If it keeps happening, contact support.'
  }

  if (
    /error sending.*(confirmation|email)|smtp|unable to send|error.?sending.?invite/i.test(
      text,
    )
  ) {
    return 'We could not send the confirmation email. Try again shortly, or log in if the account already exists.'
  }

  if (/signups? not allowed|signup.?disabled|email.?signups?.*disabled/i.test(text)) {
    return 'New account signups are temporarily unavailable. Please try again later.'
  }

  return fallback
}
