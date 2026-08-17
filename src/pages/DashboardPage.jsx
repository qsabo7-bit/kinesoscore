import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useUserDefaults } from '../auth/UserDefaultsContext'
import FitnessAwardsDisplay, {
  FitnessAwardsLegend,
} from '../components/FitnessAwardsDisplay'
import FpcScoreRing from '../components/FpcScoreRing'
import LockedDashboardPreview from '../components/LockedDashboardPreview'
import DashboardJumpNav from '../components/DashboardJumpNav'
import DashboardTodayStrip from '../components/DashboardTodayStrip'
import OnboardingWizard from '../components/OnboardingWizard'
import ProfileAvatar from '../components/ProfileAvatar'
import UnitToggle from '../components/UnitToggle'
import { fetchLeaderboardName } from '../lib/leaderboardProfile'
import { shouldShowOnboarding } from '../lib/onboarding'
import {
  GraphRangeToggle,
  GraphTrackSelector,
  ProgressGraph,
} from '../components/tracking'
import { BRAND, BRAND_CASING_CLASS } from '../data/brand'
import { habitCardImage, habitDisplayName } from '../data/habitCatalog'
import { DASHBOARD_GRAPH_METRICS } from '../data/dashboardMetrics'
import { habitLevelFromXp } from '../lib/habitLevels'
import {
  computeHabitConsistency,
  consistencyTitle,
} from '../lib/habitConsistency'
import { evaluateHabitAchievementSignals } from '../lib/habitAchievementSignals'
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
  clearCachedDashboardAwards,
  readCachedDashboardAwards,
  writeCachedDashboardAwards,
} from '../lib/dashboardAwardsCache'
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
import { localDateKey, shiftLocalDateKey } from '../lib/habitDates'
import {
  fetchActiveHabits,
  fetchHabitCheckins,
  friendlyHabitError,
  setHabitCheckin,
} from '../lib/habits'
import {
  habitXpDailyRecords,
  previewHabitXpForDate,
  sumLifetimeHabitXp,
} from '../lib/habitXp'
import { habitDayProgress } from '../lib/habitStreaks'
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

const RECENT_ACTIVITY_PREVIEW = 4
/** Enough saved results that the full three-grid layout becomes noisy. */
const DENSE_RECORD_THRESHOLD = 4
const HIGHLIGHT_CARD_LIMIT = 6

function isFilledCard(card) {
  return Boolean(card) && !card.isSample && !card.isPrompt
}

function pickHighlightCards(model, limit = HIGHLIGHT_CARD_LIMIT) {
  const pools = [
    model.summaryCards,
    model.fitnessAssessmentSummaryCards,
    model.assessmentSummaryCards,
  ]
  const out = []
  for (const pool of pools) {
    for (const card of pool || []) {
      if (!isFilledCard(card)) continue
      if (out.some((row) => row.id === card.id)) continue
      out.push(card)
      if (out.length >= limit) return out
    }
  }
  if (out.length === 0 && model.summaryCards?.length) {
    return model.summaryCards.slice(0, limit)
  }
  return out
}

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
    avatarId,
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
  const [metricsPanel, setMetricsPanel] = useState('highlights')
  const [habitState, setHabitState] = useState({
    habits: [],
    checkins: [],
    loading: false,
    error: '',
  })
  /** @type {[{ awards: object, runningScore: number, strengthScore: number } | null, Function]} */
  const [awardState, setAwardState] = useState(() =>
    readCachedDashboardAwards(user?.id),
  )
  const [showOnboarding, setShowOnboarding] = useState(false)
  const todayKey = localDateKey()
  const habitProgress = useMemo(
    () =>
      habitDayProgress(
        todayKey,
        habitState.habits,
        habitState.checkins,
        todayKey,
      ),
    [habitState.habits, habitState.checkins, todayKey],
  )
  const habitLifetimeXp = useMemo(
    () => sumLifetimeHabitXp(habitState.checkins),
    [habitState.checkins],
  )
  const habitLevelState = useMemo(
    () => habitLevelFromXp(habitLifetimeXp),
    [habitLifetimeXp],
  )

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

    const cachedAwards = readCachedDashboardAwards(user.id)
    if (cachedAwards) {
      setAwardState(cachedAwards)
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
          writeCachedDashboardAwards(user.id, null)
          setAwardState(null)
          return
        }
        const runningScore = Number(snapshot.running_score)
        const strengthScore = Number(snapshot.strength_score)
        const next = {
          fitnessScore: Number(snapshot.fitness_score),
          runningScore,
          strengthScore,
          awards: deriveAwards({ runningScore, strengthScore }),
        }
        writeCachedDashboardAwards(user.id, next)
        setAwardState(next)
      })
      .catch((err) => {
        if (cancelled) return
        // Awards are optional enrichment; do not block the dashboard.
        console.warn(friendlyFitnessSnapshotError(err, 'Could not load awards.'))
        // Keep any warm cache so badges don't disappear on a flaky fetch.
        if (!readCachedDashboardAwards(user.id)) {
          setAwardState(null)
        }
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

  const isDense =
    model.hasAnyData && records.length >= DENSE_RECORD_THRESHOLD
  const highlightCards = useMemo(
    () => pickHighlightCards(model),
    [model],
  )

  useEffect(() => {
    if (!isDense && metricsPanel === 'highlights') {
      setMetricsPanel('performance')
    }
  }, [isDense, metricsPanel])

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
      clearCachedDashboardAwards()
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

  const metricsCardsForPanel =
    metricsPanel === 'highlights'
      ? highlightCards
      : metricsPanel === 'fitness'
        ? model.fitnessAssessmentSummaryCards
        : metricsPanel === 'military'
          ? model.assessmentSummaryCards
          : model.summaryCards

  const progressBody = (
    <>
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

      {model.personalRecords.strength.length ||
      model.personalRecords.running.length ? (
        <div className="dashboard-progress-prs">
          <h3 className="dashboard-subtitle">Personal records</h3>
          <div className="dashboard-pr-grid">
            {model.personalRecords.strength.length ? (
              <div className="account-card">
                <h4 className="dashboard-subtitle">Strength</h4>
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
                <h4 className="dashboard-subtitle">Running</h4>
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
        </div>
      ) : null}
    </>
  )

  return (
    <main
      className={`page dashboard-page${isDense ? ' is-dense' : ' is-sparse'}`}
    >
      <header
        className={`page-header dashboard-hero${
          model.fpcScore ? ' has-score-ring' : ''
        }`}
      >
        <div className="dashboard-hero-copy">
          <p className="page-eyebrow">Dashboard</p>
          <div className="dashboard-welcome-row">
            <ProfileAvatar avatarId={avatarId} size="md" />
            <div className="dashboard-welcome-copy">
              <h1>Welcome, {firstName || 'Athlete'}</h1>
              {habitState.habits.length > 0 ? (
                <p className="dashboard-cross-progress">
                  Habit Lv {habitLevelState.level}
                  {resolvedAwards?.awards?.crown ? ' · Crown' : ''}
                </p>
              ) : null}
            </div>
          </div>
          <p className="page-lead">
            {isDense ? 'Your week at a glance' : 'Your Fitness Progress'}
          </p>
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
            {!isDense ? (
              <FitnessAwardsLegend awards={resolvedAwards?.awards ?? null} />
            ) : null}
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

      {user?.id ? (
        <DashboardTodayStrip
          userId={user.id}
          onOpenTab={onOpenTab}
          records={records}
          habitProgress={habitProgress}
        />
      ) : null}

      {isDense ? <DashboardJumpNav /> : null}

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
        <section
          id="dash-highlights"
          className="dashboard-section"
          aria-labelledby="dash-metrics-heading"
        >
          <h2 id="dash-metrics-heading" className="result-section-title">
            {isDense ? 'Highlights' : 'Performance summary'}
          </h2>

          {isDense ? (
            <div
              className="dashboard-metrics-tabs"
              role="tablist"
              aria-label="Metric groups"
            >
              {[
                { id: 'highlights', label: 'Highlights' },
                { id: 'performance', label: 'Performance' },
                { id: 'fitness', label: 'Fitness' },
                { id: 'military', label: 'Military' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  className={`dashboard-metrics-tab${
                    metricsPanel === tab.id ? ' is-active' : ''
                  }`}
                  aria-selected={metricsPanel === tab.id}
                  onClick={() => setMetricsPanel(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          ) : null}

          {isDense ? (
            <div className="dashboard-card-grid">
              {metricsCardsForPanel.map((card) => (
                <DashboardMetricCard
                  key={card.id}
                  card={card}
                  onOpenTab={onOpenTab}
                />
              ))}
            </div>
          ) : (
            <>
              <div className="dashboard-card-grid">
                {model.summaryCards.map((card) => (
                  <DashboardMetricCard
                    key={card.id}
                    card={card}
                    onOpenTab={onOpenTab}
                  />
                ))}
              </div>

              <h3
                id="dash-fitness-assessments"
                className="dashboard-subtitle"
              >
                Fitness Assessments
              </h3>
              <div className="dashboard-card-grid">
                {model.fitnessAssessmentSummaryCards.map((card) => (
                  <DashboardMetricCard
                    key={card.id}
                    card={card}
                    onOpenTab={onOpenTab}
                  />
                ))}
              </div>

              <h3
                id="dash-military-assessments"
                className="dashboard-subtitle"
              >
                Military Assessments
              </h3>
              <div className="dashboard-card-grid">
                {model.assessmentSummaryCards.map((card) => (
                  <DashboardMetricCard
                    key={card.id}
                    card={card}
                    onOpenTab={onOpenTab}
                  />
                ))}
              </div>
            </>
          )}
        </section>
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
            <section
              id="dash-activity"
              className="dashboard-section"
              aria-labelledby="dash-activity-heading"
            >
              <h2 id="dash-activity-heading" className="result-section-title">
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
                <p className="calc-hint dashboard-activity-more-hint">
                  Showing latest {RECENT_ACTIVITY_PREVIEW}. Open a calculator
                  from Highlights to dig into full history.
                </p>
              ) : null}
            </section>
          ) : null}

          {isDense ? (
            <details
              id="dash-progress"
              className="dashboard-section dashboard-progress-details"
            >
              <summary className="dashboard-progress-summary">
                <span className="dashboard-progress-summary-copy">
                  <span className="result-section-title">
                    Progress &amp; PRs
                  </span>
                  <span className="dashboard-progress-summary-hint">
                    Charts and personal records
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
              <div className="dashboard-progress-body">{progressBody}</div>
            </details>
          ) : (
            <section
              id="dash-progress"
              className="dashboard-section"
              aria-labelledby="dash-graph"
            >
              <h2 id="dash-graph" className="result-section-title">
                Progress overview
              </h2>
              {progressBody}
            </section>
          )}
        </>
      ) : null}

      <section
        id="dash-account"
        className="dashboard-section account-card"
        aria-labelledby="dash-account-heading"
      >
        <h2 id="dash-account-heading" className="result-section-title">
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

function readDashboardHabitsExpanded(fallback) {
  try {
    const raw = localStorage.getItem('ks.dashboard.habitsExpanded')
    if (raw === '1') return true
    if (raw === '0') return false
  } catch {
    // ignore
  }
  return fallback
}

function writeDashboardHabitsExpanded(open) {
  try {
    localStorage.setItem('ks.dashboard.habitsExpanded', open ? '1' : '0')
  } catch {
    // ignore
  }
}

function DashboardHabitsSection({
  habitState,
  setHabitState,
  todayKey,
  userId,
  onOpenTab,
}) {
  const [xpRange, setXpRange] = useState('1m')
  const [showChart, setShowChart] = useState(false)
  const progress = habitDayProgress(
    todayKey,
    habitState.habits,
    habitState.checkins,
    todayKey,
  )
  const lifetimeXp = sumLifetimeHabitXp(habitState.checkins)
  const levelState = useMemo(() => habitLevelFromXp(lifetimeXp), [lifetimeXp])
  const consistency30 = useMemo(
    () =>
      computeHabitConsistency(habitState.habits, habitState.checkins, {
        windowDays: 30,
        todayKey,
      }),
    [habitState.habits, habitState.checkins, todayKey],
  )
  const todayXpEarned = useMemo(() => {
    let total = 0
    for (const row of habitState.checkins) {
      if (String(row.checkin_date) !== todayKey) continue
      if (!row.completed) continue
      const xp = Number(row.xp_awarded)
      if (Number.isFinite(xp) && xp > 0) total += Math.floor(xp)
    }
    return total
  }, [habitState.checkins, todayKey])

  const incompleteToday =
    progress.total > 0 && progress.completed < progress.total

  const [expanded, setExpanded] = useState(() =>
    readDashboardHabitsExpanded(incompleteToday),
  )

  useEffect(() => {
    if (habitState.loading) return
    try {
      if (localStorage.getItem('ks.dashboard.habitsExpanded') != null) return
    } catch {
      // ignore
    }
    setExpanded(incompleteToday)
  }, [habitState.loading, incompleteToday])

  const xpSeries = useMemo(
    () => habitXpDailyRecords(habitState.checkins, xpRange, todayKey),
    [habitState.checkins, xpRange, todayKey],
  )
  const xpChartRecords = useMemo(
    () => xpSeries.filter((row) => Number(row.result_value) > 0),
    [xpSeries],
  )

  const hasHabits = !habitState.loading && habitState.habits.length > 0
  const ringSize = 44
  const ringStroke = 4
  const ringRadius = (ringSize - ringStroke) / 2
  const ringCirc = 2 * Math.PI * ringRadius
  const levelOffset = ringCirc * (1 - levelState.progress)

  return (
    <details
      id="dash-habits"
      className={`dashboard-section dashboard-progress-details dashboard-habits${
        incompleteToday ? ' is-at-risk' : ''
      }`}
      open={expanded}
      onToggle={(event) => {
        const next = event.currentTarget.open
        setExpanded(next)
        writeDashboardHabitsExpanded(next)
      }}
    >
      <summary className="dashboard-progress-summary dashboard-habits-summary">
        <span className="dashboard-habits-summary-leading">
          {hasHabits ? (
            <span className="dashboard-habits-mini-orb" aria-hidden="true">
              <svg width={ringSize} height={ringSize} viewBox={`0 0 ${ringSize} ${ringSize}`}>
                <circle
                  className="habits-level-ring-track"
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={ringRadius}
                  fill="none"
                  strokeWidth={ringStroke}
                />
                <circle
                  className="habits-level-ring-fill"
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={ringRadius}
                  fill="none"
                  strokeWidth={ringStroke}
                  strokeDasharray={ringCirc}
                  strokeDashoffset={levelOffset}
                  strokeLinecap="square"
                  transform={`rotate(-90 ${ringSize / 2} ${ringSize / 2})`}
                />
              </svg>
              <span className="dashboard-habits-mini-level">{levelState.level}</span>
            </span>
          ) : null}
          <span className="dashboard-progress-summary-copy">
            <span className="result-section-title">Habits</span>
            <span className="dashboard-progress-summary-hint">
              {hasHabits
                ? `${lifetimeXp.toLocaleString()} XP · Today ${progress.ratioLabel}${
                    todayXpEarned > 0 ? ` · +${todayXpEarned}` : ''
                  } · ${consistency30.label} steady`
                : 'XP cards and daily check-ins'}
            </span>
            {hasHabits ? (
              <span className="dashboard-habits-pills">
                <span className="dashboard-habits-pill">Lv {levelState.level}</span>
                <span className="dashboard-habits-pill">
                  {consistencyTitle(consistency30.percent)}
                </span>
                <span
                  className={`dashboard-habits-pill${
                    incompleteToday ? ' is-warn' : ' is-ok'
                  }`}
                >
                  Today {progress.ratioLabel}
                </span>
              </span>
            ) : null}
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

      <div className="dashboard-progress-body dashboard-habits-panel">
        {habitState.loading ? <p className="calc-hint">Loading habits…</p> : null}
        {habitState.error ? (
          <p className="feedback feedback-error">{habitState.error}</p>
        ) : null}

        {!habitState.loading && habitState.habits.length === 0 ? (
          <p className="dashboard-empty-copy">
            Start a habit in your routine to earn XP and track daily completion.
          </p>
        ) : null}

        {hasHabits ? (
          <>
            <div className="dashboard-habits-meter" aria-hidden="true">
              <span
                className="dashboard-habits-meter-fill"
                style={{ width: `${Math.round(levelState.progress * 100)}%` }}
              />
            </div>
            <p className="calc-hint dashboard-habits-level-hint">
              {levelState.xpIntoLevel.toLocaleString()} /{' '}
              {levelState.xpForNext.toLocaleString()} XP to level{' '}
              {levelState.level + 1}
              {' · '}
              Consistency {consistency30.label} (30d)
            </p>

            <ul className="habits-card-grid habits-card-grid-dashboard">
              {habitState.habits.map((habit) => {
                const checked = habitState.checkins.some(
                  (row) =>
                    row.habit_id === habit.id &&
                    String(row.checkin_date) === todayKey &&
                    row.completed,
                )
                const image = habitCardImage(habit)
                const preview = previewHabitXpForDate(
                  habit,
                  habitState.checkins,
                  todayKey,
                )
                return (
                  <li key={habit.id}>
                    <button
                      type="button"
                      className={`habit-card habit-card-compact${
                        checked ? ' is-done' : ''
                      }`}
                      aria-pressed={checked}
                      aria-label={`${habit.habit_name}${checked ? ', completed' : ''}`}
                      onClick={async () => {
                        if (!userId) return
                        const next = !checked
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
                              xp_awarded: next ? preview.xp : 0,
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
                          evaluateHabitAchievementSignals(
                            userId,
                            habitState.habits,
                            [
                              ...habitState.checkins.filter(
                                (row) =>
                                  !(
                                    row.habit_id === habit.id &&
                                    String(row.checkin_date) === todayKey
                                  ),
                              ),
                              saved,
                            ],
                            todayKey,
                          )
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
                    >
                      <span
                        className="habit-card-media"
                        style={
                          image
                            ? { backgroundImage: `url(${image})` }
                            : undefined
                        }
                      >
                        <span className="habit-card-scrim" aria-hidden="true" />
                      </span>
                      <span className="habit-card-body">
                        <span className="habit-card-title">
                          {habit.habit_name || habitDisplayName(habit)}
                        </span>
                        <span className="habit-card-meta">
                          {checked ? `+${preview.xp} XP` : `${preview.xp} XP`}
                        </span>
                      </span>
                      <span className="habit-card-check" aria-hidden="true">
                        {checked ? '✓' : ''}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="dashboard-habits-chart-wrap">
              <UnitToggle
                className="is-compact"
                label="XP chart"
                value={showChart ? 'show' : 'hide'}
                options={[
                  { value: 'hide', label: 'Hide' },
                  { value: 'show', label: 'Show' },
                ]}
                onChange={(next) => setShowChart(next === 'show')}
              />
              {showChart ? (
                <div className="dashboard-habits-chart">
                  <GraphRangeToggle value={xpRange} onChange={setXpRange} />
                  <ProgressGraph
                    records={xpChartRecords}
                    yAxisLabel="XP"
                    valueKind="number"
                    emptyMessage="No habit XP in this range yet.\nLog habits to build your daily XP chart."
                  />
                </div>
              ) : null}
            </div>
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
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => onOpenTab?.('leaderboard-habits')}
          >
            XP board
          </button>
        </div>
      </div>
    </details>
  )
}

export default DashboardPage
