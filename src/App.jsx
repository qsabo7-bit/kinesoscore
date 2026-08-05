import { useState } from 'react'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import StrengthPage from './pages/StrengthPage'
import RunningPage from './pages/RunningPage'
import ScoringPage from './pages/ScoringPage'
import AboutPage from './pages/AboutPage'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  let content
  if (activeTab === 'strength') {
    content = <StrengthPage />
  } else if (activeTab === 'running') {
    content = <RunningPage />
  } else if (activeTab === 'scoring') {
    content = <ScoringPage />
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
