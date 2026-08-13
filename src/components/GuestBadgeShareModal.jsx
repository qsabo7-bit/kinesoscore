import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { captureElementPng } from '../lib/captureElementPng'
import { openSocialApp } from '../lib/openSocialApp'
import {
  SHARE_SCORING_URL,
  buildGuestScoreShareCaption,
} from '../lib/shareCaption'
import { downloadMomentCard } from '../lib/shareMomentCard'
import { trackShareEvent } from '../lib/shareMoments'
import { useFocusTrap } from '../lib/useFocusTrap'
import FitnessAwardsDisplay, { FitnessAwardsLegend } from './FitnessAwardsDisplay'
import FpcScoreRing from './FpcScoreRing'

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

function detectMobileShareSurface() {
  if (typeof window === 'undefined') return false
  try {
    if (window.matchMedia('(max-width: 720px)').matches) return true
    if (window.matchMedia('(pointer: coarse)').matches) return true
  } catch {
    /* ignore */
  }
  return false
}

function SocialShareButton({ label, busy, disabled, onClick, busyLabel }) {
  return (
    <button
      type="button"
      className="btn btn-primary guest-badge-share-social-btn is-enticing"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="scoring-show-badges-spark" aria-hidden="true" />
      <span className="guest-badge-share-social-label">
        {busy ? busyLabel || 'Opening…' : label}
      </span>
    </button>
  )
}

/**
 * Guest share popup for myKinesoScore.
 * Desktop: download card + text-only social compose links (@KinesosScore + URL).
 * Mobile: stacked badge layout; social buttons open the native app (or store).
 */
function GuestBadgeShareModal({
  open,
  onClose,
  score,
  band,
  balance,
  strengthScore,
  runningScore,
  awards,
  onRequestAuth,
}) {
  const titleId = useId()
  const dialogRef = useFocusTrap(open, onClose)
  const captureRef = useRef(null)
  const [exportBlob, setExportBlob] = useState(null)
  const [loadingCard, setLoadingCard] = useState(false)
  const [busyAction, setBusyAction] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isMobileShare, setIsMobileShare] = useState(detectMobileShareSurface)
  const generateSeq = useRef(0)

  const secondary = [band, balance].filter(Boolean).join(' · ')
  const scoreInput = {
    fitnessScore: score,
    strengthScore,
    runningScore,
    band: secondary || band,
  }
  const caption = buildGuestScoreShareCaption(scoreInput, {
    includeHandle: true,
  })
  const outName = 'kinesoscore-badges.png'
  const ringSize = isMobileShare ? 142 : 200

  useEffect(() => {
    if (!open) return undefined
    const sync = () => setIsMobileShare(detectMobileShareSurface())
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [open])

  useEffect(() => {
    if (!open || score == null) return undefined
    const seq = ++generateSeq.current
    let cancelled = false
    setLoadingCard(true)
    setError('')
    setMessage('')
    setExportBlob(null)

    const run = async () => {
      if (cancelled || seq !== generateSeq.current) return
      const node = captureRef.current
      if (!node) throw new Error('Share stage not ready.')
      // Let mobile stacked layout paint before capture.
      await new Promise((r) => {
        requestAnimationFrame(() => requestAnimationFrame(r))
      })
      // Freeze only during capture; re-enable idle animations afterward.
      node.classList.add('is-capture-ready')
      try {
        const blob = await captureElementPng(node, {
          pixelRatio: isMobileShare ? 2.5 : 3,
          backgroundColor: '#0f1412',
        })
        if (cancelled || seq !== generateSeq.current) return
        setExportBlob(blob)
      } finally {
        node.classList.remove('is-capture-ready')
      }
    }

    run()
      .catch((err) => {
        if (cancelled || seq !== generateSeq.current) return
        setError(err?.message || 'Could not create share image.')
        setExportBlob(null)
        captureRef.current?.classList.remove('is-capture-ready')
      })
      .finally(() => {
        if (!cancelled && seq === generateSeq.current) setLoadingCard(false)
      })

    return () => {
      cancelled = true
      captureRef.current?.classList.remove('is-capture-ready')
    }
  }, [
    open,
    score,
    band,
    balance,
    strengthScore,
    runningScore,
    awards,
    isMobileShare,
  ])

  useEffect(() => {
    if (open) return undefined
    generateSeq.current += 1
    setExportBlob(null)
    setBusyAction('')
    setMessage('')
    setError('')
    return undefined
  }, [open])

  if (!open || score == null || typeof document === 'undefined') return null

  const openDesktopCompose = async (network) => {
    try {
      await copyText(caption)
    } catch {
      /* still open compose */
    }
    trackShareEvent(`share_${network}`, {
      type: 'score_saved',
      source: 'guest_badge_capture',
      mode: 'text_only',
    })

    if (network === 'instagram') {
      window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer')
      setMessage('Caption copied — paste it into your Instagram post.')
      return
    }
    if (network === 'x') {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(caption)}`,
        '_blank',
        'noopener,noreferrer',
      )
      setMessage('Opened X with your ready post (@KinesosScore + link).')
      return
    }
    if (network === 'facebook') {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          SHARE_SCORING_URL,
        )}&quote=${encodeURIComponent(caption)}`,
        '_blank',
        'noopener,noreferrer',
      )
      setMessage('Opened Facebook — caption copied if you want to paste it.')
    }
  }

  const shareMobileToApp = async (network) => {
    // Text-only ready post (caption already includes link + @KinesosScore).
    try {
      await copyText(caption)
    } catch {
      /* continue */
    }

    const mode = await openSocialApp(network, {
      caption,
      scoringUrl: SHARE_SCORING_URL,
    })
    trackShareEvent(`share_${network}`, {
      type: 'score_saved',
      source: 'guest_badge_capture',
      mode: `mobile_text_${mode}`,
    })
    if (mode === 'shared') {
      setMessage('Ready post opened — pick Instagram/Facebook if asked.')
    } else if (mode === 'abort') {
      setMessage('Share cancelled — caption is still copied.')
    } else if (mode === 'store') {
      setMessage('Opening the store — install, then paste your copied caption.')
    } else if (mode === 'app' || mode === 'web') {
      setMessage('Opening a ready text post (@KinesosScore + link). Caption copied too.')
    } else {
      setMessage('Caption copied with @KinesosScore + link.')
    }
  }

  const handleSocial = async (network) => {
    if (busyAction) return
    if (isMobileShare && !exportBlob && loadingCard) return
    setBusyAction(network)
    setMessage('')
    setError('')
    try {
      if (isMobileShare) {
        await shareMobileToApp(network)
        return
      }
      await openDesktopCompose(network)
    } catch (err) {
      setError(err?.message || 'Could not open share.')
    } finally {
      setBusyAction('')
    }
  }

  const handleDownload = () => {
    if (!exportBlob || busyAction) return
    setBusyAction('download')
    setMessage('')
    try {
      downloadMomentCard(exportBlob, outName)
      trackShareEvent('share_download', {
        type: 'score_saved',
        source: 'guest_badge_capture',
      })
      setMessage('Card downloaded.')
    } catch (err) {
      setError(err?.message || 'Could not download image.')
    } finally {
      setBusyAction('')
    }
  }

  const handleSaveScore = () => {
    if (busyAction) return
    trackShareEvent('share_save_score_cta', {
      type: 'score_saved',
      source: 'guest_badge_capture',
      surface: isMobileShare ? 'mobile' : 'desktop',
    })
    onClose?.()
    onRequestAuth?.('signup')
  }

  const socialDisabled =
    Boolean(busyAction) || (isMobileShare && loadingCard && !exportBlob)

  return createPortal(
    <div
      ref={dialogRef}
      className="confirm-modal-layer guest-badge-share-layer"
    >
      <div
        className="confirm-modal-backdrop"
        onClick={() => {
          if (!busyAction) onClose()
        }}
        aria-hidden="true"
      />
      <div
        className="confirm-modal confirm-modal-trust guest-badge-share-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <p className="confirm-modal-eyebrow">Share your myKinesoScore today</p>
        <h2 id={titleId} className="confirm-modal-title">
          Your score + badges
        </h2>

        <div
          ref={captureRef}
          className={`guest-badge-share-capture${
            isMobileShare ? ' is-mobile-capture' : ''
          }`}
          aria-live="polite"
        >
          <div className="guest-badge-share-stage is-capture">
            <FitnessAwardsDisplay
              awards={awards}
              runningScore={runningScore}
              strengthScore={strengthScore}
            >
              <FpcScoreRing
                score={score}
                secondary={secondary}
                size={ringSize}
              />
            </FitnessAwardsDisplay>
          </div>
          <p className="guest-badge-share-capture-footer">kinesoscore.com</p>
        </div>
        <div className="guest-badge-share-legend" data-capture-ignore="1">
          <FitnessAwardsLegend awards={awards} />
        </div>

        {loadingCard && isMobileShare ? (
          <p className="guest-badge-share-hint" data-capture-ignore="1">
            Preparing your share card…
          </p>
        ) : null}

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
          className="guest-badge-share-actions"
          aria-label="Share your card"
          data-capture-ignore="1"
        >
          <p className="guest-badge-share-entice-label">
            {isMobileShare ? 'Share your result' : 'Post your result'}
          </p>
          <div className="guest-badge-share-action-row">
            <SocialShareButton
              label="X"
              busy={busyAction === 'x'}
              disabled={socialDisabled}
              onClick={() => handleSocial('x')}
            />
            <SocialShareButton
              label="Instagram"
              busy={busyAction === 'instagram'}
              disabled={socialDisabled}
              onClick={() => handleSocial('instagram')}
            />
            <SocialShareButton
              label="Facebook"
              busy={busyAction === 'facebook'}
              disabled={socialDisabled}
              onClick={() => handleSocial('facebook')}
            />
          </div>

          {!isMobileShare ? (
            <div className="guest-badge-share-account-row">
              <button
                type="button"
                className="btn btn-primary guest-badge-share-save-btn is-enticing"
                onClick={handleSaveScore}
                disabled={Boolean(busyAction)}
              >
                <span className="scoring-show-badges-spark" aria-hidden="true" />
                <span className="guest-badge-share-social-label">Save score</span>
              </button>
              <button
                type="button"
                className="btn btn-ghost guest-badge-share-download-btn"
                onClick={handleDownload}
                disabled={!exportBlob || Boolean(busyAction)}
              >
                {busyAction === 'download'
                  ? 'Saving…'
                  : loadingCard
                    ? 'Preparing card…'
                    : 'Download card'}
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn guest-badge-share-save-btn is-inverted is-enticing"
              onClick={handleSaveScore}
              disabled={Boolean(busyAction)}
            >
              <span className="scoring-show-badges-spark" aria-hidden="true" />
              <span className="guest-badge-share-social-label">
                Save your score
              </span>
            </button>
          )}
        </div>

        <div className="confirm-actions" data-capture-ignore="1">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            disabled={Boolean(busyAction)}
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default GuestBadgeShareModal
