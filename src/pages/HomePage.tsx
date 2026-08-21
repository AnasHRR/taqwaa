import { Hero } from "../components/Hero";
import { PrayerTimesPanel } from "../components/PrayerTimesPanel";
import { FeaturedContent } from "../components/FeaturedContent";
import { DailyReminder } from "../components/DailyReminder";
import { SectionTitle } from "../components/SectionTitle";
import type { Page } from "../components/Header";

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const scrollToExplore = () => {
    document.getElementById("explore")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="animate-page-enter">
      <Hero onExplore={scrollToExplore} onStart={() => onNavigate("quran")} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Live prayer times preview */}
        <PrayerTimesPanel variant="compact" />

        {/* Featured content */}
        <section id="explore" className="scroll-mt-24 pt-16 sm:pt-20" aria-labelledby="explore-heading">
          <SectionTitle
            eyebrow="Explore"
            title="Everything You Need"
            titleAr="كل ما تحتاجه في مكان واحد"
            subtitle="Carefully crafted tools for worship and knowledge — fast, beautiful and always with you."
          />
          <div className="mt-10">
            <FeaturedContent onNavigate={onNavigate} />
          </div>
        </section>

        {/* Daily reminder */}
        <section className="pt-16 sm:pt-20" aria-label="Daily reminder">
          <DailyReminder />
        </section>
      </div>
    </div>
  );
}
