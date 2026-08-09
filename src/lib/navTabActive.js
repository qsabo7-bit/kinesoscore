import { isCalculatorTab } from '../data/calculators.js'

/**
 * Whether a main nav tab should show the active underline.
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
