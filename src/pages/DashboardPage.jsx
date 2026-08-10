import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useUserDefaults } from '../auth/UserDefaultsContext'
import FitnessAwardsDisplay, {
  FitnessAwardsLegend,
} from '../components/FitnessAwardsDisplay'
import FpcScoreRing from '../components/FpcScoreRing'
import LockedDashboardPreview from '../components/LockedDashboardPreview'
import DashboardResumeStrip from '../components/DashboardResumeStrip'
import DashboardThisWeekStrip from '../components/DashboardThisWeekStrip'
import OnboardingWizard from '../components/OnboardingWizard'
import WeekRecapCard from '../components/WeekRecapCard'
import SoftReveal from '../components/SoftReveal'
import { fetchLeaderboardName } from '../lib/leaderboardProfile'
import { shouldShowOnboarding } from '../lib/onboarding'
import {
  GraphRangeToggle,
  GraphTrackSelector,
  ProgressGraph,
} from '../components/tracking'
import { BRAND, BRAND_CASING_CLASS } from '../data/brand'
import { DASHBOARD_GRAPH_METRICS } from '../data/dashboardMetrics'
import {
  RUNNING_DISTANCE_TRACKS,
  RUNNING_GRAPH_TRACKS,
} from '../data/trackingTracks'
import {
  buildDashboardModel,
  loadDashboardRecords,
} from '../lib/dashboardData'
import {
  awardsFromMatchingSnapshot,
  deriveDashboardAwardsFallback,
} from '../lib/dashboardAwardsFallback'
import { deriveAwards } from '../lib/fitnessAwards'
import {
  fetchLatestFitnessScoreSnapshot,
  friendlyFitnessSnapshotError,
} from '../lib/fitnessScoreSnapshots'
import {
  clearCachedDashboardRecords,
  readCachedDashboardRecords,
  writeCachedDashboardRecords,
} from '../lib/dashboardRecordsCache'
import {
  filterRecordsByRange,
  recordsInMassUnit,
} from '../lib/performanceRecords'
import {
  buildDerivedEstimated5kRecords,
  isActualRunningExerciseName,
} from '../lib/runningTracking'
import { habitDisplayName } from '../data/habitCatalog'
import { localDateKey, shiftLocalDateKey } from '../lib/habitDates'
import {
  fetchActiveHabits,
  fetchHabitCheckins,
  friendlyHabitError,
  setHabitCheckin,
} from '../lib/habits'
import { resolveHabitStreakAtRisk } from '../lib/habitStreakAtRisk'
import {
  computeHabitStreak,
  habitDayProgress,
} from '../lib/habitStreaks'
import { isSupabaseConfigured } from '../supabaseClient'

const PREFERRED_RUNNING_TRACK_ID =
  DASHBOARD_GRAPH_METRICS.find((metric) => metric.id === 'running')
    ?.defaultTrackId || 'estimated-5k'

const EMPTY_RUNNING_ROWS = []

function formatDate(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

const RECENT_ACTIVITY_PREVIEW = 5

function DashboardMetricCard({ card, onOpenTab }) {
  const toneClass =
    card.trend?.tone === 'good'
      ? ' is-trend-good'
      : card.trend?.tone === 'bad'
        ? ' is-trend-bad'
        : ''

  return (
    <button
      type="button"
      className={`dashboard-metric-card${
        card.isPrompt || card.isSample ? ' is-prompt' : ''
      }${card.isSample ? ' is-sample' : ''}`}
      onClick={() => onOpenTab?.(card.tab)}
    >
      <p className="result-label">
        {card.title}
        {card.isSample ? (
          <span className="dashboard-card-sample-badge">Sample</span>
        ) : null}
        {card.badge ? (
          <span
            className={`nav-badge nav-badge-${String(card.badge).toLowerCase()}`}
            style={{ marginLeft: '0.4rem', verticalAlign: 'middle' }}
          >
            {card.badge}
          </span>
        ) : null}
      </p>
      <p className="dashboard-metric-value">{card.primary}</p>
      <p className="dashboard-metric-secondary">{card.secondary}</p>
      {card.trend ? (
        <p className={`dashboard-metric-trend${toneClass}`}>{card.trend.value}</p>
      ) : null}
    </button>
  )
}

function DashboardPage({ onOpenTab, onRequestAuth }) {
  const {
    user,
    profile,
    firstName,
    signOut,
    loading: authLoading,
    isAuthenticated,
  } = useAuth()
  const { defaults } = useUserDefaults()

  const cachedRecords = readCachedDashboardRecords(user?.id)
  const [records, setRecords] = useState(() => cachedRecords ?? [])
  const [loadingData, setLoadingData] = useState(() => {
    if (!isAuthenticated || !user?.id) return false
    return cachedRecords == null
  })
  const [error, setError] = useState('')
  const [metricId, setMetricId] = useState('fpc-score')
  const [runningTrackId, setRunningTrackId] = useState(PREFERRED_RUNNING_TRACK_ID)
  const [runningTrackTouched, setRunningTrackTouched] = useState(false)
  const [graphRange, setGraphRange] = useState('all')
  const [busy, setBusy] = useState(false)
  const [activityExpanded, setActivityExpanded] = useState(false)
  const [habitState, setHabitState] = useState({
    habits: [],
    checkins: [],
    loading: false,
    error: '',
  })
  /** @type {[{ awards: object, runningScore: number, strengthScore: number } | null, Function]} */
  const [awardState, setAwardState] = useState(null)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const todayKey = localDateKey()

  useEffect(() => {
    if (!isAuthenticated || !user?.id || loadingData) return undefined

    let cancelled = false
    const hasPerformanceData = Array.isArray(records) && records.length > 0

    fetchLeaderboardName(user.id)
      .then((name) => {
        if (cancelled) return
        setShowOnboarding(
          shouldShowOnboarding(user.id, {
            hasLeaderboardName: Boolean(name),
            hasPerformanceData,
          }),
        )
      })
      .catch(() => {
        if (cancelled) return
        setShowOnboarding(
          shouldShowOnboarding(user.id, {
            hasLeaderboardName: false,
            hasPerformanceData,
          }),
        )
      })

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, user?.id, loadingData, records])

  useEffect(() => {
    setRunningTrackId(PREFERRED_RUNNING_TRACK_ID)
    setRunningTrackTouched(false)
  }, [user?.id])

  useEffect(() => {
    if (!isAuthenticated || !user?.id || !isSupabaseConfigured) {
      return undefined
    }

    let cancelled = false
    const fromDate = shiftLocalDateKey(todayKey, -400)

    ;(async () => {
      setHabitState((prev) => ({ ...prev, loading: true, error: '' }))
      try {
        const [habits, checkins] = await Promise.all([
          fetchActiveHabits(user.id),
          fetchHabitCheckins(user.id, { fromDate, toDate: todayKey }),
        ])
        if (cancelled) return
        setHabitState({ habits, checkins, loading: false, error: '' })
      } catch (err) {
        if (cancelled) return
        setHabitState({
          habits: [],
          checkins: [],
          loading: false,
          error: friendlyHabitError(err, 'Could not load habits.'),
        })
      }
    })()

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, user?.id, todayKey])

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setRecords([])
      setAwardState(null)
      setLoadingData(false)
      return undefined
    }

    let cancelled = false
    const cached = readCachedDashboardRecords(user.id)
    if (cached) {
      setRecords(cached)
      setLoadingData(false)
    } else {
      setLoadingData(true)
    }
    setError('')

    loadDashboardRecords(user.id)
      .then((rows) => {
        if (cancelled) return
        writeCachedDashboardRecords(user.id, rows)
        setRecords(rows)
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Could not load your dashboard.')
        }
      })
      .finally(() => {
        if (!cancelled) setLoadingData(false)
      })

    fetchLatestFitnessScoreSnapshot(user.id)
      .then((snapshot) => {
        if (cancelled) return
        if (!snapshot) {
          setAwardState(null)
          return
        }
        const runningScore = Number(snapshot.running_score)
        const strengthScore = Number(snapshot.strength_score)
        setAwardState({
          fitnessScore: Number(snapshot.fitness_score),
          runningScore,
          strengthScore,
          awards: deriveAwards({ runningScore, strengthScore }),
        })
      })
      .catch((err) => {
        if (cancelled) return
        // Awards are optional enrichment; do not block the dashboard.
        console.warn(friendlyFitnessSnapshotError(err, 'Could not load awards.'))
        setAwardState(null)
      })

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, user?.id])

  const model = useMemo(
    () =>
      buildDashboardModel(records, {
        actualAge: defaults.age ? Number(defaults.age) : null,
      }),
    [records, defaults.age],
  )

  const resolvedAwards = useMemo(() => {
    if (!model.fpcScore) return null
    const matched = awardsFromMatchingSnapshot(
      awardState,
      model.fpcScore.value,
    )
    if (matched) return matched
    return deriveDashboardAwardsFallback({
      savedFpcScore: model.fpcScore.value,
      records,
      defaults,
    })
  }, [awardState, model.fpcScore, records, defaults])

  const runningMetricRows = model.byMetric.running || EMPTY_RUNNING_ROWS
  const derivedEstimated5kRows = useMemo(
    () => buildDerivedEstimated5kRecords(runningMetricRows),
    [runningMetricRows],
  )

  // Prefer Estimated 5K; if that derived series is empty, show the latest actual distance.
  // Skip once the user manually picks a distance tab.
  useEffect(() => {
    if (loadingData || runningTrackTouched) return
    if (runningTrackId !== PREFERRED_RUNNING_TRACK_ID) return

    if (derivedEstimated5kRows.length) return

    const exerciseNameToTrackId = new Map(
      RUNNING_DISTANCE_TRACKS.map((track) => [track.exerciseName, track.id]),
    )
    for (let i = runningMetricRows.length - 1; i >= 0; i -= 1) {
      const trackId = exerciseNameToTrackId.get(
        runningMetricRows[i].exercise_name,
      )
      if (trackId) {
        setRunningTrackId(trackId)
        return
      }
    }
  }, [
    loadingData,
    runningMetricRows,
    derivedEstimated5kRows,
    runningTrackId,
    runningTrackTouched,
  ])

  const activeMetric =
    DASHBOARD_GRAPH_METRICS.find((metric) => metric.id === metricId) ||
    DASHBOARD_GRAPH_METRICS[0]

  const activeRunningTrack =
    activeMetric.id === 'running'
      ? RUNNING_GRAPH_TRACKS.find((track) => track.id === runningTrackId) ||
        RUNNING_GRAPH_TRACKS[0]
      : null

  const graphRecords = useMemo(() => {
    let series = model.byMetric[activeMetric.id] || []
    if (activeMetric.id === 'running' && activeRunningTrack) {
      if (activeRunningTrack.derived) {
        series = derivedEstimated5kRows
      } else {
        series = series.filter(
          (record) =>
            record.exercise_name === activeRunningTrack.exerciseName &&
            isActualRunningExerciseName(record.exercise_name),
        )
      }
    }
    const ranged = filterRecordsByRange(series, graphRange)
    if (activeMetric.valueKind === 'mass') {
      return recordsInMassUnit(ranged, 'lb')
    }
    return ranged
  }, [
    model.byMetric,
    activeMetric,
    activeRunningTrack,
    derivedEstimated5kRows,
    graphRange,
  ])

  const graphYAxisLabel =
    activeMetric.id === 'running' && activeRunningTrack
      ? activeRunningTrack.yAxisLabel || 'Time'
      : activeMetric.valueKind === 'mass'
        ? `${activeMetric.yAxisLabel} (lb)`
        : activeMetric.yAxisLabel

  const hasEstimated5kData = derivedEstimated5kRows.length > 0

  const graphEmptyMessage = model.hasAnyData
    ? activeMetric.id === 'running' &&
      activeRunningTrack?.id === 'estimated-5k' &&
      !hasEstimated5kData
      ? 'Estimated 5K will populate after you save a qualifying running calculation.\nIt is derived from your most recent race performance.'
      : activeMetric.id === 'running' && activeRunningTrack
        ? `No ${activeRunningTrack.label} results in this range.\nSave a result or choose another distance.`
        : `No ${activeMetric.label} results in this range.\nSave a result or choose another metric.`
    : 'Complete your first assessment to begin tracking progress.'

  const handleLogout = async () => {
    setBusy(true)
    setError('')
    try {
      clearCachedDashboardRecords()
      await signOut()
      onOpenTab?.('home')
    } catch (err) {
      setError(err.message || 'Could not log out.')
      setBusy(false)
    }
  }

  if (authLoading) {
    return (
      <main className="page">
        <p className="calc-hint">Loading dashboard…</p>
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className="page dashboard-page dashboard-page-locked">
        <LockedDashboardPreview
          onRequestAuth={(mode) => {
            if (onRequestAuth) onRequestAuth(mode)
            else onOpenTab?.('login')
          }}
        />
      </main>
    )
  }

  return (
    <main className="page dashboard-page">
      <header
        className={`page-header dashboard-hero${
          model.fpcScore ? ' has-score-ring' : ''
        }`}
      >
        <div className="dashboard-hero-copy">
          <p className="page-eyebrow">Dashboard</p>
          <h1>Welcome, {firstName || 'Athlete'}</h1>
          <p className="page-lead">Your Fitness Progress</p>
        </div>

        {model.fpcScore ? (
          <div className="dashboard-score-block">
            <FitnessAwardsDisplay
              awards={resolvedAwards?.awards ?? null}
              runningScore={resolvedAwards?.runningScore}
              strengthScore={resolvedAwards?.strengthScore}
            >
              <FpcScoreRing
                score={model.fpcScore.value}
                secondary={model.fpcScore.secondary}
                trend={model.fpcScore.trend}
                onClick={() => onOpenTab?.(model.fpcScore.tab)}
              />
            </FitnessAwardsDisplay>
            <FitnessAwardsLegend awards={resolvedAwards?.awards ?? null} />
          </div>
        ) : null}
      </header>

      {error ? <p className="feedback feedback-error">{error}</p> : null}

      {showOnboarding && user?.id ? (
        <OnboardingWizard
          userId={user.id}
          onOpenTab={onOpenTab}
          onDismiss={() => setShowOnboarding(false)}
        />
      ) : null}

      {user?.id ? <WeekRecapCard userId={user.id} onOpenTab={onOpenTab} /> : null}

      {user?.id ? (
        <DashboardResumeStrip userId={user.id} onOpenTab={onOpenTab} />
      ) : null}

      {user?.id ? (
        <DashboardThisWeekStrip userId={user.id} onOpenTab={onOpenTab} />
      ) : null}

      {loadingData && !model.hasAnyData ? (
        <p className="calc-hint dashboard-loading-hint">
          Loading your performance data…
        </p>
      ) : null}

      {!loadingData && !model.hasAnyData ? (
        <section className="dashboard-empty account-card">
          <p className="dashboard-empty-copy">
            Complete your first assessment to begin tracking progress. Sample
            cards below show where your results will appear.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onOpenTab?.('scoring')}
          >
            Calculate Your{' '}
            <span className={BRAND_CASING_CLASS}>{BRAND.scoreName}</span>
          </button>
        </section>
      ) : null}

      {!loadingData || model.hasAnyData ? (
        <>
      <section className="dashboard-section" aria-labelledby="dash-summary">
        <h2 id="dash-summary" className="result-section-title">
          Performance summary
        </h2>
        <div className="dashboard-card-grid">
          {model.summaryCards.map((card) => (
            <DashboardMetricCard
              key={card.id}
              card={card}
              onOpenTab={onOpenTab}
            />
          ))}
        </div>
      </section>

      <section
        className="dashboard-section"
        aria-labelledby="dash-fitness-assessments"
      >
        <h2 id="dash-fitness-assessments" className="result-section-title">
          Fitness Assessments
        </h2>
        <div className="dashboard-card-grid">
          {model.fitnessAssessmentSummaryCards.map((card) => (
            <DashboardMetricCard
              key={card.id}
              card={card}
              onOpenTab={onOpenTab}
            />
          ))}
        </div>
      </section>

      <section
        className="dashboard-section"
        aria-labelledby="dash-military-assessments"
      >
        <h2 id="dash-military-assessments" className="result-section-title">
          Military Assessments
        </h2>
        <div className="dashboard-card-grid">
          {model.assessmentSummaryCards.map((card) => (
            <DashboardMetricCard
              key={card.id}
              card={card}
              onOpenTab={onOpenTab}
            />
          ))}
        </div>
      </section>
        </>
      ) : null}

      <DashboardHabitsSection
        habitState={habitState}
        setHabitState={setHabitState}
        todayKey={todayKey}
        userId={user?.id}
        onOpenTab={onOpenTab}
      />

      {!loadingData || model.hasAnyData ? (
        <>
      {model.recentActivity.length ? (
        <section className="dashboard-section" aria-labelledby="dash-activity">
          <h2 id="dash-activity" className="result-section-title">
            Recent activity
          </h2>
          <ul className="dashboard-activity-list">
            {model.recentActivity
              .slice(0, RECENT_ACTIVITY_PREVIEW)
              .map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="dashboard-activity-item"
                    onClick={() => onOpenTab?.(item.tab)}
                  >
                    <span className="dashboard-activity-date">
                      {item.dateLabel}
                    </span>
                    <span className="dashboard-activity-title">
                      {item.title}
                    </span>
                    <strong className="dashboard-activity-value">
                      {item.valueLabel}
                    </strong>
                  </button>
                </li>
              ))}
          </ul>
          {model.recentActivity.length > RECENT_ACTIVITY_PREVIEW ? (
            <>
              <SoftReveal open={activityExpanded}>
                <ul className="dashboard-activity-list dashboard-activity-list-more">
                  {model.recentActivity
                    .slice(RECENT_ACTIVITY_PREVIEW)
                    .map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className="dashboard-activity-item"
                          onClick={() => onOpenTab?.(item.tab)}
                        >
                          <span className="dashboard-activity-date">
                            {item.dateLabel}
                          </span>
                          <span className="dashboard-activity-title">
                            {item.title}
                          </span>
                          <strong className="dashboard-activity-value">
                            {item.valueLabel}
                          </strong>
                        </button>
                      </li>
                    ))}
                </ul>
              </SoftReveal>
              <button
                type="button"
                className="dashboard-activity-expand"
                onClick={() => setActivityExpanded((open) => !open)}
                aria-expanded={activityExpanded}
              >
                {activityExpanded
                  ? 'Show less'
                  : `Show more (${model.recentActivity.length - RECENT_ACTIVITY_PREVIEW} more)`}
              </button>
            </>
          ) : null}
        </section>
      ) : null}

      <section className="dashboard-section" aria-labelledby="dash-graph">
        <h2 id="dash-graph" className="result-section-title">
          Progress overview
        </h2>

        <div className="graph-track-selector" role="tablist" aria-label="Metric">
          {DASHBOARD_GRAPH_METRICS.map((metric) => {
            const brandCasing =
              metric.id === 'fpc-score' || metric.label === BRAND.scoreName
            return (
              <button
                key={metric.id}
                type="button"
                role="tab"
                className={`graph-track-btn${metricId === metric.id ? ' is-active' : ''}${brandCasing ? ' brand-casing' : ''}`}
                aria-selected={metricId === metric.id}
                onClick={() => setMetricId(metric.id)}
              >
                {metric.label}
              </button>
            )
          })}
        </div>

        {activeMetric.id === 'running' ? (
          <GraphTrackSelector
            tracks={RUNNING_GRAPH_TRACKS}
            activeId={activeRunningTrack?.id}
            onChange={(trackId) => {
              setRunningTrackTouched(true)
              setRunningTrackId(trackId)
            }}
          />
        ) : null}

        <ProgressGraph
          records={graphRecords}
          yAxisLabel={graphYAxisLabel}
          valueKind={activeMetric.valueKind}
          emptyMessage={graphEmptyMessage}
        />
        <GraphRangeToggle value={graphRange} onChange={setGraphRange} />
      </section>

      {(model.personalRecords.strength.length ||
        model.personalRecords.running.length) && (
        <section className="dashboard-section" aria-labelledby="dash-prs">
          <h2 id="dash-prs" className="result-section-title">
            Personal records
          </h2>
          <div className="dashboard-pr-grid">
            {model.personalRecords.strength.length ? (
              <div className="account-card">
                <h3 className="dashboard-subtitle">Strength</h3>
                <ul className="result-table">
                  {model.personalRecords.strength.map((item) => (
                    <li key={item.id}>
                      <span>{item.label}</span>
                      <strong>{item.valueLabel}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {model.personalRecords.running.length ? (
              <div className="account-card">
                <h3 className="dashboard-subtitle">Running</h3>
                <ul className="result-table">
                  {model.personalRecords.running.map((item) => (
                    <li key={item.id}>
                      <span>{item.label}</span>
                      <strong>{item.valueLabel}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      )}
        </>
      ) : null}

      <section
        className="dashboard-section account-card"
        aria-labelledby="dash-account"
      >
        <h2 id="dash-account" className="result-section-title">
          Profile settings
        </h2>
        <ul className="result-table">
          <li>
            <span>First name</span>
            <strong>{firstName || '—'}</strong>
          </li>
          <li>
            <span>Email</span>
            <strong>{profile?.email || user?.email || '—'}</strong>
          </li>
          <li>
            <span>Member since</span>
            <strong>
              {formatDate(profile?.created_at || user?.created_at)}
            </strong>
          </li>
        </ul>

        <h3 className="dashboard-subtitle">Account actions</h3>
        <div className="confirm-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => onOpenTab?.('account')}
            disabled={busy}
          >
            Account Settings
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleLogout}
            disabled={busy}
          >
            {busy ? 'Logging out…' : 'Log out'}
          </button>
        </div>
      </section>
    </main>
  )
}

function DashboardHabitsSection({
  habitState,
  setHabitState,
  todayKey,
  userId,
  onOpenTab,
}) {
  const progress = habitDayProgress(
    todayKey,
    habitState.habits,
    habitState.checkins,
    todayKey,
  )
  const streak = computeHabitStreak(habitState.habits, habitState.checkins, {
    todayKey,
  })
  const atRisk = resolveHabitStreakAtRisk(
    habitState.habits,
    habitState.checkins,
    todayKey,
  )

  return (
    <section
      className="dashboard-section account-card dashboard-habits"
      aria-labelledby="dash-habits"
    >
      <h2 id="dash-habits" className="result-section-title">
        Habits
      </h2>
      {atRisk ? (
        <p className="habit-at-risk-banner" role="status">
          🔥 Streak at risk — {atRisk.streakAtRisk} day
          {atRisk.streakAtRisk === 1 ? '' : 's'} on the line. Today{' '}
          {atRisk.progress.ratioLabel}.
        </p>
      ) : null}
      {habitState.loading ? <p className="calc-hint">Loading habits…</p> : null}
      {habitState.error ? (
        <p className="feedback feedback-error">{habitState.error}</p>
      ) : null}
      {!habitState.loading && habitState.habits.length === 0 ? (
        <p className="dashboard-empty-copy">
          Start a habit in your routine to track daily completion.
        </p>
      ) : null}
      {!habitState.loading && habitState.habits.length > 0 ? (
        <>
          <p className="calc-hint">
            Today {progress.ratioLabel}
            {' · '}
            Streak {streak} day{streak === 1 ? '' : 's'}
          </p>
          <ul className="habits-check-list habits-check-list-compact">
            {habitState.habits.map((habit) => {
              const checked = habitState.checkins.some(
                (row) =>
                  row.habit_id === habit.id &&
                  String(row.checkin_date) === todayKey &&
                  row.completed,
              )
              return (
                <li key={habit.id} className="habits-check-item">
                  <label className="habits-check-label">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={async (event) => {
                        if (!userId) return
                        const next = event.target.checked
                        const previous = habitState.checkins
                        setHabitState((prev) => ({
                          ...prev,
                          error: '',
                          checkins: [
                            ...prev.checkins.filter(
                              (row) =>
                                !(
                                  row.habit_id === habit.id &&
                                  String(row.checkin_date) === todayKey
                                ),
                            ),
                            {
                              habit_id: habit.id,
                              checkin_date: todayKey,
                              completed: next,
                              user_id: userId,
                            },
                          ],
                        }))
                        try {
                          const saved = await setHabitCheckin(
                            userId,
                            habit.id,
                            next,
                            todayKey,
                          )
                          setHabitState((prev) => ({
                            ...prev,
                            checkins: [
                              ...prev.checkins.filter(
                                (row) =>
                                  !(
                                    row.habit_id === habit.id &&
                                    String(row.checkin_date) === todayKey
                                  ),
                              ),
                              saved,
                            ],
                          }))
                        } catch (err) {
                          setHabitState((prev) => ({
                            ...prev,
                            checkins: previous,
                            error: friendlyHabitError(
                              err,
                              'Could not save check-in.',
                            ),
                          }))
                        }
                      }}
                    />
                    <span>{habitDisplayName(habit)}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </>
      ) : null}
      <div className="confirm-actions">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onOpenTab?.('habits')}
        >
          Open Habits
        </button>
      </div>
    </section>
  )
}

export default DashboardPage
