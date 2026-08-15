import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ProfileAvatar from './ProfileAvatar'
import { normalizeAvatarId } from '../data/avatarCatalog'
import {
  friendlyGroupError,
  listMyGroupsForAssessmentBoard,
  shareAssessmentWithGroup,
} from '../lib/groups'
import { useFocusTrap } from '../lib/useFocusTrap'
import { isSupabaseConfigured } from '../supabaseClient'

function muteStorageKey(boardKey) {
  return `ks.groups.sharePrompt.mute.${boardKey}`
}

export function isGroupSharePromptMuted(boardKey) {
  if (!boardKey) return false
  try {
    return localStorage.getItem(muteStorageKey(boardKey)) === '1'
  } catch {
    return false
  }
}

function muteGroupSharePrompt(boardKey) {
  if (!boardKey) return
  try {
    localStorage.setItem(muteStorageKey(boardKey), '1')
  } catch {
    // ignore
  }
}

/**
 * Post-save prompt: share this assessment with one or more groups.
 *
 * @param {{
 *   open: boolean,
 *   boardKey: string | null,
 *   sourceRecordId: string | null,
 *   assessmentLabel?: string,
 *   onClose: () => void,
 * }} props
 */
function GroupSharePrompt({
  open,
  boardKey,
  sourceRecordId,
  assessmentLabel = 'this result',
  onClose,
}) {
  const [groups, setGroups] = useState([])
  const [selected, setSelected] = useState(() => new Set())
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [dontAskAgain, setDontAskAgain] = useState(false)
  const dialogRef = useFocusTrap(open, () => {
    if (!saving) onClose?.()
  })

  useEffect(() => {
    if (!open || !boardKey || !isSupabaseConfigured) {
      setGroups([])
      setSelected(new Set())
      setDontAskAgain(false)
      return undefined
    }
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const rows = await listMyGroupsForAssessmentBoard(boardKey)
        if (cancelled) return
        setGroups(rows)
        setSelected(new Set())
      } catch (err) {
        if (!cancelled) {
          setError(friendlyGroupError(err, 'Could not load your groups.'))
          setGroups([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [open, boardKey])

  if (!open || typeof document === 'undefined') return null
  if (!loading && !error && groups.length === 0) return null

  const finish = () => {
    if (dontAskAgain && boardKey) muteGroupSharePrompt(boardKey)
    onClose?.()
  }

  const toggle = (groupId) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(groupId)) next.delete(groupId)
      else next.add(groupId)
      return next
    })
    setError('')
  }

  const handleShare = async () => {
    if (!sourceRecordId || !boardKey || saving) return
    if (!selected.size) {
      finish()
      return
    }
    setSaving(true)
    setError('')
    try {
      for (const groupId of selected) {
        await shareAssessmentWithGroup(groupId, sourceRecordId, boardKey)
      }
      finish()
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not share with groups.'))
    } finally {
      setSaving(false)
    }
  }

  return createPortal(
    <div ref={dialogRef} className="confirm-modal-layer">
      <div
        className="confirm-modal-backdrop"
        aria-hidden="true"
        onClick={() => {
          if (!saving) finish()
        }}
      />
      <div
        className="confirm-modal groups-share-prompt-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="group-share-prompt-title"
        aria-describedby="group-share-prompt-copy"
      >
        <p className="confirm-modal-eyebrow">Groups</p>
        <p id="group-share-prompt-title" className="confirm-modal-title">
          Share to a group board?
        </p>
        <p className="groups-share-prompt-result" aria-live="polite">
          {assessmentLabel}
        </p>
        <p id="group-share-prompt-copy" className="groups-share-prompt-copy">
          Add this saved result to one or more group assessment boards. It stays
          private unless you pick a group.
        </p>

        {loading ? (
          <p className="calc-hint">Loading your groups…</p>
        ) : (
          <div
            className="groups-share-chips groups-share-chips-modal"
            role="group"
            aria-label="Choose groups"
          >
            {groups.map((g) => {
              const on = selected.has(g.id)
              return (
                <button
                  key={g.id}
                  type="button"
                  className={`groups-share-chip${on ? ' is-on' : ''}`}
                  disabled={saving}
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
        )}

        <label className="groups-share-mute">
          <input
            type="checkbox"
            checked={dontAskAgain}
            disabled={saving}
            onChange={(e) => setDontAskAgain(e.target.checked)}
          />
          <span>Don&apos;t ask again for this assessment</span>
        </label>

        {error ? <p className="feedback feedback-error">{error}</p> : null}

        <div className="confirm-actions groups-share-prompt-actions">
          <button
            type="button"
            className="btn btn-ghost"
            disabled={saving}
            onClick={finish}
          >
            Not now
          </button>
          <button
            type="button"
            className="btn btn-primary"
            disabled={saving || loading || !groups.length}
            onClick={handleShare}
          >
            {saving
              ? 'Sharing…'
              : selected.size
                ? `Share with ${selected.size} group${
                    selected.size === 1 ? '' : 's'
                  }`
                : 'Skip'}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default GroupSharePrompt
