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
        return (
          <button
            key={track.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`graph-track-btn${isActive ? ' is-active' : ''}`}
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
