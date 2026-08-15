import { useCallback, useEffect, useMemo, useState } from 'react'
import ProfileAvatar from '../components/ProfileAvatar'
import GroupWeekNav from '../components/GroupWeekNav'
import {
  groupBoardMeta,
  labelForGroupBoardKey,
  tabIdForGroupBoardKey,
} from '../data/groupAssessmentBoards'
import { formatRecordValue } from '../lib/performanceRecords'
import {
  buildActivityLeaderboard,
  deleteGroupMemberWeekActivity,
  fetchGroupActivityLogsForWeek,
  fetchGroupActivityTypes,
  fetchGroupAssessmentBoards,
  fetchGroupAssessmentLeaderboard,
  formatLeaderboardAmount,
  formatLocalWeekRangeLabel,
  friendlyGroupError,
  localWeekEndKey,
  localWeekStartKey,
  removeGroupAssessmentShare,
} from '../lib/groups'
import {
  getPinnedBoardId,
  setPinnedBoardId,
} from '../lib/groupPrefs'
import { useAuth } from '../auth/AuthContext'

/**
 * Group leaderboard — same filter + table chrome as the site Leaderboard,
 * with boards limited to what the admin enables.
 *
 * @param {{
 *   groupId: string,
 *   members: Array<object>,
 *   isAdmin?: boolean,
 *   onOpenTab?: (tabId: string) => void,
 *   onOpenAppTab?: (tabId: string) => void,
 *   onRequestLog?: () => void,
 * }} props
 */
function GroupLeaderboardPanel({
  groupId,
  members,
  isAdmin = false,
  onOpenTab,
  onOpenAppTab,
  onRequestLog,
}) {
  const { user } = useAuth()
  const userId = user?.id || ''
  const [types, setTypes] = useState([])
  const [assessmentBoards, setAssessmentBoards] = useState([])
  const [logs, setLogs] = useState([])
  const [assessmentRows, setAssessmentRows] = useState([])
  const [weekStart, setWeekStart] = useState(() => localWeekStartKey())
  const [categoryId, setCategoryId] = useState('activities')
  const [activeBoardId, setActiveBoardId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [removingId, setRemovingId] = useState(null)

  const weekEnd = useMemo(() => localWeekEndKey(weekStart), [weekStart])

  const membersById = useMemo(() => {
    const map = new Map()
    for (const m of members || []) map.set(m.user_id, m)
    return map
  }, [members])

  const activityBoards = useMemo(
    () =>
      types
        .filter((t) => t.is_enabled && t.show_on_leaderboard === true)
        .sort(
          (a, b) =>
            (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0) ||
            String(a.name || '').localeCompare(String(b.name || '')),
        )
        .map((t) => ({
          id: `activity:${t.id}`,
          kind: 'activity',
          typeId: t.id,
          label: t.name,
          unit: t.unit,
          higherIsBetter: t.higher_is_better !== false,
        })),
    [types],
  )

  const assessmentBoardTabs = useMemo(
    () =>
      (assessmentBoards || [])
        .filter((b) => b && b.is_enabled === true && b.board_key)
        .map((b) => ({
          id: `board:${b.board_key}`,
          kind: 'assessment',
          boardKey: b.board_key,
          label: labelForGroupBoardKey(b.board_key),
        })),
    [assessmentBoards],
  )

  const categories = useMemo(() => {
    const list = []
    if (activityBoards.length > 0) {
      list.push({
        id: 'activities',
        label: 'Activities',
        boards: activityBoards,
      })
    }
    if (assessmentBoardTabs.length > 0) {
      list.push({
        id: 'assessments',
        label: 'Assessments',
        boards: assessmentBoardTabs,
      })
    }
    return list
  }, [activityBoards, assessmentBoardTabs])

  const category =
    categories.find((c) => c.id === categoryId) || categories[0] || null

  const boards = category?.boards || []
  const selected =
    boards.find((b) => b.id === activeBoardId) || boards[0] || null

  const activityRows = useMemo(() => {
    if (!selected || selected.kind !== 'activity') return []
    return buildActivityLeaderboard(logs, selected.typeId, membersById, {
      higherIsBetter: selected.higherIsBetter,
    }).map((row) => {
      const name =
        row.member?.leaderboard_name ||
        (row.handle?.startsWith('@') ? row.handle.slice(1) : row.handle) ||
        'Member'
      return {
        user_id: row.user_id,
        rank: row.rank,
        leaderboard_name: name,
        avatar_id: row.member?.avatar_id || null,
        result_display: formatLeaderboardAmount(row.total, selected.unit),
      }
    })
  }, [logs, selected, membersById])

  const assessmentTableRows = useMemo(() => {
    if (!selected || selected.kind !== 'assessment') return []
    const meta = groupBoardMeta(selected.boardKey)
    const higherIsBetter = meta?.higherIsBetter !== false
    const rows = (assessmentRows || []).map((row) => {
      const member = membersById.get(row.user_id)
      const name =
        row.leaderboard_name ||
        member?.leaderboard_name ||
        'Member'
      return {
        user_id: row.user_id,
        leaderboard_name: name,
        avatar_id: member?.avatar_id || null,
        total: Number(row.result_value) || 0,
        result_display:
          formatRecordValue(
            row.result_value,
            'number',
            row.result_unit,
          ) || String(row.result_value ?? ''),
      }
    })
    rows.sort((a, b) => {
      if (a.total !== b.total) {
        return higherIsBetter ? b.total - a.total : a.total - b.total
      }
      return String(a.leaderboard_name).localeCompare(String(b.leaderboard_name))
    })
    let rank = 0
    let prev = null
    return rows.map((row) => {
      if (prev === null || row.total !== prev) {
        rank += 1
        prev = row.total
      }
      return { ...row, rank }
    })
  }, [assessmentRows, selected, membersById])

  const tableRows =
    selected?.kind === 'activity' ? activityRows : assessmentTableRows

  const viewerName = useMemo(() => {
    const mine = membersById.get(userId)
    return mine?.leaderboard_name || null
  }, [membersById, userId])

  const boardCaption = useMemo(() => {
    if (!selected) return ''
    if (selected.kind === 'activity') {
      return `${selected.label} · ${formatLocalWeekRangeLabel(weekStart)}`
    }
    return `${selected.label} · Latest shared`
  }, [selected, weekStart])

  const refreshMeta = useCallback(async () => {
    if (!groupId) return
    setLoading(true)
    setError('')
    try {
      const [typeRows, boardRows] = await Promise.all([
        fetchGroupActivityTypes(groupId),
        fetchGroupAssessmentBoards(groupId),
      ])
      setTypes(typeRows)
      setAssessmentBoards(boardRows)
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not load leaderboard.'))
    } finally {
      setLoading(false)
    }
  }, [groupId])

  useEffect(() => {
    refreshMeta()
  }, [refreshMeta])

  useEffect(() => {
    if (!categories.length) {
      setCategoryId('activities')
      setActiveBoardId(null)
      return
    }
    setCategoryId((current) => {
      if (categories.some((c) => c.id === current)) return current
      return categories[0].id
    })
  }, [categories])

  useEffect(() => {
    if (!boards.length) {
      setActiveBoardId(null)
      return
    }
    setActiveBoardId((current) => {
      if (current && boards.some((b) => b.id === current)) return current
      const pinned = getPinnedBoardId(groupId)
      if (pinned && boards.some((b) => b.id === pinned)) return pinned
      return boards[0].id
    })
  }, [boards, groupId])

  useEffect(() => {
    if (activeBoardId) setPinnedBoardId(groupId, activeBoardId)
  }, [activeBoardId, groupId])

  useEffect(() => {
    if (!groupId || !selected) return undefined
    let cancelled = false
    ;(async () => {
      setError('')
      try {
        if (selected.kind === 'activity') {
          const logRows = await fetchGroupActivityLogsForWeek(
            groupId,
            weekStart,
            weekEnd,
          )
          if (!cancelled) setLogs(logRows)
        } else {
          const rows = await fetchGroupAssessmentLeaderboard(
            groupId,
            selected.boardKey,
          )
          if (!cancelled) setAssessmentRows(rows)
        }
      } catch (err) {
        if (!cancelled) {
          setError(friendlyGroupError(err, 'Could not load leaderboard.'))
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [groupId, selected, weekStart, weekEnd])

  const selectCategory = (id) => {
    setCategoryId(id)
    const next = categories.find((c) => c.id === id)
    if (next?.boards?.[0]) setActiveBoardId(next.boards[0].id)
  }

  const reloadBoardData = useCallback(async () => {
    if (!groupId || !selected) return
    if (selected.kind === 'activity') {
      const logRows = await fetchGroupActivityLogsForWeek(
        groupId,
        weekStart,
        weekEnd,
      )
      setLogs(logRows)
    } else {
      const rows = await fetchGroupAssessmentLeaderboard(
        groupId,
        selected.boardKey,
      )
      setAssessmentRows(rows)
    }
  }, [groupId, selected, weekStart, weekEnd])

  const handleAdminRemove = async (row) => {
    if (!isAdmin || !selected || !row?.user_id || removingId) return
    const label = row.leaderboard_name || 'this member'
    const boardLabel = selected.label || 'this board'
    const confirmMsg =
      selected.kind === 'activity'
        ? `Remove ${label}'s ${boardLabel} total for this week? All of their logs for this activity in the week will be deleted.`
        : `Remove ${label}'s ${boardLabel} result from this group board?`
    if (!window.confirm(confirmMsg)) return

    setRemovingId(row.user_id)
    setError('')
    setNotice('')
    try {
      if (selected.kind === 'activity') {
        await deleteGroupMemberWeekActivity(
          groupId,
          row.user_id,
          selected.typeId,
          weekStart,
          weekEnd,
        )
      } else {
        await removeGroupAssessmentShare(
          groupId,
          row.user_id,
          selected.boardKey,
        )
      }
      await reloadBoardData()
      setNotice(`Removed ${label} from ${boardLabel}.`)
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not remove that result.'))
    } finally {
      setRemovingId(null)
    }
  }

  const memberCount = members?.length || 0

  return (
    <section className="groups-leaderboard" aria-label="Group leaderboard">
      {loading ? (
        <p className="calc-hint">Loading leaderboard…</p>
      ) : categories.length === 0 ? (
        <div className="groups-empty">
          <p className="calc-hint">
            The group admin hasn&apos;t enabled any leaderboards yet.
          </p>
          {isAdmin && onOpenTab ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => onOpenTab('settings')}
            >
              Open Settings
            </button>
          ) : null}
        </div>
      ) : (
        <>
          <div
            className="leaderboard-filters"
            role="navigation"
            aria-label="Group leaderboard filters"
          >
            {categories.length > 1 ? (
              <div
                className="leaderboard-filter-group leaderboard-categories"
                role="group"
                aria-label="Category"
              >
                {categories.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`sub-nav-tab${
                      category?.id === item.id ? ' is-active' : ''
                    }`}
                    onClick={() => selectCategory(item.id)}
                    aria-pressed={category?.id === item.id}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ) : null}

            {boards.length > 0 ? (
              <div
                className="leaderboard-filter-group leaderboard-subboards"
                role="group"
                aria-label="Board"
              >
                {boards.map((board) => (
                  <button
                    key={board.id}
                    type="button"
                    className={`leaderboard-chip${
                      selected?.id === board.id ? ' is-active' : ''
                    }`}
                    onClick={() => setActiveBoardId(board.id)}
                    aria-pressed={selected?.id === board.id}
                  >
                    {board.label}
                  </button>
                ))}
              </div>
            ) : null}

            {selected?.kind === 'activity' ? (
              <div className="leaderboard-period-block">
                <GroupWeekNav
                  weekStart={weekStart}
                  onWeekStartChange={setWeekStart}
                />
                <p className="calc-hint leaderboard-period-hint">
                  Local week (Monday–Sunday). Totals reset each Monday.
                </p>
              </div>
            ) : null}
          </div>

          {selected ? (
            <p className="calc-hint leaderboard-board-caption">{boardCaption}</p>
          ) : null}

          {error ? <p className="feedback feedback-error">{error}</p> : null}
          {notice ? (
            <p className="feedback feedback-success" role="status">
              {notice}
            </p>
          ) : null}

          {memberCount < 2 ? (
            <p className="calc-hint">
              Invite others to start building your group board.
            </p>
          ) : null}

          <section className="leaderboard-results" aria-live="polite">
            {tableRows.length > 0 ? (
              <div className="leaderboard-table-wrap">
                <table className="leaderboard-table">
                  <caption className="sr-only">
                    {selected?.label || 'Group'} leaderboard
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Rank</th>
                      <th scope="col">Leaderboard Name</th>
                      <th scope="col">
                        {selected?.kind === 'activity' ? 'Total' : 'Result'}
                      </th>
                      {isAdmin ? (
                        <th scope="col" className="leaderboard-admin-col">
                          <span className="sr-only">Admin</span>
                        </th>
                      ) : null}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row) => {
                      const isYou =
                        Boolean(viewerName) &&
                        String(row.leaderboard_name || '')
                          .trim()
                          .toLowerCase() ===
                          String(viewerName).trim().toLowerCase()
                      return (
                        <tr
                          key={`${row.rank}-${row.user_id}`}
                          className={isYou ? 'is-you' : undefined}
                        >
                          <td className="leaderboard-rank">{row.rank}</td>
                          <td className="leaderboard-name">
                            <span className="leaderboard-name-row">
                              <ProfileAvatar
                                avatarId={row.avatar_id}
                                size="sm"
                                className="leaderboard-row-avatar"
                              />
                              <span className="leaderboard-name-text">
                                {row.leaderboard_name}
                                {isYou ? (
                                  <span className="leaderboard-you-badge">
                                    You
                                  </span>
                                ) : null}
                              </span>
                            </span>
                          </td>
                          <td className="leaderboard-result">
                            {row.result_display}
                          </td>
                          {isAdmin ? (
                            <td className="leaderboard-admin-col">
                              <button
                                type="button"
                                className="btn btn-ghost groups-board-remove"
                                disabled={Boolean(removingId)}
                                onClick={() => handleAdminRemove(row)}
                              >
                                {removingId === row.user_id ? '…' : 'Remove'}
                              </button>
                            </td>
                          ) : null}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="groups-empty">
                {selected?.kind === 'activity' ? (
                  <>
                    <p className="calc-hint">No activity logged this week.</p>
                    {onRequestLog ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onRequestLog}
                      >
                        Log Activity
                      </button>
                    ) : null}
                  </>
                ) : (
                  <>
                    <p className="calc-hint">
                      No assessment results have been shared with this group
                      yet. Save a result on{' '}
                      {selected?.label || 'this assessment'}, then share it with
                      the group.
                    </p>
                    {onOpenAppTab && selected?.boardKey ? (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                          onOpenAppTab(
                            tabIdForGroupBoardKey(selected.boardKey),
                          )
                        }
                      >
                        Open {selected.label}
                      </button>
                    ) : null}
                  </>
                )}
              </div>
            )}
          </section>
        </>
      )}
    </section>
  )
}

export default GroupLeaderboardPanel
