import UnitToggle from '../UnitToggle'

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
      <UnitToggle
        className="is-compact is-stretch"
        label="Global leaderboard"
        value={mode === 'global' ? 'global' : 'private'}
        options={[
          { value: 'private', label: 'Private' },
          { value: 'global', label: 'Share' },
        ]}
        onChange={onChange}
        disabled={disabled}
      />
      <p className="calc-hint leaderboard-share-hint">
        Private by default. Applies when you save. Share globally to appear on
        All Time and This Week (UTC). Only your Leaderboard Name and this result
        are published — never your email or first name. Scores are self-reported.
      </p>
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
