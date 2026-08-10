import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import LockedAuthCard from '../components/LockedAuthCard'
import PublicAwardBadges from '../components/PublicAwardBadges'
import { ACCOUNT_LOCKED_PREVIEW } from '../components/tracking'
import { BRAND } from '../data/brand'
import {
  clearLeaderboardName,
  fetchLeaderboardName,
  friendlyLeaderboardError,
  LEADERBOARD_NAME_MAX,
  saveLeaderboardName,
  validateLeaderboardName,
} from '../lib/leaderboardProfile'
import {
  fetchAwardIdentitySettings,
  friendlyAwardIdentityError,
  saveAwardIdentitySettings,
} from '../lib/awardIdentity'
import { deriveAwards } from '../lib/fitnessAwards'
import { fetchLatestFitnessScoreSnapshot } from '../lib/fitnessScoreSnapshots'
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
  const [showAwardsPublicly, setShowAwardsPublicly] = useState(true)
  const [publicAwards, setPublicAwards] = useState(null)
  const [awardsBusy, setAwardsBusy] = useState(false)
  const [awardsError, setAwardsError] = useState('')
  const [awardsMessage, setAwardsMessage] = useState('')
  const busyRef = useRef(false)
  const lbBusyRef = useRef(false)
  busyRef.current = busy
  lbBusyRef.current = lbBusy
  const clearNameDialogRef = useFocusTrap(confirmClearName, () => {
    if (!lbBusyRef.current) setConfirmClearName(false)
  })
  const deleteDialogRef = useFocusTrap(confirmDelete, () => {
    if (!busyRef.current) setConfirmDelete(false)
  })

  useEffect(() => {
    if (!user?.id) return undefined

    const userId = user.id
    let cancelled = false

    // Load name and awards separately so a missing 015 migration can't wipe the name UI.
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

    fetchAwardIdentitySettings(userId)
      .then((awardsSettings) => {
        if (cancelled) return
        // No profile yet → default Show on leaderboard (matches DB default).
        const show =
          awardsSettings == null
            ? true
            : Boolean(awardsSettings.showAwardsPublicly)
        setShowAwardsPublicly(show)
        setPublicAwards(
          show && awardsSettings
            ? {
                running: awardsSettings.running,
                strength: awardsSettings.strength,
                crown: awardsSettings.crown,
              }
            : null,
        )
        setAwardsError('')
        setAwardsMessage('')
      })
      .catch(() => {
        if (cancelled) return
        setShowAwardsPublicly(true)
        setPublicAwards(null)
        // Soft-fail: public awards unavailable until migration 015 is applied.
      })

    return () => {
      cancelled = true
    }
  }, [user?.id])

  const handleTogglePublicAwards = async (nextOn) => {
    if (!user?.id || awardsBusy || !lbSaved) return
    setAwardsBusy(true)
    setAwardsError('')
    setAwardsMessage('')
    try {
      if (!nextOn) {
        await saveAwardIdentitySettings({
          userId: user.id,
          showAwardsPublicly: false,
        })
        setShowAwardsPublicly(false)
        setPublicAwards(null)
        setAwardsMessage('Awards hidden from public leaderboards.')
        return
      }

      const snapshot = await fetchLatestFitnessScoreSnapshot(user.id)
      const awards = snapshot
        ? deriveAwards({
            runningScore: snapshot.running_score,
            strengthScore: snapshot.strength_score,
          })
        : { running: null, strength: null, crown: false }

      await saveAwardIdentitySettings({
        userId: user.id,
        showAwardsPublicly: true,
        awards,
      })
      setShowAwardsPublicly(true)
      setPublicAwards(awards)
      setAwardsMessage(
        awards.running || awards.strength || awards.crown
          ? 'Awards will show next to your Leaderboard Name.'
          : 'Public awards enabled. Save myKinesoScore to earn medals.',
      )
    } catch (err) {
      setAwardsError(
        friendlyAwardIdentityError(err, 'Could not update public awards.'),
      )
    } finally {
      setAwardsBusy(false)
    }
  }

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
      const wasNew = !lbSaved
      const name = await saveLeaderboardName(user.id, checked.name)
      setLbSaved(name)
      setLbDraft(name)
      setLbMessage(
        wasNew ? 'Leaderboard Name saved.' : 'Leaderboard Name updated.',
      )
      // New profiles default to public awards — seed tiers from latest snapshot.
      if (wasNew) {
        try {
          const snapshot = await fetchLatestFitnessScoreSnapshot(user.id)
          const awards = snapshot
            ? deriveAwards({
                runningScore: snapshot.running_score,
                strengthScore: snapshot.strength_score,
              })
            : { running: null, strength: null, crown: false }
          await saveAwardIdentitySettings({
            userId: user.id,
            showAwardsPublicly: true,
            awards,
          })
          setShowAwardsPublicly(true)
          setPublicAwards(awards)
        } catch {
          setShowAwardsPublicly(true)
        }
      }
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
      setShowAwardsPublicly(true)
      setPublicAwards(null)
      setAwardsMessage('')
      setAwardsError('')
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

      <section
        className="account-card"
        aria-labelledby="public-awards-heading"
      >
        <h2 id="public-awards-heading" className="result-section-title">
          Public awards
        </h2>
        <p className="calc-hint">
          Strength/Running medal tiers and Crown show next to your Leaderboard
          Name by default. Raw scores stay private — switch to Keep private
          anytime.
        </p>
        {!lbSaved ? (
          <p className="calc-hint">
            Set a Leaderboard Name first to enable public awards.
          </p>
        ) : (
          <>
            <div
              className="leaderboard-share-toggle"
              role="group"
              aria-label="Show awards on leaderboards"
            >
              <button
                type="button"
                className={`leaderboard-share-option${
                  !showAwardsPublicly ? ' is-active' : ''
                }`}
                onClick={() => handleTogglePublicAwards(false)}
                disabled={awardsBusy || lbLoading}
                aria-pressed={!showAwardsPublicly}
              >
                Keep private
              </button>
              <button
                type="button"
                className={`leaderboard-share-option${
                  showAwardsPublicly ? ' is-active' : ''
                }`}
                onClick={() => handleTogglePublicAwards(true)}
                disabled={awardsBusy || lbLoading}
                aria-pressed={showAwardsPublicly}
              >
                Show on leaderboard
              </button>
            </div>
            {showAwardsPublicly ? (
              <p className="account-awards-preview">
                Preview:{' '}
                {publicAwards &&
                (publicAwards.running ||
                  publicAwards.strength ||
                  publicAwards.crown) ? (
                  <PublicAwardBadges awards={publicAwards} />
                ) : (
                  <span className="calc-hint">
                    No medals yet — save {BRAND.scoreName} to earn them.
                  </span>
                )}
              </p>
            ) : null}
            {awardsError ? (
              <p className="feedback feedback-error" role="alert">
                {awardsError}
              </p>
            ) : null}
            {awardsMessage ? (
              <p className="feedback feedback-success" role="status">
                {awardsMessage}
              </p>
            ) : null}
          </>
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
