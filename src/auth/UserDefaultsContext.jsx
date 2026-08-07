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
import { isEstimated5kDefaultKey } from '../lib/runningTracking'
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
  /** Shared across fiveKHours/Minutes/Seconds so a partial edit blocks all three. */
  const estimated5kEditedRef = useRef(false)

  useEffect(() => {
    estimated5kEditedRef.current = false
  }, [userId, isAuthenticated])

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

  const isEstimated5kEdited = useCallback(
    () => estimated5kEditedRef.current,
    [],
  )

  const markEstimated5kEdited = useCallback(() => {
    estimated5kEditedRef.current = true
  }, [])

  /**
   * @param {Record<string, string>} patch
   * @param {{ source?: 'estimated5k-sync' }} [meta]
   *   `estimated5k-sync` = from saved running history (save/delete/mount hydrate).
   *   Clears the manual-edit lock so dependent fields pick up the new values.
   */
  const patchDefaults = useCallback(
    (patch, meta = {}) => {
      if (!isAuthenticated || !userId) return

      if (meta.source === 'estimated5k-sync') {
        estimated5kEditedRef.current = false
      }

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
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current)
      saveTimerRef.current = null
    }
    if (userId) clearLocalDefaults(userId)
    estimated5kEditedRef.current = false
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
      isEstimated5kEdited,
      markEstimated5kEdited,
    }),
    [
      defaults,
      ready,
      authLoading,
      isAuthenticated,
      userId,
      patchDefaults,
      clearDefaults,
      isEstimated5kEdited,
      markEstimated5kEdited,
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
 * Estimated 5K keys (`fiveKHours` / `Minutes` / `Seconds`) also follow external
 * `estimated5k-sync` patches from saved running history, unless the user is
 * mid-edit (then only a clear-to-blank from "no valid runs" applies).
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
  const {
    defaults,
    patchDefaults,
    isAuthenticated,
    ready,
    userId,
    isEstimated5kEdited,
    markEstimated5kEdited,
  } = useUserDefaults()
  const [value, setValue] = useState(fallback)
  const [isAutoFilled, setIsAutoFilled] = useState(false)
  const isFiveK = isEstimated5kDefaultKey(key)

  useEffect(() => {
    if (!ready) return

    if (!isAuthenticated) {
      setValue(fallback)
      setIsAutoFilled(false)
      return
    }

    const next = defaults[key]
    const nextStr = next == null ? '' : String(next)
    const hasShared = nextStr !== ''

    if (isFiveK) {
      // Mid-edit: keep local values unless history cleared (no valid saved run).
      if (isEstimated5kEdited() && hasShared) return
      setValue(hasShared ? nextStr : fallback)
      setIsAutoFilled(hasShared)
      return
    }

    // Non-fiveK: hydrate on ready/user/key only (ignore live default patches).
    setValue(hasShared ? nextStr : fallback)
    setIsAutoFilled(hasShared)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fiveK watches defaults[key]; others intentionally omit
  }, [
    ready,
    isAuthenticated,
    userId,
    key,
    fallback,
    isFiveK,
    isFiveK ? defaults[key] : null,
    isEstimated5kEdited,
  ])

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
        if (isFiveK) markEstimated5kEdited()
      }

      if (isAuthenticated) {
        patchDefaults({ [key]: normalized })
      }
    },
    [
      isAuthenticated,
      key,
      patchDefaults,
      value,
      isFiveK,
      markEstimated5kEdited,
    ],
  )

  const shared = useMemo(
    () => ({
      isAutoFilled: isAutoFilled && value !== '',
    }),
    [isAutoFilled, value],
  )

  return [value, setSynced, shared]
}
