import { useEffect, useRef } from 'react'

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Mark sibling branches inert so pointer/AT cannot reach behind an open dialog.
 * @param {HTMLElement} node
 * @returns {HTMLElement[]}
 */
function inertOutside(node) {
  const touched = []
  let current = node
  while (current && current.parentElement && current !== document.body) {
    const parent = current.parentElement
    for (const sibling of parent.children) {
      if (
        sibling !== current &&
        sibling instanceof HTMLElement &&
        !sibling.inert
      ) {
        sibling.inert = true
        touched.push(sibling)
      }
    }
    current = parent
  }
  return touched
}

/**
 * Trap keyboard focus inside an open dialog; Escape calls onCancel.
 * By default marks sibling branches inert while open.
 *
 * @param {boolean} active
 * @param {() => void} [onCancel]
 * @param {{ inertSiblings?: boolean }} [options]
 *   Set `inertSiblings: false` when the open control (e.g. Menu/Close) must
 *   stay outside the trap container but remain clickable.
 */
export function useFocusTrap(active, onCancel, options = {}) {
  const containerRef = useRef(null)
  const previousFocusRef = useRef(null)
  const onCancelRef = useRef(onCancel)
  onCancelRef.current = onCancel
  const inertSiblings = options.inertSiblings !== false

  useEffect(() => {
    if (!active) return undefined

    const node = containerRef.current
    if (!node) return undefined

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    const inerted = inertSiblings ? inertOutside(node) : []

    const focusables = () =>
      [...node.querySelectorAll(FOCUSABLE)].filter(
        (el) => el instanceof HTMLElement && el.offsetParent !== null,
      )

    const first = focusables()[0]
    first?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCancelRef.current?.()
        return
      }

      if (event.key !== 'Tab') return

      const items = focusables()
      if (!items.length) {
        event.preventDefault()
        return
      }

      const firstItem = items[0]
      const lastItem = items[items.length - 1]
      const current = document.activeElement
      const outside = !(current instanceof Node) || !node.contains(current)

      if (event.shiftKey) {
        if (outside || current === firstItem) {
          event.preventDefault()
          lastItem.focus()
        }
      } else if (outside || current === lastItem) {
        event.preventDefault()
        firstItem.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown, true)
    return () => {
      document.removeEventListener('keydown', onKeyDown, true)
      for (const el of inerted) {
        el.inert = false
      }
      const prev = previousFocusRef.current
      // Prefer restoring prior focus only if that node is still connected
      // (e.g. delete confirm removes the triggering Delete button).
      if (
        prev &&
        typeof prev.focus === 'function' &&
        document.contains(prev)
      ) {
        prev.focus()
      } else {
        document
          .getElementById('main-content')
          ?.focus?.({ preventScroll: true })
      }
    }
  }, [active, inertSiblings])

  return containerRef
}
