export type Language = "fr" | "en" | "ar";
export type Direction = "ltr" | "rtl";

export interface LanguageConfig {
  code: Language;
  name: string;
  nativeName: string;
  flag: string;
  locale: string;
  direction: Direction;
  fontClass: string;
}

export interface Translations {
  common: {
    appName: string;
    appNameAr: string;
    tagline: string;
    loading: string;
    error: string;
    retry: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    search: string;
    filter: string;
    all: string;
    copy: string;
    copied: string;
    favorites: string;
    addToFavorites: string;
    removeFromFavorites: string;
    share: string;
    reset: string;
    morocco: string;
    moroccoKingdom: string;
    currentCity: string;
    selectCity: string;
    searchCity: string;
    popularCities: string;
    noResults: string;
    madeWithLove: string;
    allRightsReserved: string;
    developer: string;
    privacySecurity: string;
    privacyNote: string;
    contactUs: string;
    emailUs: string;
    quickAccess: string;
    explore: string;
    start: string;
    language: string;
    selectLanguage: string;
    settings: string;
    moreOptions: string;
  };
  nav: {
    home: string;
    quran: string;
    prayer: string;
    azkar: string;
    about: string;
    more: string;
  };
  hero: {
    greeting: string;
    titleStart: string;
    titleHighlight: string;
    arabicSlogan: string;
    description: string;
    exploreBtn: string;
    startBtn: string;
    statsSurahs: string;
    statsPrayers: string;
    statsCities: string;
    statsAzkar: string;
  };
  prayerTimes: {
    title: string;
    todayTitle: string;
    nextPrayer: string;
    currentPrayer: string;
    timeRemaining: string;
    remainingFor: string;
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    hours: string;
    minutes: string;
    seconds: string;
    updatingTimes: string;
    fetchError: string;
    citiesCount: string;
    localTime: string;
    gregorianDate: string;
    hijriDate: string;
  };
  prayerGuide: {
    title: string;
    subtitle: string;
    verse: string;
    verseRef: string;
    tabs: {
      prayers: string;
      wudu: string;
      conditions: string;
      pillars: string;
    };
    rakaatCount: string;
    sunnahBefore: string;
    sunnahAfter: string;
    prayerSteps: string;
    virtues: string;
    prescribedTime: string;
    stepNumber: string;
    wuduStepTitle: string;
    pillarsList: string[];
    prayers: {
      fajr: {
        name: string;
        description: string;
        steps: string[];
        virtues: string;
        time: string;
      };
      dhuhr: {
        name: string;
        description: string;
        steps: string[];
        virtues: string;
        time: string;
      };
      asr: {
        name: string;
        description: string;
        steps: string[];
        virtues: string;
        time: string;
      };
      maghrib: {
        name: string;
        description: string;
        steps: string[];
        virtues: string;
        time: string;
      };
      isha: {
        name: string;
        description: string;
        steps: string[];
        virtues: string;
        time: string;
      };
    };
    wuduSteps: Array<{
      step: number;
      title: string;
      desc: string;
    }>;
    conditionsList: Array<{
      title: string;
      desc: string;
    }>;
  };
  quran: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    dailyVerseTitle: string;
    filterAll: string;
    filterMeccan: string;
    filterMedinan: string;
    meccan: string;
    medinan: string;
    ayahsCount: string;
    surahNumber: string;
    loadingSurahs: string;
    loadingAyahs: string;
    readSurah: string;
    fontSize: string;
    normal: string;
    large: string;
    xlarge: string;
    bismillah: string;
    prevSurah: string;
    nextSurah: string;
    backToList: string;
    surahNotFound: string;
    copiedAyah: string;
  };
  azkar: {
    title: string;
    subtitle: string;
    tasbeehTitle: string;
    tasbeehSubtitle: string;
    tapToCount: string;
    resetCounter: string;
    countGoal: string;
    roundsCompleted: string;
    categories: {
      all: string;
      morning: string;
      evening: string;
      prayer: string;
      protection: string;
      daily: string;
    };
    duaTitles: Record<number, string>;
    duaTranslations: Record<number, string>;
    tasbeehPhrases: Array<{ text: string; sub: string; meaning: string }>;
    emptyFavorites: string;
    emptyCategory: string;
    countBadge: string;
    tasbeehBtn: string;
  };
  about: {
    title: string;
    tagline: string;
    verse: string;
    verseRef: string;
    description: string;
    whatWeOfferTitle: string;
    whatWeOfferSubtitle: string;
    features: Array<{
      title: string;
      desc: string;
    }>;
    faqTitle: string;
    faqSubtitle: string;
    faqs: Array<{
      q: string;
      a: string;
    }>;
    contactTitle: string;
    contactSubtitle: string;
    contactDescription: string;
    fromMoroccoWithLove: string;
    developedBy: string;
    backToHome: string;
    privacyTitle: string;
    privacyContent: string;
    termsTitle: string;
    termsContent: string;
  };
  homeOverview: {
    badge: string;
    heading: string;
    description: string;
    cards: Array<{
      title: string;
      desc: string;
    }>;
  };
  featured: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      title: string;
      desc: string;
    }>;
  };
  dailyReminder: {
    badge: string;
    title: string;
    ayahOfWeek: string;
  };
  footer: {
    brandDesc: string;
    browse: string;
    resources: string;
    info: string;
    privacyPolicy: string;
    termsOfUse: string;
    aboutContact: string;
  };
  download: {
    buttonText: string;
    heroText: string;
    cardTitle: string;
    cardDescription: string;
    cardFeatures: string;
    versionLabel: string;
    officialApk: string;
  };
}
