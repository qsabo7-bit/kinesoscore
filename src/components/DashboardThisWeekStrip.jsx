import { useEffect, useState } from 'react'
import PublicAwardBadges from './PublicAwardBadges'
import ShareMomentButton from './ShareMomentButton'
import ThisWeekCountdown from './ThisWeekCountdown'
import { fetchAwardIdentitySettings } from '../lib/awardIdentity'
import { computeLeaderboardNearMiss } from '../lib/leaderboardNearMiss'
import { fetchLeaderboardName } from '../lib/leaderboardProfile'
import { fetchActiveLeaderboardBoardKeys } from '../lib/leaderboardShares'
import {
  fetchPublicLeaderboard,
  leaderboardBoardLabel,
} from '../lib/publicLeaderboard'
import { findLeaderboardRankByName } from '../lib/utcLeaderboardWeek'
import { rememberWeekRankSnapshot } from '../lib/weekRecap'
import { isSupabaseConfigured } from '../supabaseClient'

/**
 * Dashboard ritual: best This Week rank + near-miss + public crests + countdown.
 */
function DashboardThisWeekStrip({ userId, onOpenTab }) {
  const [state, setState] = useState({
    loading: true,
    name: null,
    awards: null,
    best: null,
    nearMiss: null,
  })

  useEffect(() => {
    if (!userId || !isSupabaseConfigured) {
      setState({
        loading: false,
        name: null,
        awards: null,
        best: null,
        nearMiss: null,
      })
      return undefined
    }

    let cancelled = false

    ;(async () => {
      try {
        const [name, awardsSettings, boardKeys] = await Promise.all([
          fetchLeaderboardName(userId).catch(() => null),
          fetchAwardIdentitySettings(userId).catch(() => null),
          fetchActiveLeaderboardBoardKeys(userId).catch(() => []),
        ])

        const awards =
          awardsSettings?.showAwardsPublicly
            ? {
                running: awardsSettings.running,
                strength: awardsSettings.strength,
                crown: awardsSettings.crown,
              }
            : null

        let best = null
        let nearMiss = null
        const ordered = [
          'mykinesoscore',
          ...boardKeys.filter((key) => key !== 'mykinesoscore'),
        ]

        if (name && ordered.length) {
          const ranks = await Promise.all(
            ordered.map(async (boardKey) => {
              try {
                const rows = await fetchPublicLeaderboard(boardKey, 'this_week')
                const rank = findLeaderboardRankByName(rows, name)
                if (rank == null) return null
                return {
                  rank,
                  boardKey,
                  boardLabel: leaderboardBoardLabel(boardKey),
                  nearMiss: computeLeaderboardNearMiss(rows, name),
                }
              } catch {
                return null
              }
            }),
          )
          for (const entry of ranks) {
            if (!entry) continue
            if (!best || entry.rank < best.rank) {
              best = {
                rank: entry.rank,
                boardKey: entry.boardKey,
                boardLabel: entry.boardLabel,
              }
              nearMiss = entry.nearMiss
            }
          }
        }

        if (best) {
          rememberWeekRankSnapshot(userId, best)
        }

        if (!cancelled) {
          setState({ loading: false, name, awards, best, nearMiss })
        }
      } catch {
        if (!cancelled) {
          setState({
            loading: false,
            name: null,
            awards: null,
            best: null,
            nearMiss: null,
          })
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [userId])

  return (
    <section
      className="dashboard-section account-card dashboard-this-week-strip"
      aria-labelledby="dash-your-week"
    >
      <h2 id="dash-your-week" className="result-section-title">
        Your week
      </h2>

      {state.loading ? (
        <p className="calc-hint">Loading This Week…</p>
      ) : state.best ? (
        <div className="dashboard-your-week-line">
          <p className="dashboard-your-week-rank">
            <span className="dashboard-your-week-hash">#</span>
            <span className="dashboard-your-week-number">{state.best.rank}</span>
            <span className="dashboard-your-week-board">
              on {state.best.boardLabel} this week
            </span>
          </p>
          {state.awards ? <PublicAwardBadges awards={state.awards} /> : null}
        </div>
      ) : (
        <div className="dashboard-your-week-line">
          <p className="dashboard-empty-copy">
            Share a result to claim a This Week rank. When the UTC week resets,
            ranks clear for This Week — All Time keeps your share.
          </p>
          {state.awards ? <PublicAwardBadges awards={state.awards} /> : null}
        </div>
      )}

      {state.nearMiss?.gapLabel ? (
        <p className="this-week-near-miss">{state.nearMiss.gapLabel}</p>
      ) : null}

      <ThisWeekCountdown className="dashboard-week-countdown" />

      <div className="confirm-actions this-week-share-status-actions">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() =>
            onOpenTab?.(
              state.best?.boardKey
                ? {
                    tab: 'leaderboard',
                    boardKey: state.best.boardKey,
                    period: 'this_week',
                  }
                : {
                    tab: 'leaderboard',
                    period: 'this_week',
                  },
            )
          }
        >
          View This Week
        </button>
        {state.best ? (
          <ShareMomentButton
            type="this_week_rank"
            title="This Week"
            primary={`#${state.best.rank}`}
            secondary={state.best.boardLabel}
            filename="kinesoscore-this-week.png"
            label="Share image"
            className="btn btn-ghost"
          />
        ) : null}
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onOpenTab?.('leaderboard-habits')}
        >
          Habit Streaks
        </button>
      </div>
    </section>
  )
}

export default DashboardThisWeekStrip
