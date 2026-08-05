/**
 * Format a whole number as an English ordinal (1st, 2nd, 3rd, 11th, …).
 * @param {number} value
 * @returns {string}
 */
export function formatOrdinal(value) {
  const n = Math.round(value)
  const mod100 = n % 100

  if (mod100 >= 11 && mod100 <= 13) {
    return `${n}th`
  }

  switch (n % 10) {
    case 1:
      return `${n}st`
    case 2:
      return `${n}nd`
    case 3:
      return `${n}rd`
    default:
      return `${n}th`
  }
}

/**
 * Estimate what percent of a reference group a score outperforms.
 *
 * Definition used everywhere in FPC:
 *   percentile = percent of people you are better than (0–100)
 *   Example: better than 53 out of 100 people → 53rd percentile
 *
 * @param {number} score
 * @param {Array<{ value: number, percentile: number }>} points
 *   Breakpoints where `percentile` means "% of people outperformed at this value"
 * @param {{ higherIsBetter?: boolean }} [options]
 * @returns {number} whole number 1–99
 */
export function estimatePercentOutperformed(score, points, options = {}) {
  const { higherIsBetter = true } = options
  const ordered = [...points].sort((a, b) => a.percentile - b.percentile)

  if (ordered.length === 0) return 50

  const lowest = ordered[0]
  const highest = ordered[ordered.length - 1]

  if (higherIsBetter) {
    // Stronger / higher score is better.
    if (score <= lowest.value) {
      if (lowest.value <= 0) return clamp(lowest.percentile)
      return clamp(Math.round((score / lowest.value) * lowest.percentile))
    }

    if (score >= highest.value) {
      const extra = Math.min(
        4,
        ((score - highest.value) / (highest.value || 1)) * 10,
      )
      return clamp(Math.round(highest.percentile + extra))
    }

    for (let i = 0; i < ordered.length - 1; i += 1) {
      const left = ordered[i]
      const right = ordered[i + 1]

      if (score <= right.value) {
        const span = right.value - left.value || 1
        const t = (score - left.value) / span
        return clamp(
          Math.round(
            left.percentile + t * (right.percentile - left.percentile),
          ),
        )
      }
    }
  } else {
    // Faster / lower time is better. Points are still sorted by percentile
    // ascending, so higher percentile rows have lower (faster) times.
    if (score <= highest.value) {
      const under = highest.value - score
      const extra = Math.min(4, (under / (highest.value || 1)) * 10)
      return clamp(Math.round(highest.percentile + extra))
    }

    if (score >= lowest.value) {
      const overshoot = score - lowest.value
      const decay = overshoot / (lowest.value * 0.5 || 1)
      return clamp(Math.round(lowest.percentile * Math.max(0, 1 - decay)))
    }

    for (let i = 0; i < ordered.length - 1; i += 1) {
      const weaker = ordered[i] // lower percentile, slower time
      const stronger = ordered[i + 1] // higher percentile, faster time

      // Time sits between stronger.value (fast) and weaker.value (slow)
      if (score <= weaker.value && score >= stronger.value) {
        const span = weaker.value - stronger.value || 1
        const t = (weaker.value - score) / span
        return clamp(
          Math.round(
            weaker.percentile +
              t * (stronger.percentile - weaker.percentile),
          ),
        )
      }
    }
  }

  return 50
}

/** @deprecated Use estimatePercentOutperformed */
export function interpolatePercentile(score, points, options) {
  return estimatePercentOutperformed(score, points, options)
}

function clamp(value) {
  return Math.min(99, Math.max(1, value))
}
