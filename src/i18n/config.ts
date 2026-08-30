import type { Language, LanguageConfig } from "./types";

export const LANGUAGES: Record<Language, LanguageConfig> = {
  fr: {
    code: "fr",
    name: "Français",
    nativeName: "Français",
    flag: "🇫🇷",
    locale: "fr-FR",
    direction: "ltr",
    fontClass: "font-sans",
  },
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
    locale: "en-GB",
    direction: "ltr",
    fontClass: "font-sans",
  },
  ar: {
    code: "ar",
    name: "العربية",
    nativeName: "العربية",
    flag: "🇲🇦",
    locale: "ar-MA",
    direction: "rtl",
    fontClass: "font-arabic",
  },
};

export const DEFAULT_LANGUAGE: Language = "fr";
export const STORAGE_KEY = "taqwaaa_language";
