interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  titleAr?: string;
  subtitle?: string;
  align?: "center" | "start";
  dark?: boolean;
}

export function SectionTitle({
  eyebrow,
  title,
  titleAr,
  subtitle,
  align = "center",
  dark = false,
}: SectionTitleProps) {
  const centered = align === "center";
  return (
    <div className={`flex flex-col ${centered ? "items-center text-center" : "items-start text-start"}`}>
      {/* Ornament */}
      <div className="flex items-center gap-2.5" aria-hidden="true">
        <span className={`h-px w-8 sm:w-12 ${dark ? "bg-gold-500/50" : "divider-gold"}`} style={{ width: centered ? undefined : 32 }} />
        <svg width="14" height="14" viewBox="0 0 24 24" className={dark ? "text-gold-400" : "text-gold-600"}>
          <rect x="7" y="7" width="10" height="10" fill="currentColor" opacity="0.9" />
          <rect x="7" y="7" width="10" height="10" fill="currentColor" opacity="0.9" transform="rotate(45 12 12)" />
        </svg>
        <span className={`h-px w-8 sm:w-12 ${dark ? "bg-gold-500/50" : "divider-gold"}`} />
      </div>

      {eyebrow && (
        <span
          className={`mt-3 text-[11px] font-bold uppercase tracking-[0.22em] ${
            dark ? "text-gold-300" : "text-gold-700"
          }`}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={`mt-2 text-2xl font-extrabold leading-tight sm:text-3xl lg:text-[2.1rem] ${
          dark ? "text-white" : "text-ink-900"
        }`}
      >
        {title}
        {titleAr && (
          <span className={`ms-3 font-quran text-[1.15em] ${dark ? "text-gradient-gold-light" : "text-gradient-gold"}`}>
            {titleAr}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className={`mt-2.5 max-w-xl text-sm leading-relaxed sm:text-[15px] ${dark ? "text-white/60" : "text-ink-600"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
