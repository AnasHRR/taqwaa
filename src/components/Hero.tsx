import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { Button } from "./Button";
import { CrescentMoon } from "./CrescentMoon";
import { IslamicPattern } from "./IslamicPattern";
import { MosqueSilhouette } from "./MosqueSilhouette";

interface HeroProps {
  onExplore: () => void;
  onStart: () => void;
}

const STATS = [
  { valueAr: "١١٤", labelEn: "Surahs", labelAr: "سورة" },
  { valueAr: "٥", labelEn: "Daily Prayers", labelAr: "صلوات" },
  { valueAr: "+٢٠", labelEn: "Cities", labelAr: "مدينة" },
  { valueAr: "∞", labelEn: "Azkar", labelAr: "ذكر" },
];

export function Hero({ onExplore, onStart }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-14 lg:pt-16" aria-labelledby="hero-heading">
      {/* Decorative background layers */}
      <IslamicPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.06} />
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-gold-300/25 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-[-8%] h-[320px] w-[320px] rounded-full bg-gold-100 blur-[90px]"
        aria-hidden="true"
      />
      <MosqueSilhouette
        className="pointer-events-none absolute -bottom-2 end-[-40px] h-36 w-auto text-gold-500/[0.08] sm:h-48 lg:h-60 lg:end-8"
        cutoutColor="#FAF9F6"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 sm:pb-28 sm:pt-12 lg:px-8 lg:pb-36">
        <div className="mx-auto max-w-3xl text-center">
          {/* Greeting badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-white/80 px-4 py-2 font-arabic text-xs font-bold text-gold-700 shadow-[0_4px_16px_-8px_rgba(201,162,39,0.5)] animate-fade-in-up backdrop-blur">
            <Sparkles size={13} className="text-gold-600" aria-hidden="true" />
            السلام عليكم ورحمة الله وبركاته
          </span>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="mt-6 text-balance text-4xl font-extrabold leading-[1.12] tracking-tight text-ink-900 animate-fade-in-up sm:text-5xl lg:text-[3.6rem]"
            style={{ animationDelay: "90ms" }}
          >
            Your Journey Towards{" "}
            <span className="text-gradient-gold">Faith&nbsp;&amp;&nbsp;Knowledge</span>
          </h1>

          <p className="mt-4 font-quran text-xl text-gold-700 animate-fade-in-up sm:text-2xl" style={{ animationDelay: "160ms" }} dir="rtl">
            رِحْلَتُكَ نَحْوَ الإيمَانِ وَالمَعْرِفَةِ
          </p>

          {/* Description */}
          <p
            className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-ink-600 animate-fade-in-up sm:text-base"
            style={{ animationDelay: "230ms" }}
          >
            Discover Quranic knowledge, accurate prayer times, authentic azkar and daily
            reminders — all in one peaceful place, designed for your spiritual journey.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 animate-fade-in-up sm:flex-row" style={{ animationDelay: "300ms" }}>
            <Button onClick={onExplore} className="w-full sm:w-auto" aria-label="Explore Taqwaa features">
              <Compass size={17} strokeWidth={2} aria-hidden="true" />
              Explore Taqwaaa
            </Button>
            <Button variant="secondary" onClick={onStart} className="w-full sm:w-auto" aria-label="Start your journey with the Noble Quran">
              Start Your Journey
              <ArrowRight size={17} strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Floating crescent */}
        <div className="pointer-events-none absolute start-4 top-0 hidden animate-float lg:block" aria-hidden="true">
          <CrescentMoon className="h-20 w-20 opacity-90 drop-shadow-[0_10px_24px_rgba(201,162,39,0.35)]" />
        </div>

        {/* Stats */}
        <dl
          className="mx-auto mt-14 grid max-w-2xl grid-cols-4 divide-x divide-ink-200 overflow-hidden rounded-3xl border border-ink-200/80 bg-white/70 shadow-[0_10px_40px_-20px_rgba(31,31,31,0.15)] backdrop-blur animate-fade-in-up rtl:divide-x-reverse sm:mt-16"
          style={{ animationDelay: "380ms" }}
        >
          {STATS.map((s) => (
            <div key={s.labelEn} className="flex flex-col items-center gap-0.5 px-2 py-5">
              <dd className="font-quran text-2xl font-bold text-gradient-gold sm:text-3xl">{s.valueAr}</dd>
              <dt className="text-[9px] font-bold uppercase tracking-[0.14em] text-ink-500 sm:text-[10px]">
                {s.labelEn}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
