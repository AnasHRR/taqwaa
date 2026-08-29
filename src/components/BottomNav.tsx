import { useEffect, useRef, useState, useCallback } from "react";
import { BookOpen, Compass, Heart, Home, MoreHorizontal } from "lucide-react";
import type { Page } from "./Header";
import { cn } from "../utils/cn";

export interface BottomNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onOpenMore: () => void;
  isMoreOpen?: boolean;
}

interface NavItemDef {
  id: Page | "more";
  labelAr: string;
  labelEn: string;
  icon: typeof Home;
}

const ITEMS: NavItemDef[] = [
  { id: "home", labelAr: "الرئيسية", labelEn: "Home", icon: Home },
  { id: "quran", labelAr: "القرآن", labelEn: "Quran", icon: BookOpen },
  { id: "salaat", labelAr: "الصلاة", labelEn: "Prayer", icon: Compass },
  { id: "dua", labelAr: "الأذكار", labelEn: "Azkar", icon: Heart },
  { id: "more", labelAr: "المزيد", labelEn: "More", icon: MoreHorizontal },
];

export function BottomNav({
  activePage,
  onNavigate,
  onOpenMore,
  isMoreOpen = false,
}: BottomNavProps) {
  const [scrollHidden, setScrollHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Scroll-aware: subtle shift down when scrolling down, reappear on scroll up
  const handleScroll = useCallback(() => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      // Only trigger after a meaningful scroll (> 8px threshold)
      if (delta > 8 && currentY > 60) {
        setScrollHidden(true);
      } else if (delta < -8) {
        setScrollHidden(false);
      }
      lastScrollY.current = currentY;
      ticking.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Find the active index for the sliding pill
  const activeIndex = ITEMS.findIndex((item) => {
    if (item.id === "more") return isMoreOpen;
    return activePage === item.id && !isMoreOpen;
  });

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
      className={cn(
        "floating-nav-root",
        scrollHidden && "floating-nav-hidden"
      )}
    >
      <div className="floating-nav-pill">
        {/* Subtle gold shimmer line at the top */}
        <div className="floating-nav-shimmer" aria-hidden="true" />

        {/* Sliding active pill background */}
        {activeIndex >= 0 && (
          <span
            className="floating-nav-active-pill"
            aria-hidden="true"
            style={{
              transform: `translateX(${activeIndex * 100}%)`,
            }}
          />
        )}

        {/* Navigation items */}
        {ITEMS.map((item, index) => {
          const isMore = item.id === "more";
          const isActive = isMore
            ? isMoreOpen
            : activePage === item.id && !isMoreOpen;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item.id)}
              aria-label={`${item.labelEn} — ${item.labelAr}`}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "floating-nav-btn",
                isActive && "floating-nav-btn-active"
              )}
            >
              <span className="floating-nav-icon-wrap">
                <Icon
                  size={20}
                  strokeWidth={isActive ? 2.3 : 1.8}
                  className={cn(
                    "floating-nav-icon",
                    isActive && "floating-nav-icon-active"
                  )}
                />
              </span>
              {/* Label — only visible when active */}
              <span
                className={cn(
                  "floating-nav-label",
                  isActive
                    ? "floating-nav-label-visible"
                    : "floating-nav-label-hidden"
                )}
              >
                {item.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
