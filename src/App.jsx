import { useEffect, useState } from 'react'
import { useAuth } from './auth/AuthContext'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import StrengthPage from './pages/StrengthPage'
import RunningPage from './pages/RunningPage'
import ScoringPage from './pages/ScoringPage'
import Vo2MaxPage from './pages/Vo2MaxPage'
import BmrPage from './pages/BmrPage'
import AuthPage from './pages/AuthPage'
import AccountPage from './pages/AccountPage'
import AboutPage from './pages/AboutPage'

function App() {
  const { isAuthenticated, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('home')

  // Keep auth pages in sync with session changes (login, logout, delete, refresh).
  useEffect(() => {
    if (loading) return

    if (isAuthenticated && activeTab === 'login') {
      setActiveTab('account')
      return
    }

    if (!isAuthenticated && activeTab === 'account') {
      setActiveTab('home')
    }
  }, [isAuthenticated, loading, activeTab])

  let content
  if (activeTab === 'strength') {
    content = <StrengthPage onRequestAuth={() => setActiveTab('login')} />
  } else if (activeTab === 'running') {
    content = <RunningPage />
  } else if (activeTab === 'scoring') {
    content = <ScoringPage />
  } else if (activeTab === 'vo2max') {
    content = <Vo2MaxPage />
  } else if (activeTab === 'bmr') {
    content = <BmrPage />
  } else if (activeTab === 'login') {
    content = <AuthPage onSuccess={() => setActiveTab('account')} />
  } else if (activeTab === 'account') {
    content = <AccountPage onOpenTab={setActiveTab} />
  } else if (activeTab === 'about') {
    content = <AboutPage />
  } else {
    content = <HomePage onOpenTab={setActiveTab} />
  }

  return (
    <div className="app">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      {content}
    </div>
  )
}

export default App
