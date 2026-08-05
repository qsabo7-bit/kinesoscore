import { calculators } from '../data/calculators'

function HomePage({ onOpenTab }) {
  return (
    <main className="home">
      <section className="home-hero">
        <p className="home-eyebrow">Performance tools</p>
        <h1 className="home-brand">FPC</h1>
        <p className="home-tagline">
          Measure strength, running, and overall fitness with clear, practical
          calculators.
        </p>
      </section>

      <section className="home-tools" aria-labelledby="tools-heading">
        <h2 id="tools-heading">Tools</h2>
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
