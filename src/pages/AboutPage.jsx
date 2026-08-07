import { sources } from '../data/sources'
import { BRAND } from '../data/brand'
import { pathForTab } from '../data/seo'

function AboutPage({ onOpenTab }) {
  const handleLink = (event, tab) => {
    if (!onOpenTab || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }
    event.preventDefault()
    onOpenTab(tab)
  }

  return (
    <main className="page about-page">
      <header className="page-header">
        <p className="page-eyebrow">About</p>
        <h1 className="about-brand">{BRAND.full}</h1>
        <p className="page-lead">
          A comprehensive fitness performance platform combining strength,
          endurance, military fitness standards, and cardiovascular fitness
          tracking.
        </p>
      </header>

      <section className="about-section">
        <h2 className="result-section-title">Our mission</h2>
        <p>
          {BRAND.full} brings free, transparent tools for 1RM strength (bench,
          squat, deadlift, and SBD total), running fitness, VO₂ max, fitness age,
          BMI/BMR, and military assessments such as the Army AFT, Marine PFT,
          Navy PRT, and Air Force PFRA — plus an overall {BRAND.scoreName} that
          averages recreational strength and running percentiles.
        </p>
        <p>
          We keep formulas and comparison datasets documented below so you can
          see exactly what powers each estimate. {BRAND.scoreName} balances
          recreational strength and running percentiles into one overall
          performance score. For an educational overview,{' '}
          <a
            className="seo-intro-link"
            href={pathForTab('fitness-score')}
            onClick={(event) => handleLink(event, 'fitness-score')}
          >
            learn how {BRAND.scoreName} works
          </a>
          .
        </p>
      </section>

      <section
        className="about-section"
        aria-labelledby="science-foundation-heading"
      >
        <h2 id="science-foundation-heading" className="result-section-title">
          Built with an exercise science foundation
        </h2>
        <p>
          {BRAND.full} was developed with a foundation in kinesiology and human
          performance principles. The platform combines strength assessment,
          endurance metrics, cardiovascular fitness evaluation, and standardized
          fitness scoring concepts to help users better understand and track
          their performance.
        </p>
        <p>
          Methods are documented openly and draw on published equations and
          reference norms — educational tools for training insight, not medical
          advice or officially certified testing systems.
        </p>
      </section>

      <section className="about-section" aria-labelledby="sources-heading">
        <h2 id="sources-heading" className="result-section-title">
          Sources & methods
        </h2>
        <p className="about-intro">
          These are the citations behind {BRAND.full} formulas and peer
          comparisons. Percentiles mean “better than X out of 100” people in the
          stated reference population — recreational lifters for strength, race
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
            {BRAND.scoreName} averages strength and running percentiles equally.
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
