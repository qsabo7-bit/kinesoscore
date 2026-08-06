import { useEffect, useRef, useState } from 'react'

/**
 * Single subtle banner for a calculator when shared values were auto-loaded.
 * Pass every shared meta object from useSyncedDefault for fields on this page.
 * Hides after the user manually edits any previously auto-filled field.
 */
function SharedDataNotification({
  sources = [],
  message = 'Previous data loaded',
}) {
  const [dismissed, setDismissed] = useState(false)
  const baselineRef = useRef(null)

  const signature = sources
    .map((source) => (source?.isAutoFilled ? '1' : '0'))
    .join('')

  useEffect(() => {
    const flags = signature.split('').map((flag) => flag === '1')

    if (baselineRef.current == null) {
      baselineRef.current = flags
      return
    }

    const lostAutoFill = baselineRef.current.some(
      (wasAuto, index) => wasAuto && !flags[index],
    )

    if (lostAutoFill) {
      setDismissed(true)
      return
    }

    if (!dismissed) {
      baselineRef.current = flags
    }
  }, [signature, dismissed])

  const hasAutoFill = signature.includes('1')

  if (dismissed || !hasAutoFill) return null

  return (
    <p className="shared-data-notification" role="status">
      <span className="shared-data-notification-icon" aria-hidden="true">
        ↻
      </span>
      <span>{message}</span>
    </p>
  )
}

/**
 * Optional in-field cue for an auto-filled input.
 */
export function SharedInputAffordance({
  visible = false,
  title = 'Loaded from your previous result',
}) {
  if (!visible) return null

  return (
    <span className="shared-input-affordance" title={title} aria-label={title}>
      ↻
    </span>
  )
}

/** Wraps an input/select with the optional prefilled affordance icon. */
export function SharedInputShell({ shared, children }) {
  const visible = Boolean(shared?.isAutoFilled)

  return (
    <span className={`shared-input-shell${visible ? ' has-affordance' : ''}`}>
      {children}
      <SharedInputAffordance visible={visible} />
    </span>
  )
}

export default SharedDataNotification
