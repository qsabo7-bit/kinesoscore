import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { fetchAwardIdentitySettings } from '../lib/awardIdentity'
import { readCachedDashboardAwards } from '../lib/dashboardAwardsCache'
import { fetchLeaderboardName } from '../lib/leaderboardProfile'
import {
  renderShareMomentCardBlob,
  shareOrDownloadMomentCard,
} from '../lib/shareMomentCard'
import { isSupabaseConfigured } from '../supabaseClient'

/**
 * Resolve optional athlete name + award chips for the share card.
 * Own share image — show name/awards when available (not only public opt-in).
 */
async function resolveShareIdentity(userId) {
  if (!userId || !isSupabaseConfigured) {
    return { athleteName: null, awards: null }
  }

  const cached = readCachedDashboardAwards(userId)
  const [name, settings] = await Promise.all([
    fetchLeaderboardName(userId).catch(() => null),
    fetchAwardIdentitySettings(userId).catch(() => null),
  ])

  let awards = null
  if (settings?.strength || settings?.running || settings?.crown) {
    awards = {
      strength: settings.strength || null,
      running: settings.running || null,
      crown: Boolean(settings.crown),
    }
  } else if (cached?.awards) {
    awards = {
      strength: cached.awards.strength || null,
      running: cached.awards.running || null,
      crown: Boolean(cached.awards.crown),
    }
  }

  return {
    athleteName: name || null,
    awards,
  }
}

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
  athleteName: athleteNameProp = null,
  awards: awardsProp = null,
}) {
  const { user } = useAuth()
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  if (!primary) return null

  const handleClick = async () => {
    if (busy) return
    setBusy(true)
    setMessage('')
    try {
      const identity = await resolveShareIdentity(user?.id)

      const blob = await renderShareMomentCardBlob({
        title,
        primary,
        secondary,
        athleteName: athleteNameProp ?? identity.athleteName,
        awards: awardsProp ?? identity.awards,
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
        <p
          className="feedback feedback-success share-moment-status"
          role="status"
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}

export default ShareMomentButton
