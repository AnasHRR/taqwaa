import { useState, useEffect } from "react";
import { Header, type Page } from "./components/Header";
import { Footer } from "./components/Footer";
import { CrescentMoon } from "./components/CrescentMoon";
import { HomePage } from "./pages/HomePage";
import { QuranPage } from "./pages/QuranPage";
import { SalaatPage } from "./pages/SalaatPage";
import { DuaPage } from "./pages/DuaPage";
import { AboutPage } from "./pages/AboutPage";

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onFinish, 550);
    }, 1700);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white ${exiting ? "splash-exit" : ""}`}
      role="status"
      aria-label="Taqwaa is loading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 30%, rgba(201,162,39,0.10) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="animate-bounce-in">
        <CrescentMoon className="h-24 w-24 drop-shadow-[0_16px_36px_rgba(201,162,39,0.45)]" />
      </div>
      <h1 className="font-quran mt-6 text-5xl font-bold text-gradient-gold animate-fade-in" style={{ animationDelay: "250ms" }}>
        تقوى
      </h1>
      <p className="mt-2 text-xs font-extrabold tracking-[0.4em] text-gold-700 uppercase animate-fade-in" style={{ animationDelay: "400ms" }}>
        Taqwaa
      </p>
      <div className="mt-9 h-8 w-8 animate-spin rounded-full border-2 border-gold-200 border-t-gold-500" style={{ animationDelay: "100ms" }} aria-hidden="true" />
    </div>
  );
}

export function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activePage, setActivePage] = useState<Page>("home");
  const [pageKey, setPageKey] = useState(0);

  const handleNavigate = (page: Page) => {
    if (page !== activePage) {
      setActivePage(page);
      setPageKey((k) => k + 1);
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case "home": return <HomePage onNavigate={handleNavigate} />;
      case "quran": return <QuranPage />;
      case "salaat": return <SalaatPage />;
      case "dua": return <DuaPage />;
      case "about": return <AboutPage onNavigate={handleNavigate} />;
      default: return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="relative min-h-[100dvh]">
      {/* Ambient background */}
      <div className="bg-app-canvas pointer-events-none fixed inset-0" aria-hidden="true" />

      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      <Header activePage={activePage} onNavigate={handleNavigate} />

      <main key={pageKey} className="relative z-10 min-h-[70dvh] pt-[72px]">
        {renderPage()}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
