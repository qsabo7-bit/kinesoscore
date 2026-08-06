import {
  calculators,
  DEFAULT_CALCULATOR_ID,
} from '../data/calculators'
import { BRAND } from '../data/brand'

function HomePage({ onOpenTab }) {
  return (
    <main className="home">
      <section className="home-hero">
        <p className="home-eyebrow">Performance tools</p>
        <h1 className="home-brand">{BRAND.full}</h1>
        <p className="home-tagline">
          Measure strength, running, VO₂ max, BMI, fitness age, metabolism, and
          overall fitness with clear, practical calculators.
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
          Your personal hub for FPC Score, trends, records, and recent activity.
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
        <ul className="tool-list">
          {calculators.map((tool) => (
            <li key={tool.id} className="tool-item">
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
              {tool.status === 'ready' ? (
                <button
                  type="button"
                  className="tool-link"
                  onClick={() => onOpenTab(tool.id)}
                >
                  Open calculator
                </button>
              ) : (
                <span className="tool-status">In development</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default HomePage
