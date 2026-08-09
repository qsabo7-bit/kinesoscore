import { isCalculatorTab } from '../data/calculators.js'

/**
 * Whether a main nav tab should show the active underline.
 * Home has no nav item — nothing is active there (Dashboard must stay off).
 *
 * @param {string} tabId
 * @param {string} activeTab
 */
export function isNavTabActive(tabId, activeTab) {
  if (tabId === 'calculators') return isCalculatorTab(activeTab)
  if (tabId === 'leaderboard') {
    return activeTab === 'leaderboard' || activeTab === 'leaderboard-habits'
  }
  return activeTab === tabId
}
