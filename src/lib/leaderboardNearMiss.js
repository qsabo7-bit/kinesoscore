/**
 * Near-miss copy from public leaderboard rows (dense ranks).
 */

/**
 * @param {Array<{
 *   rank?: number,
 *   leaderboard_name?: string,
 *   result_value?: number,
 *   result_display?: string,
 *   higher_is_better?: boolean,
 * }>} rows
 * @param {string | null | undefined} leaderboardName
 * @returns {{
 *   rank: number,
 *   spotsFromFirst: number,
 *   isFirst: boolean,
 *   gapLabel: string | null,
 *   nextName: string | null,
 * } | null}
 */
export function computeLeaderboardNearMiss(rows, leaderboardName) {
  const needle = String(leaderboardName || '')
    .trim()
    .toLowerCase()
  if (!needle || !Array.isArray(rows) || !rows.length) return null

  const me = rows.find(
    (row) => String(row?.leaderboard_name || '').trim().toLowerCase() === needle,
  )
  if (!me) return null

  const rank = Number(me.rank)
  if (!Number.isFinite(rank) || rank < 1) return null

  const isFirst = rank === 1
  const spotsFromFirst = Math.max(0, rank - 1)

  let gapLabel = null
  let nextName = null

  if (!isFirst) {
    const better = rows
      .filter((row) => Number(row.rank) === rank - 1)
      .sort((a, b) =>
        String(a.leaderboard_name || '').localeCompare(
          String(b.leaderboard_name || ''),
        ),
      )
    const target = better[0]
    if (target) {
      nextName = String(target.leaderboard_name || '').trim() || null
      const mine = Number(me.result_value)
      const theirs = Number(target.result_value)
      if (Number.isFinite(mine) && Number.isFinite(theirs) && mine !== theirs) {
        const higherIsBetter = target.higher_is_better !== false
        const delta = higherIsBetter ? theirs - mine : mine - theirs
        if (delta > 0) {
          const display =
            target.result_display && me.result_display
              ? `${formatLooseDelta(delta, me.result_display, target.result_display)}`
              : String(Math.round(delta * 100) / 100)
          gapLabel = nextName
            ? `${display} behind ${nextName}`
            : `${display} behind next place`
        } else if (nextName) {
          gapLabel = `Tied on score with ranks above — chase ${nextName}`
        }
      } else if (nextName) {
        gapLabel = `${spotsFromFirst} spot${spotsFromFirst === 1 ? '' : 's'} from #1`
      }
    }
  }

  if (!gapLabel && !isFirst && spotsFromFirst > 0) {
    gapLabel = `${spotsFromFirst} spot${spotsFromFirst === 1 ? '' : 's'} from #1`
  }

  if (isFirst) {
    gapLabel = rows.length > 1 ? 'Holding #1 this week' : 'First on the board'
  }

  return {
    rank,
    spotsFromFirst,
    isFirst,
    gapLabel,
    nextName,
  }
}

/** Prefer unit-aware display when possible; fall back to numeric delta. */
function formatLooseDelta(delta, myDisplay, theirDisplay) {
  const abs = Math.abs(delta)
  // Time-like displays (mm:ss or h:mm:ss)
  if (/^\d+:\d{2}/.test(String(myDisplay)) || /^\d+:\d{2}/.test(String(theirDisplay))) {
    return formatDurationDelta(abs)
  }
  if (/rep/i.test(String(myDisplay)) || /rep/i.test(String(theirDisplay))) {
    const n = Math.round(abs)
    return `${n} rep${n === 1 ? '' : 's'}`
  }
  if (/lb|kg/i.test(String(myDisplay)) || /lb|kg/i.test(String(theirDisplay))) {
    const unit = /kg/i.test(String(myDisplay)) ? 'kg' : 'lb'
    return `${Math.round(abs)} ${unit}`
  }
  if (/day/i.test(String(myDisplay))) {
    const n = Math.round(abs)
    return `${n} day${n === 1 ? '' : 's'}`
  }
  // Bare points / scores
  const rounded = abs >= 10 ? Math.round(abs) : Math.round(abs * 10) / 10
  return String(rounded)
}

function formatDurationDelta(totalSeconds) {
  const s = Math.max(0, Math.round(totalSeconds))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  return `${m}:${String(sec).padStart(2, '0')}`
}
