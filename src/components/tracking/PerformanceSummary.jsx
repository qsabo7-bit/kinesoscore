import { BRAND } from '../../data/brand'
import {
  formatRecordValue,
  getTrendDisplay,
} from '../../lib/performanceRecords'

function TrendStat({ delta, valueKind, unit, higherIsBetter, label }) {
  const trend = getTrendDisplay(delta, valueKind, unit, higherIsBetter)
  const toneClass =
    trend.tone === 'bad'
      ? ' is-trend-bad'
      : trend.tone === 'good'
        ? ' is-trend-good'
        : ''

  return (
    <div className="performance-stat">
      <p className="result-label">{label || trend.label}</p>
      <p
        className={`performance-stat-value performance-stat-value-sm${toneClass}`}
      >
        {trend.value}
      </p>
    </div>
  )
}

function PerformanceSummary({
  summary,
  valueKind = 'number',
  unit,
  timeFormat = 'clock',
  variant = 'default',
}) {
  if (!summary) return null

  if (variant === 'score' || variant === 'assessment') {
    const isAssessment = variant === 'assessment'
    const scoreLabel = isAssessment ? 'Score' : BRAND.scoreName
    return (
      <div
        className="performance-summary performance-summary-score"
        aria-label={
          isAssessment ? 'Assessment score summary' : `${BRAND.scoreName} summary`
        }
      >
        <div className="performance-stat">
          <p className="result-label">Current {scoreLabel}</p>
          <p className="performance-stat-value">
            {formatRecordValue(summary.latestValue, 'number')}
          </p>
        </div>
        <div className="performance-stat">
          <p className="result-label">Best {scoreLabel}</p>
          <p className="performance-stat-value">
            {formatRecordValue(summary.personalRecord, 'number')}
          </p>
        </div>
        <div className="performance-stat">
          <p className="result-label">Average {scoreLabel}</p>
          <p className="performance-stat-value">
            {formatRecordValue(summary.averageValue, 'number')}
          </p>
        </div>
        <TrendStat
          delta={summary.improvementSinceFirst}
          valueKind="number"
          unit="points"
          higherIsBetter
          label="Change"
        />
        <div className="performance-stat">
          <p className="result-label">Number of Tests</p>
          <p className="performance-stat-value">{summary.totalAttempts}</p>
        </div>
      </div>
    )
  }

  if (variant === 'bmi') {
    return (
      <div className="performance-summary" aria-label="BMI summary">
        <div className="performance-stat">
          <p className="result-label">Current BMI</p>
          <p className="performance-stat-value">
            {formatRecordValue(summary.latestValue, 'number')}
          </p>
        </div>
        <div className="performance-stat">
          <p className="result-label">Lowest BMI</p>
          <p className="performance-stat-value">
            {formatRecordValue(summary.minValue, 'number')}
          </p>
        </div>
        <div className="performance-stat">
          <p className="result-label">Highest BMI</p>
          <p className="performance-stat-value">
            {formatRecordValue(summary.maxValue, 'number')}
          </p>
        </div>
        <TrendStat
          delta={summary.improvementSinceFirst}
          valueKind="number"
          unit="BMI"
          higherIsBetter={false}
          label="Change Over Time"
        />
      </div>
    )
  }

  if (variant === 'fitnessAge') {
    return (
      <div className="performance-summary" aria-label="Fitness Age summary">
        <div className="performance-stat">
          <p className="result-label">Current Fitness Age</p>
          <p className="performance-stat-value">
            {formatRecordValue(summary.latestValue, 'number', 'yr')}
          </p>
        </div>
        <div className="performance-stat">
          <p className="result-label">Best Fitness Age</p>
          <p className="performance-stat-value">
            {formatRecordValue(summary.personalRecord, 'number', 'yr')}
          </p>
        </div>
        <TrendStat
          delta={summary.improvementSinceFirst}
          valueKind="number"
          unit="yr"
          higherIsBetter={false}
          label="Change"
        />
        <div className="performance-stat">
          <p className="result-label">Number of Assessments</p>
          <p className="performance-stat-value">{summary.totalAttempts}</p>
        </div>
      </div>
    )
  }

  const isRunning = valueKind === 'duration'
  const recordLabel = isRunning ? 'Personal Best' : 'Personal Record'
  const latestLabel = isRunning ? 'Latest Time' : 'Latest Result'
  const displayUnit = valueKind === 'duration' ? null : unit || summary.latestUnit

  return (
    <div className="performance-summary" aria-label="Performance summary">
      <div className="performance-stat">
        <p className="result-label">{recordLabel}</p>
        <p className="performance-stat-value">
          {formatRecordValue(
            summary.personalRecord,
            valueKind,
            displayUnit,
            timeFormat,
          )}
        </p>
      </div>
      <div className="performance-stat">
        <p className="result-label">{latestLabel}</p>
        <p className="performance-stat-value">
          {formatRecordValue(
            summary.latestValue,
            valueKind,
            displayUnit,
            timeFormat,
          )}
        </p>
      </div>
      <div className="performance-stat">
        <p className="result-label">Total Attempts</p>
        <p className="performance-stat-value">{summary.totalAttempts}</p>
      </div>
      <TrendStat
        delta={summary.improvementSinceFirst}
        valueKind={valueKind}
        unit={displayUnit}
        higherIsBetter={summary.higherIsBetter}
        label="Change"
      />
    </div>
  )
}

export default PerformanceSummary
