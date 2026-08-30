import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Language, Direction, LanguageConfig, Translations } from "./types";
import { LANGUAGES, DEFAULT_LANGUAGE, STORAGE_KEY } from "./config";
import { fr } from "./fr";
import { en } from "./en";
import { ar } from "./ar";

const TRANSLATION_MAP: Record<Language, Translations> = {
  fr,
  en,
  ar,
};

interface LanguageContextValue {
  language: Language;
  direction: Direction;
  locale: string;
  config: LanguageConfig;
  translations: Translations;
  isRTL: boolean;
  setLanguage: (lang: Language) => void;
  t: <T = string>(keyPath: string, params?: Record<string, string | number>) => T;
  formatNumber: (n: number | string) => string;
  formatDate: (date: Date | string, options?: Intl.DateTimeFormatOptions) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === "fr" || saved === "en" || saved === "ar")) {
      return saved as Language;
    }
  } catch {
    /* ignore localStorage errors */
  }
  return DEFAULT_LANGUAGE;
}

// Helper to access nested objects via "common.appName"
function getNestedValue(obj: any, path: string): any {
  if (!obj || !path) return undefined;
  return path.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), obj);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const config = LANGUAGES[language] || LANGUAGES[DEFAULT_LANGUAGE];
  const direction = config.direction;
  const isRTL = direction === "rtl";
  const locale = config.locale;
  const currentTranslations = TRANSLATION_MAP[language] || TRANSLATION_MAP[DEFAULT_LANGUAGE];

  // Update HTML document direction, language, and font classes
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    
    // Apply body font class for clean typography
    if (language === "ar") {
      document.body.classList.add("font-arabic");
      document.body.classList.remove("font-latin");
    } else {
      document.body.classList.add("font-latin");
      document.body.classList.remove("font-arabic");
    }

    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      /* ignore */
    }
  }, [language, direction]);

  const setLanguage = useCallback((newLang: Language) => {
    if (newLang === language) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setLanguageState(newLang);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 150);
    }, 100);
  }, [language]);

  // Translate string with optional interpolation e.g. {count}
  const t = useCallback(
    <T = string,>(keyPath: string, params?: Record<string, string | number>): T => {
      let value = getNestedValue(currentTranslations, keyPath);
      if (value === undefined) {
        // Fallback to French then English
        value = getNestedValue(TRANSLATION_MAP.fr, keyPath) ?? getNestedValue(TRANSLATION_MAP.en, keyPath) ?? keyPath;
      }

      if (typeof value === "string" && params) {
        let interpolated = value;
        for (const [paramKey, paramVal] of Object.entries(params)) {
          interpolated = interpolated.replace(
            new RegExp(`\\{${paramKey}\\}`, "g"),
            String(paramVal)
          );
        }
        return interpolated as unknown as T;
      }

      return value as T;
    },
    [currentTranslations]
  );

  // Format numbers (Arabic-Indic digits for Arabic if desired, standard for FR/EN)
  const formatNumber = useCallback(
    (n: number | string): string => {
      if (language === "ar") {
        return String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);
      }
      return String(n);
    },
    [language]
  );

  // Format Gregorian dates according to active locale
  const formatDate = useCallback(
    (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
      const d = typeof date === "string" ? new Date(date) : date;
      try {
        return new Intl.DateTimeFormat(locale, options).format(d);
      } catch {
        return d.toLocaleDateString();
      }
    },
    [locale]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        direction,
        locale,
        config,
        translations: currentTranslations,
        isRTL,
        setLanguage,
        t,
        formatNumber,
        formatDate,
      }}
    >
      <div
        className={`contents transition-opacity duration-200 ${
          isTransitioning ? "opacity-75" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

export function useTranslation() {
  const { t, translations, language, direction, isRTL, locale, formatNumber, formatDate } =
    useLanguage();
  return {
    t,
    translations,
    language,
    direction,
    isRTL,
    locale,
    formatNumber,
    formatDate,
  };
}
