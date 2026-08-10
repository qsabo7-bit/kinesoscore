import { computeLeaderboardNearMiss } from './leaderboardNearMiss.js'
import { fetchLeaderboardName } from './leaderboardProfile.js'
import {
  fetchPublicLeaderboard,
  leaderboardBoardLabel,
} from './publicLeaderboard.js'
import {
  findLeaderboardRankByName,
  formatUtcWeekCountdown,
} from './utcLeaderboardWeek.js'

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

/**
 * After a successful global share, resolve This Week rank + countdown copy.
 * Retries briefly so a just-upserted row can appear in the public RPC.
 *
 * @param {{ userId: string, boardKey: string, leaderboardName?: string | null }} args
 * @returns {Promise<{
 *   boardKey: string,
 *   boardLabel: string,
 *   rank: number | null,
 *   countdownLabel: string,
 *   leaderboardName: string | null,
 *   nearMiss: {
 *     spotsFromFirst: number,
 *     isFirst: boolean,
 *     gapLabel: string | null,
 *     nextName: string | null,
 *   } | null,
 * } | null>}
 */
export async function resolveThisWeekShareStatus({
  userId,
  boardKey,
  leaderboardName = null,
}) {
  if (!userId || !boardKey) return null

  let name = leaderboardName
  if (!name) {
    try {
      name = await fetchLeaderboardName(userId)
    } catch {
      name = null
    }
  }

  let rank = null
  let nearMiss = null
  const attempts = [0, 200, 500]
  for (const delay of attempts) {
    if (delay) await sleep(delay)
    try {
      const rows = await fetchPublicLeaderboard(boardKey, 'this_week')
      rank = findLeaderboardRankByName(rows, name)
      nearMiss = computeLeaderboardNearMiss(rows, name)
      if (rank != null || !name) break
    } catch {
      // Rank is optional; share already succeeded.
      break
    }
  }

  return {
    boardKey,
    boardLabel: leaderboardBoardLabel(boardKey),
    rank,
    countdownLabel: formatUtcWeekCountdown(),
    leaderboardName: name,
    nearMiss,
  }
}
