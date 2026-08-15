import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import ProfileAvatar from '../components/ProfileAvatar'
import { normalizeAvatarId } from '../data/avatarCatalog'
import { requestShareMoment } from '../lib/shareMoments'
import {
  aggregateActivityTotals,
  buildActivityLeaderboard,
  computeGroupLogStreak,
  countUniqueLoggers,
  fetchGroupActivityLogsForWeek,
  fetchGroupActivityLogsRecent,
  fetchGroupActivityTypes,
  formatActivityAmount,
  formatLocalWeekRangeLabel,
  friendlyGroupError,
  localWeekEndKey,
  localWeekStartKey,
  shiftLocalWeekStart,
} from '../lib/groups'

/**
 * Overview: adaptive totals/goals (1–6), challenge, streaks, week delta, drilldown.
 *
 * @param {{
 *   group: object,
 *   groupId: string,
 *   members?: Array<object>,
 *   refreshToken?: number,
 *   onRequestLog?: () => void,
 * }} props
 */
function GroupOverviewPanel({
  group,
  groupId,
  members,
  refreshToken = 0,
  onRequestLog,
}) {
  const { user } = useAuth()
  const userId = user?.id || ''
  const [types, setTypes] = useState([])
  const [weekLogs, setWeekLogs] = useState([])
  const [prevLogs, setPrevLogs] = useState([])
  const [recentLogs, setRecentLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [expandedTypeId, setExpandedTypeId] = useState(null)

  const weekStart = localWeekStartKey()
  const weekEnd = localWeekEndKey(weekStart)
  const prevWeekStart = shiftLocalWeekStart(weekStart, -1)
  const prevWeekEnd = localWeekEndKey(prevWeekStart)
  const memberCount = members?.length || 0

  const membersById = useMemo(() => {
    const map = new Map()
    for (const m of members || []) map.set(m.user_id, m)
    return map
  }, [members])

  const { groupTotals, userTotals } = useMemo(
    () => aggregateActivityTotals(weekLogs, userId),
    [weekLogs, userId],
  )
  const { groupTotals: prevTotals } = useMemo(
    () => aggregateActivityTotals(prevLogs, ''),
    [prevLogs],
  )

  const overviewTypes = useMemo(() => {
    const picked = types
      .filter((t) => t.is_enabled && t.show_on_overview === true)
      .sort(
        (a, b) =>
          (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0) ||
          String(a.name || '').localeCompare(String(b.name || '')),
      )
    return picked.slice(0, 6)
  }, [types])

  const goalTypes = useMemo(
    () =>
      overviewTypes.filter((t) => {
        const goal = Number(t.weekly_goal)
        return Number.isFinite(goal) && goal > 0
      }),
    [overviewTypes],
  )

  const loggersThisWeek = useMemo(
    () => countUniqueLoggers(weekLogs),
    [weekLogs],
  )

  const streak = useMemo(
    () => computeGroupLogStreak(recentLogs, userId),
    [recentLogs, userId],
  )

  const challengeType = useMemo(() => {
    const id = group?.challenge_activity_type_id
    if (!id) return null
    return types.find((t) => t.id === id) || null
  }, [group, types])

  const challengePct = useMemo(() => {
    if (!challengeType) return 0
    const goal = Number(group?.challenge_goal)
    if (!goal) return 0
    const total = groupTotals.get(challengeType.id) || 0
    return Math.min(100, Math.round((total / goal) * 100))
  }, [challengeType, group, groupTotals])

  const refresh = useCallback(async () => {
    if (!groupId) return
    setLoading(true)
    setError('')
    try {
      const [typeRows, logRows, prevRows, recentRows] = await Promise.all([
        fetchGroupActivityTypes(groupId),
        fetchGroupActivityLogsForWeek(groupId, weekStart, weekEnd),
        fetchGroupActivityLogsForWeek(groupId, prevWeekStart, prevWeekEnd),
        fetchGroupActivityLogsRecent(groupId, 120),
      ])
      setTypes(typeRows)
      setWeekLogs(logRows)
      setPrevLogs(prevRows)
      setRecentLogs(recentRows)
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not load group overview.'))
    } finally {
      setLoading(false)
    }
  }, [groupId, weekStart, weekEnd, prevWeekStart, prevWeekEnd])

  useEffect(() => {
    refresh()
  }, [refresh, refreshToken])

  // Soft live poll
  useEffect(() => {
    if (!groupId) return undefined
    const tick = () => {
      if (document.visibilityState === 'visible') void refresh()
    }
    const id = window.setInterval(tick, 25000)
    return () => window.clearInterval(id)
  }, [groupId, refresh])

  const deltaLabel = (typeId) => {
    const now = groupTotals.get(typeId) || 0
    const prev = prevTotals.get(typeId) || 0
    const d = now - prev
    if (d === 0) return 'same as last week'
    if (d > 0) return `↑${formatActivityAmount(d, types.find((t) => t.id === typeId)?.unit || '')} vs last week`
    return `↓${formatActivityAmount(Math.abs(d), types.find((t) => t.id === typeId)?.unit || '')} vs last week`
  }

  const shareWeekWrap = () => {
    const topLines = overviewTypes
      .slice(0, 3)
      .map((t) => {
        const total = groupTotals.get(t.id) || 0
        return `${t.name}: ${formatActivityAmount(total, t.unit)}`
      })
      .join(' · ')
    const goalsHit = goalTypes.filter(
      (t) => (groupTotals.get(t.id) || 0) >= Number(t.weekly_goal),
    ).length
    requestShareMoment({
      type: 'week_recap',
      title: `${group?.name || 'Group'} · week wrap`,
      primary: topLines || 'No activity yet',
      secondary: `${goalsHit} goal${goalsHit === 1 ? '' : 's'} hit · ${loggersThisWeek}/${memberCount} logged`,
    })
  }

  return (
    <section className="groups-overview" aria-label="Group overview">
      <div className="groups-overview-identity">
        <ProfileAvatar
          avatarId={normalizeAvatarId(group?.avatar_id)}
          size="md"
        />
        <div>
          <p className="groups-card-meta">
            {memberCount} member{memberCount === 1 ? '' : 's'} ·{' '}
            {formatLocalWeekRangeLabel(weekStart)}
          </p>
          <p className="groups-week-reset-hint">Resets Monday</p>
          {memberCount > 0 ? (
            <p className="groups-participation">
              {loggersThisWeek} of {memberCount} member
              {memberCount === 1 ? '' : 's'} logged this week
              {streak > 0 ? ` · Your streak: ${streak}d` : ''}
            </p>
          ) : null}
        </div>
      </div>

      {challengeType && Number(group?.challenge_goal) > 0 ? (
        <article className="groups-challenge-card">
          <h2 className="groups-overview-square-title">This week&apos;s challenge</h2>
          <p className="groups-overview-square-sub">
            {challengeType.name} ·{' '}
            {formatActivityAmount(
              groupTotals.get(challengeType.id) || 0,
              challengeType.unit,
            )}{' '}
            / {formatActivityAmount(group.challenge_goal, challengeType.unit)}
          </p>
          <div
            className="groups-goal-bar"
            role="progressbar"
            aria-valuenow={challengePct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span
              className={`groups-goal-bar-fill${
                challengePct >= 100 ? ' is-hit' : ''
              }`}
              style={{ width: `${challengePct}%` }}
            />
          </div>
          <p className="groups-goal-pct">
            {challengePct >= 100 ? 'Challenge complete' : `${challengePct}%`}
          </p>
        </article>
      ) : null}

      <div className="confirm-actions groups-overview-actions">
        <button type="button" className="btn btn-ghost" onClick={shareWeekWrap}>
          Week wrap
        </button>
        {onRequestLog ? (
          <button type="button" className="btn btn-ghost" onClick={onRequestLog}>
            Log a set
          </button>
        ) : null}
      </div>

      {error ? <p className="feedback feedback-error">{error}</p> : null}

      {loading ? (
        <p className="calc-hint">Loading overview…</p>
      ) : overviewTypes.length === 0 ? (
        <div className="groups-empty groups-empty-hero">
          <p className="groups-empty-title">No overview metrics yet</p>
          <p className="calc-hint">
            Admins pick 1–6 activities in Settings for totals and goals. Invite
            your crew, then log the first set.
          </p>
          {onRequestLog ? (
            <button type="button" className="btn btn-primary" onClick={onRequestLog}>
              Log Activity
            </button>
          ) : null}
        </div>
      ) : (
        <div
          className={`groups-overview-grid groups-overview-count-${Math.min(
            6,
            overviewTypes.length,
          )}${goalTypes.length === 0 ? ' is-totals-only' : ''}`}
        >
          <article
            className="groups-overview-square"
            aria-labelledby="groups-totals-heading"
          >
            <h2
              id="groups-totals-heading"
              className="groups-overview-square-title"
            >
              Group Totals
            </h2>
            <p className="groups-overview-square-sub">
              {overviewTypes.length} activit
              {overviewTypes.length === 1 ? 'y' : 'ies'} · This week
            </p>
            <ul className="groups-totals-list">
              {overviewTypes.map((type) => {
                const groupAmt = groupTotals.get(type.id) || 0
                const yours = userTotals.get(type.id) || 0
                const open = expandedTypeId === type.id
                const board = open
                  ? buildActivityLeaderboard(weekLogs, type.id, membersById)
                  : []
                return (
                  <li key={type.id} className="groups-total-row groups-total-row-stack">
                    <button
                      type="button"
                      className="groups-total-main groups-total-expand"
                      onClick={() =>
                        setExpandedTypeId(open ? null : type.id)
                      }
                    >
                      <span className="groups-total-name">{type.name}</span>
                      <strong className="groups-total-value">
                        {formatActivityAmount(groupAmt, type.unit, {
                          withTotalSuffix: true,
                        })}
                      </strong>
                    </button>
                    <p className="groups-you-line">
                      You: {formatActivityAmount(yours, type.unit)}
                      {groupAmt > 0
                        ? ` of ${formatActivityAmount(groupAmt, type.unit)}`
                        : ''}
                    </p>
                    <p className="groups-delta-line">{deltaLabel(type.id)}</p>
                    {open ? (
                      <ul className="groups-contrib-list">
                        {board.length === 0 ? (
                          <li className="calc-hint">No logs yet.</li>
                        ) : (
                          board.map((row) => (
                            <li key={row.user_id}>
                              {row.handle}:{' '}
                              {formatActivityAmount(row.total, type.unit)}
                            </li>
                          ))
                        )}
                      </ul>
                    ) : null}
                  </li>
                )
              })}
            </ul>
          </article>

          {goalTypes.length > 0 ? (
            <article
              className="groups-overview-square"
              aria-labelledby="groups-goals-heading"
            >
              <h2
                id="groups-goals-heading"
                className="groups-overview-square-title"
              >
                Goals
              </h2>
              <p className="groups-overview-square-sub">How close we are</p>
              <ul className="groups-goals-list">
                {goalTypes.map((type) => {
                  const total = groupTotals.get(type.id) || 0
                  const yours = userTotals.get(type.id) || 0
                  const goal = Number(type.weekly_goal)
                  const pct = Math.min(100, Math.round((total / goal) * 100))
                  const hit = total >= goal
                  return (
                    <li
                      key={type.id}
                      className={`groups-goal-row${hit ? ' is-hit' : ''}`}
                    >
                      <div className="groups-goal-head">
                        <span className="groups-total-name">
                          {type.name}
                          {hit ? (
                            <span className="groups-goal-hit-badge">
                              Goal hit
                            </span>
                          ) : null}
                        </span>
                        <strong className="groups-total-value">
                          {formatActivityAmount(total, type.unit)} /{' '}
                          {formatActivityAmount(goal, type.unit)}
                        </strong>
                      </div>
                      <div
                        className="groups-goal-bar"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={pct}
                      >
                        <span
                          className={`groups-goal-bar-fill${
                            hit ? ' is-hit' : ''
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <p className="groups-goal-pct">
                        {hit ? 'Goal hit' : `${pct}%`}
                        {yours > 0
                          ? ` · You: ${formatActivityAmount(yours, type.unit)}`
                          : ''}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </article>
          ) : null}
        </div>
      )}
    </section>
  )
}

export default GroupOverviewPanel
