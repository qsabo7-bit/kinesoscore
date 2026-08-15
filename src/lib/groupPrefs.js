/** Per-group UI prefs (notifications, pinned board). Local only. */

function key(groupId, suffix) {
  return `ks.groups.pref.${groupId}.${suffix}`
}

export function getGroupNotifyPrefs(groupId) {
  try {
    const raw = localStorage.getItem(key(groupId, 'notify'))
    if (!raw) return { logs: true, goals: true }
    const parsed = JSON.parse(raw)
    return {
      logs: parsed.logs !== false,
      goals: parsed.goals !== false,
    }
  } catch {
    return { logs: true, goals: true }
  }
}

export function setGroupNotifyPrefs(groupId, prefs) {
  try {
    localStorage.setItem(
      key(groupId, 'notify'),
      JSON.stringify({
        logs: prefs.logs !== false,
        goals: prefs.goals !== false,
      }),
    )
  } catch {
    // ignore
  }
}

export function getPinnedBoardId(groupId) {
  try {
    return localStorage.getItem(key(groupId, 'pinnedBoard')) || null
  } catch {
    return null
  }
}

export function setPinnedBoardId(groupId, boardId) {
  try {
    if (!boardId) localStorage.removeItem(key(groupId, 'pinnedBoard'))
    else localStorage.setItem(key(groupId, 'pinnedBoard'), boardId)
  } catch {
    // ignore
  }
}

export function getLastLogAmount(groupId, activityTypeId) {
  try {
    const raw = localStorage.getItem(key(groupId, `lastAmount.${activityTypeId}`))
    return raw || ''
  } catch {
    return ''
  }
}

export function setLastLogAmount(groupId, activityTypeId, amount) {
  try {
    localStorage.setItem(
      key(groupId, `lastAmount.${activityTypeId}`),
      String(amount),
    )
  } catch {
    // ignore
  }
}

export function markJoinOnboardingDone(groupId) {
  try {
    localStorage.setItem(key(groupId, 'onboarded'), '1')
  } catch {
    // ignore
  }
}

export function needsJoinOnboarding(groupId) {
  try {
    return localStorage.getItem(key(groupId, 'onboarded')) !== '1'
  } catch {
    return false
  }
}
