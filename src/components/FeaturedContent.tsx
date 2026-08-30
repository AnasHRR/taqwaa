import { ArrowUpRight, BookOpen, CircleDot, Clock3, Hand, Heart, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import type { Page } from "./Header";
import { useTranslation } from "../i18n";

interface FeatureDef {
  id: string;
  page: Page;
  icon: ReactNode;
}

const FEATURE_DEFS: FeatureDef[] = [
  { id: "quran", page: "quran", icon: <BookOpen size={22} strokeWidth={1.7} /> },
  { id: "prayer-times", page: "salaat", icon: <Clock3 size={22} strokeWidth={1.7} /> },
  { id: "azkar", page: "dua", icon: <Heart size={22} strokeWidth={1.7} /> },
  { id: "guide", page: "salaat", icon: <Hand size={22} strokeWidth={1.7} /> },
  { id: "tasbeeh", page: "dua", icon: <CircleDot size={22} strokeWidth={1.7} /> },
  { id: "verse", page: "quran", icon: <Sparkles size={22} strokeWidth={1.7} /> },
];

interface FeaturedContentProps {
  onNavigate: (page: Page) => void;
}

export function FeaturedContent({ onNavigate }: FeaturedContentProps) {
  const { t, isRTL } = useTranslation();

  const items = t<Array<{ id: string; title: string; desc: string }>>("featured.items") || [];

  return (
    <div
      className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label={t("featured.title")}
    >
      {FEATURE_DEFS.map((def, i) => {
        const content = items.find((it) => it.id === def.id) || {
          title: def.id,
          desc: "",
        };

        return (
          <button
            key={def.id}
            role="listitem"
            onClick={() => onNavigate(def.page)}
            className="card card-hover group relative overflow-hidden p-4 sm:p-5 text-start animate-fade-in-up cursor-pointer"
            style={{ animationDelay: `${i * 45}ms` }}
            aria-label={content.title}
          >
            {/* Corner glow ornament */}
            <span
              className="pointer-events-none absolute -end-8 -top-8 h-24 w-24 rounded-full bg-gold-100/70 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            />
            <div className="flex items-start justify-between">
              <span className="octagram octagram-solid h-12 w-12 text-white transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
                {def.icon}
              </span>
              <ArrowUpRight
                size={16}
                className="text-ink-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-600 rtl:group-hover:-translate-x-0.5 rtl-flip"
                aria-hidden="true"
              />
            </div>
            <h3 className="mt-3 text-base sm:text-lg font-bold text-ink-900 leading-snug">
              {content.title}
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink-600">
              {content.desc}
            </p>
          </button>
        );
      })}
    </div>
  );
}
