import { useEffect, useId, useRef, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import SoftReveal from '../components/SoftReveal'
import { BRAND } from '../data/brand'
import { friendlyAuthError } from '../lib/authErrors'
import {
  LEADERBOARD_NAME_MAX,
  friendlyLeaderboardError,
  saveLeaderboardName,
  validateLeaderboardName,
} from '../lib/leaderboardProfile'
import {
  applyPendingLeaderboardName,
  stashPendingLeaderboardName,
} from '../lib/pendingLeaderboardName'

const RESET_SENT_MESSAGE =
  "If an account exists for this email, we've sent password reset instructions."

function normalizeAuthMode(mode) {
  if (mode === 'signup' || mode === 'forgot' || mode === 'login') return mode
  return 'login'
}

async function applyLeaderboardNameIfPresent(userId, rawName) {
  const trimmed = String(rawName || '').trim()
  if (!userId || !trimmed) return
  await saveLeaderboardName(userId, trimmed)
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
  const [leaderboardName, setLeaderboardName] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState(initialMessage || '')
  const [submitting, setSubmitting] = useState(false)
  const errorRef = useRef(null)
  const statusRef = useRef(null)
  const firstNameId = useId()
  const leaderboardNameId = useId()
  const emailId = useId()
  const passwordId = useId()
  const errorId = useId()
  const messageId = useId()
  const leaderboardHelpId = useId()

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
    if (nextMode !== 'signup') setLeaderboardName('')
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
          const err = new Error('Please enter your first name.')
          err.code = 'VALIDATION'
          throw err
        }
        if (password.length < 6) {
          const err = new Error('Password must be at least 6 characters.')
          err.code = 'VALIDATION'
          throw err
        }

        const lbDraft = leaderboardName.trim()
        if (lbDraft) {
          const checked = validateLeaderboardName(lbDraft)
          if (!checked.ok) {
            const err = new Error(checked.error)
            err.code = 'VALIDATION'
            throw err
          }
        }

        const data = await signUp({ email, password, firstName })
        const userId = data?.user?.id || data?.session?.user?.id

        if (data.session && userId) {
          if (lbDraft) {
            try {
              await applyLeaderboardNameIfPresent(userId, lbDraft)
            } catch (lbErr) {
              // Retry via App auth effect / next load.
              stashPendingLeaderboardName(lbDraft)
              console.warn('Leaderboard Name not saved at signup', lbErr)
            }
          }
          setMessage('Account created. Welcome to KinesoScore.')
          onSuccess?.('account')
        } else {
          if (lbDraft) stashPendingLeaderboardName(lbDraft)
          setMessage(
            'Account created. Check your email to confirm, then log in.',
          )
          setMode('login')
        }
      } else {
        const data = await signIn({ email, password })
        const userId = data?.user?.id || data?.session?.user?.id
        if (userId) {
          try {
            await applyPendingLeaderboardName(userId, saveLeaderboardName)
          } catch (lbErr) {
            console.warn('Pending Leaderboard Name not saved at login', lbErr)
          }
        }
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
          setMessage(RESET_SENT_MESSAGE)
        }
      } else if (err?.code === 'VALIDATION') {
        // First-name / password / Leaderboard Name client checks.
        setError(err.message || friendlyLeaderboardError(err))
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
      ? 'Create Account'
      : 'Log in'

  const lead = isForgot
    ? 'Enter your email and we’ll send reset instructions if an account exists.'
    : isSignup
      ? `Save ${BRAND.scoreName}, track progress, and join the leaderboard when you’re ready.`
      : 'Welcome back — your scores and habits are waiting.'

  return (
    <main className="page auth-page auth-page-brand">
      <div className="auth-brand-panel">
        <p className="auth-brand-mark">{BRAND.short}</p>
        <h1 className="auth-brand-title">{title}</h1>
        <p className="auth-brand-lead">{lead}</p>

        {!isConfigured ? (
          <p className="feedback feedback-error" role="alert">
            Account sign-in is temporarily unavailable. Please try again later.
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
          <SoftReveal open={isSignup}>
            <label className="field" htmlFor={firstNameId}>
              <span>First name</span>
              <input
                id={firstNameId}
                type="text"
                name="firstName"
                autoComplete="given-name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                required={isSignup}
                tabIndex={isSignup ? undefined : -1}
              />
            </label>
          </SoftReveal>

          <SoftReveal open={isSignup}>
            <div className="auth-leaderboard-name-field">
              <label className="field" htmlFor={leaderboardNameId}>
                <span>
                  Leaderboard Name{' '}
                  <span className="auth-optional-tag">(optional)</span>
                </span>
                <input
                  id={leaderboardNameId}
                  type="text"
                  name="leaderboardName"
                  autoComplete="username"
                  spellCheck={false}
                  maxLength={LEADERBOARD_NAME_MAX}
                  value={leaderboardName}
                  onChange={(event) => setLeaderboardName(event.target.value)}
                  placeholder="e.g. TrailRunner_7"
                  tabIndex={isSignup ? undefined : -1}
                  aria-describedby={leaderboardHelpId}
                />
              </label>
              <p id={leaderboardHelpId} className="calc-hint auth-leaderboard-hint">
                Optional — only for public leaderboards. Claim a name now so you
                can share results on day one. Change or remove it anytime in
                Account Settings.
              </p>
            </div>
          </SoftReveal>

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

          <SoftReveal open={!isForgot}>
            <label className="field" htmlFor={passwordId}>
              <span>Password</span>
              <input
                id={passwordId}
                type="password"
                name="password"
                autoComplete={isSignup ? 'new-password' : 'current-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required={!isForgot}
                minLength={6}
                aria-invalid={error ? true : undefined}
                tabIndex={isForgot ? -1 : undefined}
              />
            </label>
          </SoftReveal>

          <SoftReveal open={!isSignup && !isForgot}>
            <p className="auth-forgot">
              <button
                type="button"
                className="text-link"
                onClick={() => switchMode('forgot')}
                tabIndex={!isSignup && !isForgot ? undefined : -1}
              >
                Forgot your password?
              </button>
            </p>
          </SoftReveal>

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
                  ? 'Create Account'
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
              {isSignup ? 'Already have an account?' : `New to ${BRAND.short}?`}{' '}
              <button
                type="button"
                className="text-link"
                onClick={() => switchMode(isSignup ? 'login' : 'signup')}
              >
                {isSignup ? 'Log in' : 'Create Account'}
              </button>
            </>
          )}
        </p>
      </div>
    </main>
  )
}

export default AuthPage
