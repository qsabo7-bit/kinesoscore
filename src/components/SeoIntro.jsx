import { pathForTab } from '../data/seo'

/**
 * Compact SEO / educational intro for public calculator pages.
 * Invisible to calculator behavior — content only.
 */
function SeoIntro({ title, children, links = [], disclaimer, onNavigate }) {
  if (!title && !children && !links.length && !disclaimer) return null

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

      <div className="seo-intro-body">{children}</div>

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
