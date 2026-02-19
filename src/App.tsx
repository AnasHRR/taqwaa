import { useState } from "react";
import { Navbar, Page } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { QuranPage } from "./pages/QuranPage";
import { SalaatPage } from "./pages/SalaatPage";
import { DuaPage } from "./pages/DuaPage";
import { CrescentMoon } from "./components/CrescentMoon";

export function App() {
  const [activePage, setActivePage] = useState<Page>("home");

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage />;
      case "quran":
        return <QuranPage />;
      case "salaat":
        return <SalaatPage />;
      case "dua":
        return <DuaPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-midnight-950 bg-islamic-pattern relative overflow-x-hidden">
      {/* Stars background */}
      <div className="fixed inset-0 bg-stars pointer-events-none" />
      {/* Geometric overlay */}
      <div className="fixed inset-0 geometric-overlay pointer-events-none" />

      {/* Navbar */}
      <Navbar activePage={activePage} onNavigate={setActivePage} />

      {/* Page Content */}
      <main className="relative z-10 pb-20 sm:pb-6">
        {renderPage()}
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="relative border-t border-midnight-800/50 pb-20 sm:pb-0">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
        <div className="max-w-xl mx-auto px-4 py-5">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <CrescentMoon className="w-5 h-5 opacity-60" />
              <span className="text-gold-400/80 font-[Amiri] text-base font-bold">
                تقوى
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 py-1">
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-red-700 border border-red-400/30" />
              <span className="text-midnight-400 text-[10px] tracking-widest uppercase">المملكة المغربية</span>
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-500 to-green-700 border border-green-400/30" />
            </div>
            <p className="text-midnight-500 text-[10px] text-center leading-relaxed max-w-xs">
              مواقيت الصلاة محسوبة وفق وزارة الأوقاف والشؤون الإسلامية
            </p>
            <div className="flex items-center gap-2 text-midnight-600 text-[9px]">
              <span>API: aladhan.com</span>
              <span>•</span>
              <span>Method: Morocco</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
