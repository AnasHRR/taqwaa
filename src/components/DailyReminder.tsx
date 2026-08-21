import { MoonStar, Sparkles } from "lucide-react";
import { DAILY_VERSES } from "../constants";
import { CrescentMoon } from "./CrescentMoon";
import { IslamicPattern } from "./IslamicPattern";

export function DailyReminder() {
  const verse = DAILY_VERSES[new Date().getDay()];

  return (
    <section
      className="card-dark relative overflow-hidden px-5 py-12 text-center sm:px-10 sm:py-16"
      aria-labelledby="daily-reminder-heading"
    >
      {/* Decorations */}
      <IslamicPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.09} />
      <div
        className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-gold-500/15 blur-[80px]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute bottom-4 end-6 hidden opacity-90 sm:block" aria-hidden="true">
        <CrescentMoon className="h-14 w-14" />
      </div>
      <div className="pointer-events-none absolute start-8 top-8 hidden gap-1 text-gold-500/50 sm:flex" aria-hidden="true">
        <Sparkles size={12} />
        <Sparkles size={8} className="mt-4" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        <div className="flex items-center justify-center gap-2.5 animate-fade-in-up">
          <MoonStar size={16} className="text-gold-400" aria-hidden="true" />
          <h2 id="daily-reminder-heading" className="text-xs font-extrabold uppercase tracking-[0.28em] text-gold-300">
            Daily Reminder
          </h2>
          <MoonStar size={16} className="text-gold-400" aria-hidden="true" />
        </div>

        <p className="font-arabic mt-3 text-sm font-semibold text-white/60 animate-fade-in-up" style={{ animationDelay: "70ms" }} dir="rtl">
          تذكير اليوم
        </p>

        <div className="mx-auto mt-7 h-px w-24 bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" aria-hidden="true" />

        <blockquote className="animate-fade-in-up" style={{ animationDelay: "140ms" }}>
          <p
            className="mt-7 font-quran text-2xl leading-[2.1] text-gradient-gold-light sm:text-3xl lg:text-[2.4rem] lg:leading-[1.9]"
            dir="rtl"
            lang="ar"
          >
            ﴿ {verse.text} ﴾
          </p>
          <footer className="mt-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/25 bg-white/[0.04] px-4 py-1.5 font-arabic text-xs font-bold tracking-wide text-gold-200" dir="rtl">
              {verse.ref}
            </span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
