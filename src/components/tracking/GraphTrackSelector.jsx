import { BRAND_CASING_CLASS, includesScoreBrand } from '../../data/brand'

function GraphTrackSelector({ tracks, activeId, onChange }) {
  if (!tracks?.length || tracks.length < 2) return null

  return (
    <div
      className="graph-track-selector"
      role="tablist"
      aria-label="Progress graph"
    >
      {tracks.map((track) => {
        const isActive = track.id === activeId
        const brandCasing = includesScoreBrand(track.label)
        return (
          <button
            key={track.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            title={track.tooltip || undefined}
            className={`graph-track-btn${isActive ? ' is-active' : ''}${brandCasing ? ` ${BRAND_CASING_CLASS}` : ''}`}
            onClick={() => onChange(track.id)}
          >
            {track.label}
          </button>
        )
      })}
    </div>
  )
}

export default GraphTrackSelector
