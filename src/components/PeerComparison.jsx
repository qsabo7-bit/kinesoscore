function PeerComparison({ title, headline, details, source }) {
  if (!headline) return null

  return (
    <section className="peer-comparison">
      <h2 className="result-section-title">{title}</h2>
      <p className="peer-headline">{headline}</p>

      {details?.length ? (
        <ul className="result-table">
          {details.map((item) => (
            <li key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </li>
          ))}
        </ul>
      ) : null}

      {source ? (
        <p className="peer-source">
          Source: {source.name}. {source.detail}{' '}
          {source.url ? (
            <a href={source.url} target="_blank" rel="noreferrer">
              Learn more
            </a>
          ) : null}
        </p>
      ) : null}
    </section>
  )
}

export default PeerComparison
