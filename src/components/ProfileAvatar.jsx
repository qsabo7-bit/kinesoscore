import {
  getAvatarCatalogEntry,
  normalizeAvatarId,
} from '../data/avatarCatalog'

const BADGE_FILL = '#0d1210'

/**
 * Decorative preset avatar. Pair with visible name text; keep aria-hidden.
 *
 * @param {{ avatarId?: string, size?: 'sm' | 'md', className?: string }} props
 */
export default function ProfileAvatar({
  avatarId,
  size = 'sm',
  className = '',
}) {
  const sizeClass = size === 'md' ? 'is-md' : 'is-sm'

  // Pending / unknown — empty shell, not the Sun fallback (avoids load flash).
  if (avatarId == null || avatarId === '') {
    return (
      <span
        className={`profile-avatar ${sizeClass} is-pending${
          className ? ` ${className}` : ''
        }`}
        aria-hidden="true"
        data-avatar="pending"
      />
    )
  }

  const id = normalizeAvatarId(avatarId)
  const entry = getAvatarCatalogEntry(id)
  const color = entry?.color || null

  return (
    <span
      className={`profile-avatar ${sizeClass} is-mark${
        className ? ` ${className}` : ''
      }`}
      style={color ? { '--avatar-color': color } : undefined}
      aria-hidden="true"
      data-avatar={id}
    >
      <svg
        className="profile-avatar-svg"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="geometricPrecision"
      >
        <circle cx="20" cy="20" r="19.25" fill={BADGE_FILL} />
        <circle
          cx="20"
          cy="20"
          r="17.35"
          stroke="currentColor"
          strokeWidth="1.35"
        />
        <AvatarMark id={id} />
      </svg>
    </span>
  )
}

/** Simple stroke/fill glyphs — timeless, premium, easy to read at small sizes. */
function AvatarMark({ id }) {
  if (id === 'mark-sun') {
    return (
      <g
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      >
        <circle cx="20" cy="20" r="4.6" />
        <path d="M20 11.2v-2.4M20 31.2v-2.4M11.2 20h-2.4M31.2 20h-2.4" />
        <path d="M13.8 13.8l-1.7-1.7M27.9 27.9l-1.7-1.7M26.2 13.8l1.7-1.7M12.1 27.9l1.7-1.7" />
      </g>
    )
  }

  if (id === 'mark-peak') {
    return (
      <path
        d="M9.5 26.5h21M12.2 26.5l5.2-10.4 2.7 4.6 2.4-3.8 5.8 9.6"
        stroke="currentColor"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    )
  }

  if (id === 'mark-bolt') {
    return (
      <path
        d="M22.6 10.5 14.8 21.8h5.4l-1.5 8.2 8.4-12.1h-5.3z"
        fill="currentColor"
      />
    )
  }

  if (id === 'mark-pulse') {
    return (
      <path
        d="M9.5 20h4.2l1.6-4.2 2.8 9.4 2.4-5.2H30.5"
        stroke="currentColor"
        strokeWidth="2.15"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    )
  }

  if (id === 'mark-shield') {
    return (
      <path
        d="M20 11.2 12.8 14.2v5.1c0 5.1 3.1 8.5 7.2 10.1 4.1-1.6 7.2-5 7.2-10.1v-5.1Z"
        stroke="currentColor"
        strokeWidth="2.05"
        strokeLinejoin="round"
        fill="currentColor"
        fillOpacity="0.18"
      />
    )
  }

  return null
}
