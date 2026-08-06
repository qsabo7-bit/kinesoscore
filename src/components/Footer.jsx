import { BRAND } from '../data/brand'

function Footer({ onOpenTab }) {
  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="site-footer-brand">
          <p className="site-footer-brand-mark">{BRAND.short}</p>
          <p className="site-footer-brand-name">{BRAND.tagline}</p>
          <p className="site-footer-brand-lead">
            Track your strength, endurance, and fitness progress over time.
          </p>
        </div>

        <div className="site-footer-col">
          <p className="site-footer-heading">Navigate</p>
          <ul className="site-footer-list">
            <li>
              <button
                type="button"
                className="site-footer-link"
                onClick={() => onOpenTab?.('home')}
              >
                Home
              </button>
            </li>
            <li>
              <button
                type="button"
                className="site-footer-link"
                onClick={() => onOpenTab?.('about')}
              >
                About
              </button>
            </li>
          </ul>
        </div>

        <div className="site-footer-col">
          <p className="site-footer-heading">Contact</p>
          <ul className="site-footer-list">
            <li className="site-footer-note">For business inquiries:</li>
            <li>
              <a
                className="site-footer-link"
                href={`mailto:${BRAND.businessEmail}`}
              >
                {BRAND.businessEmail}
              </a>
            </li>
          </ul>
        </div>

        <div className="site-footer-col">
          <p className="site-footer-heading">Legal</p>
          <ul className="site-footer-list">
            <li className="site-footer-legal-row">
              <span className="site-footer-link is-disabled" aria-disabled="true">
                Privacy Policy
              </span>
              <span className="site-footer-soon">Coming Soon</span>
            </li>
            <li className="site-footer-legal-row">
              <span className="site-footer-link is-disabled" aria-disabled="true">
                Terms of Service
              </span>
              <span className="site-footer-soon">Coming Soon</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-footer-bar">
        <p>© 2026 {BRAND.short}</p>
      </div>
    </footer>
  )
}

export default Footer
