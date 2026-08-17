import { useAuth } from '../auth/AuthContext'
import {
  CALCULATOR_CATEGORIES,
  calculatorsByCategory,
  DEFAULT_CALCULATOR_ID,
} from '../data/calculators'
import HomeMemberProgress from '../components/HomeMemberProgress'
import { BRAND, BRAND_CASING_CLASS } from '../data/brand'
import { pathForTab } from '../data/seo'
import { getThisWeekFocus } from '../lib/weekFocus'
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
  const focus = getThisWeekFocus()
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
          <div className="home-hero-copy">
            {showMemberCtas ? (
              <p className="home-eyebrow home-hero-welcome">
                Welcome, {firstName || 'Athlete'}
              </p>
            ) : (
              <p className="home-eyebrow home-hero-welcome">
                Get scored · Claim a name
              </p>
            )}
            <h1 className="home-brand">{BRAND.full}</h1>
            <p className="home-tagline home-tagline-hero">
              {showMemberCtas
                ? 'Measure where you are — Improve where you’re going.'
                : 'Get your score. Claim a name. Climb This Week.'}
            </p>
            {loading ? (
              <div
                className="confirm-actions home-auth-actions"
                aria-busy="true"
                aria-hidden="true"
              >
                <span className="btn btn-primary home-auth-placeholder">
                  Try {BRAND.scoreName}
                </span>
              </div>
            ) : null}
            {showAuthCtas ? (
              <div className="home-auth-actions">
                <button
                  type="button"
                  className={`btn btn-primary ${BRAND_CASING_CLASS}`}
                  onClick={() => onOpenTab?.(DEFAULT_CALCULATOR_ID)}
                >
                  Try {BRAND.scoreName} free
                </button>
                <p className="home-auth-links">
                  <button
                    type="button"
                    className="home-auth-text"
                    onClick={() => onRequestAuth?.('login')}
                  >
                    Log in
                  </button>
                  <span aria-hidden="true"> · </span>
                  <button
                    type="button"
                    className="home-auth-text"
                    onClick={() => onRequestAuth?.('signup')}
                  >
                    Create account
                  </button>
                </p>
              </div>
            ) : null}
          </div>
          {showAuthCtas ? (
            <div className="home-proof-strip" aria-label="Product preview">
              <div className="home-proof-card">
                <p className="home-proof-kicker">This Week</p>
                <p className="home-proof-primary">#12</p>
                <p className="home-proof-secondary">Score preview</p>
              </div>
              <div className="home-proof-card">
                <p className="home-proof-kicker">Habit XP</p>
                <p className="home-proof-primary">Lv 4</p>
                <p className="home-proof-secondary">
                  {focus?.title || 'Steady'}
                </p>
              </div>
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
                Private daily routines with optional Habit XP — check-ins
                stay private unless you share lifetime XP.
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

      {showAuthCtas ? (
        <section className="home-guest-path" aria-label="Start path">
          <h2 className="result-section-title">One path to the board</h2>
          <ol className="home-guest-steps">
            <li>
              <strong>Score</strong> — run {BRAND.scoreName} free
            </li>
            <li>
              <strong>Name</strong> — pick what others see when you share
            </li>
            <li>
              <strong>Climb</strong> — opt in to This Week
            </li>
          </ol>
          <div className="home-guest-path-cta">
            <button
              type="button"
              className={`btn btn-primary ${BRAND_CASING_CLASS}`}
              onClick={() => onOpenTab?.(DEFAULT_CALCULATOR_ID)}
            >
              Start with {BRAND.scoreName}
            </button>
            <button
              type="button"
              className="home-guest-alt"
              onClick={() => onOpenTab?.('habits')}
            >
              Or try Habits first
            </button>
          </div>
        </section>
      ) : null}

      <section className="home-tools" aria-labelledby="tools-heading">
        <h2 id="tools-heading">
          <button
            type="button"
            className="home-section-link"
            onClick={() => onOpenTab('calculators')}
          >
            {showAuthCtas ? 'More tools' : 'Calculators'}
          </button>
        </h2>
        <p className="home-dashboard-summary">
          {showAuthCtas
            ? `After your score, browse strength, running, and assessments. Save and climb when you’re ready.`
            : `Strength, endurance, ${BRAND.scoreName}, fitness assessments, and military assessments — with optional progress tracking when you sign in.`}
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
