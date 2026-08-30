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
  { valueAr: "٥", labelEn: "Prayers", labelAr: "صلوات" },
  { valueAr: "+٢٢", labelEn: "Cities", labelAr: "مدينة" },
  { valueAr: "∞", labelEn: "Azkar", labelAr: "أذكار" },
];

export function Hero({ onExplore, onStart }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-4 sm:pt-10 lg:pt-14" aria-labelledby="hero-heading">
      {/* Decorative background layers */}
      <IslamicPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.05} />
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-[340px] sm:h-[420px] w-[340px] sm:w-[420px] rounded-full bg-gold-300/20 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 left-[-8%] h-[280px] sm:h-[320px] w-[280px] sm:w-[320px] rounded-full bg-gold-100 blur-[80px]"
        aria-hidden="true"
      />
      <MosqueSilhouette
        className="pointer-events-none absolute -bottom-2 end-[-30px] h-28 sm:h-44 lg:h-56 w-auto text-gold-500/[0.07] lg:end-8"
        cutoutColor="#FAF9F6"
      />

      <div className="relative mx-auto max-w-7xl px-3.5 pb-16 sm:px-6 sm:pb-24 sm:pt-8 lg:px-8 lg:pb-32">
        <div className="mx-auto max-w-3xl text-center">
          {/* Greeting badge */}
          <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-gold-500/30 bg-white/85 px-3.5 py-1.5 font-arabic text-[11px] sm:text-xs font-bold text-gold-800 shadow-[0_4px_16px_-8px_rgba(201,162,39,0.4)] animate-fade-in-up backdrop-blur">
            <Sparkles size={12} className="text-gold-600 shrink-0" aria-hidden="true" />
            السلام عليكم ورحمة الله وبركاته
          </span>

          {/* Heading */}
          <h1
            id="hero-heading"
            className="mt-4 sm:mt-6 text-balance text-[28px] sm:text-4xl md:text-5xl lg:text-[3.6rem] font-extrabold leading-[1.15] tracking-tight text-ink-900 animate-fade-in-up"
            style={{ animationDelay: "90ms" }}
          >
            Your Journey Towards{" "}
            <span className="text-gradient-gold">Faith&nbsp;&amp;&nbsp;Knowledge</span>
          </h1>

          <p
            className="mt-2.5 sm:mt-4 font-quran text-lg sm:text-2xl text-gold-800 animate-fade-in-up"
            style={{ animationDelay: "160ms" }}
            dir="rtl"
          >
            رِحْلَتُكَ نَحْوَ الإيمَانِ وَالمَعْرِفَةِ
          </p>

          {/* Description */}
          <p
            className="mx-auto mt-3 sm:mt-4 max-w-xl text-pretty text-xs sm:text-sm md:text-base leading-relaxed text-ink-600 animate-fade-in-up"
            style={{ animationDelay: "230ms" }}
          >
            Discover Quranic knowledge, accurate prayer times for Morocco, authentic azkar and daily
            reminders — crafted for a calm spiritual companion.
          </p>

          {/* CTAs */}
          <div
            className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-2.5 sm:gap-3 animate-fade-in-up sm:flex-row"
            style={{ animationDelay: "300ms" }}
          >
            <Button
              onClick={onExplore}
              className="w-full sm:w-auto !py-3 !text-sm"
              aria-label="Explore Taqwaa features"
            >
              <Compass size={16} strokeWidth={2} aria-hidden="true" />
              Explore Taqwaa
            </Button>
            <Button
              variant="secondary"
              onClick={onStart}
              className="w-full sm:w-auto !py-3 !text-sm"
              aria-label="Start your journey with the Noble Quran"
            >
              Start Your Journey
              <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* Floating crescent */}
        <div
          className="pointer-events-none absolute start-4 top-0 hidden animate-float lg:block"
          aria-hidden="true"
        >
          <CrescentMoon className="h-20 w-20 opacity-90 drop-shadow-[0_10px_24px_rgba(201,162,39,0.35)]" />
        </div>

        {/* Stats */}
        <dl
          className="mx-auto mt-10 sm:mt-14 grid max-w-2xl grid-cols-4 divide-x divide-ink-200/80 overflow-hidden rounded-2xl sm:rounded-3xl border border-ink-200/80 bg-white/80 shadow-[0_10px_30px_-18px_rgba(31,31,31,0.12)] backdrop-blur animate-fade-in-up rtl:divide-x-reverse"
          style={{ animationDelay: "380ms" }}
        >
          {STATS.map((s) => (
            <div key={s.labelEn} className="flex flex-col items-center gap-0.5 px-1 sm:px-2 py-3.5 sm:py-5">
              <dd className="font-quran text-xl sm:text-2xl md:text-3xl font-bold text-gradient-gold">
                {s.valueAr}
              </dd>
              <dt className="text-[8px] sm:text-[9.5px] font-bold uppercase tracking-wider text-ink-500 text-center truncate max-w-full">
                {s.labelEn}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
