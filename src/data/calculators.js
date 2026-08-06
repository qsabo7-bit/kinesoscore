/**
 * Registry of FPC tools.
 * Pages and nav read from this list.
 */
export const calculators = [
  {
    id: 'strength',
    name: 'Strength',
    description: 'Estimate one-rep max and strength standards.',
    status: 'ready',
  },
  {
    id: 'running',
    name: 'Running',
    description: 'Predict race times and training paces.',
    status: 'ready',
  },
  {
    id: 'scoring',
    name: 'Fitness Scoring',
    description: 'Combine strength and running into one FPC Score.',
    status: 'ready',
  },
  {
    id: 'vo2max',
    name: 'VO₂ Max',
    description: 'Estimate VO₂ max from Cooper or Rockport field tests.',
    status: 'ready',
  },
  {
    id: 'bmr',
    name: 'BMR',
    description: 'Estimate resting metabolism and daily calorie needs.',
    status: 'ready',
  },
  {
    id: 'bmi',
    name: 'BMI',
    description: 'Calculate body mass index and WHO weight category.',
    status: 'ready',
  },
  {
    id: 'fitness-age',
    name: 'Fitness Age',
    description: 'Estimate FPC Fitness Age from VO₂, heart rate, and training.',
    status: 'ready',
  },
]

export const DEFAULT_CALCULATOR_ID = 'strength'

export const calculatorIds = new Set(calculators.map((tool) => tool.id))

export function isCalculatorTab(tabId) {
  return calculatorIds.has(tabId)
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
