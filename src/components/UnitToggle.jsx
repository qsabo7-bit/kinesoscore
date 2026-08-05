function UnitToggle({ label, value, options, onChange }) {
  return (
    <div className="unit-toggle" role="group" aria-label={label}>
      <span className="unit-toggle-label">{label}</span>
      <div className="unit-toggle-options">
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
