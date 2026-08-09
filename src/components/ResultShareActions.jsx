import { useState } from 'react'
import { BRAND } from '../data/brand'

const DEFAULT_SHARE_URL = 'https://kinesoscore.com'

/**
 * Build a short, channel-ready caption from the calculator result line.
 */
function buildShareCaption(text, title) {
  const line = String(text || '').trim()
  if (line) return line
  return `Check out my ${title} on ${BRAND.short}.`
}

/**
 * Post-result share climax: copy, native share, and social intents.
 *
 * Instagram has no web post intent, so that action copies a caption and opens Instagram.
 *
 * @param {{
 *   title?: string,
 *   text: string,
 *   url?: string,
 * }} props
 */
function ResultShareActions({
  title = BRAND.scoreName,
  text,
  url,
}) {
  const [status, setStatus] = useState('')
  const shareUrl =
    url ||
    (typeof window !== 'undefined' ? window.location.href : DEFAULT_SHARE_URL)
  const caption = buildShareCaption(text, title)
  const captionWithLink = `${caption}\n\n${shareUrl}`
  const xText = `${caption}\n\n${shareUrl}`

  const canNativeShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  const flash = (message) => {
    setStatus(message)
    window.setTimeout(() => {
      setStatus((current) => (current === message ? '' : current))
    }, 2500)
  }

  const writeCaption = async () => {
    await navigator.clipboard.writeText(captionWithLink)
  }

  const copyCaption = async () => {
    try {
      await writeCaption()
      flash('Link copied')
    } catch {
      flash('Couldn’t copy — try again')
    }
  }

  const nativeShare = async () => {
    try {
      await navigator.share({
        title,
        text: caption,
        url: shareUrl,
      })
    } catch {
      // User cancelled or share failed — ignore.
    }
  }

  const shareInstagram = async () => {
    try {
      await writeCaption()
      flash('Caption copied — paste in Instagram')
    } catch {
      flash('Open Instagram and paste your result manually')
    }
    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer')
  }

  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(xText)}`
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl,
  )}&quote=${encodeURIComponent(caption)}`

  return (
    <div className="result-share" aria-label="Share your result">
      <p className="result-share-label">Share your result</p>
      <div className="result-share-actions">
        <button type="button" className="btn btn-ghost" onClick={copyCaption}>
          {status === 'Link copied' ? 'Copied' : 'Copy link'}
        </button>
        {canNativeShare ? (
          <button type="button" className="btn btn-ghost" onClick={nativeShare}>
            Share…
          </button>
        ) : null}
        <a
          className="btn btn-ghost"
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </a>
        <a
          className="btn btn-ghost"
          href={facebookHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={shareInstagram}
          aria-label="Copy caption and open Instagram"
        >
          Instagram
        </button>
      </div>
      {status ? (
        <p className="result-share-status" role="status" aria-live="polite">
          {status}
        </p>
      ) : null}
    </div>
  )
}

export default ResultShareActions
