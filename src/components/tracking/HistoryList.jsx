import {
  formatRecordDate,
  formatRecordValue,
  isCindyResult,
} from '../../lib/performanceRecords'

function HistoryList({
  records,
  onDelete,
  deletingId,
  valueKind = 'number',
  timeFormat = 'clock',
  displayKind = null,
}) {
  if (!records?.length) return null

  return (
    <ul className="progress-history-list">
      {[...records].reverse().map((record) => {
        const kind =
          displayKind === 'cindy' || isCindyResult(record)
            ? 'cindy'
            : valueKind
        const valueLabel = formatRecordValue(
          record.result_value,
          kind,
          kind === 'duration' || kind === 'cindy' ? null : record.result_unit,
          timeFormat,
        )
        return (
          <li key={record.id} className="progress-history-item">
            <div className="progress-history-item-main">
              <div>
                <p className="progress-history-value">{valueLabel}</p>
                <p className="progress-history-meta">
                  {formatRecordDate(record.created_at)}
                </p>
              </div>
              {onDelete ? (
                <button
                  type="button"
                  className="btn btn-danger-ghost"
                  onClick={() => onDelete(record.id)}
                  disabled={Boolean(deletingId)}
                  aria-label={`Delete result ${valueLabel} from ${formatRecordDate(record.created_at)}`}
                >
                  {deletingId === record.id ? 'Deleting…' : 'Delete'}
                </button>
              ) : null}
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default HistoryList
