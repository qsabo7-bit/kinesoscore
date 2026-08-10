import { useEffect, useState } from 'react'
import ShareMomentButton from './ShareMomentButton'
import ThisWeekCountdown from './ThisWeekCountdown'
import { computeLeaderboardNearMiss } from '../lib/leaderboardNearMiss'
import { fetchLeaderboardName } from '../lib/leaderboardProfile'
import { fetchActiveLeaderboardBoardKeys } from '../lib/leaderboardShares'
import {
  peekLastCalculatorTab,
  resumeLabelForTab,
} from '../lib/lastCalculator'
import { buildDashboardModel } from '../lib/dashboardData'
import {
  fetchPublicLeaderboard,
  leaderboardBoardLabel,
} from '../lib/publicLeaderboard'
import { findLeaderboardRankByName } from '../lib/utcLeaderboardWeek'
import {
  consumeWeekRecap,
  readWeekRankSnapshot,
  rememberWeekRankSnapshot,
} from '../lib/weekRecap'
import { isSupabaseConfigured } from '../supabaseClient'

function resumeFromRecords(records) {
  const latest = buildDashboardModel(records || []).recentActivity?.[0]
  if (!latest?.tab) return null
  return {
    tab: latest.tab,
    label: resumeLabelForTab(latest.tab) || latest.title,
  }
}

/**
 * Single Dashboard “Today” ritual: week recap + resume + This Week rank.
 * Awards stay in the hero (not duplicated here).
 */
function DashboardTodayStrip({ userId, onOpenTab, records = null }) {
  const cachedRank = userId ? readWeekRankSnapshot(userId) : null
  const [recap, setRecap] = useState(null)
  const [resume, setResume] = useState(() => {
    if (!userId) return null
    const remembered = peekLastCalculatorTab(userId)
    if (remembered) {
      return { tab: remembered, label: resumeLabelForTab(remembered) }
    }
    return resumeFromRecords(records)
  })
  const [week, setWeek] = useState(() => ({
    loading: !cachedRank,
    best: cachedRank,
    nearMiss: null,
  }))
  const [athleteName, setAthleteName] = useState(null)

  useEffect(() => {
    if (!userId) {
      setRecap(null)
      return
    }
    setRecap(consumeWeekRecap(userId))
  }, [userId])

  useEffect(() => {
    if (!userId) {
      setResume(null)
      return
    }

    const remembered = peekLastCalculatorTab(userId)
    if (remembered) {
      setResume({
        tab: remembered,
        label: resumeLabelForTab(remembered),
      })
      return
    }

    if (Array.isArray(records)) {
      setResume(resumeFromRecords(records))
    }
  }, [userId, records])

  useEffect(() => {
    if (!userId || !isSupabaseConfigured) {
      setWeek({ loading: false, best: null, nearMiss: null })
      return undefined
    }

    let cancelled = false
    const warm = readWeekRankSnapshot(userId)
    if (warm) {
      setWeek((prev) => ({
        loading: false,
        best: prev.best || warm,
        nearMiss: prev.nearMiss,
      }))
    }

    ;(async () => {
      try {
        const [name, boardKeys] = await Promise.all([
          fetchLeaderboardName(userId).catch(() => null),
          fetchActiveLeaderboardBoardKeys(userId).catch(() => []),
        ])

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

        if (best) rememberWeekRankSnapshot(userId, best)

        if (!cancelled) {
          setAthleteName(name || null)
          setWeek({ loading: false, best, nearMiss })
        }
      } catch {
        if (!cancelled) {
          setWeek((prev) => ({
            loading: false,
            best: prev.best,
            nearMiss: prev.nearMiss,
          }))
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [userId])

  return (
    <section
      id="dash-today"
      className="dashboard-section account-card dashboard-today-strip"
      aria-labelledby="dash-today-heading"
    >
      <h2 id="dash-today-heading" className="result-section-title">
        Today
      </h2>

      {recap ? (
        <div className="dashboard-today-recap" role="status">
          <p className="week-recap-primary">
            Last week: <strong>#{recap.previousRank}</strong> on{' '}
            {recap.boardLabel}.
          </p>
          <div className="confirm-actions dashboard-today-actions">
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
              title="Last week"
              primary={`#${recap.previousRank}`}
              secondary={recap.boardLabel}
              filename="kinesoscore-last-week.png"
              label="Share last week"
              className="btn btn-ghost"
              athleteName={athleteName}
            />
          </div>
        </div>
      ) : null}

      {week.best ? (
        <div className="dashboard-today-rank-block">
          <div className="dashboard-your-week-line">
            <p className="dashboard-your-week-rank">
              <span className="dashboard-your-week-hash">#</span>
              <span className="dashboard-your-week-number">
                {week.best.rank}
              </span>
              <span className="dashboard-your-week-board">
                on {week.best.boardLabel} this week
              </span>
            </p>
          </div>
          <ThisWeekCountdown
            className="dashboard-week-countdown"
            prefix="Leaderboard week resets in"
            showMeta={false}
          />
        </div>
      ) : week.loading ? (
        <div
          className="dashboard-today-rank-block is-pending"
          aria-busy="true"
          aria-live="polite"
        >
          <p className="dashboard-your-week-rank dashboard-your-week-skeleton">
            <span className="dashboard-your-week-hash">#</span>
            <span className="dashboard-your-week-number">–</span>
            <span className="dashboard-your-week-board">
              Checking This Week rank…
            </span>
          </p>
          <ThisWeekCountdown
            className="dashboard-week-countdown"
            prefix="Leaderboard week resets in"
            showMeta={false}
          />
        </div>
      ) : (
        <div className="dashboard-today-rank-block">
          <p className="dashboard-empty-copy dashboard-today-empty">
            Share a result to claim a This Week rank.
          </p>
          <ThisWeekCountdown
            className="dashboard-week-countdown"
            prefix="Leaderboard week resets in"
            showMeta={false}
          />
        </div>
      )}

      {week.nearMiss?.gapLabel ? (
        <p className="this-week-near-miss">{week.nearMiss.gapLabel}</p>
      ) : null}

      <div className="confirm-actions dashboard-today-actions">
        {resume ? (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onOpenTab?.(resume.tab)}
          >
            Continue {resume.label}
          </button>
        ) : null}
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() =>
            onOpenTab?.(
              week.best?.boardKey
                ? {
                    tab: 'leaderboard',
                    boardKey: week.best.boardKey,
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
        {week.best ? (
          <ShareMomentButton
            title="This Week"
            primary={`#${week.best.rank}`}
            secondary={week.best.boardLabel}
            filename="kinesoscore-this-week.png"
            label="Share image"
            className="btn btn-ghost"
            athleteName={athleteName}
          />
        ) : null}
      </div>
    </section>
  )
}

export default DashboardTodayStrip
