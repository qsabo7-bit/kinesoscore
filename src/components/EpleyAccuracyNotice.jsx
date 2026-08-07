import { useEffect, useState } from 'react'
import { BRAND } from '../data/brand'

const EXIT_MS = 160

/**
 * Inline accuracy notice for Epley 1RM estimates from high-rep sets (>10).
 */
function EpleyAccuracyNotice({ show = false }) {
  const [mounted, setMounted] = useState(show)
  const [phase, setPhase] = useState(show ? 'enter' : 'hidden')

  useEffect(() => {
    if (show) {
      setMounted(true)
      const frame = requestAnimationFrame(() => setPhase('enter'))
      return () => cancelAnimationFrame(frame)
    }

    if (!mounted) return undefined

    setPhase('exit')
    const timer = setTimeout(() => {
      setMounted(false)
      setPhase('hidden')
    }, EXIT_MS)
    return () => clearTimeout(timer)
  }, [show, mounted])

  if (!mounted) return null

  return (
    <aside
      className={`epley-accuracy-notice is-${phase}`}
      role="status"
      aria-live="polite"
    >
      <p className="epley-accuracy-notice-title">
        <span aria-hidden="true">⚠️ </span>
        Higher Rep Estimate
      </p>
      <p>
        For the most accurate {BRAND.scoreName} results, enter a set performed
        between 1 and 10 repetitions.
      </p>
      <p>
        The Epley equation is widely accepted for estimating one-repetition
        maximum (1RM), but estimates become progressively less accurate when
        calculated from sets above 10 repetitions due to increasing endurance
        demands and individual fatigue differences.
      </p>
      <p>
        Your result has still been calculated, but its estimated accuracy may be
        reduced.
      </p>
    </aside>
  )
}

export default EpleyAccuracyNotice
