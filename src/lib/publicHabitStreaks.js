import { mapPublicAwardIdentity } from './awardIdentityFormat.js'
import { assignDenseRanks } from './leaderboardDenseRank.js'
import { supabase, isSupabaseConfigured } from '../supabaseClient'

/**
 * @param {'all_time'} [period]
 */
export async function fetchPublicHabitStreaks(period = 'all_time') {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.')
  }

  const { data, error } = await supabase.rpc('get_public_habit_streaks', {
    p_period: period,
  })
  if (error) throw error

  const mapped = (data || []).map((row) => ({
    rank: Number(row.rank),
    leaderboard_name: String(row.leaderboard_name || ''),
    streak: Number(row.streak),
    awards: mapPublicAwardIdentity(row),
  }))

  // Re-apply dense ranks by streak so equal values tie even before SQL migration.
  return assignDenseRanks(mapped, (row) => row.streak)
}

export function friendlyPublicHabitStreakError(err) {
  const text = String(err?.message || err || '')
  if (/Invalid habit streak period/i.test(text)) {
    return 'That streak board is not available.'
  }
  if (/failed to fetch|networkerror|network request failed|load failed/i.test(text)) {
    return 'Network error. Check your connection and try again.'
  }
  if (/Could not find the function|PGRST202/i.test(text)) {
    return 'Habit streak leaderboards are not available yet. Please try again later.'
  }
  return 'Could not load the habit streak leaderboard. Please try again.'
}
