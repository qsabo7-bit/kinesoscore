import { useEffect, useRef, useState } from 'react'
import { useAuth } from './auth/AuthContext'
import Footer from './components/Footer'
import Header from './components/Header'
import PageTransition from './components/PageTransition'
import HomePage from './pages/HomePage'
import StrengthPage from './pages/StrengthPage'
import RunningPage from './pages/RunningPage'
import ScoringPage from './pages/ScoringPage'
import Vo2MaxPage from './pages/Vo2MaxPage'
import BmrPage from './pages/BmrPage'
import BmiPage from './pages/BmiPage'
import FitnessAgePage from './pages/FitnessAgePage'
import AirForcePfraPage from './pages/military/AirForcePfraPage'
import AirForcePfaPage from './pages/military/AirForcePfaPage'
import ArmyAftPage from './pages/military/ArmyAftPage'
import MarinePftPage from './pages/military/MarinePftPage'
import NavyPrtPage from './pages/military/NavyPrtPage'
import AuthPage from './pages/AuthPage'
import AccountPage from './pages/AccountPage'
import DashboardPage from './pages/DashboardPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import AboutPage from './pages/AboutPage'
import FitnessScorePage from './pages/FitnessScorePage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import { pathForTab, resolveSeoRoute } from './data/seo'
import {
  getAuthIntent,
  hasPendingAuthCallbackInUrl,
} from './lib/authCallback'
import { applyDocumentSeo } from './lib/documentSeo'

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
    isAuthenticated,
    loading,
    passwordRecovery,
    emailJustConfirmed,
    authUrlError,
    clearPasswordRecovery,
    clearEmailJustConfirmed,
  } = useAuth()
  const [activeTab, setActiveTab] = useState(initialTabFromLocation)
  const [authNotice, setAuthNotice] = useState('')
  const [authMode, setAuthMode] = useState('login')
  const openedRecovery = useRef(false)
  const handledEmailConfirm = useRef(false)
  const skipNextUrlPush = useRef(false)

  const handleTabChange = (tab) => {
    if (tab === 'login') setAuthMode('login')
    setActiveTab(tab)
  }

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

    if (!isAuthenticated && activeTab === 'account') {
      setActiveTab('home')
    }

    // Only bounce off reset when there's no active recovery session.
    if (!isAuthenticated && activeTab === 'reset-password') {
      setActiveTab('login')
    }
  }, [isAuthenticated, loading, activeTab, passwordRecovery])

  const renderTab =
    activeTab === 'calculators' ? 'strength' : activeTab

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
          clearPasswordRecovery?.()
          setAuthMode('login')
          setActiveTab('login')
        }}
      />
    )
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
    content = <AccountPage onOpenTab={handleTabChange} />
  } else if (renderTab === 'dashboard') {
    content = (
      <DashboardPage
        onOpenTab={handleTabChange}
        onRequestAuth={requestAuth}
      />
    )
  } else if (renderTab === 'about') {
    content = <AboutPage onOpenTab={handleTabChange} />
  } else if (renderTab === 'privacy') {
    content = <PrivacyPage onOpenTab={handleTabChange} />
  } else if (renderTab === 'terms') {
    content = <TermsPage onOpenTab={handleTabChange} />
  } else if (renderTab === 'fitness-score') {
    content = <FitnessScorePage onOpenTab={handleTabChange} />
  } else {
    content = <HomePage onOpenTab={handleTabChange} />
  }

  return (
    <div className="app">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      <div className="app-content">
        <PageTransition pageKey={activeTab}>{content}</PageTransition>
      </div>
      <Footer onOpenTab={setActiveTab} />
    </div>
  )
}

export default App
