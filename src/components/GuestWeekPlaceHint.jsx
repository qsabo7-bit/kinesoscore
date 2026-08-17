import { useEffect, useMemo, useState } from 'react'
import ShareMomentButton from './ShareMomentButton'
import {
  estimateThisWeekPlace,
  formatEstimatedPlaceLabel,
} from '../lib/estimateThisWeekPlace'
import {
  fetchPublicLeaderboard,
  leaderboardBoardLabel,
} from '../lib/publicLeaderboard'
import { getLeaderboardSampleRows } from '../lib/leaderboardSamples'
import { isSupabaseConfigured } from '../supabaseClient'

/**
 * Guest soft hint: approximate This Week place after a calculator result.
 */
function GuestWeekPlaceHint({
  boardKey,
  resultValue,
  higherIsBetter = true,
  onRequestAuth,
  onOpenTab,
}) {
  const [rows, setRows] = useState(() =>
    boardKey ? getLeaderboardSampleRows(boardKey) : [],
  )
  const [usingSample, setUsingSample] = useState(true)

  useEffect(() => {
    if (!boardKey || !isSupabaseConfigured) return undefined
    let cancelled = false
    fetchPublicLeaderboard(boardKey, 'this_week')
      .then((live) => {
        if (cancelled) return
        if (Array.isArray(live) && live.length > 0) {
          setRows(live)
          setUsingSample(false)
        }
      })
      .catch(() => {
        // Keep sample rows.
      })
    return () => {
      cancelled = true
    }
  }, [boardKey])

  const place = useMemo(
    () => estimateThisWeekPlace(rows, resultValue, higherIsBetter),
    [rows, resultValue, higherIsBetter],
  )

  const boardLabel = boardKey
    ? leaderboardBoardLabel(boardKey)
    : 'This Week'
  const label = formatEstimatedPlaceLabel(place, boardLabel)

  if (!label || !place) return null

  return (
    <aside className="guest-week-place" role="status">
      <p className="guest-week-place-kicker">This Week preview</p>
      <p className="guest-week-place-line">{label}</p>
      <p className="calc-hint guest-week-place-hint">
        {usingSample
          ? 'Based on sample rankings until live shares fill the board.'
          : 'Approximate vs athletes who already shared this week.'}{' '}
        Create an account to save and claim a real spot.
      </p>
      <div className="confirm-actions guest-week-place-actions">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => onRequestAuth?.('signup')}
        >
          Save & claim This Week
        </button>
        <ShareMomentButton
          type="this_week_rank"
          title="This Week preview"
          primary={`#${place.rank}`}
          secondary={boardLabel}
          filename="kinesoscore-this-week-preview.png"
          label="Share preview"
          className="btn btn-ghost"
        />
        <button
          type="button"
          className="guest-week-place-browse"
          onClick={() =>
            onOpenTab?.(
              boardKey
                ? { tab: 'leaderboard', boardKey, period: 'this_week' }
                : { tab: 'leaderboard', period: 'this_week' },
            )
          }
        >
          Browse board
        </button>
      </div>
    </aside>
  )
}

export default GuestWeekPlaceHint
