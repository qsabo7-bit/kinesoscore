import {
  parseRequiredNumber,
  pointsFromAscendingSteps,
  pointsFromDescendingTimeSteps,
  toDurationSeconds,
  totalFromEventPoints,
} from './scoreEvents.js'
import {
  MARINE_PFT_CHARTS,
  MARINE_PFT_CLASSIFICATION,
  MARINE_PFT_SOURCE,
} from '../../data/military/marinePftCharts.js'

function classificationFromTotal(total) {
  if (total == null || !Number.isFinite(total)) return 'Failure'
  for (const band of MARINE_PFT_CLASSIFICATION) {
    if (total >= band.min && total <= band.max) return band.label
  }
  if (total > 300) return '1st Class'
  return 'Failure'
}

/**
 * Score Marine Corps PFT from MCO 6100.13A (pull-ups/push-ups, CH-4 plank, 3-mile run).
 */
export function scoreMarinePft({ ageBand, gender, values }) {
  const key = `${gender}|${ageBand}`
  const chart = MARINE_PFT_CHARTS[key]
  if (!chart) return null

  const upperChoice = values.upperBodyChoice === 'pushups' ? 'pushups' : 'pullups'
  const upperReps = parseRequiredNumber(values.upperBodyReps)
  const plankSec = toDurationSeconds(values.plankMin, values.plankSec)
  const runSec = toDurationSeconds(values.runMin, values.runSec)

  if (upperReps == null || upperReps < 0) return null
  if (plankSec == null || runSec == null) return null

  const upperSteps = upperChoice === 'pushups' ? chart.pushups : chart.pullups
  const upperPoints = pointsFromAscendingSteps(upperReps, upperSteps)
  const plankPoints = pointsFromAscendingSteps(plankSec, chart.plank)
  const runPoints = pointsFromDescendingTimeSteps(runSec, chart.run)

  const events = [
    {
      id: 'upperBody',
      label: upperChoice === 'pushups' ? 'Push-ups' : 'Pull-ups',
      points: upperPoints,
      raw: upperReps,
    },
    {
      id: 'plank',
      label: 'Forearm plank',
      points: plankPoints,
      raw: plankSec,
    },
    {
      id: 'run',
      label: '3-mile run',
      points: runPoints,
      raw: runSec,
    },
  ]

  const failedEvent = events.some((event) => event.points == null)
  const total = totalFromEventPoints(events)

  if (failedEvent) {
    return {
      total,
      pass: false,
      category: 'Failure',
      events,
      summary:
        'One or more events are below the published minimum for your age and gender. That is a PFT failure.',
      companionSaves: [],
      source: MARINE_PFT_SOURCE,
    }
  }

  const pass = total >= 150
  const category = pass ? classificationFromTotal(total) : 'Failure'

  return {
    total,
    pass,
    category,
    events,
    summary: pass
      ? `Overall ${category} (${total} pts).`
      : `Overall Failure (${total} pts) — total below 150.`,
    companionSaves: [],
    source: MARINE_PFT_SOURCE,
  }
}
