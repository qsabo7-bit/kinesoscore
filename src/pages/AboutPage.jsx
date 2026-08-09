import { BRAND } from '../data/brand'
import { pathForTab } from '../data/seo'

function AboutPage({ onOpenTab }) {
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
    <main className="page about-page">
      <header className="page-header">
        <p className="page-eyebrow">About</p>
        <h1 className="about-brand">{BRAND.full}</h1>
        <p className="page-lead">
          {BRAND.scoreName} turns strength and running into one clear percentile
          score — with transparent calculators around it.
        </p>
      </header>

      <section className="about-section" aria-labelledby="score-system-heading">
        <h2 id="score-system-heading" className="result-section-title">
          The score system
        </h2>
        <p>
          {BRAND.scoreName} averages recreational strength and running
          percentiles equally. Improve either side and the composite moves —
          neither domain can fully hide the other.
        </p>
        <p>
          Supporting tools cover 1RM / SBD, race pacing, VO₂ and fitness age,
          BMI/BMR, and military assessments (Army AFT, Marine PFT, Navy PRT, Air
          Force PFRA). Formulas and comparison datasets stay documented.
        </p>
        <div className="confirm-actions">
          <a
            className="btn btn-primary"
            href={pathForTab('scoring')}
            onClick={(event) => handleLink(event, 'scoring')}
          >
            Open {BRAND.scoreName}
          </a>
          <a
            className="btn btn-ghost"
            href={pathForTab('fitness-score')}
            onClick={(event) => handleLink(event, 'fitness-score')}
          >
            How scoring works
          </a>
        </div>
        <p className="calc-hint about-guides">
          Guides:{' '}
          <a
            className="seo-intro-link"
            href={pathForTab('one-rep-max')}
            onClick={(event) => handleLink(event, 'one-rep-max')}
          >
            One-rep max / Epley
          </a>
          {' · '}
          <a
            className="seo-intro-link"
            href={pathForTab('army-aft-guide')}
            onClick={(event) => handleLink(event, 'army-aft-guide')}
          >
            Army AFT explained
          </a>
        </p>
      </section>

      <section className="about-section">
        <h2 className="result-section-title">Mission</h2>
        <p>
          Free, transparent performance tools grounded in kinesiology — so you
          can measure where you are and improve where you&apos;re going.
        </p>
        <p>
          Athletes who opt in can compare shared results on the{' '}
          <a
            className="seo-intro-link"
            href={pathForTab('leaderboard')}
            onClick={(event) => handleLink(event, 'leaderboard')}
          >
            leaderboard
          </a>
          . Habits stay private unless you share a streak. Dashboard awards are
          private progress markers, not public badges.
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
          Published equations, reference populations, and peer-comparison
          datasets behind every calculator.
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
        <h2 className="result-section-title">Notes</h2>
        <ul className="about-notes">
          <li>
            Strength percentiles use recreational lifters / average gym-goers —
            not competitive powerlifters.
          </li>
          <li>
            Running percentiles use race finishers, not the entire general
            public.
          </li>
          <li>
            VO₂ estimates come from field tests (Cooper or Rockport), not lab
            gas analysis.
          </li>
          <li>
            Trust and legal detail live in Sources, Privacy, and Terms — not on
            every calculator screen.
          </li>
        </ul>
      </section>
    </main>
  )
}

export default AboutPage
