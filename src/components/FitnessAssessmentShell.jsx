import { useMemo, useState } from 'react'
import { scoreFitnessAssessment } from '../calculations/fitness/scoreFitnessAssessment'
import { BRAND } from '../data/brand'
import { pathForTab } from '../data/seo'
import { FITNESS_SEO, FITNESS_SEO_DISCLAIMER } from '../data/seoCopy'
import CalculatorTracking from './CalculatorTracking'
import ResultShareActions from './ResultShareActions'
import SeoIntro from './SeoIntro'

function emptyEventState(events) {
  const state = {}
  for (const event of events) {
    if (event.kind === 'duration') {
      state[`${event.id}Min`] = ''
      state[`${event.id}Sec`] = ''
    } else if (event.kind === 'select') {
      state[event.id] = event.options?.[0]?.id ?? ''
    } else {
      state[event.id] = ''
    }
  }
  return state
}

/**
 * Shared shell for Fitness Assessments (max tests + benchmark WODs).
 */
function FitnessAssessmentShell({
  assessment,
  tracks = null,
  calculatorType = null,
  lockedPreview = null,
  onRequestAuth,
  onOpenTab,
}) {
  const seo = FITNESS_SEO[assessment.id]
  const [gender, setGender] = useState(assessment.genders[0]?.id ?? 'male')
  const [prescription, setPrescription] = useState(
    assessment.prescriptionOptions?.[0]?.id ?? 'rx',
  )
  const [values, setValues] = useState(() => emptyEventState(assessment.events))

  const result = useMemo(
    () =>
      scoreFitnessAssessment(assessment, {
        gender,
        prescription,
        values,
      }),
    [assessment, gender, prescription, values],
  )

  const setField = (key, next) => {
    setValues((prev) => ({ ...prev, [key]: next }))
  }

  const activeTrackId = result?.trackId || tracks?.[0]?.id
  const valueKind =
    assessment.resultKind === 'forTime' ? 'duration' : 'number'
  const source = assessment.source

  const rxBlock = result?.rxNotes
  const sexed = rxBlock?.sexed

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">{assessment.eyebrow}</p>
        <h1>{assessment.name}</h1>
        <p className="page-lead">{assessment.lead}</p>
      </header>

      <form
        className="calc-form calc-form-wide"
        onSubmit={(event) => event.preventDefault()}
      >
        {assessment.showGender || assessment.showPrescription ? (
          <fieldset className="score-block">
            <legend>Standards</legend>
            <div className="field-row">
              {assessment.showGender ? (
                <label className="field">
                  <span>Gender (for Rx standards)</span>
                  <select
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
                  >
                    {assessment.genders.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
              ) : null}

              {assessment.showPrescription ? (
                <label className="field">
                  <span>Prescription</span>
                  <select
                    value={prescription}
                    onChange={(event) => setPrescription(event.target.value)}
                  >
                    {(assessment.prescriptionOptions || []).map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  <span className="field-hint">
                    Rx and Scaled save to separate history and leaderboard boards.
                  </span>
                </label>
              ) : null}
            </div>

            {rxBlock ? (
              <div className="fitness-rx-panel" role="note">
                <p className="fitness-rx-title">
                  {prescription === 'scaled' ? 'Scaled notes' : 'Rx standards'}
                </p>
                <p className="calc-hint">{rxBlock.format}</p>
                {prescription === 'rx' && sexed ? (
                  <ul className="result-table fitness-rx-list">
                    {sexed.thrusterLb != null ? (
                      <li>
                        <span>Thruster</span>
                        <strong>
                          {sexed.thrusterLb} lb
                          {sexed.thrusterKg != null
                            ? ` (~${sexed.thrusterKg} kg)`
                            : ''}
                        </strong>
                      </li>
                    ) : null}
                    {sexed.vestLb != null ? (
                      <li>
                        <span>Vest</span>
                        <strong>
                          {sexed.vestLb} lb
                          {sexed.vestKg != null
                            ? ` (~${sexed.vestKg} kg)`
                            : ''}
                        </strong>
                      </li>
                    ) : null}
                    {sexed.pullups ? (
                      <li>
                        <span>Pull-ups</span>
                        <strong>{sexed.pullups}</strong>
                      </li>
                    ) : null}
                    {sexed.note ? (
                      <li>
                        <span>Note</span>
                        <strong>{sexed.note}</strong>
                      </li>
                    ) : null}
                  </ul>
                ) : null}
                {prescription === 'scaled' && rxBlock.scaledNote ? (
                  <p className="calc-hint">{rxBlock.scaledNote}</p>
                ) : null}
              </div>
            ) : null}
          </fieldset>
        ) : null}

        <fieldset className="score-block">
          <legend>Result</legend>
          {assessment.events.map((event) => {
            if (event.kind === 'duration') {
              return (
                <div key={event.id} className="field">
                  <span>
                    {event.label}
                    {event.unit ? ` (${event.unit})` : ''}
                  </span>
                  <div className="field-row">
                    <label className="field field-compact">
                      <span className="sr-only">Minutes</span>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        placeholder={event.placeholderMin ?? '0'}
                        value={values[`${event.id}Min`] ?? ''}
                        onChange={(e) =>
                          setField(`${event.id}Min`, e.target.value)
                        }
                      />
                    </label>
                    <label className="field field-compact">
                      <span className="sr-only">Seconds</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        step="1"
                        placeholder={event.placeholderSec ?? '00'}
                        value={values[`${event.id}Sec`] ?? ''}
                        onChange={(e) =>
                          setField(`${event.id}Sec`, e.target.value)
                        }
                      />
                    </label>
                  </div>
                  {event.hint ? (
                    <span className="field-hint">{event.hint}</span>
                  ) : null}
                </div>
              )
            }

            return (
              <label key={event.id} className="field">
                <span>
                  {event.label}
                  {event.unit ? ` (${event.unit})` : ''}
                </span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  placeholder={event.placeholder ?? ''}
                  value={values[event.id] ?? ''}
                  onChange={(e) => setField(event.id, e.target.value)}
                />
                {event.hint ? (
                  <span className="field-hint">{event.hint}</span>
                ) : null}
              </label>
            )
          })}
        </fieldset>
      </form>

      {result ? (
        <section className="results" aria-live="polite">
          <div className="result-stat result-stat-hero">
            <p className="result-label">{result.displayLabel}</p>
            <p className="result-value">{result.displayValue}</p>
            {assessment.showPrescription ? (
              <p className="result-sub">
                {prescription === 'scaled' ? 'Scaled' : 'Rx'}
                {assessment.showGender
                  ? ` · ${gender === 'female' ? 'Female' : 'Male'} standards`
                  : ''}
              </p>
            ) : null}
          </div>

          {result.summary ? <p className="calc-hint">{result.summary}</p> : null}

          <ResultShareActions
            title={`${assessment.name} on ${BRAND.short}`}
            text={`My ${assessment.name} result is ${result.displayValue}. Check yours on KinesoScore.`}
            url={
              typeof window !== 'undefined'
                ? `${window.location.origin}${pathForTab(assessment.id)}`
                : `https://kinesoscore.com${pathForTab(assessment.id)}`
            }
          />
        </section>
      ) : null}

      {source?.detail ? <p className="peer-source">{source.detail}</p> : null}

      {tracks && calculatorType ? (
        <CalculatorTracking
          calculatorType={calculatorType}
          tracks={tracks}
          activeTrackId={activeTrackId}
          resultValue={result?.resultValue}
          resultUnit={result?.resultUnit}
          valueKind={valueKind}
          hasResult={Boolean(result?.resultValue != null)}
          summaryVariant="assessment"
          saveLabel="Save Result"
          sampleKind={valueKind === 'duration' ? 'duration' : 'number'}
          lockedPreview={lockedPreview}
          companionSaves={result?.companionSaves ?? []}
          onRequestAuth={onRequestAuth}
          onOpenTab={onOpenTab}
        />
      ) : null}

      {seo ? (
        <SeoIntro
          title={seo.title}
          links={seo.links}
          faqs={seo.faqs}
          relatedNote={seo.relatedNote}
          collapseFaqs
          disclaimer={FITNESS_SEO_DISCLAIMER}
          onNavigate={onOpenTab}
        >
          {seo.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </SeoIntro>
      ) : null}

      <section
        className="account-card military-assessment-info"
        aria-labelledby={`${assessment.id}-info`}
      >
        <h2 id={`${assessment.id}-info`} className="result-section-title">
          Assessment information
        </h2>
        <ul className="result-table">
          <li>
            <span>Assessment</span>
            <strong>{assessment.name}</strong>
          </li>
          <li>
            <span>Status</span>
            <strong>{assessment.infoStatus || 'Benchmark'}</strong>
          </li>
          <li>
            <span>Source</span>
            <strong>{source?.name || '—'}</strong>
          </li>
        </ul>
        <p className="calc-disclaimer">{assessment.disclaimer}</p>
      </section>
    </main>
  )
}

export default FitnessAssessmentShell
