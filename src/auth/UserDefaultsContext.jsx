import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useAuth } from './AuthContext'
import {
  EMPTY_USER_DEFAULTS,
  clearLocalDefaults,
  fetchUserDefaults,
  saveUserDefaults,
} from '../lib/userDefaults'

const UserDefaultsContext = createContext(null)

const SAVE_DEBOUNCE_MS = 450

export function UserDefaultsProvider({ children }) {
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const userId = user?.id ?? null
  const [defaults, setDefaults] = useState(EMPTY_USER_DEFAULTS)
  const [ready, setReady] = useState(false)
  const saveTimerRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    if (authLoading) return undefined

    if (!isAuthenticated || !userId) {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current)
        saveTimerRef.current = null
      }
      setDefaults(EMPTY_USER_DEFAULTS)
      setReady(true)
      return undefined
    }

    setReady(false)
    fetchUserDefaults(userId).then((loaded) => {
      if (cancelled) return
      setDefaults(loaded)
      setReady(true)
    })

    return () => {
      cancelled = true
    }
  }, [authLoading, isAuthenticated, userId])

  const persist = useCallback(
    (next) => {
      if (!userId) return
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      saveTimerRef.current = setTimeout(() => {
        saveUserDefaults(userId, next)
      }, SAVE_DEBOUNCE_MS)
    },
    [userId],
  )

  const patchDefaults = useCallback(
    (patch) => {
      if (!isAuthenticated || !userId) return

      // Always defer provider updates so callers never trip
      // "setState while rendering a different component".
      queueMicrotask(() => {
        setDefaults((current) => {
          let changed = false
          const next = { ...current }
          for (const [key, value] of Object.entries(patch)) {
            if (!(key in EMPTY_USER_DEFAULTS)) continue
            const normalized = value == null ? '' : String(value)
            if (next[key] !== normalized) {
              next[key] = normalized
              changed = true
            }
          }
          if (!changed) return current
          persist(next)
          return next
        })
      })
    },
    [isAuthenticated, userId, persist],
  )

  const clearDefaults = useCallback(() => {
    if (userId) clearLocalDefaults(userId)
    setDefaults(EMPTY_USER_DEFAULTS)
  }, [userId])

  const value = useMemo(
    () => ({
      defaults,
      ready: ready && !authLoading,
      isAuthenticated,
      userId,
      patchDefaults,
      clearDefaults,
    }),
    [
      defaults,
      ready,
      authLoading,
      isAuthenticated,
      userId,
      patchDefaults,
      clearDefaults,
    ],
  )

  return (
    <UserDefaultsContext.Provider value={value}>
      {children}
    </UserDefaultsContext.Provider>
  )
}

export function useUserDefaults() {
  const context = useContext(UserDefaultsContext)
  if (!context) {
    throw new Error('useUserDefaults must be used within UserDefaultsProvider')
  }
  return context
}

/**
 * Local state seeded from shared user defaults; writes back while signed in.
 * Remounting a calculator reloads the latest shared value for that field.
 *
 * Returns `[value, setValue, shared]` where `shared` drives SharedDataNotification:
 * - Auto-filled on hydrate from saved/shared defaults
 * - Clears when the user edits or empties the field
 * - `setValue(next, { fromShared: true })` marks a programmatic shared fill
 * - `setValue(next, { keepShared: true })` keeps the auto-fill flag (e.g. unit convert)
 *
 * @param {keyof typeof EMPTY_USER_DEFAULTS} key
 * @param {string} [fallback]
 * @returns {[string, Function, { isAutoFilled: boolean }]}
 */
export function useSyncedDefault(key, fallback = '') {
  const { defaults, patchDefaults, isAuthenticated, ready, userId } =
    useUserDefaults()
  const [value, setValue] = useState(fallback)
  const [isAutoFilled, setIsAutoFilled] = useState(false)

  useEffect(() => {
    if (!ready) return

    if (isAuthenticated) {
      const next = defaults[key]
      const hasShared = next != null && String(next) !== ''
      setValue(hasShared ? String(next) : fallback)
      setIsAutoFilled(hasShared)
    } else {
      setValue(fallback)
      setIsAutoFilled(false)
    }
    // Omit `defaults` so live patches while typing do not reset the field.
    // Remounting the page re-runs this and picks up the latest shared values.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional
  }, [ready, isAuthenticated, userId, key, fallback])

  const setSynced = useCallback(
    (next, meta = {}) => {
      const normalized =
        typeof next === 'function'
          ? String(next(value) ?? '')
          : next == null
            ? ''
            : String(next)

      setValue(normalized)

      if (meta.fromShared) {
        setIsAutoFilled(normalized !== '')
      } else if (meta.keepShared) {
        if (normalized === '') setIsAutoFilled(false)
      } else {
        setIsAutoFilled(false)
      }

      if (isAuthenticated) {
        patchDefaults({ [key]: normalized })
      }
    },
    [isAuthenticated, key, patchDefaults, value],
  )

  const shared = useMemo(
    () => ({
      isAutoFilled: isAutoFilled && value !== '',
    }),
    [isAutoFilled, value],
  )

  return [value, setSynced, shared]
}
