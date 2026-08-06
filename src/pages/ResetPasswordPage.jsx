import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { friendlyAuthError } from '../lib/authErrors'

function ResetPasswordPage({ onSuccess, onRequestLogin }) {
  const { updatePassword, clearPasswordRecovery, signOut } = useAuth()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

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
      await updatePassword(password)
      clearPasswordRecovery?.()
      try {
        await signOut()
      } catch {
        // Session may already be cleared; still return to login.
      }
      onSuccess?.('Password updated. Sign in with your new password.')
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

      <form className="calc-form auth-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>New password</span>
          <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
          />
        </label>

        <label className="field">
          <span>Confirm password</span>
          <input
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            required
            minLength={6}
          />
        </label>

        {error ? <p className="feedback feedback-error">{error}</p> : null}

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
          onClick={() => {
            clearPasswordRecovery?.()
            onRequestLogin?.()
          }}
        >
          Request reset link
        </button>
      </p>
    </main>
  )
}

export default ResetPasswordPage
