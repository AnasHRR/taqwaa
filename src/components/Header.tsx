import { useEffect, useState } from "react";
import { BookOpen, Compass, Heart, Home, Info, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export type Page = "home" | "quran" | "salaat" | "dua" | "about";

interface NavItem {
  id: Page;
  labelAr: string;
  labelEn: string;
  icon: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", labelAr: "الرئيسية", labelEn: "Home", icon: <Home size={18} strokeWidth={1.9} /> },
  { id: "quran", labelAr: "القرآن الكريم", labelEn: "Quran", icon: <BookOpen size={18} strokeWidth={1.9} /> },
  { id: "salaat", labelAr: "مواقيت الصلاة", labelEn: "Prayer Times", icon: <Compass size={18} strokeWidth={1.9} /> },
  { id: "dua", labelAr: "الأذكار والدعاء", labelEn: "Azkar", icon: <Heart size={18} strokeWidth={1.9} /> },
  { id: "about", labelAr: "حول تقوى", labelEn: "About", icon: <Info size={18} strokeWidth={1.9} /> },
];

const PAGE_TITLES: Record<Page, { ar: string; en: string }> = {
  home: { ar: "الرئيسية", en: "Home" },
  quran: { ar: "القرآن الكريم", en: "Quran" },
  salaat: { ar: "مواقيت الصلاة", en: "Prayer Times" },
  dua: { ar: "الأذكار والدعاء", en: "Azkar" },
  about: { ar: "حول المنصة", en: "About Taqwaa" },
};

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2.5 sm:gap-3 cursor-pointer text-start"
      aria-label="Taqwaa — الرئيسية"
    >
      <span className="relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-gold-500/25 bg-gradient-to-br from-gold-100 to-gold-50 shadow-[0_4px_14px_-6px_rgba(201,162,39,0.45)] transition-transform duration-300 group-hover:scale-105">
        {/* crescent mark */}
        <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 text-gold-600" aria-hidden="true">
          <path
            d="M12 2.5a6.5 6.5 0 0 0 9.7 9.7A10 10 0 1 1 12 2.5Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="flex flex-col items-start leading-none">
        <span className="font-quran text-[22px] sm:text-[26px] font-bold leading-none text-gradient-gold">تقوى</span>
        <span className="mt-0.5 sm:mt-1 text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-[0.32em] text-gold-700">
          Taqwaa
        </span>
      </span>
    </button>
  );
}

interface HeaderProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onOpenMore?: () => void;
}

export function Header({ activePage, onNavigate, onOpenMore }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pageInfo = PAGE_TITLES[activePage] || PAGE_TITLES.home;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300 safe-top",
        scrolled
          ? "bg-white/90 shadow-[0_4px_20px_-10px_rgba(31,31,31,0.15)] backdrop-blur-xl"
          : "bg-white/70 backdrop-blur-md"
      )}
    >
      {/* Gold accent hairline */}
      <div className="gold-hairline absolute inset-x-0 bottom-0 h-px opacity-70" aria-hidden="true" />

      <div className="mx-auto flex h-[60px] sm:h-[68px] max-w-7xl items-center justify-between px-3.5 sm:px-6 lg:px-8">
        <Logo onClick={() => onNavigate("home")} />

        {/* ===== Mobile header contextual pill ===== */}
        <div className="flex items-center gap-2 md:hidden">
          {activePage !== "home" ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-500/25 bg-gold-50/90 px-3 py-1 font-arabic text-xs font-bold text-gold-800 shadow-sm animate-fade-in">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-500 animate-pulse" />
              {pageInfo.ar}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full border border-gold-500/20 bg-white/80 px-2.5 py-1 font-arabic text-[11px] font-semibold text-gold-700 shadow-sm">
              <Sparkles size={11} className="text-gold-600" />
              المملكة المغربية
            </span>
          )}

          {onOpenMore && (
            <button
              onClick={onOpenMore}
              className="icon-btn h-9 w-9 rounded-xl border border-ink-200/80 bg-white text-ink-600 hover:border-gold-500/40 hover:text-gold-700 active:scale-95"
              aria-label="خيارات إضافية"
            >
              <Info size={16} />
            </button>
          )}
        </div>

        {/* ===== Desktop navigation (hidden on mobile) ===== */}
        <nav className="hidden items-center gap-6 md:flex lg:gap-8" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              aria-current={activePage === item.id ? "page" : undefined}
              className={cn(
                "nav-link font-arabic !text-[13.5px]",
                activePage === item.id && "nav-link-active"
              )}
            >
              <span className="text-inherit">{item.labelAr}</span>
              <span className="text-[10px] font-sans font-semibold uppercase tracking-wider opacity-60">
                {item.labelEn}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
