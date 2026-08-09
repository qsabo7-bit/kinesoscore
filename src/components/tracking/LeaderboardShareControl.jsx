/**
 * Opt-in global leaderboard share control (Stage 4).
 * Default private. Only rendered for authenticated users on allowlisted tracks.
 */
function LeaderboardShareControl({
  mode,
  onChange,
  disabled = false,
  hasLeaderboardName = true,
  onRequestAccount,
}) {
  return (
    <div className="leaderboard-share-control">
      <p className="leaderboard-share-label">Global leaderboard</p>
      <p className="calc-hint leaderboard-share-hint">
        Private by default. Applies when you save. Sharing only publishes your
        Leaderboard Name and this result — never your email or first name.
        Leaderboard scores are self-reported.
      </p>
      <div
        className="leaderboard-share-toggle"
        role="group"
        aria-label="Global leaderboard sharing"
      >
        <button
          type="button"
          className={`leaderboard-share-option${mode === 'private' ? ' is-active' : ''}`}
          onClick={() => onChange('private')}
          disabled={disabled}
          aria-pressed={mode === 'private'}
        >
          Keep Private
        </button>
        <button
          type="button"
          className={`leaderboard-share-option${mode === 'global' ? ' is-active' : ''}`}
          onClick={() => onChange('global')}
          disabled={disabled}
          aria-pressed={mode === 'global'}
        >
          Share globally
        </button>
      </div>
      {mode === 'global' && !hasLeaderboardName ? (
        <p className="feedback feedback-error" role="status">
          A Leaderboard Name is required to share results globally.{' '}
          {onRequestAccount ? (
            <button
              type="button"
              className="text-link-button"
              onClick={onRequestAccount}
            >
              Add one in Account Settings
            </button>
          ) : (
            'Add one in Account Settings.'
          )}
        </p>
      ) : null}
    </div>
  )
}

export default LeaderboardShareControl
