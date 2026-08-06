import { useEffect, useRef, useState } from 'react'

const EXIT_MS = 180

/**
 * Fades/slides page content when `pageKey` changes.
 * Keeps in-page updates immediate when the key is unchanged.
 */
function PageTransition({ pageKey, children }) {
  const [renderedKey, setRenderedKey] = useState(pageKey)
  const [rendered, setRendered] = useState(children)
  const [phase, setPhase] = useState('enter')
  const childrenRef = useRef(children)
  childrenRef.current = children

  // Keep live updates for the current page without restarting transitions.
  useEffect(() => {
    if (pageKey === renderedKey) {
      setRendered(children)
    }
  }, [children, pageKey, renderedKey])

  useEffect(() => {
    if (pageKey === renderedKey) return undefined

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setRenderedKey(pageKey)
      setRendered(childrenRef.current)
      setPhase('enter')
      return undefined
    }

    setPhase('exit')
    const timer = setTimeout(() => {
      setRenderedKey(pageKey)
      setRendered(childrenRef.current)
      setPhase('enter')
    }, EXIT_MS)

    return () => clearTimeout(timer)
  }, [pageKey, renderedKey])

  return (
    <div className={`page-transition is-${phase}`} data-page={renderedKey}>
      {rendered}
    </div>
  )
}

export default PageTransition
