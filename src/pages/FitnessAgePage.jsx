import { useMemo } from 'react'
import { useSyncedDefault } from '../auth/UserDefaultsContext'
import CalculatorTracking from '../components/CalculatorTracking'
import UnitToggle from '../components/UnitToggle'
import {
  calculateFitnessAge,
  convertHeight,
  convertMass,
  formatConverted,
  HEIGHT_UNITS,
  MASS_UNITS,
  MIN_FITNESS_AGE,
} from '../calculations'
import { FITNESS_AGE_LOCKED_PREVIEW } from '../components/tracking/lockedPreviewCopy'
import {
  FITNESS_AGE_CALCULATOR_TYPE,
  FITNESS_AGE_TRACKS,
} from '../data/trackingTracks'

function toSeconds(hours, minutes, seconds) {
  if (hours === '' && minutes === '' && seconds === '') return null

  const h = hours === '' ? 0 : Number(hours)
  const m = minutes === '' ? 0 : Number(minutes)
  const s = seconds === '' ? 0 : Number(seconds)

  if (![h, m, s].every(Number.isFinite)) return null

  const total = h * 3600 + m * 60 + s
  return total > 0 ? total : null
}

function FitnessAgePage({ onRequestAuth }) {
  const [massUnit, setMassUnit] = useSyncedDefault('massUnit', 'lb')
  const [heightUnit, setHeightUnit] = useSyncedDefault('heightUnit', 'in')
  const [age, setAge] = useSyncedDefault('age', '')
  const [weight, setWeight] = useSyncedDefault('bodyweight', '')
  const [height, setHeight] = useSyncedDefault('height', '')
  const [restingHr, setRestingHr] = useSyncedDefault('restingHr', '')
  const [vo2Max, setVo2Max] = useSyncedDefault('vo2Max', '')
  const [weeklySessions, setWeeklySessions] = useSyncedDefault(
    'weeklySessions',
    '',
  )
  const [bodyFat, setBodyFat] = useSyncedDefault('bodyFat', '')
  const [strengthScore, setStrengthScore] = useSyncedDefault(
    'strengthScore',
    '',
  )
  const [hours, setHours] = useSyncedDefault('fiveKHours', '')
  const [minutes, setMinutes] = useSyncedDefault('fiveKMinutes', '')
  const [seconds, setSeconds] = useSyncedDefault('fiveKSeconds', '')

  const handleMassUnitChange = (nextUnit) => {
    if (nextUnit === massUnit) return

    const weightNum = Number(weight)
    if (Number.isFinite(weightNum) && weightNum > 0) {
      setWeight(formatConverted(convertMass(weightNum, massUnit, nextUnit), 1))
    }

    setMassUnit(nextUnit)
  }

  const handleHeightUnitChange = (nextUnit) => {
    if (nextUnit === heightUnit) return

    const heightNum = Number(height)
    if (Number.isFinite(heightNum) && heightNum > 0) {
      setHeight(
        formatConverted(convertHeight(heightNum, heightUnit, nextUnit), 1),
      )
    }

    setHeightUnit(nextUnit)
  }

  const result = useMemo(() => {
    const ageNum = Number(age)
    const weightNum = Number(weight)
    const heightNum = Number(height)
    const rhrNum = Number(restingHr)
    const vo2Num = Number(vo2Max)
    const sessionsNum = Number(weeklySessions)
    const bfNum = bodyFat === '' ? undefined : Number(bodyFat)
    const strengthNum =
      strengthScore === '' ? undefined : Number(strengthScore)
    const fiveKSeconds = toSeconds(hours, minutes, seconds)

    if (
      !Number.isFinite(ageNum) ||
      ageNum < MIN_FITNESS_AGE ||
      !Number.isFinite(weightNum) ||
      !Number.isFinite(heightNum) ||
      !Number.isFinite(rhrNum) ||
      !Number.isFinite(vo2Num) ||
      !Number.isFinite(sessionsNum)
    ) {
      return null
    }

    return calculateFitnessAge({
      age: ageNum,
      weight: weightNum,
      massUnit,
      height: heightNum,
      heightUnit,
      restingHr: rhrNum,
      vo2Max: vo2Num,
      weeklySessions: sessionsNum,
      bodyFatPercent: bfNum,
      fiveKSeconds: fiveKSeconds ?? undefined,
      strengthScore: strengthNum,
    })
  }, [
    age,
    weight,
    massUnit,
    height,
    heightUnit,
    restingHr,
    vo2Max,
    weeklySessions,
    bodyFat,
    strengthScore,
    hours,
    minutes,
    seconds,
  ])

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">Longevity</p>
        <h1>Fitness Age</h1>
        <p className="page-lead">
          Estimate a transparent fitness age from age, body size, resting heart
          rate, VO₂ max, and training habits — plus optional body fat, 5K, and
          strength inputs. Lower fitness age is better. Results are only accurate
          for ages {MIN_FITNESS_AGE} and up.
        </p>
      </header>

      <form className="calc-form" onSubmit={(event) => event.preventDefault()}>
        <fieldset className="score-block">
          <legend>Required inputs</legend>

          <label className="field">
            <span>Actual age (18+)</span>
            <input
              type="number"
              min={MIN_FITNESS_AGE}
              max="90"
              step="1"
              placeholder="30"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              onBlur={() => {
                if (age === '') return
                const num = Number(age)
                if (!Number.isFinite(num) || num < MIN_FITNESS_AGE) {
                  setAge(String(MIN_FITNESS_AGE))
                }
              }}
            />
          </label>

          <UnitToggle
            label="Weight units"
            value={massUnit}
            options={MASS_UNITS}
            onChange={handleMassUnitChange}
          />

          <UnitToggle
            label="Height units"
            value={heightUnit}
            options={HEIGHT_UNITS}
            onChange={handleHeightUnitChange}
          />

          <label className="field">
            <span>Bodyweight ({massUnit})</span>
            <input
              type="number"
              min="1"
              step="any"
              placeholder="175"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Height ({heightUnit})</span>
            <input
              type="number"
              min="1"
              step="any"
              placeholder="70"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Resting heart rate (bpm)</span>
            <input
              type="number"
              min="30"
              max="120"
              step="1"
              placeholder="60"
              value={restingHr}
              onChange={(event) => setRestingHr(event.target.value)}
            />
          </label>

          <label className="field">
            <span>VO₂ max estimate (ml/kg/min)</span>
            <input
              type="number"
              min="10"
              max="90"
              step="any"
              placeholder="42"
              value={vo2Max}
              onChange={(event) => setVo2Max(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Weekly exercise sessions</span>
            <input
              type="number"
              min="0"
              max="14"
              step="1"
              placeholder="3"
              value={weeklySessions}
              onChange={(event) => setWeeklySessions(event.target.value)}
            />
          </label>
        </fieldset>

        <fieldset className="optional-fields">
          <legend>Optional inputs</legend>
          <p className="optional-note">
            These refine Strength, Body Composition, and Training Consistency.
            Leave blank if you do not have them.
          </p>

          <label className="field">
            <span>Body fat percentage</span>
            <input
              type="number"
              min="1"
              max="70"
              step="any"
              placeholder="18"
              value={bodyFat}
              onChange={(event) => setBodyFat(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Strength score (0–100)</span>
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              placeholder="50"
              value={strengthScore}
              onChange={(event) => setStrengthScore(event.target.value)}
            />
          </label>

          <div className="field-group" role="group" aria-label="Optional 5K time">
            <span className="field-group-label">5K time (optional)</span>
            <div className="field-row">
              <label className="field field-compact">
                <span>Hour</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  value={hours}
                  onChange={(event) => setHours(event.target.value)}
                />
              </label>
              <label className="field field-compact">
                <span>Min</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  step="1"
                  placeholder="28"
                  value={minutes}
                  onChange={(event) => setMinutes(event.target.value)}
                />
              </label>
              <label className="field field-compact">
                <span>Sec</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  step="1"
                  placeholder="0"
                  value={seconds}
                  onChange={(event) => setSeconds(event.target.value)}
                />
              </label>
            </div>
          </div>
        </fieldset>
      </form>

      {result ? (
        <section className="results" aria-live="polite">
          <div className="result-stat">
            <p className="result-label">Actual Age</p>
            <p className="result-value">
              {result.actualAge}
              <span className="result-unit"> years</span>
            </p>
          </div>

          <div className="result-stat result-stat-hero">
            <p className="result-label">Fitness Age</p>
            <p className="result-value">
              {result.fitnessAge}
              <span className="result-unit"> years</span>
            </p>
            <p className="result-sub">{result.differenceLabel}</p>
          </div>

          <div className="result-table-wrap">
            <h2 className="result-section-title">Category breakdown</h2>
            <ul className="result-table">
              {result.categories.map((category) => (
                <li key={category.id}>
                  <span>
                    {category.title}
                    <span className="result-table-note">
                      {' '}
                      · {category.rating}. {category.detail}
                    </span>
                  </span>
                  <strong>
                    {category.adjustment == null
                      ? '—'
                      : `${category.adjustment > 0 ? '+' : ''}${category.adjustment} yr`}
                  </strong>
                </li>
              ))}
            </ul>
          </div>

          <p className="peer-source">{result.source.detail}</p>
        </section>
      ) : (
        <p className="calc-hint">
          Enter age ({MIN_FITNESS_AGE}+), height, weight, resting heart rate,
          VO₂ max, and weekly exercise frequency. Fitness Age is only calculated
          for adults {MIN_FITNESS_AGE} and older.
        </p>
      )}

      <CalculatorTracking
        calculatorType={FITNESS_AGE_CALCULATOR_TYPE}
        tracks={FITNESS_AGE_TRACKS}
        activeTrackId="fitness-age"
        resultValue={result?.fitnessAge}
        resultUnit="years"
        hasResult={Boolean(result)}
        summaryVariant="fitnessAge"
        saveLabel="Save Assessment"
        sampleKind="fitnessAge"
        lockedPreview={FITNESS_AGE_LOCKED_PREVIEW}
        onRequestAuth={onRequestAuth}
      />
    </main>
  )
}

export default FitnessAgePage
