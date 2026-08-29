import { Hero } from "../components/Hero";
import { PrayerTimesPanel } from "../components/PrayerTimesPanel";
import { FeaturedContent } from "../components/FeaturedContent";
import { DailyReminder } from "../components/DailyReminder";
import { SectionTitle } from "../components/SectionTitle";
import type { Page } from "../components/Header";
import type { City } from "../types";

interface HomePageProps {
  onNavigate: (page: Page) => void;
  selectedCity?: City;
  onSelectCity?: (city: City) => void;
}

export function HomePage({ onNavigate, selectedCity, onSelectCity }: HomePageProps) {
  const scrollToExplore = () => {
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="animate-page-enter">
      <Hero onExplore={scrollToExplore} onStart={() => onNavigate("quran")} />

      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
        {/* Live prayer times preview */}
        <div className="mt-2 sm:mt-4">
          <PrayerTimesPanel
            variant="compact"
            selectedCityOverride={selectedCity}
            onCityChange={onSelectCity}
          />
        </div>

        {/* Featured content */}
        <section id="explore" className="scroll-mt-20 pt-10 sm:pt-16" aria-labelledby="explore-heading">
          <SectionTitle
            eyebrow="Explore"
            title="Everything You Need"
            titleAr="كل ما تحتاجه في مكان واحد"
            subtitle="Carefully crafted tools for worship and knowledge — fast, beautiful and always with you."
          />
          <div className="mt-6 sm:mt-9">
            <FeaturedContent onNavigate={onNavigate} />
          </div>
        </section>

        {/* Daily reminder */}
        <section className="pt-10 sm:pt-16" aria-label="Daily reminder">
          <DailyReminder />
        </section>
      </div>
    </div>
  );
}
