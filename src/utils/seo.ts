export interface SEOConfig {
  title: string;
  description: string;
  canonicalPath?: string;
  keywords?: string[];
  ogType?: "website" | "article";
  breadcrumbs?: Array<{ name: string; path: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  structuredData?: Record<string, any>[];
  lang?: string;
  dir?: "rtl" | "ltr";
}

export const SITE_URL = "https://taqwaa.app";
export const BRAND_NAME = "Taqwaa — تقوى";
export const SITE_NAME = "Taqwaa";

export const DEFAULT_SEO: SEOConfig = {
  title: "Taqwaa — أوقات الصلاة، القرآن الكريم والأذكار",
  description:
    "تقوى Taqwaa منصة إسلامية مغربية تساعدك على متابعة أوقات الصلاة، قراءة القرآن الكريم، الأذكار والمزيد في تجربة بسيطة وعصرية.",
  canonicalPath: "/",
  keywords: [
    "Taqwaa",
    "Taqwaa Maroc",
    "تقوى",
    "تطبيق تقوى",
    "أوقات الصلاة المغرب",
    "مواقيت الصلاة",
    "مواقيت الصلاة في المغرب",
    "القرآن الكريم",
    "الأذكار",
    "الصلاة",
    "Islamic prayer times Morocco",
    "Morocco prayer times",
    "Adhkar",
    "Quran online",
  ],
  ogType: "website",
  lang: "ar",
  dir: "rtl",
};

export const PAGE_SEO: Record<string, SEOConfig> = {
  home: {
    title: "Taqwaa — أوقات الصلاة، القرآن الكريم والأذكار",
    description:
      "تقوى Taqwaa منصة إسلامية مغربية تساعدك على متابعة أوقات الصلاة، قراءة القرآن الكريم، الأذكار والمزيد في تجربة بسيطة وعصرية.",
    canonicalPath: "/",
    keywords: [
      "Taqwaa",
      "Taqwaa Maroc",
      "تقوى",
      "تطبيق تقوى",
      "أوقات الصلاة المغرب",
      "مواقيت الصلاة",
      "القرآن الكريم",
      "الأذكار",
      "الصلاة",
      "Morocco prayer times",
    ],
    breadcrumbs: [{ name: "الرئيسية", path: "/" }],
  },
  salaat: {
    title: "مواقيت الصلاة في المغرب بدقة عالية | Taqwaa — تقوى",
    description:
      "تابع مواقيت الصلاة الدقيقة اليومية لجميع المدن المغربية (الدار البيضاء، الرباط، مراكش، طنجة، فاس، أكادير وغيرها) مع تنبيهات الأذان، اتجاه القبلة، ودليل أداء الصلوات الخمس والسنن.",
    canonicalPath: "/salaat",
    keywords: [
      "أوقات الصلاة المغرب",
      "مواقيت الصلاة",
      "مواقيت الصلاة في المغرب",
      "الصلاة",
      "أذان المغرب",
      "صلاة الفجر",
      "صلاة الظهر",
      "صلاة العصر",
      "صلاة المغرب",
      "صلاة العشاء",
      "اتجاه القبلة",
      "Morocco prayer times",
      "Taqwaa Salaat",
    ],
    breadcrumbs: [
      { name: "الرئيسية", path: "/" },
      { name: "مواقيت الصلاة", path: "/salaat" },
    ],
    faqs: [
      {
        question: "كيف يتم حساب مواقيت الصلاة في تطبيق تقوى بالمغرب؟",
        answer:
          "يعتمد تطبيق تقوى على معايير الحساب الرسمية المعتمدة في المملكة المغربية (وزارة الأوقاف والشؤون الإسلامية) ومصادر Aladhan الدقيقة لتوفير أوقات صلاة مطابقة لكل مدينة مغربية.",
      },
      {
        question: "هل تتوفر مواقيت الصلاة لجميع المدن المغربية؟",
        answer:
          "نعم، يوفر تقوى أوقات الصلاة لأكثر من 22 مدينة مغربية كبرى تشمل الدار البيضاء، الرباط، طنجة، مراكش، فاس، أكادير، وجدة، مكناس، تطوان وغيرها.",
      },
    ],
  },
  quran: {
    title: "القرآن الكريم كاملاً تلاوة واستماعاً وتفسيراً | Taqwaa — تقوى",
    description:
      "اقرأ واستمع إلى سور وآيات القرآن الكريم كاملة (١١٤ سورة) برواية ورش وحفص وتلاوات خاشعة وتفسير ميسر بدون إعلانات مع البحث وحفظ الآيات في منصة تقوى Taqwaa.",
    canonicalPath: "/quran",
    keywords: [
      "القرآن الكريم",
      "تلاوة القرآن",
      "المصحف الشريف",
      "سورة البقرة",
      "سورة الكهف",
      "استماع القرآن الكريم",
      "تفسير القرآن",
      "Noble Quran online",
      "Quran reader",
      "Taqwaa Quran",
    ],
    breadcrumbs: [
      { name: "الرئيسية", path: "/" },
      { name: "القرآن الكريم", path: "/quran" },
    ],
  },
  dua: {
    title: "حصن المسلم — أذكار الصباح والمساء والأدعية الصحيحة | Taqwaa — تقوى",
    description:
      "مجموعة شاملة من أذكار الصباح والمساء، أذكار بعد الصلاة، أدعية الشفاء والتحصين من السنة النبوية الشريفة مع عداد التسبيح والمراجع المعتمدة في تقوى Taqwaa.",
    canonicalPath: "/dua",
    keywords: [
      "الأذكار",
      "أذكار الصباح والمساء",
      "حصن المسلم",
      "أذكار النوم",
      "أذكار الصلاة",
      "دعاء الاستفتاح",
      "سيد الاستغفار",
      "أدعية نبوية صحيحة",
      "Islamic Azkar",
      "Duas and Adhkar",
      "Taqwaa Azkar",
    ],
    breadcrumbs: [
      { name: "الرئيسية", path: "/" },
      { name: "الأذكار والدعاء", path: "/dua" },
    ],
  },
  about: {
    title: "حول تقوى Taqwaa — رفيقك الإيماني المغربي | تواصل معنا",
    description:
      "تعرف على منصة تقوى Taqwaa الإسلامية المغربية المصممة لخدمة المسلمين في كل مكان. منصة مجانية وآمنة تحافظ على خصوصيتك بالكامل وبدون إعلانات مزعجة.",
    canonicalPath: "/about",
    keywords: [
      "Taqwaa",
      "حول تقوى",
      "تطبيق تقوى المغرب",
      "Taqwaa Maroc",
      "Anas Lagziri",
      "منصة تقوى الإسلامية",
    ],
    breadcrumbs: [
      { name: "الرئيسية", path: "/" },
      { name: "حول المنصة", path: "/about" },
    ],
    faqs: [
      {
        question: "هل منصة تقوى مجانية وهل تحتوي على إعلانات؟",
        answer:
          "تقوى منصة إسلامية مجانية بالكامل وخالية من الإعلانات المشتتة، صُممت لتوفير تجربة عبادة هادئة ومريحة.",
      },
      {
        question: "هل يتم تخزين بيانات المستخدمين في تقوى؟",
        answer:
          "لا نقوم بجمع أو تخزين أي بيانات شخصية أو حسابات، وتبقى جميع تفضيلاتك كمدينتك المفضلة على جهازك محلياً فقط.",
      },
    ],
  },
};

export function buildStructuredData(config: SEOConfig) {
  const schemas: Record<string, any>[] = [];

  // 1. WebSite Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "Taqwaa",
    alternateName: ["تقوى", "Taqwaa Maroc", "منصة تقوى", "تطبيق تقوى"],
    url: SITE_URL,
    inLanguage: ["ar", "fr", "en"],
    description:
      "منصة إسلامية مغربية حديثة لمتابعة أوقات الصلاة والقرآن الكريم والأذكار",
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Taqwaa",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icone.png`,
        width: "512",
        height: "512",
      },
    },
  });

  // 2. Organization Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Taqwaa",
    alternateName: "تقوى",
    url: SITE_URL,
    logo: `${SITE_URL}/icone.png`,
    founder: {
      "@type": "Person",
      name: "Anas Lagziri",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@taqwaa.app",
      contactType: "customer support",
      availableLanguage: ["Arabic", "French", "English"],
    },
  });

  // 3. WebApplication Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${SITE_URL}/#app`,
    name: "Taqwaa — تقوى",
    url: SITE_URL,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    inLanguage: ["ar", "fr", "en"],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "MAD",
    },
  });

  // 4. BreadcrumbList Schema
  if (config.breadcrumbs && config.breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: config.breadcrumbs.map((b, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: b.name,
        item: `${SITE_URL}${b.path === "/" ? "" : b.path}`,
      })),
    });
  }

  // 5. FAQPage Schema if faqs provided
  if (config.faqs && config.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: config.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return schemas;
}
