import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAuth } from '../auth/AuthContext'
import { MASS_UNITS } from '../calculations'
import { fetchLeaderboardName } from '../lib/leaderboardProfile'
import {
  deactivateLeaderboardShare,
  fetchActiveLeaderboardShare,
  friendlyLeaderboardShareError,
  resolveLeaderboardShareTarget,
  upsertLeaderboardShare,
} from '../lib/leaderboardShares'
import {
  canonicalizeLeaderboardShareValue,
  isLargeLeaderboardShareJump,
  resolveLeaderboardShareJumpBaseline,
} from '../lib/leaderboardShareUnits'
import {
  computePerformanceSummary,
  deletePerformanceRecord,
  fetchPerformanceRecords,
  filterRecordsByRange,
  recordsInMassUnit,
  savePerformanceRecord,
} from '../lib/performanceRecords'
import {
  buildDerivedEstimated5kRecords,
  excludeStoredEstimated5kRecords,
} from '../lib/runningTracking'
import { useFocusTrap } from '../lib/useFocusTrap'
import FadeSwap from './FadeSwap'
import UnitToggle from './UnitToggle'
import {
  DEFAULT_LOCKED_PREVIEW,
  GraphRangeToggle,
  GraphTrackSelector,
  HistoryList,
  LeaderboardShareControl,
  LockedGraphPreview,
  PerformanceSummary,
  ProgressGraph,
  SaveResultButton,
} from './tracking'

/**
 * Universal result tracking for every calculator.
 *
 * Logged in: Save + summary + graph + history (filtered by calculator_type + exercise_name)
 * Logged out: Locked graph preview after a result is available
 *
 * @param {object} props
 * @param {string} props.calculatorType - performance_records.calculator_type
 * @param {Array<{id: string, label: string, exerciseName: string, yAxisLabel?: string, higherIsBetter?: boolean}>} props.tracks
 * @param {string} [props.activeTrackId]
 * @param {number | null | undefined} props.resultValue
 * @param {string} [props.resultUnit]
 * @param {'mass' | 'duration' | 'number'} [props.valueKind]
 * @param {string} [props.displayUnit]
 * @param {(unit: string) => void} [props.onDisplayUnitChange]
 * @param {() => void} [props.onRequestAuth]
 * @param {boolean} [props.hasResult]
 * @param {'default' | 'score' | 'assessment' | 'bmi' | 'fitnessAge'} [props.summaryVariant]
 * @param {string} [props.saveLabel]
 * @param {'number' | 'duration' | 'score' | 'bmi' | 'fitnessAge'} [props.sampleKind]
 * @param {{ title?: string, lead?: string, benefits?: string[] }} [props.lockedPreview]
 * @param {Array<{ exerciseName: string, resultValue: number, resultUnit?: string }>} [props.companionSaves]
 * @param {(payload: { track: object, resultValue: number, recordId: string }) => void} [props.onSaved]
 * @param {(payload: { recordId: string }) => void} [props.onDeleted]
 * @param {Element | null} [props.saveHost] - Optional DOM node to portal the Save button into
 *   (e.g. above age/gender comparison on Strength / Running).
 * @param {(tabId: string) => void} [props.onOpenTab] - Account Settings navigation for Leaderboard Name
 */
function CalculatorTracking({
  calculatorType,
  tracks,
  activeTrackId,
  resultValue,
  resultUnit,
  valueKind = 'number',
  displayUnit: controlledDisplayUnit,
  onDisplayUnitChange,
  onRequestAuth,
  onOpenTab,
  hasResult = false,
  summaryVariant = 'default',
  saveLabel = 'Save Result',
  sampleKind,
  lockedPreview,
  companionSaves = [],
  onSaved,
  onDeleted,
  saveHost = null,
}) {
  const { isAuthenticated, user, loading: authLoading } = useAuth()
  const [selectedTrackId, setSelectedTrackId] = useState(
    activeTrackId || tracks[0]?.id,
  )
  const [recordsByTrack, setRecordsByTrack] = useState({})
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [pendingDeleteId, setPendingDeleteId] = useState(null)
  const deleteDialogRef = useFocusTrap(Boolean(pendingDeleteId), () =>
    setPendingDeleteId(null),
  )
  const [savedMessage, setSavedMessage] = useState(false)
  const [shareMessage, setShareMessage] = useState('')
  const [error, setError] = useState('')
  const [localDisplayUnit, setLocalDisplayUnit] = useState(
    resultUnit === 'kg' ? 'kg' : 'lb',
  )
  const [graphRange, setGraphRange] = useState('all')
  /** @type {'private' | 'global'} */
  const [shareMode, setShareMode] = useState('private')
  const [hadActiveShare, setHadActiveShare] = useState(false)
  /** Active share's source_record_id when one exists for this board. */
  const [activeShareSourceId, setActiveShareSourceId] = useState(null)
  /** Last confirmed public share value/unit (null if none). Never set from form input. */
  const [activeShareSnapshot, setActiveShareSnapshot] = useState(null)
  const [pendingShareJump, setPendingShareJump] = useState(null)
  /** @type {null | 'discard' | 'update'} */
  const [shareJumpBusy, setShareJumpBusy] = useState(null)
  const [hasLeaderboardName, setHasLeaderboardName] = useState(true)
  const touchStartX = useRef(null)
  /** Confirmed share baseline; only updated on fetch / successful upsert / clear. */
  const confirmedShareBaselineRef = useRef(null)
  const shareJumpDialogRef = useFocusTrap(Boolean(pendingShareJump), () => {
    if (!shareJumpBusy) {
      // Escape = keep previous share (discard this save).
      void handleCancelShareJumpRef.current?.()
    }
  })
  const handleCancelShareJumpRef = useRef(null)

  const displayUnit =
    valueKind === 'mass'
      ? (controlledDisplayUnit ?? localDisplayUnit)
      : resultUnit

  const setDisplayUnit = (unit) => {
    if (onDisplayUnitChange) onDisplayUnitChange(unit)
    else setLocalDisplayUnit(unit)
  }

  const trackIds = tracks.map((track) => track.id).join('|')

  useEffect(() => {
    if (!activeTrackId) return
    if (tracks.some((track) => track.id === activeTrackId)) {
      setSelectedTrackId(activeTrackId)
    }
  }, [activeTrackId, trackIds, tracks])

  useEffect(() => {
    if (valueKind === 'mass' && (resultUnit === 'lb' || resultUnit === 'kg')) {
      if (!controlledDisplayUnit) setLocalDisplayUnit(resultUnit)
    }
  }, [resultUnit, valueKind, controlledDisplayUnit])

  const selectedTrack =
    tracks.find((track) => track.id === selectedTrackId) || tracks[0]

  const historyLoadGenRef = useRef(0)

  const loadHistory = useCallback(async () => {
    if (!isAuthenticated || !user?.id || !tracks.length) {
      setRecordsByTrack({})
      return
    }

    const generation = ++historyLoadGenRef.current
    setLoadingHistory(true)
    setError('')
    try {
      const hasDerivedTrack = tracks.some((track) => track.derived)
      const allForCalculator = hasDerivedTrack
        ? excludeStoredEstimated5kRecords(
            await fetchPerformanceRecords(user.id, calculatorType),
          )
        : null

      const entries = await Promise.all(
        tracks.map(async (track) => {
          if (track.derived) {
            return [
              track.id,
              buildDerivedEstimated5kRecords(allForCalculator || []),
            ]
          }
          const rows = excludeStoredEstimated5kRecords(
            await fetchPerformanceRecords(
              user.id,
              calculatorType,
              track.exerciseName,
            ),
          )
          return [track.id, rows]
        }),
      )
      // Drop stale responses so an older in-flight fetch cannot restore a
      // row the user just deleted.
      if (generation !== historyLoadGenRef.current) return
      setRecordsByTrack(Object.fromEntries(entries))
    } catch (err) {
      if (generation !== historyLoadGenRef.current) return
      setError(err.message || 'Could not load your progress.')
    } finally {
      if (generation === historyLoadGenRef.current) {
        setLoadingHistory(false)
      }
    }
  }, [isAuthenticated, user?.id, calculatorType, tracks])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  const rawSelectedRecords = recordsByTrack[selectedTrack?.id] || []
  const unitAdjustedRecords = useMemo(() => {
    if (valueKind === 'mass') {
      return recordsInMassUnit(rawSelectedRecords, displayUnit || 'lb')
    }
    return rawSelectedRecords
  }, [rawSelectedRecords, valueKind, displayUnit])

  const selectedRecords = useMemo(
    () => filterRecordsByRange(unitAdjustedRecords, graphRange),
    [unitAdjustedRecords, graphRange],
  )

  const higherIsBetter = selectedTrack?.higherIsBetter !== false
  const axisLabel =
    valueKind === 'duration'
      ? selectedTrack?.yAxisLabel || 'Time'
      : valueKind === 'mass'
        ? `${selectedTrack?.yAxisLabel || 'Result'} (${displayUnit})`
        : selectedTrack?.yAxisLabel || 'Result'

  const summary = useMemo(
    () => computePerformanceSummary(selectedRecords, higherIsBetter),
    [selectedRecords, higherIsBetter],
  )

  const saveTrack = tracks.find((item) => item.id === activeTrackId)
  const canSave =
    hasResult &&
    isAuthenticated &&
    Number.isFinite(Number(resultValue)) &&
    Boolean(saveTrack) &&
    !saveTrack.derived

  const shareTarget = useMemo(() => {
    if (!saveTrack || saveTrack.derived) return null
    return resolveLeaderboardShareTarget(
      calculatorType,
      saveTrack.exerciseName,
      saveTrack.higherIsBetter !== false,
    )
  }, [calculatorType, saveTrack])

  const shareEligible = Boolean(isAuthenticated && shareTarget)

  useEffect(() => {
    if (!pendingShareJump || typeof document === 'undefined') return undefined
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [pendingShareJump])

  const shareBoardKey = shareTarget?.boardKey ?? null

  useEffect(() => {
    if (!isAuthenticated || !user?.id || !shareBoardKey) return undefined

    let cancelled = false

    Promise.all([
      fetchActiveLeaderboardShare(user.id, shareBoardKey),
      fetchLeaderboardName(user.id),
    ])
      .then(([share, name]) => {
        if (cancelled) return
        const active = Boolean(share)
        const snapshot =
          active && Number.isFinite(Number(share?.result_value))
            ? {
                resultValue: Number(share.result_value),
                resultUnit: share.result_unit ?? null,
                higherIsBetter: share.higher_is_better !== false,
              }
            : null
        setHadActiveShare(active)
        setActiveShareSourceId(active ? share?.source_record_id ?? null : null)
        setActiveShareSnapshot(snapshot)
        confirmedShareBaselineRef.current = snapshot
        setShareMode(active ? 'global' : 'private')
        setHasLeaderboardName(Boolean(name))
      })
      .catch(() => {
        if (cancelled) return
        setHadActiveShare(false)
        setActiveShareSourceId(null)
        setActiveShareSnapshot(null)
        confirmedShareBaselineRef.current = null
        setShareMode('private')
        setHasLeaderboardName(true)
      })

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, user?.id, shareBoardKey])

  const handleSave = async () => {
    if (!user || !canSave || pendingShareJump) return
    const track = saveTrack
    if (!track || track.derived) return

    setSaving(true)
    setError('')
    setSavedMessage(false)
    setShareMessage('')

    const unitForSave =
      valueKind === 'duration' ? 'sec' : resultUnit || displayUnit || null
    const numericResult = Number(resultValue)
    const wantsShare = shareEligible && shareMode === 'global'
    const wantsUnshare =
      shareEligible && shareMode === 'private' && hadActiveShare

    try {
      // Refresh the public-share baseline from the DB before saving so the
      // trust check always uses the last confirmed share — never form input
      // and never a discarded private attempt still sitting in React state.
      let liveHadActiveShare = hadActiveShare
      let shareBaseline =
        confirmedShareBaselineRef.current || activeShareSnapshot
      if (wantsShare && shareTarget) {
        try {
          const liveShare = await fetchActiveLeaderboardShare(
            user.id,
            shareTarget.boardKey,
          )
          liveHadActiveShare = Boolean(liveShare)
          if (
            liveShare &&
            Number.isFinite(Number(liveShare.result_value))
          ) {
            shareBaseline = {
              resultValue: Number(liveShare.result_value),
              resultUnit: liveShare.result_unit ?? null,
              higherIsBetter: liveShare.higher_is_better !== false,
            }
            confirmedShareBaselineRef.current = shareBaseline
            setHadActiveShare(true)
            setActiveShareSourceId(liveShare.source_record_id ?? null)
            setActiveShareSnapshot(shareBaseline)
          } else {
            shareBaseline = null
            confirmedShareBaselineRef.current = null
            setHadActiveShare(false)
            setActiveShareSourceId(null)
            setActiveShareSnapshot(null)
          }
        } catch {
          // Fall back to the last confirmed in-memory baseline.
        }
      }

      const prevCanonical = resolveLeaderboardShareJumpBaseline({
        shareSnapshot: shareBaseline,
        // History is fallback only; exclude nothing yet (pre-save).
        trackRecords: [],
      })

      const saved = await savePerformanceRecord({
        userId: user.id,
        calculatorType,
        exerciseName: track.exerciseName,
        resultValue: numericResult,
        resultUnit: unitForSave,
      })

      const companionRecordIds = []
      for (const companion of companionSaves) {
        if (!Number.isFinite(Number(companion.resultValue))) continue
        // Skip companions that target a derived display-only track.
        if (
          tracks.some(
            (item) =>
              item.derived && item.exerciseName === companion.exerciseName,
          )
        ) {
          continue
        }
        const companionSaved = await savePerformanceRecord({
          userId: user.id,
          calculatorType,
          exerciseName: companion.exerciseName,
          resultValue: Number(companion.resultValue),
          resultUnit: companion.resultUnit || null,
        })
        if (companionSaved?.id) companionRecordIds.push(companionSaved.id)
      }

      setSelectedTrackId(track.id)

      // Trust popup only when updating an existing public share with a large jump.
      // First-time share and Keep Private never show it.
      // Baseline is last confirmed shared score, not this input.
      const nextCanonical = canonicalizeLeaderboardShareValue(
        numericResult,
        unitForSave,
      )
      const needsJumpConfirm =
        Boolean(wantsShare) &&
        Boolean(shareTarget) &&
        Boolean(hasLeaderboardName) &&
        Boolean(liveHadActiveShare) &&
        Boolean(prevCanonical) &&
        isLargeLeaderboardShareJump({
          previousValue: prevCanonical.resultValue,
          nextValue: nextCanonical.resultValue,
          higherIsBetter: shareTarget.higherIsBetter,
        })

      if (needsJumpConfirm) {
        setSavedMessage(false)
        setPendingShareJump({
          userId: user.id,
          sourceRecordId: saved.id,
          companionRecordIds,
          boardKey: shareTarget.boardKey,
          calculatorType: shareTarget.calculatorType,
          exerciseName: shareTarget.exerciseName,
          resultValue: numericResult,
          resultUnit: unitForSave,
          higherIsBetter: shareTarget.higherIsBetter,
          track,
        })
        await loadHistory()
        return
      }

      setSavedMessage(true)

      if (wantsShare && shareTarget) {
        if (!hasLeaderboardName) {
          setShareMessage(
            'A Leaderboard Name is required to share results globally. Add one in Account Settings. Your result was saved privately.',
          )
        } else {
          try {
            await upsertLeaderboardShare({
              userId: user.id,
              sourceRecordId: saved.id,
              boardKey: shareTarget.boardKey,
              calculatorType: shareTarget.calculatorType,
              exerciseName: shareTarget.exerciseName,
              resultValue: numericResult,
              resultUnit: unitForSave,
              higherIsBetter: shareTarget.higherIsBetter,
            })
            const confirmed = {
              resultValue: nextCanonical.resultValue,
              resultUnit: nextCanonical.resultUnit,
              higherIsBetter: shareTarget.higherIsBetter,
            }
            setHadActiveShare(true)
            setActiveShareSourceId(saved.id)
            setActiveShareSnapshot(confirmed)
            confirmedShareBaselineRef.current = confirmed
            setShareMode('global')
            setShareMessage('Shared to the global leaderboard.')
          } catch (shareErr) {
            setShareMessage(friendlyLeaderboardShareError(shareErr))
            if (
              /Leaderboard Name is required/i.test(String(shareErr?.message))
            ) {
              setHasLeaderboardName(false)
            }
          }
        }
      } else if (wantsUnshare && shareTarget) {
        try {
          await deactivateLeaderboardShare(user.id, shareTarget.boardKey)
          setHadActiveShare(false)
          setActiveShareSourceId(null)
          setActiveShareSnapshot(null)
          confirmedShareBaselineRef.current = null
          setShareMode('private')
          setShareMessage('Removed from the global leaderboard. Your private history is unchanged.')
        } catch (shareErr) {
          setShareMessage(
            friendlyLeaderboardShareError(
              shareErr,
              'Could not update sharing. Your result was saved privately.',
            ),
          )
        }
      }

      onSaved?.({ track, resultValue: numericResult, recordId: saved.id })
      await loadHistory()
    } catch (err) {
      setError(err.message || 'Could not save this result.')
    } finally {
      setSaving(false)
    }
  }

  const requestDelete = (recordId) => {
    setError('')
    setPendingDeleteId(recordId)
  }

  const handleCancelShareJump = async () => {
    if (shareJumpBusy || !pendingShareJump) return
    const {
      sourceRecordId,
      companionRecordIds = [],
      boardKey,
      userId,
    } = pendingShareJump
    setShareJumpBusy('discard')
    setShareMessage('')
    setError('')
    try {
      // Discard the save that triggered the trust check; keep prior public share.
      // Do not treat the discarded input as the next jump baseline.
      for (const companionId of companionRecordIds) {
        await deletePerformanceRecord(companionId)
        removeRecordLocally(companionId)
      }
      await deletePerformanceRecord(sourceRecordId)
      removeRecordLocally(sourceRecordId)
      setPendingShareJump(null)
      setSavedMessage(false)
      setShareMessage(
        'Kept your previous shared score. The new result was discarded.',
      )
      // Re-pin baseline from the still-active public share (last kept), never
      // from the discarded form value.
      if (userId && boardKey) {
        try {
          const share = await fetchActiveLeaderboardShare(userId, boardKey)
          const snapshot =
            share && Number.isFinite(Number(share.result_value))
              ? {
                  resultValue: Number(share.result_value),
                  resultUnit: share.result_unit ?? null,
                  higherIsBetter: share.higher_is_better !== false,
                }
              : confirmedShareBaselineRef.current
          setHadActiveShare(Boolean(share))
          setActiveShareSourceId(share?.source_record_id ?? null)
          setActiveShareSnapshot(snapshot)
          confirmedShareBaselineRef.current = snapshot
        } catch {
          // Keep the pre-discard confirmed baseline if refresh fails.
        }
      }
      onDeleted?.({ recordId: sourceRecordId })
      await loadHistory()
    } catch (err) {
      setError(err.message || 'Could not discard that result. Try again.')
    } finally {
      setShareJumpBusy(null)
    }
  }
  handleCancelShareJumpRef.current = handleCancelShareJump

  const handleConfirmShareJump = async () => {
    if (shareJumpBusy || !pendingShareJump) return
    setShareJumpBusy('update')
    setShareMessage('')
    try {
      const {
        track,
        companionRecordIds: _companionRecordIds,
        ...sharePayload
      } = pendingShareJump
      await upsertLeaderboardShare(sharePayload)
      const nextCanonical = canonicalizeLeaderboardShareValue(
        sharePayload.resultValue,
        sharePayload.resultUnit,
      )
      const confirmed = {
        resultValue: nextCanonical.resultValue,
        resultUnit: nextCanonical.resultUnit,
        higherIsBetter: sharePayload.higherIsBetter,
      }
      setHadActiveShare(true)
      setActiveShareSourceId(sharePayload.sourceRecordId)
      setActiveShareSnapshot(confirmed)
      confirmedShareBaselineRef.current = confirmed
      setShareMode('global')
      setPendingShareJump(null)
      setSavedMessage(true)
      setShareMessage('Shared to the global leaderboard.')
      onSaved?.({
        track,
        resultValue: sharePayload.resultValue,
        recordId: sharePayload.sourceRecordId,
      })
    } catch (shareErr) {
      setShareMessage(friendlyLeaderboardShareError(shareErr))
      if (/Leaderboard Name is required/i.test(String(shareErr?.message))) {
        setHasLeaderboardName(false)
      }
    } finally {
      setShareJumpBusy(null)
    }
  }

  const removeRecordLocally = (recordId) => {
    setRecordsByTrack((prev) => {
      const next = {}
      for (const [trackId, rows] of Object.entries(prev || {})) {
        next[trackId] = (rows || []).filter(
          (row) =>
            row.id !== recordId &&
            row.source_record_id !== recordId &&
            !String(row.id || '').endsWith(`:${recordId}`),
        )
      }
      return next
    })
  }

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return
    const recordId = pendingDeleteId
    const wasSharedSource = recordId === activeShareSourceId
    const previousTracks = recordsByTrack
    setDeletingId(recordId)
    setError('')
    // Optimistic remove so the row leaves immediately; reload reconciles.
    removeRecordLocally(recordId)
    setPendingDeleteId(null)
    try {
      await deletePerformanceRecord(recordId)
      if (wasSharedSource && shareTarget?.boardKey && user?.id) {
        // Removing the shared source must clear the public board too, so a
        // deleted score cannot linger as the jump benchmark.
        try {
          await deactivateLeaderboardShare(user.id, shareTarget.boardKey)
        } catch {
          // Private delete still succeeded; share cleanup is best-effort.
        }
        setHadActiveShare(false)
        setActiveShareSourceId(null)
        setActiveShareSnapshot(null)
        confirmedShareBaselineRef.current = null
        setShareMode('private')
      }
      // Reconcile (derived Estimated 5K, server truth). Stale fetches are ignored.
      await loadHistory()
      onDeleted?.({ recordId })
    } catch (err) {
      setRecordsByTrack(previousTracks)
      setError(err.message || 'Could not delete that result.')
    } finally {
      setDeletingId(null)
    }
  }

  const pendingDeleteIsShared =
    Boolean(pendingDeleteId) && pendingDeleteId === activeShareSourceId

  const selectByOffset = (offset) => {
    if (tracks.length < 2) return
    const index = tracks.findIndex((track) => track.id === selectedTrackId)
    const next = (index + offset + tracks.length) % tracks.length
    setSelectedTrackId(tracks[next].id)
  }

  if (!selectedTrack) return null

  // Wait for auth so logged-in users never flash the guest preview.
  if (authLoading) {
    return (
      <div className="tracking-panel">
        <h2 className="result-section-title">Your Progress</h2>
        <p className="calc-hint">Loading…</p>
      </div>
    )
  }

  // Guests: always show the faded sample graph + login CTA on every calculator.
  if (!isAuthenticated) {
    const preview = {
      title: lockedPreview?.title ?? DEFAULT_LOCKED_PREVIEW.title,
      lead: lockedPreview?.lead ?? DEFAULT_LOCKED_PREVIEW.lead,
      benefits: lockedPreview?.benefits ?? DEFAULT_LOCKED_PREVIEW.benefits,
    }

    return (
      <div className="tracking-panel">
        <h2 className="result-section-title">Your Progress</h2>
        <LockedGraphPreview
          onRequestAuth={onRequestAuth}
          yAxisLabel={axisLabel}
          valueKind={valueKind}
          sampleKind={sampleKind}
          title={preview.title}
          lead={preview.lead}
          benefits={preview.benefits}
        />
      </div>
    )
  }

  // Signed-in: always show history/graph for this calculator (even before a new calc).
  if (!tracks.length) return null

  const saveBlock = canSave ? (
    <div className="save-result-block">
      {shareEligible ? (
        <LeaderboardShareControl
          mode={shareMode}
          onChange={(next) => {
            setShareMode(next)
            setShareMessage('')
          }}
          disabled={saving || Boolean(pendingShareJump)}
          hasLeaderboardName={hasLeaderboardName}
          onRequestAccount={
            onOpenTab ? () => onOpenTab('account') : undefined
          }
        />
      ) : null}
      <SaveResultButton
        onSave={handleSave}
        saving={saving || Boolean(pendingShareJump)}
        savedMessage={savedMessage}
        label={saveLabel}
      />
      {shareMessage ? (
        <p
          className={`feedback${
            /^(Shared to|Removed from|Saved privately|Kept your previous)/i.test(
              shareMessage,
            )
              ? ' feedback-success'
              : ' feedback-error'
          }`}
          role="status"
        >
          {shareMessage}
          {/Account Settings/i.test(shareMessage) && onOpenTab ? (
            <>
              {' '}
              <button
                type="button"
                className="text-link-button"
                onClick={() => onOpenTab('account')}
              >
                Open Account Settings
              </button>
            </>
          ) : null}
        </p>
      ) : null}
    </div>
  ) : null

  const externalSave =
    saveHost && saveBlock ? createPortal(saveBlock, saveHost) : null

  return (
    <div className="tracking-panel">
      {externalSave}
      {!saveHost ? saveBlock : null}

      {error ? <p className="feedback feedback-error">{error}</p> : null}

      <section
        className="progress-section"
        aria-labelledby={`${calculatorType}-progress-heading`}
        onTouchStart={(event) => {
          touchStartX.current = event.changedTouches[0]?.clientX ?? null
        }}
        onTouchEnd={(event) => {
          if (touchStartX.current == null) return
          const endX = event.changedTouches[0]?.clientX
          if (endX == null) return
          const delta = endX - touchStartX.current
          if (Math.abs(delta) < 48) return
          selectByOffset(delta < 0 ? 1 : -1)
          touchStartX.current = null
        }}
      >
        <div className="progress-controls">
          <h2
            id={`${calculatorType}-progress-heading`}
            className="result-section-title"
          >
            Your Progress
          </h2>

          {valueKind === 'mass' ? (
            <UnitToggle
              label="Graph units"
              value={displayUnit || 'lb'}
              options={MASS_UNITS}
              onChange={setDisplayUnit}
            />
          ) : null}

        </div>

        <GraphTrackSelector
          tracks={tracks}
          activeId={selectedTrack.id}
          onChange={setSelectedTrackId}
        />

        {loadingHistory ? (
          <p className="calc-hint">Loading your progress…</p>
        ) : (
          <FadeSwap
            swapKey={`${selectedTrack.id}-${graphRange}`}
            className="progress-track-panel"
          >
            <PerformanceSummary
              summary={summary}
              valueKind={valueKind}
              unit={
                valueKind === 'mass'
                  ? displayUnit
                  : selectedRecords[0]?.result_unit ||
                    unitAdjustedRecords[0]?.result_unit ||
                    resultUnit
              }
              variant={
                selectedTrack?.id === activeTrackId
                  ? summaryVariant
                  : 'default'
              }
            />
            <ProgressGraph
              records={selectedRecords}
              yAxisLabel={axisLabel}
              valueKind={valueKind}
              emptyMessage={
                unitAdjustedRecords.length
                  ? 'No saved results in this time range.\nTry a wider range or save a new result.'
                  : undefined
              }
            />
            <GraphRangeToggle value={graphRange} onChange={setGraphRange} />
            <HistoryList
              records={selectedRecords}
              onDelete={selectedTrack?.derived ? undefined : requestDelete}
              deletingId={deletingId}
              valueKind={valueKind}
            />
          </FadeSwap>
        )}
        {/* Outside FadeSwap so track/range swaps don’t remount the dialog. */}
        {pendingDeleteId ? (
          <div
            ref={deleteDialogRef}
            className="confirm-box confirm-box-danger"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-result-title"
          >
            <p id="delete-result-title">
              <strong>Delete this result?</strong>
            </p>
            <p>
              {pendingDeleteIsShared
                ? 'This will permanently remove this saved result. Because this result is shared publicly, it will also be removed from the public leaderboard.'
                : 'This will permanently remove this saved result from your private history.'}
            </p>
            <div className="confirm-actions">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setPendingDeleteId(null)}
                disabled={Boolean(deletingId)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmDelete}
                disabled={Boolean(deletingId)}
              >
                {deletingId === pendingDeleteId
                  ? 'Deleting…'
                  : 'Delete Result'}
              </button>
            </div>
          </div>
        ) : null}
      </section>
      {pendingShareJump && typeof document !== 'undefined'
        ? createPortal(
            <div
              ref={shareJumpDialogRef}
              className="confirm-modal-layer"
            >
              <div
                className="confirm-modal-backdrop"
                aria-hidden="true"
                onClick={() => {
                  if (!shareJumpBusy) void handleCancelShareJump()
                }}
              />
              <div
                className="confirm-modal confirm-modal-trust"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="share-jump-title"
                aria-describedby="share-jump-copy"
              >
                <p className="confirm-modal-eyebrow">Trust check</p>
                <p id="share-jump-title" className="confirm-modal-title">
                  Large jump from last shared score
                </p>
                <p id="share-jump-copy">
                  Leaderboard scores are self-reported. This result is a large
                  improvement versus your last shared score on this board. Update
                  the public board only if this result is accurate — or keep your
                  previous share and discard this new save.
                </p>
                <div className="confirm-actions">
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={handleCancelShareJump}
                    disabled={Boolean(shareJumpBusy)}
                  >
                    {shareJumpBusy === 'discard'
                      ? 'Discarding…'
                      : 'Keep previous share'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleConfirmShareJump}
                    disabled={Boolean(shareJumpBusy)}
                  >
                    {shareJumpBusy === 'update'
                      ? 'Updating…'
                      : 'Update leaderboard'}
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  )
}

export default CalculatorTracking
