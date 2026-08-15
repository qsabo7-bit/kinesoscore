import { supabase, isSupabaseConfigured } from '../supabaseClient'

export {
  aggregateActivityTotals,
  buildActivityLeaderboard,
  computeGroupLogStreak,
  countUniqueLoggers,
  formatActivityAmount,
  formatActivityFeedLine,
  formatLeaderboardAmount,
  formatLocalWeekRangeLabel,
  formatMemberHandle,
  formatRelativeActivityTime,
  localWeekEndKey,
  localWeekStartKey,
  parseGroupIdFromPath,
  parseGroupsRoute,
  pathForGroup,
  shiftLocalWeekStart,
  topLeaderboardEntry,
} from './groupActivityWeeks.js'

function requireConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Supabase is not configured.')
  }
}

/** PostgREST sometimes returns a one-row composite as an array. */
function normalizeRpcRow(data) {
  if (Array.isArray(data)) return data[0] ?? null
  return data ?? null
}

/**
 * @param {unknown} err
 * @param {string} [fallback]
 */
export function friendlyGroupError(
  err,
  fallback = 'Could not update groups. Please try again.',
) {
  const text = String(err?.message || err || '')

  if (/Not authenticated/i.test(text)) {
    return 'Sign in to use Groups.'
  }
  if (/Group name must be between/i.test(text)) {
    return 'Group name must be between 1 and 40 characters.'
  }
  if (/Group description must be/i.test(text)) {
    return 'Group description must be 200 characters or fewer.'
  }
  if (/maximum of 3 groups/i.test(text)) {
    return 'You can belong to a maximum of 3 groups. Leave a group before joining another.'
  }
  if (/invite code isn.?t valid|Invalid invite code/i.test(text)) {
    return "That invite code isn't valid."
  }
  if (/already a member/i.test(text)) {
    return 'You are already a member of this group.'
  }
  if (/Enter an invite code/i.test(text)) {
    return 'Enter an invite code.'
  }
  if (/That assessment leaderboard is not enabled/i.test(text)) {
    return 'That assessment leaderboard is not enabled for this group.'
  }
  if (/only share your own/i.test(text)) {
    return 'You can only share your own assessments.'
  }
  if (/Cannot remove the group admin/i.test(text)) {
    return 'Cannot remove the group admin.'
  }
  if (/Only group admins can update this group/i.test(text)) {
    return 'Only group admins can update this group.'
  }
  if (/Only group admins can configure leaderboards/i.test(text)) {
    return 'Only group admins can configure leaderboards.'
  }
  if (/Not a member of this group/i.test(text)) {
    return 'You are not a member of this group.'
  }
  if (/Only the owner or a group admin can delete this log/i.test(text)) {
    return 'Only the owner or a group admin can delete this log.'
  }
  if (/Only group admins can remove member leaderboard results/i.test(text)) {
    return 'Only group admins can remove leaderboard results.'
  }
  if (/Only the owner or a group admin can remove this result/i.test(text)) {
    return 'Only the owner or a group admin can remove this result.'
  }
  if (/Only group admins/i.test(text)) {
    return 'Only group admins can do that.'
  }
  if (/Activity amount must be greater than zero/i.test(text)) {
    return 'Enter an amount greater than zero.'
  }
  if (/That activity is disabled/i.test(text)) {
    return 'That activity is disabled for this group.'
  }
  if (/Activity name must be between/i.test(text)) {
    return 'Activity name must be between 1 and 60 characters.'
  }
  if (/Activity unit must be between/i.test(text)) {
    return 'Activity unit must be between 1 and 24 characters.'
  }
  if (/already exists in this group/i.test(text)) {
    return 'An activity with that name already exists in this group.'
  }
  if (/Overview can show at most 6/i.test(text)) {
    return 'Overview can show at most 6 activities. Turn one off first.'
  }
  if (/Invalid group icon/i.test(text)) {
    return 'That group icon is not available. Pick another.'
  }
  if (/Challenge goal must be/i.test(text)) {
    return 'Challenge goal must be greater than zero.'
  }
  if (/Pick another member to become admin/i.test(text)) {
    return 'Pick another member to become admin.'
  }
  if (/Could not find the (table|function)|schema cache/i.test(text)) {
    return 'Groups is not available yet. Please try again later.'
  }
  if (/failed to fetch|networkerror|network request failed|load failed/i.test(text)) {
    return 'Network error. Check your connection and try again.'
  }
  return fallback
}

/**
 * @returns {Promise<Array<{
 *   id: string,
 *   name: string,
 *   description: string | null,
 *   invite_code: string,
 *   created_by: string,
 *   created_at: string,
 *   my_role: string,
 *   member_count: number,
 * }>>}
 */
export async function listMyGroups() {
  requireConfigured()
  const { data, error } = await supabase.rpc('list_my_groups')
  if (error) throw error
  return (data || []).map((row) => ({
    ...row,
    member_count: Number(row.member_count) || 0,
  }))
}

/**
 * @param {string} name
 * @param {string} [description]
 */
export async function createGroup(name, description = '') {
  requireConfigured()
  const { data, error } = await supabase.rpc('create_group', {
    p_name: name,
    p_description: description || null,
  })
  if (error) throw error
  return data
}

/**
 * @param {string} inviteCode
 */
export async function joinGroupByInvite(inviteCode) {
  requireConfigured()
  const { data, error } = await supabase.rpc('join_group_by_invite', {
    p_invite_code: inviteCode,
  })
  if (error) throw error
  return data
}

/**
 * @param {string} groupId
 */
export async function fetchGroup(groupId) {
  requireConfigured()
  if (!groupId) return null
  const { data, error } = await supabase
    .from('groups')
    .select(
      'id, name, description, invite_code, created_by, created_at, avatar_id, challenge_activity_type_id, challenge_goal',
    )
    .eq('id', groupId)
    .maybeSingle()
  if (error) throw error
  return data
}

/**
 * @param {string} groupId
 * @returns {Promise<Array<{
 *   user_id: string,
 *   role: string,
 *   joined_at: string,
 *   leaderboard_name: string | null,
 *   display_name: string | null,
 *   avatar_id: string | null,
 * }>>}
 */
export async function fetchGroupMembers(groupId) {
  requireConfigured()
  const { data, error } = await supabase.rpc('get_group_members', {
    p_group_id: groupId,
  })
  if (error) throw error
  return data || []
}

/**
 * @param {string} groupId
 */
export async function leaveGroup(groupId) {
  requireConfigured()
  const { error } = await supabase.rpc('leave_group', {
    p_group_id: groupId,
  })
  if (error) throw error
}

/**
 * @param {string} groupId
 * @param {string} userId
 */
export async function removeGroupMember(groupId, userId) {
  requireConfigured()
  const { error } = await supabase.rpc('remove_group_member', {
    p_group_id: groupId,
    p_user_id: userId,
  })
  if (error) throw error
}

/**
 * @param {string} groupId
 */
export async function deleteGroup(groupId) {
  requireConfigured()
  const { error } = await supabase.rpc('delete_group', {
    p_group_id: groupId,
  })
  if (error) throw error
}

/**
 * @param {string} groupId
 * @returns {Promise<Array<{
 *   id: string,
 *   group_id: string,
 *   name: string,
 *   unit: string,
 *   higher_is_better: boolean,
 *   is_enabled: boolean,
 *   sort_order: number,
 *   created_at: string,
 * }>>}
 */
export async function fetchGroupActivityTypes(groupId) {
  requireConfigured()
  const { data, error } = await supabase
    .from('group_activity_types')
    .select(
      'id, group_id, name, unit, higher_is_better, is_enabled, show_on_leaderboard, show_on_overview, weekly_goal, sort_order, created_at',
    )
    .eq('group_id', groupId)
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true })
  if (error) throw error
  return data || []
}

/**
 * @param {string} groupId
 * @param {string} weekStartKey Monday YYYY-MM-DD
 * @param {string} weekEndKey Sunday YYYY-MM-DD
 */
export async function fetchGroupActivityLogsForWeek(
  groupId,
  weekStartKey,
  weekEndKey,
) {
  requireConfigured()
  const { data, error } = await supabase
    .from('group_activity_logs')
    .select('id, group_id, user_id, activity_type_id, amount, activity_date, created_at')
    .eq('group_id', groupId)
    .gte('activity_date', weekStartKey)
    .lte('activity_date', weekEndKey)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

/**
 * Recent logs for the group activity feed (membership RLS enforced).
 * @param {string} groupId
 * @param {number} [limit]
 */
export async function fetchGroupActivityLogsRecent(groupId, limit = 12) {
  requireConfigured()
  const { data, error } = await supabase
    .from('group_activity_logs')
    .select('id, group_id, user_id, activity_type_id, amount, activity_date, created_at')
    .eq('group_id', groupId)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data || []
}

/**
 * @param {{
 *   groupId: string,
 *   activityTypeId: string,
 *   amount: number,
 *   activityDate: string,
 *   userId: string,
 * }} input
 */
export async function logGroupActivity(input) {
  requireConfigured()
  const amount = Number(input.amount)
  if (!Number.isFinite(amount) || amount <= 0) {
    const err = new Error('Activity amount must be greater than zero')
    err.code = 'VALIDATION'
    throw err
  }

  const { data, error } = await supabase
    .from('group_activity_logs')
    .insert({
      group_id: input.groupId,
      user_id: input.userId,
      activity_type_id: input.activityTypeId,
      amount,
      activity_date: input.activityDate,
    })
    .select('id, group_id, user_id, activity_type_id, amount, activity_date, created_at')
    .single()
  if (error) throw error
  return data
}

/**
 * Delete an activity log (owner or group admin).
 * @param {string} logId
 */
export async function deleteGroupActivityLog(logId) {
  requireConfigured()
  const { error } = await supabase.rpc('delete_group_activity_log', {
    p_log_id: logId,
  })
  if (error) throw error
}

/**
 * Admin: remove a member's weekly activity total for one activity type.
 * @param {string} groupId
 * @param {string} memberUserId
 * @param {string} activityTypeId
 * @param {string} weekStartKey
 * @param {string} weekEndKey
 */
export async function deleteGroupMemberWeekActivity(
  groupId,
  memberUserId,
  activityTypeId,
  weekStartKey,
  weekEndKey,
) {
  requireConfigured()
  const { data, error } = await supabase.rpc(
    'delete_group_member_week_activity',
    {
      p_group_id: groupId,
      p_user_id: memberUserId,
      p_activity_type_id: activityTypeId,
      p_week_start: weekStartKey,
      p_week_end: weekEndKey,
    },
  )
  if (error) throw error
  return Number(data) || 0
}

/**
 * Remove a group assessment share (owner or admin).
 * @param {string} groupId
 * @param {string} memberUserId
 * @param {string} boardKey
 */
export async function removeGroupAssessmentShare(
  groupId,
  memberUserId,
  boardKey,
) {
  requireConfigured()
  const { error } = await supabase.rpc('remove_group_assessment_share', {
    p_group_id: groupId,
    p_user_id: memberUserId,
    p_board_key: boardKey,
  })
  if (error) throw error
}

/**
 * @param {string} groupId
 * @param {{ name: string, unit: string, higherIsBetter?: boolean }} input
 */
export async function createGroupActivityType(groupId, input) {
  requireConfigured()
  const { data, error } = await supabase.rpc('create_group_activity_type', {
    p_group_id: groupId,
    p_name: input.name,
    p_unit: input.unit,
    p_higher_is_better: input.higherIsBetter !== false,
  })
  if (error) throw error
  return data
}

/**
 * @param {string} activityTypeId
 * @param {boolean} enabled
 */
export async function setGroupActivityTypeEnabled(activityTypeId, enabled) {
  requireConfigured()
  const { data, error } = await supabase.rpc('set_group_activity_type_enabled', {
    p_activity_type_id: activityTypeId,
    p_enabled: Boolean(enabled),
  })
  if (error) throw error
  return data
}

/**
 * @param {string} groupId
 * @param {string} name
 * @param {string} [description]
 * @param {string | null} [avatarId]
 */
export async function updateGroup(
  groupId,
  name,
  description = '',
  avatarId = null,
) {
  requireConfigured()
  const { data, error } = await supabase.rpc('update_group', {
    p_group_id: groupId,
    p_name: name,
    p_description: description || null,
    p_avatar_id: avatarId,
  })
  if (error) throw error
  return data
}

/**
 * @param {string} activityTypeId
 * @param {boolean} show
 */
export async function setGroupActivityShowOnOverview(activityTypeId, show) {
  requireConfigured()
  const { data, error } = await supabase.rpc(
    'set_group_activity_show_on_overview',
    {
      p_activity_type_id: activityTypeId,
      p_show: Boolean(show),
    },
  )
  if (error) throw error
  const row = normalizeRpcRow(data)
  if (!row) {
    const err = new Error('Could not update overview metric.')
    err.code = 'VALIDATION'
    throw err
  }
  return row
}

/**
 * @param {string} groupId
 * @param {string | null} activityTypeId
 * @param {number | null} goal
 */
export async function setGroupWeeklyChallenge(
  groupId,
  activityTypeId,
  goal,
) {
  requireConfigured()
  const { data, error } = await supabase.rpc('set_group_weekly_challenge', {
    p_group_id: groupId,
    p_activity_type_id: activityTypeId,
    p_goal: goal,
  })
  if (error) throw error
  return data
}

/**
 * @param {string} groupId
 * @param {string} newAdminUserId
 */
export async function transferGroupAdmin(groupId, newAdminUserId) {
  requireConfigured()
  const { error } = await supabase.rpc('transfer_group_admin', {
    p_group_id: groupId,
    p_new_admin_user_id: newAdminUserId,
  })
  if (error) throw error
}

/**
 * @param {string} logId
 * @param {string} userId
 * @param {{ amount: number, activityDate: string }} input
 */
export async function updateGroupActivityLog(logId, userId, input) {
  requireConfigured()
  const amount = Number(input.amount)
  if (!Number.isFinite(amount) || amount <= 0) {
    const err = new Error('Activity amount must be greater than zero')
    err.code = 'VALIDATION'
    throw err
  }
  const { data, error } = await supabase
    .from('group_activity_logs')
    .update({
      amount,
      activity_date: input.activityDate,
    })
    .eq('id', logId)
    .eq('user_id', userId)
    .select(
      'id, group_id, user_id, activity_type_id, amount, activity_date, created_at',
    )
    .single()
  if (error) throw error
  return data
}

/**
 * @param {string[]} logIds
 */
export async function fetchGroupActivityReactions(logIds) {
  requireConfigured()
  if (!logIds?.length) return []
  const { data, error } = await supabase
    .from('group_activity_reactions')
    .select('id, log_id, user_id, reaction, created_at')
    .in('log_id', logIds)
  if (error) throw error
  return data || []
}

/**
 * @param {string} logId
 * @param {string} userId
 * @param {'thumbsup' | 'heart' | 'skull'} [reaction]
 */
export async function toggleGroupActivityReaction(
  logId,
  userId,
  reaction = 'thumbsup',
) {
  requireConfigured()
  const kind = String(reaction || 'thumbsup').trim()
  if (!['thumbsup', 'heart', 'skull'].includes(kind)) {
    const err = new Error('Invalid reaction')
    err.code = 'VALIDATION'
    throw err
  }
  const { data: existing, error: readErr } = await supabase
    .from('group_activity_reactions')
    .select('id')
    .eq('log_id', logId)
    .eq('user_id', userId)
    .eq('reaction', kind)
    .maybeSingle()
  if (readErr) throw readErr
  if (existing?.id) {
    const { error } = await supabase
      .from('group_activity_reactions')
      .delete()
      .eq('id', existing.id)
    if (error) throw error
    return { reacted: false, reaction: kind }
  }
  const { error } = await supabase.from('group_activity_reactions').insert({
    log_id: logId,
    user_id: userId,
    reaction: kind,
  })
  if (error) throw error
  return { reacted: true, reaction: kind }
}

/**
 * @param {string} groupId
 * @param {string} userId
 */
export async function fetchMyGroupAssessmentShares(groupId, userId) {
  requireConfigured()
  const { data, error } = await supabase
    .from('group_assessment_shares')
    .select('id, group_id, source_record_id, board_key, shared_at')
    .eq('group_id', groupId)
    .eq('user_id', userId)
    .order('shared_at', { ascending: false })
  if (error) throw error
  return data || []
}

/**
 * @param {string} activityTypeId
 * @param {boolean} show
 */
export async function setGroupActivityShowOnLeaderboard(activityTypeId, show) {
  requireConfigured()
  const { data, error } = await supabase.rpc(
    'set_group_activity_show_on_leaderboard',
    {
      p_activity_type_id: activityTypeId,
      p_show: Boolean(show),
    },
  )
  if (error) throw error
  const row = normalizeRpcRow(data)
  if (!row) {
    const err = new Error('Could not update leaderboard tab.')
    err.code = 'VALIDATION'
    throw err
  }
  return row
}

/**
 * @param {string} activityTypeId
 * @param {number | null} weeklyGoal null clears the goal
 */
export async function setGroupActivityWeeklyGoal(activityTypeId, weeklyGoal) {
  requireConfigured()
  const goal =
    weeklyGoal === null || weeklyGoal === '' || weeklyGoal === undefined
      ? null
      : Number(weeklyGoal)
  if (goal !== null && (!Number.isFinite(goal) || goal <= 0)) {
    const err = new Error('Weekly goal must be greater than zero')
    err.code = 'VALIDATION'
    throw err
  }
  const { data, error } = await supabase.rpc('set_group_activity_weekly_goal', {
    p_activity_type_id: activityTypeId,
    p_weekly_goal: goal,
  })
  if (error) throw error
  return data
}

/**
 * Groups the current user belongs to that have this assessment board enabled.
 * @param {string} boardKey
 */
export async function listMyGroupsForAssessmentBoard(boardKey) {
  requireConfigured()
  const key = String(boardKey || '').trim()
  if (!key) return []
  const groups = await listMyGroups()
  if (!groups.length) return []
  const ids = groups.map((g) => g.id)
  const { data, error } = await supabase
    .from('group_leaderboard_assessments')
    .select('group_id, board_key, is_enabled')
    .eq('board_key', key)
    .eq('is_enabled', true)
    .in('group_id', ids)
  if (error) throw error
  const enabled = new Set((data || []).map((row) => row.group_id))
  return groups.filter((g) => enabled.has(g.id))
}

/**
 * @param {string} groupId
 */
export async function fetchGroupAssessmentBoards(groupId) {
  requireConfigured()
  const { data, error } = await supabase
    .from('group_leaderboard_assessments')
    .select('id, group_id, board_key, is_enabled, created_at')
    .eq('group_id', groupId)
  if (error) throw error
  return data || []
}

/**
 * @param {string} groupId
 * @param {string} boardKey
 * @param {boolean} enabled
 */
export async function setGroupAssessmentLeaderboard(
  groupId,
  boardKey,
  enabled,
) {
  requireConfigured()
  const { data, error } = await supabase.rpc('set_group_assessment_leaderboard', {
    p_group_id: groupId,
    p_board_key: boardKey,
    p_enabled: Boolean(enabled),
  })
  if (error) throw error
  const row = normalizeRpcRow(data)
  if (!row) {
    const err = new Error('Could not update assessment board.')
    err.code = 'VALIDATION'
    throw err
  }
  return row
}

/**
 * @param {string} groupId
 * @param {string} sourceRecordId
 * @param {string} boardKey
 */
export async function shareAssessmentWithGroup(
  groupId,
  sourceRecordId,
  boardKey,
) {
  requireConfigured()
  const { data, error } = await supabase.rpc('share_assessment_with_group', {
    p_group_id: groupId,
    p_source_record_id: sourceRecordId,
    p_board_key: boardKey,
  })
  if (error) throw error
  return data
}

/**
 * @param {string} groupId
 * @param {string} sourceRecordId
 */
export async function unshareAssessmentFromGroup(groupId, sourceRecordId) {
  requireConfigured()
  const { error } = await supabase.rpc('unshare_assessment_from_group', {
    p_group_id: groupId,
    p_source_record_id: sourceRecordId,
  })
  if (error) throw error
}

/**
 * Shares for a specific performance record across the user's groups.
 * @param {string} sourceRecordId
 */
export async function fetchAssessmentGroupShares(sourceRecordId) {
  requireConfigured()
  if (!sourceRecordId) return []
  const { data, error } = await supabase
    .from('group_assessment_shares')
    .select('id, group_id, source_record_id, board_key, shared_at')
    .eq('source_record_id', sourceRecordId)
  if (error) throw error
  return data || []
}

/**
 * @param {string} groupId
 * @param {string} boardKey
 */
export async function fetchGroupAssessmentLeaderboard(groupId, boardKey) {
  requireConfigured()
  const { data, error } = await supabase.rpc('get_group_assessment_leaderboard', {
    p_group_id: groupId,
    p_board_key: boardKey,
  })
  if (error) throw error
  return data || []
}

