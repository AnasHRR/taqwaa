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

interface PrayerTimesPanelProps {
  variant?: "compact" | "full";
}

export function PrayerTimesPanel({ variant = "full" }: PrayerTimesPanelProps) {
  const [selectedCity, setSelectedCity] = useState<City>(MOROCCAN_CITIES[0]);
  const [showCityPicker, setShowCityPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const now = useClock();
  const { prayerTimes, hijriDate, gregorianDate, loading, error, refetch } =
    usePrayerTimes(selectedCity);
  const nextPrayer = useNextPrayer(prayerTimes, now);

  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  });
  const [hours, minutes, seconds] = timeString.split(":");

  const filteredCities = MOROCCAN_CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.nameAr.includes(searchQuery)
  );

  const selectCity = (city: City) => {
    setSelectedCity(city);
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

  const countdownParts = nextPrayer?.remainingFormatted.split(":") || ["00", "00", "00"];
  const countdownLabels = ["ساعة", "دقيقة", "ثانية"];

  /* ---------------- shared pieces ---------------- */

  const renderCityList = () => (
    <div className="flex-1 overflow-y-auto px-2 pb-3" dir="rtl">
      {filteredCities.map((city) => {
        const isSelected = selectedCity.name === city.name;
        return (
          <button
            key={city.name}
            onClick={() => selectCity(city)}
            aria-pressed={isSelected}
            className={cn(
              "touch-active mb-0.5 flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors",
              isSelected ? "bg-gold-100/80" : "hover:bg-ink-100"
            )}
          >
            <span className="flex items-center gap-2">
              {isSelected && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-white">
                  <Check size={11} strokeWidth={3} />
                </span>
              )}
              <span className={cn("font-arabic text-sm font-bold", isSelected ? "text-gold-700" : "text-ink-900")}>
                {city.nameAr}
              </span>
            </span>
            <span className="text-xs text-ink-500">{city.name}</span>
          </button>
        );
      })}
      {filteredCities.length === 0 && (
        <p className="py-10 text-center font-arabic text-sm text-ink-500">لا توجد نتائج</p>
      )}
    </div>
  );

  const searchInput = (
    <div className="relative">
      <input
        type="text"
        placeholder="ابحث عن مدينة..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="ابحث عن مدينة"
        className="input-field !rounded-xl pe-10 text-right font-arabic"
        dir="rtl"
        autoFocus
      />
      <Search size={15} className="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
    </div>
  );

  /* Desktop dropdown */
  const desktopDropdown = showCityPicker && (
    <>
      <div className="fixed inset-0 z-30 cursor-default" onClick={closePicker} aria-hidden="true" />
      <div className="absolute start-0 end-0 top-full z-40 mt-2 animate-slide-down-in hidden md:block">
        <div className="flex max-h-[380px] flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-[0_24px_60px_-24px_rgba(31,31,31,0.35)]">
          <div className="p-3">{searchInput}</div>
          {renderCityList()}
        </div>
      </div>
    </>
  );

  /* Mobile bottom sheet */
  const mobileSheet = showCityPicker && (
    <div className="md:hidden">
      <div className="fixed inset-0 z-[60] animate-fade-in bg-ink-900/40 backdrop-blur-sm" onClick={closePicker} aria-hidden="true" />
      <div className="safe-bottom fixed bottom-0 left-0 right-0 z-[70] animate-slide-up">
        <div className="flex max-h-[62dvh] flex-col rounded-t-[26px] border-t border-x border-ink-200 bg-white shadow-2xl">
          <div className="flex items-center justify-center py-2.5" aria-hidden="true">
            <span className="h-1 w-9 rounded-full bg-ink-300" />
          </div>
          <div className="flex items-center justify-between px-4 pb-2.5">
            <h3 className="font-arabic text-sm font-bold text-ink-900">اختر مدينتك</h3>
            <button onClick={closePicker} aria-label="إغلاق" className="icon-btn h-8 w-8">
              <X size={14} />
            </button>
          </div>
          <div className="px-4 pb-2.5">{searchInput}</div>
          {renderCityList()}
        </div>
      </div>
    </div>
  );

  const countdownBlock = (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <Timer size={15} className="text-gold-600" aria-hidden="true" />
        <span className="font-arabic text-[11px] font-bold tracking-wide text-ink-600">
          الوقت المتبقي حتى صلاة{" "}
          <span className="font-quran text-sm font-bold text-gold-700">{nextPrayer?.nameAr ?? "…"}</span>
        </span>
      </div>
      <div className="progress-track mb-4" role="progressbar" aria-label="تقدم الوقت الحالي" aria-valuenow={Math.round(nextPrayer?.progress ?? 0)} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill" style={{ width: `${nextPrayer?.progress ?? 0}%` }} />
      </div>
      <div className="flex items-start gap-1.5" aria-live="polite">
        {countdownParts.map((unit, i) => (
          <div key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="pb-5 text-lg font-light text-gold-500">:</span>}
            <span className="flex flex-col items-center">
              <span className="countdown-box block">
                <span className="font-mono text-xl font-extrabold tabular-nums text-ink-900">{unit}</span>
              </span>
              <span className="mt-1.5 text-[9px] font-bold text-gold-700">{countdownLabels[i]}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const prayerTile = (key: string, index: number, compact: boolean) => {
    const info = PRAYER_INFO[key];
    const time = prayerTimes?.[key] || "--:--";
    const isNext = isNextPrayerKey(key);
    const isCurrent = isCurrentPrayer(key);

    return (
      <div
        key={key}
        className={cn(
          "relative overflow-hidden rounded-2xl border border-ink-200/80 bg-white p-3 text-center shadow-[0_2px_10px_-6px_rgba(31,31,31,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/60",
          isNext && "prayer-card-next",
          compact ? "animate-fade-in-up" : "animate-fade-in-up"
        )}
        style={{ animationDelay: `${index * 55}ms` }}
      >
        {isNext && (
          <span className="absolute end-2.5 top-2.5 relative flex h-2 w-2" aria-hidden="true">
            <span className="ping-dot absolute inline-flex h-full w-full rounded-full bg-gold-500 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-500" />
          </span>
        )}
        <div
          className={cn(
            "mx-auto mb-1.5 flex items-center justify-center rounded-xl",
            isNext ? "h-9 w-9 bg-gradient-to-br from-gold-100 to-gold-200/60 text-gold-700" : "h-9 w-9 bg-ink-100 text-ink-500"
          )}
          aria-hidden="true"
        >
          {PRAYER_ICONS[key]}
        </div>
        <h3 className={cn("font-arabic text-sm font-bold leading-tight", isNext ? "text-gold-700" : "text-ink-800")}>
          {info.nameAr}
        </h3>
        <p className={cn("mb-1 mt-px text-[8px] font-bold uppercase tracking-[0.14em]", isNext ? "text-gold-600/70" : "text-ink-400")}>
          {key}
        </p>
        <p className={cn("font-mono tabular-nums", compact ? "text-sm" : "text-lg", isNext ? "font-extrabold text-gold-700" : "font-bold text-ink-700")}>
          {time}
        </p>
        {isNext && (
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full border border-gold-500/25 bg-gold-100 px-2 py-0.5 font-arabic text-[8px] font-bold text-gold-700">
            التالية
          </span>
        )}
        {isCurrent && !isNext && (
          <span className="mt-1.5 inline-block rounded-full bg-ink-100 px-2 py-0.5 font-arabic text-[8px] font-bold text-ink-500">
            الحالية
          </span>
        )}
      </div>
    );
  };

  /* ================= COMPACT VARIANT (home) ================= */
  if (variant === "compact") {
    return (
      <section className="relative" aria-labelledby="prayer-compact-heading">
        <div className="card overflow-hidden p-5 sm:p-7">
          {/* header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="octagram h-12 w-12 text-gold-700" aria-hidden="true">
                <Clock size={20} strokeWidth={1.8} />
              </span>
              <div>
                <h2 id="prayer-compact-heading" className="font-arabic text-lg font-bold text-ink-900">مواقيت اليوم</h2>
                <p className="text-xs text-ink-500">
                  {gregorianDate ? `${gregorianDate.weekday.en}, ${gregorianDate.day} ${gregorianDate.month.en} ${gregorianDate.year}` : "…"}
                  {hijriDate && <span className="font-arabic text-gold-700"> • {hijriDate.day} {hijriDate.month.ar} {hijriDate.year} هـ</span>}
                </p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowCityPicker(true)}
                className="touch-active flex cursor-pointer items-center gap-1.5 rounded-full border border-gold-500/30 bg-gold-50 px-3.5 py-2 font-arabic text-xs font-bold text-gold-700 transition-colors hover:border-gold-500/60"
                aria-haspopup="dialog"
              >
                <MapPin size={13} />
                {selectedCity.nameAr}
                <ChevronDown size={12} className={cn("transition-transform duration-300", showCityPicker && "rotate-180")} />
              </button>
            </div>
          </div>

          <div className="divider-gold my-5" />

          {/* body */}
          {loading ? (
            <div className="flex flex-col items-center py-10">
              <span className="h-9 w-9 animate-spin rounded-full border-2 border-ink-200 border-t-gold-500" aria-hidden="true" />
              <p className="mt-3 font-arabic text-xs text-ink-500">جاري تحميل مواقيت الصلاة...</p>
            </div>
          ) : error ? (
            <ErrorState error={error} onRetry={refetch} />
          ) : (
            <div className="grid gap-5 lg:grid-cols-[320px_1fr] lg:items-center">
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
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Location & dates */}
        <div className="card-beige relative overflow-hidden p-5 sm:p-6">
          <div className="gold-hairline absolute inset-x-0 top-0 h-px" aria-hidden="true" />
          <h2 id="prayer-full-heading" className="sr-only">Prayer Times</h2>

          <div className="relative z-10">
            <div className="relative">
              <button
                onClick={() => setShowCityPicker((o) => !o)}
                className="card touch-active flex w-full cursor-pointer items-center justify-between px-4 py-3.5"
                aria-expanded={showCityPicker}
                aria-haspopup="listbox"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-gold-500/25 bg-white text-gold-700" aria-hidden="true">
                    <MapPin size={17} />
                  </span>
                  <span className="text-start">
                    <span className="block font-arabic text-[15px] font-bold text-ink-900">{selectedCity.nameAr}</span>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-ink-500">
                      {selectedCity.name}, Morocco
                    </span>
                  </span>
                </span>
                <ChevronDown size={16} className={cn("text-ink-400 transition-transform duration-300", showCityPicker && "rotate-180")} />
              </button>
              {desktopDropdown}
            </div>

            <div className="divider-gold my-5" />

            <dl className="space-y-3" dir="ltr">
              {gregorianDate && (
                <div className="flex items-center gap-2.5">
                  <CalendarDays size={15} className="shrink-0 text-gold-600" aria-hidden="true" />
                  <dt className="sr-only">Gregorian date</dt>
                  <dd className="text-sm font-semibold text-ink-700">
                    {gregorianDate.weekday.en}, {gregorianDate.day} {gregorianDate.month.en} {gregorianDate.year}
                  </dd>
                </div>
              )}
              {hijriDate && (
                <div className="flex items-center gap-2.5">
                  <Moon size={15} className="shrink-0 text-gold-600" aria-hidden="true" />
                  <dt className="sr-only">Hijri date</dt>
                  <dd className="font-arabic text-sm font-bold text-gold-700" dir="rtl">
                    {hijriDate.day} {hijriDate.month.ar} {hijriDate.year} هـ
                  </dd>
                </div>
              )}
              <div className="flex items-center gap-2.5">
                <Clock size={15} className="shrink-0 text-gold-600" aria-hidden="true" />
                <dt className="sr-only">Local time</dt>
                <dd className="font-mono text-sm font-bold tabular-nums text-ink-700">
                  {hours}:{minutes}
                  <span className="text-ink-400">:{seconds}</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Countdown */}
        <div className="card-dark relative overflow-hidden p-5 sm:p-6 lg:col-span-2">
          <IslamicPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.08} />
          <div className="relative z-10 flex h-full flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div className="max-w-sm">
              {countdownBlock}
            </div>
            {nextPrayer && (
              <div className="flex shrink-0 flex-col items-center gap-2 self-center rounded-3xl border border-gold-500/20 bg-white/[0.04] px-8 py-6 text-center backdrop-blur-sm">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-300/20 to-transparent text-gold-300" aria-hidden="true">
                  {PRAYER_ICONS[nextPrayer.key]}
                </span>
                <p className="font-quran text-2xl font-bold text-gradient-gold-light">{nextPrayer.nameAr}</p>
                <p className="font-mono text-sm font-bold tabular-nums tracking-widest text-gold-200/90">{nextPrayer.time}</p>
                <span className="rounded-full bg-gold-500/15 px-3 py-1 font-arabic text-[9px] font-bold tracking-widest text-gold-300">
                  الصلاة القادمة
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Prayer grid */}
      <div className="mt-4">
        {loading ? (
          <div className="card flex flex-col items-center py-16">
            <span className="h-10 w-10 animate-spin rounded-full border-2 border-ink-200 border-t-gold-500" aria-hidden="true" />
            <p className="mt-4 font-arabic text-sm text-ink-500">جاري تحميل مواقيت الصلاة...</p>
          </div>
        ) : error ? (
          <div className="card p-6">
            <ErrorState error={error} onRetry={refetch} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3">
            {PRAYER_KEYS.map((key, i) => prayerTile(key, i, false))}
          </div>
        )}
      </div>

      {mobileSheet}
    </section>
  );
}

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <X size={26} className="mb-3 rounded-full bg-red-50 p-1.5 text-red-500" aria-hidden="true" />
      <p className="mb-4 max-w-xs font-arabic text-xs leading-relaxed text-red-500/90" dir="rtl">{error}</p>
      <button
        onClick={onRetry}
        className="btn btn-primary btn-sm cursor-pointer"
      >
        <RefreshCw size={13} aria-hidden="true" />
        إعادة المحاولة
      </button>
    </div>
  );
}
