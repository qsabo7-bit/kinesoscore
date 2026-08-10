const PREFIX = 'ks:lastCalculator:v1:'
const memory = new Map()

const CALCULATOR_TABS = new Set([
  'scoring',
  'strength',
  'running',
  'vo2max',
  'bmr',
  'bmi',
  'fitness-age',
  'army-aft',
  'air-force-pfra',
  'air-force-pfa',
  'marine-pft',
  'navy-prt',
  'max-pushups',
  'max-pullups',
  'fran',
  'murph',
  'cindy',
  'habits',
])

function storageGet(key) {
  if (typeof localStorage !== 'undefined') {
    try {
      return localStorage.getItem(key)
    } catch {
      // fall through
    }
  }
  return memory.has(key) ? memory.get(key) : null
}

function storageSet(key, value) {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(key, value)
      return
    } catch {
      // fall through
    }
  }
  memory.set(key, value)
}

export function isCalculatorResumeTab(tabId) {
  return CALCULATOR_TABS.has(String(tabId || ''))
}

/**
 * @param {string} userId
 * @param {string} tabId
 */
export function rememberLastCalculatorTab(userId, tabId) {
  if (!userId || !isCalculatorResumeTab(tabId)) return
  storageSet(
    `${PREFIX}${userId}`,
    JSON.stringify({ tab: tabId, at: new Date().toISOString() }),
  )
}

/**
 * @param {string} userId
 * @returns {string | null}
 */
export function peekLastCalculatorTab(userId) {
  if (!userId) return null
  const raw = storageGet(`${PREFIX}${userId}`)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw)
    const tab = String(parsed?.tab || '')
    return isCalculatorResumeTab(tab) ? tab : null
  } catch {
    return null
  }
}

export function resumeLabelForTab(tabId) {
  const labels = {
    scoring: 'myKinesoScore',
    strength: 'Strength',
    running: 'Running',
    vo2max: 'VO₂ max',
    bmr: 'BMR',
    bmi: 'BMI',
    'fitness-age': 'Fitness Age',
    'army-aft': 'Army AFT',
    'air-force-pfra': 'Air Force PFRA',
    'air-force-pfa': 'Air Force PFA',
    'marine-pft': 'Marine PFT',
    'navy-prt': 'Navy PRT',
    'max-pushups': 'Max Push-ups',
    'max-pullups': 'Max Pull-ups',
    fran: 'Fran',
    murph: 'Murph',
    cindy: 'Cindy',
    habits: 'Habits',
  }
  return labels[tabId] || 'Continue'
}
