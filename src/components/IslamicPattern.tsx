import { useId } from "react";

interface IslamicPatternProps {
  className?: string;
  color?: string;
  opacity?: number;
}

/** Seamless eight-pointed-star Islamic geometric pattern rendered as an SVG layer. */
export function IslamicPattern({
  className,
  color = "#C9A227",
  opacity = 0.1,
}: IslamicPatternProps) {
  const id = useId();
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <defs>
        <pattern id={id} width="76" height="76" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="1" opacity={opacity}>
            {/* central octagram */}
            <rect x="20" y="20" width="36" height="36" />
            <rect x="20" y="20" width="36" height="36" transform="rotate(45 38 38)" />
            <circle cx="38" cy="38" r="2.6" />
            {/* connecting lattice */}
            <path d="M0 38 H14 M62 38 H76 M38 0 V14 M38 62 V76" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
