import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useUserDefaults } from '../auth/UserDefaultsContext'
import FpcScoreRing from '../components/FpcScoreRing'
import LockedDashboardPreview from '../components/LockedDashboardPreview'
import {
  GraphRangeToggle,
  ProgressGraph,
} from '../components/tracking'
import { DASHBOARD_GRAPH_METRICS } from '../data/dashboardMetrics'
import {
  buildDashboardModel,
  loadDashboardRecords,
} from '../lib/dashboardData'
import {
  filterRecordsByRange,
  recordsInMassUnit,
} from '../lib/performanceRecords'

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

  const [records, setRecords] = useState([])
  const [loadingData, setLoadingData] = useState(false)
  const [error, setError] = useState('')
  const [metricId, setMetricId] = useState('fpc-score')
  const [graphRange, setGraphRange] = useState('all')
  const [busy, setBusy] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    if (!isAuthenticated || !user?.id) {
      setRecords([])
      return undefined
    }

    let cancelled = false
    setLoadingData(true)
    setError('')

    loadDashboardRecords(user.id)
      .then((rows) => {
        if (!cancelled) setRecords(rows)
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

  const activeMetric =
    DASHBOARD_GRAPH_METRICS.find((metric) => metric.id === metricId) ||
    DASHBOARD_GRAPH_METRICS[0]

  const graphRecords = useMemo(() => {
    const series = model.byMetric[activeMetric.id] || []
    const ranged = filterRecordsByRange(series, graphRange)
    if (activeMetric.valueKind === 'mass') {
      return recordsInMassUnit(ranged, 'lb')
    }
    return ranged
  }, [model.byMetric, activeMetric, graphRange])

  const handleLogout = async () => {
    setBusy(true)
    setError('')
    try {
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

      {loadingData ? (
        <p className="calc-hint">Loading your performance data…</p>
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
            Calculate Your KinesoScore
          </button>
        </section>
      ) : null}

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
                className="dashboard-metric-card"
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

      {model.recentActivity.length ? (
        <section className="dashboard-section" aria-labelledby="dash-activity">
          <h2 id="dash-activity" className="result-section-title">
            Recent activity
          </h2>
          <ul className="dashboard-activity-list">
            {model.recentActivity.map((item) => (
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
        </section>
      ) : null}

      <section className="dashboard-section" aria-labelledby="dash-graph">
        <h2 id="dash-graph" className="result-section-title">
          Progress overview
        </h2>

        <div className="graph-track-selector" role="tablist" aria-label="Metric">
          {DASHBOARD_GRAPH_METRICS.map((metric) => (
            <button
              key={metric.id}
              type="button"
              role="tab"
              className={`graph-track-btn${metricId === metric.id ? ' is-active' : ''}`}
              aria-selected={metricId === metric.id}
              onClick={() => setMetricId(metric.id)}
            >
              {metric.label}
            </button>
          ))}
        </div>

        <ProgressGraph
          records={graphRecords}
          yAxisLabel={
            activeMetric.valueKind === 'mass'
              ? `${activeMetric.yAxisLabel} (lb)`
              : activeMetric.yAxisLabel
          }
          valueKind={activeMetric.valueKind}
          emptyMessage={
            model.hasAnyData
              ? `No ${activeMetric.label} results in this range.\nSave a result or choose another metric.`
              : 'Complete your first assessment to begin tracking progress.'
          }
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
