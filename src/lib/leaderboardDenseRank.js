/**
 * Assign competition dense ranks from a best-first sorted list.
 * Equal scores share the same rank number (1, 1, 2 — not 1, 2, 3).
 *
 * @template T
 * @param {T[]} rows
 * @param {(row: T) => number} getScore
 * @returns {Array<T & { rank: number }>}
 */
export function assignDenseRanks(rows, getScore) {
  let rank = 0
  let prevScore = null
  let hasPrev = false

  return (rows || []).map((row) => {
    const score = Number(getScore(row))
    if (!hasPrev || score !== prevScore) {
      rank += 1
      prevScore = score
      hasPrev = true
    }
    return { ...row, rank }
  })
}
