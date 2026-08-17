import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import GuestHabitsDemo from '../components/GuestHabitsDemo'
import UnitToggle from '../components/UnitToggle'
import {
  habitBaseXp,
  habitCardImage,
  habitDisplayName,
} from '../data/habitCatalog'
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
import { habitLevelFromXp } from '../lib/habitLevels'
import {
  computeHabitConsistency,
  consistencyTitle,
} from '../lib/habitConsistency'
import { evaluateHabitAchievementSignals } from '../lib/habitAchievementSignals'
import {
  perHabitStreakEndingOn,
  previewHabitXpForDate,
  sumLifetimeHabitXp,
} from '../lib/habitXp'
import {
  fetchHabitXpShare,
  friendlyHabitXpShareError,
  setHabitXpShare,
} from '../lib/habitXpShares'
import { evaluateAchievements } from '../lib/achievements'
import { getThisWeekFocus } from '../lib/weekFocus'
import { fetchLeaderboardName } from '../lib/leaderboardProfile'
import { consumeOnboardingShareHint } from '../lib/onboarding'
import { useFocusTrap } from '../lib/useFocusTrap'
import { isSupabaseConfigured } from '../supabaseClient'

/**
 * Private Habit Tracker with picture cards + XP.
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
  const [publicXp, setPublicXp] = useState(null)
  const [xpBurst, setXpBurst] = useState(null)
  const [justCompletedId, setJustCompletedId] = useState('')

  const activeHabits = useMemo(
    () => habits.filter((h) => h.is_active).sort((a, b) => a.sort_order - b.sort_order),
    [habits],
  )
  const catalogAvailable = useMemo(
    () => availableCatalogHabits(habits),
    [habits],
  )
  const lifetimeXp = useMemo(() => sumLifetimeHabitXp(checkins), [checkins])
  const levelState = useMemo(() => habitLevelFromXp(lifetimeXp), [lifetimeXp])

  const completedByHabit = useMemo(() => {
    const map = new Map()
    for (const row of checkins) {
      if (String(row.checkin_date) !== todayKey) continue
      map.set(row.habit_id, Boolean(row.completed))
    }
    return map
  }, [checkins, todayKey])

  const todayDone = activeHabits.filter((h) => completedByHabit.get(h.id)).length
  const todayTotal = activeHabits.length
  const todayRatio = todayTotal ? todayDone / todayTotal : 0
  const todayXpEarned = useMemo(() => {
    let total = 0
    for (const row of checkins) {
      if (String(row.checkin_date) !== todayKey) continue
      if (!row.completed) continue
      const xp = Number(row.xp_awarded)
      if (Number.isFinite(xp) && xp > 0) total += Math.floor(xp)
    }
    return total
  }, [checkins, todayKey])

  const bestActiveStreak = useMemo(() => {
    let best = 0
    for (const habit of activeHabits) {
      const checked = completedByHabit.get(habit.id) === true
      const streak = perHabitStreakEndingOn(
        habit.id,
        checkins,
        checked ? todayKey : shiftLocalDateKey(todayKey, -1),
      )
      if (streak > best) best = streak
    }
    return best
  }, [activeHabits, checkins, completedByHabit, todayKey])

  const consistency7 = useMemo(
    () =>
      computeHabitConsistency(habits, checkins, {
        windowDays: 7,
        todayKey,
      }),
    [habits, checkins, todayKey],
  )
  const consistency30 = useMemo(
    () =>
      computeHabitConsistency(habits, checkins, {
        windowDays: 30,
        todayKey,
      }),
    [habits, checkins, todayKey],
  )
  const weekFocus = getThisWeekFocus()

  useEffect(() => {
    if (!xpBurst) return undefined
    const timer = window.setTimeout(() => setXpBurst(null), 900)
    return () => window.clearTimeout(timer)
  }, [xpBurst])

  useEffect(() => {
    if (!justCompletedId) return undefined
    const timer = window.setTimeout(() => setJustCompletedId(''), 650)
    return () => window.clearTimeout(timer)
  }, [justCompletedId])

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
          fetchHabitXpShare(user.id).catch(() => null),
        ])
        if (cancelled) return
        setHabits(nextHabits)
        setCheckins(nextCheckins)
        const preferShare =
          !share?.is_active &&
          Boolean(name) &&
          consumeOnboardingShareHint()
        setHasLeaderboardName(Boolean(name))
        setShareActive(Boolean(share?.is_active))
        setPublicXp(
          share?.is_active && Number.isFinite(Number(share?.lifetime_xp))
            ? Number(share.lifetime_xp)
            : null,
        )
        if (preferShare) {
          setShareMessage(
            'Setup tip: tap Share XP to appear on the Habit XP board.',
          )
        }
        evaluateHabitAchievementSignals(user.id, nextHabits, nextCheckins, todayKey)
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
        'Add a Leaderboard Name in Account Settings before sharing your XP.',
      )
      return
    }

    setShareBusy(true)
    setShareMessage('')
    try {
      const row = await setHabitXpShare(nextActive)
      setShareActive(Boolean(row?.is_active))
      setPublicXp(
        row?.is_active && Number.isFinite(Number(row?.lifetime_xp))
          ? Number(row.lifetime_xp)
          : null,
      )
      setShareMessage(
        row?.is_active
          ? 'Your lifetime habit XP is shared publicly (Leaderboard Name + XP only).'
          : 'XP sharing turned off. Your private habits and XP are unchanged.',
      )
      if (row?.is_active) {
        evaluateAchievements(user.id, { hasShare: true })
      }
    } catch (err) {
      setShareMessage(friendlyHabitXpShareError(err))
    } finally {
      setShareBusy(false)
    }
  }

  const toggleCheckin = async (habitId, nextCompleted) => {
    if (!user?.id) return
    setBusyHabitId(habitId)
    setError('')
    const previous = checkins
    const habit = activeHabits.find((h) => h.id === habitId)
    const preview = habit
      ? previewHabitXpForDate(habit, checkins, todayKey)
      : { xp: 0 }

    if (nextCompleted && preview.xp > 0) {
      setXpBurst({ id: `${habitId}-${Date.now()}`, amount: preview.xp })
      setJustCompletedId(habitId)
    }

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
          xp_awarded: nextCompleted ? preview.xp : 0,
          user_id: user.id,
        },
      ]
    })

    try {
      const saved = await setHabitCheckin(user.id, habitId, nextCompleted, todayKey)
      const nextCheckins = [
        ...checkins.filter(
          (r) => !(r.habit_id === habitId && String(r.checkin_date) === todayKey),
        ),
        saved,
      ]
      setCheckins(nextCheckins)
      evaluateHabitAchievementSignals(user.id, habits, nextCheckins, todayKey)
    } catch (err) {
      setCheckins(previous)
      setXpBurst(null)
      setJustCompletedId('')
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
      const nextHabits = [...habits.filter((h) => h.id !== row.id), row]
      setHabits(nextHabits)
      evaluateHabitAchievementSignals(user.id, nextHabits, checkins, todayKey)
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
      <main className="page habits-page habits-page-play">
        <GuestHabitsDemo
          onRequestAuth={onRequestAuth}
          onOpenTab={onOpenTab}
        />
      </main>
    )
  }

  const ringSize = 118
  const ringStroke = 8
  const ringRadius = (ringSize - ringStroke) / 2
  const ringCirc = 2 * Math.PI * ringRadius
  const levelOffset = ringCirc * (1 - levelState.progress)
  const dayCirc = 2 * Math.PI * 34
  const dayOffset = dayCirc * (1 - todayRatio)

  return (
    <main className="page habits-page habits-page-play">
      {xpBurst ? (
        <div className="habits-xp-burst" key={xpBurst.id} aria-hidden="true">
          +{xpBurst.amount} XP
        </div>
      ) : null}

      <header className="habits-hero" aria-labelledby="habits-title">
        <div className="habits-hero-copy">
          <p className="page-eyebrow">Daily run</p>
          <h1 id="habits-title">Habits</h1>
          <p className="habits-hero-date">
            {formatLocalDateLabel(todayKey, {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <p className="habits-hero-lead">
            Clear your cards. Stack XP. Keep the streak multiplier climbing.
          </p>
        </div>

        <div className="habits-level-orb" aria-live="polite">
          <svg
            className="habits-level-ring"
            width={ringSize}
            height={ringSize}
            viewBox={`0 0 ${ringSize} ${ringSize}`}
            aria-hidden="true"
          >
            <circle
              className="habits-level-ring-track"
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={ringRadius}
              fill="none"
              strokeWidth={ringStroke}
            />
            <circle
              className="habits-level-ring-fill"
              cx={ringSize / 2}
              cy={ringSize / 2}
              r={ringRadius}
              fill="none"
              strokeWidth={ringStroke}
              strokeDasharray={ringCirc}
              strokeDashoffset={levelOffset}
              strokeLinecap="square"
              transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`}
            />
          </svg>
          <div className="habits-level-orb-copy">
            <span className="habits-level-label">Level</span>
            <strong className="habits-level-value">{levelState.level}</strong>
          </div>
        </div>
      </header>

      <section className="habits-run-board" aria-label="XP progress">
        <div className="habits-run-stat">
          <span className="habits-run-kicker">Lifetime XP</span>
          <strong className="habits-run-value">
            {lifetimeXp.toLocaleString()}
          </strong>
          <span className="habits-run-sub">
            {levelState.xpIntoLevel.toLocaleString()} /{' '}
            {levelState.xpForNext.toLocaleString()} to Lv {levelState.level + 1}
          </span>
          <div
            className="habits-xp-meter"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(levelState.progress * 100)}
            aria-label="Progress to next level"
          >
            <span
              className="habits-xp-meter-fill"
              style={{ width: `${Math.round(levelState.progress * 100)}%` }}
            />
          </div>
        </div>

        <div className="habits-run-stat habits-run-stat-today">
          <div className="habits-day-ring-wrap" aria-hidden="true">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle
                className="habits-day-ring-track"
                cx="40"
                cy="40"
                r="34"
                fill="none"
                strokeWidth="7"
              />
              <circle
                className="habits-day-ring-fill"
                cx="40"
                cy="40"
                r="34"
                fill="none"
                strokeWidth="7"
                strokeDasharray={dayCirc}
                strokeDashoffset={dayOffset}
                strokeLinecap="square"
                transform="rotate(-90 40 40)"
              />
            </svg>
            <span className="habits-day-ring-label">
              {todayDone}/{todayTotal || 0}
            </span>
          </div>
          <div>
            <span className="habits-run-kicker">Today</span>
            <strong className="habits-run-value habits-run-value-sm">
              +{todayXpEarned} XP
            </strong>
            <span className="habits-run-sub">
              {bestActiveStreak > 0
                ? `Best streak ${bestActiveStreak} day${bestActiveStreak === 1 ? '' : 's'}`
                : 'Tap a card to start'}
            </span>
          </div>
        </div>

        {activeHabits.length > 0 ? (
          <div className="habits-run-stat habits-consistency-stat">
            <span className="habits-run-kicker">Consistency</span>
            <strong className="habits-run-value habits-run-value-sm">
              {consistency30.label}
            </strong>
            <span className="habits-run-sub">
              7d {consistency7.label} · 30d {consistency30.label} ·{' '}
              {consistencyTitle(consistency30.percent)}
            </span>
            <div
              className="habits-xp-meter"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={consistency30.percent}
              aria-label="30-day consistency"
            >
              <span
                className="habits-xp-meter-fill"
                style={{ width: `${consistency30.percent}%` }}
              />
            </div>
          </div>
        ) : null}
      </section>

      {weekFocus ? (
        <section className="habits-week-focus" aria-label={weekFocus.label}>
          <div>
            <p className="habits-week-focus-kicker">This Week’s Focus</p>
            <p className="habits-week-focus-title">{weekFocus.title}</p>
            <p className="calc-hint">{weekFocus.blurb}</p>
          </div>
          {weekFocus.tab && weekFocus.tab !== 'habits' ? (
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onOpenTab?.(weekFocus.tab)}
            >
              Open
            </button>
          ) : null}
        </section>
      ) : null}

      {error ? <p className="feedback feedback-error">{error}</p> : null}

      <div className="habits-toolbar-row">
        <div className="confirm-actions habits-toolbar">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setEditing((value) => !value)}
          >
            {editing ? 'Done editing' : 'Edit routine'}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => onOpenTab?.('leaderboard-habits')}
          >
            XP board
          </button>
        </div>
      </div>

      {!editing ? (
        <section
          className="habits-share-control habits-share-compact"
          aria-label="Habit XP sharing"
        >
          <UnitToggle
            className="is-compact is-stretch"
            label="XP privacy"
            value={shareActive ? 'share' : 'private'}
            options={[
              { value: 'private', label: 'Private' },
              { value: 'share', label: 'Share XP' },
            ]}
            onChange={(next) =>
              handleShareMode(next === 'share' ? 'global' : 'private')
            }
            disabled={shareBusy}
          />
          <p className="calc-hint leaderboard-share-hint">
            Public share shows name + lifetime XP only.
            {publicXp != null
              ? ` Live: ${publicXp.toLocaleString()} XP.`
              : ''}
          </p>
          {!hasLeaderboardName ? (
            <p className="feedback feedback-error" role="status">
              A Leaderboard Name is required to share your XP.{' '}
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
                  <span>
                    {habitDisplayName(habit)}
                    <span className="calc-hint"> · {habitBaseXp(habit)} XP</span>
                  </span>
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
                It leaves your active routine. Past check-ins and earned XP stay
                in history.
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
                <div className="habits-catalog-item-copy">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="habits-catalog-thumb"
                      width={56}
                      height={56}
                    />
                  ) : null}
                  <div>
                    <strong>{habitDisplayName(item)}</strong>
                    <p className="calc-hint">
                      {item.description} · {item.baseXp} XP
                    </p>
                  </div>
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
          <h2 className="result-section-title">Build your first run</h2>
          <p>
            Add a few cards you actually want to hit today. XP stays private
            until you choose to share.
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
        <section className="habits-cards" aria-label="Today habit cards">
          <div className="habits-cards-head">
            <h2 className="habits-cards-title">Today&apos;s cards</h2>
            <p className="calc-hint habits-cards-hint">
              Tap to complete · streak boosts XP up to 1.5×
            </p>
          </div>
          <ul className="habits-card-grid">
            {activeHabits.map((habit, index) => {
              const checked = completedByHabit.get(habit.id) === true
              const image = habitCardImage(habit)
              const preview = previewHabitXpForDate(habit, checkins, todayKey)
              const streak = perHabitStreakEndingOn(
                habit.id,
                checkins,
                checked ? todayKey : shiftLocalDateKey(todayKey, -1),
              )
              const multLabel = preview.multiplier
                .toFixed(2)
                .replace(/\.00$/, '')
                .replace(/(\.\d)0$/, '$1')
              return (
                <li
                  key={habit.id}
                  style={{ '--habit-card-i': index }}
                  className="habits-card-slot"
                >
                  <button
                    type="button"
                    className={`habit-card${checked ? ' is-done' : ''}${
                      busyHabitId === habit.id ? ' is-busy' : ''
                    }${justCompletedId === habit.id ? ' is-burst' : ''}${
                      weekFocus?.habitKey === habit.habit_key
                        ? ' is-week-focus'
                        : ''
                    }`}
                    disabled={busyHabitId === habit.id}
                    aria-pressed={checked}
                    aria-label={`${habit.habit_name}${checked ? ', completed' : ', not completed'}. ${preview.xp} XP`}
                    onClick={() => toggleCheckin(habit.id, !checked)}
                  >
                    <span
                      className="habit-card-media"
                      style={
                        image
                          ? { backgroundImage: `url(${image})` }
                          : undefined
                      }
                    >
                      {!image ? (
                        <span className="habit-card-emoji" aria-hidden="true">
                          {habitDisplayName(habit).split(' ').pop()}
                        </span>
                      ) : null}
                      <span className="habit-card-scrim" aria-hidden="true" />
                    </span>
                    <span className="habit-card-badges" aria-hidden="true">
                      {weekFocus?.habitKey === habit.habit_key ? (
                        <span className="habit-card-focus-chip">Focus</span>
                      ) : null}
                      <span className="habit-card-xp-chip">
                        {checked ? `+${preview.xp}` : preview.xp} XP
                      </span>
                      {streak > 0 ? (
                        <span className="habit-card-streak-chip">
                          {streak}d · {multLabel}×
                        </span>
                      ) : (
                        <span className="habit-card-streak-chip is-muted">
                          {multLabel}×
                        </span>
                      )}
                    </span>
                    <span className="habit-card-body">
                      <span className="habit-card-title">
                        {habit.habit_name || habitDisplayName(habit)}
                      </span>
                      <span className="habit-card-meta">
                        {checked ? 'Logged today' : 'Tap to log'}
                      </span>
                    </span>
                    <span className="habit-card-check" aria-hidden="true">
                      {checked ? '✓' : ''}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
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
