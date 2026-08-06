import { useEffect, useRef, useState } from 'react'

/**
 * Fades/slides page content when `pageKey` changes.
 * Always renders current children — never keeps a stale page mounted.
 */
function PageTransition({ pageKey, children }) {
  const [phase, setPhase] = useState('enter')
  const prevKeyRef = useRef(pageKey)

  useEffect(() => {
    if (pageKey === prevKeyRef.current) return undefined
    prevKeyRef.current = pageKey

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setPhase('enter')
      return undefined
    }

    // Restart enter animation without lingering on opacity: 0.
    setPhase('exit')
    const timer = window.setTimeout(() => {
      setPhase('enter')
    }, 20)

    return () => window.clearTimeout(timer)
  }, [pageKey])

  return (
    <div className={`page-transition is-${phase}`} data-page={pageKey}>
      {children}
    </div>
  )
}

export default PageTransition
