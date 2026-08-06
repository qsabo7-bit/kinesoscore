import {
  pointsFromAscendingSteps,
  pointsFromDescendingTimeSteps,
} from './scoreEvents.js'
import {
  AIR_FORCE_PFRA_CHARTS,
  AIR_FORCE_PFRA_MINIMUMS,
  AIR_FORCE_PFRA_SOURCE,
} from '../../data/military/airForcePfraCharts.js'

function toSeconds(min, sec) {
  if (min === '' || min == null) return null
  const m = Number(min)
  const s = sec === '' || sec == null ? 0 : Number(sec)
  if (!Number.isFinite(m) || m < 0) return null
  if (!Number.isFinite(s) || s < 0 || s > 59) return null
  return m * 60 + s
}

function categoryFromTotal(total, pass) {
  if (!pass || total == null) return 'Unsatisfactory'
  if (total >= 90) return 'Excellent'
  if (total >= AIR_FORCE_PFRA_MINIMUMS.composite) return 'Satisfactory'
  return 'Unsatisfactory'
}

/**
 * Score Air Force PFRA from official AFPC charts (effective 1 Mar 2026).
 */
export function scoreAirForcePfra({ ageBand, gender, values }) {
  const key = `${gender}|${ageBand}`
  const chart = AIR_FORCE_PFRA_CHARTS[key]
  if (!chart) return null

  const strengthChoice = values.strengthChoice || 'pushups'
  const coreChoice = values.coreChoice || 'situps'
  const cardioChoice = values.cardioChoice || 'run'

  const strengthReps = Number(values.strengthReps)
  const coreReps = Number(values.coreReps)
  const plankSec = toSeconds(values.plankMin, values.plankSec)
  const runSec = toSeconds(values.runMin, values.runSec)
  const hamrShuttles = Number(values.hamr)
  const waist = Number(values.waist)
  const height = Number(values.height)

  if (!Number.isFinite(strengthReps) || strengthReps < 0) return null
  if (!Number.isFinite(waist) || waist <= 0) return null
  if (!Number.isFinite(height) || height <= 0) return null

  const strengthSteps =
    strengthChoice === 'hrPushups' ? chart.hrPushups : chart.pushups
  const strengthPoints = pointsFromAscendingSteps(strengthReps, strengthSteps)
  const strengthLabel =
    strengthChoice === 'hrPushups'
      ? 'Hand-release push-ups'
      : '1-min push-ups'

  let corePoints = null
  let coreLabel = 'Core'
  let coreRaw = null
  if (coreChoice === 'plank') {
    if (plankSec == null) return null
    corePoints = pointsFromAscendingSteps(plankSec, chart.plank)
    coreLabel = 'Forearm plank'
    coreRaw = plankSec
  } else if (coreChoice === 'crunch') {
    if (!Number.isFinite(coreReps) || coreReps < 0) return null
    corePoints = pointsFromAscendingSteps(coreReps, chart.crunch)
    coreLabel = 'Cross-leg reverse crunch'
    coreRaw = coreReps
  } else {
    if (!Number.isFinite(coreReps) || coreReps < 0) return null
    corePoints = pointsFromAscendingSteps(coreReps, chart.situps)
    coreLabel = '1-min sit-ups'
    coreRaw = coreReps
  }

  let cardioPoints = null
  let cardioLabel = 'Cardio'
  let cardioRaw = null
  if (cardioChoice === 'hamr') {
    if (!Number.isFinite(hamrShuttles) || hamrShuttles < 0) return null
    cardioPoints = pointsFromAscendingSteps(hamrShuttles, chart.hamr)
    cardioLabel = '20m HAMR'
    cardioRaw = hamrShuttles
  } else {
    if (runSec == null) return null
    cardioPoints = pointsFromDescendingTimeSteps(runSec, chart.run)
    cardioLabel = '2-mile run'
    cardioRaw = runSec
  }

  const whtr = waist / height
  // Lower ratio is better; charts use ≤ thresholds.
  let whtrPoints = pointsFromDescendingTimeSteps(whtr, chart.whtr)
  if (whtrPoints == null && whtr >= 0.6) whtrPoints = 0

  const events = [
    {
      id: 'cardio',
      label: cardioLabel,
      points: cardioPoints,
      raw: cardioRaw,
    },
    {
      id: 'whtr',
      label: 'Waist-to-height ratio',
      points: whtrPoints,
      raw: Number(whtr.toFixed(3)),
    },
    {
      id: 'strength',
      label: strengthLabel,
      points: strengthPoints,
      raw: strengthReps,
    },
    {
      id: 'core',
      label: coreLabel,
      points: corePoints,
      raw: coreRaw,
    },
  ]

  const strengthOk =
    strengthPoints != null && strengthPoints >= AIR_FORCE_PFRA_MINIMUMS.strength
  const coreOk =
    corePoints != null && corePoints >= AIR_FORCE_PFRA_MINIMUMS.core
  const cardioOk =
    cardioPoints != null && cardioPoints >= AIR_FORCE_PFRA_MINIMUMS.cardio
  const whtrOk =
    whtrPoints != null && whtrPoints >= AIR_FORCE_PFRA_MINIMUMS.whtr

  const componentsMet = strengthOk && coreOk && cardioOk && whtrOk
  if (!componentsMet) {
    return {
      total: null,
      pass: false,
      category: 'Unsatisfactory',
      events,
      summary:
        'One or more components are below the official PFRA minimum (*). That is an Unsatisfactory / failure result.',
      companionSaves: [],
      source: AIR_FORCE_PFRA_SOURCE,
    }
  }

  const total =
    Math.round(
      (cardioPoints + whtrPoints + strengthPoints + corePoints) * 10,
    ) / 10
  const pass = total >= AIR_FORCE_PFRA_MINIMUMS.composite
  const category = categoryFromTotal(total, pass)

  return {
    total,
    pass,
    category,
    events,
    summary: pass
      ? `Overall ${total} pts — ${category}.`
      : `Overall Unsatisfactory (${total} pts). Composite must be at least ${AIR_FORCE_PFRA_MINIMUMS.composite}.`,
    companionSaves: [],
    source: AIR_FORCE_PFRA_SOURCE,
  }
}
