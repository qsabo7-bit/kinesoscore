import {
  estimateFiveKSeconds,
  RACE_DISTANCES_MILES,
} from '../calculations/running'
import {
  ESTIMATED_5K_EXERCISE_NAME,
  RUNNING_DISTANCE_TRACKS,
} from '../data/trackingTracks'
import { splitDurationParts } from './userDefaults'

const ACTUAL_DISTANCE_BY_NAME = new Map(
  RACE_DISTANCES_MILES.map((race) => [race.name, race]),
)

const ACTUAL_EXERCISE_NAMES = new Set(
  RUNNING_DISTANCE_TRACKS.map((track) => track.exerciseName),
)

/** True when exercise_name is a real race distance (not Estimated 5K). */
export function isActualRunningExerciseName(exerciseName) {
  return ACTUAL_EXERCISE_NAMES.has(exerciseName)
}

/** Legacy stored companion rows — keep in DB, hide from UI surfaces. */
export function isStoredEstimated5kRecord(record) {
  return record?.exercise_name === ESTIMATED_5K_EXERCISE_NAME
}

/** Drop legacy stored Estimated 5K rows from user-facing running lists. */
export function excludeStoredEstimated5kRecords(records) {
  return (records || []).filter((record) => !isStoredEstimated5kRecord(record))
}

/** Shared default keys for Estimated 5K autofill (from saved runs only). */
export const ESTIMATED_5K_DEFAULT_KEYS = [
  'fiveKHours',
  'fiveKMinutes',
  'fiveKSeconds',
]

export function isEstimated5kDefaultKey(key) {
  return ESTIMATED_5K_DEFAULT_KEYS.includes(key)
}

/**
 * Defaults patch for myKinesoScore / Fitness Age Estimated 5K autofill.
 * Clears fields when no valid actual running save remains.
 * Source must be saved running rows — never live form typing.
 */
export function estimated5kAutofillPatch(runningRecords) {
  const estimatedSeconds = getLatestEstimated5kSeconds(runningRecords)
  const parts =
    estimatedSeconds != null && estimatedSeconds > 0
      ? splitDurationParts(estimatedSeconds)
      : null
  if (!parts) {
    return {
      fiveKHours: '',
      fiveKMinutes: '',
      fiveKSeconds: '',
    }
  }
  return {
    fiveKHours: parts.hours,
    fiveKMinutes: parts.minutes,
    fiveKSeconds: parts.seconds,
  }
}

/**
 * Build display-only Estimated 5K points from actual saved running distances.
 * Does not invent Supabase rows — ids are tagged as derived.
 *
 * @param {Array<{ id: string, user_id?: string, calculator_type?: string, exercise_name?: string | null, result_value?: number, result_unit?: string | null, created_at?: string }>} runningRecords
 */
export function buildDerivedEstimated5kRecords(runningRecords) {
  const derived = []

  for (const record of runningRecords || []) {
    if (!isActualRunningExerciseName(record.exercise_name)) continue

    const race = ACTUAL_DISTANCE_BY_NAME.get(record.exercise_name)
    if (!race) continue

    const estimatedSeconds = estimateFiveKSeconds(
      race.miles,
      Number(record.result_value),
    )
    if (!Number.isFinite(estimatedSeconds) || estimatedSeconds <= 0) continue

    derived.push({
      id: `derived-estimated-5k:${record.id}`,
      user_id: record.user_id,
      calculator_type: record.calculator_type || 'running',
      exercise_name: ESTIMATED_5K_EXERCISE_NAME,
      result_value: estimatedSeconds,
      result_unit: 'sec',
      created_at: record.created_at,
      derived: true,
      source_record_id: record.id,
    })
  }

  return derived.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at),
  )
}

/**
 * Latest derived Estimated 5K seconds from actual running saves (ascending input OK).
 * @param {object[]} runningRecords
 * @returns {number | null}
 */
export function getLatestEstimated5kSeconds(runningRecords) {
  const derived = buildDerivedEstimated5kRecords(runningRecords)
  if (!derived.length) return null
  return Number(derived[derived.length - 1].result_value)
}
