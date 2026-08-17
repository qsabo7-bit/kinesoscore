import { useAuth } from '../auth/AuthContext'
import { BRAND } from '../data/brand'
import { pathForTab } from '../data/seo'
import { handleNavLinkClick } from '../lib/navLinkClick'
import { getVisibleNavTabs } from '../lib/visibleNavTabs'

function Footer({ onOpenTab }) {
  const { isAuthenticated } = useAuth()
  const handleLink = (event, tab) => handleNavLinkClick(event, tab, onOpenTab)
  const navigateTabs = [
    { id: 'home', name: 'Home' },
    ...getVisibleNavTabs({
      isAuthenticated: Boolean(isAuthenticated),
      showLogin: false,
    }).filter((tab) => tab.id !== 'home'),
    { id: 'sources-methodology', name: 'Sources & Methodology' },
  ]

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
            {navigateTabs.map((tab) => (
              <li key={tab.id}>
                <a
                  className="site-footer-link"
                  href={pathForTab(tab.id)}
                  onClick={(event) => handleLink(event, tab.id)}
                >
                  {tab.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer-col">
          <p className="site-footer-heading">Contact</p>
          <ul className="site-footer-list">
            <li className="site-footer-note">
              For business inquiries or developer feedback:
            </li>
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
