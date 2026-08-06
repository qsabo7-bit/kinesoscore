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
    description: 'Estimate one-rep max and strength standards.',
    status: 'ready',
    category: 'performance',
  },
  {
    id: 'running',
    name: 'Running',
    description: 'Predict race times and training paces.',
    status: 'ready',
    category: 'performance',
  },
  {
    id: 'scoring',
    name: 'Fitness Scoring',
    description: 'Combine strength and running into one KinesoScore.',
    status: 'ready',
    category: 'performance',
  },
  {
    id: 'vo2max',
    name: 'VO₂ Max',
    description: 'Estimate VO₂ max from Cooper or Rockport field tests.',
    status: 'ready',
    category: 'performance',
  },
  {
    id: 'bmr',
    name: 'BMR',
    description: 'Estimate resting metabolism and daily calorie needs.',
    status: 'ready',
    category: 'performance',
  },
  {
    id: 'bmi',
    name: 'BMI',
    description: 'Calculate body mass index and WHO weight category.',
    status: 'ready',
    category: 'performance',
  },
  {
    id: 'fitness-age',
    name: 'Fitness Age',
    description: 'Estimate Fitness Age from VO₂, heart rate, and training.',
    status: 'ready',
    category: 'performance',
  },
  {
    id: 'air-force-pfra',
    name: 'Air Force PFRA',
    description: 'Current Air Force Physical Fitness Readiness Assessment score estimator.',
    status: 'ready',
    category: 'military',
    badge: 'NEW',
  },
  {
    id: 'air-force-pfa',
    name: 'Air Force PFA',
    description: 'Legacy Air Force Physical Fitness Assessment score estimator.',
    status: 'ready',
    category: 'military',
    badge: 'Legacy',
  },
  {
    id: 'army-aft',
    name: 'Army AFT',
    description: 'Army Fitness Test score estimator.',
    status: 'ready',
    category: 'military',
  },
  {
    id: 'marine-pft',
    name: 'Marine Corps PFT',
    description: 'Marine Corps Physical Fitness Test score estimator.',
    status: 'ready',
    category: 'military',
  },
  {
    id: 'navy-prt',
    name: 'Navy PRT',
    description: 'Navy Physical Readiness Test score estimator.',
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
    name: 'Calculator',
    status: 'ready',
  },
  {
    id: 'login',
    name: 'Login',
    status: 'ready',
  },
  {
    id: 'about',
    name: 'About',
    status: 'ready',
  },
]
