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
          We keep formulas and comparison datasets documented so you can see
          exactly what powers each estimate. {BRAND.scoreName} balances
          recreational strength and running percentiles into one overall
          performance score. For an educational overview,{' '}
          <a
            className="seo-intro-link"
            href={pathForTab('fitness-score')}
            onClick={(event) => handleLink(event, 'fitness-score')}
          >
            learn how {BRAND.scoreName} works
          </a>
          . Athletes who opt in can also compare shared results on the{' '}
          <a
            className="seo-intro-link"
            href={pathForTab('leaderboard')}
            onClick={(event) => handleLink(event, 'leaderboard')}
          >
            global leaderboard
          </a>
          , including Habit Streaks.
        </p>
        <p>
          Habits are private by default. You can share a current streak without
          publishing which habits you track. Private awards on your dashboard
          reflect Strength and Running components of {BRAND.scoreName} — they
          are not posted publicly.
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

      <section
        className="about-section about-methodology-cta"
        aria-labelledby="methodology-heading"
      >
        <h2 id="methodology-heading" className="result-section-title">
          Sources &amp; methodology
        </h2>
        <p>
          See the published equations, reference populations, and peer-comparison
          datasets behind every calculator — including how strength, running, and
          VO₂ estimates are derived.
        </p>
        <div className="confirm-actions">
          <a
            className="btn btn-primary"
            href={pathForTab('sources-methodology')}
            onClick={(event) => handleLink(event, 'sources-methodology')}
          >
            View Sources &amp; Methodology
          </a>
        </div>
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
            Habits check-ins and which habits you track stay private. Opt-in Habit
            Streaks share only your Leaderboard Name and current streak.
          </li>
          <li>
            Dashboard awards are private progress markers from Strength and
            Running components — not public leaderboard badges.
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
