import { useEffect, useLayoutEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import {
  CALCULATOR_CATEGORIES,
  calculatorCategoryStickyLabel,
  calculatorsByCategory,
  isCalculatorTab,
  stickyToolsHighlightTab,
} from '../data/calculators'
import { BRAND } from '../data/brand'
import { pathForTab, SITE } from '../data/seo'
import { handleNavLinkClick } from '../lib/navLinkClick'
import { isNavTabActive } from '../lib/navTabActive'
import { useFocusTrap } from '../lib/useFocusTrap'
import { useWindowScrollY } from '../lib/useWindowScrollY'
import { getVisibleNavTabs } from '../lib/visibleNavTabs'
import ProfileAvatar from './ProfileAvatar'
import SoftReveal from './SoftReveal'

function Header({ activeTab, onTabChange }) {
  const { isAuthenticated, firstName, avatarId, loading } = useAuth()
  const calculatorActive = isCalculatorTab(activeTab)
  const stickyHighlightTab = stickyToolsHighlightTab(activeTab)
  // Compact mark on Home / About / Dashboard (signed-in Home redirects to Dashboard).
  const useBrandMark =
    activeTab === 'home' ||
    activeTab === 'about' ||
    activeTab === 'dashboard'
  const scrollY = useWindowScrollY(activeTab)
  const scrolled = scrollY > 8
  const [menuOpen, setMenuOpen] = useState(false)

  // Wait for session restore before deciding Login vs Welcome.
  const showLogin = !loading && !isAuthenticated
  const showWelcome = !loading && isAuthenticated

  const visibleTabs = getVisibleNavTabs({
    isAuthenticated: Boolean(isAuthenticated),
    showLogin,
  })

  const go = (event, tabId) => {
    setMenuOpen(false)
    handleNavLinkClick(event, tabId, onTabChange)
  }

  const calculatorGroups = CALCULATOR_CATEGORIES.map((category) => ({
    category,
    stickyLabel: calculatorCategoryStickyLabel(category),
    tools: calculatorsByCategory(category.id),
  })).filter((group) => group.tools.length > 0)

  // Keep header chrome (Menu/Close) clickable — do not inert siblings.
  const menuPanelRef = useFocusTrap(menuOpen, () => setMenuOpen(false), {
    inertSiblings: false,
  })

  useEffect(() => {
    setMenuOpen(false)
  }, [activeTab])

  useEffect(() => {
    if (!menuOpen || typeof document === 'undefined') return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // Keep Menu/Close clickable (trap inertSiblings:false) but block page
    // content behind the overlay for pointer + AT.
    const main = document.getElementById('main-content')
    const footer = document.querySelector('.site-footer')
    const touched = []
    for (const el of [main, footer]) {
      if (el instanceof HTMLElement && !el.inert) {
        el.inert = true
        touched.push(el)
      }
    }
    return () => {
      document.body.style.overflow = previous
      for (const el of touched) el.inert = false
    }
  }, [menuOpen])

  // Keep CSS offsets (hero tuck, mobile menu) in sync with real header height
  // when Welcome bar and/or calculator tools change the chrome.
  useLayoutEffect(() => {
    if (typeof document === 'undefined') return undefined
    const header = document.querySelector('.site-header')
    if (!(header instanceof HTMLElement)) return undefined

    const syncHeight = () => {
      const height = Math.ceil(header.getBoundingClientRect().height)
      if (height > 0) {
        document.documentElement.style.setProperty(
          '--site-header-height',
          `${height}px`,
        )
      }
    }

    syncHeight()
    const observer = new ResizeObserver(syncHeight)
    observer.observe(header)
    return () => observer.disconnect()
  }, [calculatorActive, showWelcome, menuOpen])

  // On narrow screens, keep the active chip in view within its row.
  useEffect(() => {
    if (!calculatorActive) return undefined
    const narrow =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 640px)').matches
    if (!narrow) return undefined
    const active = document.querySelector(
      '.site-header-tools-mobile .sub-nav-tab.is-active',
    )
    if (!(active instanceof HTMLElement)) return undefined
    active.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: 'smooth',
    })
    return undefined
  }, [activeTab, calculatorActive])

  const renderToolChip = (tool) => {
    const isActive = stickyHighlightTab === tool.id
    const isDev = tool.status === 'development'

    if (isDev) {
      return (
        <span
          key={tool.id}
          className="sub-nav-tab is-dev"
          aria-disabled="true"
        >
          {tool.name}
          <span className="nav-badge">Soon</span>
        </span>
      )
    }

    return (
      <a
        key={tool.id}
        href={pathForTab(tool.id)}
        tabIndex={calculatorActive ? undefined : -1}
        className={`sub-nav-tab${isActive ? ' is-active' : ''}${tool.id === 'scoring' ? ' brand-casing' : ''}`}
        onClick={(event) => go(event, tool.id)}
        aria-current={isActive ? 'page' : undefined}
      >
        {tool.name}
        {tool.badge ? (
          <span
            className={`nav-badge nav-badge-${String(tool.badge).toLowerCase()}`}
          >
            {tool.badge}
          </span>
        ) : null}
      </a>
    )
  }

  return (
    <header
      className={`site-header${scrolled ? ' is-scrolled' : ''}${calculatorActive ? ' has-tools' : ''}${menuOpen ? ' menu-open' : ''}`}
    >
      <div className="site-header-inner">
        <SoftReveal open={showWelcome}>
          <div className="account-welcome-bar">
            <a
              className="account-welcome-link"
              href={pathForTab('account')}
              onClick={(event) => go(event, 'account')}
              aria-label="Open account settings"
              tabIndex={showWelcome ? undefined : -1}
            >
              <ProfileAvatar avatarId={avatarId} size="sm" />
              <span>{`Welcome, ${firstName || 'Athlete'}`}</span>
            </a>
          </div>
        </SoftReveal>

        <div className="site-header-top">
          <a
            className={`brand${useBrandMark ? ' is-mark-icon' : ''}`}
            href={pathForTab('home')}
            onClick={(event) => go(event, 'home')}
            title={BRAND.full}
            aria-label={BRAND.full}
          >
            {/* Keep mark mounted so tab switches do not re-decode the PNG. */}
            <img
              className="brand-mark-icon"
              src={SITE.faviconPath}
              alt=""
              width={30}
              height={30}
              decoding="async"
              fetchPriority="high"
              draggable={false}
              aria-hidden={!useBrandMark}
            />
            <span className="brand-wordmark" aria-hidden={useBrandMark}>
              {BRAND.short}
            </span>
          </a>

          <nav className="site-nav site-nav-desktop" aria-label="Main">
            {visibleTabs.map((tab) => {
              const isActive = isNavTabActive(tab.id, activeTab)

              return (
                <a
                  key={tab.id}
                  href={pathForTab(tab.id)}
                  className={`nav-tab${isActive ? ' is-active' : ''}`}
                  onClick={(event) => go(event, tab.id)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {tab.name}
                </a>
              )
            })}
          </nav>

          <button
            type="button"
            className="site-nav-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="site-nav-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="site-nav-menu-btn-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="site-nav-menu-btn-label">
              {menuOpen ? 'Close' : 'Menu'}
            </span>
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="site-nav-menu-layer">
          <button
            type="button"
            className="site-nav-menu-backdrop"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <div
            ref={menuPanelRef}
            id="site-nav-menu"
            className="site-nav-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            <nav className="site-nav-menu-list" aria-label="Main">
              {visibleTabs.map((tab) => {
                const isActive = isNavTabActive(tab.id, activeTab)

                return (
                  <a
                    key={tab.id}
                    href={pathForTab(tab.id)}
                    className={`site-nav-menu-link${isActive ? ' is-active' : ''}`}
                    onClick={(event) => go(event, tab.id)}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {tab.name}
                  </a>
                )
              })}
            </nav>
          </div>
        </div>
      ) : null}

      {/* Always mounted so leaving Calculators → About can animate height instead of jolting. */}
      <div
        className="site-header-tools"
        aria-hidden={!calculatorActive || menuOpen}
        inert={!calculatorActive || menuOpen ? true : undefined}
      >
        <div className="site-header-tools-clip">
          <nav className="site-header-tools-stack" aria-label="Calculators">
            <div className="site-header-tools-desktop">
              {calculatorGroups.map((group) => (
                <div key={group.category.id} className="site-header-tools-row">
                  <span className="site-header-tools-label">
                    {group.stickyLabel}
                  </span>
                  <div className="site-header-tools-chips">
                    {group.tools.map((tool) => renderToolChip(tool))}
                  </div>
                </div>
              ))}
            </div>
            <div className="site-header-tools-mobile">
              {calculatorGroups.map((group) => (
                <div key={group.category.id} className="site-header-tools-row">
                  <span className="site-header-tools-label">
                    {group.stickyLabel}
                  </span>
                  <div className="site-header-tools-chips">
                    {group.tools.map((tool) => renderToolChip(tool))}
                  </div>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
