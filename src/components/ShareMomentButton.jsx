import { useState } from 'react'
import { captureElementPng } from '../lib/captureElementPng'
import { requestShareMoment, trackShareEvent } from '../lib/shareMoments'

/**
 * Opens the global ShareMomentHost studio with the given card props.
 * Optional captureElement: share a PNG snapshot of that DOM node instead of
 * the canvas share card (used by myKinesoScore).
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
  captionOverride = null,
  modalEyebrow = null,
  modalTitle = null,
  modalLead = null,
  captureElement = null,
}) {
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)

  if (!primary) return null

  const handleClick = async () => {
    if (disabled || busy) return
    setMessage('')
    setBusy(true)
    try {
      let imageBlob = null
      if (captureElement) {
        const node =
          typeof captureElement === 'function'
            ? captureElement()
            : captureElement
        imageBlob = await captureElementPng(node, {
          pixelRatio: 2,
          backgroundColor: '#0b100e',
        })
      }
      const ok = requestShareMoment({
        type,
        title,
        primary,
        secondary,
        filename: filename || (imageBlob ? 'kinesoscore-badges.png' : undefined),
        athleteName,
        awards,
        fitnessScore,
        strengthScore,
        runningScore,
        captionOverride,
        modalEyebrow,
        modalTitle,
        modalLead: modalLead ||
          (imageBlob
            ? 'Snapshot of your score and badges — ready to attach to your post.'
            : undefined),
        imageBlob,
        autoOpen: false,
        respectDismiss: false,
      })
      trackShareEvent('share_button_click', {
        type,
        ok,
        capture: Boolean(imageBlob),
      })
      if (!ok) setMessage('Could not open share card.')
    } catch (err) {
      setMessage(err?.message || 'Could not capture share image.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="share-moment-wrap">
      <button
        type="button"
        className={className}
        onClick={handleClick}
        disabled={disabled || busy}
        aria-haspopup="dialog"
      >
        {busy ? 'Capturing…' : label}
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
