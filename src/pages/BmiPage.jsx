import { useMemo } from 'react'
import { useSyncedDefault } from '../auth/UserDefaultsContext'
import CalculatorTracking from '../components/CalculatorTracking'
import SeoIntro from '../components/SeoIntro'
import UnitToggle from '../components/UnitToggle'
import { BMI_SEO } from '../data/seoCopy'
import {
  BMI_DISCLAIMER,
  calculateBmi,
  convertHeight,
  convertMass,
  formatConverted,
  HEIGHT_UNITS,
  MASS_UNITS,
} from '../calculations'
import { BMI_LOCKED_PREVIEW } from '../components/tracking/lockedPreviewCopy'
import { BMI_CALCULATOR_TYPE, BMI_TRACKS } from '../data/trackingTracks'

function BmiPage({ onRequestAuth, onOpenTab }) {
  const [massUnit, setMassUnit] = useSyncedDefault('massUnit', 'lb')
  const [heightUnit, setHeightUnit] = useSyncedDefault('heightUnit', 'in')
  const [weight, setWeight] = useSyncedDefault('bodyweight', '')
  const [height, setHeight] = useSyncedDefault('height', '')

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

    if (
      !Number.isFinite(weightNum) ||
      !Number.isFinite(heightNum) ||
      weightNum <= 0 ||
      heightNum <= 0
    ) {
      return null
    }

    return calculateBmi({
      weight: weightNum,
      massUnit,
      height: heightNum,
      heightUnit,
    })
  }, [weight, massUnit, height, heightUnit])

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">Body composition</p>
        <h1>BMI Calculator</h1>
        <p className="page-lead">
          Calculate body mass index from height and weight. Switch freely between
          pounds/kilograms and inches/centimeters — values convert automatically.
        </p>
      </header>

      <SeoIntro
        title={BMI_SEO.title}
        disclaimer={BMI_SEO.disclaimer}
        faqs={BMI_SEO.faqs}
        onNavigate={onOpenTab}
      >
        {BMI_SEO.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </SeoIntro>

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
      </form>

      {result ? (
        <section className="results" aria-live="polite">
          <div className="result-stat result-stat-hero">
            <p className="result-label">BMI Score</p>
            <p className="result-value">{result.bmi}</p>
            <p className="result-sub">{result.category}</p>
          </div>

          <div className="result-stat">
            <p className="result-label">Category</p>
            <p className="result-value result-value-sm">{result.category}</p>
          </div>

          <p className="calc-disclaimer">{BMI_DISCLAIMER}</p>

          <p className="peer-source">
            Method: {result.source.name}. {result.source.detail}{' '}
            <a href={result.source.url} target="_blank" rel="noreferrer">
              Learn more
            </a>
          </p>
        </section>
      ) : (
        <p className="calc-hint">Enter a valid height and weight.</p>
      )}

      <CalculatorTracking
        calculatorType={BMI_CALCULATOR_TYPE}
        tracks={BMI_TRACKS}
        activeTrackId="bmi"
        resultValue={result?.bmi}
        resultUnit="BMI"
        hasResult={Boolean(result)}
        summaryVariant="bmi"
        saveLabel="Save BMI"
        sampleKind="bmi"
        lockedPreview={BMI_LOCKED_PREVIEW}
        onRequestAuth={onRequestAuth}
      />
    </main>
  )
}

export default BmiPage
