import { useCallback, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import {
  useSyncedDefault,
  useUserDefaults,
} from '../auth/UserDefaultsContext'
import CalculatorTracking from '../components/CalculatorTracking'
import DemographicFields from '../components/DemographicFields'
import PeerComparison from '../components/PeerComparison'
import SeoIntro from '../components/SeoIntro'
import { RUNNING_SEO } from '../data/seoCopy'
import {
  calculatePace,
  compareRunningToNorms,
  estimateFiveKSeconds,
  formatDuration,
  getRaceById,
  predictCommonRaces,
  RACE_DISTANCES_MILES,
} from '../calculations'
import {
  RUNNING_DISTANCE_TRACKS,
  RUNNING_TRACKS,
} from '../data/trackingTracks'
import { fetchPerformanceRecords } from '../lib/performanceRecords'
import { estimated5kAutofillPatch } from '../lib/runningTracking'

function toSeconds(hours, minutes, seconds) {
  return Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
}

function RunningPage({ onRequestAuth, onOpenTab }) {
  const { user } = useAuth()
  const { patchDefaults } = useUserDefaults()
  const [raceDistanceId, setRaceDistanceId] = useSyncedDefault(
    'raceDistanceId',
    '5k',
  )
  const [hours, setHours] = useSyncedDefault('raceHours', '')
  const [minutes, setMinutes] = useSyncedDefault('raceMinutes', '')
  const [seconds, setSeconds] = useSyncedDefault('raceSeconds', '')
  const [age, setAge] = useSyncedDefault('age', '')
  const [gender, setGender] = useSyncedDefault('gender', '')
  const [saveHost, setSaveHost] = useState(null)

  const selectedRace =
    getRaceById(raceDistanceId) || getRaceById('5k') || RACE_DISTANCES_MILES[0]

  const result = useMemo(() => {
    const timeSeconds = toSeconds(hours, minutes, seconds)
    const distanceMiles = selectedRace?.miles

    if (
      !selectedRace ||
      !Number.isFinite(distanceMiles) ||
      distanceMiles <= 0 ||
      !Number.isFinite(timeSeconds) ||
      timeSeconds <= 0
    ) {
      return null
    }

    const enteredSeconds = Math.round(timeSeconds)
    const paceSeconds = calculatePace(distanceMiles, enteredSeconds)
    const predictions = predictCommonRaces(distanceMiles, enteredSeconds)
    const estimated5kSeconds = estimateFiveKSeconds(
      distanceMiles,
      enteredSeconds,
    )

    const ageNum = Number(age)
    const hasDemographics =
      Number.isFinite(ageNum) && ageNum >= 15 && ageNum <= 100 && Boolean(gender)

    const peer = hasDemographics
      ? compareRunningToNorms(distanceMiles, enteredSeconds, ageNum, gender)
      : null

    return {
      paceLabel: `${formatDuration(paceSeconds)} / mi`,
      trackId: selectedRace.id,
      trackTimeSeconds: enteredSeconds,
      trackLabel: selectedRace.name,
      trackTimeLabel: formatDuration(enteredSeconds),
      estimated5kSeconds,
      predictions,
      peer,
    }
  }, [selectedRace, hours, minutes, seconds, age, gender])

  // Estimated 5K autofill from saved runs only (never live race inputs).
  const syncEstimated5kAutofillFromSaves = useCallback(async () => {
    if (!user?.id) return
    try {
      const rows = await fetchPerformanceRecords(user.id, 'running')
      patchDefaults(estimated5kAutofillPatch(rows), {
        source: 'estimated5k-sync',
      })
    } catch {
      /* Keep current defaults if history cannot be refreshed. */
    }
  }, [user?.id, patchDefaults])

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

      <SeoIntro
        title={RUNNING_SEO.title}
        relatedNote={RUNNING_SEO.relatedNote}
        faqs={RUNNING_SEO.faqs}
        onNavigate={onOpenTab}
      >
        {RUNNING_SEO.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </SeoIntro>

      <form className="calc-form" onSubmit={(event) => event.preventDefault()}>
        <label className="field">
          <span>Distance</span>
          <select
            value={selectedRace.id}
            onChange={(event) => setRaceDistanceId(event.target.value)}
          >
            {RUNNING_DISTANCE_TRACKS.map((track) => (
              <option key={track.id} value={track.id}>
                {track.label}
              </option>
            ))}
          </select>
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
          <div className="result-stat-with-save">
            <div className="result-stat-pair">
              <div className="result-stat">
                <p className="result-label">Average pace</p>
                <p className="result-value result-value-sm">{result.paceLabel}</p>
              </div>
              <div className="result-stat">
                <p className="result-label">Tracking as {result.trackLabel}</p>
                <p className="result-value result-value-sm">
                  {result.trackTimeLabel}
                </p>
              </div>
            </div>
            <div
              ref={setSaveHost}
              className="save-result-slot save-result-slot-inline"
            />
          </div>

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
        <p className="calc-hint">Enter a valid finish time for the selected distance.</p>
      )}

      <CalculatorTracking
        calculatorType="running"
        tracks={RUNNING_TRACKS}
        activeTrackId={result?.trackId ?? '5k'}
        resultValue={result?.trackTimeSeconds}
        resultUnit="sec"
        valueKind="duration"
        hasResult={Boolean(result?.trackTimeSeconds)}
        onSaved={syncEstimated5kAutofillFromSaves}
        onDeleted={syncEstimated5kAutofillFromSaves}
        onRequestAuth={onRequestAuth}
        onOpenTab={onOpenTab}
        saveHost={saveHost}
      />
    </main>
  )
}

export default RunningPage
