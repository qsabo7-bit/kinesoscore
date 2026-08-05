import { useMemo, useState } from 'react'
import DemographicFields from '../components/DemographicFields'
import PeerComparison from '../components/PeerComparison'
import UnitToggle from '../components/UnitToggle'
import {
  calculateOneRepMax,
  compareStrengthToNorms,
  convertMass,
  estimateOneRepMax,
  formatConverted,
  getStrengthLevel,
  MASS_UNITS,
} from '../calculations'
import { STRENGTH_LIFTS } from '../data/strengthNorms'

function StrengthPage() {
  const [massUnit, setMassUnit] = useState('lb')
  const [weight, setWeight] = useState('185')
  const [reps, setReps] = useState('5')
  const [bodyweight, setBodyweight] = useState('')
  const [lift, setLift] = useState('deadlift')
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

  const result = useMemo(() => {
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

    // Display 1RM is rounded; ratio uses the unrounded Epley value so lb/kg match.
    const oneRepMax = calculateOneRepMax(weightNum, repsNum)
    const rawOneRepMax = estimateOneRepMax(weightNum, repsNum)

    const bodyweightNum = Number(bodyweight)
    const hasBodyweight =
      bodyweight !== '' &&
      Number.isFinite(bodyweightNum) &&
      bodyweightNum > 0

    const ratio = hasBodyweight ? rawOneRepMax / bodyweightNum : null
    const level = hasBodyweight
      ? getStrengthLevel(rawOneRepMax, bodyweightNum)
      : null

    const ageNum = Number(age)
    const hasDemographics =
      Number.isFinite(ageNum) && ageNum >= 12 && ageNum <= 100 && Boolean(gender)

    const peer =
      hasBodyweight && hasDemographics
        ? compareStrengthToNorms(ratio, ageNum, gender, lift)
        : null

    return { oneRepMax, level, ratio, hasBodyweight, peer }
  }, [weight, reps, bodyweight, lift, age, gender])

  const renderBodyweightField = () => (
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
  )

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">Strength</p>
        <h1>One-Rep Max</h1>
        <p className="page-lead">
          Estimate your 1RM with the Epley formula. Add bodyweight for a
          relative-strength ratio, then optionally compare with recreational
          lifters in your age, gender, and bodyweight category.
        </p>
      </header>

      <form className="calc-form" onSubmit={(event) => event.preventDefault()}>
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

        <fieldset className="optional-fields">
          <legend>Optional relative strength</legend>
          <p className="optional-note">
            Add bodyweight only if you want 1RM ÷ bodyweight and a recreational
            strength level. Use the same unit as weight lifted.
          </p>
          {renderBodyweightField()}
        </fieldset>

        <DemographicFields
          age={age}
          gender={gender}
          onAgeChange={setAge}
          onGenderChange={setGender}
          note="Add bodyweight, lift, age, and gender to estimate your percentile among recreational lifters / average gym-goers. Bodyweight stays in sync with the field above."
        >
          {renderBodyweightField()}
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
        </DemographicFields>
      </form>

      {result ? (
        <section className="results" aria-live="polite">
          <div className="result-stat">
            <p className="result-label">Estimated 1RM</p>
            <p className="result-value">
              {result.oneRepMax}
              <span className="result-unit"> {massUnit}</span>
            </p>
          </div>

          {result.hasBodyweight ? (
            <>
              <div className="result-stat">
                <p className="result-label">Strength level</p>
                <p className="result-value">{result.level}</p>
              </div>
              <div className="result-stat">
                <p className="result-label">1RM / bodyweight</p>
                <p className="result-value">{result.ratio.toFixed(2)}×</p>
              </div>
            </>
          ) : null}

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
                  label: 'Comparison group',
                  value: `${result.peer.genderLabel}, ages ${result.peer.ageLabel}`,
                },
                {
                  label: 'Lift',
                  value:
                    STRENGTH_LIFTS.find((item) => item.id === result.peer.lift)
                      ?.name ?? result.peer.lift,
                },
                {
                  label: 'Group median (50th)',
                  value: `${result.peer.medianRatio.toFixed(2)}× bodyweight`,
                },
                {
                  label: 'Reference population',
                  value: 'Recreational lifters / average gym-goers',
                },
              ]}
              source={result.peer.source}
            />
          ) : null}
        </section>
      ) : (
        <p className="calc-hint">Enter a valid weight and reps.</p>
      )}
    </main>
  )
}

export default StrengthPage
