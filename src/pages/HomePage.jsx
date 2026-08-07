import {
  CALCULATOR_CATEGORIES,
  calculatorsByCategory,
  DEFAULT_CALCULATOR_ID,
} from '../data/calculators'
import { BRAND, BRAND_CASING_CLASS } from '../data/brand'
import { pathForTab } from '../data/seo'
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
              Open calculator
            </a>
          ) : (
            <span className="tool-status">In development</span>
          )}
        </li>
      ))}
    </ul>
  )
}

function HomePage({ onOpenTab }) {
  const performanceTools = calculatorsByCategory('performance')
  const militaryTools = calculatorsByCategory('military')
  const performanceLabel =
    CALCULATOR_CATEGORIES.find((c) => c.id === 'performance')?.label ||
    'Fitness Performance'
  const militaryLabel =
    CALCULATOR_CATEGORIES.find((c) => c.id === 'military')?.label ||
    'Military Fitness Assessments'

  return (
    <main className="home">
      <section className="home-hero">
        <p className="home-eyebrow">Performance tools</p>
        <h1 className="home-brand">{BRAND.full}</h1>
        <p className="home-tagline">
          KinesoScore is a comprehensive fitness performance platform combining
          strength, endurance, fitness assessment standards, and an intuitive{' '}
          <span className={BRAND_CASING_CLASS}>{BRAND.scoreName}</span>.
        </p>
        <p className="home-tagline">
          Measure where you are-Improve where you&apos;re going.
        </p>
        <p>
          <a
            className="seo-intro-link"
            href={pathForTab('fitness-score')}
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
              onOpenTab('fitness-score')
            }}
          >
            Learn how{' '}
            <span className={BRAND_CASING_CLASS}>{BRAND.scoreName}</span> works
          </a>
        </p>
      </section>

      <section className="home-dashboard" aria-labelledby="dashboard-heading">
        <h2 id="dashboard-heading">
          <button
            type="button"
            className="home-section-link"
            onClick={() => onOpenTab('dashboard')}
          >
            Dashboard
          </button>
        </h2>
        <p className="home-dashboard-summary">
          Your personal hub for {BRAND.scoreName}, trends, records, and recent
          activity.
        </p>
      </section>

      <section className="home-tools" aria-labelledby="tools-heading">
        <h2 id="tools-heading">
          <button
            type="button"
            className="home-section-link"
            onClick={() => onOpenTab(DEFAULT_CALCULATOR_ID)}
          >
            Tools
          </button>
        </h2>

        <div className="home-tools-group">
          <h3 className="home-tools-group-label">{performanceLabel}</h3>
          <ToolList tools={performanceTools} onOpenTab={onOpenTab} />
        </div>

        <div className="home-tools-group">
          <h3 className="home-tools-group-label">{militaryLabel}</h3>
          <ToolList tools={militaryTools} onOpenTab={onOpenTab} />
        </div>
      </section>
    </main>
  )
}

export default HomePage
