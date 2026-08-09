import SeoIntro from './SeoIntro'
import { pathForTab } from '../data/seo'

/**
 * Shared layout for public educational / intent SEO pages.
 *
 * @param {{
 *   seo: {
 *     eyebrow: string,
 *     heroTitle: string,
 *     heroLead: string,
 *     heroSupport?: string,
 *     ctaTab: string,
 *     ctaLabel: string,
 *     sections: Array<{ id: string, title: string, paragraphs: string[] }>,
 *     faqTitle?: string,
 *     faqs?: Array<{ question: string, answer: string }>,
 *     relatedNote?: object,
 *     links?: Array<{ tab: string, label: string }>,
 *     disclaimer?: string,
 *   },
 *   onOpenTab?: (tab: string) => void,
 * }} props
 */
function EducationalGuidePage({ seo, onOpenTab }) {
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
        <p className="page-eyebrow">{seo.eyebrow}</p>
        <h1>{seo.heroTitle}</h1>
        <p className="page-lead">{seo.heroLead}</p>
        {seo.heroSupport ? <p>{seo.heroSupport}</p> : null}
        <p>
          <a
            className="tool-link"
            href={pathForTab(seo.ctaTab)}
            onClick={(event) => handleLink(event, seo.ctaTab)}
          >
            {seo.ctaLabel}
          </a>
        </p>
      </header>

      {seo.sections.map((section) => (
        <section
          key={section.id}
          className="about-section"
          aria-labelledby={section.id}
        >
          <h2 id={section.id} className="result-section-title">
            {section.title}
          </h2>
          {section.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </section>
      ))}

      <SeoIntro
        title={seo.faqTitle || 'FAQs'}
        faqs={seo.faqs}
        relatedNote={seo.relatedNote}
        links={seo.links}
        disclaimer={seo.disclaimer}
        onNavigate={onOpenTab}
        defaultOpen
      />
    </main>
  )
}

export default EducationalGuidePage
