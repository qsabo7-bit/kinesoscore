import { useEffect, useRef, useState } from 'react'

/** Match `--motion-base` so content doesn’t swap mid-fade. */
const EXIT_MS = 280

/**
 * Soft crossfade when `swapKey` changes (graph tracks, summary panels).
 */
function FadeSwap({ swapKey, children, className = '' }) {
  const [renderedKey, setRenderedKey] = useState(swapKey)
  const [rendered, setRendered] = useState(children)
  const [phase, setPhase] = useState('enter')
  const childrenRef = useRef(children)
  childrenRef.current = children

  useEffect(() => {
    if (swapKey === renderedKey) {
      setRendered(children)
    }
  }, [children, swapKey, renderedKey])

  useEffect(() => {
    if (swapKey === renderedKey) return undefined

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      setRenderedKey(swapKey)
      setRendered(childrenRef.current)
      setPhase('enter')
      return undefined
    }

    setPhase('exit')
    const timer = setTimeout(() => {
      setRenderedKey(swapKey)
      setRendered(childrenRef.current)
      setPhase('enter')
    }, EXIT_MS)

    return () => clearTimeout(timer)
  }, [swapKey, renderedKey])

  return (
    <div className={`fade-swap is-${phase}${className ? ` ${className}` : ''}`}>
      {rendered}
    </div>
  )
}

export default FadeSwap
