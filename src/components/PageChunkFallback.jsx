/** Lightweight Suspense fallback while a lazy page chunk loads. */
function PageChunkFallback() {
  return (
    <main className="page page-chunk-fallback" aria-busy="true">
      <p className="calc-hint">Loading…</p>
    </main>
  )
}

export default PageChunkFallback
