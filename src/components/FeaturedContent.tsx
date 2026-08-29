import { ArrowUpLeft, BookOpen, CircleDot, Clock3, Hand, Heart, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import type { Page } from "./Header";

interface Feature {
  id: string;
  page: Page;
  titleAr: string;
  titleEn: string;
  desc: string;
  icon: ReactNode;
}

const FEATURES: Feature[] = [
  {
    id: "quran",
    page: "quran",
    titleAr: "القرآن الكريم",
    titleEn: "Noble Quran",
    desc: "Read all 114 surahs with elegant Arabic typography and verse markers.",
    icon: <BookOpen size={22} strokeWidth={1.7} />,
  },
  {
    id: "prayer-times",
    page: "salaat",
    titleAr: "مواقيت الصلاة",
    titleEn: "Prayer Times",
    desc: "Accurate daily timings for 22 Moroccan cities with a live countdown.",
    icon: <Clock3 size={22} strokeWidth={1.7} />,
  },
  {
    id: "azkar",
    page: "dua",
    titleAr: "الأذكار والدعاء",
    titleEn: "Azkar & Duas",
    desc: "Morning and evening remembrances with counters and favourites.",
    icon: <Heart size={22} strokeWidth={1.7} />,
  },
  {
    id: "guide",
    page: "salaat",
    titleAr: "دليل الصلاة",
    titleEn: "Prayer Guide",
    desc: "Step-by-step guide for every prayer, plus wudu and its conditions.",
    icon: <Hand size={22} strokeWidth={1.7} />,
  },
  {
    id: "tasbeeh",
    page: "dua",
    titleAr: "المسبحة الإلكترونية",
    titleEn: "Tasbeeh",
    desc: "A peaceful digital counter for your daily dhikr — tasbeeh, hamd, takbeer.",
    icon: <CircleDot size={22} strokeWidth={1.7} />,
  },
  {
    id: "verse",
    page: "quran",
    titleAr: "آية اليوم",
    titleEn: "Daily Verse",
    desc: "A hand-picked ayah for every day of the week to reflect upon.",
    icon: <Sparkles size={22} strokeWidth={1.7} />,
  },
];

interface FeaturedContentProps {
  onNavigate: (page: Page) => void;
}

export function FeaturedContent({ onNavigate }: FeaturedContentProps) {
  return (
    <div
      className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Featured Islamic content"
    >
      {FEATURES.map((f, i) => (
        <button
          key={f.id}
          role="listitem"
          onClick={() => onNavigate(f.page)}
          className="card card-hover group relative overflow-hidden p-4 sm:p-5 text-start animate-fade-in-up cursor-pointer"
          style={{ animationDelay: `${i * 45}ms` }}
          aria-label={`${f.titleEn} — ${f.titleAr}`}
        >
          {/* Corner glow ornament */}
          <span
            className="pointer-events-none absolute -end-8 -top-8 h-24 w-24 rounded-full bg-gold-100/70 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
          <div className="flex items-start justify-between">
            <span className="octagram octagram-solid h-12 w-12 text-white transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
              {f.icon}
            </span>
            <ArrowUpLeft
              size={16}
              className="text-ink-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:-translate-x-0.5 rtl:hidden group-hover:text-gold-600"
              aria-hidden="true"
            />
          </div>
          <h3 className="mt-3 font-arabic text-base sm:text-lg font-bold text-ink-900 leading-snug">{f.titleAr}</h3>
          <p className="mt-0.5 text-[10px] sm:text-[10.5px] font-bold uppercase tracking-[0.16em] text-gold-700">
            {f.titleEn}
          </p>
          <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink-600">{f.desc}</p>
        </button>
      ))}
    </div>
  );
}
