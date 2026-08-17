import { useMemo, useState } from 'react'
import {
  habitBaseXp,
  habitCardImage,
  habitCatalogByKey,
  habitDisplayName,
} from '../data/habitCatalog'
import { getThisWeekFocus } from '../lib/weekFocus'

const DEFAULT_DEMO_KEYS = ['water', 'sleep_7_8', 'strength']
const STORAGE_KEY = 'ks:habit-demo:v1'

function demoKeysForFocus(focus) {
  const keys = [...DEFAULT_DEMO_KEYS]
  const focusKey = focus?.habitKey
  if (focusKey && habitCatalogByKey(focusKey)) {
    if (!keys.includes(focusKey)) keys[keys.length - 1] = focusKey
    return [focusKey, ...keys.filter((key) => key !== focusKey)].slice(0, 3)
  }
  return keys
}

function readDemoDone() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function writeDemoDone(map) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch {
    // ignore
  }
}

/**
 * Guest Habit demo: tap 3 picture cards locally, then create account to keep XP.
 */
function GuestHabitsDemo({ onRequestAuth, onOpenTab }) {
  const focus = getThisWeekFocus()
  const demoKeys = useMemo(() => demoKeysForFocus(focus), [focus])
  const [done, setDone] = useState(readDemoDone)
  const [burstKey, setBurstKey] = useState('')
  const cards = useMemo(
    () => demoKeys.map((key) => habitCatalogByKey(key)).filter(Boolean),
    [demoKeys],
  )

  const completed = demoKeys.filter((key) => done[key]).length
  const xpEarned = demoKeys.reduce((sum, key) => {
    if (!done[key]) return sum
    return sum + habitBaseXp(key)
  }, 0)

  const toggle = (key) => {
    setDone((prev) => {
      const nextOn = !prev[key]
      if (nextOn) setBurstKey(key)
      const next = { ...prev, [key]: nextOn }
      writeDemoDone(next)
      return next
    })
  }

  return (
    <section className="guest-habits-demo" aria-labelledby="guest-habits-title">
      <header className="guest-habits-demo-header">
        <p className="page-eyebrow">Try the daily run</p>
        <h1 id="guest-habits-title">Habits</h1>
        <p className="guest-habits-demo-lead">
          Tap a few cards. Stack demo XP. Create an account to keep your level —
          lifetime XP can be shared, never which habits you track.
        </p>
        {focus ? (
          <p className="guest-habits-demo-focus">
            This Week’s Focus · <strong>{focus.title}</strong>
          </p>
        ) : null}
      </header>

      <div className="guest-habits-demo-stats" aria-live="polite">
        <span>
          Today {completed}/{demoKeys.length}
        </span>
        <span>+{xpEarned} XP (demo)</span>
      </div>

      <ul className="habits-card-grid guest-habits-demo-grid">
        {cards.map((habit, index) => {
          const checked = Boolean(done[habit.key])
          const image = habitCardImage(habit)
          const xp = habitBaseXp(habit)
          const isFocus = focus?.habitKey === habit.key
          return (
            <li key={habit.key} style={{ '--habit-card-i': index }}>
              <button
                type="button"
                className={`habit-card${checked ? ' is-done' : ''}${
                  burstKey === habit.key ? ' is-burst' : ''
                }${isFocus ? ' is-week-focus' : ''}`}
                aria-pressed={checked}
                onClick={() => toggle(habit.key)}
                onAnimationEnd={() => {
                  if (burstKey === habit.key) setBurstKey('')
                }}
              >
                <span
                  className="habit-card-media"
                  style={
                    image ? { backgroundImage: `url(${image})` } : undefined
                  }
                >
                  <span className="habit-card-scrim" aria-hidden="true" />
                  <span className="habit-card-badges">
                    {isFocus ? (
                      <span className="habit-card-focus-chip">Focus</span>
                    ) : null}
                    <span className="habit-card-xp-chip">{xp} XP</span>
                  </span>
                </span>
                <span className="habit-card-body">
                  <span className="habit-card-title">
                    {habitDisplayName(habit)}
                  </span>
                  <span className="habit-card-meta">
                    {checked ? 'Logged · demo' : 'Tap to complete'}
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

      <div className="guest-habits-demo-cta account-card">
        <p className="guest-habits-demo-cta-title">Keep your XP for real</p>
        <p className="calc-hint">
          Demo progress stays on this device. Sign up to sync check-ins, levels,
          and the Habit XP board.
        </p>
        <div className="confirm-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onRequestAuth?.('signup')}
          >
            Create account to keep XP
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => onRequestAuth?.('login')}
          >
            Log in
          </button>
        </div>
        <button
          type="button"
          className="guest-habits-demo-board"
          onClick={() => onOpenTab?.('leaderboard-habits')}
        >
          View XP board
        </button>
      </div>
    </section>
  )
}

export default GuestHabitsDemo
