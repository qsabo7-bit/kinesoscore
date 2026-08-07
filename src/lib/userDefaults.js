import { supabase } from '../supabaseClient'

export const DEFAULTS_STORAGE_PREFIX = 'fpc.userDefaults.'

/** Shared calculator fields carried across tabs for signed-in users. */
export const EMPTY_USER_DEFAULTS = {
  age: '',
  gender: '',
  massUnit: 'lb',
  heightUnit: 'in',
  distanceUnit: 'mi',
  bodyweight: '',
  height: '',
  lift: 'bench',
  liftWeight: '',
  reps: '',
  /** Per-lift weight/reps (shared by individual Strength tabs + SBD Calculate). */
  benchWeight: '',
  benchReps: '',
  squatWeight: '',
  squatReps: '',
  deadliftWeight: '',
  deadliftReps: '',
  /** Known 1RMs for SBD "I know my SBD total" / known-1RM entry. */
  bench1rm: '',
  squat1rm: '',
  deadlift1rm: '',
  /** Per-lift SBD calculate entry: reps | known */
  benchEntryMode: 'reps',
  squatEntryMode: 'reps',
  deadliftEntryMode: 'reps',
  /** Strength calculator tab: sbd-total | bench | squat | deadlift */
  strengthTab: 'sbd-total',
  /** SBD Total input method: calculate | enter */
  sbdInputMode: 'calculate',
  sbdTotal: '',
  /** Fitness Score strength source: sbd | lift */
  scoreStrengthMode: 'sbd',
  vo2Max: '',
  restingHr: '',
  bodyFat: '',
  weeklySessions: '',
  strengthScore: '',
  activityId: '',
  /** Selected standard race id on Running (dropdown). */
  raceDistanceId: '5k',
  /** Last race / time-trial inputs (legacy numeric distance; Running UI uses raceDistanceId). */
  raceDistance: '',
  raceHours: '',
  raceMinutes: '',
  raceSeconds: '',
  /**
   * Canonical Estimated 5K autofill for Fitness Age + myKinesoScore.
   * Derived from the newest saved actual running distance (not a stored series).
   */
  fiveKHours: '',
  fiveKMinutes: '',
  fiveKSeconds: '',
  /** VO₂ Max calculator-specific inputs. */
  vo2Method: 'cooper',
  cooperDistance: '',
  walkMinutes: '',
  walkSeconds: '',
  endingHeartRate: '',
}

/** Split total seconds into hour / minute / second strings for form fields. */
export function splitDurationParts(totalSeconds) {
  // null/undefined must not coerce to 0 via Number(null).
  if (totalSeconds == null || totalSeconds === '') return null
  const sec = Math.round(Number(totalSeconds))
  if (!Number.isFinite(sec) || sec <= 0) return null
  return {
    hours: String(Math.floor(sec / 3600)),
    minutes: String(Math.floor((sec % 3600) / 60)),
    seconds: String(sec % 60),
  }
}

let defaultsTableUnavailable = false

function storageKey(userId) {
  return `${DEFAULTS_STORAGE_PREFIX}${userId}`
}

export function readLocalDefaults(userId) {
  if (!userId || typeof localStorage === 'undefined') return { ...EMPTY_USER_DEFAULTS }
  try {
    const raw = localStorage.getItem(storageKey(userId))
    if (!raw) return { ...EMPTY_USER_DEFAULTS }
    const parsed = JSON.parse(raw)
    return { ...EMPTY_USER_DEFAULTS, ...parsed }
  } catch {
    return { ...EMPTY_USER_DEFAULTS }
  }
}

export function writeLocalDefaults(userId, defaults) {
  if (!userId || typeof localStorage === 'undefined') return
  try {
    localStorage.setItem(storageKey(userId), JSON.stringify(defaults))
  } catch {
    // Ignore quota / private mode failures.
  }
}

export function clearLocalDefaults(userId) {
  if (!userId || typeof localStorage === 'undefined') return
  try {
    localStorage.removeItem(storageKey(userId))
  } catch {
    // ignore
  }
}

function isMissingDefaultsTable(error) {
  if (!error) return false
  const code = String(error.code || '')
  const status = Number(error.status || error.statusCode || 0)
  const message = String(error.message || '')
  return (
    code === 'PGRST205' ||
    code === '42P01' ||
    status === 404 ||
    /Could not find the table .*user_defaults/i.test(message) ||
    /relation .*user_defaults.* does not exist/i.test(message)
  )
}

/**
 * @param {string} userId
 * @returns {Promise<Record<string, string>>}
 */
export async function fetchUserDefaults(userId) {
  const local = readLocalDefaults(userId)
  if (defaultsTableUnavailable) return local

  try {
    const { data, error } = await supabase
      .from('user_defaults')
      .select('defaults')
      .eq('user_id', userId)
      .maybeSingle()

    if (error) throw error
    if (!data?.defaults || typeof data.defaults !== 'object') return local

    const merged = { ...EMPTY_USER_DEFAULTS, ...local, ...data.defaults }
    writeLocalDefaults(userId, merged)
    return merged
  } catch (error) {
    if (isMissingDefaultsTable(error)) {
      defaultsTableUnavailable = true
    }
    return local
  }
}

/**
 * @param {string} userId
 * @param {Record<string, string>} defaults
 */
export async function saveUserDefaults(userId, defaults) {
  writeLocalDefaults(userId, defaults)
  if (defaultsTableUnavailable) return

  try {
    const { error } = await supabase.from('user_defaults').upsert({
      user_id: userId,
      defaults,
      updated_at: new Date().toISOString(),
    })
    if (error) throw error
  } catch (error) {
    if (isMissingDefaultsTable(error)) {
      defaultsTableUnavailable = true
    }
  }
}
