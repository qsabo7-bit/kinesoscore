import { supabase } from '../supabaseClient'

/**
 * @typedef {object} PerformanceRecord
 * @property {string} id
 * @property {string} user_id
 * @property {string} calculator_type
 * @property {number} result_value
 * @property {string | null} result_unit
 * @property {string} created_at
 */

/**
 * @param {object} input
 * @param {string} input.userId
 * @param {string} input.calculatorType
 * @param {number} input.resultValue
 * @param {string} [input.resultUnit]
 */
export async function savePerformanceRecord({
  userId,
  calculatorType,
  resultValue,
  resultUnit = null,
}) {
  const { data, error } = await supabase
    .from('performance_records')
    .insert({
      user_id: userId,
      calculator_type: calculatorType,
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
 */
export async function fetchPerformanceRecords(userId, calculatorType) {
  const { data, error } = await supabase
    .from('performance_records')
    .select('*')
    .eq('user_id', userId)
    .eq('calculator_type', calculatorType)
    .order('created_at', { ascending: true })

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

export function formatRecordValue(value, unit) {
  if (!Number.isFinite(Number(value))) return '—'
  const num = Number(value)
  const rounded =
    Math.abs(num) >= 100 ? Math.round(num) : Math.round(num * 10) / 10
  return unit ? `${rounded} ${unit}` : String(rounded)
}
