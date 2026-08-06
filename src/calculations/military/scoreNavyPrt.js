import {
  pointsFromAscendingSteps,
  pointsFromDescendingTimeSteps,
} from './scoreEvents.js'
import { NAVY_PRT_CHARTS, NAVY_PRT_SOURCE } from '../../data/military/navyPrtCharts.js'

function toSeconds(min, sec) {
  if (min === '' || min == null) return null
  const m = Number(min)
  const s = sec === '' || sec == null ? 0 : Number(sec)
  if (!Number.isFinite(m) || m < 0) return null
  if (!Number.isFinite(s) || s < 0 || s > 59) return null
  return m * 60 + s
}

function categoryFromPoints(points) {
  if (points == null || !Number.isFinite(points)) return null
  if (points >= 90) {
    if (points >= 100) return 'Outstanding High'
    if (points >= 95) return 'Outstanding Medium'
    return 'Outstanding Low'
  }
  if (points >= 75) {
    if (points >= 85) return 'Excellent High'
    if (points >= 80) return 'Excellent Medium'
    return 'Excellent Low'
  }
  if (points >= 60) {
    if (points >= 70) return 'Good High'
    if (points >= 65) return 'Good Medium'
    return 'Good Low'
  }
  if (points >= 50) {
    if (points >= 55) return 'Satisfactory High'
    return 'Satisfactory Medium'
  }
  if (points >= 45) return 'Probationary'
  return 'Failure'
}

/**
 * Score Navy PRT from official Guide 5 Table 4-1 (< 5,000 ft).
 * @returns {null | object}
 */
export function scoreNavyPrt({ ageBand, gender, values }) {
  const key = `${gender}|${ageBand}`
  const chart = NAVY_PRT_CHARTS[key]
  if (!chart) return null

  const pushups = Number(values.pushups)
  const plankSec = toSeconds(values.plankMin, values.plankSec)
  const runSec = toSeconds(values.runMin, values.runSec)

  if (!Number.isFinite(pushups) || pushups < 0) return null
  if (plankSec == null || runSec == null) return null

  const pushPoints = pointsFromAscendingSteps(pushups, chart.pushups)
  const plankPoints = pointsFromAscendingSteps(plankSec, chart.plank)
  const runPoints = pointsFromDescendingTimeSteps(runSec, chart.run)

  const events = [
    {
      id: 'pushups',
      label: 'Push-ups',
      points: pushPoints,
      raw: pushups,
    },
    {
      id: 'plank',
      label: 'Forearm plank',
      points: plankPoints,
      raw: plankSec,
    },
    {
      id: 'run',
      label: '1.5-mile run',
      points: runPoints,
      raw: runSec,
    },
  ]

  const failedEvent = events.some((event) => event.points == null)
  if (failedEvent) {
    return {
      total: null,
      pass: false,
      category: 'Failure',
      events,
      summary:
        'One or more events are below the Probationary minimum for your age and gender. That is a PRT failure under Guide 5 standards.',
      companionSaves: [],
      source: NAVY_PRT_SOURCE,
    }
  }

  const total = Math.round(
    (pushPoints + plankPoints + runPoints) / 3,
  )
  const category = categoryFromPoints(total)
  const pass = total >= 45

  return {
    total,
    pass,
    category,
    events,
    summary: pass
      ? `Overall ${category} (${total} pts) — average of push-ups, plank, and 1.5-mile run.`
      : `Overall Failure (${total} pts).`,
    companionSaves: [],
    source: NAVY_PRT_SOURCE,
  }
}
