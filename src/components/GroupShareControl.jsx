import { useEffect, useMemo, useState } from 'react'
import ProfileAvatar from './ProfileAvatar'
import { normalizeAvatarId } from '../data/avatarCatalog'
import {
  fetchAssessmentGroupShares,
  friendlyGroupError,
  listMyGroups,
  shareAssessmentWithGroup,
  unshareAssessmentFromGroup,
} from '../lib/groups'
import { isSupabaseConfigured } from '../supabaseClient'

/**
 * Explicit "Share with Groups" for an existing performance_records row.
 *
 * @param {{
 *   userId: string,
 *   sourceRecordId: string | null,
 *   boardKey: string | null,
 *   disabled?: boolean,
 * }} props
 */
function GroupShareControl({
  userId,
  sourceRecordId,
  boardKey,
  disabled = false,
}) {
  const [groups, setGroups] = useState([])
  const [selected, setSelected] = useState(() => new Set())
  const [baseline, setBaseline] = useState(() => new Set())
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!userId || !isSupabaseConfigured) {
      setGroups([])
      return undefined
    }
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const rows = await listMyGroups()
        if (!cancelled) setGroups(rows)
      } catch {
        if (!cancelled) setGroups([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [userId])

  useEffect(() => {
    if (!sourceRecordId || !groups.length) {
      setSelected(new Set())
      setBaseline(new Set())
      return undefined
    }
    let cancelled = false
    ;(async () => {
      try {
        const shares = await fetchAssessmentGroupShares(sourceRecordId)
        if (cancelled) return
        const ids = new Set(shares.map((s) => s.group_id))
        setSelected(ids)
        setBaseline(new Set(ids))
      } catch {
        if (!cancelled) {
          setSelected(new Set())
          setBaseline(new Set())
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [sourceRecordId, groups.length])

  const dirty = useMemo(() => {
    if (selected.size !== baseline.size) return true
    for (const id of selected) {
      if (!baseline.has(id)) return true
    }
    return false
  }, [selected, baseline])

  if (!userId || loading) return null
  if (!groups.length) return null
  if (!boardKey) return null

  const toggle = (groupId) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(groupId)) next.delete(groupId)
      else next.add(groupId)
      return next
    })
    setMessage('')
    setError('')
  }

  const handleSave = async () => {
    if (!sourceRecordId || !boardKey || saving || disabled || !dirty) return
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const current = await fetchAssessmentGroupShares(sourceRecordId)
      const currentIds = new Set(current.map((s) => s.group_id))
      const wanted = selected

      for (const groupId of wanted) {
        if (!currentIds.has(groupId)) {
          await shareAssessmentWithGroup(groupId, sourceRecordId, boardKey)
        }
      }
      for (const groupId of currentIds) {
        if (!wanted.has(groupId)) {
          await unshareAssessmentFromGroup(groupId, sourceRecordId)
        }
      }
      setBaseline(new Set(wanted))
      setMessage(
        wanted.size
          ? `Shared with ${wanted.size} group${wanted.size === 1 ? '' : 's'}.`
          : 'Removed from all group boards.',
      )
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not update group sharing.'))
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="groups-share-control">
      <div className="groups-share-control-head">
        <p className="groups-share-label">Group boards</p>
        <p className="calc-hint groups-share-hint">
          Optional. Share this result onto group assessment boards — private
          unless you pick a group.
        </p>
      </div>

      {!sourceRecordId ? (
        <p className="groups-share-need-save">
          Save this result first, then choose groups here.
        </p>
      ) : (
        <>
          <div
            className="groups-share-chips"
            role="group"
            aria-label="Share with groups"
          >
            {groups.map((g) => {
              const on = selected.has(g.id)
              return (
                <button
                  key={g.id}
                  type="button"
                  className={`groups-share-chip${on ? ' is-on' : ''}`}
                  disabled={disabled || saving}
                  aria-pressed={on}
                  onClick={() => toggle(g.id)}
                >
                  <ProfileAvatar
                    avatarId={normalizeAvatarId(g.avatar_id)}
                    size="sm"
                    className="groups-share-chip-avatar"
                  />
                  <span className="groups-share-chip-name">{g.name}</span>
                </button>
              )
            })}
          </div>

          <div className="groups-share-footer">
            <button
              type="button"
              className="btn btn-primary groups-share-save"
              disabled={disabled || saving || !dirty}
              onClick={handleSave}
            >
              {saving
                ? 'Updating…'
                : dirty
                  ? 'Update group sharing'
                  : selected.size
                    ? 'Sharing up to date'
                    : 'No groups selected'}
            </button>
            {message ? (
              <p className="feedback feedback-success" role="status">
                {message}
              </p>
            ) : null}
            {error ? (
              <p className="feedback feedback-error">{error}</p>
            ) : null}
          </div>
        </>
      )}
    </div>
  )
}

export default GroupShareControl
