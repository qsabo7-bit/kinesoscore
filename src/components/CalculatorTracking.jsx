import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import {
  deletePerformanceRecord,
  fetchPerformanceRecords,
  formatRecordDate,
  formatRecordValue,
  savePerformanceRecord,
} from '../lib/performanceRecords'
import ProgressChart from './ProgressChart'

/**
 * Save CTA + (for signed-in users only) progress graph and deletable history.
 * Logged-out users never see graphs, empty placeholders, or delete controls.
 */
function CalculatorTracking({
  calculatorType,
  resultValue,
  resultUnit,
  yAxisLabel = 'Result',
  onRequestAuth,
  enabled = true,
}) {
  const { isAuthenticated, user, loading: authLoading } = useAuth()
  const [records, setRecords] = useState([])
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState(null)
  const [savedMessage, setSavedMessage] = useState(false)
  const [error, setError] = useState('')

  const canSave =
    enabled && Number.isFinite(Number(resultValue)) && !authLoading

  const loadHistory = useCallback(async () => {
    if (!isAuthenticated || !user) {
      setRecords([])
      return
    }

    setLoadingHistory(true)
    setError('')
    try {
      const data = await fetchPerformanceRecords(user.id, calculatorType)
      setRecords(data)
    } catch (err) {
      setError(err.message || 'Could not load your progress.')
    } finally {
      setLoadingHistory(false)
    }
  }, [isAuthenticated, user, calculatorType])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  const handleSave = async () => {
    if (!user) return
    setSaving(true)
    setError('')
    setSavedMessage(false)

    try {
      await savePerformanceRecord({
        userId: user.id,
        calculatorType,
        resultValue: Number(resultValue),
        resultUnit: resultUnit || null,
      })
      setSavedMessage(true)
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
      setRecords((current) => current.filter((item) => item.id !== recordId))
    } catch (err) {
      setError(err.message || 'Could not delete that result.')
    } finally {
      setDeletingId(null)
    }
  }

  if (!canSave) return null

  // Logged-out: calculator still works; only show the login incentive.
  if (!isAuthenticated) {
    return (
      <div className="tracking-panel tracking-panel-guest">
        <p className="tracking-cta">
          Want to save your progress?{' '}
          <button
            type="button"
            className="text-link"
            onClick={() => onRequestAuth?.()}
          >
            Log in!
          </button>
        </p>
      </div>
    )
  }

  // Logged-in: save + progress graph + history (never shown to guests).
  return (
    <div className="tracking-panel">
      <div className="save-result-row">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving…' : 'Save Result'}
        </button>
        {savedMessage ? (
          <p className="feedback feedback-success">
            Result saved to your progress.
          </p>
        ) : null}
      </div>

      {error ? <p className="feedback feedback-error">{error}</p> : null}

      <section className="progress-section" aria-labelledby="progress-heading">
        <h2 id="progress-heading" className="result-section-title">
          Your Progress
        </h2>

        {loadingHistory ? (
          <p className="calc-hint">Loading your progress…</p>
        ) : (
          <>
            <ProgressChart records={records} yAxisLabel={yAxisLabel} />

            {records.length > 0 ? (
              <ul className="progress-history-list">
                {[...records].reverse().map((record) => (
                  <li key={record.id} className="progress-history-item">
                    <div>
                      <p className="progress-history-value">
                        {formatRecordValue(
                          record.result_value,
                          record.result_unit,
                        )}
                      </p>
                      <p className="progress-history-meta">
                        {formatRecordDate(record.created_at)}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger-ghost"
                      onClick={() => handleDelete(record.id)}
                      disabled={deletingId === record.id}
                    >
                      {deletingId === record.id ? 'Deleting…' : 'Delete'}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </>
        )}
      </section>
    </div>
  )
}

export default CalculatorTracking
