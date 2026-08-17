/**
 * Approximate dense rank for a result against public/sample board rows.
 * Used for guest “you’d place ~#X” hints — not a saved share.
 */

/**
 * @param {Array<{ result_value?: number, result_display?: string, rank?: number }>} rows
 * @param {number} value
 * @param {boolean} [higherIsBetter=true]
 * @returns {{ rank: number, fieldSize: number, isEstimate: boolean } | null}
 */
export function estimateThisWeekPlace(rows, value, higherIsBetter = true) {
  const numeric = Number(value)
  if (!Number.isFinite(numeric) || !Array.isArray(rows) || rows.length === 0) {
    return null
  }

  const scored = rows
    .map((row) => ({
      value: coerceRowValue(row),
    }))
    .filter((row) => Number.isFinite(row.value))

  if (!scored.length) return null

  let better = 0
  for (const row of scored) {
    if (higherIsBetter) {
      if (row.value > numeric) better += 1
    } else if (row.value < numeric) {
      better += 1
    }
  }

  const rank = better + 1
  return {
    rank,
    fieldSize: scored.length,
    isEstimate: true,
  }
}

/**
 * @param {{ result_value?: number, result_display?: string }} row
 */
function coerceRowValue(row) {
  const direct = Number(row?.result_value)
  if (Number.isFinite(direct)) return direct
  const display = String(row?.result_display || '').trim()
  if (!display) return NaN
  // mm:ss or h:mm:ss → seconds
  if (/^\d+:\d{2}(:\d{2})?$/.test(display)) {
    const parts = display.split(':').map((p) => Number(p))
    if (parts.every((n) => Number.isFinite(n))) {
      if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]
      return parts[0] * 60 + parts[1]
    }
  }
  const cleaned = display.replace(/,/g, '').replace(/[^\d.-]/g, '')
  const n = Number(cleaned)
  return Number.isFinite(n) ? n : NaN
}

/**
 * Guest-facing copy.
 * @param {{ rank: number, fieldSize: number } | null} place
 * @param {string} [boardLabel]
 */
export function formatEstimatedPlaceLabel(place, boardLabel = 'This Week') {
  if (!place?.rank) return null
  const board = String(boardLabel || 'This Week').trim() || 'This Week'
  if (place.rank === 1) {
    return `You’d sit at #1 on ${board} (preview)`
  }
  return `You’d place about #${place.rank} on ${board} (preview)`
}
