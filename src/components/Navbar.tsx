import React from "react";
import { CrescentMoon } from "./CrescentMoon";

export type Page = "home" | "quran" | "salaat" | "dua";

interface NavItem {
  id: Page;
  label: string;
  labelAr: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    label: "Accueil",
    labelAr: "الرئيسية",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z" />
      </svg>
    ),
  },
  {
    id: "quran",
    label: "Quran",
    labelAr: "القرآن",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: "salaat",
    label: "Salaat",
    labelAr: "الصلاة",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m-8-9H3m18 0h-1M5.636 5.636l.707.707m11.314 11.314l.707.707M5.636 18.364l.707-.707m11.314-11.314l.707-.707" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    id: "dua",
    label: "Dua",
    labelAr: "الدعاء",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
];

interface NavbarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

export function Navbar({ activePage, onNavigate }: NavbarProps) {
  return (
    <>
      {/* Desktop / Top Navbar */}
      <nav className="navbar-glass sticky top-0 z-50 border-b border-midnight-700/40">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <CrescentMoon className="w-7 h-7 crescent-shadow" />
              <span className="text-xl font-bold font-[Amiri] text-gradient-gold hidden sm:inline">
                تقوى
              </span>
            </div>

            {/* Nav Items - Desktop */}
            <div className="hidden sm:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`nav-item-desktop group relative flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 cursor-pointer
                      ${isActive
                        ? "nav-item-active text-gold-400"
                        : "text-midnight-300 hover:text-white hover:bg-midnight-700/30"
                      }`}
                  >
                    <span className={`transition-colors duration-300 ${isActive ? "text-gold-400" : "text-midnight-400 group-hover:text-white"}`}>
                      {item.icon}
                    </span>
                    <span className="text-sm font-semibold">{item.labelAr}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right side - decorative */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[10px] text-midnight-500 tracking-wider uppercase">المغرب</span>
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-green-500 to-green-700 border border-green-400/30" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 navbar-mobile-glass border-t border-midnight-700/40">
        <div className="flex items-center justify-around px-2 py-1 safe-area-bottom">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-0.5 py-2 px-3 rounded-xl transition-all duration-300 cursor-pointer min-w-[60px]
                  ${isActive
                    ? "nav-mobile-active"
                    : "text-midnight-400 hover:text-midnight-200"
                  }`}
              >
                <span className={`transition-all duration-300 ${isActive ? "text-gold-400 scale-110" : ""}`}>
                  {item.icon}
                </span>
                <span className={`text-[10px] font-semibold transition-colors duration-300 ${isActive ? "text-gold-400" : ""}`}>
                  {item.labelAr}
                </span>
                {isActive && (
                  <div className="absolute top-0 w-6 h-0.5 bg-gradient-to-r from-gold-500 to-gold-400 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
