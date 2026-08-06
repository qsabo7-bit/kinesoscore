import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { isSupabaseConfigured, supabase } from '../supabaseClient'

const AuthContext = createContext(null)

/** Once true, skip further profiles API calls until a full page reload. */
let profilesTableUnavailable = false

function profileFromUser(nextUser) {
  return {
    id: nextUser.id,
    first_name:
      nextUser.user_metadata?.first_name?.trim() ||
      nextUser.email?.split('@')[0] ||
      'Athlete',
    email: nextUser.email,
    created_at: nextUser.created_at,
  }
}

/** Missing table / schema-cache miss (common before SQL setup is run). */
function isMissingProfilesTable(error) {
  if (!error) return false
  const code = String(error.code || '')
  const status = Number(error.status || error.statusCode || 0)
  const message = String(error.message || '')
  return (
    code === 'PGRST205' ||
    code === '42P01' ||
    status === 404 ||
    /Could not find the table .*profiles/i.test(message) ||
    /relation .*profiles.* does not exist/i.test(message)
  )
}

async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, first_name, email, created_at')
    .eq('id', userId)
    .maybeSingle()

  if (error) throw error
  return data
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [passwordRecovery, setPasswordRecovery] = useState(false)
  const [authUrlError, setAuthUrlError] = useState('')

  const loadProfile = useCallback(async (nextUser) => {
    if (!nextUser) {
      setProfile(null)
      return
    }

    if (profilesTableUnavailable) {
      setProfile(profileFromUser(nextUser))
      return
    }

    try {
      const data = await fetchProfile(nextUser.id)
      if (data) {
        setProfile(data)
        return
      }

      const firstName = profileFromUser(nextUser).first_name

      const { data: created, error } = await supabase
        .from('profiles')
        .upsert({
          id: nextUser.id,
          first_name: firstName,
          email: nextUser.email,
        })
        .select('id, first_name, email, created_at')
        .single()

      if (error) throw error
      setProfile(created)
    } catch (error) {
      if (isMissingProfilesTable(error)) {
        profilesTableUnavailable = true
      } else {
        console.error('Failed to load profile', error)
      }
      setProfile(profileFromUser(nextUser))
    }
  }, [])

  useEffect(() => {
    let mounted = true

    if (!isSupabaseConfigured) {
      setSession(null)
      setUser(null)
      setProfile(null)
      setLoading(false)
      return undefined
    }

    // Surface expired / invalid recovery links from the URL hash or query.
    try {
      const hashParams = new URLSearchParams(
        window.location.hash.replace(/^#/, ''),
      )
      const searchParams = new URLSearchParams(window.location.search)
      const rawError =
        hashParams.get('error_description') ||
        hashParams.get('error') ||
        searchParams.get('error_description') ||
        searchParams.get('error')
      if (rawError) {
        const decoded = decodeURIComponent(rawError.replace(/\+/g, ' '))
        setAuthUrlError(decoded)
        window.history.replaceState(
          {},
          document.title,
          `${window.location.pathname}${window.location.search}`,
        )
      }
    } catch {
      // Ignore malformed URL fragments.
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session ?? null)
      setUser(data.session?.user ?? null)
      loadProfile(data.session?.user ?? null).finally(() => {
        if (mounted) setLoading(false)
      })
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      if (event === 'PASSWORD_RECOVERY') {
        setPasswordRecovery(true)
      }
      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      loadProfile(nextSession?.user ?? null)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [loadProfile])

  const requireConfigured = () => {
    if (!isSupabaseConfigured) {
      throw new Error(
        'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env, then restart the dev server.',
      )
    }
  }

  const signUp = useCallback(async ({ email, password, firstName }) => {
    requireConfigured()
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { first_name: firstName.trim() },
      },
    })
    if (error) throw error
    return data
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    requireConfigured()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (error) throw error
    return data
  }, [])

  const signOut = useCallback(async () => {
    requireConfigured()
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setPasswordRecovery(false)
    setSession(null)
    setUser(null)
    setProfile(null)
  }, [])

  const resetPasswordForEmail = useCallback(async (email) => {
    requireConfigured()
    const trimmed = email.trim()
    const { error } = await supabase.auth.resetPasswordForEmail(trimmed, {
      redirectTo: `${window.location.origin}/`,
    })
    if (error) throw error
  }, [])

  const updatePassword = useCallback(async (password) => {
    requireConfigured()
    const { data, error } = await supabase.auth.updateUser({ password })
    if (error) throw error
    setPasswordRecovery(false)
    return data
  }, [])

  const clearPasswordRecovery = useCallback(() => {
    setPasswordRecovery(false)
  }, [])

  const clearAuthUrlError = useCallback(() => {
    setAuthUrlError('')
  }, [])

  const deleteAccount = useCallback(async () => {
    requireConfigured()
    const { error } = await supabase.rpc('delete_own_account')
    if (error) throw error

    // Local cleanup even if the auth user was already removed server-side.
    setPasswordRecovery(false)
    setSession(null)
    setUser(null)
    setProfile(null)
    try {
      await supabase.auth.signOut()
    } catch {
      // Session may already be invalid after account deletion.
    }
  }, [])

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      loading,
      isConfigured: isSupabaseConfigured,
      // During password recovery the session exists only to update the password.
      // Treat the user as logged out everywhere else so nav stays in guest mode.
      isAuthenticated: Boolean(session?.user ?? user) && !passwordRecovery,
      passwordRecovery,
      authUrlError,
      firstName: profile?.first_name || user?.user_metadata?.first_name || '',
      signUp,
      signIn,
      signOut,
      resetPasswordForEmail,
      updatePassword,
      clearPasswordRecovery,
      clearAuthUrlError,
      deleteAccount,
      refreshProfile: () => loadProfile(user),
    }),
    [
      session,
      user,
      profile,
      loading,
      passwordRecovery,
      authUrlError,
      signUp,
      signIn,
      signOut,
      resetPasswordForEmail,
      updatePassword,
      clearPasswordRecovery,
      clearAuthUrlError,
      deleteAccount,
      loadProfile,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
