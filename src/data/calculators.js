/**
 * Registry of FitRank tools.
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
    description: 'Combine strength and running into one FitRank Score.',
    status: 'ready',
  },
]

export const navTabs = [
  ...calculators.map(({ id, name, status }) => ({
    id,
    name,
    status,
  })),
  {
    id: 'about',
    name: 'About',
    status: 'ready',
  },
]
