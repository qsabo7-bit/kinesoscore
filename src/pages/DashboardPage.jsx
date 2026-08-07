import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useUserDefaults } from '../auth/UserDefaultsContext'
import FpcScoreRing from '../components/FpcScoreRing'
import LockedDashboardPreview from '../components/LockedDashboardPreview'
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
  filterRecordsByRange,
  recordsInMassUnit,
} from '../lib/performanceRecords'
import {
  buildDerivedEstimated5kRecords,
  isActualRunningExerciseName,
} from '../lib/runningTracking'

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

/** Keep last dashboard payload so revisits don't flash empty → loaded. */
let dashboardRecordsCache = { userId: null, records: [] }

function readCachedRecords(userId) {
  if (!userId || dashboardRecordsCache.userId !== userId) return null
  return dashboardRecordsCache.records
}

function writeCachedRecords(userId, records) {
  dashboardRecordsCache = { userId, records }
}

function clearCachedRecords() {
  dashboardRecordsCache = { userId: null, records: [] }
}

function DashboardPage({ onOpenTab, onRequestAuth }) {
  const {
    user,
    profile,
    firstName,
    signOut,
    deleteAccount,
    loading: authLoading,
    isAuthenticated,
  } = useAuth()
  const { defaults } = useUserDefaults()

  const cachedRecords = readCachedRecords(user?.id)
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
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [activityExpanded, setActivityExpanded] = useState(false)

  useEffect(() => {
    setRunningTrackId(PREFERRED_RUNNING_TRACK_ID)
    setRunningTrackTouched(false)
  }, [user?.id])

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setRecords([])
      setLoadingData(false)
      return undefined
    }

    let cancelled = false
    const cached = readCachedRecords(user.id)
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
        writeCachedRecords(user.id, rows)
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
      clearCachedRecords()
      await signOut()
      onOpenTab?.('home')
    } catch (err) {
      setError(err.message || 'Could not log out.')
      setBusy(false)
    }
  }

  const handleDeleteAccount = async () => {
    setBusy(true)
    setError('')
    try {
      clearCachedRecords()
      await deleteAccount()
      onOpenTab?.('home')
    } catch (err) {
      setError(
        err.message ||
          'Could not delete account. Run supabase/schema.sql so delete_own_account exists.',
      )
      setBusy(false)
      setConfirmDelete(false)
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
          onRequestAuth={() => onRequestAuth?.() || onOpenTab?.('login')}
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
          <FpcScoreRing
            score={model.fpcScore.value}
            secondary={model.fpcScore.secondary}
            trend={model.fpcScore.trend}
            onClick={() => onOpenTab?.(model.fpcScore.tab)}
          />
        ) : null}
      </header>

      {error ? <p className="feedback feedback-error">{error}</p> : null}

      {loadingData && !model.hasAnyData ? (
        <p className="calc-hint dashboard-loading-hint">
          Loading your performance data…
        </p>
      ) : null}

      {!loadingData && !model.hasAnyData ? (
        <section className="dashboard-empty account-card">
          <p className="dashboard-empty-copy">
            Complete your first assessment to begin tracking progress.
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
      {model.summaryCards.length ? (
        <section className="dashboard-section" aria-labelledby="dash-summary">
          <h2 id="dash-summary" className="result-section-title">
            Performance summary
          </h2>
          <div className="dashboard-card-grid">
            {model.summaryCards.map((card) => (
              <button
                key={card.id}
                type="button"
                className={`dashboard-metric-card${
                  card.isPrompt ? ' is-prompt' : ''
                }`}
                onClick={() => onOpenTab?.(card.tab)}
              >
                <p className="result-label">{card.title}</p>
                <p className="dashboard-metric-value">{card.primary}</p>
                <p className="dashboard-metric-secondary">{card.secondary}</p>
                {card.trend ? (
                  <p
                    className={`dashboard-metric-trend${
                      card.trend.tone === 'good'
                        ? ' is-trend-good'
                        : card.trend.tone === 'bad'
                          ? ' is-trend-bad'
                          : ''
                    }`}
                  >
                    {card.trend.value}
                  </p>
                ) : null}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {model.assessmentSummaryCards.length ? (
        <section
          className="dashboard-section"
          aria-labelledby="dash-assessments"
        >
          <h2 id="dash-assessments" className="result-section-title">
            Fitness assessment summary
          </h2>
          <div className="dashboard-card-grid">
            {model.assessmentSummaryCards.map((card) => (
              <button
                key={card.id}
                type="button"
                className="dashboard-metric-card"
                onClick={() => onOpenTab?.(card.tab)}
              >
                <p className="result-label">
                  {card.title}
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
                  <p
                    className={`dashboard-metric-trend${
                      card.trend.tone === 'good'
                        ? ' is-trend-good'
                        : card.trend.tone === 'bad'
                          ? ' is-trend-bad'
                          : ''
                    }`}
                  >
                    {card.trend.value}
                  </p>
                ) : null}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {model.recentActivity.length ? (
        <section className="dashboard-section" aria-labelledby="dash-activity">
          <h2 id="dash-activity" className="result-section-title">
            Recent activity
          </h2>
          <ul className="dashboard-activity-list">
            {(activityExpanded
              ? model.recentActivity
              : model.recentActivity.slice(0, RECENT_ACTIVITY_PREVIEW)
            ).map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className="dashboard-activity-item"
                  onClick={() => onOpenTab?.(item.tab)}
                >
                  <span className="dashboard-activity-date">
                    {item.dateLabel}
                  </span>
                  <span className="dashboard-activity-title">{item.title}</span>
                  <strong className="dashboard-activity-value">
                    {item.valueLabel}
                  </strong>
                </button>
              </li>
            ))}
          </ul>
          {model.recentActivity.length > RECENT_ACTIVITY_PREVIEW ? (
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
            onClick={handleLogout}
            disabled={busy}
          >
            {busy && !confirmDelete ? 'Logging out…' : 'Log out'}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => {
              setError('')
              setConfirmDelete(true)
            }}
            disabled={busy}
          >
            Delete Account
          </button>
        </div>

        {confirmDelete ? (
          <div className="confirm-box confirm-box-danger" role="alertdialog">
            <p>
              <strong>Delete your account permanently?</strong> This ends your
              session and removes your account and associated data. This cannot
              be undone.
            </p>
            <div className="confirm-actions">
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDeleteAccount}
                disabled={busy}
              >
                {busy ? 'Deleting…' : 'Yes, delete my account'}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setConfirmDelete(false)}
                disabled={busy}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </section>
    </main>
  )
}

export default DashboardPage
