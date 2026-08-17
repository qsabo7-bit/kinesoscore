import { normalizeAvatarId } from '../data/avatarCatalog.js'
import { mapPublicAwardIdentity } from './awardIdentityFormat.js'
import { assignDenseRanks } from './leaderboardDenseRank.js'
import { supabase, isSupabaseConfigured } from '../supabaseClient'

/**
 * @param {'all_time'} [period]
 */
export async function fetchPublicHabitXp(period = 'all_time') {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.')
  }

  const { data, error } = await supabase.rpc('get_public_habit_xp', {
    p_period: period,
  })
  if (error) throw error

  const mapped = (data || []).map((row) => ({
    rank: Number(row.rank),
    leaderboard_name: String(row.leaderboard_name || ''),
    lifetime_xp: Number(row.lifetime_xp),
    avatar_id: normalizeAvatarId(row.avatar_id),
    awards: mapPublicAwardIdentity(row),
  }))

  return assignDenseRanks(mapped, (row) => row.lifetime_xp)
}

export function friendlyPublicHabitXpError(err) {
  const text = String(err?.message || err || '')
  if (/Invalid habit xp period|Invalid habit XP period/i.test(text)) {
    return 'That XP board is not available.'
  }
  if (/failed to fetch|networkerror|network request failed|load failed/i.test(text)) {
    return 'Network error. Check your connection and try again.'
  }
  if (/Could not find the function|PGRST202/i.test(text)) {
    return 'Habit XP leaderboards are not available yet. Please try again later.'
  }
  return 'Could not load the habit XP leaderboard. Please try again.'
}
