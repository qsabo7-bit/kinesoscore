/**
 * Registry of KinesoScore calculator tools.
 * Pages and nav read from this list.
 *
 * category:
 * - performance → Fitness Performance group
 * - fitness → Fitness Assessments group (benchmark WODs / max tests)
 * - military → Military Assessments group
 */

export const CALCULATOR_CATEGORIES = [
  {
    id: 'performance',
    label: 'Fitness Performance',
    stickyLabel: 'Performance',
  },
  {
    id: 'fitness',
    label: 'Fitness Assessments',
    stickyLabel: 'Assessments',
  },
  {
    id: 'military',
    label: 'Military Assessments',
    stickyLabel: 'Military',
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
    id: 'max-pushups',
    name: 'Max Push-ups',
    shortName: 'Max Push-ups',
    description:
      'Max push-ups in one minute — track unbroken capacity and compare on the leaderboard.',
    status: 'ready',
    category: 'fitness',
  },
  {
    id: 'max-pullups',
    name: 'Max Pull-ups',
    shortName: 'Max Pull-ups',
    description:
      'Max pull-ups in one minute — track hanging strength and pull-up capacity over time.',
    status: 'ready',
    category: 'fitness',
  },
  {
    id: 'fran',
    name: 'Fran',
    shortName: 'Fran',
    description:
      'Fran benchmark WOD calculator — 21-15-9 thrusters and pull-ups for time with Rx standards.',
    status: 'ready',
    category: 'fitness',
  },
  {
    id: 'murph',
    name: 'Murph',
    shortName: 'Murph',
    description:
      'Murph benchmark WOD calculator — mile, pull-ups, push-ups, squats, mile for time with Rx vest notes.',
    status: 'ready',
    category: 'fitness',
  },
  {
    id: 'cindy',
    name: 'Cindy',
    shortName: 'Cindy',
    description:
      'Cindy AMRAP calculator — 20-minute rounds of pull-ups, push-ups, and air squats.',
    status: 'ready',
    category: 'fitness',
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

/**
 * Educational guide tabs that keep calculator sticky tools open and
 * highlight the related calculator chip.
 */
export const CALCULATOR_GUIDE_TABS = {
  'fran-guide': 'fran',
  'murph-guide': 'murph',
  'cindy-guide': 'cindy',
  'army-aft-guide': 'army-aft',
  'air-force-pfra-guide': 'air-force-pfra',
  'marine-pft-guide': 'marine-pft',
  'navy-prt-guide': 'navy-prt',
  'vo2max-guide': 'vo2max',
  'one-rep-max': 'strength',
  'fitness-score': 'scoring',
  /** High-intent URL aliases → sticky chip highlight */
  acft: 'army-aft',
  '1rm': 'strength',
}

export function isCalculatorTab(tabId) {
  return (
    tabId === 'calculators' ||
    calculatorIds.has(tabId) ||
    Object.prototype.hasOwnProperty.call(CALCULATOR_GUIDE_TABS, tabId)
  )
}

/** Chip id to highlight in sticky tools (guides map to their calculator). */
export function stickyToolsHighlightTab(tabId) {
  return CALCULATOR_GUIDE_TABS[tabId] || tabId
}

export function calculatorsByCategory(categoryId) {
  return calculators.filter((tool) => tool.category === categoryId)
}

export const performanceCalculators = calculatorsByCategory('performance')
export const fitnessCalculators = calculatorsByCategory('fitness')
export const militaryCalculators = calculatorsByCategory('military')

/** Short sticky-nav label for calculator tool rows. */
export function calculatorCategoryStickyLabel(category) {
  if (!category) return ''
  if (category.stickyLabel) return category.stickyLabel
  if (category.id === 'performance') return 'Performance'
  return category.label
}

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
