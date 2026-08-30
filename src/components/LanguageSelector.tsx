import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLanguage, LANGUAGES, type Language } from "../i18n";
import { cn } from "../utils/cn";

interface LanguageSelectorProps {
  variant?: "desktop-header" | "mobile-header" | "sheet-list";
  className?: string;
  onLanguageChange?: (lang: Language) => void;
}

const LANGUAGE_LIST: Array<{
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
}> = [
  { code: "fr", name: "Français", nativeName: "Français", flag: "🇫🇷" },
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇲🇦" },
];

export function LanguageSelector({
  variant = "desktop-header",
  className,
  onLanguageChange,
}: LanguageSelectorProps) {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (langCode: Language) => {
    setLanguage(langCode);
    setIsOpen(false);
    if (onLanguageChange) {
      onLanguageChange(langCode);
    }
  };

  const currentLang = LANGUAGES[language];

  /* =========================================================================
     1. SHEET LIST VARIANT (MoreSheet drawer: More → Settings → Language)
     ========================================================================= */
  if (variant === "sheet-list") {
    return (
      <div className={cn("space-y-1.5", className)} role="radiogroup" aria-label={t("common.selectLanguage")}>
        {LANGUAGE_LIST.map((item) => {
          const isSelected = language === item.code;
          return (
            <button
              key={item.code}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleSelect(item.code)}
              className={cn(
                "group flex w-full cursor-pointer items-center justify-between rounded-2xl border p-3 text-start transition-all duration-200",
                isSelected
                  ? "border-gold-500/50 bg-gradient-to-r from-gold-50/80 via-white to-gold-50/40 shadow-xs"
                  : "border-ink-200/80 bg-white hover:border-gold-400/40 hover:bg-gold-50/20"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-100 bg-white text-xl shadow-xs transition-transform duration-200 group-hover:scale-105"
                  aria-hidden="true"
                >
                  {item.flag}
                </span>
                <div>
                  <span
                    className={cn(
                      "block text-sm font-bold",
                      isSelected ? "text-gold-900" : "text-ink-900"
                    )}
                  >
                    {item.nativeName}
                  </span>
                  <span className="block text-[11px] font-semibold text-ink-500">
                    {item.code.toUpperCase()} — {item.name}
                  </span>
                </div>
              </div>

              {isSelected && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-500 text-white shadow-xs animate-bounce-in">
                  <Check size={13} strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  /* =========================================================================
     2. MOBILE HEADER TRIGGER
     ========================================================================= */
  if (variant === "mobile-header") {
    return (
      <div className={cn("relative", className)} ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={t("common.selectLanguage")}
          className="flex h-9 items-center gap-1.5 rounded-xl border border-gold-500/25 bg-white/90 px-2.5 py-1 text-xs font-bold text-ink-800 shadow-xs transition-all duration-200 hover:border-gold-500/50 active:scale-95"
        >
          <span className="text-sm" aria-hidden="true">{currentLang.flag}</span>
          <span className="font-semibold uppercase tracking-wider text-gold-800 text-[11px]">
            {currentLang.code.toUpperCase()}
          </span>
          <ChevronDown
            size={13}
            className={cn("text-gold-700 transition-transform duration-200", isOpen && "rotate-180")}
            aria-hidden="true"
          />
        </button>

        {isOpen && (
          <div
            className={cn(
              "absolute top-full z-50 mt-2 min-w-[170px] overflow-hidden rounded-2xl border border-gold-500/25 bg-white p-1.5 shadow-[0_12px_36px_-10px_rgba(201,162,39,0.3)] animate-slide-down-in",
              isRTL ? "left-0" : "right-0"
            )}
            role="listbox"
            aria-label={t("common.selectLanguage")}
          >
            {LANGUAGE_LIST.map((item) => {
              const isSelected = language === item.code;
              return (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(item.code)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-2.5 rounded-xl px-3 py-2 text-start text-xs font-bold transition-colors",
                    isSelected
                      ? "bg-gold-100/90 text-gold-900"
                      : "text-ink-700 hover:bg-gold-50/60 hover:text-gold-800"
                  )}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base" aria-hidden="true">{item.flag}</span>
                    <span>{item.nativeName}</span>
                  </span>
                  {isSelected && <Check size={13} className="text-gold-700" strokeWidth={2.5} />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  /* =========================================================================
     3. DESKTOP HEADER DROPDOWN (Default)
     ========================================================================= */
  return (
    <div className={cn("relative inline-block text-start", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t("common.selectLanguage")}
        className={cn(
          "group flex items-center gap-2 rounded-full border border-gold-500/30 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-ink-800 shadow-[0_2px_8px_-2px_rgba(201,162,39,0.15)] backdrop-blur-sm transition-all duration-200 hover:border-gold-500/60 hover:shadow-[0_4px_14px_-4px_rgba(201,162,39,0.3)] active:scale-95 cursor-pointer",
          isOpen && "border-gold-500 ring-2 ring-gold-500/20 bg-gold-50/40"
        )}
      >
        <span className="text-base leading-none" aria-hidden="true">{currentLang.flag}</span>
        <span className="font-semibold text-gold-900 text-[12px]">
          {currentLang.nativeName}
        </span>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-gold-600/75">
          {currentLang.code.toUpperCase()}
        </span>
        <ChevronDown
          size={13}
          className={cn(
            "text-gold-700 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute top-full z-50 mt-2.5 w-52 overflow-hidden rounded-2xl border border-gold-500/25 bg-white p-1.5 shadow-[0_16px_40px_-12px_rgba(201,162,39,0.35)] backdrop-blur-xl animate-slide-down-in",
            isRTL ? "left-0" : "right-0"
          )}
          role="listbox"
          aria-label={t("common.selectLanguage")}
        >
          <div className="px-3 py-1.5 border-b border-ink-100 mb-1 flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-wider text-ink-400">
            <Globe size={12} className="text-gold-600" />
            <span>{t("common.selectLanguage")}</span>
          </div>

          {LANGUAGE_LIST.map((item) => {
            const isSelected = language === item.code;
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(item.code)}
                className={cn(
                  "group flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-start transition-all duration-150",
                  isSelected
                    ? "bg-gradient-to-r from-gold-100/90 to-gold-50/80 text-gold-900 font-bold shadow-xs"
                    : "text-ink-800 hover:bg-gold-50/60 hover:text-gold-900"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg leading-none" aria-hidden="true">{item.flag}</span>
                  <div>
                    <span className="block text-xs font-bold leading-tight">
                      {item.nativeName}
                    </span>
                    <span className="block text-[10px] font-semibold text-ink-500">
                      {item.name}
                    </span>
                  </div>
                </div>

                {isSelected ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-white shadow-xs">
                    <Check size={11} strokeWidth={3} />
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-ink-400 uppercase">
                    {item.code}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
