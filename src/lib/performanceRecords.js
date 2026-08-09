import { convertMass } from '../calculations/units.js'
import {
  formatFriendlyDuration,
  formatRaceTime,
} from '../calculations/running.js'
import { clearCachedDashboardRecords } from './dashboardRecordsCache'
import { deleteFitnessScoreSnapshotForSource } from './fitnessScoreSnapshots.js'
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
  // Dashboard keeps an in-memory snapshot; drop it so the next visit refetches.
  clearCachedDashboardRecords()
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
 * All performance records for a user (ascending by created_at).
 * @param {string} userId
 */
export async function fetchAllPerformanceRecords(userId) {
  const { data, error } = await supabase
    .from('performance_records')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data ?? []
}

function isMissingRpcError(err) {
  return /PGRST202|Could not find the function|function .* does not exist/i.test(
    String(err?.message || err || ''),
  )
}

/**
 * Hard-delete one of the current user's performance records.
 * Prefers delete_own_performance_record RPC (clears myKinesoScore snapshot +
 * record atomically). Falls back to table deletes when the RPC is not deployed.
 *
 * @param {string} recordId
 */
export async function deletePerformanceRecord(recordId) {
  const id = String(recordId || '').trim()
  if (!id) throw new Error('Missing result id.')

  const { data: rpcId, error: rpcError } = await supabase.rpc(
    'delete_own_performance_record',
    { p_record_id: id },
  )

  if (!rpcError) {
    if (!rpcId) {
      throw new Error(
        'Could not delete that result. Refresh your history and try again.',
      )
    }
    clearCachedDashboardRecords()
    return { id: rpcId }
  }

  if (!isMissingRpcError(rpcError)) {
    const text = String(rpcError.message || '')
    if (/foreign key|23503|snapshot/i.test(text)) {
      throw new Error(
        'Could not delete this myKinesoScore save because related data is still linked. Please try again.',
      )
    }
    throw rpcError
  }

  // Fallback when migration 011 is not applied yet.
  try {
    await deleteFitnessScoreSnapshotForSource(id)
  } catch (snapErr) {
    const text = String(snapErr?.message || snapErr || '')
    throw new Error(
      /fitness_score_snapshots|snapshot/i.test(text)
        ? 'Could not delete this myKinesoScore save (linked awards snapshot). Please try again.'
        : text || 'Could not delete that result.',
    )
  }

  const { data, error } = await supabase
    .from('performance_records')
    .delete()
    .eq('id', id)
    .select('id')

  if (error) {
    const text = String(error.message || '')
    if (/foreign key|23503/i.test(text)) {
      throw new Error(
        'Could not delete this myKinesoScore save because related data is still linked. Please try again.',
      )
    }
    if (/Leaderboard Name|shared source|cannot be shared/i.test(text)) {
      throw new Error(
        'Could not delete this shared result. Run the latest delete SQL in Supabase, then try again.',
      )
    }
    throw error
  }
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(
      'Could not delete that result. Refresh your history and try again.',
    )
  }
  clearCachedDashboardRecords()
  return data[0]
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
 * Filter chronological records to a trailing time window.
 * @param {PerformanceRecord[]} records
 * @param {'1w' | '1m' | '3m' | '6m' | '1y' | 'all'} rangeId
 */
export function filterRecordsByRange(records, rangeId = 'all') {
  if (!records?.length || !rangeId || rangeId === 'all') {
    return records ?? []
  }

  const now = new Date()
  const start = new Date(now)

  switch (rangeId) {
    case '1w':
      start.setDate(start.getDate() - 7)
      break
    case '1m':
      start.setMonth(start.getMonth() - 1)
      break
    case '3m':
      start.setMonth(start.getMonth() - 3)
      break
    case '6m':
      start.setMonth(start.getMonth() - 6)
      break
    case '1y':
      start.setFullYear(start.getFullYear() - 1)
      break
    default:
      return records
  }

  const cutoff = start.getTime()
  return records.filter((record) => {
    const stamped = new Date(record.created_at).getTime()
    return Number.isFinite(stamped) && stamped >= cutoff
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
  const minValue = Math.min(...values)
  const maxValue = Math.max(...values)
  const personalRecord = higherIsBetter ? maxValue : minValue
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
    minValue,
    maxValue,
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

/** Demo points for the locked guest preview chart (typical recreational range). */
export const SAMPLE_PROGRESS_DATA = [
  { dateLabel: 'Jan', value: 135 },
  { dateLabel: 'Mar', value: 145 },
  { dateLabel: 'May', value: 155 },
  { dateLabel: 'Jul', value: 160 },
  { dateLabel: 'Aug', value: 170 },
]

/** Sample race times in seconds (~32:00 → ~28:00 5K). */
export const SAMPLE_DURATION_DATA = [
  { dateLabel: 'Jan', value: 1920 },
  { dateLabel: 'Mar', value: 1860 },
  { dateLabel: 'May', value: 1800 },
  { dateLabel: 'Jul', value: 1740 },
  { dateLabel: 'Aug', value: 1680 },
]

/** Sample FPC Score curve (0–100 scale) for the locked guest preview. */
export const SAMPLE_SCORE_DATA = [
  { dateLabel: 'Jan', value: 38 },
  { dateLabel: 'Mar', value: 42 },
  { dateLabel: 'May', value: 45 },
  { dateLabel: 'Jul', value: 48 },
  { dateLabel: 'Aug', value: 52 },
]

/** Sample BMI curve for the locked guest preview. */
export const SAMPLE_BMI_DATA = [
  { dateLabel: 'Jan', value: 25.2 },
  { dateLabel: 'Mar', value: 24.8 },
  { dateLabel: 'May', value: 24.4 },
  { dateLabel: 'Jul', value: 24.1 },
  { dateLabel: 'Aug', value: 23.7 },
]

/** Sample Fitness Age curve (lower is better). */
export const SAMPLE_FITNESS_AGE_DATA = [
  { dateLabel: 'Jan', value: 36 },
  { dateLabel: 'Mar', value: 35 },
  { dateLabel: 'May', value: 34 },
  { dateLabel: 'Jul', value: 33 },
  { dateLabel: 'Aug', value: 32 },
]
