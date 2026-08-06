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
import { pathForTab, resolveSeoRoute } from './data/seo'
import { applyDocumentSeo } from './lib/documentSeo'

function initialTabFromLocation() {
  if (typeof window === 'undefined') return 'home'
  return resolveSeoRoute(window.location.pathname).seoId
}

function App() {
  const {
    isAuthenticated,
    loading,
    passwordRecovery,
    authUrlError,
    clearPasswordRecovery,
  } = useAuth()
  const [activeTab, setActiveTab] = useState(initialTabFromLocation)
  const [authNotice, setAuthNotice] = useState('')
  const openedRecovery = useRef(false)
  const skipNextUrlPush = useRef(false)
  const goToLogin = () => setActiveTab('login')

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

  // Open the reset screen once when a recovery link is detected — don't lock nav.
  useEffect(() => {
    if (passwordRecovery && !openedRecovery.current) {
      openedRecovery.current = true
      setActiveTab('reset-password')
    }
    if (!passwordRecovery) {
      openedRecovery.current = false
    }
  }, [passwordRecovery])

  useEffect(() => {
    if (authUrlError) {
      setActiveTab('login')
    }
  }, [authUrlError])

  useEffect(() => {
    if (loading) return

    if (isAuthenticated && activeTab === 'login') {
      setActiveTab('dashboard')
      return
    }

    if (!isAuthenticated && activeTab === 'account') {
      setActiveTab('home')
    }

    // Only bounce off reset when there's no active recovery session.
    if (!isAuthenticated && !passwordRecovery && activeTab === 'reset-password') {
      setActiveTab('login')
    }
  }, [isAuthenticated, loading, activeTab, passwordRecovery])

  const showResetPassword =
    activeTab === 'reset-password' ||
    (passwordRecovery && activeTab === 'reset-password')

  const renderTab =
    activeTab === 'calculators' ? 'strength' : activeTab

  let content
  if (showResetPassword && passwordRecovery) {
    content = (
      <ResetPasswordPage
        onSuccess={(notice) => {
          setAuthNotice(notice || '')
          setActiveTab('login')
        }}
        onRequestLogin={() => {
          clearPasswordRecovery?.()
          setActiveTab('login')
        }}
      />
    )
  } else if (renderTab === 'strength') {
    content = <StrengthPage onRequestAuth={goToLogin} />
  } else if (renderTab === 'running') {
    content = <RunningPage onRequestAuth={goToLogin} />
  } else if (renderTab === 'scoring') {
    content = <ScoringPage onRequestAuth={goToLogin} />
  } else if (renderTab === 'vo2max') {
    content = <Vo2MaxPage onRequestAuth={goToLogin} />
  } else if (renderTab === 'bmr') {
    content = <BmrPage onRequestAuth={goToLogin} />
  } else if (renderTab === 'bmi') {
    content = <BmiPage onRequestAuth={goToLogin} />
  } else if (renderTab === 'fitness-age') {
    content = <FitnessAgePage onRequestAuth={goToLogin} />
  } else if (renderTab === 'air-force-pfra') {
    content = <AirForcePfraPage onRequestAuth={goToLogin} />
  } else if (renderTab === 'air-force-pfa') {
    content = <AirForcePfaPage onRequestAuth={goToLogin} />
  } else if (renderTab === 'army-aft') {
    content = <ArmyAftPage onRequestAuth={goToLogin} />
  } else if (renderTab === 'marine-pft') {
    content = <MarinePftPage onRequestAuth={goToLogin} />
  } else if (renderTab === 'navy-prt') {
    content = <NavyPrtPage onRequestAuth={goToLogin} />
  } else if (renderTab === 'login') {
    content = (
      <AuthPage
        initialMessage={authNotice}
        onSuccess={() => {
          setAuthNotice('')
          setActiveTab('dashboard')
        }}
      />
    )
  } else if (renderTab === 'account') {
    content = <AccountPage onOpenTab={setActiveTab} />
  } else if (renderTab === 'dashboard') {
    content = (
      <DashboardPage onOpenTab={setActiveTab} onRequestAuth={goToLogin} />
    )
  } else if (renderTab === 'about') {
    content = <AboutPage />
  } else {
    content = <HomePage onOpenTab={setActiveTab} />
  }

  return (
    <div className="app">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="app-content">
        <PageTransition pageKey={activeTab}>{content}</PageTransition>
      </div>
      <Footer onOpenTab={setActiveTab} />
    </div>
  )
}

export default App
