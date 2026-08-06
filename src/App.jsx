import { useEffect, useState } from 'react'
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
import AuthPage from './pages/AuthPage'
import AccountPage from './pages/AccountPage'
import DashboardPage from './pages/DashboardPage'
import AboutPage from './pages/AboutPage'

function App() {
  const { isAuthenticated, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('home')
  const goToLogin = () => setActiveTab('login')

  useEffect(() => {
    if (loading) return

    if (isAuthenticated && activeTab === 'login') {
      setActiveTab('dashboard')
      return
    }

    if (!isAuthenticated && activeTab === 'account') {
      setActiveTab('home')
    }
  }, [isAuthenticated, loading, activeTab])

  let content
  if (activeTab === 'strength') {
    content = <StrengthPage onRequestAuth={goToLogin} />
  } else if (activeTab === 'running') {
    content = <RunningPage onRequestAuth={goToLogin} />
  } else if (activeTab === 'scoring') {
    content = <ScoringPage onRequestAuth={goToLogin} />
  } else if (activeTab === 'vo2max') {
    content = <Vo2MaxPage onRequestAuth={goToLogin} />
  } else if (activeTab === 'bmr') {
    content = <BmrPage onRequestAuth={goToLogin} />
  } else if (activeTab === 'bmi') {
    content = <BmiPage onRequestAuth={goToLogin} />
  } else if (activeTab === 'fitness-age') {
    content = <FitnessAgePage onRequestAuth={goToLogin} />
  } else if (activeTab === 'login') {
    content = <AuthPage onSuccess={() => setActiveTab('dashboard')} />
  } else if (activeTab === 'account') {
    content = <AccountPage onOpenTab={setActiveTab} />
  } else if (activeTab === 'dashboard') {
    content = (
      <DashboardPage onOpenTab={setActiveTab} onRequestAuth={goToLogin} />
    )
  } else if (activeTab === 'about') {
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
