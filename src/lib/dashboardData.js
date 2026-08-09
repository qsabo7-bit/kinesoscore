import { BRAND } from '../data/brand'
import { militaryCalculators } from '../data/calculators'
import { DASHBOARD_GRAPH_METRICS, ACTIVITY_META } from '../data/dashboardMetrics'
import {
  CINDY_CALCULATOR_TYPE,
  CINDY_TRACKS,
  FITNESS_AGE_CALCULATOR_TYPE,
  FRAN_CALCULATOR_TYPE,
  FRAN_TRACKS,
  MAX_PULLUPS_CALCULATOR_TYPE,
  MAX_PULLUPS_TRACKS,
  MAX_PUSHUPS_CALCULATOR_TYPE,
  MAX_PUSHUPS_TRACKS,
  MURPH_CALCULATOR_TYPE,
  MURPH_TRACKS,
  RESTING_HEART_RATE_EXERCISE_NAME,
  STRENGTH_GRAPH_TRACKS,
} from '../data/trackingTracks'
import {
  computePerformanceSummary,
  fetchAllPerformanceRecords,
  formatRecordDate,
  formatRecordValue,
  getTrendDisplay,
  isCindyResult,
} from './performanceRecords'
import {
  excludeStoredEstimated5kRecords,
  isStoredEstimated5kRecord,
} from './runningTracking'

const MILITARY_OVERALL_EXERCISE = 'Overall Score'

/** One dashboard card slot per fitness track (Fran/Murph keep Rx + Scaled separate). */
const FITNESS_ASSESSMENT_CARD_SLOTS = [
  ...MAX_PUSHUPS_TRACKS.map((track) => ({
    id: track.id,
    calculatorType: MAX_PUSHUPS_CALCULATOR_TYPE,
    exerciseName: track.exerciseName,
    title: track.label,
    higherIsBetter: track.higherIsBetter !== false,
  })),
  ...MAX_PULLUPS_TRACKS.map((track) => ({
    id: track.id,
    calculatorType: MAX_PULLUPS_CALCULATOR_TYPE,
    exerciseName: track.exerciseName,
    title: track.label,
    higherIsBetter: track.higherIsBetter !== false,
  })),
  ...FRAN_TRACKS.map((track) => ({
    id: track.id,
    calculatorType: FRAN_CALCULATOR_TYPE,
    exerciseName: track.exerciseName,
    title: track.label,
    higherIsBetter: track.higherIsBetter !== false,
  })),
  ...MURPH_TRACKS.map((track) => ({
    id: track.id,
    calculatorType: MURPH_CALCULATOR_TYPE,
    exerciseName: track.exerciseName,
    title: track.label,
    higherIsBetter: track.higherIsBetter !== false,
  })),
  ...CINDY_TRACKS.map((track) => ({
    id: track.id,
    calculatorType: CINDY_CALCULATOR_TYPE,
    exerciseName: track.exerciseName,
    title: track.label,
    higherIsBetter: track.higherIsBetter !== false,
  })),
]

const PERFORMANCE_SAMPLE_CARD = {
  id: 'performance-sample',
  title: 'Performance',
  primary: 'Sample',
  secondary:
    'Save strength, running, VO₂ Max, BMR, or body-composition results to fill this section.',
  trend: null,
  tab: 'strength',
  isSample: true,
  isPrompt: true,
}

const FITNESS_SAMPLE_CARD = {
  id: 'fitness-sample',
  title: 'Fitness Assessments',
  primary: 'Sample',
  secondary:
    'Save Max Push-ups, Max Pull-ups, Fran, Murph, or Cindy to unlock assessment cards.',
  trend: null,
  tab: 'fran',
  isSample: true,
  isPrompt: true,
}

const MILITARY_SAMPLE_CARD = {
  id: 'military-sample',
  title: 'Military Assessments',
  primary: 'Sample',
  secondary:
    'Save an Air Force, Army, Marine Corps, or Navy assessment overall score.',
  trend: null,
  tab: 'army-aft',
  isSample: true,
  isPrompt: true,
}

function recordsForMetric(allRecords, metric) {
  return allRecords.filter(
    (record) =>
      record.calculator_type === metric.calculatorType &&
      (!metric.exerciseName ||
        record.exercise_name === metric.exerciseName),
  )
}

function latestRecord(records) {
  if (!records?.length) return null
  return records[records.length - 1]
}

function withSampleFallback(cards, sampleCard) {
  return cards.length ? cards : [sampleCard]
}

function pushMassCard(cards, { id, title, rows, tab }) {
  const summary = computePerformanceSummary(rows, true)
  if (!summary) return
  const unit =
    rows[rows.length - 1]?.result_unit || rows[0]?.result_unit || 'lb'
  const previous =
    rows.length > 1 ? Number(rows[rows.length - 2].result_value) : null
  const delta = previous == null ? null : summary.latestValue - previous
  cards.push({
    id,
    title,
    primary: formatRecordValue(summary.latestValue, 'mass', unit),
    secondary:
      previous == null
        ? `PR ${formatRecordValue(summary.personalRecord, 'mass', unit)}`
        : `Previous ${formatRecordValue(previous, 'mass', unit)} · PR ${formatRecordValue(summary.personalRecord, 'mass', unit)}`,
    trend:
      delta == null ? null : getTrendDisplay(delta, 'number', unit, true),
    tab,
  })
}

function pushNumberMetricCard(
  cards,
  {
    id,
    title,
    rows,
    tab,
    higherIsBetter,
    unit = null,
    secondary = 'Latest result',
  },
) {
  const summary = computePerformanceSummary(rows, higherIsBetter)
  if (!summary) return
  const trend = getTrendDisplay(
    summary.improvementSinceFirst,
    'number',
    unit,
    higherIsBetter,
  )
  cards.push({
    id,
    title,
    primary: formatRecordValue(summary.latestValue, 'number', unit),
    secondary,
    trend,
    tab,
  })
}

/**
 * Build dashboard view-model from all user performance records.
 * @param {import('./performanceRecords').PerformanceRecord[]} allRecords
 * @param {{ actualAge?: number | null }} [options]
 */
export function buildDashboardModel(allRecords, options = {}) {
  const ascending = [...(allRecords || [])].sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at),
  )

  const byMetric = Object.fromEntries(
    DASHBOARD_GRAPH_METRICS.map((metric) => {
      let rows = recordsForMetric(ascending, metric)
      // Hide legacy stored Estimated 5K companion rows from graph sources.
      if (metric.id === 'running') {
        rows = excludeStoredEstimated5kRecords(rows)
      }
      return [metric.id, rows]
    }),
  )

  const summaryCards = []

  // KinesoScore — surfaced as hero ring on the dashboard, not a summary card
  let fpcScore = null
  {
    const rows = byMetric['fpc-score']
    const summary = computePerformanceSummary(rows, true)
    if (summary) {
      const previous =
        rows.length > 1 ? Number(rows[rows.length - 2].result_value) : null
      const delta =
        previous == null ? null : summary.latestValue - previous
      const trend = getTrendDisplay(delta, 'number', 'points', true)
      fpcScore = {
        value: summary.latestValue,
        primary: formatRecordValue(summary.latestValue, 'number'),
        secondary:
          previous == null
            ? `First saved ${BRAND.scoreName}`
            : `Previous ${formatRecordValue(previous, 'number')}`,
        previous,
        trend,
        tab: 'scoring',
      }
    }
  }

  // Fitness Age
  {
    const rows = byMetric['fitness-age']
    const summary = computePerformanceSummary(rows, false)
    if (summary) {
      const age = Number(options.actualAge)
      const hasAge = Number.isFinite(age) && age > 0
      const diff = hasAge ? age - summary.latestValue : null
      let secondary = 'Latest assessment'
      if (diff != null) {
        if (diff > 0) {
          secondary = `${diff} year${diff === 1 ? '' : 's'} younger than actual age`
        } else if (diff < 0) {
          const older = Math.abs(diff)
          secondary = `${older} year${older === 1 ? '' : 's'} older than actual age`
        } else {
          secondary = 'Matches your actual age'
        }
      }
      const trend = getTrendDisplay(
        summary.improvementSinceFirst,
        'number',
        'yr',
        false,
      )
      summaryCards.push({
        id: 'fitness-age',
        title: 'Fitness Age',
        primary: formatRecordValue(summary.latestValue, 'number', 'yr'),
        secondary,
        trend,
        tab: 'fitness-age',
      })
    }
  }

  // BMI
  {
    const rows = byMetric.bmi
    const summary = computePerformanceSummary(rows, false)
    if (summary) {
      const trend = getTrendDisplay(
        summary.improvementSinceFirst,
        'number',
        'BMI',
        false,
      )
      summaryCards.push({
        id: 'bmi',
        title: 'BMI',
        primary: formatRecordValue(summary.latestValue, 'number'),
        secondary: 'Current reading',
        trend,
        tab: 'bmi',
      })
    }
  }

  // Resting heart rate (saved with Fitness Age assessments)
  {
    const rows = ascending.filter(
      (record) =>
        record.calculator_type === FITNESS_AGE_CALCULATOR_TYPE &&
        record.exercise_name === RESTING_HEART_RATE_EXERCISE_NAME,
    )
    const latest = latestRecord(rows)
    if (latest) {
      const previous =
        rows.length > 1 ? Number(rows[rows.length - 2].result_value) : null
      const delta =
        previous == null ? null : Number(latest.result_value) - previous
      summaryCards.push({
        id: 'resting-hr',
        title: 'Resting Heart Rate',
        primary: formatRecordValue(
          latest.result_value,
          'number',
          latest.result_unit || 'bpm',
        ),
        secondary: `Last recorded ${formatRecordDate(latest.created_at)}`,
        trend:
          delta == null ? null : getTrendDisplay(delta, 'number', 'bpm', false),
        tab: 'fitness-age',
      })
    }
  }

  // Strength — SBD Total plus each individual 1RM when saved
  for (const track of STRENGTH_GRAPH_TRACKS) {
    const rows = ascending.filter(
      (record) =>
        record.calculator_type === 'strength' &&
        record.exercise_name === track.exerciseName,
    )
    pushMassCard(summaryCards, {
      id: track.id,
      title: track.label,
      rows,
      tab: 'strength',
    })
  }

  // Endurance (latest actual running distance — ignore legacy Estimated 5K rows)
  {
    const runRows = ascending.filter(
      (record) =>
        record.calculator_type === 'running' &&
        !isStoredEstimated5kRecord(record),
    )
    const latest = latestRecord(runRows)
    if (latest) {
      summaryCards.push({
        id: 'endurance',
        title: 'Endurance',
        primary: formatRecordValue(latest.result_value, 'duration'),
        secondary: latest.exercise_name || 'Latest run',
        trend: null,
        tab: 'running',
      })
    }
  }

  // VO₂ Max
  {
    const rows = ascending.filter(
      (record) => record.calculator_type === 'vo2max',
    )
    pushNumberMetricCard(summaryCards, {
      id: 'vo2max',
      title: 'VO₂ Max',
      rows,
      tab: 'vo2max',
      higherIsBetter: true,
      unit: 'ml/kg/min',
      secondary: 'Latest estimate',
    })
  }

  // BMR
  {
    const rows = ascending.filter((record) => record.calculator_type === 'bmr')
    pushNumberMetricCard(summaryCards, {
      id: 'bmr',
      title: 'BMR',
      rows,
      tab: 'bmr',
      higherIsBetter: false,
      unit: 'kcal/day',
      secondary: 'Latest estimate',
    })
  }

  // Military assessments — last Overall Score per military variant
  const assessmentSummaryCards = withSampleFallback(
    militaryCalculators
      .map((tool) => {
        const rows = ascending.filter(
          (record) =>
            record.calculator_type === tool.id &&
            record.exercise_name === MILITARY_OVERALL_EXERCISE,
        )
        const latest = latestRecord(rows)
        if (!latest) return null

        const previous =
          rows.length > 1 ? Number(rows[rows.length - 2].result_value) : null
        const delta =
          previous == null ? null : Number(latest.result_value) - previous
        const trend = getTrendDisplay(delta, 'number', 'points', true)

        return {
          id: tool.id,
          title: tool.name,
          // Match public leaderboard formatting (bare score, no "pts").
          primary: formatRecordValue(latest.result_value, 'number', null),
          secondary: `Last taken ${formatRecordDate(latest.created_at)}`,
          trend,
          tab: tool.id,
          badge: tool.badge || null,
        }
      })
      .filter(Boolean),
    MILITARY_SAMPLE_CARD,
  )

  // Fitness Assessments — one card per track (Fran/Murph Rx + Scaled separate).
  const fitnessAssessmentSummaryCards = withSampleFallback(
    FITNESS_ASSESSMENT_CARD_SLOTS.map((slot) => {
      const rows = ascending.filter(
        (record) =>
          record.calculator_type === slot.calculatorType &&
          record.exercise_name === slot.exerciseName,
      )
      const latest = latestRecord(rows)
      if (!latest) return null

      const unit = String(latest.result_unit || '').toLowerCase()
      const isTime = unit === 'sec'
      const isCindy = isCindyResult(latest)
      const previous =
        rows.length > 1 ? Number(rows[rows.length - 2].result_value) : null
      const delta =
        previous == null ? null : Number(latest.result_value) - previous
      const valueKind = isTime ? 'duration' : isCindy ? 'cindy' : 'number'
      const trend = getTrendDisplay(
        delta,
        valueKind,
        isTime || isCindy ? null : 'reps',
        slot.higherIsBetter,
      )

      const primary = isTime
        ? formatRecordValue(latest.result_value, 'duration', null, 'clock')
        : isCindy
          ? formatRecordValue(latest.result_value, 'cindy')
          : formatRecordValue(latest.result_value, 'number', null)

      return {
        id: slot.id,
        title: slot.title,
        primary,
        secondary: `Last logged ${formatRecordDate(latest.created_at)}`,
        trend,
        tab: slot.calculatorType,
      }
    }).filter(Boolean),
    FITNESS_SAMPLE_CARD,
  )

  const performanceSummaryCards = withSampleFallback(
    summaryCards,
    PERFORMANCE_SAMPLE_CARD,
  )

  // Keep a larger pool so the dashboard can expand past the default 5.
  // Omit legacy stored Estimated 5K companion rows from activity.
  const recentActivity = [...ascending]
    .reverse()
    .filter((record) => !isStoredEstimated5kRecord(record))
    .slice(0, 40)
    .map((record) => {
      const meta = ACTIVITY_META[record.calculator_type] || {}
      const valueKind = meta.valueKind || 'number'
      const title =
        meta.title ||
        record.exercise_name ||
        record.calculator_type ||
        'Saved result'
      const useExerciseTitle =
        record.calculator_type === 'strength' ||
        record.calculator_type === 'running' ||
        record.exercise_name === RESTING_HEART_RATE_EXERCISE_NAME
      return {
        id: record.id,
        dateLabel: formatRecordDate(record.created_at),
        title: useExerciseTitle ? record.exercise_name || title : title,
        valueLabel: isCindyResult(record)
          ? formatRecordValue(record.result_value, 'cindy')
          : formatRecordValue(record.result_value, valueKind, record.result_unit),
        tab: meta.tab || 'strength',
        createdAt: record.created_at,
      }
    })

  const personalRecords = {
    strength: [
      {
        id: 'bench',
        label: 'Best Bench',
        records: byMetric.bench,
        valueKind: 'mass',
        higherIsBetter: true,
      },
      {
        id: 'squat',
        label: 'Best Squat',
        records: byMetric.squat,
        valueKind: 'mass',
        higherIsBetter: true,
      },
      {
        id: 'deadlift',
        label: 'Best Deadlift',
        records: byMetric.deadlift,
        valueKind: 'mass',
        higherIsBetter: true,
      },
      {
        id: 'sbd-total',
        label: 'Best SBD Total',
        records: byMetric['sbd-total'],
        valueKind: 'mass',
        higherIsBetter: true,
      },
    ]
      .map((item) => {
        const summary = computePerformanceSummary(
          item.records,
          item.higherIsBetter,
        )
        if (!summary) return null
        const best = latestRecord(
          item.records.filter(
            (row) => Number(row.result_value) === summary.personalRecord,
          ),
        )
        return {
          id: item.id,
          label: item.label,
          valueLabel: formatRecordValue(
            summary.personalRecord,
            item.valueKind,
            best?.result_unit || item.records[0]?.result_unit || 'lb',
          ),
        }
      })
      .filter(Boolean),
    running: [
      {
        id: 'mile',
        label: 'Fastest 1 Mile',
        exerciseName: 'Mile',
      },
      {
        id: '5k',
        label: 'Fastest 5K',
        exerciseName: '5K',
      },
      {
        id: '10k',
        label: 'Fastest 10K',
        exerciseName: '10K',
      },
    ]
      .map((item) => {
        const rows = ascending.filter(
          (record) =>
            record.calculator_type === 'running' &&
            record.exercise_name === item.exerciseName,
        )
        const summary = computePerformanceSummary(rows, false)
        if (!summary) return null
        return {
          id: item.id,
          label: item.label,
          valueLabel: formatRecordValue(summary.personalRecord, 'duration'),
        }
      })
      .filter(Boolean),
  }

  return {
    ascending,
    byMetric,
    fpcScore,
    summaryCards: performanceSummaryCards,
    fitnessAssessmentSummaryCards,
    assessmentSummaryCards,
    recentActivity,
    personalRecords,
    hasAnyData: ascending.length > 0,
  }
}

/**
 * Load all records for the dashboard.
 * @param {string} userId
 */
export async function loadDashboardRecords(userId) {
  return fetchAllPerformanceRecords(userId)
}
