import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '../auth/AuthContext'
import { BRAND } from '../data/brand'
import { fetchAwardIdentitySettings } from '../lib/awardIdentity'
import { readCachedDashboardAwards } from '../lib/dashboardAwardsCache'
import { fetchLatestFitnessScoreSnapshot } from '../lib/fitnessScoreSnapshots'
import { fetchLeaderboardName } from '../lib/leaderboardProfile'
import { deriveAwards } from '../lib/fitnessAwards'
import {
  downloadMomentCard,
  renderShareMomentCardBlob,
  resolveAwardsForCard,
  resolveShareFormat,
  SHARE_FORMATS,
  shareOrDownloadMomentCard,
} from '../lib/shareMomentCard'
import { useFocusTrap } from '../lib/useFocusTrap'
import { isSupabaseConfigured } from '../supabaseClient'

/**
 * Resolve public-safe share card fields from the signed-in user.
 * Prefer cached dashboard scores; fall back to latest snapshot.
 */
async function resolveShareCardData(userId, props = {}) {
  const empty = {
    athleteName: props.athleteName ?? null,
    awards: props.awards ?? null,
    fitnessScore: props.fitnessScore ?? null,
    strengthScore: props.strengthScore ?? null,
    runningScore: props.runningScore ?? null,
  }

  if (!userId || !isSupabaseConfigured) return empty

  const cached = readCachedDashboardAwards(userId)
  const [name, settings, snapshot] = await Promise.all([
    props.athleteName != null
      ? Promise.resolve(props.athleteName)
      : fetchLeaderboardName(userId).catch(() => null),
    props.awards != null
      ? Promise.resolve(null)
      : fetchAwardIdentitySettings(userId).catch(() => null),
    props.fitnessScore != null
      ? Promise.resolve(null)
      : cached?.fitnessScore != null
        ? Promise.resolve(null)
        : fetchLatestFitnessScoreSnapshot(userId).catch(() => null),
  ])

  let fitnessScore = props.fitnessScore ?? null
  let strengthScore = props.strengthScore ?? null
  let runningScore = props.runningScore ?? null

  if (fitnessScore == null && cached?.fitnessScore != null) {
    fitnessScore = Number(cached.fitnessScore)
    strengthScore = Number(cached.strengthScore)
    runningScore = Number(cached.runningScore)
  } else if (fitnessScore == null && snapshot) {
    fitnessScore = Number(snapshot.fitness_score)
    strengthScore = Number(snapshot.strength_score)
    runningScore = Number(snapshot.running_score)
  }

  // Own share card: prefer live/cached awards, then public settings, then derive.
  let awards = props.awards ?? null
  if (!awards?.strength && !awards?.running && !awards?.crown) {
    if (cached?.awards?.strength || cached?.awards?.running || cached?.awards?.crown) {
      awards = {
        strength: cached.awards.strength || null,
        running: cached.awards.running || null,
        crown: Boolean(cached.awards.crown),
      }
    } else if (settings?.strength || settings?.running || settings?.crown) {
      awards = {
        strength: settings.strength || null,
        running: settings.running || null,
        crown: Boolean(settings.crown),
      }
    } else if (
      Number.isFinite(strengthScore) &&
      Number.isFinite(runningScore)
    ) {
      awards = deriveAwards({
        strengthScore,
        runningScore,
      })
    }
  }

  awards = resolveAwardsForCard(awards, strengthScore, runningScore)

  return {
    athleteName: props.athleteName ?? name ?? null,
    awards,
    fitnessScore: Number.isFinite(fitnessScore) ? fitnessScore : null,
    strengthScore: Number.isFinite(strengthScore) ? strengthScore : null,
    runningScore: Number.isFinite(runningScore) ? runningScore : null,
  }
}

function shareFilename(base, formatId) {
  const root = String(base || 'kinesoscore.png').replace(/\.png$/i, '')
  const format = resolveShareFormat(formatId)
  return `${root}-${format.id}.png`
}

const SHARE_SITE_URL = 'https://kinesoscore.com'

/**
 * Public caption for social apps (no email / private IDs).
 */
function buildShareCaption(cardData, { title, primary, secondary } = {}) {
  const lines = []
  if (cardData?.fitnessScore != null) {
    lines.push(`My ${BRAND.scoreName}: ${cardData.fitnessScore}`)
    if (cardData.strengthScore != null) {
      lines.push(`Strength ${cardData.strengthScore}`)
    }
    if (cardData.runningScore != null) {
      lines.push(`Running ${cardData.runningScore}`)
    }
  } else if (primary) {
    const board = secondary ? ` · ${secondary}` : ''
    lines.push(`${title || 'This Week'}: ${primary}${board}`)
  }
  if (cardData?.athleteName) lines.push(cardData.athleteName)
  lines.push(SHARE_SITE_URL)
  return lines.filter(Boolean).join('\n')
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
 * Opens a modal social-card studio: live preview, Post/Story formats,
 * Download + Share (Web Share API with PNG file when supported).
 */
function ShareMomentButton({
  title,
  primary,
  secondary,
  filename,
  label = 'Share image',
  className = 'btn btn-ghost',
  disabled = false,
  athleteName: athleteNameProp = null,
  awards: awardsProp = null,
  fitnessScore: fitnessScoreProp = null,
  strengthScore: strengthScoreProp = null,
  runningScore: runningScoreProp = null,
}) {
  const { user } = useAuth()
  const titleId = useId()
  const [open, setOpen] = useState(false)
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

  const dialogRef = useFocusTrap(open, () => {
    if (!busyActionRef.current) setOpen(false)
  })

  useEffect(() => {
    if (!open || !cardData || !primary) return undefined

    const seq = ++generateSeq.current
    let cancelled = false

    const run = async () => {
      setError('')
      try {
        const blob = await renderShareMomentCardBlob({
          format: formatId,
          title,
          primary,
          secondary,
          athleteName: cardData.athleteName,
          awards: cardData.awards,
          fitnessScore: cardData.fitnessScore,
          strengthScore: cardData.strengthScore,
          runningScore: cardData.runningScore,
        })
        if (cancelled || seq !== generateSeq.current) return

        const url = URL.createObjectURL(blob)
        if (previewUrlRef.current) {
          URL.revokeObjectURL(previewUrlRef.current)
        }
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
  }, [open, cardData, formatId, title, primary, secondary])

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
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
      }
    },
    [],
  )

  if (!primary) return null

  const closeModal = () => {
    if (busyAction) return
    setOpen(false)
  }

  const openModal = async () => {
    if (disabled || loading) return
    setOpen(true)
    setFormatId('post')
    setMessage('')
    setError('')
    setLoading(true)
    setCardData(null)
    setExportBlob(null)
    try {
      const resolved = await resolveShareCardData(user?.id, {
        athleteName: athleteNameProp,
        awards: awardsProp,
        fitnessScore: fitnessScoreProp,
        strengthScore: strengthScoreProp,
        runningScore: runningScoreProp,
      })
      setCardData(resolved)
    } catch (err) {
      setError(err?.message || 'Could not load share data.')
      setCardData({
        athleteName: athleteNameProp,
        awards: awardsProp,
        fitnessScore: fitnessScoreProp,
        strengthScore: strengthScoreProp,
        runningScore: runningScoreProp,
      })
    } finally {
      setLoading(false)
    }
  }

  const format = resolveShareFormat(formatId)
  const outName = shareFilename(filename, formatId)
  const ratioClass = formatId === 'story' ? 'is-story' : 'is-post'

  const handleDownload = () => {
    if (!exportBlob || busyAction) return
    setBusyAction('download')
    setMessage('')
    try {
      downloadMomentCard(exportBlob, outName)
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
      setMessage(mode === 'shared' ? 'Shared.' : 'Image saved.')
    } catch (err) {
      if (err?.name === 'AbortError') {
        setMessage('')
      } else {
        setError(err?.message || 'Could not share image.')
      }
    } finally {
      setBusyAction('')
    }
  }

  const caption = buildShareCaption(cardData, { title, primary, secondary })

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

    // Prefer native file share when the OS share sheet can target the app.
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
        setMessage('Shared.')
        setBusyAction('')
        return
      } catch (err) {
        if (err?.name === 'AbortError') {
          setBusyAction('')
          return
        }
        // Fall through to download + open social.
      }
    }

    try {
      const copied = await prepareImageAndCaption()
      if (network === 'instagram') {
        window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer')
        setMessage(
          copied
            ? 'Image saved + caption copied — paste in Instagram'
            : 'Image saved — open Instagram and attach it',
        )
      } else if (network === 'x') {
        const href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`
        window.open(href, '_blank', 'noopener,noreferrer')
        setMessage(
          copied
            ? 'Image saved + caption ready — attach the PNG in your post'
            : 'Image saved — attach the PNG in your post',
        )
      } else if (network === 'facebook') {
        const href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          SHARE_SITE_URL,
        )}&quote=${encodeURIComponent(caption)}`
        window.open(href, '_blank', 'noopener,noreferrer')
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

  return (
    <div className="share-moment-wrap">
      <button
        type="button"
        className={className}
        onClick={openModal}
        disabled={disabled || loading}
        aria-haspopup="dialog"
      >
        {loading ? 'Preparing…' : label}
      </button>
      {message && !open ? (
        <p
          className="feedback feedback-success share-moment-status"
          role="status"
        >
          {message}
        </p>
      ) : null}

      {open && typeof document !== 'undefined'
        ? createPortal(
            <div
              ref={dialogRef}
              className="confirm-modal-layer share-card-modal-layer"
            >
              <div
                className="confirm-modal-backdrop"
                onClick={closeModal}
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
                  Instagram-ready graphic from your live scores — not a page
                  screenshot.
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
                    <div
                      className="share-card-preview-skeleton"
                      aria-hidden="true"
                    >
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

                <div
                  className="share-card-social"
                  aria-label="Share to social media"
                >
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
                    onClick={closeModal}
                    disabled={Boolean(busyAction)}
                  >
                    Close
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
        : null}
    </div>
  )
}

export default ShareMomentButton
