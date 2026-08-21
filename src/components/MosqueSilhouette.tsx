interface MosqueSilhouetteProps {
  className?: string;
  cutoutColor?: string;
}

/** Decorative mosque skyline with domes and minarets (single-colour silhouette). */
export function MosqueSilhouette({
  className,
  cutoutColor = "#FAF9F6",
}: MosqueSilhouetteProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 480 160"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* Left minaret */}
      <rect x="52" y="42" width="13" height="112" rx="2" />
      <rect x="49" y="36" width="19" height="9" rx="3" />
      <path d="M58.5 12 L50 34 L67 34 Z" />
      <circle cx="58.5" cy="10" r="3.4" />
      <ellipse cx="58.5" cy="66" rx="3.6" ry="7" fill={cutoutColor} />

      {/* Main dome */}
      <path d="M150 92 Q150 30 240 24 Q330 30 330 92 L330 154 L150 154 Z" opacity="0.9" />
      <circle cx="240" cy="22" r="5.4" />
      <path d="M240 8 L241.8 18.2 L252 20 L241.8 21.8 L240 32 L238.2 21.8 L228 20 L238.2 18.2 Z" />

      {/* Drum windows */}
      <ellipse cx="216" cy="62" rx="5.4" ry="9" fill={cutoutColor} />
      <ellipse cx="264" cy="62" rx="5.4" ry="9" fill={cutoutColor} />

      {/* Side arches */}
      <path d="M118 154 L118 108 Q118 84 140 84 Q162 84 162 108 L162 154 Z" opacity="0.55" />
      <path d="M318 154 L318 108 Q318 84 340 84 Q362 84 362 108 L362 154 Z" opacity="0.55" />

      {/* Right minaret */}
      <rect x="408" y="42" width="13" height="112" rx="2" />
      <rect x="405" y="36" width="19" height="9" rx="3" />
      <path d="M414.5 12 L406 34 L423 34 Z" />
      <circle cx="414.5" cy="10" r="3.4" />
      <ellipse cx="414.5" cy="66" rx="3.6" ry="7" fill={cutoutColor} />

      {/* Base line */}
      <rect x="36" y="152" width="408" height="3" rx="1.5" opacity="0.65" />
    </svg>
  );
}
