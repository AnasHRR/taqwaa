export function MosqueSilhouette({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 400 120" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Left minaret */}
      <rect x="40" y="30" width="12" height="90" rx="1" />
      <rect x="38" y="25" width="16" height="8" rx="2" />
      <polygon points="46,5 38,25 54,25" />
      <circle cx="46" cy="8" r="3" />
      
      {/* Main dome */}
      <path d="M120,70 Q120,20 200,15 Q280,20 280,70 L280,120 L120,120 Z" opacity="0.8" />
      
      {/* Dome crescent */}
      <circle cx="200" cy="18" r="5" />
      <circle cx="202" cy="17" r="4" fill="#0a0e1a" />
      
      {/* Central tower */}
      <rect x="190" y="25" width="20" height="95" rx="1" />
      <rect x="186" y="20" width="28" height="8" rx="3" />
      
      {/* Windows */}
      <ellipse cx="200" cy="55" rx="5" ry="8" fill="#0a0e1a" opacity="0.5" />
      <ellipse cx="160" cy="80" rx="4" ry="7" fill="#0a0e1a" opacity="0.4" />
      <ellipse cx="240" cy="80" rx="4" ry="7" fill="#0a0e1a" opacity="0.4" />
      
      {/* Right minaret */}
      <rect x="348" y="30" width="12" height="90" rx="1" />
      <rect x="346" y="25" width="16" height="8" rx="2" />
      <polygon points="354,5 346,25 362,25" />
      <circle cx="354" cy="8" r="3" />
      
      {/* Side arches */}
      <path d="M80,120 L80,75 Q80,55 100,55 Q120,55 120,75 L120,120 Z" opacity="0.5" />
      <path d="M280,120 L280,75 Q280,55 300,55 Q320,55 320,75 L320,120 Z" opacity="0.5" />
      
      {/* Base line */}
      <rect x="30" y="118" width="340" height="2" rx="1" opacity="0.6" />
    </svg>
  );
}
