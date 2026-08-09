import { useEffect, useState } from 'react'
import { getWindowScrollY } from './windowScroll'

/**
 * Tracks window scroll Y with rAF throttling and post-paint sync
 * (covers programmatic scrollTo that may not fire scroll events).
 *
 * @param {unknown} [resyncKey] Re-run sync when this changes (e.g. active tab).
 */
export function useWindowScrollY(resyncKey) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let frame = 0
    let outerPaint = 0
    let innerPaint = 0
    let delayed = 0
    let cancelled = false

    const sync = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (!cancelled) setScrollY(getWindowScrollY())
      })
    }

    sync()
    // Second paint: catches layout/scroll restoration after route changes.
    outerPaint = requestAnimationFrame(() => {
      innerPaint = requestAnimationFrame(sync)
    })
    delayed = window.setTimeout(sync, 50)
    window.addEventListener('scroll', sync, { passive: true })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      cancelAnimationFrame(outerPaint)
      cancelAnimationFrame(innerPaint)
      window.clearTimeout(delayed)
      window.removeEventListener('scroll', sync)
    }
  }, [resyncKey])

  return scrollY
}
