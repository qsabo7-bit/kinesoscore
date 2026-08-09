import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'
import { useWindowScrollY } from '../lib/useWindowScrollY'
import { scrollWindowToTop } from '../lib/windowScroll'

const SHOW_AFTER_PX = 180

/**
 * Floating back-to-top control. Portaled to document.body so app overflow
 * cannot trap position:fixed.
 */
function ScrollToTopButton() {
  const scrollY = useWindowScrollY()
  const visible = scrollY > SHOW_AFTER_PX
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || typeof document === 'undefined') return null

  return createPortal(
    <button
      type="button"
      className={`scroll-top-btn${visible ? ' is-visible' : ''}`}
      onClick={() => scrollWindowToTop({ smooth: true })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <span aria-hidden="true" className="scroll-top-btn-icon">
        ↑
      </span>
      <span className="scroll-top-btn-label">Top</span>
    </button>,
    document.body,
  )
}

export default ScrollToTopButton
