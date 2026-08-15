import {
  formatLocalWeekRangeLabel,
  localWeekStartKey,
  shiftLocalWeekStart,
} from '../lib/groups'

/**
 * Shared week navigator for Groups Activity / Leaderboard / Overview.
 *
 * @param {{
 *   weekStart: string,
 *   onWeekStartChange: (next: string) => void,
 * }} props
 */
function GroupWeekNav({ weekStart, onWeekStartChange }) {
  const thisWeekStart = localWeekStartKey()
  const isCurrentWeek = weekStart === thisWeekStart

  return (
    <div className="groups-week-nav" role="group" aria-label="Week selection">
      <button
        type="button"
        className="btn btn-ghost"
        onClick={() => onWeekStartChange(shiftLocalWeekStart(weekStart, -1))}
      >
        ← Previous Week
      </button>
      <div className="groups-week-label-wrap">
        <p className="groups-week-label">{formatLocalWeekRangeLabel(weekStart)}</p>
        {!isCurrentWeek ? (
          <button
            type="button"
            className="btn btn-ghost groups-week-current"
            onClick={() => onWeekStartChange(thisWeekStart)}
          >
            Current Week
          </button>
        ) : (
          <p className="groups-week-current-hint">Current week</p>
        )}
      </div>
      <button
        type="button"
        className="btn btn-ghost"
        disabled={isCurrentWeek}
        onClick={() => {
          const next = shiftLocalWeekStart(weekStart, 1)
          onWeekStartChange(next > thisWeekStart ? thisWeekStart : next)
        }}
      >
        Next Week →
      </button>
    </div>
  )
}

export default GroupWeekNav
