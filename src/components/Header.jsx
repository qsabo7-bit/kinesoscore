import {
  calculators,
  DEFAULT_CALCULATOR_ID,
  isCalculatorTab,
  navTabs,
} from '../data/calculators'
import { BRAND } from '../data/brand'

function Header({ activeTab, onTabChange }) {
  const calculatorActive = isCalculatorTab(activeTab)

  const handleMainTab = (tabId) => {
    if (tabId === 'calculators') {
      onTabChange(calculatorActive ? activeTab : DEFAULT_CALCULATOR_ID)
      return
    }

    onTabChange(tabId)
  }

  return (
    <header className="site-header">
      <div className="site-header-top">
        <button
          type="button"
          className="brand"
          onClick={() => onTabChange('home')}
          title={BRAND.full}
          aria-label={BRAND.full}
        >
          {BRAND.short}
        </button>

        <nav className="site-nav" aria-label="Main">
          {navTabs.map((tab) => {
            const isActive =
              tab.id === 'calculators' ? calculatorActive : activeTab === tab.id
            const isDev = tab.status === 'development'

            return (
              <button
                key={tab.id}
                type="button"
                className={`nav-tab${isActive ? ' is-active' : ''}${isDev ? ' is-dev' : ''}`}
                onClick={() => handleMainTab(tab.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                {tab.name}
                {isDev ? <span className="nav-badge">Soon</span> : null}
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
