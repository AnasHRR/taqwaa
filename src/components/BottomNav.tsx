import { BookOpen, Compass, Heart, Home, MoreHorizontal } from "lucide-react";
import type { Page } from "./Header";
import { cn } from "../utils/cn";

export interface BottomNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onOpenMore: () => void;
  isMoreOpen?: boolean;
}

interface BottomNavItem {
  id: Page | "more";
  labelAr: string;
  labelEn: string;
  icon: typeof Home;
}

const ITEMS: BottomNavItem[] = [
  { id: "home", labelAr: "الرئيسية", labelEn: "Home", icon: Home },
  { id: "quran", labelAr: "القرآن", labelEn: "Quran", icon: BookOpen },
  { id: "salaat", labelAr: "الصلاة", labelEn: "Prayer", icon: Compass },
  { id: "dua", labelAr: "الأذكار", labelEn: "Azkar", icon: Heart },
  { id: "more", labelAr: "المزيد", labelEn: "More", icon: MoreHorizontal },
];

export function BottomNav({ activePage, onNavigate, onOpenMore, isMoreOpen = false }: BottomNavProps) {
  const handleClick = (id: Page | "more") => {
    if (id === "more") {
      onOpenMore();
    } else {
      onNavigate(id);
    }
  };

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed inset-x-0 bottom-0 z-50 block md:hidden select-none"
    >
      {/* Frosted container with Islamic gold subtle hairline top border and shadow */}
      <div className="relative mx-auto border-t border-gold-500/25 bg-white/95 backdrop-blur-xl shadow-[0_-8px_30px_rgba(31,31,31,0.08)] rounded-t-[22px]">
        {/* Subtle accent glow line at the top */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-gold-500/60 to-transparent"
          aria-hidden="true"
        />

        {/* Navigation buttons container */}
        <div className="flex h-[66px] items-center justify-around px-2 pt-1 pb-[env(safe-area-inset-bottom,4px)]">
          {ITEMS.map((item) => {
            const isMore = item.id === "more";
            const isActive = isMore ? isMoreOpen : activePage === item.id && !isMoreOpen;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleClick(item.id)}
                aria-label={`${item.labelEn} — ${item.labelAr}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "bottom-nav-item group relative",
                  isActive ? "bottom-nav-active text-gold-700 font-bold" : "text-ink-500 hover:text-ink-800"
                )}
              >
                {/* Icon box with scale & soft pill background */}
                <span className="bottom-nav-icon-box">
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.4 : 1.9}
                    className={cn(
                      "transition-all duration-200",
                      isActive ? "text-gold-700" : "text-ink-400 group-hover:text-ink-600"
                    )}
                  />
                </span>

                {/* Text Label */}
                <span
                  className={cn(
                    "mt-0.5 text-[10.5px] leading-none tracking-tight font-arabic transition-colors duration-200",
                    isActive ? "font-bold text-gold-800" : "font-medium text-ink-500"
                  )}
                >
                  {item.labelAr}
                </span>

                {/* Small Animated Active Pill Indicator */}
                {isActive && (
                  <span className="bottom-nav-indicator" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
