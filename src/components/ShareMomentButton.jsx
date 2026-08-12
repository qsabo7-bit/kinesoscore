import { useState } from 'react'
import { requestShareMoment, trackShareEvent } from '../lib/shareMoments'

/**
 * Opens the global ShareMomentHost studio with the given card props.
 */
function ShareMomentButton({
  title,
  primary,
  secondary,
  filename,
  label = 'Share image',
  className = 'btn btn-ghost',
  disabled = false,
  type = 'manual',
  athleteName = null,
  awards = null,
  fitnessScore = null,
  strengthScore = null,
  runningScore = null,
}) {
  const [message, setMessage] = useState('')

  if (!primary) return null

  const handleClick = () => {
    if (disabled) return
    setMessage('')
    const ok = requestShareMoment({
      type,
      title,
      primary,
      secondary,
      filename,
      athleteName,
      awards,
      fitnessScore,
      strengthScore,
      runningScore,
      autoOpen: false,
      respectDismiss: false,
    })
    trackShareEvent('share_button_click', { type, ok })
    if (!ok) setMessage('Could not open share card.')
  }

  return (
    <div className="share-moment-wrap">
      <button
        type="button"
        className={className}
        onClick={handleClick}
        disabled={disabled}
        aria-haspopup="dialog"
      >
        {label}
      </button>
      {message ? (
        <p className="feedback feedback-error share-moment-status" role="status">
          {message}
        </p>
      ) : null}
    </div>
  )
}

export default ShareMomentButton
