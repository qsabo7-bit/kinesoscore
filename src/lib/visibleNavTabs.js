/**
 * Main nav items for the current auth state.
 * Guests: Home first; Dashboard/Habits stay out of the top bar (still linked from CTAs).
 * Signed-in: Dashboard first, then Calculators, Habits, Leaderboard, Groups.
 *
 * @param {{ isAuthenticated: boolean, showLogin: boolean }} opts
 */
export function getVisibleNavTabs({ isAuthenticated, showLogin }) {
  const tabs = []

  if (isAuthenticated) {
    tabs.push({ id: 'dashboard', name: 'Dashboard' })
  } else {
    tabs.push({ id: 'home', name: 'Home' })
  }

  tabs.push({ id: 'calculators', name: 'Calculators' })

  if (isAuthenticated) {
    tabs.push({ id: 'habits', name: 'Habits' })
  }

  tabs.push({ id: 'leaderboard', name: 'Leaderboard' })

  if (isAuthenticated) {
    tabs.push({ id: 'groups', name: 'Groups' })
  }

  tabs.push({ id: 'about', name: 'About' })

  if (showLogin) {
    tabs.push({ id: 'login', name: 'Log in' })
  }

  return tabs
}
