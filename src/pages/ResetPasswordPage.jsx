import { useEffect, useId, useRef, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { friendlyAuthError } from '../lib/authErrors'

function ResetPasswordPage({ onSuccess, onRequestLogin }) {
  const { updatePassword, clearPasswordRecovery } = useAuth()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [abandoning, setAbandoning] = useState(false)
  const errorRef = useRef(null)
  const passwordId = useId()
  const confirmId = useId()
  const errorId = useId()

  useEffect(() => {
    if (error) {
      errorRef.current?.focus()
    }
  }, [error])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    try {
      const data = await updatePassword(password)
      // Recovery intent is cleared inside updatePassword. Prefer dashboard when
      // the recovery session remains; otherwise send the user to login.
      const staySignedIn = Boolean(data?.user)
      onSuccess?.(
        staySignedIn
          ? 'Password updated successfully.'
          : 'Password updated. Sign in with your new password.',
        { staySignedIn },
      )
    } catch (err) {
      setError(
        friendlyAuthError(
          err,
          'Could not update your password. Request a new reset link and try again.',
        ),
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page auth-page">
      <header className="page-header">
        <p className="page-eyebrow">Account</p>
        <h1>Choose a new password</h1>
        <p className="page-lead">
          Enter a new password for your KinesoScore account. You’ll use it the
          next time you sign in.
        </p>
      </header>

      <form
        className="calc-form auth-form"
        onSubmit={handleSubmit}
        noValidate
        aria-describedby={error ? errorId : undefined}
      >
        <label className="field" htmlFor={passwordId}>
          <span>New password</span>
          <input
            id={passwordId}
            type="password"
            name="new-password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
          />
        </label>

        <label className="field" htmlFor={confirmId}>
          <span>Confirm password</span>
          <input
            id={confirmId}
            type="password"
            name="confirm-password"
            autoComplete="new-password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            required
            minLength={6}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId : undefined}
          />
        </label>

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

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={submitting}
        >
          {submitting ? 'Updating…' : 'Update password'}
        </button>
      </form>

      <p className="auth-switch">
        Need a new link?{' '}
        <button
          type="button"
          className="text-link"
          disabled={submitting || abandoning}
          onClick={async () => {
            setAbandoning(true)
            setError('')
            try {
              // Fully sign out before navigating so App never sees an
              // authenticated recovery session on the login tab.
              await clearPasswordRecovery?.()
              onRequestLogin?.()
            } catch (err) {
              setError(
                friendlyAuthError(
                  err,
                  'Could not leave password reset. Try again or close this tab.',
                ),
              )
              setAbandoning(false)
            }
          }}
        >
          {abandoning ? 'Returning to login…' : 'Request reset link'}
        </button>
      </p>
    </main>
  )
}

export default ResetPasswordPage
