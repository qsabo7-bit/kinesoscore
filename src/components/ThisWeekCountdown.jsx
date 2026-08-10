import { useEffect, useState } from 'react'
import {
  formatUtcWeekCountdown,
  isUtcWeekEndingSoon,
  utcWeekEnd,
} from '../lib/utcLeaderboardWeek'

/**
 * Live countdown to the next UTC Monday week reset.
 * @param {{ className?: string, prefix?: string, showMeta?: boolean }} props
 */
function ThisWeekCountdown({ className = '', prefix, showMeta = true }) {
  const [label, setLabel] = useState(() => formatUtcWeekCountdown())
  const [urgent, setUrgent] = useState(() => isUtcWeekEndingSoon())

  useEffect(() => {
    const tick = () => {
      setLabel(formatUtcWeekCountdown())
      setUrgent(isUtcWeekEndingSoon())
    }
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [])

  const end = utcWeekEnd()
  const endLabel = end.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
    timeZoneName: 'short',
  })

  const resolvedPrefix =
    prefix || (urgent ? 'Last day — resets in' : 'Resets in')

  return (
    <p
      className={`this-week-countdown${urgent ? ' is-urgent' : ''}${
        className ? ` ${className}` : ''
      }`}
      title={`Leaderboard This Week ends ${endLabel}`}
    >
      {resolvedPrefix} <strong>{label}</strong>
      {showMeta ? (
        <span className="this-week-countdown-meta">
          {urgent ? ' · last day of the UTC week' : ' · UTC week'}
        </span>
      ) : null}
    </p>
  )
}

export default ThisWeekCountdown
