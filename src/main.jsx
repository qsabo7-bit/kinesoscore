import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './auth/AuthContext.jsx'
import { UserDefaultsProvider } from './auth/UserDefaultsContext.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <UserDefaultsProvider>
        <App />
      </UserDefaultsProvider>
    </AuthProvider>
  </StrictMode>,
)
