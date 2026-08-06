import { useMemo, useState } from 'react'
import CalculatorTracking from '../components/CalculatorTracking'
import DemographicFields from '../components/DemographicFields'
import PeerComparison from '../components/PeerComparison'
import UnitToggle from '../components/UnitToggle'
import {
  calculateFitnessScore,
  convertDistance,
  convertMass,
  DISTANCE_UNITS,
  formatConverted,
  MASS_UNITS,
  toMiles,
} from '../calculations'
import { STRENGTH_LIFTS } from '../data/strengthNorms'
import {
  FPC_SCORE_CALCULATOR_TYPE,
  SCORING_TRACKS,
} from '../data/trackingTracks'

function toSeconds(hours, minutes, seconds) {
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
}

function ScoringPage({ onRequestAuth }) {
  const [massUnit, setMassUnit] = useState('lb')
  const [distanceUnit, setDistanceUnit] = useState('mi')
  const [weight, setWeight] = useState('185')
  const [reps, setReps] = useState('5')
  const [bodyweight, setBodyweight] = useState('')
  const [lift, setLift] = useState('deadlift')
  const [distance, setDistance] = useState('3.1')
  const [hours, setHours] = useState('0')
  const [minutes, setMinutes] = useState('24')
  const [seconds, setSeconds] = useState('0')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')

  const handleMassUnitChange = (nextUnit) => {
    if (nextUnit === massUnit) return

    const weightNum = Number(weight)
    if (Number.isFinite(weightNum) && weightNum > 0) {
      setWeight(formatConverted(convertMass(weightNum, massUnit, nextUnit), 1))
    }

    if (bodyweight !== '') {
      const bodyweightNum = Number(bodyweight)
      if (Number.isFinite(bodyweightNum) && bodyweightNum > 0) {
        setBodyweight(
          formatConverted(convertMass(bodyweightNum, massUnit, nextUnit), 1),
        )
      }
    }

    setMassUnit(nextUnit)
  }

  const handleDistanceUnitChange = (nextUnit) => {
    if (nextUnit === distanceUnit) return

    const distanceNum = Number(distance)
    if (Number.isFinite(distanceNum) && distanceNum > 0) {
      setDistance(
        formatConverted(
          convertDistance(distanceNum, distanceUnit, nextUnit),
          2,
        ),
      )
    }

    setDistanceUnit(nextUnit)
  }

  const result = useMemo(() => {
    const weightNum = Number(weight)
    const repsNum = Number(reps)
    const bodyweightNum = Number(bodyweight)
    const distanceNum = Number(distance)
    const timeSeconds = toSeconds(hours, minutes, seconds)
    const ageNum = Number(age)

    const hasStrength =
      Number.isFinite(weightNum) &&
      weightNum > 0 &&
      Number.isFinite(repsNum) &&
      repsNum >= 1 &&
      bodyweight !== '' &&
      Number.isFinite(bodyweightNum) &&
      bodyweightNum > 0

    const hasRunning =
      Number.isFinite(distanceNum) &&
      distanceNum > 0 &&
      Number.isFinite(timeSeconds) &&
      timeSeconds > 0

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
      distanceMiles: toMiles(distanceNum, distanceUnit),
      timeSeconds,
      age: ageNum,
      gender,
    })

    return { score, missing: null }
  }, [
    weight,
    reps,
    bodyweight,
    lift,
    distance,
    distanceUnit,
    hours,
    minutes,
    seconds,
    age,
    gender,
  ])

  const hint = (() => {
    if (!result.missing) return null
    const parts = []
    if (result.missing.strength) {
      parts.push('strength (weight, reps, and bodyweight)')
    }
    if (result.missing.running) {
      parts.push('running (distance and finish time)')
    }
    if (result.missing.demographics) {
      parts.push('age and gender')
    }
    return `Add ${parts.join(' + ')} to calculate your FPC Score.`
  })()

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">Fitness Scoring</p>
        <h1>FPC Score</h1>
        <p className="page-lead">
          Combine strength and running into one balanced score. FPC Score
          averages your lifting and endurance percentiles so you can see overall
          fitness — not just one specialty.
        </p>
      </header>

      <form
        className="calc-form calc-form-wide"
        onSubmit={(event) => event.preventDefault()}
      >
        <fieldset className="score-block">
          <legend>Strength input</legend>
          <p className="optional-note">
            Enter a recent lift. Bodyweight is required here so relative
            strength can feed the composite score. Use lb or kg — both fields
            stay in the same unit.
          </p>

          <UnitToggle
            label="Weight units"
            value={massUnit}
            options={MASS_UNITS}
            onChange={handleMassUnitChange}
          />

          <label className="field">
            <span>Weight lifted ({massUnit})</span>
            <input
              type="number"
              min="1"
              step="any"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Reps completed</span>
            <input
              type="number"
              min="1"
              max="30"
              step="1"
              value={reps}
              onChange={(event) => setReps(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Bodyweight ({massUnit})</span>
            <input
              type="number"
              min="1"
              step="any"
              placeholder="—"
              value={bodyweight}
              onChange={(event) => setBodyweight(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Lift</span>
            <select
              value={lift}
              onChange={(event) => setLift(event.target.value)}
            >
              {STRENGTH_LIFTS.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        </fieldset>

        <fieldset className="score-block">
          <legend>Running input</legend>
          <p className="optional-note">
            Enter a recent race or time trial in miles or kilometers. We convert
            to an equivalent 5K for scoring.
          </p>

          <UnitToggle
            label="Distance units"
            value={distanceUnit}
            options={DISTANCE_UNITS}
            onChange={handleDistanceUnitChange}
          />

          <label className="field">
            <span>Distance ({distanceUnit})</span>
            <input
              type="number"
              min="0.1"
              step="any"
              value={distance}
              onChange={(event) => setDistance(event.target.value)}
            />
          </label>

          <div className="field-group" role="group" aria-label="Finish time">
            <span className="field-group-label">Finish time</span>
            <div className="field-row">
              <label className="field field-compact">
                <span>Hour</span>
                <input
                  type="number"
                  min="0"
                  step="1"
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
                  value={seconds}
                  onChange={(event) => setSeconds(event.target.value)}
                />
              </label>
            </div>
          </div>
        </fieldset>

        <DemographicFields
          age={age}
          gender={gender}
          onAgeChange={setAge}
          onGenderChange={setGender}
          legend="Age & gender (required for scoring)"
          note="Age and gender are required for Fitness Scoring so both percentiles use the same published age/sex reference groups."
        />
      </form>

      {result.score ? (
        <section className="results" aria-live="polite">
          <div className="result-stat result-stat-hero">
            <p className="result-label">FPC Score</p>
            <p className="result-value">{result.score.FPCScore}</p>
            <p className="result-sub">
              {result.score.band} · {result.score.balance}
            </p>
          </div>

          <div className="result-stat">
            <p className="result-label">Strength side</p>
            <p className="result-value result-value-sm">
              {result.score.strengthScore}
            </p>
          </div>

          <div className="result-stat">
            <p className="result-label">Running side</p>
            <p className="result-value result-value-sm">
              {result.score.runningScore}
            </p>
          </div>

          <CalculatorTracking
            calculatorType={FPC_SCORE_CALCULATOR_TYPE}
            tracks={SCORING_TRACKS}
            activeTrackId="fpc-score"
            resultValue={result.score.FPCScore}
            resultUnit="points"
            hasResult
            summaryVariant="score"
            saveLabel="Save Score"
            onRequestAuth={onRequestAuth}
          />

          <div className="result-table-wrap">
            <h2 className="result-section-title">Score breakdown</h2>
            <ul className="result-table">
              <li>
                <span>Estimated 1RM</span>
                <strong>
                  {result.score.oneRepMax} {massUnit}
                </strong>
              </li>
              <li>
                <span>1RM / bodyweight</span>
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
      ) : (
        <p className="calc-hint">{hint}</p>
      )}
    </main>
  )
}

export default ScoringPage
