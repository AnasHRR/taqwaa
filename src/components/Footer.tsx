import { BookOpen, Compass, Heart, Home, Info, Mail, Moon } from "lucide-react";
import { IslamicPattern } from "./IslamicPattern";
import type { Page } from "./Header";
import { useTranslation } from "../i18n";

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { t, isRTL } = useTranslation();

  const navLinks: { id: Page; label: string }[] = [
    { id: "home", label: t("nav.home") },
    { id: "quran", label: t("nav.quran") },
    { id: "salaat", label: t("nav.prayer") },
    { id: "dua", label: t("nav.azkar") },
    { id: "about", label: t("nav.about") },
  ];

  return (
    <footer className="relative mt-14 sm:mt-20 overflow-hidden bg-ink-950 text-white/70 pb-[calc(86px+env(safe-area-inset-bottom,0px))] md:pb-12">
      {/* Decorative layers */}
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

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:py-14 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-gold-500/30 bg-gradient-to-br from-gold-500/15 to-transparent">
                <Moon size={18} className="text-gold-400" strokeWidth={1.6} />
              </span>
              <div className="leading-none">
                <span className="font-quran text-2xl font-bold text-gradient-gold-light">
                  {t("common.appNameAr")}
                </span>
                <span className="mt-1 block text-[8.5px] sm:text-[9px] font-extrabold uppercase tracking-[0.34em] text-gold-500">
                  {t("common.appName")}
                </span>
              </div>
            </div>
            <p className="mt-3 sm:mt-4 max-w-sm text-xs sm:text-sm leading-relaxed text-white/55">
              {t("footer.brandDesc")}
            </p>
            <a
              href="mailto:contact@taqwaa.app"
              className="mt-4 sm:mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-white/70 transition-colors hover:border-gold-500/40 hover:text-gold-300"
            >
              <Mail size={13} />
              contact@taqwaa.app
            </a>
          </div>

          {/* Browse Navigation */}
          <nav aria-label={t("footer.browse")}>
            <h3 className="text-xs sm:text-sm font-bold text-gold-400">{t("footer.browse")}</h3>
            <ul className="mt-3 sm:mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => onNavigate(l.id)}
                    className="group flex items-center gap-2 text-xs sm:text-sm text-white/60 transition-colors hover:text-gold-300 cursor-pointer"
                  >
                    <span className="h-px w-2.5 bg-gold-500/40 transition-all group-hover:w-4 group-hover:bg-gold-400" aria-hidden="true" />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Islamic Resources */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gold-400">{t("footer.resources")}</h3>
            <ul className="mt-3 sm:mt-4 space-y-2">
              <li>
                <button
                  onClick={() => onNavigate("quran")}
                  className="flex items-center gap-1.5 text-xs sm:text-sm text-white/60 transition-colors hover:text-gold-300 cursor-pointer"
                >
                  <BookOpen size={12} className="text-gold-600" />
                  {t("nav.quran")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("salaat")}
                  className="flex items-center gap-1.5 text-xs sm:text-sm text-white/60 transition-colors hover:text-gold-300 cursor-pointer"
                >
                  <Compass size={12} className="text-gold-600" />
                  {t("nav.prayer")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("dua")}
                  className="flex items-center gap-1.5 text-xs sm:text-sm text-white/60 transition-colors hover:text-gold-300 cursor-pointer"
                >
                  <Heart size={12} className="text-gold-600" />
                  {t("nav.azkar")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="flex items-center gap-1.5 text-xs sm:text-sm text-white/60 transition-colors hover:text-gold-300 cursor-pointer"
                >
                  <Home size={12} className="text-gold-600" />
                  {t("nav.home")}
                </button>
              </li>
            </ul>
          </div>

          {/* Information & Legal */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-gold-400">{t("footer.info")}</h3>
            <ul className="mt-3 sm:mt-4 space-y-2">
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="flex items-center gap-1.5 text-xs sm:text-sm text-white/60 transition-colors hover:text-gold-300 cursor-pointer"
                >
                  <Info size={12} className="text-gold-600" />
                  {t("footer.aboutContact")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="text-xs sm:text-sm text-white/60 transition-colors hover:text-gold-300 cursor-pointer"
                >
                  {t("footer.privacyPolicy")}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("about")}
                  className="text-xs sm:text-sm text-white/60 transition-colors hover:text-gold-300 cursor-pointer"
                >
                  {t("footer.termsOfUse")}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 sm:mt-12 border-t border-white/8 pt-5 sm:pt-6">
          <div className="flex flex-col items-center justify-between gap-2.5 text-center sm:flex-row">
            <p className="text-[11px] sm:text-xs text-white/45">
              © {new Date().getFullYear()} <span className="font-semibold text-gold-400">{t("common.appName")}</span> — {t("common.allRightsReserved")}
            </p>
            <p className="flex items-center gap-1.5 text-[11px] sm:text-xs text-white/45">
              {t("common.madeWithLove")}
              <span className="text-white/65">
                · {t("common.developer")} <span className="font-semibold text-gold-400">Anas Lagziri</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
