/**
 * Short post-save celebration copy for calculator tracking.
 *
 * @param {{
 *   isPersonalBest?: boolean,
 *   priorSummary?: { personalRecord?: number, latestValue?: number } | null,
 *   numericResult?: number,
 *   higherIsBetter?: boolean,
 * }} input
 */
export function buildSaveGameFeedback(input = {}) {
  const {
    isPersonalBest = false,
    priorSummary = null,
    numericResult,
    higherIsBetter = true,
  } = input

  if (!priorSummary) {
    return isPersonalBest
      ? 'First saved result — personal best set'
      : 'Result saved to your progress'
  }

  const previous = Number(priorSummary.latestValue)
  const pr = Number(priorSummary.personalRecord)
  const next = Number(numericResult)

  if (isPersonalBest) {
    if (Number.isFinite(pr) && pr > 0 && Number.isFinite(next)) {
      const delta = higherIsBetter
        ? ((next - pr) / pr) * 100
        : ((pr - next) / pr) * 100
      if (delta >= 0.5) {
        return `New personal best · beat last PR by ${delta.toFixed(1)}%`
      }
    }
    return 'New personal best'
  }

  if (Number.isFinite(previous) && previous > 0 && Number.isFinite(next)) {
    const improved = higherIsBetter ? next > previous : next < previous
    if (improved) {
      const delta = higherIsBetter
        ? ((next - previous) / previous) * 100
        : ((previous - next) / previous) * 100
      if (delta >= 0.5) {
        return `Saved · beat last log by ${delta.toFixed(1)}%`
      }
      return 'Saved · edged past your last log'
    }
  }

  return 'Result saved · keep grinding'
}
