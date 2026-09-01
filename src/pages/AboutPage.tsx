import { BookOpen, Clock3, Heart, HelpCircle, Mail, MapPin, MoonStar, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../components/Button";
import { CrescentMoon } from "../components/CrescentMoon";
import { IslamicPattern } from "../components/IslamicPattern";
import { SectionTitle } from "../components/SectionTitle";
import type { Page } from "../components/Header";
import { useTranslation } from "../i18n";

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

const FEATURES_KEYS = [
  { icon: <Clock3 size={18} />, titleKey: "about.features.0.title", descKey: "about.features.0.desc" },
  { icon: <BookOpen size={18} />, titleKey: "about.features.1.title", descKey: "about.features.1.desc" },
  { icon: <Heart size={18} />, titleKey: "about.features.2.title", descKey: "about.features.2.desc" },
  { icon: <ShieldCheck size={18} />, titleKey: "about.features.3.title", descKey: "about.features.3.desc" },
];

const FAQ_KEYS = [
  { qKey: "about.faqs.0.q", aKey: "about.faqs.0.a" },
  { qKey: "about.faqs.1.q", aKey: "about.faqs.1.a" },
  { qKey: "about.faqs.2.q", aKey: "about.faqs.2.a" },
  { qKey: "about.faqs.3.q", aKey: "about.faqs.3.a" },
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  const { t } = useTranslation();
  return (
    <div className="animate-page-enter">
      {/* ===== Intro ===== */}
      <section className="relative mx-auto max-w-7xl overflow-hidden px-3.5 pt-4 sm:px-6 sm:pt-8 lg:px-8">
        <IslamicPattern className="pointer-events-none absolute inset-x-0 top-0 h-64 w-full" opacity={0.05} />
        <div className="relative flex flex-col items-center gap-4 sm:gap-6 py-6 sm:py-12 text-center">
          <CrescentMoon className="h-14 w-14 sm:h-16 sm:w-16 animate-float drop-shadow-[0_12px_28px_rgba(201,162,39,0.4)]" />
          <div>
            <p className="font-quran text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed text-gradient-gold" dir="rtl" lang="ar">
              {t("about.verse")}
            </p>
            <p className="mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-ink-500">
              {t("about.verseRef")} · {t("about.verseRef")}
            </p>
          </div>

          <h1 className="max-w-2xl text-balance text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-ink-900">
            {t("about.title")}
          </h1>

          <p className="max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-ink-600">
            {t("about.description")}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
        {/* ===== What we offer ===== */}
        <section className="pt-6 sm:pt-8" aria-labelledby="offer-heading">
          <SectionTitle eyebrow={t("about.whatWeOfferTitle")} title={t("about.whatWeOfferSubtitle")} titleAr={t("about.whatWeOfferTitle")} />
          <div className="mt-6 sm:mt-9 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES_KEYS.map((f, i) => (
              <div key={f.titleKey} className="card card-hover p-4 sm:p-5 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                <span className="octagram h-11 w-11 text-gold-700" aria-hidden="true">
                  {f.icon}
                </span>
                <h2 className="mt-3 font-arabic text-sm sm:text-base font-bold text-ink-900">{t(f.titleKey)}</h2>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink-600">{t(f.descKey)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FAQ Section for SEO and Users ===== */}
        <section className="pt-10 sm:pt-14" aria-labelledby="faq-heading">
          <SectionTitle eyebrow="FAQ" title={t("about.faqTitle")} titleAr={t("about.faqSubtitle")} />
          <div className="mt-6 sm:mt-8 grid gap-3.5 sm:gap-4 max-w-4xl mx-auto">
            {FAQ_KEYS.map((faq, idx) => (
              <details key={idx} className="card group p-4 sm:p-5 open:bg-white transition-all">
                <summary className="flex cursor-pointer list-none items-center justify-between font-arabic text-xs sm:text-sm md:text-base font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-2">
                    <HelpCircle size={16} className="text-gold-600 shrink-0" />
                    {t(faq.qKey)}
                  </span>
                  <span className="text-gold-700 font-bold transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 border-t border-ink-200/70 pt-3 text-xs sm:text-sm leading-relaxed text-ink-600">
                  {t(faq.aKey)}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ===== Contact / credits ===== */}
        <section className="mt-10 sm:mt-14 grid gap-3.5 sm:gap-4 lg:grid-cols-[1.2fr_1fr]" aria-labelledby="contact-heading">
          <div id="contact-heading" className="card-dark relative overflow-hidden p-5 sm:p-8">
            <IslamicPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.08} />
            <div className="relative">
              <MoonStar size={18} className="text-gold-400" aria-hidden="true" />
              <h2 className="mt-2 text-lg sm:text-xl font-extrabold text-white">{t("about.contactTitle")}</h2>
              <p className="mt-1.5 max-w-md text-xs sm:text-sm leading-relaxed text-white/60">
                {t("about.contactDescription")}
              </p>
              <a href="mailto:contact@taqwaa.app" className="mt-4 sm:mt-6 inline-block w-full sm:w-auto">
                <Button className="w-full sm:w-auto !py-2.5 !text-xs sm:!text-sm" aria-label="Email Taqwaa">
                  <Mail size={15} aria-hidden="true" />
                  contact@taqwaa.app
                </Button>
              </a>
            </div>
          </div>

          <div className="card-beige relative overflow-hidden p-5 sm:p-8">
            <MapPin size={18} className="text-gold-700" aria-hidden="true" />
            <h2 className="mt-2 font-arabic text-lg sm:text-xl font-extrabold text-ink-900" dir="rtl">{t("about.fromMoroccoWithLove")}</h2>
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink-600">
              {t("about.developedBy")}{" "}
              <span className="font-bold text-gold-700">Anas Lagziri</span> — {t("about.description")}
            </p>
            <button
              onClick={() => onNavigate("home")}
              className="btn btn-secondary btn-sm mt-4 sm:mt-6 cursor-pointer !py-2 !text-xs sm:!text-sm w-full sm:w-auto"
            >
              {t("about.backToHome")} · {t("about.backToHome")}
            </button>
          </div>
        </section>

        {/* ===== Privacy / terms ===== */}
        <section className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 pb-4 md:grid-cols-2" aria-label={t("common.privacySecurity")}>
          <details className="card group p-4 open:bg-white sm:p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-arabic text-xs sm:text-sm font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
              {t("about.privacyTitle")} · {t("about.privacyTitle")}
              <span className="text-gold-700 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-2.5 border-t border-ink-200/70 pt-2.5 text-xs sm:text-sm leading-relaxed text-ink-600">
              {t("about.privacyContent")}
            </p>
          </details>

          <details className="card group p-4 open:bg-white sm:p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-arabic text-xs sm:text-sm font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
              {t("about.termsTitle")} · {t("about.termsTitle")}
              <span className="text-gold-700 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-2.5 border-t border-ink-200/70 pt-2.5 text-xs sm:text-sm leading-relaxed text-ink-600">
              {t("about.termsContent")}
            </p>
          </details>
        </section>
      </div>
    </div>
  );
}
