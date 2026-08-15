/**
 * Guest lock CTA — spotlight style (one sample surface + clear auth actions).
 * When `eyebrow` is set, renders as a full page spotlight (h1), matching Dashboard.
 */
function LockedAuthCard({
  eyebrow = '',
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

  const HeadingTag = eyebrow ? 'h1' : 'h2'

  return (
    <div
      className={`locked-spotlight${eyebrow ? '' : ' locked-spotlight-card'}`}
      aria-label={`${title}. Sign in to continue.`}
    >
      {eyebrow ? (
        <header className="page-header">
          <p className="page-eyebrow">{eyebrow}</p>
          <HeadingTag className="locked-spotlight-title">{title}</HeadingTag>
          {lead ? <p className="page-lead">{lead}</p> : null}
        </header>
      ) : (
        <div className="locked-spotlight-copy">
          <HeadingTag className="locked-spotlight-title">{title}</HeadingTag>
          {lead ? <p className="locked-spotlight-lead">{lead}</p> : null}
        </div>
      )}

      <div
        className={`locked-spotlight-sample is-${sampleKind}`}
        aria-hidden="true"
      >
        {sampleKind === 'habits' ? (
          <ul className="locked-auth-sample-list">
            <li className="is-done">Morning movement 🚶</li>
            <li className="is-done">Protein target 🥩</li>
            <li>Sleep window 😴</li>
          </ul>
        ) : sampleKind === 'groups' ? (
          <ul className="locked-auth-sample-list">
            <li className="is-done">Morning crew</li>
            <li className="is-done">Invite: KS-7F4K9P</li>
            <li>4 members</li>
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
