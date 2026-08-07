import { BRAND_CASING_CLASS, includesScoreBrand } from '../../data/brand'

function SaveResultButton({
  onSave,
  saving,
  savedMessage,
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
      {savedMessage ? (
        <p className="feedback feedback-success">
          Result saved to your progress.
        </p>
      ) : null}
    </div>
  )
}

export default SaveResultButton
