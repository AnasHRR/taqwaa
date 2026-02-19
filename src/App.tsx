import { useState, useEffect } from "react";
import { Moon, Star } from "lucide-react";
import { Navbar, type Page } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { QuranPage } from "./pages/QuranPage";
import { SalaatPage } from "./pages/SalaatPage";
import { DuaPage } from "./pages/DuaPage";

function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onFinish, 600);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark-950 ${exiting ? "splash-exit" : ""}`}>
      <div className="absolute inset-0 bg-ambient pointer-events-none" />
      <div className="absolute inset-0 bg-stars pointer-events-none opacity-60" />

      <div className="relative animate-bounce-in">
        <div className="w-28 h-28 rounded-[32px] bg-gradient-to-br from-gold-600/15 to-gold-700/5 flex items-center justify-center border border-gold-500/10 shadow-2xl shadow-gold-500/10">
          <Moon size={52} className="text-gold-400" strokeWidth={1.5} />
        </div>
        <Star size={14} className="text-gold-400 absolute -top-2 -right-2 animate-pulse-soft" fill="currentColor" />
      </div>

      <h1 className="text-5xl font-bold font-[Amiri] text-gradient-gold mt-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
        تقوى
      </h1>
      <p className="text-dark-300 text-sm mt-2 tracking-[0.3em] uppercase animate-fade-in" style={{ animationDelay: "500ms" }}>
        Taqwaa
      </p>
      <p className="text-dark-400 text-xs mt-1 animate-fade-in" style={{ animationDelay: "700ms" }}>
        مواقيت الصلاة بالمغرب
      </p>

      <div className="mt-10 animate-fade-in" style={{ animationDelay: "900ms" }}>
        <div className="w-8 h-8 border-2 border-gold-500/20 border-t-gold-400 rounded-full animate-spin" />
      </div>
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
    }
  };

  const renderPage = () => {
    switch (activePage) {
      case "home": return <HomePage />;
      case "quran": return <QuranPage />;
      case "salaat": return <SalaatPage />;
      case "dua": return <DuaPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-dark-950 bg-app relative">
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      {/* Background layers */}
      <div className="fixed inset-0 bg-ambient pointer-events-none" />
      <div className="fixed inset-0 bg-stars pointer-events-none opacity-30" />

      {/* Navigation */}
      <Navbar activePage={activePage} onNavigate={handleNavigate} />

      {/* Main content area — responsive offsets */}
      <main
        key={pageKey}
        className="
          relative z-10 animate-page-enter
          pb-[85px] md:pb-0
          md:pt-16 lg:pt-0
          lg:pl-[240px]
        "
      >
        <div className="max-w-6xl mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
