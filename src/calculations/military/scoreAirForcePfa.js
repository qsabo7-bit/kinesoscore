import {
  pointsFromAscendingSteps,
  pointsFromDescendingTimeSteps,
} from './scoreEvents.js'
import {
  AIR_FORCE_PFA_CATEGORIES,
  AIR_FORCE_PFA_CHARTS,
  AIR_FORCE_PFA_SOURCE,
} from '../../data/military/airForcePfaCharts.js'

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
  if (total >= AIR_FORCE_PFA_CATEGORIES.excellent) return 'Excellent'
  if (total >= AIR_FORCE_PFA_CATEGORIES.satisfactory) return 'Satisfactory'
  return 'Unsatisfactory'
}

/**
 * Score legacy Air Force PFA from DAFMAN 36-2905 Attachment 2 charts
 * (26 July 2021): 1.5-mile run, push-ups, sit-ups.
 */
export function scoreAirForcePfa({ ageBand, gender, values }) {
  const key = `${gender}|${ageBand}`
  const chart = AIR_FORCE_PFA_CHARTS[key]
  if (!chart) return null

  const pushups = Number(values.pushups)
  const situps = Number(values.situps)
  const runSec = toSeconds(values.runMin, values.runSec)

  if (!Number.isFinite(pushups) || pushups < 0) return null
  if (!Number.isFinite(situps) || situps < 0) return null
  if (runSec == null) return null

  const runPoints = pointsFromDescendingTimeSteps(runSec, chart.run)
  const pushPoints = pointsFromAscendingSteps(pushups, chart.pushups)
  const sitPoints = pointsFromAscendingSteps(situps, chart.situps)

  const events = [
    {
      id: 'run',
      label: '1.5-mile run',
      points: runPoints,
      raw: runSec,
    },
    {
      id: 'pushups',
      label: 'Push-ups',
      points: pushPoints,
      raw: pushups,
    },
    {
      id: 'situps',
      label: 'Sit-ups',
      points: sitPoints,
      raw: situps,
    },
  ]

  const mins = chart.minimums || {}
  const runOk =
    runPoints != null &&
    (mins.runMaxSec == null || runSec <= mins.runMaxSec)
  const pushOk =
    pushPoints != null &&
    (mins.pushMin == null || pushups >= mins.pushMin)
  const sitOk =
    sitPoints != null &&
    (mins.sitMin == null || situps >= mins.sitMin)

  if (!runOk || !pushOk || !sitOk) {
    return {
      total: null,
      pass: false,
      category: 'Unsatisfactory',
      events,
      summary:
        'One or more components are below the official legacy PFA minimum. That is an Unsatisfactory result.',
      companionSaves: [],
      source: AIR_FORCE_PFA_SOURCE,
    }
  }

  const total =
    Math.round((runPoints + pushPoints + sitPoints) * 10) / 10
  const pass = total >= AIR_FORCE_PFA_CATEGORIES.satisfactory
  const category = categoryFromTotal(total, pass)

  return {
    total,
    pass,
    category,
    events,
    summary: pass
      ? `Overall ${total} pts — ${category}.`
      : `Overall Unsatisfactory (${total} pts).`,
    companionSaves: [],
    source: AIR_FORCE_PFA_SOURCE,
  }
}
