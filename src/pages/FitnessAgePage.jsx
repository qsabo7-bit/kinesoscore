import { useEffect, useMemo } from 'react'
import { useAuth } from '../auth/AuthContext'
import {
  useSyncedDefault,
  useUserDefaults,
} from '../auth/UserDefaultsContext'
import CalculatorTracking from '../components/CalculatorTracking'
import SeoIntro from '../components/SeoIntro'
import { pathForTab } from '../data/seo'
import { BRAND, BRAND_CASING_CLASS } from '../data/brand'
import { FITNESS_AGE_SEO } from '../data/seoCopy'
import { calculateFitnessAge, MIN_FITNESS_AGE } from '../calculations'
import { FITNESS_AGE_LOCKED_PREVIEW } from '../components/tracking/lockedPreviewCopy'
import {
  FITNESS_AGE_CALCULATOR_TYPE,
  FITNESS_AGE_TRACKS,
  RESTING_HEART_RATE_EXERCISE_NAME,
} from '../data/trackingTracks'
import { fetchPerformanceRecords } from '../lib/performanceRecords'
import { estimated5kAutofillPatch } from '../lib/runningTracking'

function toSeconds(hours, minutes, seconds) {
  if (hours === '' && minutes === '' && seconds === '') return null

  const h = hours === '' ? 0 : Number(hours)
  const m = minutes === '' ? 0 : Number(minutes)
  const s = seconds === '' ? 0 : Number(seconds)

  if (![h, m, s].every(Number.isFinite)) return null

  const total = h * 3600 + m * 60 + s
  return total > 0 ? total : null
}

function FitnessAgePage({ onRequestAuth, onOpenTab }) {
  const { isAuthenticated, user } = useAuth()
  const { patchDefaults, isEstimated5kEdited } = useUserDefaults()
  const [age, setAge] = useSyncedDefault('age', '')
  const [gender, setGender] = useSyncedDefault('gender', '')
  const [restingHr, setRestingHr] = useSyncedDefault('restingHr', '')
  const [vo2Max, setVo2Max] = useSyncedDefault('vo2Max', '')
  const [strengthScore, setStrengthScore] = useSyncedDefault(
    'strengthScore',
    '',
  )
  const [hours, setHours] = useSyncedDefault('fiveKHours', '')
  const [minutes, setMinutes] = useSyncedDefault('fiveKMinutes', '')
  const [seconds, setSeconds] = useSyncedDefault('fiveKSeconds', '')

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

  const handleToolLink = (event, tab) => {
    if (!onOpenTab || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }
    event.preventDefault()
    onOpenTab(tab)
  }

  const result = useMemo(() => {
    const ageNum = Number(age)
    const rhrNum = restingHr === '' ? undefined : Number(restingHr)
    const vo2Num = vo2Max === '' ? undefined : Number(vo2Max)
    const strengthNum =
      strengthScore === '' ? undefined : Number(strengthScore)
    const fiveKSeconds = toSeconds(hours, minutes, seconds)

    if (
      !Number.isFinite(ageNum) ||
      ageNum < MIN_FITNESS_AGE ||
      (gender !== 'male' && gender !== 'female')
    ) {
      return null
    }

    const hasVo2 = Number.isFinite(vo2Num)
    const hasFiveK = fiveKSeconds != null
    if (!hasVo2 && !hasFiveK) return null

    return calculateFitnessAge({
      age: ageNum,
      gender,
      restingHr: rhrNum,
      vo2Max: hasVo2 ? vo2Num : undefined,
      fiveKSeconds: hasFiveK ? fiveKSeconds : undefined,
      strengthScore: strengthNum,
    })
  }, [
    age,
    gender,
    restingHr,
    vo2Max,
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
          Estimate Fitness Age from VO₂ max and biological sex using age–sex
          fitness norms — the age of an average person with comparable
          cardiorespiratory fitness. Optional resting heart rate and{' '}
          <span className={BRAND_CASING_CLASS}>{BRAND.scoreName}</span> strength
          apply only small capped modifiers. Lower fitness age is better. Adults{' '}
          {MIN_FITNESS_AGE}+.
        </p>
      </header>

      <SeoIntro
        title={FITNESS_AGE_SEO.title}
        disclaimer={FITNESS_AGE_SEO.disclaimer}
        faqs={FITNESS_AGE_SEO.faqs}
        onNavigate={onOpenTab}
      >
        {FITNESS_AGE_SEO.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </SeoIntro>

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

          <label className="field">
            <span>Gender</span>
            <select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
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
            <span className="field-hint">
              Need a VO₂ estimate? Use the{' '}
              <a
                className="seo-intro-link"
                href={pathForTab('vo2max')}
                onClick={(event) => handleToolLink(event, 'vo2max')}
              >
                VO₂ Max calculator
              </a>
              , or start from a race time in the{' '}
              <a
                className="seo-intro-link"
                href={pathForTab('running')}
                onClick={(event) => handleToolLink(event, 'running')}
              >
                Running calculator
              </a>
              .
            </span>
          </label>

          <label className="field">
            <span>Resting heart rate (bpm, optional)</span>
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
        </fieldset>

        <fieldset className="optional-fields">
          <legend>Optional inputs</legend>
          <p className="optional-note">
            5K is used only when VO₂ is blank (never stacked with VO₂). Strength
            modifier uses a{' '}
            <span className={BRAND_CASING_CLASS}>{BRAND.scoreName}</span>{' '}
            strength percentile when available. Body fat, BMI, and weekly
            training frequency do not affect Fitness Age.
          </p>

          <label className="field">
            <span className={BRAND_CASING_CLASS}>
              {BRAND.scoreName} strength percentile (0–100)
            </span>
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
            <span className="field-group-label">
              5K time (used only if VO₂ is blank)
            </span>
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
          <div className="result-stat-pair result-stat-hero">
            <div className="result-stat">
              <p className="result-label">Actual Age</p>
              <p className="result-value result-value-sm">
                {result.actualAge}
                <span className="result-unit"> years</span>
              </p>
            </div>
            <div className="result-stat">
              <p className="result-label">Fitness Age</p>
              <p className="result-value result-value-sm">
                {result.fitnessAge}
                <span className="result-unit"> years</span>
              </p>
              <p className="result-sub">{result.differenceLabel}</p>
            </div>
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
          Enter age ({MIN_FITNESS_AGE}+), gender, and either a VO₂ max estimate
          or a 5K time. Fitness Age is only calculated for adults{' '}
          {MIN_FITNESS_AGE} and older.
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
        companionSaves={
          result?.restingHr != null
            ? [
                {
                  exerciseName: RESTING_HEART_RATE_EXERCISE_NAME,
                  resultValue: result.restingHr,
                  resultUnit: 'bpm',
                },
              ]
            : []
        }
        onRequestAuth={onRequestAuth}
        onOpenTab={onOpenTab}
      />
    </main>
  )
}

export default FitnessAgePage
