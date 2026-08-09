import { useMemo } from 'react'
import { useSyncedDefault } from '../auth/UserDefaultsContext'
import CalculatorTracking from '../components/CalculatorTracking'
import SeoIntro from '../components/SeoIntro'
import UnitToggle from '../components/UnitToggle'
import { BMR_LOCKED_PREVIEW } from '../components/tracking'
import { BMR_SEO } from '../data/seoCopy'
import { BMR_CALCULATOR_TYPE, BMR_TRACKS } from '../data/trackingTracks'
import {
  ACTIVITY_LEVELS,
  calculateBmr,
  convertHeight,
  convertMass,
  formatConverted,
  HEIGHT_UNITS,
  MASS_UNITS,
} from '../calculations'

function BmrPage({ onRequestAuth, onOpenTab }) {
  const [massUnit, setMassUnit] = useSyncedDefault('massUnit', 'lb')
  const [heightUnit, setHeightUnit] = useSyncedDefault('heightUnit', 'in')
  const [weight, setWeight] = useSyncedDefault('bodyweight', '')
  const [height, setHeight] = useSyncedDefault('height', '')
  const [age, setAge] = useSyncedDefault('age', '')
  const [gender, setGender] = useSyncedDefault('gender', 'male')
  const [activityId, setActivityId] = useSyncedDefault('activityId', '')

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
    const weightNum = Number(weight)
    const heightNum = Number(height)
    const ageNum = Number(age)

    if (
      !Number.isFinite(weightNum) ||
      !Number.isFinite(heightNum) ||
      !Number.isFinite(ageNum) ||
      weightNum <= 0 ||
      heightNum <= 0 ||
      ageNum < 15 ||
      !gender
    ) {
      return null
    }

    return calculateBmr({
      weight: weightNum,
      massUnit,
      height: heightNum,
      heightUnit,
      age: ageNum,
      gender,
      activityId: activityId || undefined,
    })
  }, [weight, massUnit, height, heightUnit, age, gender, activityId])

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">Metabolism</p>
        <h1>BMR</h1>
        <p className="page-lead">
          Estimate basal / resting metabolic rate with the Mifflin–St Jeor
          equation — the formula preferred for most adults in clinical nutrition
          practice. Optionally add activity level for daily calorie needs
          (TDEE).
        </p>
      </header>

      <form className="calc-form" onSubmit={(event) => event.preventDefault()}>
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

        <div className="field-row">
          <label className="field field-compact">
            <span>Age</span>
            <input
              type="number"
              min="15"
              max="100"
              step="1"
              placeholder="30"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Sex</span>
            <select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>

        <fieldset className="optional-fields">
          <legend>Optional daily energy (TDEE)</legend>
          <p className="optional-note">
            Multiply BMR by an activity factor to estimate total daily energy
            expenditure. Leave blank if you only want resting calories.
          </p>
          <label className="field">
            <span>Activity level</span>
            <select
              value={activityId}
              onChange={(event) => setActivityId(event.target.value)}
            >
              <option value="">BMR only</option>
              {ACTIVITY_LEVELS.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.label} (×{level.factor}) — {level.detail}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
      </form>

      {result ? (
        <section className="results" aria-live="polite">
          <div className="result-stat">
            <p className="result-label">Estimated BMR</p>
            <p className="result-value">
              {result.bmr}
              <span className="result-unit"> kcal/day</span>
            </p>
            <p className="result-sub">Calories at complete rest</p>
          </div>

          {result.tdee != null && result.activity ? (
            <div className="result-stat">
              <p className="result-label">Estimated TDEE</p>
              <p className="result-value">
                {result.tdee}
                <span className="result-unit"> kcal/day</span>
              </p>
              <p className="result-sub">
                {result.activity.label} (×{result.activity.factor})
              </p>
            </div>
          ) : null}

          <p className="peer-source">
            Method: {result.source.name}. {result.source.detail}{' '}
            <a href={result.source.url} target="_blank" rel="noreferrer">
              Learn more
            </a>
          </p>

          {result.tdeeSource ? (
            <p className="peer-source">
              TDEE: {result.tdeeSource.name}. {result.tdeeSource.detail}{' '}
              <a href={result.tdeeSource.url} target="_blank" rel="noreferrer">
                Learn more
              </a>
            </p>
          ) : null}
        </section>
      ) : (
        <p className="calc-hint">
          Enter a valid weight, height, age, and sex.
        </p>
      )}

      <CalculatorTracking
        calculatorType={BMR_CALCULATOR_TYPE}
        tracks={BMR_TRACKS}
        activeTrackId="bmr"
        resultValue={result?.bmr}
        resultUnit="kcal/day"
        hasResult={Boolean(result)}
        saveLabel="Save BMR"
        sampleKind="number"
        lockedPreview={BMR_LOCKED_PREVIEW}
        onRequestAuth={onRequestAuth}
        onOpenTab={onOpenTab}
      />

      <SeoIntro
        title={BMR_SEO.title}
        faqs={BMR_SEO.faqs}
        onNavigate={onOpenTab}
      >
        {BMR_SEO.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </SeoIntro>
    </main>
  )
}

export default BmrPage
