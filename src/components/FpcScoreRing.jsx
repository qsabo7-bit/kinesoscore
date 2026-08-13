import { useId } from 'react'
import { BRAND } from '../data/brand'

/**
 * Circular KinesoScore meter (0–100). Darker green as the ring fills.
 */
function FpcScoreRing({
  score,
  secondary,
  trend,
  onClick,
  size = 188,
  stroke = 14,
}) {
  const reactId = useId().replace(/:/g, '')
  const clamped = Math.min(100, Math.max(0, Number(score) || 0))
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - clamped / 100)
  const gradientId = `fpc-score-ring-grad-${reactId}`
  const t = clamped / 100

  // Track: muted. Progress: light mint → deep athletic green as score rises.
  const light = { r: 125, g: 255, b: 179 }
  const mid = { r: 46, g: 196, b: 122 }
  const dark = { r: 14, g: 110, b: 62 }

  const mix = (a, b, amount) => ({
    r: Math.round(a.r + (b.r - a.r) * amount),
    g: Math.round(a.g + (b.g - a.g) * amount),
    b: Math.round(a.b + (b.b - a.b) * amount),
  })

  const start = mix(light, mid, t)
  const end = mix(mid, dark, t)
  const toRgb = (c) => `rgb(${c.r}, ${c.g}, ${c.b})`
  const interactive = typeof onClick === 'function'
  const Tag = interactive ? 'button' : 'div'

  return (
    <Tag
      type={interactive ? 'button' : undefined}
      className={`fpc-score-ring${interactive ? '' : ' is-static'}`}
      onClick={interactive ? onClick : undefined}
      aria-label={
        interactive
          ? `${BRAND.scoreName} ${clamped}. Open ${BRAND.scoreName} calculator.`
          : `${BRAND.scoreName} ${clamped}`
      }
      style={{ '--fpc-ring-size': `${size}px` }}
    >
      <div className="fpc-score-ring-meter" aria-hidden="true">
        <svg
          className="fpc-score-ring-svg"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <defs>
            <linearGradient
              id={gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={toRgb(start)} />
              <stop offset="100%" stopColor={toRgb(end)} />
            </linearGradient>
          </defs>
          <circle
            className="fpc-score-ring-track"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
          />
          <circle
            className="fpc-score-ring-progress"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </svg>
        <div className="fpc-score-ring-center">
          <span className="fpc-score-ring-value">{Math.round(clamped)}</span>
          <span className="fpc-score-ring-label">{BRAND.scoreName}</span>
        </div>
      </div>

      <div className="fpc-score-ring-meta">
        <p className="fpc-score-ring-secondary">{secondary}</p>
        {trend ? (
          <p
            className={`fpc-score-ring-trend${
              trend.tone === 'good'
                ? ' is-trend-good'
                : trend.tone === 'bad'
                  ? ' is-trend-bad'
                  : ''
            }`}
          >
            {trend.value}
          </p>
        ) : null}
      </div>
    </Tag>
  )
}

export default FpcScoreRing
