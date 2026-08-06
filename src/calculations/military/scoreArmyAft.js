import {
  pointsFromAscendingSteps,
  pointsFromDescendingTimeSteps,
} from './scoreEvents.js'
import { ARMY_AFT_CHARTS, ARMY_AFT_SOURCE } from '../../data/military/armyAftCharts.js'

function toSeconds(min, sec) {
  if (min === '' || min == null) return null
  const m = Number(min)
  const s = sec === '' || sec == null ? 0 : Number(sec)
  if (!Number.isFinite(m) || m < 0) return null
  if (!Number.isFinite(s) || s < 0 || s > 59) return null
  return m * 60 + s
}

function categoryFromTotal(total, pass) {
  if (!pass || total == null) return 'Failure'
  if (total >= 350) return 'Combat Standard Met'
  if (total >= 300) return 'General Standard Met'
  return 'Failure'
}

/**
 * Score Army Fitness Test from official AFT scales (effective 1 June 2025).
 * Uses general male/female age-normed columns. Combat sex-neutral column not applied.
 */
export function scoreArmyAft({ ageBand, gender, values }) {
  const key = `${gender}|${ageBand}`
  const chart = ARMY_AFT_CHARTS[key]
  if (!chart) return null

  const deadlift = Number(values.deadlift)
  const hrPushups = Number(values.hrPushups)
  const sdcSec = toSeconds(values.sdcMin, values.sdcSec)
  const plankSec = toSeconds(values.plankMin, values.plankSec)
  const runSec = toSeconds(values.runMin, values.runSec)

  if (!Number.isFinite(deadlift) || deadlift < 0) return null
  if (!Number.isFinite(hrPushups) || hrPushups < 0) return null
  if (sdcSec == null || plankSec == null || runSec == null) return null

  const events = [
    {
      id: 'deadlift',
      label: '3-rep max deadlift',
      points: pointsFromAscendingSteps(deadlift, chart.deadlift),
      raw: deadlift,
    },
    {
      id: 'hrPushups',
      label: 'Hand-release push-ups',
      points: pointsFromAscendingSteps(hrPushups, chart.hrPushups),
      raw: hrPushups,
    },
    {
      id: 'sdc',
      label: 'Sprint-Drag-Carry',
      points: pointsFromDescendingTimeSteps(sdcSec, chart.sdc),
      raw: sdcSec,
    },
    {
      id: 'plank',
      label: 'Plank',
      points: pointsFromAscendingSteps(plankSec, chart.plank),
      raw: plankSec,
    },
    {
      id: 'run',
      label: '2-mile run',
      points: pointsFromDescendingTimeSteps(runSec, chart.run),
      raw: runSec,
    },
  ]

  const belowMinimum = events.some(
    (event) => event.points == null || event.points < 60,
  )

  if (belowMinimum) {
    return {
      total: null,
      pass: false,
      category: 'Failure',
      events,
      summary:
        'One or more events are below 60 points. Under AFT general standards, that is a failure.',
      companionSaves: [],
      source: ARMY_AFT_SOURCE,
    }
  }

  const total = events.reduce((sum, event) => sum + event.points, 0)
  const pass = total >= 300
  const category = categoryFromTotal(total, pass)

  return {
    total,
    pass,
    category,
    events,
    summary: pass
      ? `Overall ${total} pts — ${category}.`
      : `Overall Failure (${total} pts).`,
    companionSaves: [],
    source: ARMY_AFT_SOURCE,
  }
}
