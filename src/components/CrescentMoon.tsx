export function CrescentMoon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="taqwaaMoonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5C766" />
          <stop offset="55%" stopColor="#C9A227" />
          <stop offset="100%" stopColor="#9C7A16" />
        </linearGradient>
      </defs>
      {/* crescent */}
      <path d="M30 6a16 16 0 0 0 24 24A24 24 0 1 1 30 6Z" fill="url(#taqwaaMoonGrad)" />
      {/* star */}
      <polygon
        points="46,34 47.6,38.4 52,40 47.6,41.6 46,46 44.4,41.6 40,40 44.4,38.4"
        fill="#E5C766"
      />
    </svg>
  );
}
