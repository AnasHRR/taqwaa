import { MoonStar, Sparkles } from "lucide-react";
import { DAILY_VERSES } from "../constants";
import { CrescentMoon } from "./CrescentMoon";
import { IslamicPattern } from "./IslamicPattern";
import { useTranslation } from "../i18n";

export function DailyReminder() {
  const { t, language } = useTranslation();
  const verse = DAILY_VERSES[new Date().getDay()];

  const localizedTranslation =
    language === "fr"
      ? verse.translationFr
      : language === "en"
      ? verse.translationEn
      : null;

  const localizedRef =
    language === "fr" ? verse.refFr : language === "en" ? verse.refEn : verse.ref;

  return (
    <section
      className="card-dark relative overflow-hidden px-4 py-8 sm:px-10 sm:py-14 text-center"
      aria-labelledby="daily-reminder-heading"
    >
      {/* Decorations */}
      <IslamicPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.08} />
      <div
        className="pointer-events-none absolute -left-16 -top-16 h-48 sm:h-56 w-48 sm:w-56 rounded-full bg-gold-500/15 blur-[70px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute bottom-4 end-6 hidden opacity-90 sm:block" aria-hidden="true">
        <CrescentMoon className="h-12 w-12" />
      </div>
      <div className="pointer-events-none absolute start-6 top-6 hidden gap-1 text-gold-500/50 sm:flex" aria-hidden="true">
        <Sparkles size={12} />
        <Sparkles size={8} className="mt-3" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <div className="flex items-center justify-center gap-2 animate-fade-in-up">
          <MoonStar size={14} className="text-gold-400" aria-hidden="true" />
          <h2 id="daily-reminder-heading" className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.28em] text-gold-300">
            {t("dailyReminder.badge")}
          </h2>
          <MoonStar size={14} className="text-gold-400" aria-hidden="true" />
        </div>

        <p className="mt-2 text-xs sm:text-sm font-semibold text-white/60 animate-fade-in-up" style={{ animationDelay: "70ms" }}>
          {t("dailyReminder.title")}
        </p>

        <div className="mx-auto mt-4 sm:mt-6 h-px w-20 bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" aria-hidden="true" />

        <blockquote className="animate-fade-in-up" style={{ animationDelay: "140ms" }}>
          {/* Authentic Arabic Quran Verse */}
          <p
            className="mt-5 sm:mt-6 font-quran text-xl sm:text-2xl md:text-3xl leading-[2.1] text-gradient-gold-light"
            dir="rtl"
            lang="ar"
          >
            ﴿ {verse.text} ﴾
          </p>

          {/* Translation when in French or English */}
          {localizedTranslation && (
            <p className="mt-3 max-w-lg mx-auto text-xs sm:text-sm italic text-white/80 leading-relaxed">
              "{localizedTranslation}"
            </p>
          )}

          <footer className="mt-4 sm:mt-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/25 bg-white/[0.04] px-3.5 py-1 text-xs font-bold tracking-wide text-gold-200">
              {localizedRef}
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
