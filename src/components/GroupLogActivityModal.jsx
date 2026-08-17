import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { localDateKey } from '../lib/habitDates'
import {
  fetchGroupActivityTypes,
  friendlyGroupError,
  logGroupActivity,
} from '../lib/groups'
import { getLastLogAmount, setLastLogAmount } from '../lib/groupPrefs'
import { evaluateAchievements } from '../lib/achievements'
import { useFocusTrap } from '../lib/useFocusTrap'

const QUICK_AMOUNTS = [10, 25, 50, 100]

function lastActivityStorageKey(groupId) {
  return `ks.groups.lastActivityType.${groupId}`
}

/**
 * @param {{
 *   open: boolean,
 *   groupId: string,
 *   userId: string,
 *   onClose: () => void,
 *   onLogged?: (log: object) => void,
 * }} props
 */
function GroupLogActivityModal({
  open,
  groupId,
  userId,
  onClose,
  onLogged,
}) {
  const [types, setTypes] = useState([])
  const [loading, setLoading] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [activityTypeId, setActivityTypeId] = useState('')
  const [amount, setAmount] = useState('')
  const [activityDate, setActivityDate] = useState(() => localDateKey())
  const amountRef = useRef(null)
  const dialogRef = useFocusTrap(open, () => {
    if (!busy) onClose?.()
  })

  const enabledTypes = useMemo(
    () => types.filter((t) => t.is_enabled),
    [types],
  )
  const selectedType = enabledTypes.find((t) => t.id === activityTypeId)
  const lastAmount = activityTypeId
    ? getLastLogAmount(groupId, activityTypeId)
    : ''
  const canQuick =
    selectedType &&
    /^(reps?|seconds?|secs?|minutes?|mins?)$/i.test(
      String(selectedType.unit || ''),
    )

  useEffect(() => {
    if (!open || !groupId) return undefined
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError('')
      setActivityDate(localDateKey())
      try {
        const typeRows = await fetchGroupActivityTypes(groupId)
        if (cancelled) return
        setTypes(typeRows)
        const enabled = typeRows.filter((t) => t.is_enabled)
        let next = enabled[0]?.id || ''
        try {
          const remembered = localStorage.getItem(lastActivityStorageKey(groupId))
          if (remembered && enabled.some((t) => t.id === remembered)) {
            next = remembered
          }
        } catch {
          // ignore
        }
        setActivityTypeId(next)
        const rememberedAmt = next ? getLastLogAmount(groupId, next) : ''
        setAmount(rememberedAmt || '')
        requestAnimationFrame(() => amountRef.current?.focus())
      } catch (err) {
        if (!cancelled) {
          setError(friendlyGroupError(err, 'Could not load activities.'))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [open, groupId])

  useEffect(() => {
    if (!open || typeof document === 'undefined') return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  if (!open || typeof document === 'undefined') return null

  const rememberType = (typeId) => {
    try {
      localStorage.setItem(lastActivityStorageKey(groupId), typeId)
    } catch {
      // ignore
    }
  }

  const submitAmount = async (valueRaw) => {
    if (busy || !activityTypeId) return
    const value = Number(valueRaw)
    if (!Number.isFinite(value) || value <= 0) {
      setError('Enter an amount greater than zero.')
      return
    }
    setBusy(true)
    setError('')
    try {
      const saved = await logGroupActivity({
        groupId,
        userId,
        activityTypeId,
        amount: value,
        activityDate,
      })
      rememberType(activityTypeId)
      setLastLogAmount(groupId, activityTypeId, value)
      if (userId) evaluateAchievements(userId, { hasGroupLog: true })
      onLogged?.(saved)
      onClose?.()
    } catch (err) {
      setError(friendlyGroupError(err, 'Could not log activity.'))
    } finally {
      setBusy(false)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await submitAmount(amount)
  }

  return createPortal(
    <div ref={dialogRef} className="confirm-modal-layer groups-log-modal-layer">
      <div
        className="confirm-modal-backdrop"
        aria-hidden="true"
        onClick={() => {
          if (!busy) onClose?.()
        }}
      />
      <div
        className="confirm-modal groups-log-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="groups-log-modal-title"
      >
        <p className="confirm-modal-eyebrow">Groups</p>
        <p id="groups-log-modal-title" className="confirm-modal-title">
          Log Activity
        </p>
        {loading ? (
          <p className="calc-hint">Loading…</p>
        ) : (
          <form className="calc-form groups-log-form-modal" onSubmit={handleSubmit}>
            <label className="field">
              <span>Activity</span>
              <select
                value={activityTypeId}
                onChange={(e) => {
                  const id = e.target.value
                  setActivityTypeId(id)
                  rememberType(id)
                  setAmount(getLastLogAmount(groupId, id) || '')
                  requestAnimationFrame(() => amountRef.current?.focus())
                }}
                required
                disabled={!enabledTypes.length}
              >
                {enabledTypes.length === 0 ? (
                  <option value="">No activities enabled</option>
                ) : (
                  enabledTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))
                )}
              </select>
            </label>
            <label className="field">
              <span>
                Amount
                {selectedType?.unit ? ` (${selectedType.unit})` : ''}
              </span>
              <input
                ref={amountRef}
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                placeholder="50"
              />
            </label>
            {lastAmount ? (
              <button
                type="button"
                className="btn btn-ghost"
                disabled={busy}
                onClick={() => submitAmount(lastAmount)}
              >
                Log again: {lastAmount}
                {selectedType?.unit ? ` ${selectedType.unit}` : ''}
              </button>
            ) : null}
            {canQuick ? (
              <div
                className="groups-quick-amounts"
                role="group"
                aria-label="Quick amounts"
              >
                {QUICK_AMOUNTS.map((n) => (
                  <button
                    key={n}
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setAmount(String(n))}
                  >
                    {n}
                  </button>
                ))}
              </div>
            ) : null}
            <label className="field">
              <span>Date</span>
              <input
                type="date"
                value={activityDate}
                max={localDateKey()}
                onChange={(e) => setActivityDate(e.target.value)}
                required
              />
            </label>
            {error ? <p className="feedback feedback-error">{error}</p> : null}
            <div className="confirm-actions">
              <button
                type="button"
                className="btn btn-ghost"
                disabled={busy}
                onClick={() => onClose?.()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={busy || !enabledTypes.length || !amount}
              >
                {busy ? 'Logging…' : 'Log Activity'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  )
}

export default GroupLogActivityModal
