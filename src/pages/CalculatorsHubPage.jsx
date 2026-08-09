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

function CalculatorsHubPage({ onOpenTab }) {
  const toolGroups = CALCULATOR_CATEGORIES.map((category) => ({
    category,
    tools: calculatorsByCategory(category.id),
  })).filter((group) => group.tools.length > 0)

  return (
    <main className="page calculators-hub-page">
      <header className="page-header">
        <p className="page-eyebrow">Tools</p>
        <h1>Calculators</h1>
        <p className="page-lead">
          Strength, endurance,{' '}
          <span className={BRAND_CASING_CLASS}>{BRAND.scoreName}</span>, fitness
          assessments, and military fitness tests — with optional private
          progress tracking.
        </p>
      </header>

      {toolGroups.map((group) => (
        <section
          key={group.category.id}
          className="home-tools-group"
          aria-labelledby={`hub-${group.category.id}`}
        >
          <h2
            id={`hub-${group.category.id}`}
            className="calculators-hub-group-title"
          >
            {group.category.label}
          </h2>
          <ToolList tools={group.tools} onOpenTab={onOpenTab} />
        </section>
      ))}
    </main>
  )
}

export default CalculatorsHubPage
