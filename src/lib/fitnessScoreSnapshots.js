import { supabase, isSupabaseConfigured } from '../supabaseClient'

function requireConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.')
  }
}

/**
 * @param {unknown} err
 * @param {string} [fallback]
 */
export function friendlyFitnessSnapshotError(
  err,
  fallback = 'Could not save your fitness score snapshot. Please try again.',
) {
  const text = String(err?.message || err || '')
  if (/duplicate key|unique constraint|fitness_score_snapshots_source_unique/i.test(text)) {
    return 'This score was already snapshotted.'
  }
  if (/failed to fetch|networkerror|network request failed|load failed/i.test(text)) {
    return 'Network error. Check your connection and try again.'
  }
  if (/Could not find the table|PGRST205/i.test(text)) {
    return 'Fitness score snapshots are not available yet. Please try again later.'
  }
  return fallback
}

/**
 * Append a private snapshot for a successful myKinesoScore save.
 * Unique on source_record_id prevents duplicate inserts for the same save.
 *
 * @param {object} input
 * @param {string} input.userId
 * @param {string} input.sourceRecordId
 * @param {number} input.fitnessScore
 * @param {number} input.strengthScore
 * @param {number} input.runningScore
 */
export async function saveFitnessScoreSnapshot({
  userId,
  sourceRecordId,
  fitnessScore,
  strengthScore,
  runningScore,
}) {
  requireConfigured()

  const fitness = Math.round(Number(fitnessScore))
  const strength = Math.round(Number(strengthScore))
  const running = Math.round(Number(runningScore))

  if (!userId || !sourceRecordId) {
    throw new Error('Missing snapshot identity.')
  }
  if (
    ![fitness, strength, running].every(
      (n) => Number.isFinite(n) && n >= 0 && n <= 100,
    )
  ) {
    throw new Error('Invalid fitness score snapshot values.')
  }

  const { data, error } = await supabase
    .from('fitness_score_snapshots')
    .insert({
      user_id: userId,
      source_record_id: sourceRecordId,
      fitness_score: fitness,
      strength_score: strength,
      running_score: running,
    })
    .select(
      'id, user_id, source_record_id, fitness_score, strength_score, running_score, created_at',
    )
    .single()

  if (error) throw error
  return data
}

function isMissingSnapshotsTableError(err) {
  return /PGRST205|Could not find the table|schema cache/i.test(
    String(err?.message || err || ''),
  )
}

/**
 * Remove the private snapshot for a myKinesoScore performance save (if any).
 * Safe no-op when no snapshot exists or the table is not deployed yet.
 * Verifies the row is gone — RLS can return success for 0 deleted rows.
 *
 * @param {string} sourceRecordId
 */
export async function deleteFitnessScoreSnapshotForSource(sourceRecordId) {
  requireConfigured()
  const id = String(sourceRecordId || '').trim()
  if (!id) return

  const { error } = await supabase
    .from('fitness_score_snapshots')
    .delete()
    .eq('source_record_id', id)
    .select('id')

  if (error) {
    if (isMissingSnapshotsTableError(error)) return
    throw error
  }

  // Confirm RLS did not silently block the delete while a row remains.
  const { data: remaining, error: checkError } = await supabase
    .from('fitness_score_snapshots')
    .select('id')
    .eq('source_record_id', id)
    .maybeSingle()

  if (checkError) {
    if (isMissingSnapshotsTableError(checkError)) return
    throw checkError
  }
  if (remaining) {
    throw new Error(
      'Could not clear the awards snapshot linked to this myKinesoScore save.',
    )
  }
}

/**
 * Latest private snapshot for award display.
 * @param {string} userId
 */
export async function fetchLatestFitnessScoreSnapshot(userId) {
  requireConfigured()
  if (!userId) return null

  const { data, error } = await supabase
    .from('fitness_score_snapshots')
    .select(
      'id, user_id, source_record_id, fitness_score, strength_score, running_score, created_at',
    )
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error
  return data
}
