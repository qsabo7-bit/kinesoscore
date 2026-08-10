import { BRAND_CASING_CLASS, includesScoreBrand } from '../../data/brand'

function SaveResultButton({
  onSave,
  saving,
  savedMessage,
  celebrationMessage = '',
  disabled,
  label = 'Save Result',
}) {
  const brandCasing = includesScoreBrand(label)

  return (
    <div className="save-result-row">
      <button
        type="button"
        className={`btn btn-primary${brandCasing ? ` ${BRAND_CASING_CLASS}` : ''}`}
        onClick={onSave}
        disabled={disabled || saving}
      >
        {saving ? 'Saving…' : label}
      </button>
      {savedMessage || celebrationMessage ? (
        <p className="feedback feedback-success" role="status">
          {celebrationMessage
            ? celebrationMessage
            : 'Result saved to your progress.'}
          {celebrationMessage && savedMessage ? (
            <span className="save-result-saved-aside">
              {' '}
              · Saved to your progress
            </span>
          ) : null}
        </p>
      ) : null}
    </div>
  )
}

export default SaveResultButton
