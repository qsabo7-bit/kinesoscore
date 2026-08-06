import { convertMass } from '../calculations/units.js'
import {
  formatFriendlyDuration,
  formatRaceTime,
} from '../calculations/running.js'
import { supabase } from '../supabaseClient'

/**
 * @typedef {object} PerformanceRecord
 * @property {string} id
 * @property {string} user_id
 * @property {string} calculator_type
 * @property {string | null} exercise_name
 * @property {number} result_value
 * @property {string | null} result_unit
 * @property {string} created_at
 */

/**
 * @param {object} input
 * @param {string} input.userId
 * @param {string} input.calculatorType
 * @param {string} input.exerciseName
 * @param {number} input.resultValue
 * @param {string} [input.resultUnit]
 */
export async function savePerformanceRecord({
  userId,
  calculatorType,
  exerciseName,
  resultValue,
  resultUnit = null,
}) {
  const { data, error } = await supabase
    .from('performance_records')
    .insert({
      user_id: userId,
      calculator_type: calculatorType,
      exercise_name: exerciseName,
      result_value: resultValue,
      result_unit: resultUnit,
    })
    .select('*')
    .single()

  if (error) throw error
  return data
}

/**
 * @param {string} userId
 * @param {string} calculatorType
 * @param {string} [exerciseName]
 */
export async function fetchPerformanceRecords(
  userId,
  calculatorType,
  exerciseName,
) {
  let query = supabase
    .from('performance_records')
    .select('*')
    .eq('user_id', userId)
    .eq('calculator_type', calculatorType)
    .order('created_at', { ascending: true })

  if (exerciseName) {
    query = query.eq('exercise_name', exerciseName)
  }

  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

/**
 * @param {string} recordId
 */
export async function deletePerformanceRecord(recordId) {
  const { error } = await supabase
    .from('performance_records')
    .delete()
    .eq('id', recordId)

  if (error) throw error
}

export function formatRecordDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

/**
 * @param {number} value
 * @param {'mass' | 'duration' | 'number'} valueKind
 * @param {string | null} [unit]
 * @param {'clock' | 'words'} [timeFormat]
 */
export function formatRecordValue(
  value,
  valueKind = 'number',
  unit = null,
  timeFormat = 'clock',
) {
  if (!Number.isFinite(Number(value))) return '—'

  if (valueKind === 'duration') {
    return formatRaceTime(Number(value), timeFormat)
  }

  const num = Number(value)
  const rounded =
    Math.abs(num) >= 100 ? Math.round(num) : Math.round(num * 10) / 10
  return unit ? `${rounded} ${unit}` : String(rounded)
}

/**
 * Convert stored mass records into a display unit without rewriting the DB.
 * @param {PerformanceRecord[]} records
 * @param {'lb' | 'kg'} displayUnit
 */
export function recordsInMassUnit(records, displayUnit) {
  return records.map((record) => {
    const from = record.result_unit === 'kg' ? 'kg' : 'lb'
    const value = convertMass(Number(record.result_value), from, displayUnit)
    return {
      ...record,
      result_value: Math.round(value * 10) / 10,
      result_unit: displayUnit,
    }
  })
}

/**
 * @param {PerformanceRecord[]} records chronological ascending
 * @param {boolean} higherIsBetter
 */
export function computePerformanceSummary(records, higherIsBetter = true) {
  if (!records?.length) return null

  const values = records.map((record) => Number(record.result_value))
  const latest = records[records.length - 1]
  const first = records[0]
  const previous = records.length > 1 ? records[records.length - 2] : null
  const personalRecord = higherIsBetter
    ? Math.max(...values)
    : Math.min(...values)
  const averageValue =
    Math.round((values.reduce((sum, value) => sum + value, 0) / values.length) * 10) /
    10

  const improvement =
    previous == null
      ? null
      : Number(latest.result_value) - Number(previous.result_value)

  const improvementSinceFirst =
    records.length < 2
      ? null
      : Number(latest.result_value) - Number(first.result_value)

  return {
    personalRecord,
    latestValue: Number(latest.result_value),
    latestUnit: latest.result_unit,
    latestDate: latest.created_at,
    totalAttempts: records.length,
    averageValue,
    firstValue: Number(first.result_value),
    improvement,
    improvementSinceFirst,
    previousValue: previous ? Number(previous.result_value) : null,
    higherIsBetter,
  }
}

/**
 * Trend display for performance summaries.
 * Label is Increasing / Decreasing by raw numeric direction.
 * Tone "bad" (red) when the change is unfavorable:
 * - higher-is-better: decreasing is bad
 * - running (lower-is-better): increasing is bad
 *
 * @returns {{ label: string, value: string, tone: 'neutral' | 'good' | 'bad' }}
 */
export function getTrendDisplay(
  delta,
  valueKind,
  unit,
  higherIsBetter = true,
) {
  if (delta == null || !Number.isFinite(delta)) {
    return { label: 'Change', value: '—', tone: 'neutral' }
  }

  if (delta === 0) {
    return { label: 'No change', value: '0', tone: 'neutral' }
  }

  const increasing = delta > 0
  const label = increasing ? 'Increasing' : 'Decreasing'
  const unfavorable = higherIsBetter ? !increasing : increasing
  const tone = unfavorable ? 'bad' : 'good'

  if (valueKind === 'duration') {
    const amount = formatFriendlyDuration(Math.abs(delta))
    const arrow = increasing ? '↑' : '↓'
    return { label, value: `${amount} ${arrow}`, tone }
  }

  const abs = Math.abs(delta)
  const formatted = formatRecordValue(abs, 'number', unit)
  const sign = increasing ? '+' : '−'
  const arrow = increasing ? '↑' : '↓'
  return { label, value: `${sign}${formatted} ${arrow}`, tone }
}

/** @deprecated Use getTrendDisplay */
export function formatImprovementLabel(
  improvement,
  valueKind,
  unit,
  higherIsBetter,
) {
  return getTrendDisplay(improvement, valueKind, unit, higherIsBetter).value
}

/** Demo points for the locked guest preview chart. */
export const SAMPLE_PROGRESS_DATA = [
  { dateLabel: 'Jan', value: 185 },
  { dateLabel: 'Mar', value: 205 },
  { dateLabel: 'May', value: 225 },
  { dateLabel: 'Jul', value: 245 },
  { dateLabel: 'Aug', value: 275 },
]

export const SAMPLE_DURATION_DATA = [
  { dateLabel: 'Jan', value: 1600 },
  { dateLabel: 'Mar', value: 1520 },
  { dateLabel: 'May', value: 1480 },
  { dateLabel: 'Jul', value: 1420 },
  { dateLabel: 'Aug', value: 1380 },
]

/** Sample FPC Score curve (0–100 scale) for the locked guest preview. */
export const SAMPLE_SCORE_DATA = [
  { dateLabel: 'Jan', value: 42 },
  { dateLabel: 'Mar', value: 48 },
  { dateLabel: 'May', value: 55 },
  { dateLabel: 'Jul', value: 61 },
  { dateLabel: 'Aug', value: 68 },
]
