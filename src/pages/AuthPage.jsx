import { useEffect, useId, useRef, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { friendlyAuthError } from '../lib/authErrors'

const RESET_SENT_MESSAGE =
  "If an account exists for this email, we've sent password reset instructions."

function normalizeAuthMode(mode) {
  if (mode === 'signup' || mode === 'forgot' || mode === 'login') return mode
  return 'login'
}

function AuthPage({ onSuccess, initialMessage = '', initialMode = 'login' }) {
  const {
    signIn,
    signUp,
    resetPasswordForEmail,
    isConfigured,
    authUrlError,
    clearAuthUrlError,
  } = useAuth()
  const [mode, setMode] = useState(() => normalizeAuthMode(initialMode))
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState(initialMessage || '')
  const [submitting, setSubmitting] = useState(false)
  const errorRef = useRef(null)
  const statusRef = useRef(null)
  const firstNameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const errorId = useId()
  const messageId = useId()

  const isSignup = mode === 'signup'
  const isForgot = mode === 'forgot'

  useEffect(() => {
    setMode(normalizeAuthMode(initialMode))
  }, [initialMode])

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage)
    }
  }, [initialMessage])

  useEffect(() => {
    if (!authUrlError) return
    const friendly = friendlyAuthError(authUrlError)
    setError(friendly)
    // Expired/invalid reset links → offer request-new-link; other errors stay on login.
    if (/reset link|expired|invalid/i.test(friendly)) {
      setMode('forgot')
    } else {
      setMode('login')
    }
    clearAuthUrlError?.()
  }, [authUrlError, clearAuthUrlError])

  useEffect(() => {
    if (error) {
      errorRef.current?.focus()
    } else if (message) {
      statusRef.current?.focus()
    }
  }, [error, message])

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setError('')
    setMessage('')
    setPassword('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setSubmitting(true)

    try {
      if (isForgot) {
        await resetPasswordForEmail(email)
        setMessage(RESET_SENT_MESSAGE)
        return
      }

      if (isSignup) {
        if (!firstName.trim()) {
          throw new Error('Please enter your first name.')
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.')
        }

        const data = await signUp({ email, password, firstName })
        if (data.session) {
          setMessage('Account created. Welcome to KinesoScore.')
          onSuccess?.('account')
        } else {
          setMessage(
            'Account created. Check your email to confirm, then log in.',
          )
          setMode('login')
        }
      } else {
        await signIn({ email, password })
        setMessage('Signed in successfully.')
        onSuccess?.('account')
      }
    } catch (err) {
      if (isForgot) {
        const text = String(err?.message || '')
        if (
          /valid email|network|rate limit|too many|configured/i.test(text)
        ) {
          setError(friendlyAuthError(err))
        } else {
          // Avoid revealing whether the email exists.
          setMessage(RESET_SENT_MESSAGE)
        }
      } else {
        setError(friendlyAuthError(err, 'Authentication failed.'))
      }
    } finally {
      setSubmitting(false)
    }
  }

  const title = isForgot
    ? 'Reset password'
    : isSignup
      ? 'Create account'
      : 'Log in'

  const lead = isForgot
    ? 'Enter your email and we’ll send reset instructions if an account exists.'
    : isSignup
      ? 'Create a free account to save calculator results and track improvement over time.'
      : 'Welcome back. Sign in to access your saved progress and dashboard.'

  return (
    <main className="page auth-page">
      <header className="page-header">
        <p className="page-eyebrow">Account</p>
        <h1>{title}</h1>
        <p className="page-lead">{lead}</p>
      </header>

      {!isConfigured ? (
        <p className="feedback feedback-error" role="alert">
          Supabase is not configured yet. In <code>.env</code>, set{' '}
          <code>VITE_SUPABASE_URL</code> to your project URL (
          <code>https://….supabase.co</code>) and{' '}
          <code>VITE_SUPABASE_ANON_KEY</code> to the anon/publishable key, then
          restart <code>npm run dev</code>.
        </p>
      ) : null}

      <form
        className="calc-form auth-form"
        onSubmit={handleSubmit}
        noValidate
        aria-describedby={[error ? errorId : null, message ? messageId : null]
          .filter(Boolean)
          .join(' ') || undefined}
      >
        {isSignup ? (
          <label className="field" htmlFor={firstNameId}>
            <span>First name</span>
            <input
              id={firstNameId}
              type="text"
              name="firstName"
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </label>
        ) : null}

        <label className="field" htmlFor={emailId}>
          <span>Email</span>
          <input
            id={emailId}
            type="email"
            name="email"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            aria-invalid={error ? true : undefined}
          />
        </label>

        {!isForgot ? (
          <label className="field" htmlFor={passwordId}>
            <span>Password</span>
            <input
              id={passwordId}
              type="password"
              name="password"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength={6}
              aria-invalid={error ? true : undefined}
            />
          </label>
        ) : null}

        {!isSignup && !isForgot ? (
          <p className="auth-forgot">
            <button
              type="button"
              className="text-link"
              onClick={() => switchMode('forgot')}
            >
              Forgot your password?
            </button>
          </p>
        ) : null}

        <div
          ref={errorRef}
          id={errorId}
          className="auth-status"
          role="alert"
          aria-live="assertive"
          tabIndex={error ? -1 : undefined}
        >
          {error ? <p className="feedback feedback-error">{error}</p> : null}
        </div>

        <div
          ref={statusRef}
          id={messageId}
          className="auth-status"
          role="status"
          aria-live="polite"
          tabIndex={message && !error ? -1 : undefined}
        >
          {message ? (
            <p className="feedback feedback-success">{message}</p>
          ) : null}
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={submitting || !isConfigured}
        >
          {submitting
            ? isForgot
              ? 'Sending…'
              : isSignup
                ? 'Creating account…'
                : 'Signing in…'
            : isForgot
              ? 'Send reset link'
              : isSignup
                ? 'Create account'
                : 'Log in'}
        </button>
      </form>

      <p className="auth-switch">
        {isForgot ? (
          <>
            Remembered your password?{' '}
            <button
              type="button"
              className="text-link"
              onClick={() => switchMode('login')}
            >
              Back to log in
            </button>
          </>
        ) : (
          <>
            {isSignup ? 'Already have an account?' : 'New to KinesoScore?'}{' '}
            <button
              type="button"
              className="text-link"
              onClick={() => switchMode(isSignup ? 'login' : 'signup')}
            >
              {isSignup ? 'Log in' : 'Create an account'}
            </button>
          </>
        )}
      </p>
    </main>
  )
}

export default AuthPage
