/**
 * Fades page content when `pageKey` changes.
 * Always renders current children — never keeps a stale page mounted.
 *
 * Remounting on `pageKey` + CSS animation avoids phase-state races that caused
 * a one-frame flash / downward jump on Home → Dashboard.
 */
function PageTransition({ pageKey, children }) {
  return (
    <div key={pageKey} className="page-transition page-transition-enter" data-page={pageKey}>
      {children}
    </div>
  )
}

export default PageTransition
