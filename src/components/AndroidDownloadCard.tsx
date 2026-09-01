import { Check, Smartphone, Sparkles, ShieldCheck } from "lucide-react";
import { DownloadButton } from "./DownloadButton";
import { useTranslation } from "../i18n";
import { APP_VERSION } from "../constants/app";
import { cn } from "../utils/cn";

export function AndroidDownloadCard() {
  const { t, isRTL } = useTranslation();

  return (
    <section
      className={cn(
        "relative overflow-hidden animate-fade-in-up",
        "lg:animate-none"
      )}
      aria-labelledby="android-download-heading"
    >
      <div className="mx-auto max-w-5xl px-3.5 sm:px-6 lg:px-8">
        <div
          className={cn(
            "relative rounded-3xl p-5 sm:p-8 lg:p-10 xl:p-12",
            "bg-gradient-to-br from-gold-50 via-white to-gold-50",
            "border border-gold-500/20",
            "shadow-[0_8px_32px_-12px_rgba(156,122,22,0.25)]",
            "overflow-hidden",
            isRTL && "rtl"
          )}
        >
          {/* Decorative background elements */}
          <div className="pointer-events-none absolute -top-10 -end-10 h-40 w-40 rounded-full bg-gold-300/30 blur-2xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-16 -start-16 h-32 w-32 rounded-full bg-gold-200/40 blur-2xl" aria-hidden="true" />
          <div className="pointer-events-none absolute top-0 end-0 h-full w-1/2 bg-gradient-to-r from-gold-100/30 to-transparent" aria-hidden="true" />

          {/* Gold accent border top */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" aria-hidden="true" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
            {/* Left Content */}
            <div className="relative flex-1 text-center lg:text-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-gold-100 px-3 py-1.5 text-xs font-bold text-gold-800 mb-4">
                <Sparkles size={12} className="text-gold-600" aria-hidden="true" />
                <span className="font-quran">{t("download.cardTitle")}</span>
              </div>

              <h2
                id="android-download-heading"
                className="font-quran text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-ink-900 mb-3"
              >
                {t("download.cardDescription")}
              </h2>

              <p className="text-sm sm:text-base text-ink-600 mb-6 max-w-md mx-auto lg:mx-0">
                {t("download.cardFeatures")}
              </p>

              {/* Features list */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-6">
                {["Quran", "Prayer", "Azkar"].map((feature, i) => (
                  <span
                    key={feature}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-semibold",
                      "bg-white/80 border border-gold-500/20",
                      "shadow-[0_2px_8px_-4px_rgba(201,162,39,0.15)]",
                      "backdrop-blur-sm",
                      isRTL && "rtl"
                    )}
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <Check size={13} className="text-gold-600 shrink-0" aria-hidden="true" />
                    {t(`nav.${feature.toLowerCase() === "quran" ? "quran" : feature.toLowerCase() === "prayer" ? "prayer" : "azkar"}`)}
                  </span>
                ))}
              </div>

              {/* Download Button */}
              <div className="w-full sm:w-auto">
                <DownloadButton variant="card" />
              </div>

              {/* Version & Official APK badge */}
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2 text-xs text-ink-500">
                <span className="flex items-center gap-1 font-mono text-gold-700">
                  {t("download.versionLabel")} {APP_VERSION}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-gold-50 px-2.5 py-0.5 border border-gold-500/20">
                  <ShieldCheck size={10} className="text-gold-600" aria-hidden="true" />
                  {t("download.officialApk")}
                </span>
              </div>
            </div>

            {/* Right Side - Android Phone Mockup */}
            <div className="relative flex-shrink-0 hidden lg:block">
              <div className="relative w-56 h-72 sm:w-64 sm:h-80">
                {/* Phone frame */}
                <div className="absolute inset-0 rounded-[36px] border-4 border-ink-900/10 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] relative overflow-hidden">
                  {/* Screen content */}
                  <div className="absolute inset-4 rounded-[28px] bg-gradient-to-br from-ink-900 via-ink-800 to-ink-900 p-4 flex flex-col items-center justify-center">
                    {/* App preview in phone */}
                    <div className="flex flex-col items-center gap-4 text-center text-white">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 shadow-[0_8px_24px_-8px_rgba(201,162,39,0.5)]">
                        <Smartphone size={28} className="text-white" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-quran text-lg font-bold">Taqwaaa</p>
                        <p className="text-xs text-white/60 mt-0.5">{t("common.tagline")}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
                        <div className="h-2 w-2 rounded-full bg-gold-400 animate-pulse-soft" aria-hidden="true" />
                        <span className="text-xs font-medium text-white/80">Live Prayer Times</span>
                      </div>
                    </div>
                  </div>

                  {/* Camera cutout */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 h-5 w-16 rounded-b-[10px] bg-ink-950" aria-hidden="true" />
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 h-2 w-6 rounded-full bg-ink-900" aria-hidden="true" />
                </div>

                {/* Floating glow */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 h-16 w-3/4 rounded-full bg-gold-500/20 blur-2xl" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}