import { HABIT_CATALOG, habitCatalogByKey } from '../data/habitCatalog.js'
import { supabase, isSupabaseConfigured } from '../supabaseClient'
import { localDateKey } from './habitDates.js'

function requireConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.')
  }
}

/**
 * @param {unknown} err
 * @param {string} [fallback]
 */
export function friendlyHabitError(
  err,
  fallback = 'Could not update habits. Please try again.',
) {
  const code = err?.code || err?.error?.code
  const text = String(err?.message || err || '')

  if (
    code === '23505' ||
    /duplicate key|unique constraint|habits_user_key_unique|habit_checkins_user_habit_date_unique/i.test(
      text,
    )
  ) {
    return 'That habit update conflicted with an existing entry. Refresh and try again.'
  }
  if (/Habit checkin must reference your own habit|Not allowed/i.test(text)) {
    return 'You can only update your own habits.'
  }
  if (/failed to fetch|networkerror|network request failed|load failed/i.test(text)) {
    return 'Network error. Check your connection and try again.'
  }
  if (/Could not find the table/i.test(text)) {
    return 'Habits is not available yet. Please try again later.'
  }
  return fallback
}

/** @param {string} userId */
export async function fetchUserHabits(userId) {
  requireConfigured()
  const { data, error } = await supabase
    .from('habits')
    .select('id, user_id, habit_key, habit_name, sort_order, is_active, created_at, updated_at')
    .eq('user_id', userId)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) throw error
  return data || []
}

/** @param {string} userId */
export async function fetchActiveHabits(userId) {
  const rows = await fetchUserHabits(userId)
  return rows.filter((row) => row.is_active)
}

/**
 * @param {string} userId
 * @param {{ fromDate?: string, toDate?: string }} [range]
 */
export async function fetchHabitCheckins(userId, range = {}) {
  requireConfigured()
  let query = supabase
    .from('habit_checkins')
    .select(
      'id, user_id, habit_id, checkin_date, completed, xp_awarded, created_at, updated_at',
    )
    .eq('user_id', userId)
    .order('checkin_date', { ascending: false })

  if (range.fromDate) query = query.gte('checkin_date', range.fromDate)
  if (range.toDate) query = query.lte('checkin_date', range.toDate)

  const { data, error } = await query
  if (error) throw error
  return data || []
}

/**
 * Activate a catalog habit (insert or reactivate soft-removed row).
 * @param {string} userId
 * @param {string} habitKey
 */
export async function addHabitFromCatalog(userId, habitKey) {
  requireConfigured()
  const catalog = habitCatalogByKey(habitKey)
  if (!catalog) throw new Error('Unknown habit.')

  const existing = await fetchUserHabits(userId)
  const prior = existing.find((row) => row.habit_key === habitKey)
  const nextOrder =
    existing.reduce((max, row) => Math.max(max, Number(row.sort_order) || 0), -1) +
    1

  if (prior) {
    if (prior.is_active) {
      throw Object.assign(new Error('Habit already active'), { code: '23505' })
    }
    const { data, error } = await supabase
      .from('habits')
      .update({
        is_active: true,
        habit_name: catalog.name,
        sort_order: nextOrder,
        updated_at: new Date().toISOString(),
      })
      .eq('id', prior.id)
      .eq('user_id', userId)
      .select()
      .single()
    if (error) throw error
    return data
  }

  const { data, error } = await supabase
    .from('habits')
    .insert({
      user_id: userId,
      habit_key: catalog.key,
      habit_name: catalog.name,
      sort_order: nextOrder,
      is_active: true,
    })
    .select()
    .single()
  if (error) throw error
  return data
}

/**
 * Soft-remove: keeps checkin history for streak explainability.
 * @param {string} userId
 * @param {string} habitId
 */
export async function deactivateHabit(userId, habitId) {
  requireConfigured()
  const { data, error } = await supabase
    .from('habits')
    .update({
      is_active: false,
      updated_at: new Date().toISOString(),
    })
    .eq('id', habitId)
    .eq('user_id', userId)
    .select()
    .single()
  if (error) throw error
  return data
}

/**
 * @param {string} userId
 * @param {string[]} orderedActiveHabitIds
 */
export async function reorderActiveHabits(userId, orderedActiveHabitIds) {
  requireConfigured()
  const now = new Date().toISOString()
  const updates = orderedActiveHabitIds.map((id, index) =>
    supabase
      .from('habits')
      .update({ sort_order: index, updated_at: now })
      .eq('id', id)
      .eq('user_id', userId)
      .eq('is_active', true),
  )
  const results = await Promise.all(updates)
  const failed = results.find((r) => r.error)
  if (failed?.error) throw failed.error
}

/**
 * Persist a single day's completion for one habit (upsert).
 * @param {string} userId
 * @param {string} habitId
 * @param {boolean} completed
 * @param {string} [dateKey]
 */
export async function setHabitCheckin(
  userId,
  habitId,
  completed,
  dateKey = localDateKey(),
) {
  requireConfigured()
  const { data, error } = await supabase
    .from('habit_checkins')
    .upsert(
      {
        user_id: userId,
        habit_id: habitId,
        checkin_date: dateKey,
        completed: Boolean(completed),
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,habit_id,checkin_date' },
    )
    .select()
    .single()
  if (error) throw error
  return data
}

export function availableCatalogHabits(userHabits) {
  const activeKeys = new Set(
    (userHabits || []).filter((h) => h.is_active).map((h) => h.habit_key),
  )
  const featuredOrder = new Map(
    [
      'sleep_7_8',
      'protein',
      'water',
      'mobility',
      'strength',
      'nature',
      'exercise',
      'walk_move',
      'sleep_schedule',
      'screen_limit',
      'recovery_day',
      'meditation',
    ].map((key, index) => [key, index]),
  )
  return HABIT_CATALOG.filter((item) => !activeKeys.has(item.key)).sort(
    (a, b) => {
      const ai = featuredOrder.has(a.key)
        ? featuredOrder.get(a.key)
        : 100 + HABIT_CATALOG.findIndex((item) => item.key === a.key)
      const bi = featuredOrder.has(b.key)
        ? featuredOrder.get(b.key)
        : 100 + HABIT_CATALOG.findIndex((item) => item.key === b.key)
      return ai - bi
    },
  )
}
