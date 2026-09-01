import { useEffect } from "react";
import {
  BookOpen, Compass, Globe, Info,
  Mail, MapPin, Smartphone, Sparkles, X, ShieldCheck
} from "lucide-react";
import type { Page } from "./Header";
import { CrescentMoon } from "./CrescentMoon";
import { LanguageSelector } from "./LanguageSelector";
import { DownloadButton } from "./DownloadButton";
import { MOROCCAN_CITIES } from "../constants";
import { APP_VERSION } from "../constants/app";
import { useTranslation } from "../i18n";
import type { City } from "../types";
import { cn } from "../utils/cn";

interface MoreSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
  selectedCity?: City;
  onSelectCity?: (city: City) => void;
}

export function MoreSheet({
  isOpen,
  onClose,
  onNavigate,
  selectedCity,
  onSelectCity,
}: MoreSheetProps) {
  const { t, isRTL, language } = useTranslation();

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigateTo = (p: Page) => {
    onNavigate(p);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] block md:hidden" role="dialog" aria-modal="true" aria-label={t("nav.more")}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink-950/50 backdrop-blur-sm animate-fade-in transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-up sheet */}
      <div className="safe-bottom fixed bottom-0 inset-x-0 z-[85] max-h-[88dvh] flex flex-col rounded-t-[28px] border-t border-gold-500/30 bg-white shadow-2xl animate-slide-up overflow-hidden">
        {/* Grab handle */}
        <div className="flex items-center justify-center pt-3 pb-1" aria-hidden="true">
          <span className="h-1.5 w-12 rounded-full bg-ink-200" />
        </div>

        {/* Sheet Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-ink-100">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-50 text-gold-700 border border-gold-500/20">
              <CrescentMoon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-ink-900 leading-tight">
                {t("nav.more")} · {t("common.appName")}
              </h2>
              <p className="text-[10px] font-semibold text-ink-500 uppercase tracking-wider">
                {t("common.tagline")}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label={t("common.close")}
            className="icon-btn h-9 w-9 rounded-full bg-ink-50 text-ink-600 hover:bg-ink-100"
          >
            <X size={17} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 text-start">
          {/* Language Selector Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-xs font-bold text-gold-800">
                <Globe size={14} className="text-gold-600" />
                {t("common.language")} · {t("common.selectLanguage")}
              </span>
              <span className="text-[10px] font-bold text-ink-400 uppercase tracking-wider">
                FR · EN · AR
              </span>
            </div>
            <LanguageSelector variant="sheet-list" />
          </div>

          <div className="divider-gold opacity-50" />

          {/* Quick Moroccan City Bar */}
          {onSelectCity && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="flex items-center gap-1.5 text-xs font-bold text-gold-800">
                  <MapPin size={13} className="text-gold-600" />
                  {t("common.currentCity")}
                </span>
                <span className="text-[10px] text-ink-400 font-medium">{t("common.morocco")}</span>
              </div>
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {MOROCCAN_CITIES.slice(0, 8).map((city) => {
                  const isSelected = selectedCity?.name === city.name;
                  const cityName = language === "ar" ? city.nameAr : city.name;
                  return (
                    <button
                      key={city.name}
                      onClick={() => onSelectCity(city)}
                      className={cn(
                        "chip !py-1.5 !px-3 !text-[11.5px] shrink-0",
                        isSelected && "chip-active font-bold"
                      )}
                    >
                      {cityName}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Access Menu Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => navigateTo("about")}
              className="card card-hover flex flex-col items-start p-3.5 text-start border-ink-200/80 bg-gold-50/40"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gold-100 text-gold-700 mb-2">
                <Info size={16} />
              </span>
              <span className="text-sm font-bold text-ink-900">{t("nav.about")}</span>
              <span className="text-[10px] text-ink-500 mt-0.5">{t("about.tagline")}</span>
            </button>

            <button
              onClick={() => navigateTo("salaat")}
              className="card card-hover flex flex-col items-start p-3.5 text-start border-ink-200/80 bg-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gold-100 text-gold-700 mb-2">
                <Compass size={16} />
              </span>
              <span className="text-sm font-bold text-ink-900">{t("prayerGuide.title")}</span>
              <span className="text-[10px] text-ink-500 mt-0.5">{t("nav.prayer")}</span>
            </button>

            <button
              onClick={() => navigateTo("dua")}
              className="card card-hover flex flex-col items-start p-3.5 text-start border-ink-200/80 bg-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gold-100 text-gold-700 mb-2">
                <Sparkles size={16} />
              </span>
              <span className="text-sm font-bold text-ink-900">{t("azkar.tasbeehTitle")}</span>
              <span className="text-[10px] text-ink-500 mt-0.5">{t("nav.azkar")}</span>
            </button>

            <button
              onClick={() => navigateTo("quran")}
              className="card card-hover flex flex-col items-start p-3.5 text-start border-ink-200/80 bg-white"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gold-100 text-gold-700 mb-2">
                <BookOpen size={16} />
              </span>
              <span className="text-sm font-bold text-ink-900">{t("quran.title")}</span>
              <span className="text-[10px] text-ink-500 mt-0.5">114 {t("hero.statsSurahs")}</span>
            </button>
          </div>

          {/* Download Android App Section */}
          <div className="divider-gold opacity-50" />
          <div className="pt-2">
            <div className="flex items-center justify-between mb-3">
              <span className="flex items-center gap-1.5 text-xs font-bold text-gold-800">
                <Smartphone size={13} className="text-gold-600" />
                {t("download.cardTitle")}
              </span>
              <span className="text-[10px] font-bold text-ink-400 uppercase tracking-wider">
                {t("download.versionLabel")} {APP_VERSION}
              </span>
            </div>
            <DownloadButton variant="sheet" />
            <p className="mt-2 text-center text-[11px] text-ink-500">
              {t("download.officialApk")}
            </p>
          </div>

          {/* Privacy & Contact Banner */}
          <div className="card-beige p-4 rounded-2xl">
            <div className="flex items-center gap-2 mb-1.5">
              <ShieldCheck size={16} className="text-gold-700" />
              <span className="text-xs font-bold text-gold-900">{t("common.privacySecurity")}</span>
            </div>
            <p className="text-xs text-ink-600 leading-relaxed">
              {t("common.privacyNote")}
            </p>
          </div>

          {/* Email button */}
          <a
            href="mailto:contact@taqwaa.app"
            className="btn btn-secondary w-full !py-2.5 !text-xs !justify-center !rounded-xl"
          >
            <Mail size={14} className="text-gold-600" />
            <span>{t("common.contactUs")} · contact@taqwaa.app</span>
          </a>

          {/* Footer note */}
          <p className="text-center text-[11px] text-ink-400 pb-2">
            {t("common.madeWithLove")} · {t("common.appName")}
          </p>
        </div>
      </div>
    </div>
  );
}
