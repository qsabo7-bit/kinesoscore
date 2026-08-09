/**
 * Registry of KinesoScore calculator tools.
 * Pages and nav read from this list.
 *
 * category:
 * - performance → Fitness Performance group
 * - military → Military Fitness Assessments group
 */

export const CALCULATOR_CATEGORIES = [
  {
    id: 'performance',
    label: 'Fitness Performance',
  },
  {
    id: 'military',
    label: 'Military Fitness Assessments',
  },
]

export const calculators = [
  {
    id: 'strength',
    name: 'Strength',
    description:
      '1RM calculator for bench, squat, and deadlift using Epley — plus SBD total tracking.',
    status: 'ready',
    category: 'performance',
  },
  {
    id: 'running',
    name: 'Running',
    description:
      'Running fitness calculator for race predictions, pacing context, and endurance tracking.',
    status: 'ready',
    category: 'performance',
  },
  {
    id: 'scoring',
    name: 'myKinesoScore™',
    description:
      'Overall fitness score calculator combining strength and running percentiles.',
    status: 'ready',
    category: 'performance',
  },
  {
    id: 'vo2max',
    name: 'VO₂ Max',
    description:
      'VO₂ max calculator from Cooper and Rockport field tests with age–sex norms.',
    status: 'ready',
    category: 'performance',
  },
  {
    id: 'bmr',
    name: 'BMR',
    description:
      'BMR and TDEE calculator using the Mifflin–St Jeor metabolism equation.',
    status: 'ready',
    category: 'performance',
  },
  {
    id: 'bmi',
    name: 'BMI',
    description: 'BMI calculator with standard category bands and trend tracking.',
    status: 'ready',
    category: 'performance',
  },
  {
    id: 'fitness-age',
    name: 'Fitness Age',
    description:
      'VO₂ fitness age calculator using age- and sex-based cardiorespiratory norms.',
    status: 'ready',
    category: 'performance',
  },
  {
    id: 'air-force-pfra',
    name: 'Air Force PFRA',
    description:
      'Air Force PFRA calculator for unofficial readiness score estimates and training feedback.',
    status: 'ready',
    category: 'military',
    badge: 'NEW',
  },
  {
    id: 'air-force-pfa',
    name: 'Air Force PFA',
    description:
      'Legacy Air Force PFA calculator for historical fitness assessment estimates.',
    status: 'ready',
    category: 'military',
    badge: 'Legacy',
  },
  {
    id: 'army-aft',
    name: 'Army AFT',
    description:
      'Army AFT calculator for deadlift, HRPU, SDC, plank, and 2-mile run estimates.',
    status: 'ready',
    category: 'military',
  },
  {
    id: 'marine-pft',
    name: 'Marine Corps PFT',
    description:
      'Marine PFT calculator for pull-ups or push-ups, plank, and 3-mile run estimates.',
    status: 'ready',
    category: 'military',
  },
  {
    id: 'navy-prt',
    name: 'Navy PRT',
    description:
      'Navy PRT calculator for push-ups, plank, and 1.5-mile run readiness estimates.',
    status: 'ready',
    category: 'military',
  },
]

export const DEFAULT_CALCULATOR_ID = 'strength'

export const calculatorIds = new Set(calculators.map((tool) => tool.id))

export function isCalculatorTab(tabId) {
  return tabId === 'calculators' || calculatorIds.has(tabId)
}

export function calculatorsByCategory(categoryId) {
  return calculators.filter((tool) => tool.category === categoryId)
}

export const performanceCalculators = calculatorsByCategory('performance')
export const militaryCalculators = calculatorsByCategory('military')

/** Top-level navigation: Calculators grouped under one parent tab. */
export const navTabs = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    status: 'ready',
  },
  {
    id: 'calculators',
    name: 'Calculators',
    status: 'ready',
  },
  {
    id: 'leaderboard',
    name: 'Leaderboard',
    status: 'ready',
  },
  {
    id: 'habits',
    name: 'Habits',
    status: 'ready',
  },
  {
    id: 'about',
    name: 'About',
    status: 'ready',
  },
  {
    id: 'login',
    name: 'Log in',
    status: 'ready',
  },
]
