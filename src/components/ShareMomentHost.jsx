import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '../auth/AuthContext'
import { BRAND } from '../data/brand'
import { SHARE_SITE_URL, buildShareCaption } from '../lib/shareCaption'
import { resolveShareCardData } from '../lib/shareCardData'
import {
  downloadMomentCard,
  renderShareMomentCardBlob,
  resolveShareFormat,
  SHARE_FORMATS,
  shareOrDownloadMomentCard,
} from '../lib/shareMomentCard'
import {
  dismissShareMoment,
  subscribeShareMoment,
  trackShareEvent,
} from '../lib/shareMoments'
import { useFocusTrap } from '../lib/useFocusTrap'

function shareFilename(base, formatId) {
  const root = String(base || 'kinesoscore.png').replace(/\.png$/i, '')
  const format = resolveShareFormat(formatId)
  return `${root}-${format.id}.png`
}

async function copyText(text) {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return
  }
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  document.execCommand('copy')
  area.remove()
}

/**
 * Global host: listens for requestShareMoment() and opens the share studio.
 */
function ShareMomentHost() {
  const { user } = useAuth()
  const titleId = useId()
  const [request, setRequest] = useState(null)
  const [formatId, setFormatId] = useState('post')
  const [cardData, setCardData] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [exportBlob, setExportBlob] = useState(null)
  const [loading, setLoading] = useState(false)
  const [busyAction, setBusyAction] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const previewUrlRef = useRef('')
  const generateSeq = useRef(0)
  const busyActionRef = useRef('')
  busyActionRef.current = busyAction
  const open = Boolean(request?.primary)

  const dialogRef = useFocusTrap(open, () => {
    if (!busyActionRef.current) closeModal()
  })

  useEffect(() => {
    return subscribeShareMoment((payload) => {
      if (!payload?.primary) return
      setRequest(payload)
      setFormatId('post')
      setMessage('')
      setError('')
      setCardData(null)
      setExportBlob(null)
      trackShareEvent('share_modal_open', { type: payload.type || 'manual' })
    })
  }, [])

  useEffect(() => {
    if (!open || !request) return undefined
    let cancelled = false
    setLoading(true)
    resolveShareCardData(user?.id, {
      athleteName: request.athleteName,
      awards: request.awards,
      fitnessScore: request.fitnessScore,
      strengthScore: request.strengthScore,
      runningScore: request.runningScore,
    })
      .then((resolved) => {
        if (!cancelled) setCardData(resolved)
      })
      .catch((err) => {
        if (cancelled) return
        setError(err?.message || 'Could not load share data.')
        setCardData({
          athleteName: request.athleteName ?? null,
          awards: request.awards ?? null,
          fitnessScore: request.fitnessScore ?? null,
          strengthScore: request.strengthScore ?? null,
          runningScore: request.runningScore ?? null,
        })
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [open, request, user?.id])

  useEffect(() => {
    if (!open || !cardData || !request?.primary) return undefined

    const seq = ++generateSeq.current
    let cancelled = false

    const run = async () => {
      setError('')
      try {
        const blob = await renderShareMomentCardBlob({
          format: formatId,
          title: request.title,
          primary: request.primary,
          secondary: request.secondary,
          athleteName: cardData.athleteName,
          awards: cardData.awards,
          fitnessScore: cardData.fitnessScore,
          strengthScore: cardData.strengthScore,
          runningScore: cardData.runningScore,
        })
        if (cancelled || seq !== generateSeq.current) return

        const url = URL.createObjectURL(blob)
        if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
        previewUrlRef.current = url
        setPreviewUrl(url)
        setExportBlob(blob)
      } catch (err) {
        if (cancelled || seq !== generateSeq.current) return
        setError(err?.message || 'Could not create image.')
        setExportBlob(null)
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [open, cardData, formatId, request])

  useEffect(() => {
    if (open) return undefined
    generateSeq.current += 1
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current)
      previewUrlRef.current = ''
    }
    setPreviewUrl('')
    setExportBlob(null)
    setBusyAction('')
    return undefined
  }, [open])

  useEffect(
    () => () => {
      if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current)
    },
    [],
  )

  const closeModal = (opts = {}) => {
    if (busyAction) return
    if (opts.dismiss && request?.type) {
      dismissShareMoment(request.type)
    }
    trackShareEvent('share_modal_close', { type: request?.type || 'manual' })
    setRequest(null)
  }

  if (!open || typeof document === 'undefined') return null

  const format = resolveShareFormat(formatId)
  const outName = shareFilename(request.filename, formatId)
  const ratioClass = formatId === 'story' ? 'is-story' : 'is-post'
  const caption = buildShareCaption(cardData, {
    title: request.title,
    primary: request.primary,
    secondary: request.secondary,
  })

  const handleDownload = () => {
    if (!exportBlob || busyAction) return
    setBusyAction('download')
    setMessage('')
    try {
      downloadMomentCard(exportBlob, outName)
      trackShareEvent('share_download', { type: request.type })
      setMessage('Image saved.')
    } catch (err) {
      setError(err?.message || 'Could not download image.')
    } finally {
      setBusyAction('')
    }
  }

  const handleShare = async () => {
    if (!exportBlob || busyAction) return
    setBusyAction('share')
    setMessage('')
    setError('')
    try {
      const mode = await shareOrDownloadMomentCard(exportBlob, outName)
      trackShareEvent(mode === 'shared' ? 'share_native' : 'share_download', {
        type: request.type,
      })
      setMessage(mode === 'shared' ? 'Shared.' : 'Image saved.')
    } catch (err) {
      if (err?.name === 'AbortError') setMessage('')
      else setError(err?.message || 'Could not share image.')
    } finally {
      setBusyAction('')
    }
  }

  const prepareImageAndCaption = async () => {
    downloadMomentCard(exportBlob, outName)
    try {
      await copyText(caption)
      return true
    } catch {
      return false
    }
  }

  const handleCopyCaption = async () => {
    if (busyAction) return
    setBusyAction('copy')
    setMessage('')
    setError('')
    try {
      await copyText(caption)
      trackShareEvent('share_copy_caption', { type: request.type })
      setMessage('Caption copied.')
    } catch {
      setError('Could not copy caption.')
    } finally {
      setBusyAction('')
    }
  }

  const handleSocial = async (network) => {
    if (!exportBlob || busyAction) return
    setBusyAction(network)
    setMessage('')
    setError('')

    const file = new File([exportBlob], outName, { type: 'image/png' })
    if (
      typeof navigator !== 'undefined' &&
      typeof navigator.share === 'function' &&
      navigator.canShare?.({ files: [file] })
    ) {
      try {
        await navigator.share({
          files: [file],
          title: BRAND.short,
          text: caption,
        })
        trackShareEvent('share_native', { type: request.type, network })
        setMessage('Shared.')
        setBusyAction('')
        return
      } catch (err) {
        if (err?.name === 'AbortError') {
          setBusyAction('')
          return
        }
      }
    }

    try {
      const copied = await prepareImageAndCaption()
      trackShareEvent(`share_${network}`, { type: request.type })
      if (network === 'instagram') {
        window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer')
        setMessage(
          copied
            ? 'Image saved + caption copied — paste in Instagram'
            : 'Image saved — open Instagram and attach it',
        )
      } else if (network === 'x') {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`,
          '_blank',
          'noopener,noreferrer',
        )
        setMessage(
          copied
            ? 'Image saved + caption ready — attach the PNG in your post'
            : 'Image saved — attach the PNG in your post',
        )
      } else if (network === 'facebook') {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            SHARE_SITE_URL,
          )}&quote=${encodeURIComponent(caption)}`,
          '_blank',
          'noopener,noreferrer',
        )
        setMessage(
          copied
            ? 'Image saved + caption copied — attach the PNG on Facebook'
            : 'Image saved — attach the PNG on Facebook',
        )
      }
    } catch (err) {
      setError(err?.message || 'Could not prepare share.')
    } finally {
      setBusyAction('')
    }
  }

  return createPortal(
    <div
      ref={dialogRef}
      className="confirm-modal-layer share-card-modal-layer"
    >
      <div
        className="confirm-modal-backdrop"
        onClick={() => closeModal()}
        aria-hidden="true"
      />
      <div
        className="confirm-modal confirm-modal-trust share-card-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <p className="confirm-modal-eyebrow">Share image</p>
        <h2 id={titleId} className="confirm-modal-title">
          {BRAND.short} card
        </h2>
        <p className="share-card-modal-lead">
          {loading
            ? 'Loading your scores…'
            : 'Instagram-ready graphic from your live scores — not a page screenshot.'}
        </p>

        <div
          className="share-card-format-toggle"
          role="radiogroup"
          aria-label="Image format"
        >
          {Object.values(SHARE_FORMATS).map((item) => {
            const selected = formatId === item.id
            return (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={selected}
                className={`share-card-format-btn${
                  selected ? ' is-selected' : ''
                }`}
                onClick={() => setFormatId(item.id)}
                disabled={Boolean(busyAction)}
              >
                {item.shortLabel}
              </button>
            )
          })}
        </div>

        <div
          className={`share-card-preview-shell ${ratioClass}`}
          aria-busy={!previewUrl}
        >
          {previewUrl ? (
            <img
              className="share-card-preview-image"
              src={previewUrl}
              alt={`${BRAND.short} share card preview, ${format.ratioLabel}`}
            />
          ) : (
            <div className="share-card-preview-skeleton" aria-hidden="true">
              <span>Rendering card…</span>
            </div>
          )}
        </div>

        {error ? (
          <p className="feedback feedback-error" role="alert">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="feedback feedback-success" role="status">
            {message}
          </p>
        ) : null}

        <div className="share-card-social" aria-label="Share to social media">
          <p className="share-card-social-label">Share to</p>
          <div className="share-card-social-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => handleSocial('instagram')}
              disabled={!exportBlob || Boolean(busyAction)}
              aria-label="Save image and open Instagram"
            >
              Instagram
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => handleSocial('x')}
              disabled={!exportBlob || Boolean(busyAction)}
              aria-label="Save image and open X"
            >
              X
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => handleSocial('facebook')}
              disabled={!exportBlob || Boolean(busyAction)}
              aria-label="Save image and open Facebook"
            >
              Facebook
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={handleCopyCaption}
              disabled={!exportBlob || Boolean(busyAction)}
              aria-label="Copy share caption"
            >
              {busyAction === 'copy' ? 'Copying…' : 'Copy caption'}
            </button>
          </div>
        </div>

        <div className="confirm-actions share-card-modal-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => closeModal({ dismiss: true })}
            disabled={Boolean(busyAction)}
          >
            Not now
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleDownload}
            disabled={!exportBlob || Boolean(busyAction)}
            aria-label="Download share image as PNG"
          >
            {busyAction === 'download' ? 'Saving…' : 'Download image'}
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleShare}
            disabled={!exportBlob || Boolean(busyAction)}
            aria-label="Share image"
          >
            {busyAction === 'share' ? 'Sharing…' : 'Share'}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default ShareMomentHost
