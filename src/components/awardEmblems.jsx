/** Shared award emblems for dashboard badges and compact public identity. */

export function StrengthEmblem() {
  return (
    <svg viewBox="0 0 80 64" aria-hidden="true" className="fpc-award-emblem">
      <g fill="currentColor">
        <rect x="3" y="18" width="8" height="28" rx="2.3" />
        <rect x="12" y="21.5" width="7" height="21" rx="1.8" />
        <rect x="19" y="28" width="42" height="8" rx="2.5" />
        <rect x="61" y="21.5" width="7" height="21" rx="1.8" />
        <rect x="69" y="18" width="8" height="28" rx="2.3" />
        <rect x="21" y="24.5" width="4" height="15" rx="1.2" />
        <rect x="55" y="24.5" width="4" height="15" rx="1.2" />
      </g>
      <path
        d="M25 31h30M7 21v22M73 21v22"
        fill="none"
        stroke="var(--award-icon-highlight)"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.72"
      />
      <g stroke="var(--award-icon-shadow)" strokeWidth="1" opacity="0.5">
        <path d="M32 29v6M36 29v6M40 29v6M44 29v6M48 29v6" />
      </g>
    </svg>
  )
}

export function RunningEmblem() {
  return (
    <svg viewBox="0 0 80 64" aria-hidden="true" className="fpc-award-emblem">
      <path
        fill="currentColor"
        d="M9 39.5 13.8 19l10.3-2.8 7.2 10.6 13.4 5.7 19.5 5.8c5.8 1.8 9 5.2 9 10.1v1.1H15.4c-5.9 0-9.2-4.8-6.4-10z"
      />
      <path
        fill="var(--award-icon-shadow)"
        d="m14.4 20.4 6.8-1.8 5.4 8-9.3 3.6-4.6 8.9-2.5-1.1 4.2-17.6z"
        opacity="0.72"
      />
      <path
        fill="var(--award-icon-highlight)"
        d="M10.5 50.5h63.8v3.2c0 2.3-1.9 4.1-4.2 4.1H17c-4.2 0-7.4-2.2-8.7-6l2.2-1.3z"
      />
      <path
        fill="none"
        stroke="var(--award-icon-highlight)"
        strokeWidth="2.3"
        strokeLinecap="round"
        d="m27 28.5 7.5-2.3m-4 6.7 8.1-2.5m-3.8 6.7 8.2-2.5"
      />
      <path
        fill="none"
        stroke="var(--award-icon-shadow)"
        strokeWidth="2"
        strokeLinecap="round"
        d="M49 37.2c4.8 4.6 10.9 7.1 18.5 7.4"
        opacity="0.6"
      />
    </svg>
  )
}

export function CrownEmblem() {
  return (
    <svg viewBox="0 0 80 64" aria-hidden="true" className="fpc-award-emblem">
      <path
        fill="currentColor"
        d="M8 46h64v8H8zm4-6 8-22 12 14 8-20 8 20 12-14 8 22H12z"
      />
      <path
        fill="var(--award-icon-highlight)"
        d="M20 24.5 28 40h-8l-4-15.5zm20-12L48 40H32l8-27.5zm20 12L72 40h-8l-4-15.5z"
        opacity="0.7"
      />
      <circle cx="20" cy="18" r="3.2" fill="var(--award-icon-highlight)" />
      <circle cx="40" cy="10" r="3.5" fill="var(--award-icon-highlight)" />
      <circle cx="60" cy="18" r="3.2" fill="var(--award-icon-highlight)" />
    </svg>
  )
}
