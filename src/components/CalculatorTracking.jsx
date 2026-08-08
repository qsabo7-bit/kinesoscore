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
 * @param {(payload: { track: object, resultValue: number }) => void} [props.onSaved]
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
  const [hasLeaderboardName, setHasLeaderboardName] = useState(true)
  const touchStartX = useRef(null)

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

  const loadHistory = useCallback(async () => {
    if (!isAuthenticated || !user || !tracks.length) {
      setRecordsByTrack({})
      return
    }

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
      setRecordsByTrack(Object.fromEntries(entries))
    } catch (err) {
      setError(err.message || 'Could not load your progress.')
    } finally {
      setLoadingHistory(false)
    }
  }, [isAuthenticated, user, calculatorType, tracks])

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
    if (!isAuthenticated || !user?.id || !shareTarget) return undefined

    let cancelled = false
    const boardKey = shareTarget.boardKey

    Promise.all([
      fetchActiveLeaderboardShare(user.id, boardKey),
      fetchLeaderboardName(user.id),
    ])
      .then(([share, name]) => {
        if (cancelled) return
        const active = Boolean(share)
        setHadActiveShare(active)
        setShareMode(active ? 'global' : 'private')
        setHasLeaderboardName(Boolean(name))
      })
      .catch(() => {
        if (cancelled) return
        setHadActiveShare(false)
        setShareMode('private')
        setHasLeaderboardName(true)
      })

    return () => {
      cancelled = true
    }
  }, [isAuthenticated, user?.id, shareTarget])

  const handleSave = async () => {
    if (!user || !canSave) return
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
      const saved = await savePerformanceRecord({
        userId: user.id,
        calculatorType,
        exerciseName: track.exerciseName,
        resultValue: numericResult,
        resultUnit: unitForSave,
      })

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
        await savePerformanceRecord({
          userId: user.id,
          calculatorType,
          exerciseName: companion.exerciseName,
          resultValue: Number(companion.resultValue),
          resultUnit: companion.resultUnit || null,
        })
      }

      setSavedMessage(true)
      setSelectedTrackId(track.id)

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
            setHadActiveShare(true)
            setShareMode('global')
            setShareMessage('Shared to the global leaderboard.')
          } catch (shareErr) {
            setShareMessage(friendlyLeaderboardShareError(shareErr))
            if (/Leaderboard Name is required/i.test(String(shareErr?.message))) {
              setHasLeaderboardName(false)
            }
          }
        }
      } else if (wantsUnshare && shareTarget) {
        try {
          await deactivateLeaderboardShare(user.id, shareTarget.boardKey)
          setHadActiveShare(false)
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

      onSaved?.({ track, resultValue: numericResult })
      await loadHistory()
    } catch (err) {
      setError(err.message || 'Could not save this result.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (recordId) => {
    setDeletingId(recordId)
    setError('')
    try {
      await deletePerformanceRecord(recordId)
      // Full reload so derived Estimated 5K is recomputed without orphan points.
      await loadHistory()
      onDeleted?.({ recordId })
    } catch (err) {
      setError(err.message || 'Could not delete that result.')
    } finally {
      setDeletingId(null)
    }
  }

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
          disabled={saving}
          hasLeaderboardName={hasLeaderboardName}
          onRequestAccount={
            onOpenTab ? () => onOpenTab('account') : undefined
          }
        />
      ) : null}
      <SaveResultButton
        onSave={handleSave}
        saving={saving}
        savedMessage={savedMessage}
        label={saveLabel}
      />
      {shareMessage ? (
        <p
          className={`feedback${
            /^(Shared to|Removed from)/i.test(shareMessage)
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
              onDelete={selectedTrack?.derived ? undefined : handleDelete}
              deletingId={deletingId}
              valueKind={valueKind}
            />
          </FadeSwap>
        )}
      </section>
    </div>
  )
}

export default CalculatorTracking
