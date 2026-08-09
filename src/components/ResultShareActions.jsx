import { useState } from 'react'
import { BRAND } from '../data/brand'

/**
 * Post-result share climax: copy, native share, and social intents.
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
  const [copied, setCopied] = useState(false)
  const shareUrl =
    url ||
    (typeof window !== 'undefined' ? window.location.href : 'https://kinesoscore.com')
  const shareText = String(text || '').trim()
  const composed = shareText
    ? `${shareText}\n${shareUrl}`
    : `${title} on ${BRAND.short}\n${shareUrl}`

  const canNativeShare =
    typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(composed)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const nativeShare = async () => {
    try {
      await navigator.share({
        title,
        text: shareText || title,
        url: shareUrl,
      })
    } catch {
      // User cancelled or share failed — ignore.
    }
  }

  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText || title,
  )}&url=${encodeURIComponent(shareUrl)}`
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl,
  )}&quote=${encodeURIComponent(shareText || title)}`

  return (
    <div className="result-share" aria-label="Share your result">
      <p className="result-share-label">Share your result</p>
      <div className="result-share-actions">
        <button type="button" className="btn btn-ghost" onClick={copy}>
          {copied ? 'Copied' : 'Copy'}
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
          X / Twitter
        </a>
        <a
          className="btn btn-ghost"
          href={facebookHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </div>
    </div>
  )
}

export default ResultShareActions
