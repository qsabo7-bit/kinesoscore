import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  captureAuthCallbackParams,
  clearAuthCallbackFromUrl,
  clearAuthIntent,
  getAuthIntent,
  isEmailConfirmType,
  isPasswordRecoveryType,
  markRecoveryIntent,
} from '../lib/authCallback'
import {
  passwordRecoveryRedirectTo,
  signupConfirmRedirectTo,
} from '../lib/authRedirects'
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

function initialRecoveryState() {
  return getAuthIntent() === 'recovery'
}

function initialEmailConfirmedState() {
  return getAuthIntent() === 'signup'
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [passwordRecovery, setPasswordRecovery] = useState(initialRecoveryState)
  const [emailJustConfirmed, setEmailJustConfirmed] = useState(
    initialEmailConfirmedState,
  )
  const [authUrlError, setAuthUrlError] = useState('')
  // Once password update finishes, ignore further recovery events this session.
  const recoveryFinishedRef = useRef(false)

  const enterRecovery = useCallback(() => {
    if (recoveryFinishedRef.current) return
    if (getAuthIntent() !== 'recovery') {
      markRecoveryIntent()
    }
    setPasswordRecovery(true)
    setEmailJustConfirmed(false)
  }, [])

  const enterSignupConfirm = useCallback(() => {
    if (recoveryFinishedRef.current) return
    if (getAuthIntent() === 'recovery') return
    setPasswordRecovery(false)
    setEmailJustConfirmed(true)
  }, [])

  const finishRecovery = useCallback(() => {
    recoveryFinishedRef.current = true
    clearAuthIntent()
    setPasswordRecovery(false)
    setEmailJustConfirmed(false)
  }, [])

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

    const callback = captureAuthCallbackParams()
    const intent = getAuthIntent()

    if (!isSupabaseConfigured) {
      setSession(null)
      setUser(null)
      setProfile(null)
      setLoading(false)
      return undefined
    }

    try {
      const rawError = callback.errorDescription || callback.error
      if (rawError) {
        const decoded = decodeURIComponent(
          String(rawError).replace(/\+/g, ' '),
        )
        setAuthUrlError(decoded)
        clearAuthIntent()
        recoveryFinishedRef.current = true
        setPasswordRecovery(false)
        clearAuthCallbackFromUrl()
      } else if (intent === 'recovery' && !recoveryFinishedRef.current) {
        enterRecovery()
      } else if (intent === 'signup') {
        enterSignupConfirm()
      }
    } catch {
      // Ignore malformed URL fragments.
    }

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return
      setSession(data.session ?? null)
      setUser(data.session?.user ?? null)

      if (!recoveryFinishedRef.current) {
        if (getAuthIntent() === 'recovery') {
          enterRecovery()
        } else if (getAuthIntent() === 'signup') {
          enterSignupConfirm()
        }
      }

      clearAuthCallbackFromUrl()

      loadProfile(data.session?.user ?? null).finally(() => {
        if (mounted) setLoading(false)
      })
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, nextSession) => {
      const type = callback.type
      const currentIntent = getAuthIntent()

      if (event === 'PASSWORD_RECOVERY') {
        if (recoveryFinishedRef.current) {
          // Ignore stale recovery notifications after a completed update.
        } else if (isEmailConfirmType(type) && currentIntent !== 'recovery') {
          enterSignupConfirm()
        } else {
          enterRecovery()
        }
      } else if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
        // Recovery has priority over normal signed-in routing — but only while
        // an active (uncleared) recovery intent exists.
        if (
          !recoveryFinishedRef.current &&
          (currentIntent === 'recovery' || isPasswordRecoveryType(type))
        ) {
          enterRecovery()
        } else if (
          !recoveryFinishedRef.current &&
          (isEmailConfirmType(type) || currentIntent === 'signup')
        ) {
          enterSignupConfirm()
        }
      } else if (event === 'SIGNED_OUT') {
        // Do not re-arm recovery from cleared in-memory state.
      }

      setSession(nextSession)
      setUser(nextSession?.user ?? null)
      loadProfile(nextSession?.user ?? null)
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [loadProfile, enterRecovery, enterSignupConfirm])

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
        emailRedirectTo: signupConfirmRedirectTo(),
      },
    })
    if (error) throw error
    return data
  }, [])

  const signIn = useCallback(async ({ email, password }) => {
    requireConfigured()
    // Normal password login must never reopen recovery UI.
    recoveryFinishedRef.current = true
    clearAuthIntent()
    setPasswordRecovery(false)

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
    clearAuthIntent()
    setPasswordRecovery(false)
    setEmailJustConfirmed(false)
    setSession(null)
    setUser(null)
    setProfile(null)
  }, [])

  const resetPasswordForEmail = useCallback(async (email) => {
    requireConfigured()
    recoveryFinishedRef.current = false
    const trimmed = email.trim()
    const { error } = await supabase.auth.resetPasswordForEmail(trimmed, {
      redirectTo: passwordRecoveryRedirectTo(),
    })
    if (error) throw error
  }, [])

  const updatePassword = useCallback(
    async (password) => {
      requireConfigured()
      const { data, error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      // Clear recovery BEFORE any follow-up SIGNED_IN / USER_UPDATED handling.
      finishRecovery()
      return data
    },
    [finishRecovery],
  )

  const clearPasswordRecovery = useCallback(() => {
    finishRecovery()
  }, [finishRecovery])

  const clearEmailJustConfirmed = useCallback(() => {
    if (getAuthIntent() === 'signup') {
      clearAuthIntent()
    }
    setEmailJustConfirmed(false)
  }, [])

  const clearAuthUrlError = useCallback(() => {
    setAuthUrlError('')
  }, [])

  const deleteAccount = useCallback(async () => {
    requireConfigured()
    const { error } = await supabase.rpc('delete_own_account')
    if (error) throw error

    finishRecovery()
    setEmailJustConfirmed(false)
    setSession(null)
    setUser(null)
    setProfile(null)
    try {
      await supabase.auth.signOut()
    } catch {
      // Session may already be invalid after account deletion.
    }
  }, [finishRecovery])

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      loading,
      isConfigured: isSupabaseConfigured,
      // During password recovery the session exists only to update the password.
      isAuthenticated: Boolean(session?.user ?? user) && !passwordRecovery,
      passwordRecovery,
      emailJustConfirmed,
      authUrlError,
      firstName: profile?.first_name || user?.user_metadata?.first_name || '',
      signUp,
      signIn,
      signOut,
      resetPasswordForEmail,
      updatePassword,
      clearPasswordRecovery,
      clearEmailJustConfirmed,
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
      emailJustConfirmed,
      authUrlError,
      signUp,
      signIn,
      signOut,
      resetPasswordForEmail,
      updatePassword,
      clearPasswordRecovery,
      clearEmailJustConfirmed,
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
