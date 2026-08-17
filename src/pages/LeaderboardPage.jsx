import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import ProfileAvatar from '../components/ProfileAvatar'
import PublicAwardBadges from '../components/PublicAwardBadges'
import SeoIntro from '../components/SeoIntro'
import ThisWeekCountdown from '../components/ThisWeekCountdown'
import UnitToggle from '../components/UnitToggle'
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
  fetchPublicHabitXp,
  friendlyPublicHabitXpError,
} from '../lib/publicHabitXp'
import { resolveLeaderboardRows } from '../lib/leaderboardSamples'

/**
 * Public Leaderboard page (Habits tab uses lifetime XP RPC).
 * Anyone can browse live boards. Joining/sharing still requires a Leaderboard Name.
 */
function LeaderboardPage({
  onOpenTab,
  onRequestAuth,
  initialCategoryId,
  initialBoardKey,
  initialPeriod,
}) {
  const { isAuthenticated, user, loading: authLoading } = useAuth()
  const [categoryId, setCategoryId] = useState(() =>
    resolveInitialCategoryId(initialCategoryId),
  )
  const [boardKey, setBoardKey] = useState(() => {
    const id = resolveInitialCategoryId(initialCategoryId)
    const cat =
      LEADERBOARD_UI_CATEGORIES.find((item) => item.id === id) ||
      LEADERBOARD_UI_CATEGORIES[0]
    if (initialBoardKey && cat.boardKeys.includes(initialBoardKey)) {
      return initialBoardKey
    }
    return cat.boardKeys[0]
  })
  // Performance boards open on This Week (UTC) — the weekly ritual window.
  const [period, setPeriod] = useState(() => {
    if (resolveInitialCategoryId(initialCategoryId) === 'habits') {
      return 'all_time'
    }
    if (initialPeriod === 'all_time' || initialPeriod === 'this_week') {
      return initialPeriod
    }
    return 'this_week'
  })
  /** null = unknown (signed-in fetch pending); guests ignore this flag. */
  const [hasLeaderboardName, setHasLeaderboardName] = useState(null)
  const [viewerLeaderboardName, setViewerLeaderboardName] = useState(null)
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
    if (initialCategoryId === 'habits') {
      setCategoryId('habits')
      setBoardKey('habits:xp')
      setPeriod('all_time')
      return
    }

    if (initialCategoryId) {
      setCategoryId(resolveInitialCategoryId(initialCategoryId))
    }

    if (initialBoardKey) {
      const id = resolveInitialCategoryId(
        initialCategoryId ||
          LEADERBOARD_UI_CATEGORIES.find((c) =>
            c.boardKeys.includes(initialBoardKey),
          )?.id,
      )
      const cat =
        LEADERBOARD_UI_CATEGORIES.find((item) => item.id === id) ||
        LEADERBOARD_UI_CATEGORIES[0]
      setCategoryId(cat.id)
      if (cat.boardKeys.includes(initialBoardKey)) {
        setBoardKey(initialBoardKey)
      }
    }

    if (
      initialPeriod === 'all_time' ||
      initialPeriod === 'this_week'
    ) {
      setPeriod(initialPeriod)
    }
  }, [initialCategoryId, initialBoardKey, initialPeriod])

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
        if (cancelled) return
        setHasLeaderboardName(Boolean(name))
        setViewerLeaderboardName(name || null)
      })
      .catch(() => {
        if (cancelled) return
        setHasLeaderboardName(false)
        setViewerLeaderboardName(null)
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
      ? fetchPublicHabitXp('all_time').then((data) =>
          data.map((row) => ({
            rank: row.rank,
            leaderboard_name: row.leaderboard_name,
            avatar_id: row.avatar_id,
            awards: row.awards,
            result_display: `${Number(row.lifetime_xp || 0).toLocaleString()} XP`,
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
            ? friendlyPublicHabitXpError(err)
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
    isHabitsCategory ? 'habits:xp' : effectiveBoardKey,
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
          Global rankings from athletes who opt in to share. Public rows show a
          Leaderboard Name, profile icon, and the shared result — never email or
          legal name.
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
              className={`leaderboard-chip${categoryId === item.id ? ' is-active' : ''}${
                item.id === 'score'
                  ? ` is-mykinesoscore-static ${BRAND_CASING_CLASS}`
                  : ''
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
            <UnitToggle
              className={`is-compact${
                categoryId === 'score' ? ' is-mykinesoscore-periods' : ''
              }`}
              label="Period"
              value={period}
              options={[
                { value: 'all_time', label: 'All Time' },
                { value: 'this_week', label: 'This Week' },
              ]}
              onChange={setPeriod}
            />
            {period === 'this_week' ? (
              <>
                <ThisWeekCountdown className="leaderboard-week-countdown" />
                <p className="calc-hint leaderboard-period-hint">
                  UTC calendar week (Monday 00:00 UTC → next Monday). Shares posted
                  this week appear here and on All Time; when the UTC week ends they
                  leave This Week only.
                </p>
              </>
            ) : null}
          </div>
        ) : null}
      </div>

      {isHabitsCategory ? (
        <section className="leaderboard-habits-banner" aria-label="Habit XP board">
          <div className="leaderboard-habits-banner-main">
            <p className="leaderboard-habits-banner-kicker">Lifetime board</p>
            <h2 className="leaderboard-habits-banner-title">Habit XP</h2>
            <p className="calc-hint leaderboard-habits-banner-copy">
              Opt-in totals from daily habit cards — name + XP only, never which
              habits you track.
            </p>
            <div className="leaderboard-habits-meter" aria-hidden="true">
              <span className="leaderboard-habits-meter-fill" />
            </div>
          </div>
          <div className="leaderboard-habits-banner-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => onOpenTab?.('habits')}
            >
              Open Habits
            </button>
          </div>
          <details className="dashboard-progress-details leaderboard-habits-fold">
            <summary className="dashboard-progress-summary">
              <span className="dashboard-progress-summary-copy">
                <span className="result-section-title">How Habit XP works</span>
                <span className="dashboard-progress-summary-hint">
                  Base XP, streaks, and privacy
                </span>
              </span>
              <span className="dashboard-progress-summary-cta">
                <span className="dashboard-progress-summary-cta-label" />
                <span
                  className="dashboard-progress-summary-chevron"
                  aria-hidden="true"
                />
              </span>
            </summary>
            <div className="dashboard-progress-body">
              <ul className="leaderboard-habits-details-list">
                <li>Each habit has a base XP value by difficulty.</li>
                <li>Per-habit streaks multiply XP up to 1.5× after five days.</li>
                <li>Missing a day resets that habit’s multiplier.</li>
                <li>Sharing is optional and can be turned off anytime in Habits.</li>
              </ul>
            </div>
          </details>
        </section>
      ) : null}

      {!isHabitsCategory ? (
        <p className="calc-hint leaderboard-board-caption">
          {leaderboardBoardLabel(effectiveBoardKey)}
          {' · '}
          {period === 'this_week' ? 'This week (UTC)' : 'All time'}
        </p>
      ) : null}

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
              {isHabitsCategory ? ' or habit XP' : ''}.
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
                ? 'Loading XP leaderboard…'
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
              highlightName={
                isSample ? null : viewerLeaderboardName
              }
              caption={
                isHabitsCategory
                  ? 'Habit XP leaderboard'
                  : `${leaderboardBoardLabel(effectiveBoardKey)} leaderboard`
              }
              resultLabel={isHabitsCategory ? 'Lifetime XP' : 'Result'}
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
  highlightName = null,
}) {
  const highlight =
    highlightName && String(highlightName).trim()
      ? String(highlightName).trim().toLowerCase()
      : ''

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
          {rows.map((row) => {
            const isYou =
              Boolean(highlight) &&
              String(row.leaderboard_name || '')
                .trim()
                .toLowerCase() === highlight
            return (
              <tr
                key={`${row.rank}-${row.leaderboard_name}-${row.result_display}`}
                className={isYou ? 'is-you' : undefined}
              >
                <td className="leaderboard-rank">{row.rank}</td>
                <td className="leaderboard-name">
                  <span className="leaderboard-name-row">
                    <ProfileAvatar
                      avatarId={row.avatar_id}
                      size="sm"
                      className="leaderboard-row-avatar"
                    />
                    <span className="leaderboard-name-text">
                      {row.leaderboard_name}
                      {isYou ? (
                        <span className="leaderboard-you-badge">You</span>
                      ) : null}
                    </span>
                    {row.awards ? (
                      <PublicAwardBadges awards={row.awards} />
                    ) : null}
                    {isSample ? (
                      <span className="leaderboard-sample-badge">Sample</span>
                    ) : null}
                  </span>
                </td>
                <td className="leaderboard-result">{row.result_display}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default LeaderboardPage
