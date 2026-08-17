import { useState } from 'react'
import ShareMomentButton from './ShareMomentButton'
import { BRAND } from '../data/brand'

const DISMISS_KEY = 'ks-guest-save-score-dismissed'

function readDismissed() {
  try {
    return sessionStorage.getItem(DISMISS_KEY) === '1'
  } catch {
    return false
  }
}

/**
 * Guest-only soft CTA after a myKinesoScore result.
 * Score stays visible; this asks to save + unlock dashboard — not a hard gate.
 */
function GuestSaveScorePrompt({
  score,
  placeLabel = null,
  placeRank = null,
  boardLabel = 'This Week',
  onRequestAuth,
}) {
  const [dismissed, setDismissed] = useState(readDismissed)

  if (dismissed) return null

  const rounded =
    score != null && Number.isFinite(Number(score))
      ? Math.round(Number(score))
      : null

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, '1')
    } catch {
      // sessionStorage may be unavailable; still hide for this mount.
    }
    setDismissed(true)
  }

  return (
    <aside
      className="guest-save-prompt"
      aria-label={`Save your ${BRAND.scoreName}. Create a free account.`}
    >
      <div className="guest-save-prompt-copy">
        <h2 className="guest-save-prompt-title">
          {rounded != null
            ? `Keep your ${rounded}?`
            : `Keep your ${BRAND.scoreName}?`}
        </h2>
        {placeRank ? (
          <p className="guest-save-prompt-rank">
            <span className="guest-save-prompt-hash">~#</span>
            <span className="guest-save-prompt-number">{placeRank}</span>
            <span className="guest-save-prompt-rank-label">this week</span>
          </p>
        ) : null}
        <p className="guest-save-prompt-lead">
          {placeRank
            ? 'Create a free account to save this score and claim a real This Week spot.'
            : placeLabel
              ? `${placeLabel} Create a free account to save this score and claim a real This Week spot.`
              : `Create a free account to save this score and open your private dashboard — history, trends, and This Week boards.`}
        </p>
      </div>
      <div className="guest-save-prompt-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onRequestAuth?.('signup')}
        >
          Save & claim This Week
        </button>
        {placeRank ? (
          <ShareMomentButton
            type="this_week_rank"
            title="This Week preview"
            primary={`#${placeRank}`}
            secondary={boardLabel}
            filename="kinesoscore-this-week-preview.png"
            label="Share preview"
            className="btn btn-ghost"
          />
        ) : null}
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => onRequestAuth?.('login')}
        >
          Log in
        </button>
        <button
          type="button"
          className="guest-save-prompt-dismiss"
          onClick={dismiss}
        >
          Not now
        </button>
      </div>
    </aside>
  )
}

export default GuestSaveScorePrompt
