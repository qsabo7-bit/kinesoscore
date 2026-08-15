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

function CompactToolList({ tools, onOpenTab }) {
  const handleToolClick = (event, tabId) => {
    if (
      !onOpenTab ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return
    }
    event.preventDefault()
    onOpenTab(tabId)
  }

  return (
    <ul className="home-tool-chips">
      {tools.map((tool) => (
        <li key={tool.id}>
          {tool.status === 'ready' ? (
            <a
              className={`home-tool-chip${
                tool.id === 'scoring' ? ' is-mykinesoscore brand-casing' : ''
              }`}
              href={pathForTab(tool.id)}
              onClick={(event) => handleToolClick(event, tool.id)}
            >
              {tool.shortName || tool.name}
              {tool.badge ? (
                <span
                  className={`nav-badge nav-badge-${String(tool.badge).toLowerCase()}`}
                >
                  {tool.badge}
                </span>
              ) : null}
            </a>
          ) : (
            <span className="home-tool-chip is-dev">
              {tool.shortName || tool.name}
              <span className="nav-badge">Soon</span>
            </span>
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
            <button
              type="button"
              className="home-member-link"
              onClick={() => onOpenTab('groups')}
            >
              <span className="home-member-label">
                Groups <span className="nav-tab-beta">(beta)</span>
              </span>
              <span className="home-member-copy">
                Private crew space — log weekly activity, goals, and group
                boards with invite-only members.
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
            onClick={() => onOpenTab('calculators')}
          >
            Calculators
          </button>
        </h2>
        <p className="home-dashboard-summary">
          Strength, endurance, {BRAND.scoreName}, fitness assessments, and
          military assessments — with optional progress tracking when you sign
          in.
        </p>

        {toolGroups.map((group) => (
          <div key={group.category.id} className="home-tools-group">
            <h3 className="home-tools-group-label">{group.category.label}</h3>
            <CompactToolList tools={group.tools} onOpenTab={onOpenTab} />
          </div>
        ))}

        <p className="home-tools-more">
          <a
            className="tool-link"
            href={pathForTab('calculators')}
            onClick={(event) => {
              if (
                !onOpenTab ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              ) {
                return
              }
              event.preventDefault()
              onOpenTab('calculators')
            }}
          >
            Browse all calculators with details
          </a>
          {' · '}
          <a
            className="tool-link"
            href={pathForTab(DEFAULT_CALCULATOR_ID)}
            onClick={(event) => {
              if (
                !onOpenTab ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
              ) {
                return
              }
              event.preventDefault()
              onOpenTab(DEFAULT_CALCULATOR_ID)
            }}
          >
            Open myKinesoScore™
          </a>
        </p>
      </section>
    </main>
  )
}

export default HomePage
