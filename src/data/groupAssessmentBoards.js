import { BRAND } from './brand.js'
import { LEADERBOARD_SHARE_TARGETS } from '../lib/leaderboardShares.js'

/**
 * Existing KinesoScore assessment/score boards that Groups can surface.
 * Labels only — scoring still comes from performance_records.
 */
export const GROUP_ASSESSMENT_BOARD_OPTIONS = LEADERBOARD_SHARE_TARGETS.map(
  (t) => {
    let label = t.exerciseName
    if (t.boardKey === 'mykinesoscore') {
      label = BRAND.scoreName.replace('™', '')
    } else if (t.boardKey.startsWith('assessment:')) {
      const map = {
        'assessment:air-force-pfra': 'Air Force PFRA',
        'assessment:air-force-pfa': 'Air Force PFA',
        'assessment:army-aft': 'Army AFT',
        'assessment:marine-pft': 'Marine PFT',
        'assessment:navy-prt': 'Navy PRT',
      }
      label = map[t.boardKey] || t.exerciseName
    } else if (t.boardKey.startsWith('fitness:')) {
      label = t.exerciseName
    } else if (t.boardKey.startsWith('strength:')) {
      label = `Strength · ${t.exerciseName}`
    } else if (t.boardKey.startsWith('running:')) {
      label = `Running · ${t.exerciseName}`
    }
    return {
      boardKey: t.boardKey,
      label,
      higherIsBetter: t.higherIsBetter,
      calculatorType: t.calculatorType,
      exerciseName: t.exerciseName,
    }
  },
)

/**
 * Compact catalog for Settings (score + military + key fitness + strength totals).
 * Full LEADERBOARD_SHARE_TARGETS remain shareable when a calculator resolves a board.
 */
export const GROUP_ASSESSMENT_SETTINGS_OPTIONS =
  GROUP_ASSESSMENT_BOARD_OPTIONS.filter((o) => {
    if (o.boardKey === 'mykinesoscore') return true
    if (o.boardKey.startsWith('assessment:')) return true
    if (o.boardKey.startsWith('fitness:')) return true
    if (o.boardKey === 'strength:SBD Total') return true
    if (
      o.boardKey === 'running:1.5 Mile' ||
      o.boardKey === 'running:5K' ||
      o.boardKey === 'running:Mile'
    ) {
      return true
    }
    return false
  }).map((o) => {
    // Short chip labels — category is shown by the section header.
    let shortLabel = o.label
    if (o.boardKey === 'mykinesoscore') shortLabel = 'Score'
    else if (o.boardKey === 'strength:SBD Total') shortLabel = 'SBD Total'
    else if (o.boardKey.startsWith('running:')) {
      shortLabel = o.exerciseName || o.label.replace(/^Running · /, '')
    } else if (o.boardKey.startsWith('fitness:')) {
      shortLabel = o.exerciseName || o.label
    }
    return { ...o, shortLabel }
  })

/**
 * Grouped Settings picker for assessment leaderboard tabs.
 * @returns {Array<{ id: string, label: string, options: typeof GROUP_ASSESSMENT_SETTINGS_OPTIONS }>}
 */
export function groupAssessmentSettingsSections() {
  const score = []
  const military = []
  const fitness = []
  const strength = []
  const running = []

  for (const opt of GROUP_ASSESSMENT_SETTINGS_OPTIONS) {
    if (opt.boardKey === 'mykinesoscore') score.push(opt)
    else if (opt.boardKey.startsWith('assessment:')) military.push(opt)
    else if (opt.boardKey.startsWith('fitness:')) fitness.push(opt)
    else if (opt.boardKey.startsWith('strength:')) strength.push(opt)
    else if (opt.boardKey.startsWith('running:')) running.push(opt)
  }

  return [
    { id: 'score', label: 'Score', options: score },
    { id: 'military', label: 'Military', options: military },
    { id: 'fitness', label: 'Fitness', options: fitness },
    { id: 'strength', label: 'Strength', options: strength },
    { id: 'running', label: 'Running', options: running },
  ].filter((section) => section.options.length > 0)
}

export function labelForGroupBoardKey(boardKey) {
  const hit = GROUP_ASSESSMENT_BOARD_OPTIONS.find((o) => o.boardKey === boardKey)
  return hit?.label || boardKey
}

export function groupBoardMeta(boardKey) {
  return (
    GROUP_ASSESSMENT_BOARD_OPTIONS.find((o) => o.boardKey === boardKey) || null
  )
}

/**
 * App tab id for navigating to the calculator that produces this board.
 * @param {string} boardKey
 * @returns {string}
 */
export function tabIdForGroupBoardKey(boardKey) {
  const meta = groupBoardMeta(boardKey)
  if (!meta?.calculatorType) return 'calculators'
  const type = String(meta.calculatorType)
  if (type === 'mykinesoscore' || type.includes('score')) return 'scoring'
  if (PAGE_SEO_TAB_IDS.has(type)) return type
  if (type === 'strength') return 'strength'
  if (type === 'running') return 'running'
  return 'calculators'
}

/** Tab ids that exist in App / PAGE_SEO for calculator deep links. */
const PAGE_SEO_TAB_IDS = new Set([
  'scoring',
  'strength',
  'running',
  'air-force-pfra',
  'air-force-pfa',
  'army-aft',
  'marine-pft',
  'navy-prt',
  'max-pushups',
  'max-pullups',
  'fran',
  'murph',
  'cindy',
  'vo2max',
  'bmr',
  'bmi',
  'fitness-age',
])

