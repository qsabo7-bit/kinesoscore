import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import LockedAuthCard from '../components/LockedAuthCard'
import { HABITS_LOCKED_PREVIEW } from '../components/tracking'
import { habitDisplayName } from '../data/habitCatalog'
import { formatLocalDateLabel, localDateKey, shiftLocalDateKey } from '../lib/habitDates'
import {
  addHabitFromCatalog,
  availableCatalogHabits,
  deactivateHabit,
  fetchHabitCheckins,
  fetchUserHabits,
  friendlyHabitError,
  reorderActiveHabits,
  setHabitCheckin,
} from '../lib/habits'
import {
  computeHabitStreak,
  habitDayProgress,
} from '../lib/habitStreaks'
import {
  fetchHabitStreakShare,
  friendlyHabitStreakShareError,
  setHabitStreakShare,
} from '../lib/habitStreakShares'
import { fetchLeaderboardName } from '../lib/leaderboardProfile'
import { useFocusTrap } from '../lib/useFocusTrap'
import { isSupabaseConfigured } from '../supabaseClient'

/**
 * Stage 7 private Habit Tracker.
 * Guests see an auth prompt; signed-in users manage habits + today checkins.
 */
function HabitsPage({ onOpenTab, onRequestAuth }) {
  const { isAuthenticated, user, loading: authLoading } = useAuth()
  const todayKey = localDateKey()
  const [habits, setHabits] = useState([])
  const [checkins, setCheckins] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)
  const [busyHabitId, setBusyHabitId] = useState('')
  const [pendingRemoveId, setPendingRemoveId] = useState('')
  const removeDialogRef = useFocusTrap(Boolean(pendingRemoveId), () =>
    setPendingRemoveId(''),
  )
  const [hasLeaderboardName, setHasLeaderboardName] = useState(false)
  const [shareActive, setShareActive] = useState(false)
  const [shareBusy, setShareBusy] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const [publicStreak, setPublicStreak] = useState(null)

  const activeHabits = useMemo(
    () => habits.filter((h) => h.is_active).sort((a, b) => a.sort_order - b.sort_order),
    [habits],
  )
  const catalogAvailable = useMemo(
    () => availableCatalogHabits(habits),
    [habits],
  )
  const progress = habitDayProgress(todayKey, activeHabits, checkins, todayKey)
  const streak = computeHabitStreak(activeHabits, checkins, { todayKey })

  const completedByHabit = useMemo(() => {
    const map = new Map()
    for (const row of checkins) {
      if (String(row.checkin_date) !== todayKey) continue
      map.set(row.habit_id, Boolean(row.completed))
    }
    return map
  }, [checkins, todayKey])

  useEffect(() => {
    if (!isAuthenticated || !user?.id || !isSupabaseConfigured) return undefined

    let cancelled = false
    const fromDate = shiftLocalDateKey(todayKey, -400)

    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const [nextHabits, nextCheckins, name, share] = await Promise.all([
          fetchUserHabits(user.id),
          fetchHabitCheckins(user.id, { fromDate, toDate: todayKey }),
          fetchLeaderboardName(user.id).catch(() => null),
          fetchHabitStreakShare(user.id).catch(() => null),
        ])
        if (cancelled) return
        setHabits(nextHabits)
        setCheckins(nextCheckins)
        setHasLeaderboardName(Boolean(name))
        setShareActive(Boolean(share?.is_active))
        setPublicStreak(
          share?.is_active && Number.isFinite(Number(share?.streak))
            ? Number(share.streak)
            : null,
        )
      } catch (err) {
        if (cancelled) return
        setError(friendlyHabitError(err, 'Could not load habits.'))
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, user?.id, todayKey])

  const handleShareMode = async (mode) => {
    if (!user?.id) return
    const nextActive = mode === 'global'
    if (nextActive && !hasLeaderboardName) {
      setShareMessage(
        'Add a Leaderboard Name in Account Settings before sharing your streak.',
      )
      return
    }

    setShareBusy(true)
    setShareMessage('')
    try {
      const row = await setHabitStreakShare(nextActive, todayKey)
      setShareActive(Boolean(row?.is_active))
      setPublicStreak(
        row?.is_active && Number.isFinite(Number(row?.streak))
          ? Number(row.streak)
          : null,
      )
      setShareMessage(
        row?.is_active
          ? 'Your current streak is shared publicly (Leaderboard Name + streak only).'
          : 'Streak sharing turned off. Your private habits and streak are unchanged.',
      )
    } catch (err) {
      setShareMessage(friendlyHabitStreakShareError(err))
    } finally {
      setShareBusy(false)
    }
  }

  const toggleCheckin = async (habitId, nextCompleted) => {
    if (!user?.id) return
    setBusyHabitId(habitId)
    setError('')
    const previous = checkins
    setCheckins((rows) => {
      const others = rows.filter(
        (r) => !(r.habit_id === habitId && String(r.checkin_date) === todayKey),
      )
      return [
        ...others,
        {
          habit_id: habitId,
          checkin_date: todayKey,
          completed: nextCompleted,
          user_id: user.id,
        },
      ]
    })

    try {
      const saved = await setHabitCheckin(user.id, habitId, nextCompleted, todayKey)
      setCheckins((rows) => {
        const others = rows.filter(
          (r) => !(r.habit_id === habitId && String(r.checkin_date) === todayKey),
        )
        return [...others, saved]
      })
    } catch (err) {
      setCheckins(previous)
      setError(friendlyHabitError(err, 'Could not save check-in.'))
    } finally {
      setBusyHabitId('')
    }
  }

  const handleAdd = async (habitKey) => {
    if (!user?.id) return
    setError('')
    try {
      const row = await addHabitFromCatalog(user.id, habitKey)
      setHabits((list) => {
        const without = list.filter((h) => h.id !== row.id)
        return [...without, row]
      })
    } catch (err) {
      setError(friendlyHabitError(err, 'Could not add habit.'))
    }
  }

  const handleRemove = async (habitId) => {
    if (!user?.id || !habitId) return
    setError('')
    try {
      const row = await deactivateHabit(user.id, habitId)
      setHabits((list) => list.map((h) => (h.id === row.id ? row : h)))
      setPendingRemoveId('')
    } catch (err) {
      setError(friendlyHabitError(err, 'Could not remove habit.'))
    }
  }

  const moveHabit = async (habitId, direction) => {
    if (!user?.id) return
    const ordered = activeHabits.map((h) => h.id)
    const index = ordered.indexOf(habitId)
    const swapWith = index + direction
    if (index < 0 || swapWith < 0 || swapWith >= ordered.length) return
    ;[ordered[index], ordered[swapWith]] = [ordered[swapWith], ordered[index]]
    setHabits((list) =>
      list.map((h) => {
        const next = ordered.indexOf(h.id)
        if (next < 0) return h
        return { ...h, sort_order: next }
      }),
    )
    try {
      await reorderActiveHabits(user.id, ordered)
    } catch (err) {
      setError(friendlyHabitError(err, 'Could not reorder habits.'))
    }
  }

  if (authLoading) {
    return (
      <main className="page habits-page">
        <p className="calc-hint">Loading…</p>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="page habits-page">
        <header className="page-header">
          <p className="page-eyebrow">Routine</p>
          <h1>Habits</h1>
          <p className="page-lead">
            Optional private routines for signed-in athletes. Nothing is shared
            unless you opt in later.
          </p>
        </header>
        <LockedAuthCard
          title={HABITS_LOCKED_PREVIEW.title}
          lead={HABITS_LOCKED_PREVIEW.lead}
          benefits={HABITS_LOCKED_PREVIEW.benefits}
          sampleKind="habits"
          onRequestAuth={onRequestAuth}
          onOpenTab={onOpenTab}
        />
      </main>
    )
  }

  return (
    <main className="page habits-page">
      <header className="page-header">
        <p className="page-eyebrow">Routine</p>
        <h1>Habits</h1>
        <p className="page-lead">
          Choose habits for your routine and mark them complete each day. A day
          counts toward your streak only when every active habit is done.
        </p>
      </header>

      <p className="calc-hint habits-date-label">
        Today · {formatLocalDateLabel(todayKey)}
      </p>

      <div className="habits-summary" aria-live="polite">
        <p>
          <span className="result-label">Today</span>{' '}
          <strong>{progress.ratioLabel}</strong>
        </p>
        <p>
          <span className="result-label">Streak</span>{' '}
          <strong>
            {streak} day{streak === 1 ? '' : 's'}
          </strong>
        </p>
      </div>

      {error ? <p className="feedback feedback-error">{error}</p> : null}

      <div className="confirm-actions habits-toolbar">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => setEditing((value) => !value)}
        >
          {editing ? 'Done editing' : 'Edit My Habits'}
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onOpenTab?.('leaderboard-habits')}
        >
          View Habit Streaks
        </button>
      </div>

      {!editing ? (
        <section
          className="leaderboard-share-control habits-share-control"
          aria-label="Habit streak sharing"
        >
          <p className="leaderboard-share-label">Habit Streaks</p>
          <p className="calc-hint leaderboard-share-hint">
            Private by default. Publishes immediately (unlike calculator shares,
            which apply when you save). Shares only your Leaderboard Name and
            current streak — never which habits you track.
            Private streaks use your local calendar day; public streaks use a UTC
            as-of date, so they can briefly differ near midnight.
            {publicStreak != null ? ` Public streak: ${publicStreak} day${publicStreak === 1 ? '' : 's'}.` : ''}
          </p>
          <div
            className="leaderboard-share-toggle"
            role="group"
            aria-label="Habit streak sharing"
          >
            <button
              type="button"
              className={`leaderboard-share-option${shareActive ? '' : ' is-active'}`}
              onClick={() => handleShareMode('private')}
              disabled={shareBusy}
              aria-pressed={!shareActive}
            >
              Keep Private
            </button>
            <button
              type="button"
              className={`leaderboard-share-option${shareActive ? ' is-active' : ''}`}
              onClick={() => handleShareMode('global')}
              disabled={shareBusy}
              aria-pressed={shareActive}
            >
              Share My Habit Streak
            </button>
          </div>
          {!hasLeaderboardName ? (
            <p className="feedback feedback-error" role="status">
              A Leaderboard Name is required to share your streak.{' '}
              <button
                type="button"
                className="text-link-button"
                onClick={() => onOpenTab?.('account')}
              >
                Open Account Settings
              </button>
            </p>
          ) : null}
          {shareMessage ? (
            <p className="calc-hint" role="status">
              {shareMessage}
            </p>
          ) : null}
        </section>
      ) : null}

      {loading ? <p className="calc-hint">Loading habits…</p> : null}

      {!loading && editing ? (
        <section className="habits-edit account-card" aria-label="Edit habits">
          <h2 className="result-section-title">Your routine</h2>
          {activeHabits.length === 0 ? (
            <p className="calc-hint">No active habits yet. Add from the catalog below.</p>
          ) : (
            <ul className="habits-edit-list">
              {activeHabits.map((habit, index) => (
                <li key={habit.id} className="habits-edit-item">
                  <span>{habitDisplayName(habit)}</span>
                  <div className="habits-edit-actions">
                    <button
                      type="button"
                      className="btn btn-ghost"
                      disabled={index === 0}
                      onClick={() => moveHabit(habit.id, -1)}
                      aria-label={`Move ${habit.habit_name} up`}
                    >
                      Up
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      disabled={index === activeHabits.length - 1}
                      onClick={() => moveHabit(habit.id, 1)}
                      aria-label={`Move ${habit.habit_name} down`}
                    >
                      Down
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={() => {
                        setError('')
                        setPendingRemoveId(habit.id)
                      }}
                      aria-label="Remove habit"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {pendingRemoveId ? (
            <div
              ref={removeDialogRef}
              className="confirm-box confirm-box-danger"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="remove-habit-title"
            >
              <p id="remove-habit-title">
                <strong>Remove this habit?</strong>
              </p>
              <p>
                It leaves your active routine. Past check-ins stay in history,
                and your streak may change if today no longer counts as complete.
              </p>
              <div className="confirm-actions">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setPendingRemoveId('')}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemove(pendingRemoveId)}
                >
                  Remove Habit
                </button>
              </div>
            </div>
          ) : null}

          <h3 className="dashboard-subtitle">Add a habit</h3>
          <p className="calc-hint">
            These are optional wellness prompts — not medical requirements.
            Choose what fits your routine.
          </p>
          <ul className="habits-catalog-list">
            {catalogAvailable.map((item) => (
              <li key={item.key} className="habits-catalog-item">
                <div>
                  <strong>{habitDisplayName(item)}</strong>
                  <p className="calc-hint">{item.description}</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleAdd(item.key)}
                >
                  Add
                </button>
              </li>
            ))}
            {catalogAvailable.length === 0 ? (
              <li className="calc-hint">All catalog habits are already in your routine.</li>
            ) : null}
          </ul>
        </section>
      ) : null}

      {!loading && !editing && activeHabits.length === 0 ? (
        <section className="habits-empty account-card">
          <h2 className="result-section-title">Start a habit in your routine</h2>
          <p>
            Add habits you want to track each day. Your checklist stays private
            on your account.
          </p>
          <div className="confirm-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setEditing(true)}
            >
              Add a Habit
            </button>
          </div>
        </section>
      ) : null}

      {!loading && !editing && activeHabits.length > 0 ? (
        <section className="habits-checklist account-card" aria-label="Today checklist">
          <h2 className="result-section-title sr-only">Today&apos;s habits</h2>
          <ul className="habits-check-list">
            {activeHabits.map((habit) => {
              const checked = completedByHabit.get(habit.id) === true
              return (
                <li key={habit.id} className="habits-check-item">
                  <label className="habits-check-label">
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={busyHabitId === habit.id}
                      onChange={(event) =>
                        toggleCheckin(habit.id, event.target.checked)
                      }
                    />
                    <span>{habitDisplayName(habit)}</span>
                  </label>
                </li>
              )
            })}
          </ul>
          <p className="calc-hint">
            Complete all {activeHabits.length} active habit
            {activeHabits.length === 1 ? '' : 's'} today to continue your streak.
          </p>
        </section>
      ) : null}

      {!editing && activeHabits.length === 0 ? (
        <p className="calc-hint habits-catalog-note">
          Optional habit ideas are ready when you edit your routine — choose
          what fits you. Nothing here is mandatory medical advice.
        </p>
      ) : null}
    </main>
  )
}

export default HabitsPage
