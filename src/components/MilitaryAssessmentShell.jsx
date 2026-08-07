import { useMemo, useState } from 'react'
import { MILITARY_SEO, MILITARY_SEO_DISCLAIMER } from '../data/seoCopy'
import CalculatorTracking from './CalculatorTracking'
import SeoIntro from './SeoIntro'

const MILITARY_ESTIMATE_DISCLAIMER =
  'KinesoScore provides an estimate based on published military fitness standards. It is not an official service scorecard.'

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
 * Shared shell for military assessment calculators.
 * Scoring / save only run when assessment.scoringReady is true and a scoreFn is provided.
 */
function MilitaryAssessmentShell({
  assessment,
  scoreFn = null,
  tracks = null,
  calculatorType = null,
  lockedPreview = null,
  onRequestAuth,
  onOpenTab,
}) {
  const seo = MILITARY_SEO[assessment.id]
  const [ageBand, setAgeBand] = useState(assessment.ageBands[0]?.id ?? '')
  const [gender, setGender] = useState(assessment.genders[0]?.id ?? '')
  const [values, setValues] = useState(() => emptyEventState(assessment.events))

  const scoringReady = Boolean(assessment.scoringReady && typeof scoreFn === 'function')

  const result = useMemo(() => {
    if (!scoringReady) return null
    return scoreFn({ ageBand, gender, values })
  }, [scoringReady, scoreFn, ageBand, gender, values])

  const setField = (key, next) => {
    setValues((prev) => ({ ...prev, [key]: next }))
  }

  const source = scoringReady
    ? assessment.source
    : assessment.sourcePending

  return (
    <main className="page">
      <header className="page-header">
        <p className="page-eyebrow">{assessment.eyebrow}</p>
        <h1>{assessment.name}</h1>
        <p className="page-lead">{assessment.lead}</p>
      </header>

      {seo ? (
        <SeoIntro
          title={seo.title}
          links={seo.links}
          faqs={seo.faqs}
          disclaimer={MILITARY_SEO_DISCLAIMER}
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
            <strong>{assessment.infoStatus || 'Current'}</strong>
          </li>
          <li>
            <span>Official source</span>
            <strong>
              {source?.url ? (
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="military-source-link"
                >
                  {source.name}
                </a>
              ) : (
                source?.name || '—'
              )}
            </strong>
          </li>
        </ul>
        <p className="calc-disclaimer">{MILITARY_ESTIMATE_DISCLAIMER}</p>
      </section>

      {!scoringReady ? (
        <section className="military-coming-soon" role="status">
          <p className="military-coming-soon-title">
            {assessment.scoringStatusMessage || 'Scoring tables coming soon'}
          </p>
          <p className="military-coming-soon-copy">
            Event inputs below show the assessment structure. Official published
            scoring charts will be encoded before any scores, pass/fail results,
            or saved history are available. No estimated standards are used.
          </p>
        </section>
      ) : null}

      <form className="calc-form calc-form-wide" onSubmit={(event) => event.preventDefault()}>
        <fieldset className="score-block">
          <legend>Demographics</legend>
          <div className="field-row">
            <label className="field">
              <span>Age band</span>
              <select
                value={ageBand}
                onChange={(event) => setAgeBand(event.target.value)}
              >
                {assessment.ageBands.map((band) => (
                  <option key={band.id} value={band.id}>
                    {band.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              <span>Gender</span>
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
          </div>
        </fieldset>

        <fieldset className="score-block">
          <legend>Assessment events</legend>
          <p className="optional-note">
            Enter results for each event. Scoring uses official tables only when
            they have been fully encoded for this assessment.
          </p>

          {assessment.events.map((event) => {
            if (event.kind === 'select') {
              return (
                <label key={event.id} className="field">
                  <span>{event.label}</span>
                  <select
                    value={values[event.id] ?? ''}
                    onChange={(e) => setField(event.id, e.target.value)}
                  >
                    {(event.options ?? []).map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {event.hint ? (
                    <span className="field-hint">{event.hint}</span>
                  ) : null}
                </label>
              )
            }

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
                        onChange={(e) => setField(`${event.id}Min`, e.target.value)}
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
                        onChange={(e) => setField(`${event.id}Sec`, e.target.value)}
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
                  step={event.kind === 'reps' ? '1' : 'any'}
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

      {scoringReady && result ? (
        <section className="results" aria-live="polite">
          <div className="result-stat result-stat-hero">
            <p className="result-label">Total score</p>
            <p className="result-value">
              {result.total != null ? result.total : '—'}
            </p>
            <p className="result-sub">
              {result.pass ? 'Pass' : 'Fail'}
              {result.category ? ` · ${result.category}` : ''}
            </p>
          </div>

          {(result.events ?? []).map((event) => (
            <div key={event.id} className="result-stat">
              <p className="result-label">{event.label}</p>
              <p className="result-value result-value-sm">
                {event.points != null ? event.points : '—'}
              </p>
            </div>
          ))}

          {result.summary ? <p className="calc-hint">{result.summary}</p> : null}
        </section>
      ) : null}

      {scoringReady && source?.detail ? (
        <p className="peer-source">{source.detail}</p>
      ) : null}

      {scoringReady && tracks && calculatorType ? (
        <CalculatorTracking
          calculatorType={calculatorType}
          tracks={tracks}
          activeTrackId={tracks[0]?.id}
          resultValue={result?.total}
          resultUnit="points"
          hasResult={Boolean(result?.total != null)}
          summaryVariant="assessment"
          saveLabel="Save Score"
          sampleKind="score"
          lockedPreview={lockedPreview}
          companionSaves={result?.companionSaves ?? []}
          onRequestAuth={onRequestAuth}
        />
      ) : null}
    </main>
  )
}

export default MilitaryAssessmentShell
