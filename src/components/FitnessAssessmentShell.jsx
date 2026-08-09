import { useMemo, useState } from 'react'
import { scoreFitnessAssessment } from '../calculations/fitness/scoreFitnessAssessment'
import { BRAND } from '../data/brand'
import { fitnessCalculators } from '../data/calculators'
import { rxNotesForWod } from '../data/fitness/wodStandards'
import { pathForTab } from '../data/seo'
import { FITNESS_SEO, FITNESS_SEO_DISCLAIMER } from '../data/seoCopy'
import CalculatorTracking from './CalculatorTracking'
import ResultShareActions from './ResultShareActions'
import SeoIntro from './SeoIntro'
import UnitToggle from './UnitToggle'

function emptyEventState(events) {
  const state = {}
  for (const event of events) {
    if (event.kind === 'duration') {
      if (event.showHours) {
        state[`${event.id}Hr`] = ''
      }
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

function resultLegend(assessment) {
  if (assessment.resultKind === 'forTime') return 'Finish time'
  if (assessment.resultKind === 'amrap') return 'AMRAP score'
  return 'Your result'
}

function emptyPrompt(assessment) {
  if (assessment.resultKind === 'forTime') {
    return 'Enter your finish time to preview the result and save.'
  }
  if (assessment.resultKind === 'amrap') {
    return 'Enter full rounds and leftover reps to preview your score.'
  }
  return 'Enter your rep count to preview the result and save.'
}

/** Hint when Hr/Min/Sec fields are out of range (scoring returns null). */
function durationRangeHint(event, values) {
  if (event.kind !== 'duration') return null
  const minRaw = values[`${event.id}Min`]
  const secRaw = values[`${event.id}Sec`]
  const min = minRaw === '' || minRaw == null ? null : Number(minRaw)
  const sec = secRaw === '' || secRaw == null ? null : Number(secRaw)
  if (event.showHours && min != null && Number.isFinite(min) && min > 59) {
    return 'Minutes must be 0–59 when hours are used.'
  }
  if (sec != null && Number.isFinite(sec) && sec > 59) {
    return 'Seconds must be 0–59.'
  }
  return null
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

  const prescriptionTrackId =
    assessment.showPrescription && prescription
      ? `${assessment.id}-${prescription === 'scaled' ? 'scaled' : 'rx'}`
      : null
  const activeTrackId =
    result?.trackId ||
    (prescriptionTrackId &&
    tracks?.some((track) => track.id === prescriptionTrackId)
      ? prescriptionTrackId
      : null) ||
    tracks?.[0]?.id
  const valueKind =
    assessment.resultKind === 'forTime' ? 'duration' : 'number'
  const source = assessment.source
  const showRxGender = assessment.showGender && prescription !== 'scaled'
  const rxBlock = assessment.wodId
    ? rxNotesForWod(assessment.wodId, gender)
    : null
  const sexed = rxBlock?.sexed

  const siblingTools = fitnessCalculators.filter(
    (tool) => tool.id !== assessment.id && tool.status === 'ready',
  )

  const handleSiblingClick = (event, tabId) => {
    if (
      !onOpenTab ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    event.preventDefault()
    onOpenTab(tabId)
  }

  return (
    <main className="page fitness-assessment-page">
      <header className="page-header">
        <p className="page-eyebrow">{assessment.eyebrow}</p>
        <h1>{assessment.name}</h1>
        <p className="page-lead">{assessment.lead}</p>
        {assessment.guideTab ? (
          <p>
            <a
              className="tool-link"
              href={pathForTab(assessment.guideTab)}
              onClick={(event) =>
                handleSiblingClick(event, assessment.guideTab)
              }
            >
              {assessment.guideLabel || `What is ${assessment.name}?`}
            </a>
          </p>
        ) : null}
      </header>

      <form
        className="calc-form calc-form-wide"
        onSubmit={(event) => event.preventDefault()}
      >
        {assessment.showGender ||
        assessment.showPrescription ||
        assessment.wodId ||
        assessment.standardNote ? (
          <fieldset className="score-block">
            <legend>
              {assessment.showPrescription || assessment.showGender
                ? 'Standards'
                : assessment.wodId
                  ? 'Workout'
                  : 'How to test'}
            </legend>

            {assessment.showPrescription || showRxGender ? (
              <div className="fitness-standard-toggles">
                {assessment.showPrescription ? (
                  <UnitToggle
                    label="Prescription"
                    value={prescription}
                    onChange={setPrescription}
                    options={(assessment.prescriptionOptions || []).map(
                      (item) => ({
                        value: item.id,
                        label: item.label,
                      }),
                    )}
                  />
                ) : null}

                {showRxGender ? (
                  <UnitToggle
                    label="Rx gender"
                    value={gender}
                    onChange={setGender}
                    options={assessment.genders.map((item) => ({
                      value: item.id,
                      label: item.label,
                    }))}
                  />
                ) : null}
              </div>
            ) : null}

            {assessment.showPrescription ? (
              <p className="field-hint fitness-standard-hint">
                Rx and Scaled save to separate history and leaderboard boards.
              </p>
            ) : null}

            {assessment.standardNote ? (
              <p className="calc-hint">{assessment.standardNote}</p>
            ) : null}

            {rxBlock &&
            (!assessment.showPrescription || prescription === 'rx') ? (
              <div className="fitness-rx-panel" role="note">
                <p className="fitness-rx-title">
                  {assessment.showPrescription ? 'Rx checklist' : 'Format'}
                </p>
                <p className="calc-hint">{rxBlock.format}</p>
                {sexed &&
                (sexed.thrusterLb != null ||
                  sexed.vestLb != null ||
                  sexed.pullups ||
                  (assessment.showGender && sexed.note)) ? (
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
                    {assessment.showGender &&
                    sexed.note &&
                    sexed.vestLb == null &&
                    sexed.thrusterLb == null ? (
                      <li>
                        <span>Note</span>
                        <strong>{sexed.note}</strong>
                      </li>
                    ) : null}
                  </ul>
                ) : null}
              </div>
            ) : null}

            {rxBlock && prescription === 'scaled' && rxBlock.scaledNote ? (
              <div className="fitness-rx-panel" role="note">
                <p className="fitness-rx-title">Scaled notes</p>
                <p className="calc-hint">{rxBlock.scaledNote}</p>
              </div>
            ) : null}
          </fieldset>
        ) : null}

        <fieldset className="score-block">
          <legend>{resultLegend(assessment)}</legend>
          {!result &&
          !assessment.events.some(
            (event) =>
              event.kind === 'duration' && durationRangeHint(event, values),
          ) ? (
            <p className="optional-note">{emptyPrompt(assessment)}</p>
          ) : null}

          {assessment.events.map((event) => {
            if (event.kind === 'duration') {
              const rangeHint = durationRangeHint(event, values)
              return (
                <div key={event.id} className="field">
                  <div className="field-row fitness-duration-row">
                    {event.showHours ? (
                      <label className="field field-compact">
                        <span className="fitness-duration-label">Hr</span>
                        <input
                          type="number"
                          inputMode="numeric"
                          min="0"
                          step="1"
                          placeholder={event.placeholderHr ?? '0'}
                          value={values[`${event.id}Hr`] ?? ''}
                          onChange={(e) =>
                            setField(`${event.id}Hr`, e.target.value)
                          }
                          aria-label={`${event.label} hours`}
                        />
                      </label>
                    ) : null}
                    <label className="field field-compact">
                      <span className="fitness-duration-label">Min</span>
                      <input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        max={event.showHours ? '59' : undefined}
                        step="1"
                        placeholder={event.placeholderMin ?? '0'}
                        value={values[`${event.id}Min`] ?? ''}
                        onChange={(e) =>
                          setField(`${event.id}Min`, e.target.value)
                        }
                        aria-label={`${event.label} minutes`}
                        aria-invalid={
                          rangeHint && /[Mm]inutes/.test(rangeHint)
                            ? true
                            : undefined
                        }
                      />
                    </label>
                    <label className="field field-compact">
                      <span className="fitness-duration-label">Sec</span>
                      <input
                        type="number"
                        inputMode="numeric"
                        min="0"
                        max="59"
                        step="1"
                        placeholder={event.placeholderSec ?? '00'}
                        value={values[`${event.id}Sec`] ?? ''}
                        onChange={(e) =>
                          setField(`${event.id}Sec`, e.target.value)
                        }
                        aria-label={`${event.label} seconds`}
                        aria-invalid={
                          rangeHint && /[Ss]econds/.test(rangeHint)
                            ? true
                            : undefined
                        }
                      />
                    </label>
                  </div>
                  {rangeHint ? (
                    <span className="field-hint" role="status">
                      {rangeHint}
                    </span>
                  ) : event.hint ? (
                    <span className="field-hint">{event.hint}</span>
                  ) : null}
                </div>
              )
            }

            const raw = values[event.id]
            const num =
              raw === '' || raw == null ? null : Number(raw)
            const overMax =
              event.max != null &&
              num != null &&
              Number.isFinite(num) &&
              num > event.max
            return (
              <label key={event.id} className="field">
                <span>
                  {event.label}
                  {event.unit ? ` (${event.unit})` : ''}
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  max={event.max != null ? String(event.max) : undefined}
                  step="1"
                  placeholder={event.placeholder ?? ''}
                  value={values[event.id] ?? ''}
                  onChange={(e) => setField(event.id, e.target.value)}
                  aria-invalid={overMax ? true : undefined}
                />
                {overMax ? (
                  <span className="field-hint" role="status">
                    Max {event.max} leftover reps per round — score uses{' '}
                    {event.max}.
                  </span>
                ) : event.hint ? (
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
            <p className="result-sub">
              {[
                assessment.showPrescription
                  ? prescription === 'scaled'
                    ? 'Scaled'
                    : 'Rx'
                  : null,
                showRxGender
                  ? `${gender === 'female' ? 'Female' : 'Male'} Rx`
                  : null,
                assessment.resultKind === 'amrap'
                  ? `${result.resultValue} work reps`
                  : null,
              ]
                .filter(Boolean)
                .join(' · ')}
            </p>
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

      {siblingTools.length ? (
        <nav
          className="fitness-sibling-nav"
          aria-label="Other fitness assessments"
        >
          <p className="fitness-sibling-label">Other fitness assessments</p>
          <div className="fitness-sibling-chips">
            {siblingTools.map((tool) => (
              <a
                key={tool.id}
                className="fitness-sibling-chip"
                href={pathForTab(tool.id)}
                onClick={(event) => handleSiblingClick(event, tool.id)}
              >
                {tool.shortName || tool.name}
              </a>
            ))}
          </div>
        </nav>
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
          Notes
        </h2>
        {source?.detail ? <p className="calc-hint">{source.detail}</p> : null}
        {!seo ? (
          <p className="calc-disclaimer">{assessment.disclaimer}</p>
        ) : null}
      </section>
    </main>
  )
}

export default FitnessAssessmentShell
