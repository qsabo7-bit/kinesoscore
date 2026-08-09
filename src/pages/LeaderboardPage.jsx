import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import SeoIntro from '../components/SeoIntro'
import { BRAND, BRAND_CASING_CLASS } from '../data/brand'
import { LEADERBOARD_SEO } from '../data/seoCopy'
import { fetchLeaderboardName } from '../lib/leaderboardProfile'
import {
  LEADERBOARD_UI_CATEGORIES,
  calculatorTabForBoardKey,
  fetchPublicLeaderboard,
  friendlyPublicLeaderboardError,
  leaderboardBoardLabel,
} from '../lib/publicLeaderboard'
import {
  fetchPublicHabitStreaks,
  friendlyPublicHabitStreakError,
} from '../lib/publicHabitStreaks'
import { resolveLeaderboardRows } from '../lib/leaderboardSamples'

/**
 * Stage 5 public Leaderboard page (Habits tab reuses Stage 8 public streak RPC).
 * Anyone can browse live boards. Joining/sharing still requires a Leaderboard Name.
 */
function LeaderboardPage({ onOpenTab, onRequestAuth, initialCategoryId }) {
  const { isAuthenticated, user, loading: authLoading } = useAuth()
  const [categoryId, setCategoryId] = useState(() =>
    resolveInitialCategoryId(initialCategoryId),
  )
  const [boardKey, setBoardKey] = useState(() => {
    const id = resolveInitialCategoryId(initialCategoryId)
    const cat =
      LEADERBOARD_UI_CATEGORIES.find((item) => item.id === id) ||
      LEADERBOARD_UI_CATEGORIES[0]
    return cat.boardKeys[0]
  })
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

  const isHabitsCategory = category.id === 'habits'

  const effectiveBoardKey = category.boardKeys.includes(boardKey)
    ? boardKey
    : category.boardKeys[0]

  const requestKey = isHabitsCategory
    ? `${effectiveBoardKey}|all_time`
    : `${effectiveBoardKey}|${period}`

  useEffect(() => {
    if (initialCategoryId !== 'habits') return
    setCategoryId('habits')
    setBoardKey('habits:streak')
    setPeriod('all_time')
  }, [initialCategoryId])

  useEffect(() => {
    if (categoryId === 'habits' && period === 'this_week') {
      setPeriod('all_time')
    }
  }, [categoryId, period])

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

  const canViewLive = !authLoading
  const showJoinBanner =
    !authLoading && isAuthenticated && hasLeaderboardName === false

  useEffect(() => {
    if (!canViewLive) return undefined
    if (isHabitsCategory && period === 'this_week') return undefined

    const key = requestKey
    let cancelled = false

    const load = isHabitsCategory
      ? fetchPublicHabitStreaks('all_time').then((data) =>
          data.map((row) => ({
            rank: row.rank,
            leaderboard_name: row.leaderboard_name,
            result_display: `${row.streak} day${row.streak === 1 ? '' : 's'}`,
          })),
        )
      : fetchPublicLeaderboard(effectiveBoardKey, period)

    load
      .then((data) => {
        if (cancelled) return
        setLive({ key, rows: data, error: '' })
      })
      .catch((err) => {
        if (cancelled) return
        setLive({
          key,
          rows: [],
          error: isHabitsCategory
            ? friendlyPublicHabitStreakError(err)
            : friendlyPublicLeaderboardError(err),
        })
      })

    return () => {
      cancelled = true
    }
  }, [
    canViewLive,
    isHabitsCategory,
    effectiveBoardKey,
    period,
    requestKey,
  ])

  const loadingBoard = canViewLive && live.key !== requestKey
  const liveRows = live.key === requestKey ? live.rows : []
  const error = live.key === requestKey ? live.error : ''
  const { rows, isSample } = resolveLeaderboardRows(
    isHabitsCategory ? 'habits:streak' : effectiveBoardKey,
    liveRows,
  )

  const selectCategory = (item) => {
    setCategoryId(item.id)
    setBoardKey(item.boardKeys[0])
    if (item.id === 'habits') {
      setPeriod('all_time')
      onOpenTab?.('leaderboard-habits')
    } else if (categoryId === 'habits') {
      onOpenTab?.('leaderboard')
    }
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
          className="leaderboard-filter-group leaderboard-categories"
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

        {!isHabitsCategory ? (
          <div className="leaderboard-period-block">
            <div
              className="leaderboard-filter-group leaderboard-periods"
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
                title="Week starts Monday 00:00 UTC"
              >
                This Week (UTC)
              </button>
            </div>
            {period === 'this_week' ? (
              <p className="calc-hint leaderboard-period-hint">
                Weeks run Monday–Sunday in UTC — not your local timezone.
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <p className="calc-hint leaderboard-board-caption">
        {isHabitsCategory
          ? 'Habit Streaks'
          : leaderboardBoardLabel(effectiveBoardKey)}
        {' · '}
        {isHabitsCategory
          ? 'All time'
          : period === 'this_week'
            ? 'This week (UTC)'
            : 'All time'}
      </p>

      <p className="calc-hint leaderboard-trust-note" role="note">
        Self-reported from opted-in athletes — not independently verified.
      </p>

      {showJoinBanner ? (
        <section
          className="leaderboard-join-banner"
          aria-label="Join the leaderboard"
        >
          <div>
            <h2 className={`result-section-title ${BRAND_CASING_CLASS}`}>
              Join the {BRAND.short} leaderboard
            </h2>
            <p className="calc-hint">
              You can browse every board now. Add a Leaderboard Name to share
              your own results
              {isHabitsCategory ? ' or habit streak' : ''}.
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onOpenTab?.('account')}
          >
            Open Account Settings
          </button>
        </section>
      ) : null}

      {canViewLive ? (
        <section
          className="leaderboard-results"
          aria-live="polite"
          aria-busy={loadingBoard}
        >
          {loadingBoard ? (
            <p className="calc-hint">
              {isHabitsCategory
                ? 'Loading streak leaderboard…'
                : 'Loading leaderboard…'}
            </p>
          ) : null}
          {error ? (
            <p className="feedback feedback-error">{error}</p>
          ) : null}
          {!loadingBoard && !error && isSample ? (
            <p className="leaderboard-sample-note" role="status">
              Sample rankings for preview — these disappear as soon as real
              athletes share on this board.
            </p>
          ) : null}
          {!loadingBoard && !error && rows.length > 0 ? (
            <LeaderboardTable
              rows={rows}
              isSample={isSample}
              caption={
                isHabitsCategory
                  ? 'Habit streak leaderboard'
                  : `${leaderboardBoardLabel(effectiveBoardKey)} leaderboard`
              }
              resultLabel={isHabitsCategory ? 'Current Streak' : 'Result'}
            />
          ) : null}
          {!loadingBoard && !error && isSample ? (
            <div className="confirm-actions">
              {isHabitsCategory ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onOpenTab?.('habits')}
                >
                  Open Habits
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    onOpenTab?.(calculatorTabForBoardKey(effectiveBoardKey))
                  }
                >
                  Be the first real entry
                </button>
              )}
              {!isAuthenticated ? (
                <>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => onRequestAuth?.('signup')}
                  >
                    Create Account
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => onRequestAuth?.('login')}
                  >
                    Log in
                  </button>
                </>
              ) : hasLeaderboardName === false ? (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => onOpenTab?.('account')}
                >
                  Add Leaderboard Name
                </button>
              ) : null}
            </div>
          ) : null}
        </section>
      ) : (
        <p className="calc-hint">Loading leaderboard…</p>
      )}

      {isHabitsCategory ? (
        <p className="calc-hint">
          Track habits privately in{' '}
          <button
            type="button"
            className="text-link-button"
            onClick={() => onOpenTab?.('habits')}
          >
            Habits
          </button>
          . Sharing is optional and never publishes which habits you track.
        </p>
      ) : null}

      <SeoIntro
        title={LEADERBOARD_SEO.title}
        faqs={LEADERBOARD_SEO.faqs}
        relatedNote={LEADERBOARD_SEO.relatedNote}
        onNavigate={onOpenTab}
      >
        {LEADERBOARD_SEO.paragraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </SeoIntro>
    </main>
  )
}

function resolveInitialCategoryId(initialCategoryId) {
  if (
    initialCategoryId &&
    LEADERBOARD_UI_CATEGORIES.some((item) => item.id === initialCategoryId)
  ) {
    return initialCategoryId
  }
  return LEADERBOARD_UI_CATEGORIES[0].id
}

function LeaderboardTable({
  rows,
  caption,
  resultLabel = 'Result',
  isSample = false,
}) {
  return (
    <div
      className={`leaderboard-table-wrap${isSample ? ' is-sample' : ''}`}
    >
      <table className="leaderboard-table">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Leaderboard Name</th>
            <th scope="col">{resultLabel}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={`${row.rank}-${row.leaderboard_name}-${row.result_display}`}
            >
              <td className="leaderboard-rank">{row.rank}</td>
              <td className="leaderboard-name">
                {row.leaderboard_name}
                {isSample ? (
                  <span className="leaderboard-sample-badge">Sample</span>
                ) : null}
              </td>
              <td className="leaderboard-result">{row.result_display}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderboardPage
