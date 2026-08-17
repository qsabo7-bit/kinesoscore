import { useEffect, useId, useState } from 'react'
import { BRAND } from '../data/brand'
import {
  LEADERBOARD_NAME_MAX,
  fetchLeaderboardName,
  friendlyLeaderboardError,
  saveLeaderboardName,
  validateLeaderboardName,
} from '../lib/leaderboardProfile'
import {
  ONBOARDING_TRACKS,
  markOnboardingCompleted,
  markOnboardingShareHint,
  markOnboardingSkipped,
  trackById,
} from '../lib/onboarding'
import {
  requestShareMoment,
  shouldAutoPromptShareMoment,
} from '../lib/shareMoments'
import { evaluateAchievements } from '../lib/achievements'
import ShareMomentButton from './ShareMomentButton'

/**
 * Day One quest: pick track → Leaderboard Name → first action.
 */
function OnboardingWizard({ userId, onOpenTab, onDismiss }) {
  const [step, setStep] = useState(1)
  const [trackId, setTrackId] = useState(null)
  const [nameDraft, setNameDraft] = useState('')
  const [savedName, setSavedName] = useState(null)
  const [loadingName, setLoadingName] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const nameId = useId()

  useEffect(() => {
    if (!userId) return undefined
    let cancelled = false
    setLoadingName(true)
    fetchLeaderboardName(userId)
      .then((name) => {
        if (cancelled) return
        setSavedName(name)
        setNameDraft(name || '')
      })
      .catch(() => {
        if (cancelled) return
        setSavedName(null)
      })
      .finally(() => {
        if (!cancelled) setLoadingName(false)
      })
    return () => {
      cancelled = true
    }
  }, [userId])

  const track = trackById(trackId)
  const hasName = Boolean(savedName)

  const finishAndGo = () => {
    markOnboardingCompleted(userId, trackId)
    markOnboardingShareHint()
    evaluateAchievements(userId, {
      dayOneQuest: true,
      hasLeaderboardName: Boolean(savedName || String(nameDraft || '').trim()),
    })
    const name = savedName || String(nameDraft || '').trim()
    if (name && shouldAutoPromptShareMoment('onboarding_complete')) {
      requestShareMoment({
        type: 'onboarding_complete',
        title: 'Welcome',
        primary: name,
        secondary: 'Leaderboard Name',
        filename: 'kinesoscore-welcome.png',
        athleteName: name,
        autoOpen: true,
      })
    }
    onDismiss?.()
    onOpenTab?.(track?.tab || 'scoring')
  }

  const handleSkip = () => {
    markOnboardingSkipped(userId)
    onDismiss?.()
  }

  const handlePickTrack = (id) => {
    setTrackId(id)
    setError('')
    if (hasName) {
      setStep(3)
    } else {
      setStep(2)
    }
  }

  const handleSaveName = async (event) => {
    event.preventDefault()
    if (!userId || busy) return
    setBusy(true)
    setError('')
    const checked = validateLeaderboardName(nameDraft)
    if (!checked.ok) {
      setError(checked.error)
      setBusy(false)
      return
    }
    try {
      const name = await saveLeaderboardName(userId, checked.name)
      setSavedName(name)
      setNameDraft(name)
      evaluateAchievements(userId, { hasLeaderboardName: true })
      setStep(3)
    } catch (err) {
      setError(
        err?.code === 'VALIDATION'
          ? err.message
          : friendlyLeaderboardError(err),
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <section
      className="onboarding-wizard account-card"
      aria-labelledby="onboarding-title"
    >
      <div className="onboarding-wizard-top">
        <div>
          <p className="page-eyebrow">Day One quest</p>
          <h2 id="onboarding-title" className="result-section-title">
            Start your run on {BRAND.short}
          </h2>
        </div>
        <button
          type="button"
          className="text-link-button onboarding-skip"
          onClick={handleSkip}
        >
          Skip for now
        </button>
      </div>

      <ol className="onboarding-steps" aria-label="Day One steps">
        {[1, 2, 3].map((n) => (
          <li
            key={n}
            className={`onboarding-step-dot${step === n ? ' is-active' : ''}${
              step > n ? ' is-done' : ''
            }`}
            aria-current={step === n ? 'step' : undefined}
          >
            {n}
          </li>
        ))}
      </ol>

      {step === 1 ? (
        <div className="onboarding-panel">
          <p className="onboarding-lead">
            Step 1 — Pick your first track.
          </p>
          <div className="onboarding-track-grid" role="list">
            {ONBOARDING_TRACKS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`onboarding-track${
                  trackId === item.id ? ' is-active' : ''
                }`}
                onClick={() => handlePickTrack(item.id)}
              >
                <span className="onboarding-track-label">{item.label}</span>
                <span className="onboarding-track-blurb">{item.blurb}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {step === 2 ? (
        <form className="onboarding-panel auth-form" onSubmit={handleSaveName}>
          <p className="onboarding-lead">
            Step 2 — Claim a Leaderboard Name (what others see when you share).
          </p>
          {loadingName ? (
            <p className="calc-hint">Loading…</p>
          ) : (
            <>
              <label htmlFor={nameId}>
                Leaderboard Name
                <input
                  id={nameId}
                  type="text"
                  value={nameDraft}
                  onChange={(e) => {
                    setNameDraft(e.target.value)
                    setError('')
                  }}
                  maxLength={LEADERBOARD_NAME_MAX}
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="e.g. IronPace"
                  disabled={busy}
                />
              </label>
              <p className="calc-hint">
                3–24 characters · letters, numbers, _ and -
              </p>
              {error ? (
                <p className="feedback feedback-error" role="alert">
                  {error}
                </p>
              ) : null}
              <div className="confirm-actions">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setStep(1)}
                  disabled={busy}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={busy || !String(nameDraft).trim()}
                >
                  {busy ? 'Saving…' : 'Continue'}
                </button>
              </div>
            </>
          )}
        </form>
      ) : null}

      {step === 3 ? (
        <div className="onboarding-panel">
          <p className="onboarding-lead">
            {track?.id === 'habits' ? (
              <>
                Step 3 — Open Habits, add a few cards, log one today, then share
                XP when you&apos;re ready.
              </>
            ) : (
              <>
                Step 3 — Calculate on{' '}
                <strong>{track?.label || 'your track'}</strong>, save it, and
                choose <strong>Share globally</strong> to land on This Week.
              </>
            )}
          </p>
          {savedName ? (
            <p className="calc-hint">
              Competing as <strong>{savedName}</strong>
            </p>
          ) : null}
          {savedName ? (
            <ShareMomentButton
              type="onboarding_complete"
              title="Welcome"
              primary={savedName}
              secondary="Leaderboard Name"
              filename="kinesoscore-welcome.png"
              athleteName={savedName}
              label="Share your name card"
              className="btn btn-ghost"
            />
          ) : null}
          <div className="confirm-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setStep(hasName ? 1 : 2)}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={finishAndGo}
            >
              {track?.id === 'habits' ? 'Open Habits' : 'Go calculate'}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default OnboardingWizard
