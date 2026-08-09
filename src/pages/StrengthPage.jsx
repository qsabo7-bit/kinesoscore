import { useEffect, useMemo, useRef, useState } from 'react'
import { useSyncedDefault } from '../auth/UserDefaultsContext'
import CalculatorTracking from '../components/CalculatorTracking'
import DemographicFields from '../components/DemographicFields'
import EpleyAccuracyNotice from '../components/EpleyAccuracyNotice'
import PeerComparison from '../components/PeerComparison'
import ResultShareActions from '../components/ResultShareActions'
import SeoIntro from '../components/SeoIntro'
import { BRAND } from '../data/brand'
import { isHighRepEpleyInput } from '../lib/epleyAccuracy'
import SharedDataNotification, {
  SharedInputShell,
} from '../components/SharedDataNotification'
import UnitToggle from '../components/UnitToggle'
import { STRENGTH_SEO } from '../data/seoCopy'
import {
  calculateOneRepMax,
  calculateSbdTotal,
  compareSbdToNorms,
  compareStrengthToNorms,
  convertMass,
  estimateOneRepMax,
  formatConverted,
  getSbdStrengthLevel,
  getStrengthLevel,
  getStrengthLevelFromPercentile,
  MASS_UNITS,
} from '../calculations'
import {
  SBD_TOTAL_MODE_ID,
  STRENGTH_LIFTS,
  STRENGTH_MODES,
} from '../data/strengthNorms'
import {
  STRENGTH_GRAPH_TRACKS,
} from '../data/trackingTracks'
import { LIFT_INPUT_KEYS } from '../lib/liftInputs'

const SBD_INPUT_OPTIONS = [
  { value: 'calculate', label: 'Calculate my SBD total' },
  { value: 'enter', label: 'I know my SBD total' },
]

const LIFT_ENTRY_OPTIONS = [
  { value: 'reps', label: 'Weight + reps' },
  { value: 'known', label: 'Known 1RM' },
]

function parseLiftSet(weight, reps) {
  const weightNum = Number(weight)
  const repsNum = Number(reps)
  if (
    !Number.isFinite(weightNum) ||
    !Number.isFinite(repsNum) ||
    weightNum <= 0 ||
    repsNum < 1
  ) {
    return null
  }
  return {
    weight: weightNum,
    reps: repsNum,
    oneRepMax: calculateOneRepMax(weightNum, repsNum),
    rawOneRepMax: estimateOneRepMax(weightNum, repsNum),
  }
}

function StrengthPage({ onRequestAuth, onOpenTab }) {
  const [saveHost, setSaveHost] = useState(null)
  const [massUnit, setMassUnit] = useSyncedDefault('massUnit', 'lb')
  const [strengthTab, setStrengthTab] = useSyncedDefault(
    'strengthTab',
    'sbd-total',
  )
  const [lift, setLift] = useSyncedDefault('lift', 'bench')
  const [legacyWeight, setLegacyWeight] = useSyncedDefault('liftWeight', '')
  const [legacyReps, setLegacyReps] = useSyncedDefault('reps', '')

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

  const [sbdInputMode, setSbdInputMode] = useSyncedDefault(
    'sbdInputMode',
    'calculate',
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
  const [benchEntryMode, setBenchEntryMode] = useSyncedDefault(
    'benchEntryMode',
    'reps',
  )
  const [squatEntryMode, setSquatEntryMode] = useSyncedDefault(
    'squatEntryMode',
    'reps',
  )
  const [deadliftEntryMode, setDeadliftEntryMode] = useSyncedDefault(
    'deadliftEntryMode',
    'reps',
  )
  const [bodyweight, setBodyweight, bodyweightShared] = useSyncedDefault(
    'bodyweight',
    '',
  )
  const [age, setAge, ageShared] = useSyncedDefault('age', '')
  const [gender, setGender, genderShared] = useSyncedDefault('gender', '')

  const isSbdMode = strengthTab === SBD_TOTAL_MODE_ID
  const activeLift = isSbdMode
    ? 'bench'
    : STRENGTH_LIFTS.some((item) => item.id === strengthTab)
      ? strengthTab
      : lift

  const liftFields = {
    bench: {
      weight: benchWeight,
      reps: benchReps,
      setWeight: setBenchWeight,
      setReps: setBenchReps,
      weightShared: benchWeightShared,
      repsShared: benchRepsShared,
    },
    squat: {
      weight: squatWeight,
      reps: squatReps,
      setWeight: setSquatWeight,
      setReps: setSquatReps,
      weightShared: squatWeightShared,
      repsShared: squatRepsShared,
    },
    deadlift: {
      weight: deadliftWeight,
      reps: deadliftReps,
      setWeight: setDeadliftWeight,
      setReps: setDeadliftReps,
      weightShared: deadliftWeightShared,
      repsShared: deadliftRepsShared,
    },
  }

  /** Keep Fitness Score single-lift fields aligned with the lift being edited. */
  const syncLegacyLift = (liftId, weightValue, repsValue) => {
    setLift(liftId)
    setLegacyWeight(weightValue)
    setLegacyReps(repsValue)
  }

  const setLiftWeight = (liftId, value) => {
    const repsValue = liftFields[liftId].reps
    liftFields[liftId].setWeight(value)
    syncLegacyLift(liftId, value, repsValue)
  }

  const setLiftRepsValue = (liftId, value) => {
    const weightValue = liftFields[liftId].weight
    liftFields[liftId].setReps(value)
    syncLegacyLift(liftId, weightValue, value)
  }

  const handleStrengthTab = (nextTab) => {
    setStrengthTab(nextTab)
    if (nextTab !== SBD_TOTAL_MODE_ID) {
      const fields = liftFields[nextTab]
      setLift(nextTab)
      if (fields) {
        syncLegacyLift(nextTab, fields.weight, fields.reps)
      }
    }
  }

  const convertField = (value, fromUnit, toUnit) => {
    const num = Number(value)
    if (!Number.isFinite(num) || num <= 0 || value === '') return value
    return formatConverted(convertMass(num, fromUnit, toUnit), 1)
  }

  const handleMassUnitChange = (nextUnit) => {
    if (nextUnit === massUnit) return

    const keepShared = { keepShared: true }
    setBenchWeight(convertField(benchWeight, massUnit, nextUnit), keepShared)
    setSquatWeight(convertField(squatWeight, massUnit, nextUnit), keepShared)
    setDeadliftWeight(
      convertField(deadliftWeight, massUnit, nextUnit),
      keepShared,
    )
    setLegacyWeight(convertField(legacyWeight, massUnit, nextUnit), keepShared)
    setBodyweight(convertField(bodyweight, massUnit, nextUnit), keepShared)
    setSbdTotalInput(
      convertField(sbdTotalInput, massUnit, nextUnit),
      keepShared,
    )
    setBench1rm(convertField(bench1rm, massUnit, nextUnit), keepShared)
    setSquat1rm(convertField(squat1rm, massUnit, nextUnit), keepShared)
    setDeadlift1rm(convertField(deadlift1rm, massUnit, nextUnit), keepShared)
    setMassUnit(nextUnit)
  }

  // One-time hydrate: copy legacy shared liftWeight/reps into the matching per-lift slots.
  useEffect(() => {
    if (legacyWeight === '' && legacyReps === '') return
    const target = LIFT_INPUT_KEYS[lift] ? lift : 'bench'
    const fields = liftFields[target]
    if (!fields) return
    if (fields.weight === '' && legacyWeight !== '') {
      fields.setWeight(legacyWeight, { fromShared: true })
    }
    if (fields.reps === '' && legacyReps !== '') {
      fields.setReps(legacyReps, { fromShared: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- seed once from legacy shared fields
  }, [])

  const displayLiftWeight = (liftId) => {
    const fields = liftFields[liftId]
    if (fields.weight !== '' || fields.reps !== '') return fields.weight
    if (lift === liftId && legacyWeight !== '') return legacyWeight
    return fields.weight
  }

  const displayLiftReps = (liftId) => {
    const fields = liftFields[liftId]
    if (fields.weight !== '' || fields.reps !== '') return fields.reps
    if (lift === liftId && legacyReps !== '') return legacyReps
    return fields.reps
  }

  const activeWeight = displayLiftWeight(activeLift)
  const activeReps = displayLiftReps(activeLift)

  const liftResult = useMemo(() => {
    if (isSbdMode) return null

    const parsed = parseLiftSet(activeWeight, activeReps)
    if (!parsed) return null

    const bodyweightNum = Number(bodyweight)
    const hasBodyweight =
      bodyweight !== '' &&
      Number.isFinite(bodyweightNum) &&
      bodyweightNum > 0

    const ratio = hasBodyweight ? parsed.rawOneRepMax / bodyweightNum : null

    const ageNum = Number(age)
    const hasDemographics =
      Number.isFinite(ageNum) && ageNum >= 12 && ageNum <= 100 && Boolean(gender)

    const peer =
      hasBodyweight && hasDemographics
        ? compareStrengthToNorms(ratio, ageNum, gender, activeLift)
        : null

    const level = peer
      ? getStrengthLevelFromPercentile(peer.betterThanPercent)
      : hasBodyweight
        ? getStrengthLevel(parsed.rawOneRepMax, bodyweightNum)
        : null

    return {
      oneRepMax: parsed.oneRepMax,
      level,
      ratio,
      hasBodyweight,
      peer,
    }
  }, [
    isSbdMode,
    activeWeight,
    activeReps,
    bodyweight,
    activeLift,
    age,
    gender,
  ])

  const known1rmFields = {
    bench: {
      value: bench1rm,
      setValue: setBench1rm,
      shared: bench1rmShared,
      entryMode: benchEntryMode,
      setEntryMode: setBenchEntryMode,
    },
    squat: {
      value: squat1rm,
      setValue: setSquat1rm,
      shared: squat1rmShared,
      entryMode: squatEntryMode,
      setEntryMode: setSquatEntryMode,
    },
    deadlift: {
      value: deadlift1rm,
      setValue: setDeadlift1rm,
      shared: deadlift1rmShared,
      entryMode: deadliftEntryMode,
      setEntryMode: setDeadliftEntryMode,
    },
  }

  const resolveLiftOneRepMax = (liftId) => {
    const known = Number(known1rmFields[liftId].value)
    const entryMode = known1rmFields[liftId].entryMode
    if (sbdInputMode === 'enter' || entryMode === 'known') {
      return Number.isFinite(known) && known > 0
        ? Math.round(known * 10) / 10
        : null
    }
    const parsed = parseLiftSet(
      displayLiftWeight(liftId),
      displayLiftReps(liftId),
    )
    return parsed?.oneRepMax ?? null
  }

  // Seed / refresh known-1RM from Epley when empty or still on the prior auto value.
  // Do not refill after the user clears a field until that lift's inputs change.
  const lastLiftInputRef = useRef({ bench: '', squat: '', deadlift: '' })
  const lastAuto1rmRef = useRef({ bench: null, squat: null, deadlift: null })
  const userCleared1rmRef = useRef({ bench: false, squat: false, deadlift: false })

  useEffect(() => {
    for (const liftId of ['bench', 'squat', 'deadlift']) {
      const inputKey = `${displayLiftWeight(liftId)}|${displayLiftReps(liftId)}`
      if (inputKey !== lastLiftInputRef.current[liftId]) {
        lastLiftInputRef.current[liftId] = inputKey
        userCleared1rmRef.current[liftId] = false
      }

      if (userCleared1rmRef.current[liftId]) continue

      const field = known1rmFields[liftId]
      const parsed = parseLiftSet(
        displayLiftWeight(liftId),
        displayLiftReps(liftId),
      )
      if (!parsed) continue

      const next = String(parsed.oneRepMax)
      const prevAuto = lastAuto1rmRef.current[liftId]
      const shouldSeed =
        field.value === '' || (prevAuto != null && field.value === prevAuto)

      if (shouldSeed && field.value !== next) {
        field.setValue(next, { fromShared: true })
        lastAuto1rmRef.current[liftId] = next
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- seed when lift inputs change
  }, [
    benchWeight,
    benchReps,
    squatWeight,
    squatReps,
    deadliftWeight,
    deadliftReps,
    legacyWeight,
    legacyReps,
    lift,
  ])

  const setKnownOneRepMax = (liftId, value) => {
    userCleared1rmRef.current[liftId] = value === ''
    if (value !== '') {
      lastAuto1rmRef.current[liftId] = null
    }
    known1rmFields[liftId].setValue(value)
  }

  const sbdResult = useMemo(() => {
    if (!isSbdMode) return null

    let total = null
    let breakdown = null

    const bench = resolveLiftOneRepMax('bench')
    const squat = resolveLiftOneRepMax('squat')
    const deadlift = resolveLiftOneRepMax('deadlift')

    if (bench == null || squat == null || deadlift == null) return null
    total = calculateSbdTotal(bench, squat, deadlift)
    breakdown = { bench, squat, deadlift }

    if (total == null) return null

    const bodyweightNum = Number(bodyweight)
    const hasBodyweight =
      bodyweight !== '' &&
      Number.isFinite(bodyweightNum) &&
      bodyweightNum > 0

    const ratio = hasBodyweight ? total / bodyweightNum : null

    const ageNum = Number(age)
    const hasDemographics =
      Number.isFinite(ageNum) && ageNum >= 12 && ageNum <= 100 && Boolean(gender)

    const peer =
      hasBodyweight && hasDemographics
        ? compareSbdToNorms(ratio, ageNum, gender)
        : null

    const level = peer
      ? getStrengthLevelFromPercentile(peer.betterThanPercent)
      : hasBodyweight
        ? getSbdStrengthLevel(total, bodyweightNum)
        : null

    return {
      sbdTotal: total,
      breakdown,
      level,
      ratio,
      hasBodyweight,
      peer,
      inputMode: sbdInputMode,
    }
  }, [
    isSbdMode,
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
    benchEntryMode,
    squatEntryMode,
    deadliftEntryMode,
    legacyWeight,
    legacyReps,
    lift,
    bodyweight,
    age,
    gender,
  ])

  const hasResult = Boolean(isSbdMode ? sbdResult : liftResult)

  const renderBodyweightField = () => (
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
  )

  const renderLiftWeightReps = (liftId, options = {}) => {
    const { showEstimate = false, allowKnownToggle = false } = options
    const label =
      STRENGTH_LIFTS.find((item) => item.id === liftId)?.name ?? liftId
    const fields = liftFields[liftId]
    const known = known1rmFields[liftId]
    const weightValue = displayLiftWeight(liftId)
    const repsValue = displayLiftReps(liftId)
    const parsed = parseLiftSet(weightValue, repsValue)
    const useKnown = allowKnownToggle && known.entryMode === 'known'

    return (
      <fieldset key={liftId} className="sbd-lift-block">
        {showEstimate ? <legend>{label}</legend> : null}
        {allowKnownToggle ? (
          <UnitToggle
            label={`${label} input`}
            value={known.entryMode}
            options={LIFT_ENTRY_OPTIONS}
            onChange={known.setEntryMode}
          />
        ) : null}
        {useKnown ? (
          <label className="field">
            <span>1RM ({massUnit})</span>
            <SharedInputShell shared={known.shared}>
              <input
                type="number"
                min="1"
                step="any"
                placeholder="275"
                value={known.value}
                onChange={(event) =>
                  setKnownOneRepMax(liftId, event.target.value)
                }
              />
            </SharedInputShell>
          </label>
        ) : (
          <>
            <label className="field">
              <span>Weight ({massUnit})</span>
              <SharedInputShell shared={fields.weightShared}>
                <input
                  type="number"
                  min="1"
                  step="any"
                  placeholder="135"
                  value={weightValue}
                  onChange={(event) => setLiftWeight(liftId, event.target.value)}
                />
              </SharedInputShell>
            </label>
            <label className="field">
              <span>Reps</span>
              <SharedInputShell shared={fields.repsShared}>
                <input
                  type="number"
                  min="1"
                  max="30"
                  step="1"
                  placeholder="5"
                  value={repsValue}
                  onChange={(event) =>
                    setLiftRepsValue(liftId, event.target.value)
                  }
                />
              </SharedInputShell>
            </label>
            {showEstimate && parsed ? (
              <p className="sbd-lift-estimate">
                Estimated 1RM:{' '}
                <strong>
                  {parsed.oneRepMax} {massUnit}
                </strong>
              </p>
            ) : null}
            <EpleyAccuracyNotice show={isHighRepEpleyInput(repsValue)} />
          </>
        )}
      </fieldset>
    )
  }

  const renderKnownOneRepMaxFields = () => (
    <>
      {['bench', 'squat', 'deadlift'].map((liftId) => {
        const label =
          STRENGTH_LIFTS.find((item) => item.id === liftId)?.name ?? liftId
        const known = known1rmFields[liftId]
        return (
          <label key={liftId} className="field">
            <span>
              {label} 1RM ({massUnit})
            </span>
            <SharedInputShell shared={known.shared}>
              <input
                type="number"
                min="1"
                step="any"
                placeholder="275"
                value={known.value}
                onChange={(event) =>
                  setKnownOneRepMax(liftId, event.target.value)
                }
              />
            </SharedInputShell>
          </label>
        )
      })}
    </>
  )

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">Strength</p>
        <h1>{isSbdMode ? 'SBD Total' : 'One-Rep Max'}</h1>
        <p className="page-lead">
          {isSbdMode
            ? 'Calculate Bench, Squat, and Deadlift 1RMs with the Epley formula, or enter known 1RMs. SBD Total is the sum of all three.'
            : 'Choose your exercise, then estimate 1RM with the Epley formula. Add bodyweight for a relative-strength ratio, then optionally compare with recreational lifters in your age and gender group.'}
        </p>
      </header>

      <div
        className="strength-mode-tabs"
        role="tablist"
        aria-label="Strength calculator mode"
      >
        {STRENGTH_MODES.map((mode) => {
          const isActive = strengthTab === mode.id
          return (
            <button
              key={mode.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`graph-track-btn${isActive ? ' is-active' : ''}`}
              onClick={() => handleStrengthTab(mode.id)}
            >
              {mode.name}
            </button>
          )
        })}
      </div>

      <form className="calc-form" onSubmit={(event) => event.preventDefault()}>
        <SharedDataNotification
          sources={[
            bodyweightShared,
            ageShared,
            genderShared,
            sbdTotalShared,
            benchWeightShared,
            benchRepsShared,
            squatWeightShared,
            squatRepsShared,
            deadliftWeightShared,
            deadliftRepsShared,
            bench1rmShared,
            squat1rmShared,
            deadlift1rmShared,
          ]}
        />

        <UnitToggle
          label="Weight units"
          value={massUnit}
          options={MASS_UNITS}
          onChange={handleMassUnitChange}
        />

        {isSbdMode ? (
          <>
            <UnitToggle
              label="SBD Total input"
              value={sbdInputMode}
              options={SBD_INPUT_OPTIONS}
              onChange={setSbdInputMode}
            />

            {sbdInputMode === 'calculate' ? (
              <>
                {renderLiftWeightReps('bench', {
                  showEstimate: true,
                  allowKnownToggle: true,
                })}
                {renderLiftWeightReps('squat', {
                  showEstimate: true,
                  allowKnownToggle: true,
                })}
                {renderLiftWeightReps('deadlift', {
                  showEstimate: true,
                  allowKnownToggle: true,
                })}
                {sbdResult?.sbdTotal != null ? (
                  <p className="sbd-live-total">
                    SBD Total:{' '}
                    <strong>
                      {sbdResult.sbdTotal} {massUnit}
                    </strong>
                  </p>
                ) : null}
              </>
            ) : (
              <>
                {renderKnownOneRepMaxFields()}
                {sbdResult?.sbdTotal != null ? (
                  <p className="sbd-live-total">
                    SBD Total:{' '}
                    <strong>
                      {sbdResult.sbdTotal} {massUnit}
                    </strong>
                  </p>
                ) : null}
              </>
            )}
          </>
        ) : (
          <>
            <label className="field">
              <span>Weight ({massUnit})</span>
              <SharedInputShell shared={liftFields[activeLift]?.weightShared}>
                <input
                  type="number"
                  min="1"
                  step="any"
                  placeholder="135"
                  value={activeWeight}
                  onChange={(event) =>
                    setLiftWeight(activeLift, event.target.value)
                  }
                />
              </SharedInputShell>
            </label>

            <label className="field">
              <span>Reps</span>
              <SharedInputShell shared={liftFields[activeLift]?.repsShared}>
                <input
                  type="number"
                  min="1"
                  max="30"
                  step="1"
                  placeholder="5"
                  value={activeReps}
                  onChange={(event) =>
                    setLiftRepsValue(activeLift, event.target.value)
                  }
                />
              </SharedInputShell>
            </label>
            <EpleyAccuracyNotice show={isHighRepEpleyInput(activeReps)} />
          </>
        )}

        <fieldset className="optional-fields">
          <legend>Optional relative strength</legend>
          <p className="optional-note">
            {isSbdMode
              ? 'Add bodyweight for total ÷ bodyweight and a recreational strength level.'
              : 'Add bodyweight only if you want 1RM ÷ bodyweight and a recreational strength level. Use the same unit as weight lifted.'}
          </p>
          {renderBodyweightField()}
        </fieldset>

        <DemographicFields
          age={age}
          gender={gender}
          onAgeChange={setAge}
          onGenderChange={setGender}
          ageShared={ageShared}
          genderShared={genderShared}
          note={
            isSbdMode
              ? 'Add age and gender (with bodyweight above) to estimate your SBD Total percentile among recreational lifters.'
              : 'Add age and gender (with bodyweight above) to estimate your percentile among recreational lifters / average gym-goers.'
          }
        />
      </form>

      {hasResult && !isSbdMode ? (
        <section className="results" aria-live="polite">
          <div className="result-stat">
            <p className="result-label">Estimated 1RM</p>
            <p className="result-value">
              {liftResult.oneRepMax}
              <span className="result-unit"> {massUnit}</span>
            </p>
          </div>

          {liftResult.hasBodyweight ? (
            <>
              <div className="result-stat">
                <p className="result-label">Strength level</p>
                <p className="result-value">{liftResult.level}</p>
              </div>
              <div className="result-stat">
                <p className="result-label">1RM / bodyweight</p>
                <p className="result-value">{liftResult.ratio.toFixed(2)}×</p>
              </div>
            </>
          ) : null}

          <div ref={setSaveHost} className="save-result-slot" />

          <ResultShareActions
            title={`${STRENGTH_LIFTS.find((l) => l.id === activeLift)?.name || '1RM'} on ${BRAND.short}`}
            text={`My estimated ${STRENGTH_LIFTS.find((l) => l.id === activeLift)?.name || 'lift'} 1RM is ${liftResult.oneRepMax} ${massUnit}${
              liftResult.hasBodyweight ? ` (${liftResult.level})` : ''
            }. Calculate yours on KinesoScore.`}
            url={
              typeof window !== 'undefined'
                ? `${window.location.origin}/strength`
                : 'https://kinesoscore.com/strength'
            }
          />

          {liftResult.peer ? (
            <PeerComparison
              title="Age & gender comparison"
              headline={liftResult.peer.summary}
              details={[
                {
                  label: 'Estimated percentile',
                  value: `${liftResult.peer.percentileLabel} (better than ${liftResult.peer.betterThanPercent}%)`,
                },
                {
                  label: 'Comparison group',
                  value: `${liftResult.peer.genderLabel}, ages ${liftResult.peer.ageLabel}`,
                },
                {
                  label: 'Group median (50th)',
                  value: `${liftResult.peer.medianRatio.toFixed(2)}× bodyweight`,
                },
                {
                  label: 'Reference population',
                  value: 'Recreational lifters / average gym-goers',
                },
              ]}
              source={liftResult.peer.source}
            />
          ) : null}
        </section>
      ) : null}

      {hasResult && isSbdMode ? (
        <section className="results" aria-live="polite">
          <div className="result-stat result-stat-hero">
            <p className="result-label">SBD Total</p>
            <p className="result-value">
              {sbdResult.sbdTotal}
              <span className="result-unit"> {massUnit}</span>
            </p>
          </div>

          <div className="result-table-wrap">
            <h2 className="result-section-title">Lift breakdown</h2>
            <ul className="result-table">
              {sbdResult.breakdown ? (
                <>
                  <li>
                    <span>Bench 1RM</span>
                    <strong>
                      {sbdResult.breakdown.bench} {massUnit}
                    </strong>
                  </li>
                  <li>
                    <span>Squat 1RM</span>
                    <strong>
                      {sbdResult.breakdown.squat} {massUnit}
                    </strong>
                  </li>
                  <li>
                    <span>Deadlift 1RM</span>
                    <strong>
                      {sbdResult.breakdown.deadlift} {massUnit}
                    </strong>
                  </li>
                </>
              ) : null}
              {sbdResult.hasBodyweight ? (
                <>
                  <li>
                    <span>Strength level</span>
                    <strong>{sbdResult.level}</strong>
                  </li>
                  <li>
                    <span>Total / bodyweight</span>
                    <strong>{sbdResult.ratio.toFixed(2)}×</strong>
                  </li>
                </>
              ) : null}
            </ul>
          </div>

          <div ref={setSaveHost} className="save-result-slot" />

          <ResultShareActions
            title={`SBD Total on ${BRAND.short}`}
            text={`My SBD Total is ${sbdResult.sbdTotal} ${massUnit}${
              sbdResult.hasBodyweight ? ` (${sbdResult.level})` : ''
            }. Calculate yours on KinesoScore.`}
            url={
              typeof window !== 'undefined'
                ? `${window.location.origin}/strength`
                : 'https://kinesoscore.com/strength'
            }
          />

          {sbdResult.peer ? (
            <PeerComparison
              title="Age & gender comparison"
              headline={sbdResult.peer.summary}
              details={[
                {
                  label: 'Estimated percentile',
                  value: `${sbdResult.peer.percentileLabel} (better than ${sbdResult.peer.betterThanPercent}%)`,
                },
                {
                  label: 'Comparison group',
                  value: `${sbdResult.peer.genderLabel}, ages ${sbdResult.peer.ageLabel}`,
                },
                {
                  label: 'Metric',
                  value: 'SBD Total',
                },
                {
                  label: 'Group median (50th)',
                  value: `${sbdResult.peer.medianRatio.toFixed(2)}× bodyweight`,
                },
                {
                  label: 'Reference population',
                  value: 'Recreational lifters / average gym-goers',
                },
              ]}
              source={sbdResult.peer.source}
            />
          ) : null}
        </section>
      ) : null}

      {!hasResult ? (
        <p className="calc-hint">
          {isSbdMode
            ? sbdInputMode === 'calculate'
              ? 'Enter weight and reps (or known 1RM) for Bench, Squat, and Deadlift.'
              : 'Enter Bench, Squat, and Deadlift 1RMs.'
            : 'Enter a valid weight and reps.'}
        </p>
      ) : null}

      <CalculatorTracking
        calculatorType="strength"
        tracks={STRENGTH_GRAPH_TRACKS}
        activeTrackId={isSbdMode ? 'sbd-total' : activeLift}
        resultValue={isSbdMode ? sbdResult?.sbdTotal : liftResult?.oneRepMax}
        resultUnit={massUnit}
        valueKind="mass"
        displayUnit={massUnit}
        onDisplayUnitChange={handleMassUnitChange}
        hasResult={hasResult}
        onRequestAuth={onRequestAuth}
        onOpenTab={onOpenTab}
        saveHost={saveHost}
      />

      <SeoIntro
        title={STRENGTH_SEO.title}
        relatedNote={STRENGTH_SEO.relatedNote}
        faqs={STRENGTH_SEO.faqs}
        onNavigate={onOpenTab}
      >
        {STRENGTH_SEO.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </SeoIntro>
    </main>
  )
}

export default StrengthPage
