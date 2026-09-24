export function Logo({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} role="img" aria-label="Stefan Vasilescu">
      <defs>
        <linearGradient id="sv-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d8b4fe" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="sv-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="45" height="45" rx="14" fill="url(#sv-g)" />
      <rect x="1.5" y="1.5" width="45" height="45" rx="14" fill="url(#sv-glass)" opacity="0.3" />
      <text
        x="24"
        y="30.5"
        textAnchor="middle"
        fontFamily="var(--font-display), system-ui, sans-serif"
        fontSize="17"
        fontWeight="800"
        letterSpacing="-0.5"
        fill="#ffffff"
      >
        SV
      </text>
    </svg>
  );
}
