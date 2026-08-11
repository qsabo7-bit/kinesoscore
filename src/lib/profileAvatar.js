import {
  DEFAULT_AVATAR_ID,
  friendlyAvatarError,
  isValidAvatarId,
  normalizeAvatarId,
} from '../data/avatarCatalog.js'
import { isSupabaseConfigured, supabase } from '../supabaseClient'

export {
  DEFAULT_AVATAR_ID,
  friendlyAvatarError,
  isValidAvatarId,
  normalizeAvatarId,
}

function requireConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.')
  }
}

/**
 * @param {string} userId
 * @param {string} avatarId
 * @returns {Promise<string>} normalized avatar id
 */
export async function saveAvatarId(userId, avatarId) {
  if (!isValidAvatarId(avatarId)) {
    const err = new Error('That avatar is not available.')
    err.code = 'VALIDATION'
    throw err
  }

  if (!userId) {
    const err = new Error('You must be signed in to save an avatar.')
    err.code = 'VALIDATION'
    throw err
  }

  requireConfigured()

  const { data, error } = await supabase
    .from('profiles')
    .update({ avatar_id: avatarId })
    .eq('id', userId)
    .select('avatar_id')
    .maybeSingle()

  if (error) throw error
  if (!data) {
    const err = new Error('Could not update avatar. Try refreshing the page.')
    err.code = 'NOT_FOUND'
    throw err
  }
  return normalizeAvatarId(data.avatar_id)
}
