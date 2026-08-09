import {
  parseRequiredNumber,
  pointsFromAscendingSteps,
  pointsFromDescendingTimeSteps,
  toDurationSeconds,
  totalFromEventPoints,
} from './scoreEvents.js'
import {
  AIR_FORCE_PFRA_CHARTS,
  AIR_FORCE_PFRA_MINIMUMS,
  AIR_FORCE_PFRA_SOURCE,
} from '../../data/military/airForcePfraCharts.js'

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

  const strengthReps = parseRequiredNumber(values.strengthReps)
  const coreReps = parseRequiredNumber(values.coreReps)
  const plankSec = toDurationSeconds(values.plankMin, values.plankSec)
  const runSec = toDurationSeconds(values.runMin, values.runSec)
  const hamrShuttles = parseRequiredNumber(values.hamr)
  const waist = parseRequiredNumber(values.waist)
  const height = parseRequiredNumber(values.height)

  if (strengthReps == null || strengthReps < 0) return null
  if (waist == null || waist <= 0) return null
  if (height == null || height <= 0) return null

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
    if (coreReps == null || coreReps < 0) return null
    corePoints = pointsFromAscendingSteps(coreReps, chart.crunch)
    coreLabel = 'Cross-leg reverse crunch'
    coreRaw = coreReps
  } else {
    if (coreReps == null || coreReps < 0) return null
    corePoints = pointsFromAscendingSteps(coreReps, chart.situps)
    coreLabel = '1-min sit-ups'
    coreRaw = coreReps
  }

  let cardioPoints = null
  let cardioLabel = 'Cardio'
  let cardioRaw = null
  if (cardioChoice === 'hamr') {
    if (hamrShuttles == null || hamrShuttles < 0) return null
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
  const total =
    Math.round(totalFromEventPoints(events) * 10) / 10

  if (!componentsMet) {
    return {
      total,
      pass: false,
      category: 'Unsatisfactory',
      events,
      summary:
        'One or more components are below the official PFRA minimum (*). That is an Unsatisfactory / failure result.',
      companionSaves: [],
      source: AIR_FORCE_PFRA_SOURCE,
    }
  }

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
