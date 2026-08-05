import { navTabs } from '../data/calculators'

function Header({ activeTab, onTabChange }) {
  return (
    <header className="site-header">
      <button
        type="button"
        className="brand"
        onClick={() => onTabChange('home')}
      >
        FPC
      </button>

      <nav className="site-nav" aria-label="Main">
        {navTabs.map((tab) => {
          const isActive = activeTab === tab.id
          const isDev = tab.status === 'development'

          return (
            <button
              key={tab.id}
              type="button"
              className={`nav-tab${isActive ? ' is-active' : ''}${isDev ? ' is-dev' : ''}`}
              onClick={() => onTabChange(tab.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              {tab.name}
              {isDev ? <span className="nav-badge">Soon</span> : null}
            </button>
          )
        })}
      </nav>
    </header>
  )
}

export default Header
