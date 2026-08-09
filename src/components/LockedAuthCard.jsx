/**
 * Guest lock CTA — spotlight style (one sample surface + clear auth actions).
 */
function LockedAuthCard({
  title,
  lead,
  benefits = [],
  sampleKind = 'generic',
  onRequestAuth,
  onOpenTab,
}) {
  const request = (mode) => {
    if (onRequestAuth) onRequestAuth(mode)
    else onOpenTab?.('login')
  }

  return (
    <div
      className="locked-spotlight locked-spotlight-card"
      aria-label={`${title}. Sign in to continue.`}
    >
      <div className="locked-spotlight-copy">
        <h2 className="locked-spotlight-title">{title}</h2>
        {lead ? <p className="locked-spotlight-lead">{lead}</p> : null}
      </div>

      <div
        className={`locked-spotlight-sample is-${sampleKind}`}
        aria-hidden="true"
      >
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
          onClick={() => request('signup')}
        >
          Create Account
        </button>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => request('login')}
        >
          Log in
        </button>
      </div>
    </div>
  )
}

export default LockedAuthCard
