function UnitToggle({
  label,
  value,
  options,
  onChange,
  className = '',
  disabled = false,
}) {
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  )

  return (
    <div
      className={`unit-toggle${className ? ` ${className}` : ''}`}
      role="group"
      aria-label={label || 'Options'}
    >
      {label ? <span className="unit-toggle-label">{label}</span> : null}
      <div
        className="unit-toggle-options"
        style={{
          '--toggle-count': options.length,
          '--toggle-index': activeIndex,
        }}
      >
        <span className="unit-toggle-thumb" aria-hidden="true" />
        {options.map((option) => {
          const isActive = option.value === value

          return (
            <button
              key={option.value}
              type="button"
              className={`unit-toggle-btn${isActive ? ' is-active' : ''}`}
              onClick={() => onChange(option.value)}
              aria-pressed={isActive}
              disabled={disabled}
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
