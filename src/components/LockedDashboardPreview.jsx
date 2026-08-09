import { BRAND } from '../data/brand'
import FpcScoreRing from './FpcScoreRing'
import { DASHBOARD_LOCKED_PREVIEW } from './tracking/lockedPreviewCopy'

/**
 * Guest dashboard: one spotlight (score ring) + short CTA — not a full fake dashboard.
 */
function LockedDashboardPreview({ onRequestAuth }) {
  const { title, lead, benefits } = DASHBOARD_LOCKED_PREVIEW

  return (
    <div
      className="locked-spotlight"
      aria-label="Dashboard locked. Create an account to unlock your fitness progress."
    >
      <header className="page-header">
        <p className="page-eyebrow">Dashboard</p>
        <h1>{title}</h1>
        <p className="page-lead">{lead}</p>
      </header>

      <div className="locked-spotlight-stage" aria-hidden="true">
        <FpcScoreRing
          score={72}
          secondary="Sample athlete"
          trend={{ value: '+4 points ↑', tone: 'good' }}
          onClick={() => {}}
        />
      </div>

      {benefits.length ? (
        <ul className="locked-spotlight-benefits">
          {benefits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}

      <div className="confirm-actions locked-spotlight-actions">
        <button
          type="button"
          className="btn btn-primary"
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
      </div>

      <p className="calc-hint locked-spotlight-hint">
        Sample {BRAND.scoreName} preview — your real ring appears after you save
        a score.
      </p>
    </div>
  )
}

export default LockedDashboardPreview
