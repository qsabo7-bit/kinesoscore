import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import LockedAuthCard from '../components/LockedAuthCard'
import ProfileAvatar from '../components/ProfileAvatar'
import PublicAwardBadges from '../components/PublicAwardBadges'
import SoftReveal from '../components/SoftReveal'
import UnitToggle from '../components/UnitToggle'
import { ACCOUNT_LOCKED_PREVIEW } from '../components/tracking'
import {
  AVATAR_CATALOG,
  friendlyAvatarError,
  normalizeAvatarId,
} from '../data/avatarCatalog'
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
import { saveAvatarId } from '../lib/profileAvatar'
import {
  FIRST_NAME_MAX,
  friendlyFirstNameError,
  saveFirstName,
  validateFirstName,
} from '../lib/profileName'
import { listAchievementsForUser, evaluateAchievements } from '../lib/achievements'
import { habitLevelFromXp } from '../lib/habitLevels'
import { sumLifetimeHabitXp } from '../lib/habitXp'
import { fetchHabitCheckins } from '../lib/habits'
import { localDateKey, shiftLocalDateKey } from '../lib/habitDates'
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
  const {
    user,
    profile,
    firstName,
    avatarId,
    signOut,
    deleteAccount,
    loading,
    refreshProfile,
  } = useAuth()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [confirmClearName, setConfirmClearName] = useState(false)

  const [nameDraft, setNameDraft] = useState(() => firstName || '')
  const [nameBusy, setNameBusy] = useState(false)
  const [nameError, setNameError] = useState('')
  const [nameMessage, setNameMessage] = useState('')

  const [lbDraft, setLbDraft] = useState('')
  const [lbSaved, setLbSaved] = useState(null)
  const [lbLoadedFor, setLbLoadedFor] = useState(null)
  const [lbBusy, setLbBusy] = useState(false)
  const [lbError, setLbError] = useState('')
  const [lbMessage, setLbMessage] = useState('')
  const [showAwardsPublicly, setShowAwardsPublicly] = useState(true)
  const [publicAwards, setPublicAwards] = useState(null)
  const [habitLevel, setHabitLevel] = useState(null)
  const [achievements, setAchievements] = useState(() =>
    listAchievementsForUser(user?.id),
  )
  const [awardsBusy, setAwardsBusy] = useState(false)
  const [awardsError, setAwardsError] = useState('')
  const [awardsMessage, setAwardsMessage] = useState('')
  const [avatarDraft, setAvatarDraft] = useState(() =>
    avatarId ? normalizeAvatarId(avatarId) : AVATAR_CATALOG[0].id,
  )
  const [avatarBusy, setAvatarBusy] = useState(false)
  const [avatarError, setAvatarError] = useState('')
  const [avatarMessage, setAvatarMessage] = useState('')
  const busyRef = useRef(false)
  const lbBusyRef = useRef(false)
  const avatarPickerRef = useRef(null)
  busyRef.current = busy
  lbBusyRef.current = lbBusy
  const clearNameDialogRef = useFocusTrap(confirmClearName, () => {
    if (!lbBusyRef.current) setConfirmClearName(false)
  })
  const deleteDialogRef = useFocusTrap(confirmDelete, () => {
    if (!busyRef.current) setConfirmDelete(false)
  })

  useEffect(() => {
    // Only sync when auth has a real mark — ignore null during profile load.
    if (!avatarId) return
    setAvatarDraft(normalizeAvatarId(avatarId))
  }, [avatarId, user?.id])

  useEffect(() => {
    if (nameBusy) return
    setNameDraft(firstName || '')
  }, [firstName, user?.id, nameBusy])

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

    const todayKey = localDateKey()
    fetchHabitCheckins(userId, {
      fromDate: shiftLocalDateKey(todayKey, -400),
      toDate: todayKey,
    })
      .then((checkins) => {
        if (cancelled) return
        const xp = sumLifetimeHabitXp(checkins)
        setHabitLevel(habitLevelFromXp(xp).level)
        setAchievements(listAchievementsForUser(userId))
      })
      .catch(() => {
        if (cancelled) return
        setHabitLevel(null)
      })

    setAchievements(listAchievementsForUser(userId))

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

  const handleSaveFirstName = async (event) => {
    event.preventDefault()
    if (!user?.id || nameBusy) return

    setNameBusy(true)
    setNameError('')
    setNameMessage('')

    const checked = validateFirstName(nameDraft)
    if (!checked.ok) {
      setNameError(checked.error)
      setNameBusy(false)
      return
    }

    if (checked.name === String(firstName || '').trim()) {
      setNameDraft(checked.name)
      setNameMessage('Name is already up to date.')
      setNameBusy(false)
      return
    }

    try {
      const saved = await saveFirstName(user.id, checked.name)
      setNameDraft(saved)
      setNameMessage('Name updated.')
      await refreshProfile?.()
    } catch (err) {
      setNameError(friendlyFirstNameError(err))
    } finally {
      setNameBusy(false)
    }
  }

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
      evaluateAchievements(user.id, { hasLeaderboardName: true })
      setAchievements(listAchievementsForUser(user.id))
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

  const handlePickAvatar = async (nextId) => {
    if (!user?.id || avatarBusy) return
    const id = normalizeAvatarId(nextId)
    if (avatarId && id === normalizeAvatarId(avatarId)) {
      setAvatarDraft(id)
      return
    }

    setAvatarDraft(id)
    setAvatarBusy(true)
    setAvatarError('')
    setAvatarMessage('')
    try {
      await saveAvatarId(user.id, id)
      await refreshProfile?.()
      setAvatarMessage('Icon updated.')
    } catch (err) {
      setAvatarDraft(
        avatarId ? normalizeAvatarId(avatarId) : AVATAR_CATALOG[0].id,
      )
      setAvatarError(friendlyAvatarError(err, 'Could not save icon.'))
    } finally {
      setAvatarBusy(false)
    }
  }

  const focusAvatarChip = (index) => {
    const buttons = avatarPickerRef.current?.querySelectorAll('[role="radio"]')
    const target = buttons?.[index]
    if (target instanceof HTMLElement) target.focus()
  }

  const handleAvatarKeyDown = (event) => {
    if (avatarBusy) return
    const ids = AVATAR_CATALOG.map((item) => item.id)
    const currentIndex = Math.max(0, ids.indexOf(avatarDraft))
    let nextIndex

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % ids.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + ids.length) % ids.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = ids.length - 1
    } else {
      return
    }

    event.preventDefault()
    focusAvatarChip(nextIndex)
    void handlePickAvatar(ids[nextIndex])
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

  const selectedAvatarLabel =
    AVATAR_CATALOG.find((item) => item.id === avatarDraft)?.label || 'Icon'

  const nameCheck = validateFirstName(nameDraft)
  const canSaveFirstName =
    !nameBusy &&
    nameCheck.ok &&
    nameCheck.name !== String(firstName || '').trim()

  return (
    <main className="page account-page">
      <header className="page-header account-page-header">
        <p className="page-eyebrow">Account</p>
        <h1>Account Settings</h1>
      </header>

      {error ? <p className="feedback feedback-error">{error}</p> : null}

      <div className="account-layout">
        <section
          className="account-panel"
          aria-labelledby="account-profile-heading"
        >
          <div className="account-panel-head">
            <h2 id="account-profile-heading">Profile</h2>
            <p>Name and email stay private</p>
          </div>

          <div className="account-identity">
            <div key={avatarDraft} className="account-identity-avatar">
              <ProfileAvatar avatarId={avatarDraft} size="md" />
            </div>
            <div className="account-identity-copy">
              <form
                className="account-private-name-form"
                onSubmit={handleSaveFirstName}
              >
                <div className="account-name-row">
                  <label className="account-field account-field-grow">
                    <span className="sr-only">Name</span>
                    <input
                      type="text"
                      name="firstName"
                      autoComplete="given-name"
                      spellCheck={false}
                      maxLength={FIRST_NAME_MAX}
                      value={nameDraft}
                      onChange={(event) => {
                        setNameDraft(event.target.value)
                        setNameError('')
                        setNameMessage('')
                      }}
                      placeholder="Your name"
                      disabled={nameBusy}
                      className="account-identity-name-input"
                    />
                  </label>
                  <div className="account-name-actions">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!canSaveFirstName}
                    >
                      {nameBusy ? 'Saving…' : 'Update'}
                    </button>
                  </div>
                </div>
                {nameError ? (
                  <p className="feedback feedback-error" role="alert">
                    {nameError}
                  </p>
                ) : null}
                {nameMessage ? (
                  <p className="feedback feedback-success" role="status">
                    {nameMessage}
                  </p>
                ) : null}
              </form>
              <p className="account-identity-email">
                {profile?.email || user.email || '—'}
              </p>
              <p className="account-identity-meta">
                Joined {formatDate(profile?.created_at || user.created_at)}
              </p>
            </div>
          </div>
        </section>

        <section
          className="account-panel"
          aria-labelledby="account-public-heading"
        >
          <div className="account-panel-head">
            <h2 id="account-public-heading">Public</h2>
            <p>Leaderboard name, icon, medals, and habit level</p>
          </div>

          <div className="avatar-picker-block">
            <div className="avatar-picker-label-row">
              <span>Icon</span>
              <span key={avatarDraft} className="avatar-picker-current">
                {selectedAvatarLabel}
              </span>
            </div>
            <p className="calc-hint avatar-picker-hint">
              Shows next to your Leaderboard Name on public boards. No separate
              hide control — choose a mark you are comfortable sharing.
            </p>
            <div
              ref={avatarPickerRef}
              className="avatar-picker-row"
              role="radiogroup"
              aria-label="Profile icon"
              onKeyDown={handleAvatarKeyDown}
            >
              {AVATAR_CATALOG.map((item, index) => {
                const selected = avatarDraft === item.id
                const tileAccent = item.color || 'var(--muted-strong)'
                const tabStop =
                  selected ||
                  (!AVATAR_CATALOG.some((entry) => entry.id === avatarDraft) &&
                    index === 0)
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    aria-label={item.label}
                    title={item.label}
                    tabIndex={tabStop ? 0 : -1}
                    className={`avatar-picker-chip${
                      selected ? ' is-selected' : ''
                    }`}
                    style={{ '--avatar-tile-accent': tileAccent }}
                    disabled={avatarBusy}
                    onClick={() => {
                      void handlePickAvatar(item.id)
                    }}
                  >
                    <ProfileAvatar avatarId={item.id} size="sm" />
                  </button>
                )
              })}
            </div>
          </div>
          {avatarError ? (
            <p className="feedback feedback-error" role="alert">
              {avatarError}
            </p>
          ) : null}
          {avatarMessage ? (
            <p className="feedback feedback-success" role="status">
              {avatarMessage}
            </p>
          ) : null}

          {lbLoading ? (
            <p className="calc-hint account-loading-hint">Loading…</p>
          ) : (
            <form
              className="account-public-form"
              onSubmit={handleSaveLeaderboardName}
            >
              <div className="account-name-row">
                <label className="account-field account-field-grow">
                  <span className="sr-only">Leaderboard name</span>
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
                    placeholder="Leaderboard name"
                    disabled={lbBusy}
                  />
                </label>
                <div className="account-name-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!canSave || confirmClearName}
                  >
                    {lbBusy ? 'Saving…' : lbSaved ? 'Update' : 'Save'}
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
                    Clear
                  </button>
                </div>
              </div>

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

              {habitLevel != null && habitLevel > 0 ? (
                <p className="account-habit-level-chip" role="status">
                  Habit Level {habitLevel}
                  <span className="calc-hint">
                    {' '}
                    · shown privately here; XP board shows title flair only
                  </span>
                </p>
              ) : null}

              <SoftReveal open={confirmClearName}>
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
                    You&apos;ll leave public leaderboards until you set a new
                    name. Private history stays.
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
                      {lbBusy ? 'Clearing…' : 'Clear name'}
                    </button>
                  </div>
                </div>
              </SoftReveal>

              <div className="account-awards-row">
                <div className="account-awards-copy">
                  <span className="account-subhead">Medals</span>
                  <div key={`${lbSaved ? 'on' : 'off'}-${showAwardsPublicly}`} className="account-awards-status">
                    {!lbSaved ? (
                      <p className="calc-hint">Add a name to enable</p>
                    ) : showAwardsPublicly ? (
                      <p className="account-awards-preview">
                        {publicAwards &&
                        (publicAwards.running ||
                          publicAwards.strength ||
                          publicAwards.crown) ? (
                          <PublicAwardBadges awards={publicAwards} />
                        ) : (
                          <span className="calc-hint">
                            None yet — save {BRAND.scoreName}
                          </span>
                        )}
                      </p>
                    ) : (
                      <p className="calc-hint">Hidden on boards</p>
                    )}
                  </div>
                </div>
                <SoftReveal open={Boolean(lbSaved)}>
                  <UnitToggle
                    className="is-compact"
                    label="Medals on boards"
                    value={showAwardsPublicly ? 'public' : 'private'}
                    options={[
                      { value: 'private', label: 'Private' },
                      { value: 'public', label: 'Public' },
                    ]}
                    onChange={(next) =>
                      handleTogglePublicAwards(next === 'public')
                    }
                    disabled={awardsBusy || lbLoading}
                  />
                </SoftReveal>
              </div>
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
            </form>
          )}
        </section>

        <section
          className="account-panel"
          aria-labelledby="account-achievements-heading"
        >
          <div className="account-panel-head">
            <h2 id="account-achievements-heading">Achievements</h2>
            <p>Unlocks from Habits, saves, boards, and Day One</p>
          </div>
          <ul className="account-achievements-grid">
            {achievements.map((item) => (
              <li
                key={item.id}
                className={`account-achievement${
                  item.unlocked ? ' is-unlocked' : ' is-locked'
                }`}
              >
                <span className="account-achievement-title">{item.title}</span>
                <span className="account-achievement-blurb">{item.blurb}</span>
                <span className="account-achievement-state">
                  {item.unlocked ? 'Unlocked' : 'Locked'}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section
          className="account-panel account-controls"
          aria-labelledby="account-controls-heading"
        >
          <div className="account-panel-head account-panel-head-inline">
            <h2 id="account-controls-heading">Session</h2>
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
                Delete account
              </button>
            </div>
          </div>

          <SoftReveal open={confirmDelete}>
            <div
              ref={deleteDialogRef}
              className="confirm-box confirm-box-danger"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-account-title"
            >
              <p id="delete-account-title">
                <strong>Delete your account permanently?</strong> This ends your
                session and removes your account and associated data. This
                cannot be undone.
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
          </SoftReveal>
        </section>
      </div>
    </main>
  )
}

export default AccountPage
