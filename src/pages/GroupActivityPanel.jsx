import { useCallback, useEffect, useMemo, useState } from 'react'
import { localDateKey } from '../lib/habitDates'
import {
  deleteGroupActivityLog,
  fetchGroupActivityLogsRecent,
  fetchGroupActivityReactions,
  fetchGroupActivityTypes,
  formatActivityFeedLine,
  formatRelativeActivityTime,
  friendlyGroupError,
  toggleGroupActivityReaction,
  updateGroupActivityLog,
} from '../lib/groups'

const FEED_REACTIONS = [
  { id: 'thumbsup', emoji: '👍', label: 'Thumbs up' },
  { id: 'heart', emoji: '❤️', label: 'Heart' },
  { id: 'skull', emoji: '💀', label: 'Skull' },
]

/**
 * Chronological feed with filters, edit, delete, reactions, soft poll.
 *
 * @param {{
 *   groupId: string,
 *   userId: string,
 *   members?: Array<object>,
 *   refreshToken?: number,
 *   isAdmin?: boolean,
 * }} props
 */
function GroupActivityPanel({
  groupId,
  userId,
  members = [],
  refreshToken = 0,
  isAdmin = false,
}) {
  const [types, setTypes] = useState([])
  const [logs, setLogs] = useState([])
  const [reactions, setReactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busyId, setBusyId] = useState(null)
  const [filterTypeId, setFilterTypeId] = useState('all')
  const [editing, setEditing] = useState(null) // { id, amount, activityDate }

  const enabledTypes = useMemo(
    () => types.filter((t) => t.is_enabled),
    [types],
  )

  const typesById = useMemo(() => {
    const map = new Map()
    for (const t of types) map.set(t.id, t)
    return map
  }, [types])

  const membersById = useMemo(() => {
    const map = new Map()
    for (const m of members || []) map.set(m.user_id, m)
    return map
  }, [members])

  const reactionStats = useMemo(() => {
    /** @type {Map<string, Record<string, { count: number, mine: boolean }>>} */
    const map = new Map()
    for (const r of reactions || []) {
      const kind = r.reaction || 'thumbsup'
      const byKind = map.get(r.log_id) || {}
      const cur = byKind[kind] || { count: 0, mine: false }
      cur.count += 1
      if (r.user_id === userId) cur.mine = true
      byKind[kind] = cur
      map.set(r.log_id, byKind)
    }
    return map
  }, [reactions, userId])

  const feed = useMemo(() => {
    return (logs || [])
      .filter((log) => {
        const type = typesById.get(log.activity_type_id)
        if (!type?.is_enabled) return false
        if (filterTypeId !== 'all' && log.activity_type_id !== filterTypeId) {
          return false
        }
        return true
      })
      .map((log) => {
        const type = typesById.get(log.activity_type_id)
        const member = membersById.get(log.user_id) || {
          user_id: log.user_id,
          leaderboard_name: null,
          display_name: null,
        }
        const byKind = reactionStats.get(log.id) || {}
        return {
          id: log.id,
          log,
          line: formatActivityFeedLine(log, type, member),
          relative: formatRelativeActivityTime(log.created_at),
          isMine: log.user_id === userId,
          reactions: byKind,
        }
      })
  }, [logs, typesById, membersById, userId, filterTypeId, reactionStats])

  const refresh = useCallback(async () => {
    if (!groupId) return
    setLoading(true)
    setError('')
    try {
      const [typeRows, logRows] = await Promise.all([
        fetchGroupActivityTypes(groupId),
        fetchGroupActivityLogsRecent(groupId, 100),
      ])
      setTypes(typeRows)
      setLogs(logRows)
      const reactRows = await fetchGroupActivityReactions(
        logRows.map((l) => l.id),
      )
      setReactions(reactRows)
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not load group activity.'))
    } finally {
      setLoading(false)
    }
  }, [groupId])

  useEffect(() => {
    refresh()
  }, [refresh, refreshToken])

  useEffect(() => {
    if (!groupId) return undefined
    const tick = () => {
      if (document.visibilityState === 'visible') void refresh()
    }
    const id = window.setInterval(tick, 25000)
    return () => window.clearInterval(id)
  }, [groupId, refresh])

  const handleDelete = async (logId) => {
    if (!logId || busyId) return
    if (!window.confirm('Delete this activity log?')) return
    setBusyId(logId)
    setError('')
    setNotice('')
    try {
      await deleteGroupActivityLog(logId)
      setNotice('Log deleted.')
      setLogs((list) => list.filter((row) => row.id !== logId))
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not delete that log.'))
    } finally {
      setBusyId(null)
    }
  }

  const handleReact = async (logId, reaction) => {
    if (!logId || busyId) return
    setBusyId(`${logId}:${reaction}`)
    try {
      await toggleGroupActivityReaction(logId, userId, reaction)
      const reactRows = await fetchGroupActivityReactions(logs.map((l) => l.id))
      setReactions(reactRows)
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not update reaction.'))
    } finally {
      setBusyId(null)
    }
  }

  const handleSaveEdit = async (event) => {
    event.preventDefault()
    if (!editing || busyId) return
    setBusyId(editing.id)
    setError('')
    try {
      const updated = await updateGroupActivityLog(editing.id, userId, {
        amount: Number(editing.amount),
        activityDate: editing.activityDate,
      })
      setLogs((list) =>
        list.map((row) => (row.id === updated.id ? { ...row, ...updated } : row)),
      )
      setEditing(null)
      setNotice('Log updated.')
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not update that log.'))
    } finally {
      setBusyId(null)
    }
  }

  return (
    <section className="groups-activity" aria-label="Group activity">
      {error ? <p className="feedback feedback-error">{error}</p> : null}
      {notice ? <p className="feedback feedback-success">{notice}</p> : null}

      {loading ? (
        <p className="calc-hint">Loading activity…</p>
      ) : (
        <>
          <div className="groups-activity-filters">
            <label className="field groups-activity-filter">
              <span className="sr-only">Filter activity</span>
              <select
                value={filterTypeId}
                onChange={(e) => setFilterTypeId(e.target.value)}
              >
                <option value="all">All activities</option>
                {enabledTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <section aria-label="Activity feed">
            {feed.length === 0 ? (
              <div className="groups-empty">
                <p className="calc-hint">No activity logged yet.</p>
              </div>
            ) : (
              <ul className="groups-feed-list">
                {feed.map((item) => (
                  <li key={item.id} className="groups-feed-row">
                    <div className="groups-feed-copy">
                      <p className="groups-feed-line">{item.line}</p>
                      <p className="groups-feed-date">{item.relative}</p>
                      {editing?.id === item.id ? (
                        <form
                          className="groups-edit-log-form"
                          onSubmit={handleSaveEdit}
                        >
                          <input
                            type="number"
                            inputMode="decimal"
                            min="0"
                            step="any"
                            required
                            value={editing.amount}
                            onChange={(e) =>
                              setEditing((prev) =>
                                prev
                                  ? { ...prev, amount: e.target.value }
                                  : prev,
                              )
                            }
                            aria-label="Amount"
                          />
                          <input
                            type="date"
                            required
                            value={editing.activityDate}
                            max={localDateKey()}
                            onChange={(e) =>
                              setEditing((prev) =>
                                prev
                                  ? {
                                      ...prev,
                                      activityDate: e.target.value,
                                    }
                                  : prev,
                              )
                            }
                            aria-label="Date"
                          />
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={busyId === item.id}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-ghost"
                            onClick={() => setEditing(null)}
                          >
                            Cancel
                          </button>
                        </form>
                      ) : null}
                    </div>
                    <div className="groups-feed-actions">
                      <div
                        className="groups-react-row"
                        role="group"
                        aria-label="Reactions"
                      >
                        {FEED_REACTIONS.map((react) => {
                          const stats = item.reactions[react.id] || {
                            count: 0,
                            mine: false,
                          }
                          const busyKey = `${item.id}:${react.id}`
                          return (
                            <button
                              key={react.id}
                              type="button"
                              className={`groups-react-btn${
                                stats.mine ? ' is-active' : ''
                              }`}
                              disabled={Boolean(busyId)}
                              onClick={() => handleReact(item.id, react.id)}
                              aria-label={
                                stats.mine
                                  ? `Remove ${react.label.toLowerCase()}${
                                      stats.count
                                        ? `, ${stats.count} total`
                                        : ''
                                    }`
                                  : `${react.label}${
                                      stats.count
                                        ? `, ${stats.count} so far`
                                        : ''
                                    }`
                              }
                              aria-pressed={stats.mine}
                              title={react.label}
                            >
                              <span
                                className="groups-react-emoji"
                                aria-hidden="true"
                              >
                                {react.emoji}
                              </span>
                              {stats.count > 0 ? (
                                <span className="groups-react-count">
                                  {stats.count}
                                </span>
                              ) : null}
                              {busyId === busyKey ? (
                                <span className="sr-only">Updating</span>
                              ) : null}
                            </button>
                          )
                        })}
                      </div>
                      {item.isMine || isAdmin ? (
                        <>
                          {item.isMine ? (
                            <button
                              type="button"
                              className="btn btn-ghost groups-feed-delete"
                              disabled={Boolean(busyId)}
                              onClick={() =>
                                setEditing({
                                  id: item.id,
                                  amount: String(item.log.amount),
                                  activityDate: item.log.activity_date,
                                })
                              }
                            >
                              Edit
                            </button>
                          ) : null}
                          <button
                            type="button"
                            className="btn btn-ghost groups-feed-delete"
                            disabled={Boolean(busyId)}
                            onClick={() => handleDelete(item.id)}
                          >
                            {busyId === item.id ? '…' : 'Delete'}
                          </button>
                        </>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </section>
  )
}

export default GroupActivityPanel
