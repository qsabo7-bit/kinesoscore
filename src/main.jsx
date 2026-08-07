import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'
import { AuthProvider } from './auth/AuthContext.jsx'
import { UserDefaultsProvider } from './auth/UserDefaultsContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserDefaultsProvider>
        <App />
        <Analytics />
        <SpeedInsights />
      </UserDefaultsProvider>
    </AuthProvider>
  </StrictMode>,
)
