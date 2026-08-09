import { Component } from 'react'

function isChunkLoadError(error) {
  const text = String(error?.message || error || '')
  return /Failed to fetch dynamically imported module|Loading chunk|Importing a module script failed|error loading dynamically imported module/i.test(
    text,
  )
}

function PageErrorFallback({ error, onReload, onGoHome }) {
  const chunkFail = isChunkLoadError(error)

  return (
    <main className="page page-error-fallback" role="alert">
      <header className="page-header">
        <h1>{chunkFail ? 'Page failed to load' : 'Something went wrong'}</h1>
        <p className="page-lead">
          {chunkFail
            ? 'This usually happens after an app update. Reload to get the latest version.'
            : 'This page hit an unexpected error. Reload, or go home and try again.'}
        </p>
      </header>
      <div className="confirm-actions">
        <button type="button" className="btn btn-primary" onClick={onReload}>
          Reload
        </button>
        {onGoHome ? (
          <button type="button" className="btn btn-ghost" onClick={onGoHome}>
            Go home
          </button>
        ) : null}
      </div>
    </main>
  )
}

/**
 * Catches lazy-route chunk failures and render errors so the shell
 * (header/footer) stays up with a Reload path instead of a blank screen.
 *
 * Remount with a changing `key` (e.g. active tab) to clear after navigation.
 */
class PageErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('PageErrorBoundary caught', error, info?.componentStack)
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    this.setState({ error: null })
    this.props.onGoHome?.()
  }

  render() {
    if (this.state.error) {
      return (
        <PageErrorFallback
          error={this.state.error}
          onReload={this.handleReload}
          onGoHome={this.props.onGoHome ? this.handleGoHome : undefined}
        />
      )
    }
    return this.props.children
  }
}

export default PageErrorBoundary
