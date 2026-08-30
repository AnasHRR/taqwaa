import { BookOpen, Compass, Heart, ShieldCheck, Sparkles, Star } from "lucide-react";
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
      {/* Hero section */}
      <Hero onExplore={scrollToExplore} onStart={() => onNavigate("quran")} />

      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
        {/* Live prayer times preview */}
        <section aria-label="مواقيت الصلاة المباشرة" className="mt-2 sm:mt-4">
          <PrayerTimesPanel
            variant="compact"
            selectedCityOverride={selectedCity}
            onCityChange={onSelectCity}
          />
        </section>

        {/* Featured content */}
        <section id="explore" className="scroll-mt-20 pt-10 sm:pt-16" aria-labelledby="explore-heading">
          <SectionTitle
            eyebrow="Explore"
            title="Everything You Need"
            titleAr="كل ما تحتاجه في مكان واحد"
            subtitle="خدمات وأدوات إسلامية متقنة للعبادة والذكر — دقيقة، عصرية، ومصممة لراحتك."
          />
          <div className="mt-6 sm:mt-9">
            <FeaturedContent onNavigate={onNavigate} />
          </div>
        </section>

        {/* Informative Islamic Overview Section (SEO & User Value) */}
        <section className="pt-10 sm:pt-16" aria-labelledby="about-taqwaa-summary">
          <div className="card-beige relative overflow-hidden p-6 sm:p-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/15 px-3 py-1 text-xs font-bold text-gold-800">
                <Sparkles size={13} className="text-gold-600" />
                منصة تقوى الإسلامية · Taqwaa Maroc
              </span>
              <h2 id="about-taqwaa-summary" className="mt-3 font-arabic text-xl sm:text-2xl md:text-3xl font-extrabold text-ink-900 leading-tight">
                رفيقك اليومي لمتابعة أوقات الصلاة والقرآن الكريم في المغرب
              </h2>
              <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-ink-600">
                تم تطوير منصة وتطبيق <strong className="text-gold-800">تقوى (Taqwaa)</strong> لتقديم تجربة إسلامية هادئة ونقية تجمع بين الدقة العالية في مواقيت الصلاة لكافة المدن المغربية (كالدار البيضاء، الرباط، مراكش، طنجة، فاس، أكادير وغيرها)، وتلاوة القرآن الكريم كاملاً، وحصن المسلم من الأدعية وأذكار الصباح والمساء، في واجهة عربية سريعة وخالية تماماً من الإعلانات المزعجة.
              </p>

              <div className="mt-6 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-3">
                <div className="rounded-xl border border-gold-500/20 bg-white/70 p-3.5 backdrop-blur">
                  <div className="flex items-center gap-2 font-arabic text-sm font-bold text-gold-800">
                    <Compass size={16} className="text-gold-600" />
                    مواقيت الصلاة بالمغرب
                  </div>
                  <p className="mt-1 text-xs text-ink-500">حسابات دقيقة مطابقة لتوقيت الأذان المعتمد رسمياً بالمملكة.</p>
                </div>
                <div className="rounded-xl border border-gold-500/20 bg-white/70 p-3.5 backdrop-blur">
                  <div className="flex items-center gap-2 font-arabic text-sm font-bold text-gold-800">
                    <BookOpen size={16} className="text-gold-600" />
                    المصحف الشريف
                  </div>
                  <p className="mt-1 text-xs text-ink-500">١١٤ سورة كاملة مع التلاوات والتفسير وإمكانية البحث والمفضلة.</p>
                </div>
                <div className="rounded-xl border border-gold-500/20 bg-white/70 p-3.5 backdrop-blur">
                  <div className="flex items-center gap-2 font-arabic text-sm font-bold text-gold-800">
                    <Heart size={16} className="text-gold-600" />
                    الأذكار وحصن المسلم
                  </div>
                  <p className="mt-1 text-xs text-ink-500">أذكار الصباح والمساء والصلوات مع عداد التسبيح الإلكتروني.</p>
                </div>
              </div>
            </div>
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
