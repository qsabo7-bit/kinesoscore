import { BRAND } from '../data/brand'
import { DASHBOARD_GRAPH_METRICS, ACTIVITY_META } from '../data/dashboardMetrics'
import {
  computePerformanceSummary,
  fetchAllPerformanceRecords,
  formatRecordDate,
  formatRecordValue,
  getTrendDisplay,
} from './performanceRecords'

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
    DASHBOARD_GRAPH_METRICS.map((metric) => [
      metric.id,
      recordsForMetric(ascending, metric),
    ]),
  )

  const summaryCards = []

  // FPC Score — surfaced as hero ring on the dashboard, not a summary card
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

  // Strength (latest across lifts)
  {
    const strengthRows = ascending.filter(
      (record) => record.calculator_type === 'strength',
    )
    const latest = latestRecord(strengthRows)
    if (latest) {
      summaryCards.push({
        id: 'strength',
        title: 'Strength',
        primary: formatRecordValue(
          latest.result_value,
          'mass',
          latest.result_unit || 'lb',
        ),
        secondary: latest.exercise_name || 'Latest lift',
        trend: null,
        tab: 'strength',
      })
    }
  }

  // Endurance (latest running)
  {
    const runRows = ascending.filter(
      (record) => record.calculator_type === 'running',
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

  const recentActivity = [...ascending]
    .reverse()
    .slice(0, 12)
    .map((record) => {
      const meta = ACTIVITY_META[record.calculator_type] || {}
      const valueKind = meta.valueKind || 'number'
      const title =
        meta.title ||
        record.exercise_name ||
        record.calculator_type ||
        'Saved result'
      return {
        id: record.id,
        dateLabel: formatRecordDate(record.created_at),
        title:
          record.calculator_type === 'strength' ||
          record.calculator_type === 'running'
            ? record.exercise_name || title
            : title,
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
