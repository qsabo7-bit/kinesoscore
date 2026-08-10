import { useState } from 'react'
import {
  renderShareMomentCardBlob,
  shareOrDownloadMomentCard,
} from '../lib/shareMomentCard'

/**
 * One-click PNG moment card (native share when available, else download).
 */
function ShareMomentButton({
  title,
  primary,
  secondary,
  filename,
  label = 'Share image',
  className = 'btn btn-ghost',
  disabled = false,
}) {
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  if (!primary) return null

  const handleClick = async () => {
    if (busy) return
    setBusy(true)
    setMessage('')
    try {
      const blob = await renderShareMomentCardBlob({
        title,
        primary,
        secondary,
      })
      const mode = await shareOrDownloadMomentCard(blob, filename)
      setMessage(mode === 'shared' ? 'Shared.' : 'Image saved.')
    } catch (err) {
      if (err?.name === 'AbortError') {
        setMessage('')
      } else {
        setMessage(err?.message || 'Could not create image.')
      }
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
      >
        {busy ? 'Preparing…' : label}
      </button>
      {message ? (
        <p className="feedback feedback-success share-moment-status" role="status">
          {message}
        </p>
      ) : null}
    </div>
  )
}

export default ShareMomentButton
