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

  const loadProfile = useCallback(async (nextUser) => {
    if (!nextUser) {
      setProfile(null)
      return
    }

    try {
      const data = await fetchProfile(nextUser.id)
      if (data) {
        setProfile(data)
        return
      }

      const firstName =
        nextUser.user_metadata?.first_name?.trim() ||
        nextUser.email?.split('@')[0] ||
        'Athlete'

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
      console.error('Failed to load profile', error)
      setProfile({
        id: nextUser.id,
        first_name:
          nextUser.user_metadata?.first_name?.trim() ||
          nextUser.email?.split('@')[0] ||
          'Athlete',
        email: nextUser.email,
        created_at: nextUser.created_at,
      })
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
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
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
    setSession(null)
    setUser(null)
    setProfile(null)
  }, [])

  const deleteAccount = useCallback(async () => {
    requireConfigured()
    const { error } = await supabase.rpc('delete_own_account')
    if (error) throw error

    // Local cleanup even if the auth user was already removed server-side.
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
      // Strict: Login tab visibility depends on a real session user only.
      isAuthenticated: Boolean(session?.user ?? user),
      firstName: profile?.first_name || user?.user_metadata?.first_name || '',
      signUp,
      signIn,
      signOut,
      deleteAccount,
      refreshProfile: () => loadProfile(user),
    }),
    [
      session,
      user,
      profile,
      loading,
      signUp,
      signIn,
      signOut,
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
