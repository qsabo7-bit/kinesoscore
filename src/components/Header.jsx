import { useAuth } from '../auth/AuthContext'
import {
  calculators,
  DEFAULT_CALCULATOR_ID,
  isCalculatorTab,
  navTabs,
} from '../data/calculators'
import { BRAND } from '../data/brand'

function Header({ activeTab, onTabChange }) {
  const { isAuthenticated, firstName, loading } = useAuth()
  const calculatorActive = isCalculatorTab(activeTab)
  const brandLabel =
    activeTab === 'home' || activeTab === 'about' ? BRAND.mark : BRAND.short

  // Wait for session restore before deciding Login vs Welcome.
  const showLogin = !loading && !isAuthenticated
  const showWelcome = !loading && isAuthenticated

  const visibleTabs = navTabs.filter((tab) => {
    if (tab.id === 'login') return showLogin
    return true
  })

  const handleMainTab = (tabId) => {
    if (tabId === 'calculators') {
      onTabChange(calculatorActive ? activeTab : DEFAULT_CALCULATOR_ID)
      return
    }

    onTabChange(tabId)
  }

  return (
    <header className="site-header">
      {showWelcome ? (
        <div className="account-welcome-bar">
          <button
            type="button"
            className="account-welcome-link"
            onClick={() => onTabChange('account')}
            aria-label="Open account settings"
          >
            {activeTab === 'dashboard'
              ? 'Account'
              : `Welcome, ${firstName || 'Athlete'}`}
          </button>
        </div>
      ) : null}

      <div className="site-header-top">
        <button
          type="button"
          className="brand"
          onClick={() => onTabChange('home')}
          title={BRAND.full}
          aria-label={BRAND.full}
        >
          {brandLabel}
        </button>

        <nav className="site-nav" aria-label="Main">
          {visibleTabs.map((tab) => {
            const isActive =
              tab.id === 'calculators'
                ? calculatorActive
                : activeTab === tab.id

            return (
              <button
                key={tab.id}
                type="button"
                className={`nav-tab${isActive ? ' is-active' : ''}`}
                onClick={() => handleMainTab(tab.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.name}
              </button>
            )
          })}
        </nav>
      </div>

      {calculatorActive ? (
        <nav className="sub-nav" aria-label="Calculator tools">
          {calculators.map((tool) => {
            const isActive = activeTab === tool.id
            const isDev = tool.status === 'development'

            return (
              <button
                key={tool.id}
                type="button"
                className={`sub-nav-tab${isActive ? ' is-active' : ''}${isDev ? ' is-dev' : ''}`}
                onClick={() => onTabChange(tool.id)}
                aria-current={isActive ? 'page' : undefined}
                disabled={isDev}
              >
                {tool.name}
                {isDev ? <span className="nav-badge">Soon</span> : null}
              </button>
            )
          })}
        </nav>
      ) : null}
    </header>
  )
}

export default Header
