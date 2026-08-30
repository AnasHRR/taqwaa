import { useState } from "react";
import {
  CalendarDays, Check, ChevronDown, Clock, CloudSun, MapPin,
  Moon, RefreshCw, Search, Stars, Sun, Sunrise, Sunset, Timer, X,
} from "lucide-react";
import { IslamicPattern } from "./IslamicPattern";
import type { ReactNode } from "react";
import { MOROCCAN_CITIES, PRAYER_KEYS, PRAYER_INFO } from "../constants";
import { usePrayerTimes } from "../hooks/usePrayerTimes";
import { useClock } from "../hooks/useClock";
import { useNextPrayer } from "../hooks/useNextPrayer";
import { useTranslation } from "../i18n";
import type { City } from "../types";
import { cn } from "../utils/cn";

const PRAYER_ICONS: Record<string, ReactNode> = {
  Fajr: <Moon size={18} strokeWidth={1.8} />,
  Sunrise: <Sunrise size={18} strokeWidth={1.8} />,
  Dhuhr: <Sun size={18} strokeWidth={1.8} />,
  Asr: <CloudSun size={18} strokeWidth={1.8} />,
  Maghrib: <Sunset size={18} strokeWidth={1.8} />,
  Isha: <Stars size={18} strokeWidth={1.8} />,
};

const POPULAR_CITIES = ["Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir"];

interface PrayerTimesPanelProps {
  variant?: "compact" | "full";
  selectedCityOverride?: City;
  onCityChange?: (city: City) => void;
}

export function PrayerTimesPanel({
  variant = "full",
  selectedCityOverride,
  onCityChange,
}: PrayerTimesPanelProps) {
  const { t, language, locale, formatNumber, formatDate, isRTL } = useTranslation();
  const [internalCity, setInternalCity] = useState<City>(MOROCCAN_CITIES[0]);
  const selectedCity = selectedCityOverride || internalCity;

  const [showCityPicker, setShowCityPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const now = useClock();
  const { prayerTimes, hijriDate, gregorianDate, loading, error, refetch } =
    usePrayerTimes(selectedCity);
  const nextPrayer = useNextPrayer(prayerTimes, now);

  const timeString = now.toLocaleTimeString(locale, {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });
  const [hours, minutes, seconds] = timeString.split(":");

  const filteredCities = MOROCCAN_CITIES.filter((city) => {
    const q = searchQuery.toLowerCase();
    return city.name.toLowerCase().includes(q) || city.nameAr.includes(searchQuery);
  });

  const selectCity = (city: City) => {
    if (onCityChange) {
      onCityChange(city);
    } else {
      setInternalCity(city);
    }
    setShowCityPicker(false);
    setSearchQuery("");
  };

  const closePicker = () => {
    setShowCityPicker(false);
    setSearchQuery("");
  };

  const isNextPrayerKey = (key: string) => nextPrayer?.key === key;
  const isCurrentPrayer = (key: string): boolean => {
    if (!prayerTimes || !nextPrayer) return false;
    const keys = PRAYER_KEYS.filter((k) => k !== "Sunrise");
    const nextIdx = keys.indexOf(nextPrayer.key as typeof keys[number]);
    const currentIdx = nextIdx - 1;
    if (currentIdx >= 0) return keys[currentIdx] === key;
    return key === "Isha";
  };

  const getLocalizedPrayerName = (key: string): string => {
    const lowerKey = key.toLowerCase() as keyof typeof PRAYER_INFO;
    switch (key) {
      case "Fajr": return t("prayerTimes.fajr");
      case "Sunrise": return t("prayerTimes.sunrise");
      case "Dhuhr": return t("prayerTimes.dhuhr");
      case "Asr": return t("prayerTimes.asr");
      case "Maghrib": return t("prayerTimes.maghrib");
      case "Isha": return t("prayerTimes.isha");
      default: return PRAYER_INFO[key]?.nameAr || key;
    }
  };

  const selectedCityDisplayName = language === "ar" ? selectedCity.nameAr : selectedCity.name;

  const countdownParts = nextPrayer?.remainingFormatted.split(":") || ["00", "00", "00"];
  const countdownLabels = [
    t("prayerTimes.hours"),
    t("prayerTimes.minutes"),
    t("prayerTimes.seconds"),
  ];

  /* ---------------- Shared City List Modal / Dropdown ---------------- */
  const renderCityList = () => (
    <div className="flex-1 overflow-y-auto px-3 pb-4">
      {/* Quick popular chips */}
      {!searchQuery && (
        <div className="mb-3 pt-1">
          <p className="text-[11px] font-bold text-ink-500 mb-1.5">{t("common.popularCities")}</p>
          <div className="flex flex-wrap gap-1.5">
            {MOROCCAN_CITIES.filter((c) => POPULAR_CITIES.includes(c.name)).map((city) => {
              const cityName = language === "ar" ? city.nameAr : city.name;
              return (
                <button
                  key={city.name}
                  type="button"
                  onClick={() => selectCity(city)}
                  className={cn(
                    "chip !py-1 !px-2.5 !text-xs",
                    selectedCity.name === city.name && "chip-active"
                  )}
                >
                  {cityName}
                </button>
              );
            })}
          </div>
          <div className="divider-gold my-2.5 opacity-50" />
        </div>
      )}

      {filteredCities.map((city) => {
        const isSelected = selectedCity.name === city.name;
        const mainName = language === "ar" ? city.nameAr : city.name;
        const subName = language === "ar" ? city.name : city.nameAr;
        return (
          <button
            key={city.name}
            type="button"
            onClick={() => selectCity(city)}
            aria-pressed={isSelected}
            className={cn(
              "touch-active mb-1 flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors text-start",
              isSelected ? "bg-gold-100/90 text-gold-900 font-bold" : "hover:bg-ink-100 text-ink-800"
            )}
          >
            <span className="flex items-center gap-2.5">
              {isSelected ? (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-white shadow-sm">
                  <Check size={11} strokeWidth={3} />
                </span>
              ) : (
                <span className="h-5 w-5 flex items-center justify-center text-ink-300">
                  <MapPin size={13} />
                </span>
              )}
              <span className="text-sm font-semibold">{mainName}</span>
            </span>
            <span className="text-xs text-ink-500">{subName}</span>
          </button>
        );
      })}
      {filteredCities.length === 0 && (
        <p className="py-8 text-center text-sm text-ink-500">{t("common.noResults")}</p>
      )}
    </div>
  );

  const searchInput = (
    <div className="relative">
      <input
        type="text"
        placeholder={t("common.searchCity")}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label={t("common.searchCity")}
        className="input-field !rounded-xl pe-10 ps-9 !py-2.5 !text-sm"
        autoFocus
      />
      <Search size={15} className="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery("")}
          className="absolute start-3 top-1/2 -translate-y-1/2 p-1 text-ink-400 hover:text-ink-700"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );

  /* Desktop dropdown */
  const desktopDropdown = showCityPicker && (
    <>
      <div className="fixed inset-0 z-30 cursor-default" onClick={closePicker} aria-hidden="true" />
      <div className="absolute start-0 end-0 top-full z-40 mt-2 animate-slide-down-in hidden md:block">
        <div className="flex max-h-[380px] flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-[0_24px_60px_-24px_rgba(31,31,31,0.35)]">
          <div className="p-3 border-b border-ink-100">{searchInput}</div>
          {renderCityList()}
        </div>
      </div>
    </>
  );

  /* Mobile bottom sheet */
  const mobileSheet = showCityPicker && (
    <div className="md:hidden">
      <div
        className="fixed inset-0 z-[80] animate-fade-in bg-ink-950/50 backdrop-blur-sm"
        onClick={closePicker}
        aria-hidden="true"
      />
      <div className="safe-bottom fixed bottom-0 left-0 right-0 z-[90] animate-slide-up">
        <div className="flex max-h-[72dvh] flex-col rounded-t-[28px] border-t border-gold-500/30 bg-white shadow-2xl overflow-hidden">
          <div className="flex items-center justify-center pt-3 pb-1" aria-hidden="true">
            <span className="h-1.5 w-12 rounded-full bg-ink-200" />
          </div>
          <div className="flex items-center justify-between px-4 pb-2 pt-1 border-b border-ink-100">
            <div>
              <h3 className="text-base font-bold text-ink-900 leading-tight">{t("common.selectCity")}</h3>
              <p className="text-[10px] text-ink-500">{t("prayerTimes.citiesCount")}</p>
            </div>
            <button onClick={closePicker} aria-label={t("common.close")} className="icon-btn h-8 w-8 rounded-full bg-ink-50">
              <X size={15} />
            </button>
          </div>
          <div className="p-3.5 pb-2">{searchInput}</div>
          {renderCityList()}
        </div>
      </div>
    </div>
  );

  const localizedNextPrayerName = nextPrayer ? getLocalizedPrayerName(nextPrayer.key) : "…";

  const countdownBlock = (
    <div>
      <div className="mb-2.5 flex items-center justify-between sm:justify-start gap-2">
        <div className="flex items-center gap-1.5">
          <Timer size={15} className="text-gold-600" aria-hidden="true" />
          <span className="text-xs font-bold tracking-wide text-ink-700">
            {t("prayerTimes.remainingFor")}{" "}
            <span className="text-sm font-bold text-gold-700">{localizedNextPrayerName}</span>
          </span>
        </div>
      </div>
      <div
        className="progress-track mb-3.5"
        role="progressbar"
        aria-label={t("prayerTimes.timeRemaining")}
        aria-valuenow={Math.round(nextPrayer?.progress ?? 0)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className="progress-fill" style={{ width: `${nextPrayer?.progress ?? 0}%` }} />
      </div>
      <div className="flex items-start justify-center sm:justify-start gap-1.5" aria-live="polite">
        {countdownParts.map((unit, i) => (
          <div key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="pb-4 text-base font-light text-gold-500">:</span>}
            <span className="flex flex-col items-center">
              <span className="countdown-box block">
                <span className="font-mono text-lg sm:text-xl font-extrabold tabular-nums text-ink-900">{unit}</span>
              </span>
              <span className="mt-1 text-[8.5px] sm:text-[9px] font-bold text-gold-700">{countdownLabels[i]}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const prayerTile = (key: string, index: number, compact: boolean) => {
    const time = prayerTimes?.[key] || "--:--";
    const isNext = isNextPrayerKey(key);
    const isCurrent = isCurrentPrayer(key);
    const localizedName = getLocalizedPrayerName(key);

    return (
      <div
        key={key}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-ink-200/80 bg-white p-2.5 sm:p-3 text-center shadow-[0_2px_10px_-6px_rgba(31,31,31,0.1)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400/60",
          isNext && "prayer-card-next shadow-[0_6px_20px_-8px_rgba(201,162,39,0.35)]",
          "animate-fade-in-up"
        )}
        style={{ animationDelay: `${index * 45}ms` }}
      >
        {isNext && (
          <span className="absolute end-2 top-2 flex h-2 w-2" aria-hidden="true">
            <span className="ping-dot absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
          </span>
        )}
        <div
          className={cn(
            "mx-auto mb-1 flex items-center justify-center rounded-xl",
            isNext
              ? "h-8 w-8 sm:h-9 sm:w-9 bg-gradient-to-br from-gold-100 to-gold-200 text-gold-700 shadow-xs"
              : "h-8 w-8 sm:h-9 sm:w-9 bg-ink-100 text-ink-500"
          )}
          aria-hidden="true"
        >
          {PRAYER_ICONS[key]}
        </div>
        <h3 className={cn("text-xs sm:text-sm font-bold leading-tight", isNext ? "text-gold-700" : "text-ink-800")}>
          {localizedName}
        </h3>
        <p className={cn("mb-0.5 mt-px text-[7.5px] sm:text-[8px] font-bold uppercase tracking-wider", isNext ? "text-gold-600/70" : "text-ink-400")}>
          {key}
        </p>
        <p className={cn("font-mono tabular-nums text-xs sm:text-base", isNext ? "font-extrabold text-gold-800" : "font-bold text-ink-700")}>
          {time}
        </p>
        {isNext && (
          <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-gold-500/25 bg-gold-100 px-1.5 py-0.2 text-[7.5px] font-bold text-gold-700">
            {t("prayerTimes.nextPrayer")}
          </span>
        )}
        {isCurrent && !isNext && (
          <span className="mt-1 inline-block rounded-full bg-ink-100 px-1.5 py-0.2 text-[7.5px] font-bold text-ink-500">
            {t("prayerTimes.currentPrayer")}
          </span>
        )}
      </div>
    );
  };

  /* ================= COMPACT VARIANT (home) ================= */
  if (variant === "compact") {
    return (
      <section className="relative" aria-labelledby="prayer-compact-heading">
        <div className="card overflow-hidden p-4 sm:p-6 lg:p-7">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="octagram h-10 w-10 sm:h-12 sm:w-12 text-gold-700" aria-hidden="true">
                <Clock size={18} strokeWidth={1.8} />
              </span>
              <div>
                <h2 id="prayer-compact-heading" className="text-base sm:text-lg font-bold text-ink-900">
                  {t("prayerTimes.todayTitle")}
                </h2>
                <p className="text-[11px] sm:text-xs text-ink-500">
                  {formatDate(now, { weekday: "long", day: "numeric", month: "long" })}
                  {hijriDate && (
                    <span className="text-gold-700 font-semibold"> • {formatNumber(hijriDate.day)} {hijriDate.month.ar} {formatNumber(hijriDate.year)} هـ</span>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowCityPicker(true)}
              className="touch-active flex cursor-pointer items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-50 px-3 py-1.5 text-xs font-bold text-gold-800 transition-colors hover:border-gold-500/60 shadow-xs"
              aria-haspopup="dialog"
            >
              <MapPin size={13} className="text-gold-600" />
              {selectedCityDisplayName}
              <ChevronDown size={12} className={cn("transition-transform duration-300", showCityPicker && "rotate-180")} />
            </button>
          </div>

          <div className="divider-gold my-4 sm:my-5" />

          {/* Body */}
          {loading ? (
            <div className="flex flex-col items-center py-8">
              <span className="h-8 w-8 animate-spin rounded-full border-2 border-ink-200 border-t-gold-500" aria-hidden="true" />
              <p className="mt-2.5 text-xs text-ink-500">{t("prayerTimes.updatingTimes")}</p>
            </div>
          ) : error ? (
            <ErrorState error={error} onRetry={refetch} retryText={t("common.retry")} />
          ) : (
            <div className="grid gap-5 lg:grid-cols-[300px_1fr] lg:items-center">
              {countdownBlock}
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {PRAYER_KEYS.map((key, i) => prayerTile(key, i, true))}
              </div>
            </div>
          )}
        </div>

        {mobileSheet}
        {desktopDropdown}
      </section>
    );
  }

  /* ================= FULL VARIANT (salaat page) ================= */
  return (
    <section aria-labelledby="prayer-full-heading">
      <div className="grid gap-3.5 lg:grid-cols-3">
        {/* Location & dates */}
        <div className="card-beige relative overflow-hidden p-4 sm:p-6">
          <div className="gold-hairline absolute inset-x-0 top-0 h-px" aria-hidden="true" />
          <h2 id="prayer-full-heading" className="sr-only">{t("prayerTimes.title")}</h2>

          <div className="relative z-10">
            <div className="relative">
              <button
                onClick={() => setShowCityPicker((o) => !o)}
                className="card touch-active flex w-full cursor-pointer items-center justify-between px-3.5 py-3 text-start"
                aria-expanded={showCityPicker}
                aria-haspopup="listbox"
              >
                <span className="flex items-center gap-2.5 sm:gap-3">
                  <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl border border-gold-500/25 bg-white text-gold-700" aria-hidden="true">
                    <MapPin size={16} />
                  </span>
                  <span className="text-start">
                    <span className="block text-sm sm:text-[15px] font-bold text-ink-900">{selectedCityDisplayName}</span>
                    <span className="block text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider text-ink-500">
                      {selectedCity.name}, {t("common.morocco")}
                    </span>
                  </span>
                </span>
                <ChevronDown size={15} className={cn("text-ink-400 transition-transform duration-300", showCityPicker && "rotate-180")} />
              </button>
              {desktopDropdown}
            </div>

            <div className="divider-gold my-4" />

            <dl className="space-y-2.5">
              <div className="flex items-center gap-2">
                <CalendarDays size={14} className="shrink-0 text-gold-600" aria-hidden="true" />
                <dt className="sr-only">{t("prayerTimes.gregorianDate")}</dt>
                <dd className="text-xs sm:text-sm font-semibold text-ink-700">
                  {formatDate(now, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </dd>
              </div>

              {hijriDate && (
                <div className="flex items-center gap-2">
                  <Moon size={14} className="shrink-0 text-gold-600" aria-hidden="true" />
                  <dt className="sr-only">{t("prayerTimes.hijriDate")}</dt>
                  <dd className="text-xs sm:text-sm font-bold text-gold-700">
                    {formatNumber(hijriDate.day)} {hijriDate.month.ar} {formatNumber(hijriDate.year)} هـ
                  </dd>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Clock size={14} className="shrink-0 text-gold-600" aria-hidden="true" />
                <dt className="sr-only">{t("prayerTimes.localTime")}</dt>
                <dd className="font-mono text-xs sm:text-sm font-bold tabular-nums text-ink-700">
                  {hours}:{minutes}
                  <span className="text-ink-400">:{seconds}</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Countdown card */}
        <div className="card-dark relative overflow-hidden p-4 sm:p-6 lg:col-span-2">
          <IslamicPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.08} />
          <div className="relative z-10 flex h-full flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="max-w-sm">
              {countdownBlock}
            </div>
            {nextPrayer && (
              <div className="flex shrink-0 flex-col items-center gap-1.5 self-center rounded-3xl border border-gold-500/20 bg-white/[0.04] px-6 py-4 text-center backdrop-blur-sm">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-300/20 to-transparent text-gold-300" aria-hidden="true">
                  {PRAYER_ICONS[nextPrayer.key]}
                </span>
                <p className="font-quran text-xl font-bold text-gradient-gold-light">{localizedNextPrayerName}</p>
                <p className="font-mono text-xs sm:text-sm font-bold tabular-nums tracking-widest text-gold-200/90">{nextPrayer.time}</p>
                <span className="rounded-full bg-gold-500/15 px-2.5 py-0.5 text-[8.5px] font-bold tracking-wider text-gold-300">
                  {t("prayerTimes.nextPrayer")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prayer grid */}
      <div className="mt-3.5">
        {loading ? (
          <div className="card flex flex-col items-center py-12">
            <span className="h-9 w-9 animate-spin rounded-full border-2 border-ink-200 border-t-gold-500" aria-hidden="true" />
            <p className="mt-3 text-xs text-ink-500">{t("prayerTimes.updatingTimes")}</p>
          </div>
        ) : error ? (
          <div className="card p-5">
            <ErrorState error={error} onRetry={refetch} retryText={t("common.retry")} />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6 lg:gap-3">
            {PRAYER_KEYS.map((key, i) => prayerTile(key, i, false))}
          </div>
        )}
      </div>

      {mobileSheet}
    </section>
  );
}

function ErrorState({ error, onRetry, retryText }: { error: string; onRetry: () => void; retryText: string }) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <X size={22} className="mb-2 rounded-full bg-red-50 p-1 text-red-500" aria-hidden="true" />
      <p className="mb-3 max-w-xs text-xs leading-relaxed text-red-500/90">{error}</p>
      <button
        onClick={onRetry}
        className="btn btn-primary btn-sm cursor-pointer !py-1.5 !px-3.5 !text-xs"
      >
        <RefreshCw size={12} aria-hidden="true" />
        {retryText}
      </button>
    </div>
  );
}
