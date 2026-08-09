import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import LockedAuthCard from '../components/LockedAuthCard'
import { ACCOUNT_LOCKED_PREVIEW } from '../components/tracking'
import {
  clearLeaderboardName,
  fetchLeaderboardName,
  friendlyLeaderboardError,
  LEADERBOARD_NAME_MAX,
  saveLeaderboardName,
  validateLeaderboardName,
} from '../lib/leaderboardProfile'
import { useFocusTrap } from '../lib/useFocusTrap'

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

function AccountPage({ onOpenTab, onRequestAuth }) {
  const { user, profile, firstName, signOut, deleteAccount, loading } =
    useAuth()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmClearName, setConfirmClearName] = useState(false)

  const [lbDraft, setLbDraft] = useState('')
  const [lbSaved, setLbSaved] = useState(null)
  const [lbLoadedFor, setLbLoadedFor] = useState(null)
  const [lbBusy, setLbBusy] = useState(false)
  const [lbError, setLbError] = useState('')
  const [lbMessage, setLbMessage] = useState('')
  const clearNameDialogRef = useFocusTrap(confirmClearName, () =>
    setConfirmClearName(false),
  )
  const deleteDialogRef = useFocusTrap(confirmDelete, () =>
    setConfirmDelete(false),
  )

  useEffect(() => {
    if (!user?.id) return undefined

    const userId = user.id
    let cancelled = false

    fetchLeaderboardName(userId)
      .then((name) => {
        if (cancelled) return
        setLbSaved(name)
        setLbDraft(name || '')
        setLbError('')
        setLbMessage('')
        setLbLoadedFor(userId)
      })
      .catch((err) => {
        if (cancelled) return
        setLbSaved(null)
        setLbDraft('')
        setLbMessage('')
        setLbError(
          friendlyLeaderboardError(err, 'Could not load Leaderboard Name.'),
        )
        setLbLoadedFor(userId)
      })

    return () => {
      cancelled = true
    }
  }, [user?.id])

  const lbLoading = Boolean(user?.id) && lbLoadedFor !== user.id

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
          'Could not delete account right now. Please try again later.',
      )
      setBusy(false)
      setConfirmDelete(false)
    }
  }

  const handleSaveLeaderboardName = async (event) => {
    event.preventDefault()
    if (!user?.id || lbBusy) return

    setLbBusy(true)
    setLbError('')
    setLbMessage('')

    const checked = validateLeaderboardName(lbDraft)
    if (!checked.ok) {
      setLbError(checked.error)
      setLbBusy(false)
      return
    }

    try {
      const name = await saveLeaderboardName(user.id, checked.name)
      setLbSaved(name)
      setLbDraft(name)
      setLbMessage(
        lbSaved ? 'Leaderboard Name updated.' : 'Leaderboard Name saved.',
      )
    } catch (err) {
      if (err?.code === 'VALIDATION') {
        setLbError(err.message)
      } else {
        setLbError(friendlyLeaderboardError(err))
      }
    } finally {
      setLbBusy(false)
    }
  }

  const handleClearLeaderboardName = async () => {
    if (!user?.id || lbBusy || !lbSaved) return

    setLbBusy(true)
    setLbError('')
    setLbMessage('')

    try {
      await clearLeaderboardName(user.id)
      setLbSaved(null)
      setLbDraft('')
      setLbMessage('Leaderboard Name removed.')
      setConfirmClearName(false)
    } catch (err) {
      setLbError(friendlyLeaderboardError(err, 'Could not clear Leaderboard Name.'))
    } finally {
      setLbBusy(false)
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
      <main className="page account-page">
        <LockedAuthCard
          eyebrow="Account"
          title={ACCOUNT_LOCKED_PREVIEW.title}
          lead={ACCOUNT_LOCKED_PREVIEW.lead}
          benefits={ACCOUNT_LOCKED_PREVIEW.benefits}
          sampleKind="account"
          onRequestAuth={onRequestAuth}
          onOpenTab={onOpenTab}
        />
      </main>
    )
  }

  const lbUnchanged =
    (lbSaved || '') === String(lbDraft ?? '').trim() && Boolean(lbSaved)
  const canClear = Boolean(lbSaved) && !lbBusy && !lbLoading
  const canSave =
    !lbBusy &&
    !lbLoading &&
    String(lbDraft ?? '').trim().length > 0 &&
    !lbUnchanged

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

      <section className="account-card" aria-labelledby="leaderboard-name-heading">
        <h2 id="leaderboard-name-heading" className="result-section-title">
          Leaderboard Name
        </h2>
        <p className="calc-hint">
          Optional — required to appear on global leaderboards.
        </p>
        <p className="calc-hint">
          This public handle is separate from your first name and email. Use
          3–24 characters: letters, numbers, underscores, or hyphens.
        </p>

        {lbLoading ? (
          <p className="calc-hint">Loading Leaderboard Name…</p>
        ) : (
          <form className="auth-form" onSubmit={handleSaveLeaderboardName}>
            <label>
              Leaderboard Name
              <input
                type="text"
                name="leaderboardName"
                autoComplete="off"
                spellCheck={false}
                maxLength={LEADERBOARD_NAME_MAX}
                value={lbDraft}
                onChange={(event) => {
                  setLbDraft(event.target.value)
                  setLbError('')
                  setLbMessage('')
                }}
                placeholder="e.g. TrailRunner_7"
                disabled={lbBusy}
                aria-describedby="leaderboard-name-help"
              />
            </label>
            <p id="leaderboard-name-help" className="calc-hint">
              {lbSaved
                ? `Current: ${lbSaved}`
                : 'No Leaderboard Name set yet.'}
            </p>

            {lbError ? (
              <p className="feedback feedback-error" role="alert">
                {lbError}
              </p>
            ) : null}
            {lbMessage ? (
              <p className="feedback feedback-success" role="status">
                {lbMessage}
              </p>
            ) : null}

            <div className="confirm-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!canSave || confirmClearName}
              >
                {lbBusy ? 'Saving…' : lbSaved ? 'Update name' : 'Save name'}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setLbError('')
                  setLbMessage('')
                  setConfirmClearName(true)
                }}
                disabled={!canClear || confirmClearName}
              >
                Clear name
              </button>
            </div>

            {confirmClearName ? (
              <div
                ref={clearNameDialogRef}
                className="confirm-box confirm-box-danger"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="clear-name-title"
              >
                <p id="clear-name-title">
                  <strong>Clear your Leaderboard Name?</strong>
                </p>
                <p>
                  You&apos;ll leave all public leaderboards until you set a new
                  name and choose to share your results again. Your private
                  calculator history and habit data will not be deleted.
                </p>
                <div className="confirm-actions">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setConfirmClearName(false)}
                    disabled={lbBusy}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleClearLeaderboardName}
                    disabled={lbBusy}
                  >
                    {lbBusy ? 'Clearing…' : 'Clear Name'}
                  </button>
                </div>
              </div>
            ) : null}
          </form>
        )}
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
          <div
            ref={deleteDialogRef}
            className="confirm-box confirm-box-danger"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-account-title"
          >
            <p id="delete-account-title">
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
