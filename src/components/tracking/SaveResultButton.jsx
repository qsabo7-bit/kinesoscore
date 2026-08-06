function SaveResultButton({
  onSave,
  saving,
  savedMessage,
  disabled,
  label = 'Save Result',
}) {
  return (
    <div className="save-result-row">
      <button
        type="button"
        className="btn btn-primary"
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
