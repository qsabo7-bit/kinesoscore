import {
  formatRecordDate,
  formatRecordValue,
} from '../../lib/performanceRecords'

function HistoryList({
  records,
  onDelete,
  deletingId,
  valueKind = 'number',
  timeFormat = 'clock',
}) {
  if (!records?.length) return null

  return (
    <ul className="progress-history-list">
      {[...records].reverse().map((record) => (
        <li key={record.id} className="progress-history-item">
          <div>
            <p className="progress-history-value">
              {formatRecordValue(
                record.result_value,
                valueKind,
                valueKind === 'duration' ? null : record.result_unit,
                timeFormat,
              )}
            </p>
            <p className="progress-history-meta">
              {formatRecordDate(record.created_at)}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-danger-ghost"
            onClick={() => onDelete(record.id)}
            disabled={deletingId === record.id}
          >
            {deletingId === record.id ? 'Deleting…' : 'Delete'}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default HistoryList
