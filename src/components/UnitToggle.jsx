function UnitToggle({ label, value, options, onChange }) {
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  )

  return (
    <div className="unit-toggle" role="group" aria-label={label}>
      <span className="unit-toggle-label">{label}</span>
      <div
        className="unit-toggle-options"
        style={{
          '--toggle-count': options.length,
          '--toggle-index': activeIndex,
        }}
      >
        <span className="unit-toggle-thumb" aria-hidden="true" />
        {options.map((option) => {
          const isActive = value === option.value

          return (
            <button
              key={option.value}
              type="button"
              className={`unit-toggle-btn${isActive ? ' is-active' : ''}`}
              onClick={() => onChange(option.value)}
              aria-pressed={isActive}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default UnitToggle
