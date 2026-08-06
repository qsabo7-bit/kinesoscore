import { useState } from 'react'
import { useAuth } from '../auth/AuthContext'

function AuthPage({ onSuccess }) {
  const { signIn, signUp, isConfigured } = useAuth()
  const [mode, setMode] = useState('login')
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const isSignup = mode === 'signup'

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setMessage('')
    setSubmitting(true)

    try {
      if (isSignup) {
        if (!firstName.trim()) {
          throw new Error('Please enter your first name.')
        }
        if (password.length < 6) {
          throw new Error('Password must be at least 6 characters.')
        }

        const data = await signUp({ email, password, firstName })
        if (data.session) {
          setMessage('Account created. Welcome to KinesoScore.')
          onSuccess?.('account')
        } else {
          setMessage(
            'Account created. Check your email to confirm, then log in.',
          )
          setMode('login')
        }
      } else {
        await signIn({ email, password })
        setMessage('Signed in successfully.')
        onSuccess?.('account')
      }
    } catch (err) {
      const text = err?.message || 'Authentication failed.'
      if (/invalid login credentials/i.test(text)) {
        setError('Incorrect email or password. Please try again.')
      } else {
        setError(text)
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="page auth-page">
      <header className="page-header">
        <p className="page-eyebrow">Account</p>
        <h1>{isSignup ? 'Create account' : 'Log in'}</h1>
        <p className="page-lead">
          {isSignup
            ? 'Save calculator results and track improvement over time.'
            : 'Sign in to access your saved progress and account dashboard.'}
        </p>
      </header>

      {!isConfigured ? (
        <p className="feedback feedback-error">
          Supabase is not configured yet. In <code>.env</code>, set{' '}
          <code>VITE_SUPABASE_URL</code> to your project URL (
          <code>https://….supabase.co</code>) and{' '}
          <code>VITE_SUPABASE_ANON_KEY</code> to the anon/publishable key, then
          restart <code>npm run dev</code>.
        </p>
      ) : null}

      <form className="calc-form auth-form" onSubmit={handleSubmit}>
        {isSignup ? (
          <label className="field">
            <span>First name</span>
            <input
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </label>
        ) : null}

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Password</span>
          <input
            type="password"
            autoComplete={isSignup ? 'new-password' : 'current-password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
          />
        </label>

        {error ? <p className="feedback feedback-error">{error}</p> : null}
        {message ? <p className="feedback feedback-success">{message}</p> : null}

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={submitting || !isConfigured}
        >
          {submitting
            ? isSignup
              ? 'Creating account…'
              : 'Signing in…'
            : isSignup
              ? 'Create account'
              : 'Log in'}
        </button>
      </form>

      <p className="auth-switch">
            {isSignup ? 'Already have an account?' : 'New to KinesoScore?'}{' '}
        <button
          type="button"
          className="text-link"
          onClick={() => {
            setMode(isSignup ? 'login' : 'signup')
            setError('')
            setMessage('')
          }}
        >
          {isSignup ? 'Log in' : 'Create an account'}
        </button>
      </p>
    </main>
  )
}

export default AuthPage
