import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import LockedAuthCard from '../components/LockedAuthCard'
import ProfileAvatar from '../components/ProfileAvatar'
import GroupLogActivityModal from '../components/GroupLogActivityModal'
import { GROUPS_LOCKED_PREVIEW } from '../components/tracking'
import { normalizeAvatarId } from '../data/avatarCatalog'
import {
  createGroup,
  fetchGroup,
  fetchGroupMembers,
  formatRelativeActivityTime,
  friendlyGroupError,
  joinGroupByInvite,
  leaveGroup,
  listMyGroups,
  parseGroupsRoute,
  pathForGroup,
  removeGroupMember,
} from '../lib/groups'
import {
  markJoinOnboardingDone,
  needsJoinOnboarding,
} from '../lib/groupPrefs'
import { useFocusTrap } from '../lib/useFocusTrap'
import { isSupabaseConfigured } from '../supabaseClient'
import GroupActivityPanel from './GroupActivityPanel'
import GroupLeaderboardPanel from './GroupLeaderboardPanel'
import GroupOverviewPanel from './GroupOverviewPanel'
import GroupSettingsPanel from './GroupSettingsPanel'

const GROUP_TABS = [
  { id: 'overview', label: 'Overview', ready: true },
  { id: 'activity', label: 'Activity', ready: true },
  { id: 'leaderboard', label: 'Leaderboard', ready: true },
  { id: 'people', label: 'People', ready: true },
]

const NAME_MAX = 40
const DESC_MAX = 200
const MAX_GROUPS = 3

function formatPeopleHandle(member) {
  const name = String(member?.leaderboard_name || '').trim()
  if (name) return `@${name}`
  return 'Set a Leaderboard Name'
}

function initialGroupsRoute() {
  if (typeof window === 'undefined') {
    return { groupId: null, section: null }
  }
  return parseGroupsRoute(window.location.pathname)
}

/**
 * Groups beta — list / create / join + People + weekly Activity.
 */
function GroupsPage({ onOpenTab, onRequestAuth }) {
  const { isAuthenticated, user, loading: authLoading } = useAuth()
  const initialRoute = initialGroupsRoute()
  const [groupId, setGroupId] = useState(initialRoute.groupId)
  const [detailTab, setDetailTab] = useState(
    initialRoute.section || 'overview',
  )
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [modal, setModal] = useState(null) // 'create' | 'join' | null
  const [createName, setCreateName] = useState('')
  const [createDescription, setCreateDescription] = useState('')
  const [joinCode, setJoinCode] = useState('')
  const [busy, setBusy] = useState(false)

  const [group, setGroup] = useState(null)
  const [members, setMembers] = useState([])
  const [detailLoading, setDetailLoading] = useState(false)
  const [myRole, setMyRole] = useState(null)
  const [inviteCopyNotice, setInviteCopyNotice] = useState('')
  const [logModalOpen, setLogModalOpen] = useState(false)
  const [dataRefreshToken, setDataRefreshToken] = useState(0)
  const [onboardingOpen, setOnboardingOpen] = useState(false)
  const [peopleQuery, setPeopleQuery] = useState('')
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false)

  const modalOpen = Boolean(modal)
  const modalRef = useFocusTrap(modalOpen, () => setModal(null))

  const syncRouteFromLocation = useCallback(() => {
    const route = parseGroupsRoute(window.location.pathname)
    setGroupId(route.groupId)
    if (route.groupId) {
      setDetailTab(route.section || 'overview')
    }
    setError('')
    setNotice('')
  }, [])

  const openGroup = useCallback((id, section = 'overview') => {
    if (!id) return
    const nextSection = section || 'overview'
    window.history.pushState({}, '', pathForGroup(id, nextSection))
    setGroupId(id)
    setDetailTab(nextSection)
    setError('')
    setNotice('')
  }, [])

  const selectDetailTab = useCallback(
    (tabId) => {
      if (!groupId) return
      setDetailTab(tabId)
      window.history.pushState({}, '', pathForGroup(groupId, tabId))
    },
    [groupId],
  )

  const goToList = useCallback(() => {
    window.history.pushState({}, '', '/groups')
    setGroupId(null)
    setGroup(null)
    setMembers([])
    setDetailTab('overview')
    setError('')
    setNotice('')
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', syncRouteFromLocation)
    return () => window.removeEventListener('popstate', syncRouteFromLocation)
  }, [syncRouteFromLocation])

  const refreshList = useCallback(async () => {
    if (!isAuthenticated || !isSupabaseConfigured) return
    setLoading(true)
    setError('')
    try {
      const rows = await listMyGroups()
      setGroups(rows)
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not load your groups.'))
    } finally {
      setLoading(false)
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated || groupId) return undefined
    refreshList()
    return undefined
  }, [isAuthenticated, groupId, refreshList])

  useEffect(() => {
    if (!isAuthenticated || !groupId || !isSupabaseConfigured) return undefined

    let cancelled = false
    setDetailLoading(true)
    setError('')

    ;(async () => {
      try {
        const [groupRow, memberRows, myGroups] = await Promise.all([
          fetchGroup(groupId),
          fetchGroupMembers(groupId),
          listMyGroups(),
        ])
        if (cancelled) return
        if (!groupRow) {
          setGroup(null)
          setMembers([])
          setMyRole(null)
          setError('Group not found, or you are not a member.')
          return
        }
        setGroup(groupRow)
        setMembers(memberRows)
        const mine = myGroups.find((g) => g.id === groupId)
        setMyRole(mine?.my_role || null)
      } catch (err) {
        if (!cancelled) {
          setGroup(null)
          setMembers([])
          setError(friendlyGroupError(err, 'Could not open this group.'))
        }
      } finally {
        if (!cancelled) setDetailLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, groupId])

  const handleCreate = async (event) => {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    setNotice('')
    try {
      const created = await createGroup(createName, createDescription)
      setModal(null)
      setCreateName('')
      setCreateDescription('')
      setNotice(
        `Created “${created.name}”. Open People to copy your invite code and send it to your crew.`,
      )
      await refreshList()
      openGroup(created.id, 'overview')
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not create group.'))
    } finally {
      setBusy(false)
    }
  }

  const handleJoin = async (event) => {
    event.preventDefault()
    if (busy) return
    setBusy(true)
    setError('')
    setNotice('')
    try {
      const joined = await joinGroupByInvite(joinCode)
      setModal(null)
      setJoinCode('')
      setNotice(`Joined “${joined.name}”.`)
      await refreshList()
      openGroup(joined.id, 'overview')
      if (needsJoinOnboarding(joined.id)) {
        setOnboardingOpen(true)
      }
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not join group.'))
    } finally {
      setBusy(false)
    }
  }

  const handleLeave = async () => {
    if (!groupId || busy) return
    if (isAdmin) {
      if (
        !window.confirm(
          `You're the admin of this group.\n\nLeaving will permanently delete the group and all group-specific data for everyone.\n\nDelete “${group?.name || 'this group'}”?`,
        )
      ) {
        return
      }
    } else if (!window.confirm('Leave this group?')) {
      return
    }
    setBusy(true)
    setError('')
    try {
      await leaveGroup(groupId)
      setNotice(
        isAdmin ? 'Group deleted.' : 'You left the group.',
      )
      goToList()
      await refreshList()
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not leave group.'))
    } finally {
      setBusy(false)
    }
  }

  const handleRemoveMember = async (memberUserId, handle) => {
    if (!groupId || busy || !memberUserId) return
    if (!window.confirm(`Remove ${handle} from this group?`)) return
    setBusy(true)
    setError('')
    try {
      await removeGroupMember(groupId, memberUserId)
      setMembers((list) => list.filter((m) => m.user_id !== memberUserId))
      setNotice('Member removed.')
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not remove member.'))
    } finally {
      setBusy(false)
    }
  }

  const isAdmin = myRole === 'admin'

  const openLogActivity = () => {
    setLogModalOpen(true)
  }

  const handleLogged = () => {
    setDataRefreshToken((n) => n + 1)
    setNotice('Activity logged.')
  }

  const copyInvite = async () => {
    const code = group?.invite_code
    if (!code) return
    try {
      await navigator.clipboard.writeText(code)
      setInviteCopyNotice('Copied — send this to your crew.')
    } catch {
      setInviteCopyNotice('Could not copy — select the code manually.')
    }
  }

  const shareInvite = async () => {
    const code = group?.invite_code
    if (!code) return
    const text = `Join my KinesoScore group with invite code ${code}`
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({
          title: 'Join my KinesoScore group',
          text,
        })
        setInviteCopyNotice('Invite shared.')
        return
      }
    } catch (err) {
      if (err?.name === 'AbortError') return
    }
    await copyInvite()
  }

  const missingNameCount = members.filter(
    (m) => !String(m.leaderboard_name || '').trim(),
  ).length

  if (authLoading) {
    return (
      <main className="page groups-page">
        <p className="calc-hint">Loading…</p>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="page groups-page">
        <LockedAuthCard
          eyebrow="Together"
          title={GROUPS_LOCKED_PREVIEW.title}
          lead={GROUPS_LOCKED_PREVIEW.lead}
          benefits={GROUPS_LOCKED_PREVIEW.benefits}
          sampleKind="groups"
          onRequestAuth={onRequestAuth}
          onOpenTab={onOpenTab}
        />
      </main>
    )
  }

  if (!isSupabaseConfigured) {
    return (
      <main className="page groups-page">
        <header className="page-header">
          <p className="page-eyebrow">Together</p>
          <h1>Groups</h1>
          <p className="page-lead">Groups is not configured in this environment.</p>
        </header>
      </main>
    )
  }

  if (groupId) {
    return (
      <main className="page groups-page">
        <header className="page-header">
          <p className="page-eyebrow">Together</p>
          <button type="button" className="btn btn-ghost groups-back" onClick={goToList}>
            ← My Groups
          </button>
          <div className="groups-detail-title-row">
            <ProfileAvatar
              avatarId={normalizeAvatarId(group?.avatar_id)}
              size="md"
            />
            <h1>{group?.name || 'Group'}</h1>
          </div>
          {group?.description?.trim() ? (
            <p className="page-lead">{group.description.trim()}</p>
          ) : null}
        </header>

        {error ? <p className="feedback feedback-error">{error}</p> : null}
        {notice ? <p className="feedback feedback-success">{notice}</p> : null}

        {detailLoading ? (
          <p className="calc-hint">Loading group…</p>
        ) : group ? (
          <>
            {detailTab !== 'settings' ? (
              <div className="groups-log-cta">
                <button
                  type="button"
                  className="btn btn-primary groups-log-cta-btn"
                  onClick={openLogActivity}
                >
                  + Log Activity
                </button>
              </div>
            ) : null}

            <div className="groups-tabs" role="tablist" aria-label="Group sections">
              {GROUP_TABS.filter((t) =>
                t.id === 'people' || t.id === 'settings' ? false : true,
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={detailTab === tab.id}
                  className={`leaderboard-chip groups-tab groups-tab-primary${
                    detailTab === tab.id ? ' is-active' : ''
                  }`}
                  onClick={() => selectDetailTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
              <div className="groups-tabs-more-wrap">
                <button
                  type="button"
                  className={`leaderboard-chip groups-tab${
                    detailTab === 'people' || detailTab === 'settings'
                      ? ' is-active'
                      : ''
                  }`}
                  aria-expanded={mobileMoreOpen}
                  onClick={() => setMobileMoreOpen((v) => !v)}
                >
                  More
                </button>
                {mobileMoreOpen ? (
                  <div className="groups-tabs-more-menu" role="menu">
                    <button
                      type="button"
                      role="menuitem"
                      className={`leaderboard-chip${
                        detailTab === 'people' ? ' is-active' : ''
                      }`}
                      onClick={() => {
                        setMobileMoreOpen(false)
                        selectDetailTab('people')
                      }}
                    >
                      People
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      className={`leaderboard-chip${
                        detailTab === 'settings' ? ' is-active' : ''
                      }`}
                      onClick={() => {
                        setMobileMoreOpen(false)
                        selectDetailTab('settings')
                      }}
                    >
                      Settings
                    </button>
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                role="tab"
                aria-selected={detailTab === 'people'}
                className={`leaderboard-chip groups-tab groups-tab-desktop${
                  detailTab === 'people' ? ' is-active' : ''
                }`}
                onClick={() => selectDetailTab('people')}
              >
                People
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={detailTab === 'settings'}
                className={`leaderboard-chip groups-tab groups-tab-desktop${
                  detailTab === 'settings' ? ' is-active' : ''
                }`}
                onClick={() => selectDetailTab('settings')}
              >
                Settings
              </button>
            </div>

            {detailTab === 'overview' ? (
              <GroupOverviewPanel
                group={group}
                groupId={groupId}
                members={members}
                refreshToken={dataRefreshToken}
                onRequestLog={openLogActivity}
              />
            ) : detailTab === 'activity' && user?.id ? (
              <GroupActivityPanel
                groupId={groupId}
                userId={user.id}
                members={members}
                refreshToken={dataRefreshToken}
                isAdmin={isAdmin}
              />
            ) : detailTab === 'leaderboard' ? (
              <GroupLeaderboardPanel
                groupId={groupId}
                members={members}
                isAdmin={isAdmin}
                onOpenTab={selectDetailTab}
                onOpenAppTab={onOpenTab}
                onRequestLog={openLogActivity}
              />
            ) : detailTab === 'settings' ? (
              <GroupSettingsPanel
                group={group}
                groupId={groupId}
                isAdmin={isAdmin}
                busy={busy}
                members={members}
                userId={user?.id}
                onGroupUpdated={(updated) => {
                  setGroup(updated)
                  void fetchGroupMembers(groupId).then((rows) => {
                    setMembers(rows)
                    const mine = rows.find((m) => m.user_id === user?.id)
                    setMyRole(mine?.role || null)
                  })
                }}
                onLeaveGroup={handleLeave}
              />
            ) : detailTab === 'people' ? (
              <section className="groups-people" aria-label="Group members">
                <h2 className="groups-section-title">People</h2>
                <p className="groups-card-meta">
                  {members.length} member{members.length === 1 ? '' : 's'}
                  {isAdmin && missingNameCount > 0
                    ? ` · ${missingNameCount} without Leaderboard Name${
                        missingNameCount === 1 ? '' : 's'
                      }`
                    : ''}
                </p>

                <label className="field groups-people-search">
                  <span className="sr-only">Search people</span>
                  <input
                    type="search"
                    placeholder="Search people"
                    value={peopleQuery}
                    onChange={(e) => setPeopleQuery(e.target.value)}
                  />
                </label>

                <div className="groups-invite-moment" role="status">
                  <p className="groups-invite-moment-label">Invite code</p>
                  <p className="groups-invite-moment-code">{group.invite_code}</p>
                  <p className="calc-hint">Send this to your crew to join.</p>
                  <div className="confirm-actions">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={shareInvite}
                    >
                      Share Invite
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost"
                      onClick={copyInvite}
                    >
                      Copy Code
                    </button>
                  </div>
                  {inviteCopyNotice ? (
                    <p className="feedback feedback-success" role="status">
                      {inviteCopyNotice}
                    </p>
                  ) : null}
                </div>

                {isAdmin && missingNameCount > 0 ? (
                  <p className="calc-hint">
                    {missingNameCount} member
                    {missingNameCount === 1 ? '' : 's'} still need a Leaderboard
                    Name to show cleanly on boards.
                  </p>
                ) : null}

                {members.length < 2 ? (
                  <p className="calc-hint">
                    Invite others to start building your group.
                  </p>
                ) : null}
                {(() => {
                  const self = members.find((m) => m.user_id === user?.id)
                  const missingHandle = self && !String(self.leaderboard_name || '').trim()
                  if (!missingHandle) return null
                  return (
                    <div className="groups-people-nudge">
                      <p className="calc-hint">
                        Set a Leaderboard Name so your crew can recognize you.
                      </p>
                      {onOpenTab ? (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => onOpenTab('account')}
                        >
                          Open Account
                        </button>
                      ) : null}
                    </div>
                  )
                })()}
                {members.length === 0 ? (
                  <p className="calc-hint">No members yet.</p>
                ) : (
                  <ul className="groups-member-list">
                    {members
                      .filter((member) => {
                        const q = peopleQuery.trim().toLowerCase()
                        if (!q) return true
                        const handle = formatPeopleHandle(member).toLowerCase()
                        const display = String(
                          member.display_name || '',
                        ).toLowerCase()
                        return handle.includes(q) || display.includes(q)
                      })
                      .map((member) => {
                      const isSelf = member.user_id === user?.id
                      const handle = formatPeopleHandle(member)
                      const displayName = String(
                        member.display_name || '',
                      ).trim()
                      return (
                        <li key={member.user_id} className="groups-member-row">
                          <ProfileAvatar avatarId={member.avatar_id} size="sm" />
                          <div className="groups-member-copy">
                            <p className="groups-member-name">
                              {handle}
                              {isSelf ? ' (you)' : ''}
                            </p>
                            <p className="groups-member-meta">
                              {displayName || null}
                              {displayName && member.role === 'admin'
                                ? ' · '
                                : null}
                              {member.role === 'admin' ? (
                                <span className="groups-role-pill">Admin</span>
                              ) : null}
                            </p>
                          </div>
                          {isAdmin && !isSelf && member.role !== 'admin' ? (
                            <button
                              type="button"
                              className="btn btn-ghost"
                              disabled={busy}
                              onClick={() =>
                                handleRemoveMember(member.user_id, handle)
                              }
                            >
                              Kick
                            </button>
                          ) : null}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </section>
            ) : (
              <p className="calc-hint">Loading…</p>
            )}

            {user?.id ? (
              <GroupLogActivityModal
                open={logModalOpen}
                groupId={groupId}
                userId={user.id}
                onClose={() => setLogModalOpen(false)}
                onLogged={handleLogged}
              />
            ) : null}

            {onboardingOpen ? (
              <div className="confirm-modal-layer">
                <div
                  className="confirm-modal-backdrop"
                  aria-hidden="true"
                  onClick={() => {
                    markJoinOnboardingDone(groupId)
                    setOnboardingOpen(false)
                  }}
                />
                <div
                  className="confirm-modal"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="groups-onboard-title"
                >
                  <p className="confirm-modal-eyebrow">Welcome</p>
                  <p id="groups-onboard-title" className="confirm-modal-title">
                    You&apos;re in
                  </p>
                  <ol className="groups-onboard-steps">
                    <li>Set a Leaderboard Name in Account so your crew knows you.</li>
                    <li>Log your first set with Log Activity.</li>
                    <li>Check Overview for group totals and goals.</li>
                  </ol>
                  <div className="confirm-actions">
                    {onOpenTab ? (
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => {
                          markJoinOnboardingDone(groupId)
                          setOnboardingOpen(false)
                          onOpenTab('account')
                        }}
                      >
                        Open Account
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        markJoinOnboardingDone(groupId)
                        setOnboardingOpen(false)
                        openLogActivity()
                      }}
                    >
                      Log first set
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </main>
    )
  }

  return (
    <main className="page groups-page">
      <header className="page-header">
        <p className="page-eyebrow">Together</p>
        <h1>Groups</h1>
        <p className="page-lead">
          Create or join a private group, log weekly fitness activity, and see
          how the group stacks up.
        </p>
      </header>

      <div className="confirm-actions groups-toolbar">
        <button
          type="button"
          className="btn btn-primary"
          disabled={groups.length >= MAX_GROUPS}
          onClick={() => {
            setError('')
            if (groups.length >= MAX_GROUPS) {
              setError(
                'You can belong to a maximum of 3 groups. Leave a group before joining another.',
              )
              return
            }
            setModal('create')
          }}
        >
          Create Group
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          disabled={groups.length >= MAX_GROUPS}
          onClick={() => {
            setError('')
            if (groups.length >= MAX_GROUPS) {
              setError(
                'You can belong to a maximum of 3 groups. Leave a group before joining another.',
              )
              return
            }
            setModal('join')
          }}
        >
          Join Group
        </button>
      </div>

      {error ? <p className="feedback feedback-error">{error}</p> : null}
      {notice ? <p className="feedback feedback-success">{notice}</p> : null}

      <section aria-labelledby="my-groups-heading">
        <h2 id="my-groups-heading" className="groups-section-title">
          My Groups
        </h2>
        {loading ? (
          <p className="calc-hint">Loading groups…</p>
        ) : groups.length === 0 ? (
          <p className="calc-hint">
            You aren&apos;t part of any groups yet.
          </p>
        ) : (
          <ul className="groups-card-list">
            {groups.map((row) => (
              <li key={row.id} className="groups-card">
                <ProfileAvatar
                  avatarId={normalizeAvatarId(row.avatar_id)}
                  size="sm"
                />
                <div className="groups-card-copy">
                  <h3 className="groups-card-title">{row.name}</h3>
                  <p className="groups-card-meta">
                    {row.member_count} member
                    {row.member_count === 1 ? '' : 's'}
                    {row.my_role === 'admin' ? ' · Admin' : ''}
                  </p>
                  <p className="groups-card-meta">
                    {row.last_activity_at
                      ? `Last activity ${formatRelativeActivityTime(
                          row.last_activity_at,
                        )}`
                      : 'No activity yet'}
                    {row.invite_code ? ` · Code ${row.invite_code}` : ''}
                  </p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openGroup(row.id)}
                >
                  Open
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {modal ? (
        <div className="confirm-modal-layer" role="presentation">
          <button
            type="button"
            className="confirm-modal-backdrop"
            aria-label="Close dialog"
            onClick={() => setModal(null)}
          />
          <div
            className="confirm-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="groups-modal-title"
            ref={modalRef}
          >
            {modal === 'create' ? (
              <form onSubmit={handleCreate}>
                <p className="confirm-modal-eyebrow">Groups</p>
                <h2 id="groups-modal-title" className="confirm-modal-title">
                  Create Group
                </h2>
                <label className="field">
                  <span>Group name</span>
                  <input
                    type="text"
                    value={createName}
                    onChange={(e) => setCreateName(e.target.value)}
                    maxLength={NAME_MAX}
                    required
                    autoFocus
                  />
                  <span className="groups-char-count">
                    {createName.trim().length} / {NAME_MAX}
                  </span>
                </label>
                <label className="field">
                  <span>Description (optional)</span>
                  <textarea
                    value={createDescription}
                    onChange={(e) => setCreateDescription(e.target.value)}
                    maxLength={DESC_MAX}
                    rows={3}
                  />
                  <span className="groups-char-count">
                    {createDescription.length} / {DESC_MAX}
                  </span>
                </label>
                <div className="confirm-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={busy || !createName.trim()}
                  >
                    Create Group
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setModal(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleJoin}>
                <p className="confirm-modal-eyebrow">Groups</p>
                <h2 id="groups-modal-title" className="confirm-modal-title">
                  Join Group
                </h2>
                <label className="field">
                  <span>Invite code</span>
                  <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="KS-7F4K9P"
                    autoCapitalize="characters"
                    autoCorrect="off"
                    spellCheck={false}
                    required
                    autoFocus
                  />
                </label>
                <div className="confirm-actions">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={busy || !joinCode.trim()}
                  >
                    Join Group
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setModal(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </main>
  )
}

export default GroupsPage
