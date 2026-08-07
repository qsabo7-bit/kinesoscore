import { pathForTab } from '../data/seo'

/**
 * Compact SEO / educational intro for public calculator pages.
 * Invisible to calculator behavior — content only.
 *
 * @param {{ before?: string, tab: string, label: string, after?: string }} [relatedNote]
 *   Optional closing note with an inline calculator link.
 * @param {Array<{ question: string, answer: string }>} [faqs]
 */
function SeoIntro({
  title,
  children,
  links = [],
  faqs = [],
  relatedNote = null,
  disclaimer,
  onNavigate,
}) {
  const faqList = Array.isArray(faqs) ? faqs.filter((f) => f?.question && f?.answer) : []

  if (
    !title &&
    !children &&
    !links.length &&
    !faqList.length &&
    !relatedNote &&
    !disclaimer
  ) {
    return null
  }

  const handleLink = (event, tab) => {
    if (!onNavigate || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return
    }
    event.preventDefault()
    onNavigate(tab)
  }

  return (
    <section className="seo-intro" aria-labelledby="seo-intro-title">
      {title ? (
        <h2 id="seo-intro-title" className="seo-intro-title">
          {title}
        </h2>
      ) : null}

      <div className="seo-intro-body">
        {children}
        {faqList.length > 0
          ? faqList.map((faq) => (
              <div key={faq.question}>
                <p>
                  <strong>{faq.question}</strong>
                </p>
                <p>{faq.answer}</p>
              </div>
            ))
          : null}
      </div>

      {relatedNote ? (
        <p className="seo-intro-related">
          {relatedNote.before || ''}
          <a
            className="seo-intro-link"
            href={pathForTab(relatedNote.tab)}
            onClick={(event) => handleLink(event, relatedNote.tab)}
          >
            {relatedNote.label}
          </a>
          {relatedNote.after || ''}
        </p>
      ) : null}

      {links.length > 0 ? (
        <nav className="seo-intro-links" aria-label="Related calculators">
          {links.map((link) => (
            <a
              key={link.tab}
              className="seo-intro-link"
              href={pathForTab(link.tab)}
              onClick={(event) => handleLink(event, link.tab)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      ) : null}

      {disclaimer ? <p className="calc-disclaimer">{disclaimer}</p> : null}
    </section>
  )
}

export default SeoIntro
