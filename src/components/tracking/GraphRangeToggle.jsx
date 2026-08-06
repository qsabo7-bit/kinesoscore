export const GRAPH_RANGE_OPTIONS = [
  { value: '1w', label: '1 week' },
  { value: '1m', label: '1 month' },
  { value: '3m', label: '3 months' },
  { value: '6m', label: '6 months' },
  { value: '1y', label: '1 year' },
  { value: 'all', label: 'All time' },
]

function GraphRangeToggle({ value, onChange }) {
  return (
    <div className="graph-range-toggle" role="group" aria-label="Graph time range">
      <span className="graph-range-label">Range</span>
      <div className="graph-range-options">
        {GRAPH_RANGE_OPTIONS.map((option) => {
          const isActive = value === option.value
          return (
            <button
              key={option.value}
              type="button"
              className={`graph-range-btn${isActive ? ' is-active' : ''}`}
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

export default GraphRangeToggle
