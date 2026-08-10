import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'dash-today', label: 'Today' },
  { id: 'dash-highlights', label: 'Highlights' },
  { id: 'dash-habits', label: 'Habits' },
  { id: 'dash-activity', label: 'Activity' },
  { id: 'dash-progress', label: 'Progress' },
]

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return

  // Progress lives in a collapsed <details>; open it before scrolling.
  if (el instanceof HTMLDetailsElement && !el.open) {
    el.open = true
  }

  el.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  })

  el.classList.remove('dashboard-section-focus')
  // Restart focus pulse when navigating to the same section again.
  void el.offsetWidth
  el.classList.add('dashboard-section-focus')
  window.setTimeout(() => {
    el.classList.remove('dashboard-section-focus')
  }, 900)
}

/**
 * Dense-dashboard section jumper with even spacing + smooth scroll.
 */
function DashboardJumpNav() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id)

  useEffect(() => {
    const nodes = SECTIONS.map((section) =>
      document.getElementById(section.id),
    ).filter(Boolean)
    if (!nodes.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        root: null,
        rootMargin: '-28% 0px -58% 0px',
        threshold: [0.08, 0.2, 0.35, 0.5],
      },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className="dashboard-jump-nav" aria-label="Dashboard sections">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          type="button"
          className={`dashboard-jump-nav-btn${
            activeId === section.id ? ' is-active' : ''
          }`}
          aria-current={activeId === section.id ? 'true' : undefined}
          onClick={() => {
            setActiveId(section.id)
            scrollToSection(section.id)
          }}
        >
          {section.label}
        </button>
      ))}
    </nav>
  )
}

export default DashboardJumpNav
