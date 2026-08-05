import { sources } from '../data/sources'
import { BRAND } from '../data/brand'

function AboutPage() {
  return (
    <main className="page about-page">
      <header className="page-header">
        <p className="page-eyebrow">About</p>
        <h1 className="about-brand">{BRAND.full}</h1>
        <p className="page-lead">
          {`${BRAND.full}'s goal is to bring affordable, modern fitness calculation tools to the general population through transparent sources and clear results.`}
        </p>
      </header>

      <section className="about-section">
        <h2 className="result-section-title">Our mission</h2>
        <p>
          Strength, endurance, and metabolism calculators are often locked
          behind paywalls, apps, or confusing spreadsheets. {BRAND.full} focuses
          on free, simple tools anyone can use to estimate one-rep max, predict
          race times, estimate VO₂ max and BMR, and understand how a result
          stacks up against published data for their age and gender group.
        </p>
        <p>
          We keep formulas and comparison datasets documented below so you can
          see exactly what powers each estimate. Fitness Scoring combines
          recreational strength and running percentiles into one balanced{' '}
          {BRAND.scoreName}.
        </p>
      </section>

      <section className="about-section" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="result-section-title">
          Sources & methods
        </h2>
        <p className="about-intro">
          These are the citations behind FPC formulas and peer comparisons.
          Percentiles mean “better than X out of 100” people in the stated
          reference population — recreational lifters for strength, race
          finishers for running, and Cooper Institute / ACSM adult norms for
          VO₂ max.
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

      <section
        className="about-section business-inquiry"
        aria-labelledby="business-heading"
      >
        <h2 id="business-heading" className="result-section-title">
          Business
        </h2>
        <p className="business-copy">
          For business inquiries, contact{' '}
          <a
            className="business-email-inline"
            href={`mailto:${BRAND.businessEmail}`}
          >
            {BRAND.businessEmail}
          </a>
          .
        </p>
      </section>

      <section className="about-section">
        <h2 className="result-section-title">Important notes</h2>
        <ul className="about-notes">
          <li>
            Strength percentiles compare you with recreational lifters / average
            gym-goers in your age and gender group — not competitive
            powerlifters.
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
            VO₂ max estimates come from field tests (Cooper or Rockport), not
            laboratory gas analysis. Use them as practical cardio benchmarks.
          </li>
          <li>
            BMR uses Mifflin–St Jeor resting metabolism. Optional TDEE activity
            multipliers are planning estimates, not individualized lab measures.
          </li>
          <li>
            Strength and BMR support pounds or kilograms; height supports inches
            or centimeters; running and Cooper distance support miles or
            kilometers. Values are converted so formulas stay scientifically
            consistent.
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
