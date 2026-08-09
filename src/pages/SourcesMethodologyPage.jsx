import { sources } from '../data/sources'
import { BRAND } from '../data/brand'
import { pathForTab } from '../data/seo'

/**
 * Public citations and calculation methods — linked from About.
 */
function SourcesMethodologyPage({ onOpenTab }) {
  const handleLink = (event, tab) => {
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
    onOpenTab(tab)
  }

  return (
    <main className="page about-page sources-methodology-page">
      <header className="page-header">
        <p className="page-eyebrow">Research</p>
        <h1 className="sources-brand">Sources &amp; Methodology</h1>
        <p className="page-lead">
          How {BRAND.full} derives strength, endurance, cardiovascular, and
          overall fitness estimates — and the published references behind each
          method.
        </p>
        <p className="calc-hint">
          <a
            className="seo-intro-link"
            href={pathForTab('about')}
            onClick={(event) => handleLink(event, 'about')}
          >
            Back to About
          </a>
        </p>
      </header>

      <section className="about-section" aria-labelledby="methods-overview-heading">
        <h2 id="methods-overview-heading" className="result-section-title">
          How we calculate
        </h2>
        <p>
          Each calculator uses documented equations or reference norms. We cite
          the primary sources below so you can evaluate assumptions, populations,
          and limits for yourself. Percentiles mean “better than X out of 100”
          people in the stated reference group — recreational lifters for
          strength, race finishers for running, and Cooper Institute / ACSM adult
          norms for VO₂ max.
        </p>
        <p>
          These tools are educational. They are not medical advice, laboratory
          diagnostics, or officially certified military scoring systems.
        </p>
        <p>
          Habits and Habit Streaks are product features, not published formulas:
          check-ins stay private, and optional streak sharing publishes only a
          Leaderboard Name and current streak. Dashboard awards are private
          markers derived from your Strength and Running components — they are
          not separate scientific tests and are not listed in the citations
          below.
        </p>
      </section>

      <section className="about-section" aria-labelledby="citations-heading">
        <h2 id="citations-heading" className="result-section-title">
          Citations
        </h2>
        <ul className="source-list">
          {sources.map((source) => (
            <li key={source.id} className="source-item">
              <p className="source-category">{source.category}</p>
              <h3>{source.title}</h3>
              <p>{source.detail}</p>
              <a href={source.url} target="_blank" rel="noreferrer">
                {source.linkLabel}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

export default SourcesMethodologyPage
