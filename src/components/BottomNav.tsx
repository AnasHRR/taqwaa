import { useEffect, useRef, useState, useCallback } from "react";
import { BookOpen, Compass, Heart, Home, MoreHorizontal } from "lucide-react";
import type { Page } from "./Header";
import { useTranslation } from "../i18n";
import { cn } from "../utils/cn";

export interface BottomNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  onOpenMore: () => void;
  isMoreOpen?: boolean;
}

export function BottomNav({
  activePage,
  onNavigate,
  onOpenMore,
  isMoreOpen = false,
}: BottomNavProps) {
  const { t } = useTranslation();
  const [scrollHidden, setScrollHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const items = [
    { id: "home" as const, label: t("nav.home"), icon: Home },
    { id: "quran" as const, label: t("nav.quran"), icon: BookOpen },
    { id: "salaat" as const, label: t("nav.prayer"), icon: Compass },
    { id: "dua" as const, label: t("nav.azkar"), icon: Heart },
    { id: "more" as const, label: t("nav.more"), icon: MoreHorizontal },
  ];

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
  const activeIndex = items.findIndex((item) => {
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

  // Compute inset-inline-start offset for the active pill (works in both LTR and RTL)
  // Each item takes 20% of the pill width (1/5), plus 6px padding on each side
  const pillItemWidthPercent = 100 / 5; // 20%
  const pillOffsetPercent = activeIndex * pillItemWidthPercent;

  return (
    <nav
      aria-label={t("nav.more")}
      className={cn(
        "floating-nav-root",
        scrollHidden && "floating-nav-hidden"
      )}
    >
      <div className="floating-nav-pill">
        {/* Subtle gold shimmer line at the top */}
        <div className="floating-nav-shimmer" aria-hidden="true" />

        {/* Sliding active pill background - uses inset-inline-start for RTL support */}
        {activeIndex >= 0 && (
          <span
            className="floating-nav-active-pill"
            aria-hidden="true"
            style={{
              insetInlineStart: `calc(${pillOffsetPercent}% + 6px)`,
            }}
          />
        )}

        {/* Navigation items */}
        {items.map((item) => {
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
              aria-label={item.label}
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
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
