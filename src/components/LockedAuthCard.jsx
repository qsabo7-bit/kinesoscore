/**
 * Guest lock CTA with a subtle sample surface (matches locked-graph ceremony).
 */
function LockedAuthCard({
  title,
  lead,
  benefits = [],
  sampleKind = 'generic',
  onRequestAuth,
  onOpenTab,
}) {
  return (
    <div
      className="locked-graph-preview locked-auth-card-preview"
      aria-label={`${title}. Sign in to continue.`}
    >
      <div className={`locked-auth-sample is-${sampleKind}`} aria-hidden="true">
        {sampleKind === 'habits' ? (
          <ul className="locked-auth-sample-list">
            <li className="is-done">Morning movement</li>
            <li className="is-done">Protein target</li>
            <li>Sleep window</li>
          </ul>
        ) : (
          <div className="locked-auth-sample-profile">
            <span className="locked-auth-sample-name">Leaderboard Name</span>
            <span className="locked-auth-sample-meta">Account settings</span>
            <span className="locked-auth-sample-row">Profile sync</span>
            <span className="locked-auth-sample-row">Security controls</span>
          </div>
        )}
      </div>
      <div className="locked-graph-overlay">
        <div className="locked-graph-card">
          <h2 className="locked-graph-title">{title}</h2>
          {lead ? <p className="locked-graph-lead">{lead}</p> : null}
          {benefits.length ? (
            <ul className="locked-graph-benefits">
              {benefits.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          <div className="confirm-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                if (onRequestAuth) onRequestAuth('signup')
                else onOpenTab?.('login')
              }}
            >
              Create Account
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                if (onRequestAuth) onRequestAuth('login')
                else onOpenTab?.('login')
              }}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LockedAuthCard
