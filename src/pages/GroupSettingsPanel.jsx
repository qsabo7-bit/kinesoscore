import { useEffect, useMemo, useRef, useState } from 'react'
import ProfileAvatar from '../components/ProfileAvatar'
import {
  AVATAR_CATALOG,
  DEFAULT_AVATAR_ID,
  normalizeAvatarId,
} from '../data/avatarCatalog'
import {
  groupAssessmentSettingsSections,
  labelForGroupBoardKey,
} from '../data/groupAssessmentBoards'
import { getGroupNotifyPrefs, setGroupNotifyPrefs } from '../lib/groupPrefs'
import {
  createGroupActivityType,
  fetchGroupActivityTypes,
  fetchGroupAssessmentBoards,
  fetchMyGroupAssessmentShares,
  friendlyGroupError,
  setGroupActivityShowOnLeaderboard,
  setGroupActivityShowOnOverview,
  setGroupActivityTypeEnabled,
  setGroupActivityWeeklyGoal,
  setGroupAssessmentLeaderboard,
  setGroupWeeklyChallenge,
  transferGroupAdmin,
  unshareAssessmentFromGroup,
  updateGroup,
} from '../lib/groups'

const NAME_MAX = 40
const DESC_MAX = 200
const OVERVIEW_MAX = 6

const ADMIN_SECTIONS = [
  { id: 'profile', label: 'Profile' },
  { id: 'activities', label: 'Activities' },
  { id: 'assessments', label: 'Assessments' },
  { id: 'challenge', label: 'Challenge' },
  { id: 'ownership', label: 'Ownership' },
  { id: 'danger', label: 'Danger' },
]

function memberLabel(member) {
  const handle = String(member?.leaderboard_name || '').trim()
  if (handle) return `@${handle}`
  const display = String(member?.display_name || '').trim()
  if (display) return display
  return 'Member'
}

/**
 * Group settings: admin config + member prefs / leave.
 *
 * @param {{
 *   group: object,
 *   groupId: string,
 *   isAdmin?: boolean,
 *   onGroupUpdated?: (group: object) => void,
 *   onLeaveGroup: () => void,
 *   busy?: boolean,
 *   members?: Array,
 *   userId?: string,
 * }} props
 */
function GroupSettingsPanel({
  group,
  groupId,
  isAdmin = false,
  onGroupUpdated,
  onLeaveGroup,
  busy = false,
  members = [],
  userId,
}) {
  const [name, setName] = useState(group?.name || '')
  const [description, setDescription] = useState(group?.description || '')
  const [avatarDraft, setAvatarDraft] = useState(() =>
    normalizeAvatarId(group?.avatar_id || DEFAULT_AVATAR_ID),
  )
  const [types, setTypes] = useState([])
  const [assessmentBoards, setAssessmentBoards] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [saving, setSaving] = useState(false)
  const [rowBusyId, setRowBusyId] = useState(null)
  const [localNotice, setLocalNotice] = useState('')

  const [customName, setCustomName] = useState('')
  const [customUnit, setCustomUnit] = useState('reps')
  const [customHigher, setCustomHigher] = useState(true)
  const [goalDrafts, setGoalDrafts] = useState({})

  const [challengeTypeId, setChallengeTypeId] = useState(
    group?.challenge_activity_type_id || '',
  )
  const [challengeGoal, setChallengeGoal] = useState(
    group?.challenge_goal == null || group?.challenge_goal === ''
      ? ''
      : String(group.challenge_goal),
  )

  const [transferUserId, setTransferUserId] = useState('')
  const [myShares, setMyShares] = useState([])
  const [notifyPrefs, setNotifyPrefsState] = useState(() =>
    getGroupNotifyPrefs(groupId),
  )
  const [openSections, setOpenSections] = useState(() => ({
    profile: true,
    activities: true,
    assessments: true,
    challenge: false,
    ownership: false,
    danger: false,
  }))
  const [boardsError, setBoardsError] = useState('')

  const avatarPickerRef = useRef(null)
  const inviteCopyRef = useRef('')

  useEffect(() => {
    setName(group?.name || '')
    setDescription(group?.description || '')
  }, [group?.id, group?.name, group?.description])

  useEffect(() => {
    setAvatarDraft(normalizeAvatarId(group?.avatar_id || DEFAULT_AVATAR_ID))
  }, [group?.id, group?.avatar_id])

  useEffect(() => {
    setChallengeTypeId(group?.challenge_activity_type_id || '')
    setChallengeGoal(
      group?.challenge_goal == null || group?.challenge_goal === ''
        ? ''
        : String(group.challenge_goal),
    )
  }, [group?.id, group?.challenge_activity_type_id, group?.challenge_goal])

  useEffect(() => {
    setNotifyPrefsState(getGroupNotifyPrefs(groupId))
  }, [groupId])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError('')
      setBoardsError('')
      try {
        if (isAdmin) {
          let typeRows = []
          try {
            typeRows = await fetchGroupActivityTypes(groupId)
          } catch (err) {
            if (!cancelled) {
              setError(friendlyGroupError(err, 'Could not load activities.'))
            }
            return
          }
          if (cancelled) return
          setTypes(typeRows)
          const drafts = {}
          for (const t of typeRows) {
            drafts[t.id] =
              t.weekly_goal == null || t.weekly_goal === ''
                ? ''
                : String(t.weekly_goal)
          }
          setGoalDrafts(drafts)

          try {
            const boardRows = await fetchGroupAssessmentBoards(groupId)
            if (!cancelled) setAssessmentBoards(boardRows)
          } catch (err) {
            if (!cancelled) {
              setAssessmentBoards([])
              setBoardsError(
                friendlyGroupError(
                  err,
                  'Could not load assessment boards. Apply migration 027+.',
                ),
              )
            }
          }
        } else if (userId) {
          const shares = await fetchMyGroupAssessmentShares(groupId, userId)
          if (cancelled) return
          setMyShares(shares)
        } else {
          setMyShares([])
        }
      } catch (err) {
        if (!cancelled) {
          setError(friendlyGroupError(err, 'Could not load settings.'))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [groupId, isAdmin, userId])

  const assessmentEnabled = (boardKey) =>
    Boolean(
      assessmentBoards.find((b) => b.board_key === boardKey && b.is_enabled),
    )

  const overviewSelectedCount = types.filter(
    (t) => t.is_enabled && Boolean(t.show_on_overview),
  ).length

  const assessmentEnabledCount = assessmentBoards.filter((b) =>
    Boolean(b?.is_enabled),
  ).length

  const assessmentSections = useMemo(
    () => groupAssessmentSettingsSections(),
    [],
  )

  const enabledTypes = useMemo(
    () => types.filter((t) => t.is_enabled),
    [types],
  )

  const transferCandidates = members.filter(
    (m) => m.user_id && m.user_id !== userId,
  )

  const selectedAvatarLabel =
    AVATAR_CATALOG.find((item) => item.id === avatarDraft)?.label || 'Icon'

  const profileDirty =
    name.trim() !== String(group?.name || '').trim() ||
    String(description || '') !== String(group?.description || '') ||
    normalizeAvatarId(avatarDraft) !==
      normalizeAvatarId(group?.avatar_id || DEFAULT_AVATAR_ID)

  const challengePreviewType = enabledTypes.find((t) => t.id === challengeTypeId)

  const scrollToSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: true }))
    requestAnimationFrame(() => {
      document.getElementById(`groups-settings-${id}`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const flashLocal = (msg) => {
    setLocalNotice(msg)
    setNotice('')
  }

  const handleSaveProfile = async (event) => {
    event.preventDefault()
    if (saving) return
    setSaving(true)
    setError('')
    setNotice('')
    setLocalNotice('')
    try {
      const updated = await updateGroup(
        groupId,
        name,
        description,
        normalizeAvatarId(avatarDraft),
      )
      onGroupUpdated?.(updated)
      setNotice('Profile saved.')
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not save group profile.'))
    } finally {
      setSaving(false)
    }
  }

  const copyInvite = async () => {
    const code = group?.invite_code
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      inviteCopyRef.current = 'Copied'
      flashLocal('Invite code copied.')
    } catch {
      flashLocal('Could not copy invite code.')
    }
  }

  const focusAvatarChip = (index) => {
    const buttons = avatarPickerRef.current?.querySelectorAll('[role="radio"]')
    const target = buttons?.[index]
    if (target instanceof HTMLElement) target.focus()
  }

  const handleAvatarKeyDown = (event) => {
    if (saving) return
    const ids = AVATAR_CATALOG.map((item) => item.id)
    const currentIndex = Math.max(0, ids.indexOf(avatarDraft))
    let nextIndex

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (currentIndex + 1) % ids.length
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (currentIndex - 1 + ids.length) % ids.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = ids.length - 1
    } else {
      return
    }

    event.preventDefault()
    focusAvatarChip(nextIndex)
    setAvatarDraft(ids[nextIndex])
  }

  const patchType = (updated) => {
    setTypes((list) =>
      list.map((row) => (row.id === updated.id ? { ...row, ...updated } : row)),
    )
  }

  const handleToggleLogging = async (type) => {
    if (saving || rowBusyId) return
    setRowBusyId(type.id)
    setError('')
    try {
      const updated = await setGroupActivityTypeEnabled(
        type.id,
        !type.is_enabled,
      )
      patchType(updated)
      flashLocal(
        updated.is_enabled
          ? `${updated.name} logging on.`
          : `${updated.name} logging off.`,
      )
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not update activity.'))
    } finally {
      setRowBusyId(null)
    }
  }

  const handleToggleActivityBoard = async (type) => {
    if (saving || rowBusyId || !type.is_enabled) return
    setRowBusyId(type.id)
    setError('')
    try {
      const updated = await setGroupActivityShowOnLeaderboard(
        type.id,
        !type.show_on_leaderboard,
      )
      patchType(updated)
      flashLocal(
        updated.show_on_leaderboard
          ? `${updated.name} on leaderboard.`
          : `${updated.name} off leaderboard.`,
      )
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not update leaderboard tab.'))
    } finally {
      setRowBusyId(null)
    }
  }

  const handleToggleOverview = async (type) => {
    if (saving || rowBusyId || !type.is_enabled) return
    const next = !type.show_on_overview
    if (next && overviewSelectedCount >= OVERVIEW_MAX) {
      setError('Overview can show at most 6 activities. Turn one off first.')
      return
    }
    setRowBusyId(type.id)
    setError('')
    try {
      const updated = await setGroupActivityShowOnOverview(type.id, next)
      patchType(updated)
      flashLocal(
        updated.show_on_overview
          ? `${updated.name} on Overview.`
          : `${updated.name} off Overview.`,
      )
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not update overview metric.'))
    } finally {
      setRowBusyId(null)
    }
  }

  const handleToggleAssessmentBoard = async (boardKey, next) => {
    if (saving || rowBusyId) return
    setRowBusyId(boardKey)
    setError('')
    setBoardsError('')
    try {
      const updated = await setGroupAssessmentLeaderboard(
        groupId,
        boardKey,
        next,
      )
      setAssessmentBoards((list) => {
        const without = list.filter(
          (b) => b && b.board_key !== boardKey && b.board_key != null,
        )
        return [...without, updated]
      })
      flashLocal(
        next
          ? `${labelForGroupBoardKey(boardKey)} board on.`
          : `${labelForGroupBoardKey(boardKey)} board off.`,
      )
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not update assessment board.'))
    } finally {
      setRowBusyId(null)
    }
  }

  const handleAddCustom = async (event) => {
    event.preventDefault()
    if (saving) return
    setSaving(true)
    setError('')
    try {
      const created = await createGroupActivityType(groupId, {
        name: customName,
        unit: customUnit,
        higherIsBetter: customHigher,
      })
      setTypes((list) => [...list, created])
      setGoalDrafts((prev) => ({
        ...prev,
        [created.id]:
          created.weekly_goal == null || created.weekly_goal === ''
            ? ''
            : String(created.weekly_goal),
      }))
      setCustomName('')
      setCustomUnit('reps')
      setCustomHigher(true)
      setNotice(`Added “${created.name}”.`)
      setOpenSections((prev) => ({ ...prev, activities: true }))
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not add activity.'))
    } finally {
      setSaving(false)
    }
  }

  const handleSaveGoal = async (type) => {
    if (saving || rowBusyId) return
    setRowBusyId(type.id)
    setError('')
    try {
      const raw = goalDrafts[type.id]
      const next =
        raw === '' || raw === null || raw === undefined ? null : Number(raw)
      const updated = await setGroupActivityWeeklyGoal(type.id, next)
      patchType(updated)
      setGoalDrafts((prev) => ({
        ...prev,
        [type.id]:
          updated.weekly_goal == null ? '' : String(updated.weekly_goal),
      }))
      flashLocal(
        updated.weekly_goal == null
          ? `Cleared goal for ${updated.name}.`
          : `Goal for ${updated.name}: ${updated.weekly_goal}.`,
      )
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not save weekly goal.'))
    } finally {
      setRowBusyId(null)
    }
  }

  const handleSaveChallenge = async () => {
    if (saving) return
    if (!challengeTypeId) {
      setError('Pick an activity for the weekly challenge.')
      return
    }
    const goalNum = Number(challengeGoal)
    if (!Number.isFinite(goalNum) || goalNum <= 0) {
      setError('Challenge goal must be greater than zero.')
      return
    }
    setSaving(true)
    setError('')
    setNotice('')
    try {
      const updated = await setGroupWeeklyChallenge(
        groupId,
        challengeTypeId,
        goalNum,
      )
      onGroupUpdated?.(updated)
      setNotice('Weekly challenge saved.')
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not save weekly challenge.'))
    } finally {
      setSaving(false)
    }
  }

  const handleClearChallenge = async () => {
    if (saving) return
    setSaving(true)
    setError('')
    setNotice('')
    try {
      const updated = await setGroupWeeklyChallenge(groupId, null, null)
      onGroupUpdated?.(updated)
      setChallengeTypeId('')
      setChallengeGoal('')
      setNotice('Weekly challenge cleared.')
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not clear weekly challenge.'))
    } finally {
      setSaving(false)
    }
  }

  const handleTransferAdmin = async () => {
    if (saving || !transferUserId) return
    const target = members.find((m) => m.user_id === transferUserId)
    const label = memberLabel(target)
    if (
      !window.confirm(
        `Transfer admin to ${label}? You will become a regular member.`,
      )
    ) {
      return
    }
    setSaving(true)
    setError('')
    setNotice('')
    try {
      await transferGroupAdmin(groupId, transferUserId)
      setTransferUserId('')
      setNotice('Admin transferred.')
      onGroupUpdated?.(group)
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not transfer admin.'))
    } finally {
      setSaving(false)
    }
  }

  const handleNotifyToggle = (key, checked) => {
    const next = { ...notifyPrefs, [key]: checked }
    setNotifyPrefsState(next)
    setGroupNotifyPrefs(groupId, next)
  }

  const handleUnshare = async (share) => {
    if (saving) return
    setSaving(true)
    setError('')
    setNotice('')
    try {
      await unshareAssessmentFromGroup(groupId, share.source_record_id)
      setMyShares((list) => list.filter((row) => row.id !== share.id))
      setNotice('Assessment unshared.')
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not unshare assessment.'))
    } finally {
      setSaving(false)
    }
  }

  const handleLeave = () => {
    onLeaveGroup?.()
  }

  if (loading) {
    return (
      <section className="groups-settings">
        <p className="calc-hint">Loading settings…</p>
      </section>
    )
  }

  if (!isAdmin) {
    return (
      <section className="groups-settings" aria-label="Group settings">
        <h2 className="groups-section-title">Group Settings</h2>
        {error ? <p className="feedback feedback-error">{error}</p> : null}
        {notice ? <p className="feedback feedback-success">{notice}</p> : null}

        <section
          className="groups-settings-block"
          aria-labelledby="groups-notify-heading"
        >
          <h3 id="groups-notify-heading" className="groups-settings-block-title">
            Notifications
          </h3>
          <p className="calc-hint">
            Local reminders for this group on this device.
          </p>
          <ul className="groups-settings-check-list">
            <li className="groups-settings-check-row">
              <label>
                <input
                  type="checkbox"
                  checked={Boolean(notifyPrefs.logs)}
                  onChange={(e) => handleNotifyToggle('logs', e.target.checked)}
                />
                <span>Activity log updates</span>
              </label>
            </li>
            <li className="groups-settings-check-row">
              <label>
                <input
                  type="checkbox"
                  checked={Boolean(notifyPrefs.goals)}
                  onChange={(e) => handleNotifyToggle('goals', e.target.checked)}
                />
                <span>Weekly goal progress</span>
              </label>
            </li>
          </ul>
        </section>

        <section
          className="groups-settings-block"
          aria-labelledby="groups-my-shares-heading"
        >
          <h3
            id="groups-my-shares-heading"
            className="groups-settings-block-title"
          >
            My shared assessments
          </h3>
          <p className="calc-hint">
            Results you have shared with this group&apos;s assessment boards.
          </p>
          {myShares.length === 0 ? (
            <p className="calc-hint">No shared assessments yet.</p>
          ) : (
            <ul className="groups-manage-list">
              {myShares.map((share) => (
                <li key={share.id} className="groups-manage-row">
                  <div className="groups-manage-copy">
                    <p className="groups-member-name">
                      {labelForGroupBoardKey(share.board_key)}
                    </p>
                    <p className="groups-member-meta">
                      Shared{' '}
                      {share.shared_at
                        ? new Date(share.shared_at).toLocaleDateString()
                        : '—'}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    disabled={saving || busy}
                    onClick={() => handleUnshare(share)}
                  >
                    Unshare
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section
          className="groups-danger-zone"
          aria-labelledby="groups-leave-heading"
        >
          <h3 id="groups-leave-heading" className="groups-settings-block-title">
            Membership
          </h3>
          <p className="calc-hint">
            Leave this group. Your activity logs stay with the group.
          </p>
          <button
            type="button"
            className="btn btn-ghost"
            disabled={busy}
            onClick={handleLeave}
          >
            Leave group
          </button>
        </section>
      </section>
    )
  }

  const sectionOpen = (id) => openSections[id] !== false

  return (
    <section className="groups-settings" aria-label="Group settings">
      <h2 className="groups-section-title">Group Settings</h2>

      <nav className="groups-settings-nav" aria-label="Settings sections">
        {ADMIN_SECTIONS.map((sec) => (
          <button
            key={sec.id}
            type="button"
            className="btn btn-ghost groups-settings-nav-btn"
            onClick={() => scrollToSection(sec.id)}
          >
            {sec.label}
          </button>
        ))}
      </nav>

      {error ? <p className="feedback feedback-error">{error}</p> : null}
      {notice ? <p className="feedback feedback-success">{notice}</p> : null}
      {localNotice ? (
        <p className="feedback feedback-success" role="status">
          {localNotice}
        </p>
      ) : null}

      {/* Profile */}
      <section
        id="groups-settings-profile"
        className="groups-settings-block"
        aria-labelledby="groups-profile-heading"
      >
        <button
          type="button"
          className="groups-settings-fold"
          aria-expanded={sectionOpen('profile')}
          onClick={() => toggleSection('profile')}
        >
          <h3 id="groups-profile-heading" className="groups-settings-block-title">
            Profile
          </h3>
          <span className="groups-settings-fold-hint">
            {sectionOpen('profile') ? 'Hide' : 'Show'}
          </span>
        </button>
        {sectionOpen('profile') ? (
          <form
            className="calc-form groups-settings-form"
            onSubmit={handleSaveProfile}
          >
            <label className="field">
              <span>Group Name</span>
              <input
                type="text"
                value={name}
                maxLength={NAME_MAX}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <span className="groups-char-count">
                {name.trim().length} / {NAME_MAX}
              </span>
            </label>
            <label className="field">
              <span>Description</span>
              <textarea
                value={description}
                maxLength={DESC_MAX}
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
              <span className="groups-char-count">
                {description.length} / {DESC_MAX}
              </span>
            </label>

            <div className="avatar-picker-block">
              <div className="avatar-picker-label-row">
                <span>Group icon</span>
                <span key={avatarDraft} className="avatar-picker-current">
                  {selectedAvatarLabel}
                </span>
              </div>
              <div
                ref={avatarPickerRef}
                className="avatar-picker-row"
                role="radiogroup"
                aria-label="Group icon"
                onKeyDown={handleAvatarKeyDown}
              >
                {AVATAR_CATALOG.map((item, index) => {
                  const selected = avatarDraft === item.id
                  const tileAccent = item.color || 'var(--muted-strong)'
                  const tabStop =
                    selected ||
                    (!AVATAR_CATALOG.some((entry) => entry.id === avatarDraft) &&
                      index === 0)
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      aria-label={item.label}
                      title={item.label}
                      tabIndex={tabStop ? 0 : -1}
                      className={`avatar-picker-chip${
                        selected ? ' is-selected' : ''
                      }`}
                      style={{ '--avatar-tile-accent': tileAccent }}
                      disabled={saving}
                      onClick={() => setAvatarDraft(item.id)}
                    >
                      <ProfileAvatar avatarId={item.id} size="sm" />
                    </button>
                  )
                })}
              </div>
            </div>

            {group?.invite_code ? (
              <div className="groups-settings-invite">
                <p className="groups-invite-moment-label">Invite code</p>
                <p className="groups-settings-invite-code">{group.invite_code}</p>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={copyInvite}
                >
                  Copy invite code
                </button>
              </div>
            ) : null}

            <div className="confirm-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving || busy || !name.trim() || !profileDirty}
              >
                Save Profile
              </button>
              {profileDirty ? (
                <span className="calc-hint">Unsaved changes</span>
              ) : null}
            </div>
          </form>
        ) : null}
      </section>

      {/* Activities matrix */}
      <section
        id="groups-settings-activities"
        className="groups-settings-block"
        aria-labelledby="groups-activities-heading"
      >
        <button
          type="button"
          className="groups-settings-fold"
          aria-expanded={sectionOpen('activities')}
          onClick={() => toggleSection('activities')}
        >
          <h3
            id="groups-activities-heading"
            className="groups-settings-block-title"
          >
            Activities
          </h3>
          <span className="groups-settings-fold-hint">
            {sectionOpen('activities') ? 'Hide' : 'Show'}
          </span>
        </button>
        {sectionOpen('activities') ? (
          <>
            <p className="calc-hint">
              Logging, Overview (max {OVERVIEW_MAX}), Leaderboard, and weekly
              goal — one place per activity.
              {overviewSelectedCount === 0
                ? ' Overview has no metrics yet.'
                : ` Overview showing ${overviewSelectedCount}/${OVERVIEW_MAX}.`}
            </p>

            <div className="groups-activity-matrix-wrap">
              <table className="groups-activity-matrix">
                <thead>
                  <tr>
                    <th scope="col">Activity</th>
                    <th scope="col">Logging</th>
                    <th scope="col">Overview</th>
                    <th scope="col">Board</th>
                    <th scope="col">Weekly goal</th>
                  </tr>
                </thead>
                <tbody>
                  {types.map((type) => {
                    const rowBusy = rowBusyId === type.id
                    const overviewChecked = Boolean(type.show_on_overview)
                    const overviewBlocked =
                      !overviewChecked &&
                      overviewSelectedCount >= OVERVIEW_MAX
                    return (
                      <tr
                        key={type.id}
                        className={type.is_enabled ? '' : 'is-disabled'}
                      >
                        <th scope="row">
                          <span className="groups-matrix-name">{type.name}</span>
                          <span className="groups-matrix-unit">{type.unit}</span>
                        </th>
                        <td>
                          <label className="groups-matrix-check">
                            <input
                              type="checkbox"
                              checked={Boolean(type.is_enabled)}
                              disabled={Boolean(rowBusy) || saving}
                              onChange={() => handleToggleLogging(type)}
                            />
                            <span className="sr-only">Logging</span>
                          </label>
                        </td>
                        <td>
                          <label className="groups-matrix-check">
                            <input
                              type="checkbox"
                              checked={overviewChecked}
                              disabled={
                                Boolean(rowBusy) ||
                                saving ||
                                !type.is_enabled ||
                                overviewBlocked
                              }
                              onChange={() => handleToggleOverview(type)}
                            />
                            <span className="sr-only">Overview</span>
                          </label>
                        </td>
                        <td>
                          <label className="groups-matrix-check">
                            <input
                              type="checkbox"
                              checked={Boolean(type.show_on_leaderboard)}
                              disabled={
                                Boolean(rowBusy) || saving || !type.is_enabled
                              }
                              onChange={() => handleToggleActivityBoard(type)}
                            />
                            <span className="sr-only">Leaderboard</span>
                          </label>
                        </td>
                        <td>
                          <div className="groups-matrix-goal">
                            <input
                              type="number"
                              inputMode="decimal"
                              min="0"
                              step="any"
                              placeholder="—"
                              aria-label={`Weekly goal for ${type.name}`}
                              value={goalDrafts[type.id] ?? ''}
                              disabled={
                                Boolean(rowBusy) || saving || !type.is_enabled
                              }
                              onChange={(e) =>
                                setGoalDrafts((prev) => ({
                                  ...prev,
                                  [type.id]: e.target.value,
                                }))
                              }
                            />
                            <button
                              type="button"
                              className="btn btn-ghost"
                              disabled={
                                Boolean(rowBusy) || saving || !type.is_enabled
                              }
                              onClick={() => handleSaveGoal(type)}
                            >
                              Save
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {types.length === 0 ? (
              <p className="calc-hint">No activities yet. Add one below.</p>
            ) : null}

            <form
              className="calc-form groups-custom-activity"
              onSubmit={handleAddCustom}
            >
              <h4 className="groups-subsection-title">Add custom activity</h4>
              <label className="field">
                <span>Name</span>
                <input
                  type="text"
                  value={customName}
                  maxLength={60}
                  onChange={(e) => setCustomName(e.target.value)}
                  required
                />
              </label>
              <label className="field">
                <span>Unit</span>
                <select
                  value={
                    ['reps', 'miles', 'minutes'].includes(customUnit)
                      ? customUnit
                      : 'custom'
                  }
                  onChange={(e) => {
                    if (e.target.value === 'custom') setCustomUnit('')
                    else setCustomUnit(e.target.value)
                  }}
                >
                  <option value="reps">reps</option>
                  <option value="miles">miles</option>
                  <option value="minutes">minutes</option>
                  <option value="custom">Custom…</option>
                </select>
              </label>
              {!['reps', 'miles', 'minutes'].includes(customUnit) ? (
                <label className="field">
                  <span>Custom unit</span>
                  <input
                    type="text"
                    value={customUnit}
                    maxLength={24}
                    onChange={(e) => setCustomUnit(e.target.value)}
                    required
                  />
                </label>
              ) : null}
              <label className="field">
                <span>Ranking</span>
                <select
                  value={customHigher ? 'higher' : 'lower'}
                  onChange={(e) => setCustomHigher(e.target.value === 'higher')}
                >
                  <option value="higher">Higher is better</option>
                  <option value="lower">Lower is better</option>
                </select>
              </label>
              <div className="confirm-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving || !customName.trim() || !customUnit.trim()}
                >
                  Add activity
                </button>
              </div>
            </form>
          </>
        ) : null}
      </section>

      {/* Assessment boards */}
      <section
        id="groups-settings-assessments"
        className="groups-settings-block"
        aria-labelledby="groups-assessments-heading"
      >
        <button
          type="button"
          className="groups-settings-fold"
          aria-expanded={sectionOpen('assessments')}
          onClick={() => toggleSection('assessments')}
        >
          <h3
            id="groups-assessments-heading"
            className="groups-settings-block-title"
          >
            Assessment boards
          </h3>
          <span className="groups-settings-fold-hint">
            {sectionOpen('assessments')
              ? 'Hide'
              : `${assessmentEnabledCount} on`}
          </span>
        </button>
        {sectionOpen('assessments') ? (
          <>
            <p className="calc-hint">
              Tap to add a board on the Leaderboard tab. Members share a saved
              result with this group before it appears.
            </p>
            {boardsError ? (
              <p className="feedback feedback-error">{boardsError}</p>
            ) : null}
            <div className="groups-assess-picker">
              <p className="groups-assess-picker-meta" aria-live="polite">
                {assessmentEnabledCount === 0
                  ? 'None on'
                  : `${assessmentEnabledCount} on Leaderboard`}
              </p>
              {assessmentSections.map((section) => (
                <div
                  key={section.id}
                  className="groups-assess-row"
                  role="group"
                  aria-labelledby={`groups-assess-${section.id}`}
                >
                  <p
                    id={`groups-assess-${section.id}`}
                    className="groups-assess-row-label"
                  >
                    {section.label}
                  </p>
                  <div className="groups-assess-chip-row">
                    {section.options.map((opt) => {
                      const on = assessmentEnabled(opt.boardKey)
                      const busy = rowBusyId === opt.boardKey
                      return (
                        <button
                          key={opt.boardKey}
                          type="button"
                          role="switch"
                          aria-checked={on}
                          aria-label={`${opt.label}${on ? ', on' : ', off'}`}
                          title={opt.label}
                          className={`groups-assess-chip${on ? ' is-on' : ''}`}
                          disabled={
                            Boolean(boardsError) || saving || Boolean(busy)
                          }
                          onClick={() =>
                            handleToggleAssessmentBoard(opt.boardKey, !on)
                          }
                        >
                          {opt.shortLabel || opt.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </section>

      {/* Challenge */}
      <section
        id="groups-settings-challenge"
        className="groups-settings-block"
        aria-labelledby="groups-challenge-heading"
      >
        <button
          type="button"
          className="groups-settings-fold"
          aria-expanded={sectionOpen('challenge')}
          onClick={() => toggleSection('challenge')}
        >
          <h3
            id="groups-challenge-heading"
            className="groups-settings-block-title"
          >
            Weekly challenge
          </h3>
          <span className="groups-settings-fold-hint">
            {sectionOpen('challenge') ? 'Hide' : 'Show'}
          </span>
        </button>
        {sectionOpen('challenge') ? (
          <>
            <p className="calc-hint">
              One shared activity goal highlighted on Overview.
            </p>
            {challengePreviewType && Number(challengeGoal) > 0 ? (
              <div className="groups-challenge-preview" aria-live="polite">
                This week: {challengePreviewType.name} · {challengeGoal}{' '}
                {challengePreviewType.unit}
              </div>
            ) : null}
            <div className="calc-form groups-settings-form">
              <label className="field">
                <span>Activity</span>
                <select
                  value={challengeTypeId}
                  disabled={saving || enabledTypes.length === 0}
                  onChange={(e) => setChallengeTypeId(e.target.value)}
                >
                  <option value="">Select activity</option>
                  {enabledTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name} ({type.unit})
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>Goal</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  placeholder="e.g. 100"
                  value={challengeGoal}
                  disabled={saving}
                  onChange={(e) => setChallengeGoal(e.target.value)}
                />
              </label>
              <div className="confirm-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={saving || busy || !challengeTypeId}
                  onClick={handleSaveChallenge}
                >
                  Save challenge
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  disabled={saving || busy}
                  onClick={handleClearChallenge}
                >
                  Clear
                </button>
              </div>
            </div>
          </>
        ) : null}
      </section>

      {/* Ownership */}
      <section
        id="groups-settings-ownership"
        className="groups-settings-block"
        aria-labelledby="groups-transfer-heading"
      >
        <button
          type="button"
          className="groups-settings-fold"
          aria-expanded={sectionOpen('ownership')}
          onClick={() => toggleSection('ownership')}
        >
          <h3
            id="groups-transfer-heading"
            className="groups-settings-block-title"
          >
            Ownership
          </h3>
          <span className="groups-settings-fold-hint">
            {sectionOpen('ownership') ? 'Hide' : 'Show'}
          </span>
        </button>
        {sectionOpen('ownership') ? (
          <>
            <p className="calc-hint">
              Pass admin to another member. You stay in the group as a member.
            </p>
            <div className="calc-form groups-settings-form">
              <label className="field">
                <span>New admin</span>
                <select
                  value={transferUserId}
                  disabled={saving || transferCandidates.length === 0}
                  onChange={(e) => setTransferUserId(e.target.value)}
                >
                  <option value="">Select member</option>
                  {transferCandidates.map((member) => (
                    <option key={member.user_id} value={member.user_id}>
                      {memberLabel(member)}
                    </option>
                  ))}
                </select>
              </label>
              <div className="confirm-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={saving || busy || !transferUserId}
                  onClick={handleTransferAdmin}
                >
                  Transfer admin
                </button>
              </div>
            </div>
            {transferCandidates.length === 0 ? (
              <p className="calc-hint">
                Invite another member before transferring.
              </p>
            ) : null}
          </>
        ) : null}
      </section>

      {/* Danger */}
      <section
        id="groups-settings-danger"
        className="groups-danger-zone"
        aria-labelledby="groups-leave-heading"
      >
        <button
          type="button"
          className="groups-settings-fold"
          aria-expanded={sectionOpen('danger')}
          onClick={() => toggleSection('danger')}
        >
          <h3 id="groups-leave-heading" className="groups-settings-block-title">
            Danger
          </h3>
          <span className="groups-settings-fold-hint">
            {sectionOpen('danger') ? 'Hide' : 'Show'}
          </span>
        </button>
        {sectionOpen('danger') ? (
          <>
            <p className="calc-hint">
              Leaving as admin permanently deletes the group and all
              group-specific data for everyone.
            </p>
            <button
              type="button"
              className="btn btn-ghost groups-danger-btn"
              disabled={busy || saving}
              onClick={handleLeave}
            >
              Leave / Delete group
            </button>
          </>
        ) : null}
      </section>
    </section>
  )
}

export default GroupSettingsPanel
