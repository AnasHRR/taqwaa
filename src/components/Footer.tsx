import { BookOpen, Compass, Heart, Home, Info, Mail, Moon } from "lucide-react";
import { IslamicPattern } from "./IslamicPattern";
import type { Page } from "./Header";

const NAV_LINKS: { id: Page; labelAr: string; labelEn: string }[] = [
  { id: "home", labelAr: "الرئيسية", labelEn: "Home" },
  { id: "quran", labelAr: "القرآن الكريم", labelEn: "Quran" },
  { id: "salaat", labelAr: "مواقيت الصلاة", labelEn: "Prayer Times" },
  { id: "dua", labelAr: "الأذكار والدعاء", labelEn: "Azkar" },
  { id: "about", labelAr: "حول تقوى", labelEn: "About" },
];

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative mt-20 overflow-hidden bg-ink-950 text-white/70">
      {/* decorative layers */}
      <IslamicPattern className="pointer-events-none absolute inset-0 h-full w-full" color="#C9A227" opacity={0.07} />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,162,39,0.7), transparent)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[520px] max-w-full -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-gold-500/30 bg-gradient-to-br from-gold-500/15 to-transparent">
                <Moon size={20} className="text-gold-400" strokeWidth={1.6} />
              </span>
              <div className="leading-none">
                <span className="font-quran text-2xl font-bold text-gradient-gold-light">تقوى</span>
                <span className="mt-1 block text-[9px] font-extrabold uppercase tracking-[0.34em] text-gold-500">
                  Taqwaa
                </span>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              منصّة إسلامية هادئة تجمع مواقيت الصلاة، القرآن الكريم، والأذكار في مكان واحد —
              <span className="text-gold-300"> رحلتك نحو الإيمان والمعرفة</span>.
            </p>
            <a
              href="mailto:contact@taqwaa.app"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2 text-xs font-semibold text-white/70 transition-colors hover:border-gold-500/40 hover:text-gold-300"
            >
              <Mail size={14} />
              contact@taqwaa.app
            </a>
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <h3 className="font-arabic text-sm font-bold text-gold-400">تصفّح</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => onNavigate(l.id)}
                    className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold-300 cursor-pointer"
                  >
                    <span className="h-px w-3 bg-gold-500/40 transition-all group-hover:w-5 group-hover:bg-gold-400" aria-hidden="true" />
                    {l.labelAr}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources */}
          <div>
            <h3 className="font-arabic text-sm font-bold text-gold-400">مصادر إسلامية</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.slice(0, 4).map((l) => (
                <li key={l.labelEn}>
                  <button
                    onClick={() => onNavigate(l.id)}
                    className="flex items-center gap-2 text-start text-sm text-white/60 transition-colors hover:text-gold-300 cursor-pointer"
                  >
                    {l.labelEn === "Quran" && <BookOpen size={13} className="text-gold-600" />}
                    {l.labelEn === "Prayer Times" && <Compass size={13} className="text-gold-600" />}
                    {l.labelEn === "Azkar" && <Heart size={13} className="text-gold-600" />}
                    {l.labelEn === "Home" && <Home size={13} className="text-gold-600" />}
                    {l.labelEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-arabic text-sm font-bold text-gold-400">معلومات</h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-gold-300 cursor-pointer"
                >
                  <Info size={13} className="text-gold-600" />
                  About & Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="text-sm text-white/60 transition-colors hover:text-gold-300 cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="text-sm text-white/60 transition-colors hover:text-gold-300 cursor-pointer"
                >
                  Terms of Use
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/8 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-start">
            <p className="text-xs text-white/45">
              © {new Date().getFullYear()} <span className="font-semibold text-gold-400">Taqwaa</span> — جميع الحقوق محفوظة
            </p>
            <p className="flex items-center gap-2 text-xs text-white/45">
              صُنع بِمحبّة في المملكة المغربية
              <span className="inline-flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-red-500 to-red-700" aria-hidden="true" />
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-green-600 to-emerald-800" aria-hidden="true" />
              </span>
              <span className="text-white/65">
                Powered by <span className="font-semibold text-gold-400">Anas Lagziri</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
