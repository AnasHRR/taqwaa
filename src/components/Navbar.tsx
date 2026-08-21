import { Home, BookOpen, Moon, Heart, Compass } from "lucide-react";
import type { ReactNode } from "react";

export type Page = "home" | "quran" | "salaat" | "dua";

interface NavItem {
  id: Page;
  labelAr: string;
  labelEn: string;
  icon: (active: boolean) => ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: "home",
    labelAr: "الرئيسية",
    labelEn: "Home",
    icon: (active) => <Home size={22} strokeWidth={active ? 2.4 : 1.8} />,
  },
  {
    id: "quran",
    labelAr: "القرآن",
    labelEn: "Quran",
    icon: (active) => <BookOpen size={22} strokeWidth={active ? 2.4 : 1.8} />,
  },
  {
    id: "salaat",
    labelAr: "الصلاة",
    labelEn: "Salaat",
    icon: (active) => <Compass size={22} strokeWidth={active ? 2.4 : 1.8} />,
  },
  {
    id: "dua",
    labelAr: "الدعاء",
    labelEn: "Dua",
    icon: (active) => <Heart size={22} strokeWidth={active ? 2.4 : 1.8} fill={active ? "currentColor" : "none"} />,
  },
];

interface NavbarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

export function Navbar({ activePage, onNavigate }: NavbarProps) {
  return (
    <>
      {/* ===== DESKTOP SIDEBAR (lg+) ===== */}
      <aside className="hidden lg:flex fixed top-0 left-0 bottom-0 w-[240px] z-50 sidebar flex-col">
        {/* Logo */}
        <div className="px-6 py-8 flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gold-500/15 to-gold-600/5 flex items-center justify-center border border-gold-500/10">
            <Moon size={22} className="text-gold-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold font-[Amiri] text-gradient-gold leading-tight">تقوى</h1>
            <span className="text-dark-200 text-[9px] tracking-[0.2em] uppercase">Taqwaa</span>
          </div>
        </div>

        <div className="divider-gold mx-6 mb-4" />

        {/* Nav items */}
        <nav className="flex-1 px-4 space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`sidebar-item w-full ${isActive ? "sidebar-item-active" : ""}`}
              >
                <span className={isActive ? "text-gold-400" : "text-dark-400"}>
                  {item.icon(isActive)}
                </span>
                <div className="flex flex-col">
                  <span className={`text-[13px] font-[Cairo] ${isActive ? "text-gold-400 font-bold" : "text-dark-300"}`}>
                    {item.labelAr}
                  </span>
                  <span className={`text-[9px] ${isActive ? "text-gold-500/60" : "text-dark-600"}`}>
                    {item.labelEn}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-6 py-6">
          <div className="divider-gold mb-4" />
          <div className="flex items-center gap-2 justify-center">
            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-red-500 to-red-700" />
            <span className="text-dark-200 text-[9px] tracking-[0.12em]">المملكة المغربية</span>
            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-green-700" />
          </div>
          <p className="text-dark-200 text-[8px] text-center mt-2">Powered by : <span className="text-gold-500">Anas Lagziri</span></p>
        </div>
      </aside>

      {/* ===== TABLET TOP BAR (md-lg) ===== */}
      <header className="hidden md:flex lg:hidden fixed top-0 left-0 right-0 z-50 desktop-topbar h-16 items-center px-6 justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-500/15 to-gold-600/5 flex items-center justify-center border border-gold-500/10">
            <Moon size={18} className="text-gold-400" />
          </div>
          <h1 className="text-xl font-bold font-[Amiri] text-gradient-gold">تقوى</h1>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl transition-all cursor-pointer
                  ${isActive
                    ? "bg-gold-500/8 text-gold-400 border border-gold-500/15"
                    : "text-dark-400 border border-transparent hover:bg-dark-800/50 hover:text-dark-200"
                  }`}
              >
                {item.icon(isActive)}
                <span className={`text-[13px] ${isActive ? "font-bold" : "font-medium"}`}>
                  {item.labelAr}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Morocco flag */}
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-red-500 to-red-700" />
          <div className="w-2 h-2 rounded-full bg-gradient-to-br from-green-500 to-green-700" />
        </div>
      </header>

      {/* ===== MOBILE BOTTOM TAB BAR (< md) ===== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 tab-bar safe-bottom">
        <div className="flex items-center justify-around px-2 py-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`tab-item cursor-pointer ${isActive ? "tab-item-active" : ""}`}
              >
                <span className={`tab-icon ${isActive ? "text-gold-400" : "text-dark-400"}`}>
                  {item.icon(isActive)}
                </span>
                <span className={`tab-label ${isActive ? "text-gold-400 font-bold" : "text-dark-500"}`}>
                  {item.labelAr}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
