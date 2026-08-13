import { useEffect, useMemo, useRef, useState } from 'react'
import { buildGuestScoreShareCaption } from '../lib/shareCaption'
import { captureElementPng } from '../lib/captureElementPng'
import { useAuth } from '../auth/AuthContext'
import {
  useSyncedDefault,
  useUserDefaults,
} from '../auth/UserDefaultsContext'
import CalculatorTracking from '../components/CalculatorTracking'
import FitnessAwardsDisplay, {
  FitnessAwardsLegend,
} from '../components/FitnessAwardsDisplay'
import FpcScoreRing from '../components/FpcScoreRing'
import GuestBadgeShareModal from '../components/GuestBadgeShareModal'
import GuestSaveScorePrompt from '../components/GuestSaveScorePrompt'
import SeoIntro from '../components/SeoIntro'
import SoftReveal from '../components/SoftReveal'
import ResultShareActions from '../components/ResultShareActions'
import ShareClimaxBar from '../components/ShareClimaxBar'
import ShareMomentButton from '../components/ShareMomentButton'
import DemographicFields from '../components/DemographicFields'
import EpleyAccuracyNotice from '../components/EpleyAccuracyNotice'
import PeerComparison from '../components/PeerComparison'
import SharedDataNotification, {
  SharedInputShell,
} from '../components/SharedDataNotification'
import UnitToggle from '../components/UnitToggle'
import { isHighRepEpleyInput } from '../lib/epleyAccuracy'
import {
  calculateFitnessScore,
  calculateOneRepMax,
  calculateSbdTotal,
  convertMass,
  formatConverted,
  getRaceById,
  MASS_UNITS,
} from '../calculations'
import { STRENGTH_LIFTS } from '../data/strengthNorms'
import { BRAND, BRAND_CASING_CLASS } from '../data/brand'
import { SCORING_SEO } from '../data/seoCopy'
import { FPC_SCORE_LOCKED_PREVIEW } from '../components/tracking'
import {
  FPC_SCORE_CALCULATOR_TYPE,
  SCORING_TRACKS,
} from '../data/trackingTracks'
import {
  formatPublicAwardCaption,
  syncPublicAwardIdentityFromScores,
} from '../lib/awardIdentity'
import { detectAwardUnlocks, deriveAwards } from '../lib/fitnessAwards'
import {
  buildScoreShareMoment,
  requestShareMoment,
  shouldAutoPromptShareMoment,
  trackShareEvent,
} from '../lib/shareMoments'
import {
  fetchLatestFitnessScoreSnapshot,
  friendlyFitnessSnapshotError,
  saveFitnessScoreSnapshot,
} from '../lib/fitnessScoreSnapshots'
import { fetchPerformanceRecords } from '../lib/performanceRecords'
import { estimated5kAutofillPatch } from '../lib/runningTracking'

function toSeconds(hours, minutes, seconds) {
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
}

const ESTIMATED_5K_MILES = getRaceById('5k')?.miles ?? 3.10686

function ScoringPage({ onRequestAuth, onOpenTab }) {
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const { patchDefaults, isEstimated5kEdited } = useUserDefaults()
  const [massUnit, setMassUnit] = useSyncedDefault('massUnit', 'lb')
  const [scoreStrengthMode, setScoreStrengthMode] = useSyncedDefault(
    'scoreStrengthMode',
    'sbd',
  )
  const [weight, setWeight, weightShared] = useSyncedDefault('liftWeight', '')
  const [reps, setReps, repsShared] = useSyncedDefault('reps', '')
  const [bodyweight, setBodyweight, bodyweightShared] = useSyncedDefault(
    'bodyweight',
    '',
  )
  const [lift, setLift] = useSyncedDefault('lift', 'bench')
  const [benchWeight, setBenchWeight, benchWeightShared] = useSyncedDefault(
    'benchWeight',
    '',
  )
  const [benchReps, setBenchReps, benchRepsShared] = useSyncedDefault(
    'benchReps',
    '',
  )
  const [squatWeight, setSquatWeight, squatWeightShared] = useSyncedDefault(
    'squatWeight',
    '',
  )
  const [squatReps, setSquatReps, squatRepsShared] = useSyncedDefault(
    'squatReps',
    '',
  )
  const [deadliftWeight, setDeadliftWeight, deadliftWeightShared] =
    useSyncedDefault('deadliftWeight', '')
  const [deadliftReps, setDeadliftReps, deadliftRepsShared] = useSyncedDefault(
    'deadliftReps',
    '',
  )
  const [sbdTotalInput, setSbdTotalInput, sbdTotalShared] = useSyncedDefault(
    'sbdTotal',
    '',
  )
  const [bench1rm, setBench1rm, bench1rmShared] = useSyncedDefault(
    'bench1rm',
    '',
  )
  const [squat1rm, setSquat1rm, squat1rmShared] = useSyncedDefault(
    'squat1rm',
    '',
  )
  const [deadlift1rm, setDeadlift1rm, deadlift1rmShared] = useSyncedDefault(
    'deadlift1rm',
    '',
  )
  const [sbdInputMode, setSbdInputMode] = useSyncedDefault(
    'sbdInputMode',
    'calculate',
  )
  // Progressive disclosure: common path first; advanced strength modes on demand.
  const [showAdvancedStrength, setShowAdvancedStrength] = useState(
    () =>
      scoreStrengthMode !== 'sbd' ||
      sbdInputMode !== 'calculate' ||
      massUnit !== 'lb',
  )
  // Canonical endurance input: Estimated 5K from latest running save.
  const [hours, setHours, hoursShared] = useSyncedDefault('fiveKHours', '')
  const [minutes, setMinutes, minutesShared] = useSyncedDefault(
    'fiveKMinutes',
    '',
  )
  const [seconds, setSeconds, secondsShared] = useSyncedDefault(
    'fiveKSeconds',
    '',
  )
  const [age, setAge, ageShared] = useSyncedDefault('age', '')
  const [gender, setGender, genderShared] = useSyncedDefault('gender', '')
  const [snapshotWarning, setSnapshotWarning] = useState('')
  const [awardUnlockMessage, setAwardUnlockMessage] = useState('')
  const [shareClimax, setShareClimax] = useState(null)

  // Seed Estimated 5K from latest saved run (or clear). Skip if user is mid-edit.
  useEffect(() => {
    if (!isAuthenticated || !user?.id) return undefined

    let cancelled = false
    fetchPerformanceRecords(user.id, 'running')
      .then((rows) => {
        if (cancelled || isEstimated5kEdited()) return
        patchDefaults(estimated5kAutofillPatch(rows), {
          source: 'estimated5k-sync',
        })
      })
      .catch(() => {
        /* Leave defaults unchanged if history cannot be loaded. */
      })

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, user?.id, patchDefaults, isEstimated5kEdited])

  const handleMassUnitChange = (nextUnit) => {
    if (nextUnit === massUnit) return

    const convertField = (value) => {
      const num = Number(value)
      if (!Number.isFinite(num) || num <= 0 || value === '') return value
      return formatConverted(convertMass(num, massUnit, nextUnit), 1)
    }

    const keepShared = { keepShared: true }
    setWeight(convertField(weight), keepShared)
    setBodyweight(convertField(bodyweight), keepShared)
    setBenchWeight(convertField(benchWeight), keepShared)
    setSquatWeight(convertField(squatWeight), keepShared)
    setDeadliftWeight(convertField(deadliftWeight), keepShared)
    setSbdTotalInput(convertField(sbdTotalInput), keepShared)
    setBench1rm(convertField(bench1rm), keepShared)
    setSquat1rm(convertField(squat1rm), keepShared)
    setDeadlift1rm(convertField(deadlift1rm), keepShared)
    setMassUnit(nextUnit)
  }

  const result = useMemo(() => {
    const weightNum = Number(weight)
    const repsNum = Number(reps)
    const bodyweightNum = Number(bodyweight)
    const timeSeconds = toSeconds(hours, minutes, seconds)
    const ageNum = Number(age)
    const useSbd = scoreStrengthMode === 'sbd'

    let sbdTotal = null
    if (useSbd) {
      if (sbdInputMode === 'calculate') {
        const bench1rm = calculateOneRepMax(Number(benchWeight), Number(benchReps))
        const squat1rm = calculateOneRepMax(Number(squatWeight), Number(squatReps))
        const deadlift1rm = calculateOneRepMax(
          Number(deadliftWeight),
          Number(deadliftReps),
        )
        const hasAll =
          Number.isFinite(bench1rm) &&
          bench1rm > 0 &&
          Number.isFinite(squat1rm) &&
          squat1rm > 0 &&
          Number.isFinite(deadlift1rm) &&
          deadlift1rm > 0
        sbdTotal = hasAll
          ? calculateSbdTotal(bench1rm, squat1rm, deadlift1rm)
          : null
      } else {
        const bench = Number(bench1rm)
        const squat = Number(squat1rm)
        const deadlift = Number(deadlift1rm)
        const hasAll =
          Number.isFinite(bench) &&
          bench > 0 &&
          Number.isFinite(squat) &&
          squat > 0 &&
          Number.isFinite(deadlift) &&
          deadlift > 0
        sbdTotal = hasAll ? calculateSbdTotal(bench, squat, deadlift) : null
      }
    }

    const hasStrength = useSbd
      ? sbdTotal != null &&
        bodyweight !== '' &&
        Number.isFinite(bodyweightNum) &&
        bodyweightNum > 0
      : Number.isFinite(weightNum) &&
        weightNum > 0 &&
        Number.isFinite(repsNum) &&
        repsNum >= 1 &&
        bodyweight !== '' &&
        Number.isFinite(bodyweightNum) &&
        bodyweightNum > 0

    const hasRunning = Number.isFinite(timeSeconds) && timeSeconds > 0

    const hasDemographics =
      Number.isFinite(ageNum) &&
      ageNum >= 15 &&
      ageNum <= 100 &&
      Boolean(gender)

    if (!hasStrength || !hasRunning || !hasDemographics) {
      return {
        score: null,
        missing: {
          strength: !hasStrength,
          running: !hasRunning,
          demographics: !hasDemographics,
        },
      }
    }

    const score = calculateFitnessScore({
      weight: weightNum,
      reps: repsNum,
      bodyweight: bodyweightNum,
      lift,
      sbdTotal: useSbd ? sbdTotal : null,
      distanceMiles: ESTIMATED_5K_MILES,
      timeSeconds,
      age: ageNum,
      gender,
    })

    return { score, missing: null }
  }, [
    scoreStrengthMode,
    sbdInputMode,
    benchWeight,
    benchReps,
    squatWeight,
    squatReps,
    deadliftWeight,
    deadliftReps,
    bench1rm,
    squat1rm,
    deadlift1rm,
    sbdTotalInput,
    weight,
    reps,
    bodyweight,
    lift,
    hours,
    minutes,
    seconds,
    age,
    gender,
  ])

  const showSbdRecommendation = scoreStrengthMode === 'lift'

  const hint = (() => {
    if (!result.missing) return null
    const parts = []
    if (result.missing.strength) {
      parts.push(
        scoreStrengthMode === 'sbd'
          ? 'SBD Total and bodyweight'
          : 'strength (weight, reps, and bodyweight)',
      )
    }
    if (result.missing.running) {
      parts.push('Estimated 5K finish time')
    }
    if (result.missing.demographics) {
      parts.push('age and gender')
    }
    return `Add ${parts.join(' + ')} to calculate your ${BRAND.scoreName}.`
  })()

  useEffect(() => {
    if (result.score?.strengthScore == null) return
    const next = String(result.score.strengthScore)
    queueMicrotask(() => {
      patchDefaults({ strengthScore: next })
    })
  }, [result.score?.strengthScore, patchDefaults])

  const liveAwards = useMemo(() => {
    if (!result.score) return null
    return deriveAwards({
      runningScore: result.score.runningScore,
      strengthScore: result.score.strengthScore,
    })
  }, [result.score])

  const [guestBadgeShareOpen, setGuestBadgeShareOpen] = useState(false)
  const [guestBadgesRevealed, setGuestBadgesRevealed] = useState(false)
  const scoreCaptureRef = useRef(null)

  useEffect(() => {
    if (result.score) return undefined
    queueMicrotask(() => {
      setGuestBadgeShareOpen(false)
      setGuestBadgesRevealed(false)
    })
    return undefined
  }, [result.score])

  const openGuestBadgeShare = () => {
    if (!result.score) return
    setGuestBadgesRevealed(true)
    setGuestBadgeShareOpen(true)
    trackShareEvent('share_button_click', {
      type: 'score_saved',
      source: 'guest_show_badges',
      ok: true,
    })
  }

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">Overall performance</p>
        <h1 className={BRAND_CASING_CLASS}>{BRAND.scoreName}</h1>
        <p className="page-lead">
          One overall score from your strength and running percentiles.
        </p>
      </header>

      <form
        className="calc-form calc-form-wide"
        onSubmit={(event) => event.preventDefault()}
      >
        <SharedDataNotification
          sources={[
            weightShared,
            repsShared,
            bodyweightShared,
            benchWeightShared,
            benchRepsShared,
            squatWeightShared,
            squatRepsShared,
            deadliftWeightShared,
            deadliftRepsShared,
            sbdTotalShared,
            hoursShared,
            minutesShared,
            secondsShared,
            ageShared,
            genderShared,
          ]}
        />

        <fieldset className="score-block">
          <legend>Strength</legend>
          <p className="optional-note">
            Enter Bench, Squat, and Deadlift (weight × reps). Bodyweight is
            required for relative strength.
          </p>

          <div className="advanced-options-bar">
            <button
              type="button"
              className="text-link-button"
              aria-expanded={showAdvancedStrength}
              onClick={() => setShowAdvancedStrength((open) => !open)}
            >
              {showAdvancedStrength
                ? 'Hide options (units, single lift, known 1RMs)'
                : 'More options — single lift, units, known 1RMs'}
            </button>
          </div>

          <SoftReveal open={showAdvancedStrength}>
            <div className="advanced-options-panel">
              <UnitToggle
                label="Strength metric"
                value={scoreStrengthMode}
                options={[
                  { value: 'sbd', label: 'SBD Total' },
                  { value: 'lift', label: 'Single Lift' },
                ]}
                onChange={setScoreStrengthMode}
              />

              {showSbdRecommendation ? (
                <p className="score-recommendation">
                  For the most accurate {BRAND.scoreName} results, use your SBD
                  Total.
                </p>
              ) : null}

              <UnitToggle
                label="Weight units"
                value={massUnit}
                options={MASS_UNITS}
                onChange={handleMassUnitChange}
              />

              {scoreStrengthMode === 'sbd' ? (
                <UnitToggle
                  label="SBD Total input"
                  value={sbdInputMode}
                  options={[
                    {
                      value: 'calculate',
                      label: 'Calculate my SBD total',
                    },
                    { value: 'enter', label: 'I know my SBD total' },
                  ]}
                  onChange={setSbdInputMode}
                />
              ) : null}
            </div>
          </SoftReveal>

          {scoreStrengthMode === 'sbd' ? (
            <>
              {sbdInputMode === 'calculate' ? (
                <>
                  <fieldset className="sbd-lift-block">
                    <legend>Bench</legend>
                    <label className="field">
                      <span>Weight ({massUnit})</span>
                      <SharedInputShell shared={benchWeightShared}>
                        <input
                          type="number"
                          min="1"
                          step="any"
                          placeholder="135"
                          value={benchWeight}
                          onChange={(event) => setBenchWeight(event.target.value)}
                        />
                      </SharedInputShell>
                    </label>
                    <label className="field">
                      <span>Reps</span>
                      <SharedInputShell shared={benchRepsShared}>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          step="1"
                          placeholder="5"
                          value={benchReps}
                          onChange={(event) => setBenchReps(event.target.value)}
                        />
                      </SharedInputShell>
                    </label>
                    <EpleyAccuracyNotice show={isHighRepEpleyInput(benchReps)} />
                  </fieldset>
                  <fieldset className="sbd-lift-block">
                    <legend>Squat</legend>
                    <label className="field">
                      <span>Weight ({massUnit})</span>
                      <SharedInputShell shared={squatWeightShared}>
                        <input
                          type="number"
                          min="1"
                          step="any"
                          placeholder="185"
                          value={squatWeight}
                          onChange={(event) => setSquatWeight(event.target.value)}
                        />
                      </SharedInputShell>
                    </label>
                    <label className="field">
                      <span>Reps</span>
                      <SharedInputShell shared={squatRepsShared}>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          step="1"
                          placeholder="5"
                          value={squatReps}
                          onChange={(event) => setSquatReps(event.target.value)}
                        />
                      </SharedInputShell>
                    </label>
                    <EpleyAccuracyNotice show={isHighRepEpleyInput(squatReps)} />
                  </fieldset>
                  <fieldset className="sbd-lift-block">
                    <legend>Deadlift</legend>
                    <label className="field">
                      <span>Weight ({massUnit})</span>
                      <SharedInputShell shared={deadliftWeightShared}>
                        <input
                          type="number"
                          min="1"
                          step="any"
                          placeholder="225"
                          value={deadliftWeight}
                          onChange={(event) =>
                            setDeadliftWeight(event.target.value)
                          }
                        />
                      </SharedInputShell>
                    </label>
                    <label className="field">
                      <span>Reps</span>
                      <SharedInputShell shared={deadliftRepsShared}>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          step="1"
                          placeholder="5"
                          value={deadliftReps}
                          onChange={(event) => setDeadliftReps(event.target.value)}
                        />
                      </SharedInputShell>
                    </label>
                    <EpleyAccuracyNotice
                      show={isHighRepEpleyInput(deadliftReps)}
                    />
                  </fieldset>
                </>
              ) : (
                <>
                  <label className="field">
                    <span>Bench 1RM ({massUnit})</span>
                    <SharedInputShell shared={bench1rmShared}>
                      <input
                        type="number"
                        min="1"
                        step="any"
                        placeholder="275"
                        value={bench1rm}
                        onChange={(event) => setBench1rm(event.target.value)}
                      />
                    </SharedInputShell>
                  </label>
                  <label className="field">
                    <span>Squat 1RM ({massUnit})</span>
                    <SharedInputShell shared={squat1rmShared}>
                      <input
                        type="number"
                        min="1"
                        step="any"
                        placeholder="315"
                        value={squat1rm}
                        onChange={(event) => setSquat1rm(event.target.value)}
                      />
                    </SharedInputShell>
                  </label>
                  <label className="field">
                    <span>Deadlift 1RM ({massUnit})</span>
                    <SharedInputShell shared={deadlift1rmShared}>
                      <input
                        type="number"
                        min="1"
                        step="any"
                        placeholder="405"
                        value={deadlift1rm}
                        onChange={(event) => setDeadlift1rm(event.target.value)}
                      />
                    </SharedInputShell>
                  </label>
                </>
              )}
            </>
          ) : (
            <>
              <label className="field">
                <span>Weight lifted ({massUnit})</span>
                <SharedInputShell shared={weightShared}>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    placeholder="155"
                    value={weight}
                    onChange={(event) => {
                      const next = event.target.value
                      setWeight(next)
                      if (lift === 'bench') setBenchWeight(next)
                      if (lift === 'squat') setSquatWeight(next)
                      if (lift === 'deadlift') setDeadliftWeight(next)
                    }}
                  />
                </SharedInputShell>
              </label>

              <label className="field">
                <span>Reps completed</span>
                <SharedInputShell shared={repsShared}>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    step="1"
                    placeholder="5"
                    value={reps}
                    onChange={(event) => {
                      const next = event.target.value
                      setReps(next)
                      if (lift === 'bench') setBenchReps(next)
                      if (lift === 'squat') setSquatReps(next)
                      if (lift === 'deadlift') setDeadliftReps(next)
                    }}
                  />
                </SharedInputShell>
              </label>
              <EpleyAccuracyNotice show={isHighRepEpleyInput(reps)} />

              <label className="field">
                <span>Lift</span>
                <select
                  value={lift}
                  onChange={(event) => {
                    const nextLift = event.target.value
                    setLift(nextLift)
                    if (nextLift === 'bench') {
                      if (benchWeight !== '' || benchReps !== '') {
                        setWeight(benchWeight)
                        setReps(benchReps)
                      }
                    } else if (nextLift === 'squat') {
                      if (squatWeight !== '' || squatReps !== '') {
                        setWeight(squatWeight)
                        setReps(squatReps)
                      }
                    } else if (nextLift === 'deadlift') {
                      if (deadliftWeight !== '' || deadliftReps !== '') {
                        setWeight(deadliftWeight)
                        setReps(deadliftReps)
                      }
                    }
                  }}
                >
                  {STRENGTH_LIFTS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}

          <label className="field">
            <span>Bodyweight ({massUnit})</span>
            <SharedInputShell shared={bodyweightShared}>
              <input
                type="number"
                min="1"
                step="any"
                placeholder="175"
                value={bodyweight}
                onChange={(event) => setBodyweight(event.target.value)}
              />
            </SharedInputShell>
          </label>
        </fieldset>

        <fieldset className="score-block">
          <legend>Running</legend>
          <p className="optional-note">
            Estimated 5K finish time (autofills from a saved Running result when
            available).
          </p>

          <label className="field">
            <span>Distance</span>
            <input type="text" value="Estimated 5K" disabled readOnly />
          </label>

          <div
            className="field-group"
            role="group"
            aria-label="Estimated 5K finish time"
          >
            <span className="field-group-label">Estimated 5K finish time</span>
            <div className="field-row">
              <label className="field field-compact">
                <span>Hour</span>
                <SharedInputShell shared={hoursShared}>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0"
                    value={hours}
                    onChange={(event) => setHours(event.target.value)}
                  />
                </SharedInputShell>
              </label>
              <label className="field field-compact">
                <span>Min</span>
                <SharedInputShell shared={minutesShared}>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    placeholder="30"
                    value={minutes}
                    onChange={(event) => setMinutes(event.target.value)}
                  />
                </SharedInputShell>
              </label>
              <label className="field field-compact">
                <span>Sec</span>
                <SharedInputShell shared={secondsShared}>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    placeholder="0"
                    value={seconds}
                    onChange={(event) => setSeconds(event.target.value)}
                  />
                </SharedInputShell>
              </label>
            </div>
          </div>
        </fieldset>

        <DemographicFields
          age={age}
          gender={gender}
          onAgeChange={setAge}
          onGenderChange={setGender}
          ageShared={ageShared}
          genderShared={genderShared}
          legend="Age & gender (required for scoring)"
          note={`Age and gender are required for ${BRAND.scoreName} so both percentiles use the same published age/sex reference groups.`}
        />
      </form>

      {result.score ? (
        <section className="results" aria-live="polite">
          <div className="scoring-awards-block">
            {authLoading ? (
              <FpcScoreRing
                score={result.score.FPCScore}
                secondary={`${result.score.band} · ${result.score.balance}`}
              />
            ) : isAuthenticated ? (
              <div ref={scoreCaptureRef} className="scoring-share-capture">
                <FitnessAwardsDisplay
                  awards={liveAwards}
                  runningScore={result.score.runningScore}
                  strengthScore={result.score.strengthScore}
                >
                  <FpcScoreRing
                    score={result.score.FPCScore}
                    secondary={`${result.score.band} · ${result.score.balance}`}
                  />
                </FitnessAwardsDisplay>
                <FitnessAwardsLegend awards={liveAwards} />
              </div>
            ) : guestBadgesRevealed ? (
              <div className="scoring-guest-score is-revealed">
                <FitnessAwardsDisplay
                  awards={liveAwards}
                  runningScore={result.score.runningScore}
                  strengthScore={result.score.strengthScore}
                >
                  <FpcScoreRing
                    score={result.score.FPCScore}
                    secondary={`${result.score.band} · ${result.score.balance}`}
                  />
                </FitnessAwardsDisplay>
                <FitnessAwardsLegend awards={liveAwards} />
                <button
                  type="button"
                  className="btn btn-primary scoring-show-badges-btn"
                  onClick={openGuestBadgeShare}
                  aria-haspopup="dialog"
                >
                  Share your badges
                </button>
              </div>
            ) : (
              <div className="scoring-guest-score">
                <FpcScoreRing
                  score={result.score.FPCScore}
                  secondary={`${result.score.band} · ${result.score.balance}`}
                />
                <button
                  type="button"
                  className="btn btn-primary scoring-show-badges-btn is-enticing is-irresistible"
                  onClick={openGuestBadgeShare}
                  aria-haspopup="dialog"
                >
                  <span className="scoring-show-badges-ping" aria-hidden="true" />
                  <span className="scoring-show-badges-spark" aria-hidden="true" />
                  <span className="scoring-show-badges-label">Reveal your badges</span>
                </button>
              </div>
            )}
          </div>
        </section>
      ) : (
        <p className="calc-hint">{hint}</p>
      )}

      {result.score && !authLoading && !isAuthenticated ? (
        <GuestBadgeShareModal
          open={guestBadgeShareOpen}
          onClose={() => setGuestBadgeShareOpen(false)}
          score={result.score.FPCScore}
          band={result.score.band}
          balance={result.score.balance}
          strengthScore={result.score.strengthScore}
          runningScore={result.score.runningScore}
          awards={liveAwards}
          onRequestAuth={onRequestAuth}
        />
      ) : null}

      {result.score && !authLoading && !isAuthenticated ? (
        <GuestSaveScorePrompt
          score={result.score.FPCScore}
          onRequestAuth={onRequestAuth}
        />
      ) : null}

      {snapshotWarning ? (
        <p className="feedback feedback-error" role="status">
          {snapshotWarning}
        </p>
      ) : null}

      <CalculatorTracking
        calculatorType={FPC_SCORE_CALCULATOR_TYPE}
        tracks={SCORING_TRACKS}
        activeTrackId="fpc-score"
        resultValue={result.score?.FPCScore}
        resultUnit="points"
        hasResult={Boolean(result.score)}
        summaryVariant="score"
        saveLabel={`Save ${BRAND.scoreName}`}
        sampleKind="score"
        lockedPreview={FPC_SCORE_LOCKED_PREVIEW}
        onRequestAuth={onRequestAuth}
        onOpenTab={onOpenTab}
        saveFeedback={awardUnlockMessage}
        resultShare={
          result.score ? (
            <div className="scoring-share-stack">
              <ShareMomentButton
                type="score_saved"
                title="myKinesoScore"
                primary={String(Math.round(result.score.FPCScore))}
                secondary={`${result.score.band} · Strength + Running`}
                filename="kinesoscore-badges.png"
                fitnessScore={result.score.FPCScore}
                strengthScore={result.score.strengthScore}
                runningScore={result.score.runningScore}
                awards={liveAwards}
                captureElement={() => scoreCaptureRef.current}
                captionOverride={buildGuestScoreShareCaption(
                  {
                    fitnessScore: result.score.FPCScore,
                    strengthScore: result.score.strengthScore,
                    runningScore: result.score.runningScore,
                    band: `${result.score.band} · ${result.score.balance}`,
                  },
                  { platform: 'generic' },
                )}
                label="Share image"
                className="btn btn-primary"
              />
              <ResultShareActions
                title={BRAND.scoreName}
                text={(() => {
                  const awardLine = formatPublicAwardCaption(liveAwards)
                  const base = `Just scored ${result.score.FPCScore} on ${BRAND.scoreName} — ${result.score.band}. What’s yours?`
                  return awardLine ? `${base} ${awardLine}.` : base
                })()}
                url={
                  typeof window !== 'undefined'
                    ? `${window.location.origin}/scoring`
                    : 'https://kinesoscore.com/scoring'
                }
              />
            </div>
          ) : null
        }
        onSaved={async ({ recordId }) => {
          if (!user?.id || !recordId || !result.score) return
          setSnapshotWarning('')
          setAwardUnlockMessage('')
          try {
            let previousAwards = null
            try {
              const prior = await fetchLatestFitnessScoreSnapshot(user.id)
              if (prior) {
                previousAwards = deriveAwards({
                  runningScore: prior.running_score,
                  strengthScore: prior.strength_score,
                })
              }
            } catch {
              previousAwards = null
            }

            await saveFitnessScoreSnapshot({
              userId: user.id,
              sourceRecordId: recordId,
              fitnessScore: result.score.FPCScore,
              strengthScore: result.score.strengthScore,
              runningScore: result.score.runningScore,
            })

            const nextAwards = deriveAwards({
              runningScore: result.score.runningScore,
              strengthScore: result.score.strengthScore,
            })
            const unlocks = detectAwardUnlocks(previousAwards, nextAwards)
            if (unlocks.length) {
              setAwardUnlockMessage(unlocks.join(' · '))
            }

            try {
              await syncPublicAwardIdentityFromScores(user.id, {
                runningScore: result.score.runningScore,
                strengthScore: result.score.strengthScore,
              })
            } catch {
              // Opt-in public badges are best-effort; private snapshot already saved.
            }

            const moment = buildScoreShareMoment({
              fitnessScore: result.score.FPCScore,
              strengthScore: result.score.strengthScore,
              runningScore: result.score.runningScore,
              awards: nextAwards,
              unlock: unlocks.length > 0,
            })
            setShareClimax(moment)

            const promptType = unlocks.length ? 'award_unlock' : 'score_saved'
            if (shouldAutoPromptShareMoment(promptType)) {
              const captionOverride = buildGuestScoreShareCaption(
                {
                  fitnessScore: result.score.FPCScore,
                  strengthScore: result.score.strengthScore,
                  runningScore: result.score.runningScore,
                  band: `${result.score.band} · ${result.score.balance}`,
                },
                { platform: 'generic' },
              )
              const openCaptured = async () => {
                try {
                  await new Promise((r) => setTimeout(r, 80))
                  const node = scoreCaptureRef.current
                  const imageBlob = node
                    ? await captureElementPng(node, {
                        pixelRatio: 2,
                        backgroundColor: '#0b100e',
                      })
                    : null
                  requestShareMoment({
                    ...moment,
                    type: promptType,
                    filename: 'kinesoscore-badges.png',
                    captionOverride,
                    imageBlob,
                    autoOpen: true,
                  })
                } catch {
                  requestShareMoment({
                    ...moment,
                    type: promptType,
                    autoOpen: true,
                  })
                }
              }
              void openCaptured()
            }
          } catch (err) {
            // Performance save already succeeded; snapshot is private enrichment.
            setSnapshotWarning(
              friendlyFitnessSnapshotError(
                err,
                'Score saved, but awards snapshot could not be stored. Dashboard awards may be incomplete until you save again.',
              ),
            )
          }
        }}
        onDeleted={async () => {
          setSnapshotWarning('')
          setAwardUnlockMessage('')
          setShareClimax(null)
          // Jump-discard (or history delete) removes the snapshot with the
          // record — re-sync public crests from whatever snapshot remains.
          if (!user?.id) return
          try {
            await syncPublicAwardIdentityFromScores(user.id)
          } catch {
            // Best-effort; Keep private / missing 015 should not block delete.
          }
        }}
      />

      {shareClimax ? (
        <ShareClimaxBar
          moment={shareClimax}
          captureElement={() => scoreCaptureRef.current}
          onDismiss={() => setShareClimax(null)}
        />
      ) : null}

      {result.score ? (
        <section className="results results-followup" aria-live="polite">
          <div className="result-table-wrap">
            <h2 className="result-section-title">Score breakdown</h2>
            <ul className="result-table">
              <li>
                <span>
                  {result.score.strengthMetric === 'sbd'
                    ? 'SBD Total'
                    : 'Estimated 1RM'}
                </span>
                <strong>
                  {result.score.oneRepMax} {massUnit}
                </strong>
              </li>
              <li>
                <span>
                  {result.score.strengthMetric === 'sbd'
                    ? 'Total / bodyweight'
                    : '1RM / bodyweight'}
                </span>
                <strong>{result.score.ratio.toFixed(2)}×</strong>
              </li>
              <li>
                <span>Strength percentile</span>
                <strong>
                  {result.score.strengthPeer.percentileLabel} (better than{' '}
                  {result.score.strengthScore}%)
                </strong>
              </li>
              <li>
                <span>Equivalent 5K</span>
                <strong>{result.score.runningPeer.fiveKLabel}</strong>
              </li>
              <li>
                <span>Running percentile</span>
                <strong>
                  {result.score.runningPeer.percentileLabel} (better than{' '}
                  {result.score.runningScore}%)
                </strong>
              </li>
              <li>
                <span>Composite method</span>
                <strong>Equal average of both sides</strong>
              </li>
            </ul>
          </div>

          <PeerComparison
            title="What this means"
            headline={result.score.summary}
            details={[
              {
                label: 'Estimated percentile',
                value: `${result.score.percentileLabel} (better than ${result.score.FPCScore}%)`,
              },
              {
                label: 'Comparison group',
                value: `${result.score.strengthPeer.genderLabel}; strength ages ${result.score.strengthPeer.ageLabel}, running ages ${result.score.runningPeer.ageLabel}`,
              },
              {
                label: 'Strength reference',
                value: 'Recreational lifters / average gym-goers',
              },
              {
                label: 'Running reference',
                value: 'Race finishers (RunRepeat dataset)',
              },
            ]}
            source={result.score.source}
          />
        </section>
      ) : null}

      <SeoIntro
        title={SCORING_SEO.title}
        faqs={SCORING_SEO.faqs}
        relatedNote={SCORING_SEO.learnMoreNote || SCORING_SEO.relatedNote}
        onNavigate={onOpenTab}
      >
        {SCORING_SEO.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </SeoIntro>
    </main>
  )
}

export default ScoringPage
