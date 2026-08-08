import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { BRAND, BRAND_CASING_CLASS } from '../data/brand'
import { fetchLeaderboardName } from '../lib/leaderboardProfile'
import {
  LEADERBOARD_UI_CATEGORIES,
  SAMPLE_LEADERBOARD_ROWS,
  fetchPublicLeaderboard,
  friendlyPublicLeaderboardError,
  leaderboardBoardLabel,
} from '../lib/publicLeaderboard'

/**
 * Stage 5 public Leaderboard page.
 * Logged-out + named users see live public RPC data.
 * Logged-in users without a Leaderboard Name see a locked sample preview.
 */
function LeaderboardPage({ onOpenTab }) {
  const { isAuthenticated, user, loading: authLoading } = useAuth()
  const [categoryId, setCategoryId] = useState(LEADERBOARD_UI_CATEGORIES[0].id)
  const [boardKey, setBoardKey] = useState(
    LEADERBOARD_UI_CATEGORIES[0].boardKeys[0],
  )
  const [period, setPeriod] = useState('all_time')
  /** null = unknown (signed-in fetch pending); guests ignore this flag. */
  const [hasLeaderboardName, setHasLeaderboardName] = useState(null)
  const [live, setLive] = useState({
    key: '',
    rows: [],
    error: '',
  })

  const category = useMemo(
    () =>
      LEADERBOARD_UI_CATEGORIES.find((item) => item.id === categoryId) ||
      LEADERBOARD_UI_CATEGORIES[0],
    [categoryId],
  )

  const effectiveBoardKey = category.boardKeys.includes(boardKey)
    ? boardKey
    : category.boardKeys[0]

  const requestKey = `${effectiveBoardKey}|${period}`

  useEffect(() => {
    if (!isAuthenticated || !user?.id) return undefined

    let cancelled = false
    fetchLeaderboardName(user.id)
      .then((name) => {
        if (!cancelled) setHasLeaderboardName(Boolean(name))
      })
      .catch(() => {
        if (!cancelled) setHasLeaderboardName(false)
      })

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, user?.id])

  const canViewLive =
    !authLoading && (!isAuthenticated || hasLeaderboardName === true)
  const showLockedSample =
    !authLoading && isAuthenticated && hasLeaderboardName === false
  const waitingOnName =
    authLoading || (isAuthenticated && hasLeaderboardName === null)

  useEffect(() => {
    if (!canViewLive) return undefined

    const key = requestKey
    let cancelled = false

    fetchPublicLeaderboard(effectiveBoardKey, period)
      .then((data) => {
        if (cancelled) return
        setLive({ key, rows: data, error: '' })
      })
      .catch((err) => {
        if (cancelled) return
        setLive({
          key,
          rows: [],
          error: friendlyPublicLeaderboardError(err),
        })
      })

    return () => {
      cancelled = true
    }
  }, [canViewLive, effectiveBoardKey, period, requestKey])

  const loadingBoard = canViewLive && live.key !== requestKey
  const rows = live.key === requestKey ? live.rows : []
  const error = live.key === requestKey ? live.error : ''

  const selectCategory = (item) => {
    setCategoryId(item.id)
    setBoardKey(item.boardKeys[0])
  }

  return (
    <main className="page leaderboard-page">
      <header className="page-header">
        <p className="page-eyebrow">Community</p>
        <h1>Leaderboard</h1>
        <p className="page-lead">
          Global rankings from athletes who opt in to share. Public rows show
          only a Leaderboard Name and the shared result — never email or legal
          name.
        </p>
      </header>

      <div
        className="leaderboard-filters"
        role="navigation"
        aria-label="Leaderboard filters"
      >
        <div
          className="leaderboard-filter-group"
          role="group"
          aria-label="Category"
        >
          {LEADERBOARD_UI_CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`sub-nav-tab${categoryId === item.id ? ' is-active' : ''}${
                item.id === 'score' ? ` ${BRAND_CASING_CLASS}` : ''
              }`}
              onClick={() => selectCategory(item)}
              aria-pressed={categoryId === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>

        {category.boardKeys.length > 1 ? (
          <div
            className="leaderboard-filter-group leaderboard-subboards"
            role="group"
            aria-label="Board"
          >
            {category.boardKeys.map((key) => (
              <button
                key={key}
                type="button"
                className={`leaderboard-chip${
                  effectiveBoardKey === key ? ' is-active' : ''
                }`}
                onClick={() => setBoardKey(key)}
                aria-pressed={effectiveBoardKey === key}
              >
                {leaderboardBoardLabel(key)}
              </button>
            ))}
          </div>
        ) : null}

        <div
          className="leaderboard-filter-group"
          role="group"
          aria-label="Time period"
        >
          <button
            type="button"
            className={`leaderboard-chip${period === 'all_time' ? ' is-active' : ''}`}
            onClick={() => setPeriod('all_time')}
            aria-pressed={period === 'all_time'}
          >
            All Time
          </button>
          <button
            type="button"
            className={`leaderboard-chip${period === 'this_week' ? ' is-active' : ''}`}
            onClick={() => setPeriod('this_week')}
            aria-pressed={period === 'this_week'}
          >
            This Week
          </button>
        </div>
      </div>

      <p className="calc-hint leaderboard-board-caption">
        {leaderboardBoardLabel(effectiveBoardKey)}
        {' · '}
        {period === 'this_week' ? 'This week (UTC)' : 'All time'}
      </p>

      {showLockedSample ? (
        <div
          className="locked-leaderboard-preview"
          aria-label="Leaderboard participation locked. Add a Leaderboard Name to join."
        >
          <div className="locked-leaderboard-sample" aria-hidden="true">
            <LeaderboardTable
              rows={SAMPLE_LEADERBOARD_ROWS}
              caption="Sample leaderboard"
            />
          </div>
          <div className="locked-leaderboard-cta">
            <h2 className={`result-section-title ${BRAND_CASING_CLASS}`}>
              Join the {BRAND.short} leaderboard
            </h2>
            <p>
              Add a Leaderboard Name in Account Settings to participate in
              global leaderboards. You can keep using every calculator without
              one.
            </p>
            <div className="confirm-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onOpenTab?.('account')}
              >
                Open Account Settings
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {canViewLive ? (
        <section
          className="leaderboard-results"
          aria-live="polite"
          aria-busy={loadingBoard}
        >
          {loadingBoard ? (
            <p className="calc-hint">Loading leaderboard…</p>
          ) : null}
          {error ? <p className="feedback feedback-error">{error}</p> : null}
          {!loadingBoard && !error && rows.length === 0 ? (
            <p className="calc-hint">
              No global results yet. Be the first to share your performance from
              an eligible calculator.
            </p>
          ) : null}
          {!loadingBoard && !error && rows.length > 0 ? (
            <LeaderboardTable
              rows={rows}
              caption={`${leaderboardBoardLabel(effectiveBoardKey)} leaderboard`}
            />
          ) : null}
        </section>
      ) : null}

      {waitingOnName ? <p className="calc-hint">Loading…</p> : null}
    </main>
  )
}

function LeaderboardTable({ rows, caption }) {
  return (
    <div className="leaderboard-table-wrap">
      <table className="leaderboard-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Leaderboard Name</th>
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={`${row.rank}-${row.leaderboard_name}-${row.result_display}`}
            >
              <td className="leaderboard-rank">{row.rank}</td>
              <td className="leaderboard-name">{row.leaderboard_name}</td>
              <td className="leaderboard-result">{row.result_display}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderboardPage
