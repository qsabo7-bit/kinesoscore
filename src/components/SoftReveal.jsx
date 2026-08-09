import { useEffect, useState } from 'react'

/** Keep content mounted through the close animation (matches --motion-enter). */
const CLOSE_MS = 360

/**
 * Height + fade reveal for expand/collapse without layout jolts.
 * Opens on the next frame so CSS can animate 0fr → 1fr after mount.
 *
 * @param {object} props
 * @param {boolean} props.open
 * @param {import('react').ReactNode} props.children
 * @param {string} [props.className]
 * @param {string} [props.id]
 */
function SoftReveal({ open, children, className = '', id }) {
  const [renderChildren, setRenderChildren] = useState(open)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let outerFrame = 0
    let innerFrame = 0
    let closeTimer = 0
    let cancelled = false

    if (open) {
      setRenderChildren(true)
      const reduced =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduced) {
        setVisible(true)
        return undefined
      }
      outerFrame = window.requestAnimationFrame(() => {
        innerFrame = window.requestAnimationFrame(() => {
          if (!cancelled) setVisible(true)
        })
      })
      return () => {
        cancelled = true
        window.cancelAnimationFrame(outerFrame)
        window.cancelAnimationFrame(innerFrame)
      }
    }

    setVisible(false)
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setRenderChildren(false)
      return undefined
    }

    closeTimer = window.setTimeout(() => {
      if (!cancelled) setRenderChildren(false)
    }, CLOSE_MS)
    return () => {
      cancelled = true
      window.clearTimeout(closeTimer)
    }
  }, [open])

  if (!open && !renderChildren) return null

  return (
    <div
      id={id}
      className={`soft-reveal${visible ? ' is-open' : ''}${className ? ` ${className}` : ''}`}
      aria-hidden={!open}
      inert={open ? undefined : true}
    >
      <div className="soft-reveal-clip">{renderChildren ? children : null}</div>
    </div>
  )
}

export default SoftReveal
