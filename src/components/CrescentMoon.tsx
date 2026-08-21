export function CrescentMoon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0d48a" />
          <stop offset="50%" stopColor="#e8c162" />
          <stop offset="100%" stopColor="#d4a843" />
        </linearGradient>
      </defs>
      <circle cx="30" cy="30" r="22" fill="url(#moonGrad)" />
      <circle cx="38" cy="25" r="18" fill="#0a0e1a" />
      {/* Star */}
      <polygon 
        points="48,18 49.5,22 54,22.5 50.5,25 51.5,29.5 48,27 44.5,29.5 45.5,25 42,22.5 46.5,22" 
        fill="url(#moonGrad)" 
      />
    </svg>
  );
}
