import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'

function formatDate(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

function AccountPage({ onOpenTab }) {
  const { user, profile, firstName, signOut, deleteAccount, loading } =
    useAuth()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleLogout = async () => {
    setBusy(true)
    setError('')
    try {
      await signOut()
      onOpenTab?.('home')
    } catch (err) {
      setError(err.message || 'Could not log out.')
      setBusy(false)
    }
  }

  const handleDeleteAccount = async () => {
    setBusy(true)
    setError('')
    try {
      await deleteAccount()
      onOpenTab?.('home')
    } catch (err) {
      setError(
        err.message ||
          'Could not delete account. Run supabase/schema.sql in the Supabase SQL Editor so delete_own_account exists.',
      )
      setBusy(false)
      setConfirmDelete(false)
    }
  }

  if (loading) {
    return (
      <main className="page">
        <p className="calc-hint">Loading account settings…</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="page">
        <header className="page-header">
          <p className="page-eyebrow">Account</p>
          <h1>Account Settings</h1>
          <p className="page-lead">
            Log in to view your profile and account controls.
          </p>
        </header>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onOpenTab?.('login')}
        >
          Go to Login
        </button>
      </main>
    )
  }

  return (
    <main className="page account-page">
      <header className="page-header">
        <p className="page-eyebrow">Account</p>
        <h1>Account Settings</h1>
        <p className="page-lead">
          Manage your KinesoScore profile, sign out, or permanently delete your
          account.
        </p>
      </header>

      {error ? <p className="feedback feedback-error">{error}</p> : null}

      <section className="account-card">
        <h2 className="result-section-title">Profile</h2>
        <ul className="result-table">
          <li>
            <span>First name</span>
            <strong>{firstName || '—'}</strong>
          </li>
          <li>
            <span>Email address</span>
            <strong>{profile?.email || user.email || '—'}</strong>
          </li>
          <li>
            <span>Account creation date</span>
            <strong>
              {formatDate(profile?.created_at || user.created_at)}
            </strong>
          </li>
        </ul>
      </section>

      <section className="account-card account-controls">
        <h2 className="result-section-title">Account controls</h2>
        <div className="confirm-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleLogout}
            disabled={busy}
          >
            {busy && !confirmDelete ? 'Logging out…' : 'Log out'}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setError('')
              setConfirmDelete(true)
            }}
            disabled={busy}
          >
            Delete Account
          </button>
        </div>

        {confirmDelete ? (
          <div className="confirm-box confirm-box-danger" role="alertdialog">
            <p>
              <strong>Delete your account permanently?</strong> This ends your
              session and removes your account and associated data. This cannot
              be undone.
            </p>
            <div className="confirm-actions">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteAccount}
                disabled={busy}
              >
                {busy ? 'Deleting…' : 'Yes, delete my account'}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setConfirmDelete(false)}
                disabled={busy}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  )
}

export default AccountPage
