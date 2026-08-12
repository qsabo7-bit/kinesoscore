import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useAuth } from './auth/AuthContext'
import Footer from './components/Footer'
import Header from './components/Header'
import PageChunkFallback from './components/PageChunkFallback'
import PageErrorBoundary from './components/PageErrorBoundary'
import PageTransition from './components/PageTransition'
import ScrollToTopButton from './components/ScrollToTopButton'
import ShareMomentHost from './components/ShareMomentHost'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import NotFoundPage from './pages/NotFoundPage'
import { PAGE_SEO, pathForTab, resolveSeoRoute } from './data/seo'
import {
  getAuthIntent,
  hasPendingAuthCallbackInUrl,
} from './lib/authCallback'
import { applyDocumentSeo } from './lib/documentSeo'
import { applyPendingLeaderboardName } from './lib/pendingLeaderboardName'
import { saveLeaderboardName } from './lib/leaderboardProfile'
import {
  isCalculatorResumeTab,
  rememberLastCalculatorTab,
} from './lib/lastCalculator'
import { categoryIdForBoardKey } from './lib/publicLeaderboard'
import { scrollWindowToTop } from './lib/windowScroll'

/** Route chunks — keep Home/Auth/404 eager for first paint + auth redirects. */
const CalculatorsHubPage = lazy(() => import('./pages/CalculatorsHubPage'))
const StrengthPage = lazy(() => import('./pages/StrengthPage'))
const RunningPage = lazy(() => import('./pages/RunningPage'))
const ScoringPage = lazy(() => import('./pages/ScoringPage'))
const Vo2MaxPage = lazy(() => import('./pages/Vo2MaxPage'))
const BmrPage = lazy(() => import('./pages/BmrPage'))
const BmiPage = lazy(() => import('./pages/BmiPage'))
const FitnessAgePage = lazy(() => import('./pages/FitnessAgePage'))
const AirForcePfraPage = lazy(
  () => import('./pages/military/AirForcePfraPage'),
)
const AirForcePfaPage = lazy(() => import('./pages/military/AirForcePfaPage'))
const ArmyAftPage = lazy(() => import('./pages/military/ArmyAftPage'))
const MarinePftPage = lazy(() => import('./pages/military/MarinePftPage'))
const NavyPrtPage = lazy(() => import('./pages/military/NavyPrtPage'))
const MaxPushupsPage = lazy(() => import('./pages/fitness/MaxPushupsPage'))
const MaxPullupsPage = lazy(() => import('./pages/fitness/MaxPullupsPage'))
const FranPage = lazy(() => import('./pages/fitness/FranPage'))
const MurphPage = lazy(() => import('./pages/fitness/MurphPage'))
const CindyPage = lazy(() => import('./pages/fitness/CindyPage'))
const AccountPage = lazy(() => import('./pages/AccountPage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const SourcesMethodologyPage = lazy(
  () => import('./pages/SourcesMethodologyPage'),
)
const FitnessScorePage = lazy(() => import('./pages/FitnessScorePage'))
const OneRepMaxPage = lazy(() => import('./pages/OneRepMaxPage'))
const ArmyAftGuidePage = lazy(() => import('./pages/ArmyAftGuidePage'))
const AirForcePfraGuidePage = lazy(() => import('./pages/AirForcePfraGuidePage'))
const MarinePftGuidePage = lazy(() => import('./pages/MarinePftGuidePage'))
const NavyPrtGuidePage = lazy(() => import('./pages/NavyPrtGuidePage'))
const Vo2MaxGuidePage = lazy(() => import('./pages/Vo2MaxGuidePage'))
const FranGuidePage = lazy(() => import('./pages/FranGuidePage'))
const MurphGuidePage = lazy(() => import('./pages/MurphGuidePage'))
const CindyGuidePage = lazy(() => import('./pages/CindyGuidePage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'))
const HabitsPage = lazy(() => import('./pages/HabitsPage'))

const EMAIL_CONFIRMED_MESSAGE =
  'Email confirmed. Log in to access your KinesoScore account.'

function initialTabFromLocation() {
  if (typeof window === 'undefined') return 'home'
  // Recovery callbacks must open reset-password even when path is "/".
  if (getAuthIntent() === 'recovery') return 'reset-password'
  return resolveSeoRoute(window.location.pathname).seoId
}

function App() {
  const {
    user,
    isAuthenticated,
    loading,
    passwordRecovery,
    emailJustConfirmed,
    authUrlError,
    clearEmailJustConfirmed,
  } = useAuth()
  const [activeTab, setActiveTab] = useState(initialTabFromLocation)
  const [authNotice, setAuthNotice] = useState('')
  const [authMode, setAuthMode] = useState('login')
  /** @type {[{ boardKey?: string, period?: string, categoryId?: string } | null, Function]} */
  const [leaderboardFocus, setLeaderboardFocus] = useState(null)
  const openedRecovery = useRef(false)
  const handledEmailConfirm = useRef(false)
  const pendingNameAppliedFor = useRef(null)
  const skipNextUrlPush = useRef(false)
  const previousTabForFocus = useRef(null)

  const handleTabChange = (tabOrOpts) => {
    if (tabOrOpts && typeof tabOrOpts === 'object' && tabOrOpts.tab) {
      const { tab, boardKey, period, categoryId } = tabOrOpts
      if (tab === 'login') setAuthMode('login')
      if (tab === 'leaderboard' || tab === 'leaderboard-habits') {
        setLeaderboardFocus({
          boardKey: boardKey || undefined,
          period: period || undefined,
          categoryId:
            categoryId ||
            (boardKey ? categoryIdForBoardKey(boardKey) : undefined),
        })
      }
      if (user?.id && isCalculatorResumeTab(tab)) {
        rememberLastCalculatorTab(user.id, tab)
      }
      setActiveTab(tab)
      return
    }

    const tab = tabOrOpts
    if (tab === 'login') setAuthMode('login')
    if (tab !== 'leaderboard' && tab !== 'leaderboard-habits') {
      setLeaderboardFocus(null)
    }
    if (user?.id && isCalculatorResumeTab(tab)) {
      rememberLastCalculatorTab(user.id, tab)
    }
    setActiveTab(tab)
  }

  // Apply signup Leaderboard Name after confirm/login (survives new-tab confirm).
  useEffect(() => {
    if (loading || !isAuthenticated || !user?.id) return undefined
    if (pendingNameAppliedFor.current === user.id) return undefined
    pendingNameAppliedFor.current = user.id
    let cancelled = false
    applyPendingLeaderboardName(user.id, saveLeaderboardName).catch((err) => {
      if (cancelled) return
      // Allow retry on next auth cycle if save failed.
      pendingNameAppliedFor.current = null
      console.warn('Pending Leaderboard Name not applied', err)
    })
    return () => {
      cancelled = true
    }
  }, [loading, isAuthenticated, user?.id])

  /** Guest CTAs: default to signup; pass 'login' for returning users. */
  const requestAuth = (mode = 'signup') => {
    setAuthMode(mode === 'login' ? 'login' : 'signup')
    setActiveTab('login')
  }

  // Keep browser URL aligned with the active tab for canonical SEO paths.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const onPopState = () => {
      const { seoId } = resolveSeoRoute(window.location.pathname)
      skipNextUrlPush.current = true
      setActiveTab(seoId)
    }

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  // Premium SPA navigation: land at top + move focus into the page shell.
  // Only focus after a real tab change — not on first paint / Strict Mode remount
  // (programmatic focus on load can look like a selection highlight).
  useEffect(() => {
    if (typeof window === 'undefined') return
    scrollWindowToTop()
    const previous = previousTabForFocus.current
    previousTabForFocus.current = activeTab
    if (previous === null || previous === activeTab) return
    const main = document.getElementById('main-content')
    if (main && typeof main.focus === 'function') {
      main.focus({ preventScroll: true })
    }
  }, [activeTab])

  useEffect(() => {
    if (typeof window === 'undefined') return

    applyDocumentSeo(activeTab)

    // Do not rewrite the URL while Supabase auth tokens are still in the hash/query.
    if (hasPendingAuthCallbackInUrl()) return

    const nextPath = pathForTab(activeTab)
    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
    const normalizedNext = nextPath.replace(/\/+$/, '') || '/'

    if (skipNextUrlPush.current) {
      skipNextUrlPush.current = false
      return
    }

    if (currentPath !== normalizedNext) {
      window.history.pushState({}, '', nextPath)
    }
  }, [activeTab])

  // Password recovery always owns routing — never let SIGNED_IN send users elsewhere.
  useEffect(() => {
    if (!passwordRecovery) {
      openedRecovery.current = false
      return
    }
    if (activeTab !== 'reset-password') {
      openedRecovery.current = true
      setActiveTab('reset-password')
    }
  }, [passwordRecovery, activeTab])

  // Signup / email confirmation → login or dashboard, never reset-password.
  useEffect(() => {
    if (loading || passwordRecovery) return
    if (!emailJustConfirmed || handledEmailConfirm.current) return

    handledEmailConfirm.current = true

    if (isAuthenticated) {
      setActiveTab('dashboard')
    } else {
      setAuthNotice(EMAIL_CONFIRMED_MESSAGE)
      setAuthMode('login')
      setActiveTab('login')
    }

    clearEmailJustConfirmed?.()
  }, [
    loading,
    passwordRecovery,
    emailJustConfirmed,
    isAuthenticated,
    clearEmailJustConfirmed,
  ])

  useEffect(() => {
    if (authUrlError && !passwordRecovery) {
      setAuthMode('login')
      setActiveTab('login')
    }
  }, [authUrlError, passwordRecovery])

  useEffect(() => {
    if (loading || passwordRecovery) return

    if (isAuthenticated && activeTab === 'login') {
      setActiveTab('dashboard')
      return
    }

    // Signed-in ritual: Home lands on Dashboard (brand mark / marketing Home
    // still available to guests; About stays open for members).
    if (isAuthenticated && activeTab === 'home') {
      setActiveTab('dashboard')
      return
    }

    // Guest /account keeps the locked Account Settings preview (same pattern
    // as Dashboard / Habits) instead of silently bouncing to home.

    // Only bounce off reset when there's no active recovery session.
    if (!isAuthenticated && activeTab === 'reset-password') {
      setActiveTab('login')
    }
  }, [isAuthenticated, loading, activeTab, passwordRecovery])

  // Alias tabs (e.g. /acft, /1rm) keep their SEO id in the URL while rendering
  // the primary calculator UI unchanged.
  const renderTab = PAGE_SEO[activeTab]?.renderTab || activeTab

  let content
  if (passwordRecovery) {
    content = (
      <ResetPasswordPage
        onSuccess={(notice, options = {}) => {
          setAuthNotice(notice || '')
          // Recovery state is already cleared. Prefer dashboard when the
          // recovery session is still valid; otherwise send users to login.
          if (options.staySignedIn) {
            setActiveTab('dashboard')
          } else {
            setAuthMode('login')
            setActiveTab('login')
          }
        }}
        onRequestLogin={() => {
          // Recovery abandon already awaited sign-out in ResetPasswordPage.
          setAuthMode('login')
          setActiveTab('login')
        }}
      />
    )
  } else if (renderTab === 'calculators') {
    content = <CalculatorsHubPage onOpenTab={handleTabChange} />
  } else if (renderTab === 'strength') {
    content = (
      <StrengthPage onRequestAuth={requestAuth} onOpenTab={handleTabChange} />
    )
  } else if (renderTab === 'running') {
    content = (
      <RunningPage onRequestAuth={requestAuth} onOpenTab={handleTabChange} />
    )
  } else if (renderTab === 'scoring') {
    content = (
      <ScoringPage onRequestAuth={requestAuth} onOpenTab={handleTabChange} />
    )
  } else if (renderTab === 'vo2max') {
    content = (
      <Vo2MaxPage onRequestAuth={requestAuth} onOpenTab={handleTabChange} />
    )
  } else if (renderTab === 'bmr') {
    content = (
      <BmrPage onRequestAuth={requestAuth} onOpenTab={handleTabChange} />
    )
  } else if (renderTab === 'bmi') {
    content = (
      <BmiPage onRequestAuth={requestAuth} onOpenTab={handleTabChange} />
    )
  } else if (renderTab === 'fitness-age') {
    content = (
      <FitnessAgePage onRequestAuth={requestAuth} onOpenTab={handleTabChange} />
    )
  } else if (renderTab === 'air-force-pfra') {
    content = (
      <AirForcePfraPage
        onRequestAuth={requestAuth}
        onOpenTab={handleTabChange}
      />
    )
  } else if (renderTab === 'air-force-pfa') {
    content = (
      <AirForcePfaPage
        onRequestAuth={requestAuth}
        onOpenTab={handleTabChange}
      />
    )
  } else if (renderTab === 'army-aft') {
    content = (
      <ArmyAftPage onRequestAuth={requestAuth} onOpenTab={handleTabChange} />
    )
  } else if (renderTab === 'marine-pft') {
    content = (
      <MarinePftPage onRequestAuth={requestAuth} onOpenTab={handleTabChange} />
    )
  } else if (renderTab === 'navy-prt') {
    content = (
      <NavyPrtPage onRequestAuth={requestAuth} onOpenTab={handleTabChange} />
    )
  } else if (renderTab === 'max-pushups') {
    content = (
      <MaxPushupsPage
        onRequestAuth={requestAuth}
        onOpenTab={handleTabChange}
      />
    )
  } else if (renderTab === 'max-pullups') {
    content = (
      <MaxPullupsPage
        onRequestAuth={requestAuth}
        onOpenTab={handleTabChange}
      />
    )
  } else if (renderTab === 'fran') {
    content = (
      <FranPage onRequestAuth={requestAuth} onOpenTab={handleTabChange} />
    )
  } else if (renderTab === 'murph') {
    content = (
      <MurphPage onRequestAuth={requestAuth} onOpenTab={handleTabChange} />
    )
  } else if (renderTab === 'cindy') {
    content = (
      <CindyPage onRequestAuth={requestAuth} onOpenTab={handleTabChange} />
    )
  } else if (renderTab === 'login') {
    content = (
      <AuthPage
        initialMessage={authNotice}
        initialMode={authMode}
        onSuccess={() => {
          setAuthNotice('')
          setActiveTab('dashboard')
        }}
      />
    )
  } else if (renderTab === 'account') {
    content = (
      <AccountPage
        onOpenTab={handleTabChange}
        onRequestAuth={requestAuth}
      />
    )
  } else if (renderTab === 'dashboard') {
    content = (
      <DashboardPage
        onOpenTab={handleTabChange}
        onRequestAuth={requestAuth}
      />
    )
  } else if (
    renderTab === 'leaderboard' ||
    renderTab === 'leaderboard-habits'
  ) {
    content = (
      <LeaderboardPage
        onOpenTab={handleTabChange}
        onRequestAuth={requestAuth}
        initialCategoryId={
          renderTab === 'leaderboard-habits'
            ? 'habits'
            : leaderboardFocus?.categoryId
        }
        initialBoardKey={leaderboardFocus?.boardKey}
        initialPeriod={
          renderTab === 'leaderboard-habits'
            ? 'all_time'
            : leaderboardFocus?.period
        }
      />
    )
  } else if (renderTab === 'habits') {
    content = (
      <HabitsPage
        onOpenTab={handleTabChange}
        onRequestAuth={requestAuth}
      />
    )
  } else if (renderTab === 'about') {
    content = <AboutPage onOpenTab={handleTabChange} />
  } else if (renderTab === 'sources-methodology') {
    content = <SourcesMethodologyPage onOpenTab={handleTabChange} />
  } else if (renderTab === 'privacy') {
    content = <PrivacyPage onOpenTab={handleTabChange} />
  } else if (renderTab === 'terms') {
    content = <TermsPage onOpenTab={handleTabChange} />
  } else if (renderTab === 'fitness-score') {
    content = <FitnessScorePage onOpenTab={handleTabChange} />
  } else if (renderTab === 'one-rep-max') {
    content = <OneRepMaxPage onOpenTab={handleTabChange} />
  } else if (renderTab === 'army-aft-guide') {
    content = <ArmyAftGuidePage onOpenTab={handleTabChange} />
  } else if (renderTab === 'air-force-pfra-guide') {
    content = <AirForcePfraGuidePage onOpenTab={handleTabChange} />
  } else if (renderTab === 'marine-pft-guide') {
    content = <MarinePftGuidePage onOpenTab={handleTabChange} />
  } else if (renderTab === 'navy-prt-guide') {
    content = <NavyPrtGuidePage onOpenTab={handleTabChange} />
  } else if (renderTab === 'vo2max-guide') {
    content = <Vo2MaxGuidePage onOpenTab={handleTabChange} />
  } else if (renderTab === 'fran-guide') {
    content = <FranGuidePage onOpenTab={handleTabChange} />
  } else if (renderTab === 'murph-guide') {
    content = <MurphGuidePage onOpenTab={handleTabChange} />
  } else if (renderTab === 'cindy-guide') {
    content = <CindyGuidePage onOpenTab={handleTabChange} />
  } else if (renderTab === 'not-found') {
    content = <NotFoundPage onOpenTab={handleTabChange} />
  } else {
    content = (
      <HomePage
        onOpenTab={handleTabChange}
        onRequestAuth={requestAuth}
      />
    )
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <ShareMomentHost />
      <div className="app">
        <div className="app-content" id="main-content" tabIndex={-1}>
          <PageTransition pageKey={activeTab}>
            <PageErrorBoundary
              key={activeTab}
              onGoHome={() => handleTabChange('home')}
            >
              <Suspense fallback={<PageChunkFallback />}>{content}</Suspense>
            </PageErrorBoundary>
          </PageTransition>
        </div>
        <Footer onOpenTab={handleTabChange} />
      </div>
      <ScrollToTopButton />
    </div>
  )
}

export default App
