/** Current window scroll Y across browsers. */
export function getWindowScrollY() {
  if (typeof window === 'undefined') return 0
  return (
    window.scrollY ||
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  )
}

/**
 * Scroll the window to top and notify listeners.
 * Programmatic scrollTo does not always emit a scroll event.
 */
export function scrollWindowToTop({ smooth = false } = {}) {
  if (typeof window === 'undefined') return
  const reduced =
    window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: smooth && !reduced ? 'smooth' : 'auto',
  })
  // Ensure sticky-header / back-to-top listeners re-sync.
  window.dispatchEvent(new Event('scroll'))
}
