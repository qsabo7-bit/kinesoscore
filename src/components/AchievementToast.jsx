import { useEffect, useState } from 'react'

/**
 * Global toast host for newly unlocked achievements.
 * Touch-first: dismiss via button; no hover required.
 */
function AchievementToast() {
  const [queue, setQueue] = useState([])
  const current = queue[0] || null

  useEffect(() => {
    const onUnlock = (event) => {
      const items = Array.isArray(event?.detail) ? event.detail : []
      if (!items.length) return
      setQueue((prev) => [...prev, ...items])
    }
    window.addEventListener('kineso:achievements', onUnlock)
    return () => window.removeEventListener('kineso:achievements', onUnlock)
  }, [])

  useEffect(() => {
    if (!current) return undefined
    const timer = window.setTimeout(() => {
      setQueue((prev) => prev.slice(1))
    }, 3400)
    return () => window.clearTimeout(timer)
  }, [current])

  if (!current) return null

  return (
    <div className="achievement-toast" role="status" aria-live="polite">
      <p className="achievement-toast-kicker">Unlocked</p>
      <p className="achievement-toast-title">{current.title}</p>
      <p className="achievement-toast-blurb">{current.blurb}</p>
      <button
        type="button"
        className="achievement-toast-dismiss"
        onClick={() => setQueue((prev) => prev.slice(1))}
      >
        Got it
      </button>
    </div>
  )
}

export default AchievementToast
