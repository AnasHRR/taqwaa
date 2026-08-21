import { useEffect, useRef, useState } from "react";
import { BookOpen, Compass, Heart, Home, Info, Menu, X } from "lucide-react";
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
  { id: "quran", labelAr: "القرآن", labelEn: "Quran", icon: <BookOpen size={18} strokeWidth={1.9} /> },
  { id: "salaat", labelAr: "مواقيت الصلاة", labelEn: "Prayer Times", icon: <Compass size={18} strokeWidth={1.9} /> },
  { id: "dua", labelAr: "الأذكار", labelEn: "Azkar", icon: <Heart size={18} strokeWidth={1.9} /> },
  { id: "about", labelAr: "حول", labelEn: "About", icon: <Info size={18} strokeWidth={1.9} /> },
];

function Logo({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-3"
      aria-label="Taqwaa — الرئيسية"
    >
      <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-gold-500/25 bg-gradient-to-br from-gold-100 to-gold-50 shadow-[0_4px_14px_-6px_rgba(201,162,39,0.45)] transition-transform duration-300 group-hover:scale-105">
        {/* crescent mark */}
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold-600" aria-hidden="true">
          <path
            d="M12 2.5a6.5 6.5 0 0 0 9.7 9.7A10 10 0 1 1 12 2.5Z"
            fill="currentColor"
          />
        </svg>
      </span>
      <span className="flex flex-col items-start leading-none">
        <span className="font-quran text-[26px] font-bold leading-none text-gradient-gold">تقوى</span>
        <span className="mt-1 text-[9px] font-extrabold uppercase tracking-[0.34em] text-gold-700">
          Taqwaa
        </span>
      </span>
    </button>
  );
}

interface HeaderProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

export function Header({ activePage, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu on Escape + lock body scroll while open */
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const go = (page: Page) => {
    setMenuOpen(false);
    burgerRef.current?.focus();
    onNavigate(page);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-white/85 shadow-[0_6px_24px_-14px_rgba(31,31,31,0.25)] backdrop-blur-xl"
            : "bg-white/60 backdrop-blur-md"
        )}
      >
        {/* gold accent hairline */}
        <div className="gold-hairline absolute inset-x-0 bottom-0 h-px opacity-70" aria-hidden="true" />

        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo onClick={() => go("home")} />

          {/* ===== Desktop navigation ===== */}
          <nav className="hidden items-center gap-7 md:flex lg:gap-9" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                aria-current={activePage === item.id ? "page" : undefined}
                className={cn("nav-link font-arabic !text-[13px]", activePage === item.id && "nav-link-active")}
              >
                {item.labelAr}
                <span className="text-[10px] font-sans font-semibold uppercase tracking-wider opacity-60">
                  {item.labelEn}
                </span>
              </button>
            ))}
          </nav>

          {/* ===== Mobile hamburger ===== */}
          <button
            ref={burgerRef}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            className="icon-btn flex h-11 w-11 items-center justify-center md:hidden"
          >
            <span className="relative block h-5 w-5">
              <X
                size={20}
                className={cn(
                  "absolute inset-0 transition-all duration-300",
                  menuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                )}
              />
              <Menu
                size={20}
                className={cn(
                  "absolute inset-0 transition-all duration-300",
                  menuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/* ===== Mobile menu overlay panel ===== */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={cn(
          "fixed inset-x-0 bottom-0 top-[72px] z-40 flex flex-col bg-white/95 backdrop-blur-xl transition-all duration-300 ease-out md:hidden",
          menuOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="قائمة التنقل"
        hidden={!menuOpen}
      >
        <div className="gold-hairline absolute inset-x-0 top-0 h-px" aria-hidden="true" />

        <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto px-4 pb-8 pt-5" aria-label="Mobile">
          {NAV_ITEMS.map((item, i) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => go(item.id)}
                aria-current={isActive ? "page" : undefined}
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
                className={cn(
                  "mobile-nav-item transition-all duration-300",
                  isActive && "mobile-nav-item-active",
                  menuOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                )}
              >
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border transition-colors",
                    isActive
                      ? "border-gold-500/35 bg-gradient-to-br from-gold-100 to-gold-50 text-gold-700"
                      : "border-ink-200 bg-ink-50 text-ink-500"
                  )}
                >
                  {item.icon}
                </span>
                <span className="flex flex-col items-start leading-tight">
                  {item.labelAr}
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] opacity-55">
                    {item.labelEn}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>

        <div className="px-6 pb-[max(20px,env(safe-area-inset-bottom))] text-center">
          <div className="divider-gold mb-4" />
          <p className="font-arabic text-xs text-ink-500">وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ</p>
        </div>
      </div>
    </>
  );
}
