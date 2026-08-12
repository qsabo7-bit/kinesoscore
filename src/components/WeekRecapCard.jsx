import { useEffect, useState } from 'react'
import ShareMomentButton from './ShareMomentButton'
import { consumeWeekRecap } from '../lib/weekRecap'

/**
 * Monday UTC week-reset ceremony (once per week when prior rank exists).
 */
function WeekRecapCard({ userId, onOpenTab }) {
  const [recap, setRecap] = useState(null)

  useEffect(() => {
    if (!userId) {
      setRecap(null)
      return
    }
    setRecap(consumeWeekRecap(userId))
  }, [userId])

  if (!recap) return null

  return (
    <section
      className="dashboard-section account-card week-recap-card"
      aria-labelledby="week-recap-heading"
    >
      <h2 id="week-recap-heading" className="result-section-title">
        New UTC week
      </h2>
      <p className="week-recap-primary">
        Last week you finished{' '}
        <strong>#{recap.previousRank}</strong> on {recap.boardLabel}.
      </p>
      <p className="dashboard-empty-copy">
        This Week ranks reset every Monday 00:00 UTC. All Time keeps your
        shares — go claim this week.
      </p>
      <div className="confirm-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() =>
            onOpenTab?.(
              recap.boardKey
                ? {
                    tab: 'leaderboard',
                    boardKey: recap.boardKey,
                    period: 'this_week',
                  }
                : { tab: 'leaderboard', period: 'this_week' },
            )
          }
        >
          Claim This Week
        </button>
        <ShareMomentButton
          type="week_recap"
          title="Last week"
          primary={`#${recap.previousRank}`}
          secondary={recap.boardLabel}
          filename="kinesoscore-last-week.png"
          label="Share last week"
        />
      </div>
    </section>
  )
}

export default WeekRecapCard
