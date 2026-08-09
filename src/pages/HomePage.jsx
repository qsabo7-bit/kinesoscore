import { useAuth } from '../auth/AuthContext'
import {
  CALCULATOR_CATEGORIES,
  calculatorsByCategory,
  DEFAULT_CALCULATOR_ID,
} from '../data/calculators'
import HomeMemberProgress from '../components/HomeMemberProgress'
import { BRAND } from '../data/brand'
import { pathForTab } from '../data/seo'
import homeHeroPhoto from '../assets/home-hero.png'

/** Set to `null` to restore the CSS-only hero (no photo). */
const HOME_HERO_PHOTO = homeHeroPhoto

function ToolList({ tools, onOpenTab }) {
  const handleToolClick = (event, tabId) => {
    if (!onOpenTab || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }
    event.preventDefault()
    onOpenTab(tabId)
  }

  return (
    <ul className="tool-list">
      {tools.map((tool) => (
        <li key={tool.id} className="tool-item">
          <h3>
            {tool.name}
            {tool.badge ? (
              <span
                className={`nav-badge nav-badge-${String(tool.badge).toLowerCase()}`}
                style={{ marginLeft: '0.5rem', verticalAlign: 'middle' }}
              >
                {tool.badge}
              </span>
            ) : null}
          </h3>
          <p>{tool.description}</p>
          {tool.status === 'ready' ? (
            <a
              className="tool-link"
              href={pathForTab(tool.id)}
              onClick={(event) => handleToolClick(event, tool.id)}
            >
              Open {tool.name} calculator
            </a>
          ) : (
            <span className="tool-status">In development</span>
          )}
        </li>
      ))}
    </ul>
  )
}

function HomePage({ onOpenTab, onRequestAuth }) {
  const { isAuthenticated, loading, firstName } = useAuth()
  const toolGroups = CALCULATOR_CATEGORIES.map((category) => ({
    category,
    tools: calculatorsByCategory(category.id),
  })).filter((group) => group.tools.length > 0)
  const showAuthCtas = !loading && !isAuthenticated
  const showMemberCtas = !loading && isAuthenticated

  return (
    <main className="home">
      <section className={`home-hero${HOME_HERO_PHOTO ? ' has-photo' : ''}`}>
        <div
          className="home-hero-media"
          aria-hidden="true"
          style={
            HOME_HERO_PHOTO
              ? { '--home-hero-photo': `url(${HOME_HERO_PHOTO})` }
              : undefined
          }
        />
        <div className="home-hero-content">
          {showMemberCtas ? (
            <p className="home-eyebrow home-hero-welcome">
              Welcome, {firstName || 'Athlete'}
            </p>
          ) : null}
          <h1 className="home-brand">{BRAND.full}</h1>
          <p className="home-tagline home-tagline-hero">
            Measure where you are — Improve where you&apos;re going.
          </p>
          {loading ? (
            <div
              className="confirm-actions home-auth-actions"
              aria-busy="true"
              aria-hidden="true"
            >
              <span className="btn btn-primary home-auth-placeholder">
                Create Account
              </span>
              <span className="btn btn-ghost home-auth-placeholder">
                Log in
              </span>
            </div>
          ) : null}
          {showAuthCtas ? (
            <div className="confirm-actions home-auth-actions">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onRequestAuth?.('signup')}
              >
                Create Account
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => onRequestAuth?.('login')}
              >
                Log in
              </button>
            </div>
          ) : null}
        </div>
      </section>

      {showMemberCtas ? (
        <>
          <HomeMemberProgress onOpenTab={onOpenTab} />
          <section className="home-member-strip" aria-label="Member shortcuts">
            <button
              type="button"
              className="home-member-link"
              onClick={() => onOpenTab('dashboard')}
            >
              <span className="home-member-label">Dashboard</span>
              <span className="home-member-copy">
                Your hub for {BRAND.scoreName}, trends, records, and recent
                activity.
              </span>
            </button>
            <button
              type="button"
              className="home-member-link"
              onClick={() => onOpenTab('habits')}
            >
              <span className="home-member-label">Habits</span>
              <span className="home-member-copy">
                Private daily routines with optional Habit Streaks — check-ins
                stay private unless you opt in.
              </span>
            </button>
          </section>
        </>
      ) : null}

      <section className="home-tools" aria-labelledby="tools-heading">
        <h2 id="tools-heading">
          <button
            type="button"
            className="home-section-link"
            onClick={() => onOpenTab(DEFAULT_CALCULATOR_ID)}
          >
            Calculators
          </button>
        </h2>
        <p className="home-dashboard-summary">
          Strength, endurance, {BRAND.scoreName}, fitness assessments, and
          military fitness tests — with optional progress tracking when you sign
          in.
        </p>

        {toolGroups.map((group) => (
          <div key={group.category.id} className="home-tools-group">
            <h3 className="home-tools-group-label">{group.category.label}</h3>
            <ToolList tools={group.tools} onOpenTab={onOpenTab} />
          </div>
        ))}
      </section>
    </main>
  )
}

export default HomePage
