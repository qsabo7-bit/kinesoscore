import { useState } from 'react'
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
function GuestSaveScorePrompt({ score, onRequestAuth }) {
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
        <p className="guest-save-prompt-lead">
          Create a free account to save this score and open your private
          dashboard — history, trends, and This Week boards.
        </p>
      </div>
      <div className="guest-save-prompt-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onRequestAuth?.('signup')}
        >
          Create free account
        </button>
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
