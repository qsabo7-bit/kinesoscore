import { BRAND } from '../data/brand'
import {
  fitnessCalculators,
  militaryCalculators,
} from '../data/calculators'
import { DASHBOARD_GRAPH_METRICS, ACTIVITY_META } from '../data/dashboardMetrics'
import {
  FITNESS_AGE_CALCULATOR_TYPE,
  RESTING_HEART_RATE_EXERCISE_NAME,
} from '../data/trackingTracks'
import {
  computePerformanceSummary,
  fetchAllPerformanceRecords,
  formatRecordDate,
  formatRecordValue,
  getTrendDisplay,
} from './performanceRecords'
import {
  excludeStoredEstimated5kRecords,
  isStoredEstimated5kRecord,
} from './runningTracking'

const MILITARY_OVERALL_EXERCISE = 'Overall Score'

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

  // Strength — prefer SBD Total; otherwise prompt when individual lifts exist
  {
    const sbdRows = byMetric['sbd-total'] || []
    const sbdSummary = computePerformanceSummary(sbdRows, true)
    const individualStrength = ascending.filter(
      (record) =>
        record.calculator_type === 'strength' &&
        record.exercise_name !== 'SBD Total',
    )

    if (sbdSummary) {
      const previous =
        sbdRows.length > 1
          ? Number(sbdRows[sbdRows.length - 2].result_value)
          : null
      const delta =
        previous == null ? null : sbdSummary.latestValue - previous
      const trend =
        delta == null ? null : getTrendDisplay(delta, 'mass', 'lb', true)
      const unit =
        sbdRows[sbdRows.length - 1]?.result_unit ||
        sbdRows[0]?.result_unit ||
        'lb'
      summaryCards.push({
        id: 'strength',
        title: 'Strength',
        primary: formatRecordValue(sbdSummary.latestValue, 'mass', unit),
        secondary:
          previous == null
            ? `PR ${formatRecordValue(sbdSummary.personalRecord, 'mass', unit)}`
            : `Previous ${formatRecordValue(previous, 'mass', unit)} · PR ${formatRecordValue(sbdSummary.personalRecord, 'mass', unit)}`,
        trend,
        tab: 'strength',
      })
    } else if (individualStrength.length) {
      summaryCards.push({
        id: 'strength',
        title: 'Strength',
        primary: 'SBD Total',
        secondary:
          'Complete an SBD Total assessment for a more accurate overall strength profile.',
        trend: null,
        tab: 'strength',
        isPrompt: true,
      })
    }
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

  // Military assessments — last Overall Score per military variant
  const assessmentSummaryCards = militaryCalculators
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
        primary: formatRecordValue(latest.result_value, 'number', 'pts'),
        secondary: `Last taken ${formatRecordDate(latest.created_at)}`,
        trend,
        tab: tool.id,
        badge: tool.badge || null,
      }
    })
    .filter(Boolean)

  // Fitness Assessments — latest save per tool (Rx/Scaled share one card)
  const fitnessAssessmentSummaryCards = fitnessCalculators
    .map((tool) => {
      const rows = ascending.filter(
        (record) => record.calculator_type === tool.id,
      )
      const latest = latestRecord(rows)
      if (!latest) return null

      const unit = String(latest.result_unit || '').toLowerCase()
      const isTime = unit === 'sec'
      const previous =
        rows.length > 1 ? Number(rows[rows.length - 2].result_value) : null
      const delta =
        previous == null ? null : Number(latest.result_value) - previous
      const trend = getTrendDisplay(
        delta,
        isTime ? 'duration' : 'number',
        isTime ? null : 'reps',
        !isTime,
      )

      return {
        id: tool.id,
        title: tool.name,
        primary: isTime
          ? formatRecordValue(latest.result_value, 'duration', null, 'clock')
          : formatRecordValue(latest.result_value, 'number', null),
        secondary: `${latest.exercise_name || tool.name} · ${formatRecordDate(latest.created_at)}`,
        trend,
        tab: tool.id,
        badge: tool.badge || null,
      }
    })
    .filter(Boolean)

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
        valueLabel: formatRecordValue(
          record.result_value,
          valueKind,
          record.result_unit,
        ),
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
    summaryCards,
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
