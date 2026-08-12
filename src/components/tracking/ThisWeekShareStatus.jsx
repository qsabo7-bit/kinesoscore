import ShareMomentButton from '../ShareMomentButton'
import ThisWeekCountdown from '../ThisWeekCountdown'

/**
 * Post-share climax: big This Week rank + near-miss + reset countdown + board CTA.
 *
 * @param {{
 *   status: {
 *     boardKey: string,
 *     boardLabel: string,
 *     rank: number | null,
 *     countdownLabel?: string,
 *     nearMiss?: {
 *       spotsFromFirst: number,
 *       isFirst: boolean,
 *       gapLabel: string | null,
 *     } | null,
 *   },
 *   onOpenBoard?: (boardKey: string) => void,
 * }} props
 */
function ThisWeekShareStatus({ status, onOpenBoard }) {
  if (!status?.boardKey) return null

  const hasRank = status.rank != null
  const gapLabel = status.nearMiss?.gapLabel || null

  return (
    <div
      className={`this-week-share-status${hasRank ? ' has-rank' : ' is-live'}`}
      role="status"
    >
      <p className="this-week-share-status-eyebrow">This Week (UTC)</p>

      {hasRank ? (
        <div
          key={`rank-${status.rank}-${status.boardKey}`}
          className="this-week-rank-hero is-ceremony"
          aria-label={`Rank ${status.rank}`}
        >
          <span className="this-week-rank-hash" aria-hidden="true">
            #
          </span>
          <span className="this-week-rank-number">{status.rank}</span>
        </div>
      ) : (
        <div className="this-week-rank-hero is-unranked" aria-label="On the board">
          <span className="this-week-rank-live">ON THE BOARD</span>
        </div>
      )}

      <p className="this-week-share-status-board">
        {hasRank ? (
          <>
            on <strong>{status.boardLabel}</strong>
          </>
        ) : (
          <>
            Shared to <strong>{status.boardLabel}</strong>
          </>
        )}
      </p>

      {gapLabel ? (
        <p className="this-week-near-miss">{gapLabel}</p>
      ) : null}

      <ThisWeekCountdown className="this-week-share-status-countdown" />

      <div className="this-week-share-status-actions confirm-actions">
        {onOpenBoard ? (
          <button
            type="button"
            className="btn btn-ghost this-week-share-status-cta"
            onClick={() => onOpenBoard(status.boardKey)}
          >
            View This Week board
          </button>
        ) : null}
        {hasRank ? (
          <ShareMomentButton
            title="This Week"
            type="this_week_rank"
            primary={`#${status.rank}`}
            secondary={status.boardLabel}
            filename="kinesoscore-this-week.png"
            label="Share image"
            className="btn btn-ghost"
          />
        ) : null}
      </div>
    </div>
  )
}

export default ThisWeekShareStatus
