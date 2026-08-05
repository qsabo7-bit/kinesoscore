import { sources } from '../data/sources'

function AboutPage() {
  return (
    <main className="page about-page">
      <header className="page-header">
        <p className="page-eyebrow">About</p>
        <h1>FPC</h1>
        <p className="page-lead">
          FPC's goal is to bring affordable, modern fitness calculation
          tools to the general population through transparent sources and clear
          results.
        </p>
      </header>

      <section className="about-section">
        <h2 className="result-section-title">Our mission</h2>
        <p>
          Strength and endurance calculators are often locked behind paywalls,
          apps, or confusing spreadsheets. FPC focuses on free, simple tools
          anyone can use to estimate one-rep max, compare relative strength,
          predict race times, and understand how a result stacks up against
          published data for their age and gender group.
        </p>
        <p>
          We keep formulas and comparison datasets documented so you can see
          exactly what powers each estimate. Fitness Scoring combines those same
          strength and running percentiles into one balanced FPC Score.
        </p>
      </section>

      <section className="about-section" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="result-section-title">
          Sources & methods
        </h2>
        <p className="about-intro">
          The calculators use established formulas and large published datasets.
          Percentiles mean “better than X out of 100” people in the stated
          reference population.
        </p>

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

      <section className="about-section">
        <h2 className="result-section-title">Important notes</h2>
        <ul className="about-notes">
          <li>
            Strength percentiles come from competitive powerlifting research.
            Recreational lifters often rank lower on that scale — that does not
            mean the estimate is wrong, only that the reference group is highly
            trained.
          </li>
          <li>
            Running percentiles compare you with race finishers, not the entire
            general public.
          </li>
          <li>
            Fitness Scoring averages strength and running percentiles equally.
            A high score in one domain cannot fully hide a low score in the
            other.
          </li>
          <li>
            Strength inputs support pounds or kilograms, and running distance
            supports miles or kilometers. Values are converted so ratios and
            race predictions stay scientifically consistent.
          </li>
          <li>
            These tools are educational estimates, not medical advice or coaching
            prescriptions.
          </li>
        </ul>
      </section>
    </main>
  )
}

export default AboutPage
