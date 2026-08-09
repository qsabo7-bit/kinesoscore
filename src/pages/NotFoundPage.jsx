import { pathForTab } from '../data/seo'
import { BRAND } from '../data/brand'

function NotFoundPage({ onOpenTab }) {
  const go = (event, tab) => {
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
    <main className="page not-found-page">
      <header className="page-header">
        <p className="page-eyebrow">404</p>
        <h1>Page not found</h1>
        <p className="page-lead">
          That link doesn&apos;t match a {BRAND.short} page. Head home or open a
          calculator.
        </p>
      </header>

      <div className="confirm-actions">
        <a
          className="btn btn-primary"
          href={pathForTab('home')}
          onClick={(event) => go(event, 'home')}
        >
          Go home
        </a>
        <a
          className="btn btn-ghost"
          href={pathForTab('calculators')}
          onClick={(event) => go(event, 'calculators')}
        >
          Browse calculators
        </a>
      </div>
    </main>
  )
}

export default NotFoundPage
