import { BRAND } from '../data/brand'
import { pathForTab } from '../data/seo'
import { handleNavLinkClick } from '../lib/navLinkClick'

function Footer({ onOpenTab }) {
  const handleLink = (event, tab) => handleNavLinkClick(event, tab, onOpenTab)

  return (
    <footer className="site-footer">
      <div className="site-footer-main">
        <div className="site-footer-brand">
          <p className="site-footer-brand-mark">{BRAND.short}</p>
          <p className="site-footer-brand-lead">
            Track your strength, endurance, and fitness progress over time.
          </p>
        </div>

        <div className="site-footer-col">
          <p className="site-footer-heading">Navigate</p>
          <ul className="site-footer-list">
            <li>
              <a
                className="site-footer-link"
                href={pathForTab('home')}
                onClick={(event) => handleLink(event, 'home')}
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="site-footer-link"
                href={pathForTab('dashboard')}
                onClick={(event) => handleLink(event, 'dashboard')}
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                className="site-footer-link"
                href={pathForTab('calculators')}
                onClick={(event) => handleLink(event, 'calculators')}
              >
                Calculators
              </a>
            </li>
            <li>
              <a
                className="site-footer-link"
                href={pathForTab('leaderboard')}
                onClick={(event) => handleLink(event, 'leaderboard')}
              >
                Leaderboard
              </a>
            </li>
            <li>
              <a
                className="site-footer-link"
                href={pathForTab('habits')}
                onClick={(event) => handleLink(event, 'habits')}
              >
                Habits
              </a>
            </li>
            <li>
              <a
                className="site-footer-link"
                href={pathForTab('about')}
                onClick={(event) => handleLink(event, 'about')}
              >
                About
              </a>
            </li>
            <li>
              <a
                className="site-footer-link"
                href={pathForTab('sources-methodology')}
                onClick={(event) => handleLink(event, 'sources-methodology')}
              >
                Sources &amp; Methodology
              </a>
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
            <li>
              <a
                className="site-footer-link"
                href={pathForTab('privacy')}
                onClick={(event) => handleLink(event, 'privacy')}
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                className="site-footer-link"
                href={pathForTab('terms')}
                onClick={(event) => handleLink(event, 'terms')}
              >
                Terms of Service
              </a>
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
