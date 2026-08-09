import {
  CALCULATOR_CATEGORIES,
  calculatorsByCategory,
} from '../data/calculators'
import { BRAND, BRAND_CASING_CLASS } from '../data/brand'
import { pathForTab } from '../data/seo'

function ToolList({ tools, onOpenTab }) {
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

function CalculatorsHubPage({ onOpenTab }) {
  const performanceTools = calculatorsByCategory('performance')
  const militaryTools = calculatorsByCategory('military')
  const performanceLabel =
    CALCULATOR_CATEGORIES.find((c) => c.id === 'performance')?.label ||
    'Fitness Performance'
  const militaryLabel =
    CALCULATOR_CATEGORIES.find((c) => c.id === 'military')?.label ||
    'Military Fitness Assessments'

  return (
    <main className="page calculators-hub-page">
      <header className="page-header">
        <p className="page-eyebrow">Tools</p>
        <h1>Calculators</h1>
        <p className="page-lead">
          Free educational tools for strength, endurance,{' '}
          <span className={BRAND_CASING_CLASS}>{BRAND.scoreName}</span>, and
          military fitness assessments — with optional private progress tracking.
        </p>
      </header>

      <section className="home-tools-group" aria-labelledby="hub-performance">
        <h2 id="hub-performance" className="calculators-hub-group-title">
          {performanceLabel}
        </h2>
        <ToolList tools={performanceTools} onOpenTab={onOpenTab} />
      </section>

      <section className="home-tools-group" aria-labelledby="hub-military">
        <h2 id="hub-military" className="calculators-hub-group-title">
          {militaryLabel}
        </h2>
        <ToolList tools={militaryTools} onOpenTab={onOpenTab} />
      </section>
    </main>
  )
}

export default CalculatorsHubPage
