import SeoIntro from '../components/SeoIntro'
import { BRAND, BRAND_CASING_CLASS } from '../data/brand'
import { pathForTab } from '../data/seo'
import { FITNESS_SCORE_SEO } from '../data/seoCopy'

function FitnessScorePage({ onOpenTab }) {
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
        <p className="page-eyebrow">Fitness score</p>
        <h1 className={BRAND_CASING_CLASS}>{FITNESS_SCORE_SEO.heroTitle}</h1>
        <p className="page-lead">{FITNESS_SCORE_SEO.heroLead}</p>
        <p>{FITNESS_SCORE_SEO.heroSupport}</p>
        <p>
          <a
            className={`tool-link ${BRAND_CASING_CLASS}`}
            href={pathForTab('scoring')}
            onClick={(event) => handleLink(event, 'scoring')}
          >
            Calculate Your {BRAND.scoreName}
          </a>
        </p>
      </header>

      <section className="about-section" aria-labelledby="what-is-fitness-score">
        <h2 id="what-is-fitness-score" className="result-section-title">
          {FITNESS_SCORE_SEO.whatIsTitle}
        </h2>
        {FITNESS_SCORE_SEO.whatIsParagraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </section>

      <section className="about-section" aria-labelledby="how-kinesoscore-works">
        <h2 id="how-kinesoscore-works" className="result-section-title">
          {FITNESS_SCORE_SEO.howItWorksTitle}
        </h2>
        <p>{FITNESS_SCORE_SEO.howItWorksIntro}</p>

        <h3 className="result-section-title">{FITNESS_SCORE_SEO.strengthTitle}</h3>
        {FITNESS_SCORE_SEO.strengthParagraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}

        <h3 className="result-section-title">{FITNESS_SCORE_SEO.enduranceTitle}</h3>
        {FITNESS_SCORE_SEO.enduranceParagraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}

        <h3 className="result-section-title">{FITNESS_SCORE_SEO.combinedTitle}</h3>
        {FITNESS_SCORE_SEO.combinedParagraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </section>

      <section className="about-section" aria-labelledby="why-combine">
        <h2 id="why-combine" className="result-section-title">
          {FITNESS_SCORE_SEO.whyCombineTitle}
        </h2>
        {FITNESS_SCORE_SEO.whyCombineParagraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </section>

      <section className="about-section" aria-labelledby="understanding-score">
        <h2 id="understanding-score" className="result-section-title">
          {FITNESS_SCORE_SEO.understandingTitle}
        </h2>
        {FITNESS_SCORE_SEO.understandingParagraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
      </section>

      <section className="about-section" aria-labelledby="improve-score">
        <h2 id="improve-score" className="result-section-title">
          {FITNESS_SCORE_SEO.improveTitle}
        </h2>
        {FITNESS_SCORE_SEO.improveParagraphs.map((text) => (
          <p key={text}>{text}</p>
        ))}
        <p>
          Track major lifts with the{' '}
          <a
            className="seo-intro-link"
            href={pathForTab('strength')}
            onClick={(event) => handleLink(event, 'strength')}
          >
            Strength calculator
          </a>
          , build aerobic fitness with the{' '}
          <a
            className="seo-intro-link"
            href={pathForTab('running')}
            onClick={(event) => handleLink(event, 'running')}
          >
            Running calculator
          </a>
          , then combine both in the{' '}
          <a
            className={`seo-intro-link ${BRAND_CASING_CLASS}`}
            href={pathForTab('scoring')}
            onClick={(event) => handleLink(event, 'scoring')}
          >
            {BRAND.scoreName} calculator
          </a>
          .
        </p>
      </section>

      <SeoIntro
        title={FITNESS_SCORE_SEO.faqTitle}
        faqs={FITNESS_SCORE_SEO.faqs}
        relatedNote={FITNESS_SCORE_SEO.relatedNote}
        links={FITNESS_SCORE_SEO.links}
        disclaimer={FITNESS_SCORE_SEO.disclaimer}
        onNavigate={onOpenTab}
      />
    </main>
  )
}

export default FitnessScorePage
