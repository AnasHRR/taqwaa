import { BookOpen, Compass, Heart, Sparkles } from "lucide-react";
import { Hero } from "../components/Hero";
import { PrayerTimesPanel } from "../components/PrayerTimesPanel";
import { FeaturedContent } from "../components/FeaturedContent";
import { DailyReminder } from "../components/DailyReminder";
import { SectionTitle } from "../components/SectionTitle";
import type { Page } from "../components/Header";
import { useTranslation } from "../i18n";
import type { City } from "../types";

interface HomePageProps {
  onNavigate: (page: Page) => void;
  selectedCity?: City;
  onSelectCity?: (city: City) => void;
}

export function HomePage({ onNavigate, selectedCity, onSelectCity }: HomePageProps) {
  const { t } = useTranslation();

  const scrollToExplore = () => {
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const overviewCards = t<Array<{ title: string; desc: string }>>("homeOverview.cards") || [];

  return (
    <div className="animate-page-enter">
      {/* Hero section */}
      <Hero onExplore={scrollToExplore} onStart={() => onNavigate("quran")} />

      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
        {/* Live prayer times preview */}
        <section aria-label={t("prayerTimes.title")} className="mt-2 sm:mt-4">
          <PrayerTimesPanel
            variant="compact"
            selectedCityOverride={selectedCity}
            onCityChange={onSelectCity}
          />
        </section>

        {/* Featured content */}
        <section id="explore" className="scroll-mt-20 pt-10 sm:pt-16" aria-labelledby="explore-heading">
          <SectionTitle
            eyebrow={t("featured.eyebrow")}
            title={t("featured.title")}
            subtitle={t("featured.subtitle")}
          />
          <div className="mt-6 sm:mt-9">
            <FeaturedContent onNavigate={onNavigate} />
          </div>
        </section>

        {/* Informative Islamic Overview Section */}
        <section className="pt-10 sm:pt-16" aria-labelledby="about-taqwaa-summary">
          <div className="card-beige relative overflow-hidden p-6 sm:p-10 text-start">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-bold text-gold-800">
                <Sparkles size={13} className="text-gold-600" />
                {t("homeOverview.badge")}
              </span>
              <h2 id="about-taqwaa-summary" className="mt-3 text-xl sm:text-2xl md:text-3xl font-extrabold text-ink-900 leading-tight">
                {t("homeOverview.heading")}
              </h2>
              <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-ink-600">
                {t("homeOverview.description")}
              </p>

              <div className="mt-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                <div className="rounded-xl border border-gold-500/20 bg-white/70 p-3.5 backdrop-blur">
                  <div className="flex items-center gap-2 text-sm font-bold text-gold-800">
                    <Compass size={16} className="text-gold-600" />
                    {overviewCards[0]?.title || t("nav.prayer")}
                  </div>
                  <p className="mt-1 text-xs text-ink-500">{overviewCards[0]?.desc}</p>
                </div>
                <div className="rounded-xl border border-gold-500/20 bg-white/70 p-3.5 backdrop-blur">
                  <div className="flex items-center gap-2 text-sm font-bold text-gold-800">
                    <BookOpen size={16} className="text-gold-600" />
                    {overviewCards[1]?.title || t("nav.quran")}
                  </div>
                  <p className="mt-1 text-xs text-ink-500">{overviewCards[1]?.desc}</p>
                </div>
                <div className="rounded-xl border border-gold-500/20 bg-white/70 p-3.5 backdrop-blur">
                  <div className="flex items-center gap-2 text-sm font-bold text-gold-800">
                    <Heart size={16} className="text-gold-600" />
                    {overviewCards[2]?.title || t("nav.azkar")}
                  </div>
                  <p className="mt-1 text-xs text-ink-500">{overviewCards[2]?.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Daily reminder */}
        <section className="pt-10 sm:pt-16" aria-label={t("dailyReminder.badge")}>
          <DailyReminder />
        </section>
      </div>
    </div>
  );
}
