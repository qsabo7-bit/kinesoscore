import { useMemo, useState } from 'react'
import CalculatorTracking from '../components/CalculatorTracking'
import DemographicFields from '../components/DemographicFields'
import PeerComparison from '../components/PeerComparison'
import UnitToggle from '../components/UnitToggle'
import {
  calculatePace,
  compareRunningToNorms,
  convertDistance,
  DISTANCE_UNITS,
  formatConverted,
  formatDuration,
  matchNearestRace,
  predictCommonRaces,
  predictRaceTime,
  toMiles,
} from '../calculations'
import { RUNNING_TRACKS } from '../data/trackingTracks'

function toSeconds(hours, minutes, seconds) {
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
}

function RunningPage({ onRequestAuth }) {
  const [distanceUnit, setDistanceUnit] = useState('mi')
  const [distance, setDistance] = useState('')
  const [hours, setHours] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')

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
    const distanceNum = Number(distance)
    const timeSeconds = toSeconds(hours, minutes, seconds)

    if (
      !Number.isFinite(distanceNum) ||
      distanceNum <= 0 ||
      !Number.isFinite(timeSeconds) ||
      timeSeconds <= 0
    ) {
      return null
    }

    // Race formulas and RunRepeat scoring are computed in miles.
    const distanceMiles = toMiles(distanceNum, distanceUnit)
    const paceSeconds = calculatePace(distanceNum, timeSeconds)
    const predictions = predictCommonRaces(distanceMiles, timeSeconds)

    const ageNum = Number(age)
    const hasDemographics =
      Number.isFinite(ageNum) && ageNum >= 15 && ageNum <= 100 && Boolean(gender)

    const peer = hasDemographics
      ? compareRunningToNorms(distanceMiles, timeSeconds, ageNum, gender)
      : null

    const matchedRace = matchNearestRace(distanceMiles)
    // Near a standard race: store the entered time. Otherwise Riegel-normalize.
    const nearRace =
      matchedRace &&
      Math.abs(distanceMiles - matchedRace.miles) / matchedRace.miles <= 0.03
    const trackTimeSeconds = matchedRace
      ? nearRace
        ? Math.round(timeSeconds)
        : predictRaceTime(distanceMiles, timeSeconds, matchedRace.miles)
      : null

    return {
      paceLabel: `${formatDuration(paceSeconds)} / ${distanceUnit}`,
      trackId: matchedRace?.id ?? null,
      trackTimeSeconds,
      trackLabel: matchedRace?.name ?? null,
      trackTimeLabel: trackTimeSeconds
        ? formatDuration(trackTimeSeconds)
        : null,
      predictions,
      peer,
    }
  }, [distance, distanceUnit, hours, minutes, seconds, age, gender])

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">Running</p>
        <h1>Race Predictor</h1>
        <p className="page-lead">
          Enter a recent race or time trial. Optionally add age and gender to
          compare your equivalent 5K against RunRepeat’s multi-million race
          dataset.
        </p>
      </header>

      <form className="calc-form" onSubmit={(event) => event.preventDefault()}>
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
            placeholder="3.1"
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
                placeholder="30"
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

        <DemographicFields
          age={age}
          gender={gender}
          onAgeChange={setAge}
          onGenderChange={setGender}
        />
      </form>

      {result ? (
        <section className="results" aria-live="polite">
          <div className="result-stat">
            <p className="result-label">Average pace</p>
            <p className="result-value result-value-sm">{result.paceLabel}</p>
          </div>

          {result.trackLabel && result.trackTimeLabel ? (
            <div className="result-stat">
              <p className="result-label">Tracking as {result.trackLabel}</p>
              <p className="result-value result-value-sm">
                {result.trackTimeLabel}
              </p>
            </div>
          ) : null}

          <CalculatorTracking
            calculatorType="running"
            tracks={RUNNING_TRACKS}
            activeTrackId={result.trackId}
            resultValue={result.trackTimeSeconds}
            resultUnit="sec"
            valueKind="duration"
            hasResult={Boolean(result.trackTimeSeconds)}
            onRequestAuth={onRequestAuth}
          />

          <div className="result-table-wrap">
            <h2 className="result-section-title">Predicted race times</h2>
            <ul className="result-table">
              {result.predictions.map((race) => (
                <li key={race.id}>
                  <span>{race.name}</span>
                  <strong>{race.timeLabel}</strong>
                </li>
              ))}
            </ul>
          </div>

          {result.peer ? (
            <PeerComparison
              title="Age & gender comparison"
              headline={result.peer.summary}
              details={[
                {
                  label: 'Estimated percentile',
                  value: `${result.peer.percentileLabel} (better than ${result.peer.betterThanPercent}%)`,
                },
                {
                  label: 'Equivalent 5K',
                  value: result.peer.fiveKLabel,
                },
                {
                  label: 'Group median 5K',
                  value: result.peer.averageLabel,
                },
                {
                  label: 'Top 25% 5K',
                  value: result.peer.top25Label,
                },
                {
                  label: 'Your group',
                  value: `${result.peer.genderLabel}, ages ${result.peer.ageLabel}`,
                },
                {
                  label: 'Reference population',
                  value: 'Race finishers (RunRepeat dataset)',
                },
              ]}
              source={result.peer.source}
            />
          ) : null}
        </section>
      ) : (
        <p className="calc-hint">Enter a valid distance and finish time.</p>
      )}
    </main>
  )
}

export default RunningPage
