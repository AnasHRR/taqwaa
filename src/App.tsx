import { useState, useEffect, useCallback } from "react";
import { Header, type Page } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { MoreSheet } from "./components/MoreSheet";
import { Footer } from "./components/Footer";
import { CrescentMoon } from "./components/CrescentMoon";
import { SEOHead } from "./components/SEOHead";
import { HomePage } from "./pages/HomePage";
import { QuranPage } from "./pages/QuranPage";
import { SalaatPage } from "./pages/SalaatPage";
import { DuaPage } from "./pages/DuaPage";
import { AboutPage } from "./pages/AboutPage";
import { MOROCCAN_CITIES } from "./constants";
import { PAGE_SEO } from "./utils/seo";
import type { City } from "./types";

function getPageFromPath(pathname: string): Page {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  if (cleanPath === "/salaat" || cleanPath === "/prayer-times") return "salaat";
  if (cleanPath === "/quran") return "quran";
  if (cleanPath === "/dua" || cleanPath === "/azkar") return "dua";
  if (cleanPath === "/about" || cleanPath === "/contact") return "about";
  return "home";
}

function getPathFromPage(page: Page): string {
  if (page === "home") return "/";
  return `/${page}`;
}

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onFinish, 500);
    }, 1200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white ${
        exiting ? "splash-exit" : ""
      }`}
      role="status"
      aria-label="Taqwaa is loading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 30%, rgba(201,162,39,0.12) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="animate-bounce-in">
        <CrescentMoon className="h-20 w-20 sm:h-24 sm:w-24 drop-shadow-[0_16px_36px_rgba(201,162,39,0.45)]" />
      </div>
      <h1
        className="font-quran mt-5 text-4xl sm:text-5xl font-bold text-gradient-gold animate-fade-in"
        style={{ animationDelay: "200ms" }}
      >
        تقوى
      </h1>
      <p
        className="mt-1.5 text-[10px] sm:text-xs font-extrabold tracking-[0.4em] text-gold-700 uppercase animate-fade-in"
        style={{ animationDelay: "320ms" }}
      >
        Taqwaa
      </p>
      <div
        className="mt-7 h-7 w-7 animate-spin rounded-full border-2 border-gold-200 border-t-gold-500"
        style={{ animationDelay: "100ms" }}
        aria-hidden="true"
      />
    </div>
  );
}

export function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activePage, setActivePage] = useState<Page>(() => {
    if (typeof window !== "undefined") {
      return getPageFromPath(window.location.pathname);
    }
    return "home";
  });
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [pageKey, setPageKey] = useState(0);

  const [selectedCity, setSelectedCity] = useState<City>(() => {
    try {
      const saved = localStorage.getItem("taqwaa-city");
      if (saved) {
        const parsed = JSON.parse(saved);
        const match = MOROCCAN_CITIES.find((c) => c.name === parsed.name);
        if (match) return match;
      }
    } catch {
      /* ignore */
    }
    return MOROCCAN_CITIES[0];
  });

  // Synchronize browser history / URL with active page
  useEffect(() => {
    const handlePopState = () => {
      const page = getPageFromPath(window.location.pathname);
      setActivePage(page);
      setPageKey((k) => k + 1);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleSelectCity = (city: City) => {
    setSelectedCity(city);
    try {
      localStorage.setItem("taqwaa-city", JSON.stringify(city));
    } catch {
      /* ignore */
    }
  };

  const handleNavigate = useCallback(
    (page: Page) => {
      setIsMoreOpen(false);
      if (page !== activePage) {
        const targetPath = getPathFromPage(page);
        if (window.location.pathname !== targetPath) {
          window.history.pushState({ page }, "", targetPath);
        }
        setActivePage(page);
        setPageKey((k) => k + 1);
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    },
    [activePage]
  );

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return (
          <HomePage
            onNavigate={handleNavigate}
            selectedCity={selectedCity}
            onSelectCity={handleSelectCity}
          />
        );
      case "quran":
        return <QuranPage />;
      case "salaat":
        return <SalaatPage />;
      case "dua":
        return <DuaPage />;
      case "about":
        return <AboutPage onNavigate={handleNavigate} />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            selectedCity={selectedCity}
            onSelectCity={handleSelectCity}
          />
        );
    }
  };

  return (
    <div className="relative min-h-[100dvh] flex flex-col justify-between">
      {/* SEO Head Management */}
      <SEOHead seo={PAGE_SEO[activePage] || PAGE_SEO.home} />

      {/* Ambient background */}
      <div className="bg-app-canvas pointer-events-none fixed inset-0" aria-hidden="true" />

      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Top Header (Mobile Simplified / Desktop Full) */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenMore={() => setIsMoreOpen(true)}
      />

      {/* Main Content with Mobile Bottom Nav Safe Padding */}
      <main
        key={pageKey}
        id="main-content"
        className="relative z-10 flex-1 min-h-[65dvh] pt-[60px] sm:pt-[68px] pb-mobile-nav"
      >
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modern Fixed Bottom Navigation Bar (Mobile only, < 768px) */}
      <BottomNav
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenMore={() => setIsMoreOpen(true)}
        isMoreOpen={isMoreOpen}
      />

      {/* Mobile "More" Drawer / Bottom Sheet */}
      <MoreSheet
        isOpen={isMoreOpen}
        onClose={() => setIsMoreOpen(false)}
        onNavigate={handleNavigate}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
      />
    </div>
  );
}
