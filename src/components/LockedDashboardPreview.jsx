import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'
import { BRAND } from '../data/brand'
import FpcScoreRing from './FpcScoreRing'
import { SAMPLE_SCORE_DATA } from '../lib/performanceRecords'
import { DASHBOARD_LOCKED_PREVIEW } from './tracking/lockedPreviewCopy'

const SAMPLE_CARDS = [
  {
    id: 'fitness-age',
    title: 'Fitness Age',
    primary: '28 yr',
    secondary: '4 years younger than actual age',
    trend: '+2 yr ↓',
    tone: 'good',
  },
  {
    id: 'bmi',
    title: 'BMI',
    primary: '23.7',
    secondary: 'Current reading',
    trend: '−1.5 BMI ↓',
    tone: 'good',
  },
  {
    id: 'strength',
    title: 'Strength',
    primary: '225 lb',
    secondary: 'Bench Press',
    trend: null,
  },
  {
    id: 'endurance',
    title: 'Endurance',
    primary: '24:18',
    secondary: '5K',
    trend: null,
  },
]

const SAMPLE_ACTIVITY = [
  { id: '1', date: 'Aug 5', title: 'Fitness Age Assessment', value: '28 yr' },
  { id: '2', date: 'Aug 3', title: 'Bench Press', value: '225 lb' },
  { id: '3', date: 'Jul 28', title: BRAND.scoreName, value: '72' },
  { id: '4', date: 'Jul 20', title: '5K', value: '24:18' },
]

function LockedDashboardPreview({ onRequestAuth }) {
  const { title, lead, benefits } = DASHBOARD_LOCKED_PREVIEW

  return (
    <div
      className="locked-dashboard-preview"
      aria-label="Dashboard locked. Log in to unlock your fitness progress."
    >
      <div className="locked-dashboard-sample" aria-hidden="true">
        <header className="page-header dashboard-hero has-score-ring">
          <div className="dashboard-hero-copy">
            <p className="page-eyebrow">Dashboard</p>
            <h1>Welcome, Athlete</h1>
            <p className="page-lead">Your Fitness Progress</p>
          </div>
          <FpcScoreRing
            score={72}
            secondary="Previous 68"
            trend={{ value: '+4 points ↑', tone: 'good' }}
            onClick={() => {}}
          />
        </header>

        <section className="dashboard-section">
          <h2 className="result-section-title">Performance summary</h2>
          <div className="dashboard-card-grid">
            {SAMPLE_CARDS.map((card) => (
              <div key={card.id} className="dashboard-metric-card">
                <p className="result-label">{card.title}</p>
                <p className="dashboard-metric-value">{card.primary}</p>
                <p className="dashboard-metric-secondary">{card.secondary}</p>
                {card.trend ? (
                  <p
                    className={`dashboard-metric-trend${
                      card.tone === 'good' ? ' is-trend-good' : ''
                    }`}
                  >
                    {card.trend}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h2 className="result-section-title">Recent activity</h2>
          <ul className="dashboard-activity-list">
            {SAMPLE_ACTIVITY.map((item) => (
              <li key={item.id}>
                <div className="dashboard-activity-item">
                  <span className="dashboard-activity-date">{item.date}</span>
                  <span className="dashboard-activity-title">{item.title}</span>
                  <strong className="dashboard-activity-value">
                    {item.value}
                  </strong>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="dashboard-section">
          <h2 className="result-section-title">Progress overview</h2>
          <div className="graph-track-selector">
            <span className="graph-track-btn is-active">{BRAND.scoreName}</span>
            <span className="graph-track-btn">Fitness Age</span>
            <span className="graph-track-btn">BMI</span>
            <span className="graph-track-btn">Bench</span>
          </div>
          <div className="progress-chart-wrap locked-dashboard-chart">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart
                data={SAMPLE_SCORE_DATA}
                margin={{ top: 12, right: 12, left: 4, bottom: 4 }}
              >
                <CartesianGrid
                  stroke="rgba(242, 247, 244, 0.08)"
                  vertical={false}
                />
                <XAxis
                  dataKey="dateLabel"
                  tick={{ fill: '#b8c4bc', fontSize: 12 }}
                  axisLine={{ stroke: 'rgba(242, 247, 244, 0.12)' }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: '#b8c4bc', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={40}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#7dffb3"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#7dffb3', strokeWidth: 0 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <div className="locked-dashboard-overlay">
        <div className="locked-graph-card">
          <h3 className="locked-graph-title">{title}</h3>
          {lead ? <p className="locked-graph-lead">{lead}</p> : null}
          {benefits?.length ? (
            <ul className="locked-graph-benefits">
              {benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onRequestAuth?.()}
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  )
}

export default LockedDashboardPreview
