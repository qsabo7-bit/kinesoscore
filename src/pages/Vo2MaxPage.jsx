import { useEffect, useMemo } from 'react'
import {
  useSyncedDefault,
  useUserDefaults,
} from '../auth/UserDefaultsContext'
import CalculatorTracking from '../components/CalculatorTracking'
import DemographicFields from '../components/DemographicFields'
import PeerComparison from '../components/PeerComparison'
import UnitToggle from '../components/UnitToggle'
import {
  calculateCooperVo2,
  calculateRockportVo2,
  compareVo2ToNorms,
  convertDistance,
  convertMass,
  DISTANCE_UNITS,
  formatConverted,
  MASS_UNITS,
} from '../calculations'
import { VO2_TRACKS } from '../data/trackingTracks'

const METHODS = [
  { value: 'cooper', label: 'Cooper 12-min' },
  { value: 'rockport', label: 'Rockport walk' },
]

function Vo2MaxPage({ onRequestAuth }) {
  const { patchDefaults } = useUserDefaults()
  const [method, setMethod] = useSyncedDefault('vo2Method', 'cooper')
  const [distanceUnit, setDistanceUnit] = useSyncedDefault('distanceUnit', 'mi')
  const [distance, setDistance] = useSyncedDefault('cooperDistance', '')
  const [massUnit, setMassUnit] = useSyncedDefault('massUnit', 'lb')
  const [weight, setWeight] = useSyncedDefault('bodyweight', '')
  const [minutes, setMinutes] = useSyncedDefault('walkMinutes', '')
  const [seconds, setSeconds] = useSyncedDefault('walkSeconds', '')
  const [heartRate, setHeartRate] = useSyncedDefault('endingHeartRate', '')
  const [age, setAge] = useSyncedDefault('age', '')
  const [gender, setGender] = useSyncedDefault('gender', '')

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

  const handleMassUnitChange = (nextUnit) => {
    if (nextUnit === massUnit) return

    const weightNum = Number(weight)
    if (Number.isFinite(weightNum) && weightNum > 0) {
      setWeight(formatConverted(convertMass(weightNum, massUnit, nextUnit), 1))
    }

    setMassUnit(nextUnit)
  }

  const result = useMemo(() => {
    const ageNum = Number(age)
    const hasDemographics =
      Number.isFinite(ageNum) &&
      ageNum >= 18 &&
      ageNum <= 89 &&
      Boolean(gender)

    if (method === 'cooper') {
      const distanceNum = Number(distance)
      const estimated = calculateCooperVo2(distanceNum, distanceUnit)
      if (!estimated) return null

      const peer = hasDemographics
        ? compareVo2ToNorms(estimated.vo2Max, ageNum, gender)
        : null

      return { ...estimated, peer }
    }

    const weightNum = Number(weight)
    const minutesNum = Number(minutes)
    const secondsNum = Number(seconds)
    const heartRateNum = Number(heartRate)
    const timeMinutes =
      minutesNum + (Number.isFinite(secondsNum) ? secondsNum / 60 : 0)

    if (!hasDemographics) {
      return { needsDemographics: true }
    }

    const estimated = calculateRockportVo2(
      weightNum,
      massUnit,
      ageNum,
      gender,
      timeMinutes,
      heartRateNum,
    )
    if (!estimated) return null

    const peer = compareVo2ToNorms(estimated.vo2Max, ageNum, gender)
    return { ...estimated, peer }
  }, [
    method,
    distance,
    distanceUnit,
    weight,
    massUnit,
    minutes,
    seconds,
    heartRate,
    age,
    gender,
  ])

  useEffect(() => {
    if (result?.vo2Max != null) {
      patchDefaults({ vo2Max: String(result.vo2Max) })
    }
  }, [result?.vo2Max, patchDefaults])

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">Cardio</p>
        <h1>VO₂ Max</h1>
        <p className="page-lead">
          Estimate maximal oxygen uptake with the Cooper 12-minute run or the
          Rockport 1-mile walk test. Add age and gender to compare with Cooper
          Institute / ACSM age–sex norms.
        </p>
      </header>

      <form className="calc-form" onSubmit={(event) => event.preventDefault()}>
        <UnitToggle
          label="Test method"
          value={method}
          options={METHODS}
          onChange={setMethod}
        />

        {method === 'cooper' ? (
          <>
            <UnitToggle
              label="Distance units"
              value={distanceUnit}
              options={DISTANCE_UNITS}
              onChange={handleDistanceUnitChange}
            />

            <label className="field">
              <span>Distance covered in 12 minutes ({distanceUnit})</span>
              <input
                type="number"
                min="0.1"
                step="any"
                placeholder="1.5"
                value={distance}
                onChange={(event) => setDistance(event.target.value)}
              />
            </label>

            <DemographicFields
              age={age}
              gender={gender}
              onAgeChange={setAge}
              onGenderChange={setGender}
              legend="Optional fitness comparison"
              note="Add age and gender to estimate your VO₂ max percentile and ACSM fitness category for adults your age."
            />
          </>
        ) : (
          <>
            <UnitToggle
              label="Weight units"
              value={massUnit}
              options={MASS_UNITS}
              onChange={handleMassUnitChange}
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

            <fieldset className="field-group">
              <legend>1-mile walk time</legend>
              <div className="field-row">
                <label className="field field-compact">
                  <span>Minutes</span>
                  <input
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    placeholder="16"
                    value={minutes}
                    onChange={(event) => setMinutes(event.target.value)}
                  />
                </label>
                <label className="field field-compact">
                  <span>Seconds</span>
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
            </fieldset>

            <label className="field">
              <span>Ending heart rate (bpm)</span>
              <input
                type="number"
                min="40"
                max="220"
                step="1"
                placeholder="120"
                value={heartRate}
                onChange={(event) => setHeartRate(event.target.value)}
              />
            </label>

            <DemographicFields
              age={age}
              gender={gender}
              onAgeChange={setAge}
              onGenderChange={setGender}
              legend="Required for Rockport estimate"
              note="The Rockport equation uses age and sex. The same details also power your ACSM percentile comparison."
            />
          </>
        )}
      </form>

      {result?.vo2Max ? (
        <section className="results" aria-live="polite">
          <div className="result-stat">
            <p className="result-label">Estimated VO₂ max</p>
            <p className="result-value">
              {result.vo2Max}
              <span className="result-unit"> ml/kg/min</span>
            </p>
          </div>

          {result.method === 'cooper' && result.distanceMeters ? (
            <div className="result-stat">
              <p className="result-label">Distance covered</p>
              <p className="result-value result-value-sm">
                {result.distanceMeters}
                <span className="result-unit"> m</span>
              </p>
            </div>
          ) : null}

          {result.peer ? (
            <>
              <div className="result-stat">
                <p className="result-label">Fitness category</p>
                <p className="result-value">{result.peer.category}</p>
              </div>

              <PeerComparison
                title="Age & gender comparison"
                headline={result.peer.summary}
                details={[
                  {
                    label: 'Estimated percentile',
                    value: `${result.peer.percentileLabel} (better than ${result.peer.betterThanPercent}%)`,
                  },
                  {
                    label: 'Comparison group',
                    value: `${result.peer.genderLabel}, ages ${result.peer.ageLabel}`,
                  },
                  {
                    label: 'Group median (50th)',
                    value: `${result.peer.median} ml/kg/min`,
                  },
                  {
                    label: 'Reference population',
                    value: 'Cooper Institute / ACSM adult norms',
                  },
                ]}
                source={result.peer.source}
              />
            </>
          ) : null}

          <p className="peer-source">
            Method: {result.source.name}. {result.source.detail}{' '}
            <a href={result.source.url} target="_blank" rel="noreferrer">
              Learn more
            </a>
          </p>
        </section>
      ) : result?.needsDemographics ? (
        <p className="calc-hint">
          Enter age and gender for the Rockport walking estimate.
        </p>
      ) : (
        <p className="calc-hint">
          {method === 'cooper'
            ? 'Enter the distance you covered in 12 minutes.'
            : 'Enter a valid bodyweight, 1-mile walk time, ending heart rate, age, and gender.'}
        </p>
      )}

      <CalculatorTracking
        calculatorType="vo2max"
        tracks={VO2_TRACKS}
        activeTrackId="vo2max"
        resultValue={result?.vo2Max}
        resultUnit="ml/kg/min"
        hasResult={Boolean(result?.vo2Max)}
        onRequestAuth={onRequestAuth}
      />
    </main>
  )
}

export default Vo2MaxPage
