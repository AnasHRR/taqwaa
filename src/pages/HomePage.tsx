import { useState } from "react";
import {
  Moon, Sun, Sunrise, Sunset, CloudSun, Star, Stars,
  MapPin, ChevronDown, Search, Check, Timer, Clock,
  RefreshCw, X, CalendarDays, Sparkles
} from "lucide-react";
import { MOROCCAN_CITIES, PRAYER_KEYS, PRAYER_INFO } from "../constants";
import { usePrayerTimes } from "../hooks/usePrayerTimes";
import { useClock } from "../hooks/useClock";
import { useNextPrayer } from "../hooks/useNextPrayer";
import { City } from "../types";

const PRAYER_ICONS: Record<string, React.ReactNode> = {
  Fajr: <Moon size={20} strokeWidth={1.8} />,
  Sunrise: <Sunrise size={20} strokeWidth={1.8} />,
  Dhuhr: <Sun size={20} strokeWidth={1.8} />,
  Asr: <CloudSun size={20} strokeWidth={1.8} />,
  Maghrib: <Sunset size={20} strokeWidth={1.8} />,
  Isha: <Stars size={20} strokeWidth={1.8} />,
};

const PRAYER_ICONS_LG: Record<string, React.ReactNode> = {
  Fajr: <Moon size={26} strokeWidth={1.8} />,
  Sunrise: <Sunrise size={26} strokeWidth={1.8} />,
  Dhuhr: <Sun size={26} strokeWidth={1.8} />,
  Asr: <CloudSun size={26} strokeWidth={1.8} />,
  Maghrib: <Sunset size={26} strokeWidth={1.8} />,
  Isha: <Stars size={26} strokeWidth={1.8} />,
};

export function HomePage() {
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

  /* ---------- City list renderer ---------- */
  const renderCityList = (compact?: boolean) => (
    <div className={`overflow-y-auto flex-1 ${compact ? "px-1.5" : "px-2"} pb-3`} dir="rtl">
      {filteredCities.map((city) => {
        const isSelected = selectedCity.name === city.name;
        return (
          <button
            key={city.name}
            onClick={() => selectCity(city)}
            className={`w-full flex items-center justify-between ${compact ? "px-3 py-2.5" : "px-3 py-3"} rounded-xl mb-0.5 transition-all touch-active cursor-pointer
              ${isSelected ? "bg-gold-500/8" : "hover:bg-dark-800/50"}`}
          >
            <div className="flex items-center gap-2">
              {isSelected && (
                <div className="w-5 h-5 rounded-full bg-gold-500/15 flex items-center justify-center">
                  <Check size={11} className="text-gold-400" />
                </div>
              )}
              <span className={`font-bold text-sm ${isSelected ? "text-gold-400" : "text-white"}`}>
                {city.nameAr}
              </span>
            </div>
            <span className="text-dark-400 text-xs">{city.name}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="animate-page-enter">

      {/* ============================================================ */}
      {/* HEADER — MOBILE                                              */}
      {/* ============================================================ */}
      <div className="md:hidden px-4 pt-3 pb-2">
        {/* Row 1: Logo + City badge */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="animate-float">
              <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-gold-500/12 to-gold-600/4 flex items-center justify-center border border-gold-500/10 shadow-lg shadow-gold-500/5">
                <Moon size={20} className="text-gold-400" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold font-[Amiri] text-gradient-gold leading-tight">تقوى</h1>
              <span className="text-dark-500 text-[7px] tracking-[0.12em] uppercase">Prayer Times</span>
            </div>
          </div>
          <button
            onClick={() => setShowCityPicker(true)}
            className="flex items-center gap-1.5 bg-dark-800/70 px-2.5 py-1.5 rounded-xl border border-dark-700/30 touch-active cursor-pointer"
          >
            <MapPin size={12} className="text-gold-400" />
            <span className="text-gold-400 text-[11px] font-bold font-[Amiri]">{selectedCity.nameAr}</span>
            <ChevronDown size={10} className={`text-dark-500 transition-transform duration-300 ${showCityPicker ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Row 2: Clock card */}
        <div className="card-elevated px-4 py-3 flex items-center justify-between">
          <div className="flex items-baseline">
            <span className="text-[30px] font-extrabold text-white font-mono tabular-nums leading-none">{hours}</span>
            <span className="text-[28px] font-light text-gold-400 animate-pulse-soft leading-none mx-[2px]">:</span>
            <span className="text-[30px] font-extrabold text-white font-mono tabular-nums leading-none">{minutes}</span>
            <span className="text-[18px] font-bold text-dark-400 font-mono tabular-nums leading-none ml-1 self-end mb-[2px]">{seconds}</span>
          </div>
          {gregorianDate && hijriDate && (
            <div className="flex flex-col items-end">
              <span className="text-gold-400/90 text-[11px] font-[Amiri] font-bold leading-tight">
                {hijriDate.day} {hijriDate.month.ar} {hijriDate.year} هـ
              </span>
              <span className="text-dark-400 text-[9px] leading-tight mt-0.5">
                {gregorianDate.day} {gregorianDate.month.en} {gregorianDate.year}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* HEADER — TABLET / DESKTOP                                    */}
      {/* ============================================================ */}
      <div className="hidden md:block px-8 lg:px-10 pt-8 pb-4">
        <div className="relative z-10 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="animate-float">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-3xl bg-gradient-to-br from-gold-500/12 to-gold-600/4 flex items-center justify-center border border-gold-500/10 shadow-xl shadow-gold-500/5">
                <Moon size={36} className="text-gold-400 lg:hidden" strokeWidth={1.5} />
                <Moon size={44} className="text-gold-400 hidden lg:block" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold font-[Amiri] text-gradient-gold leading-tight">تقوى</h1>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold-500/30" />
                <span className="text-dark-300 text-[10px] lg:text-[11px] tracking-[0.2em] uppercase">Taqwaa • Prayer Times</span>
                <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold-500/30" />
              </div>
            </div>
          </div>

          <div className="card-elevated px-8 py-5 lg:px-12 lg:py-6 flex flex-col items-center">
            <div className="flex items-center gap-1 mb-1">
              <Clock size={14} className="text-gold-500/40" />
              <span className="text-dark-500 text-[9px] tracking-wider uppercase font-semibold">التوقيت الحالي</span>
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-[44px] lg:text-[56px] font-extrabold text-white font-mono tabular-nums leading-none">{hours}</span>
              <span className="text-[44px] lg:text-[56px] font-light text-gold-400 animate-pulse-soft leading-none mx-0.5">:</span>
              <span className="text-[44px] lg:text-[56px] font-extrabold text-white font-mono tabular-nums leading-none">{minutes}</span>
              <span className="text-[44px] lg:text-[56px] font-light text-gold-400 animate-pulse-soft leading-none mx-0.5">:</span>
              <span className="text-[28px] lg:text-[36px] font-bold text-dark-300 font-mono tabular-nums leading-none self-end mb-1">{seconds}</span>
            </div>
            {gregorianDate && hijriDate && (
              <div className="flex flex-col items-center gap-1 mt-3">
                <div className="divider-gold w-24" />
                <div className="flex items-center gap-2 mt-1">
                  <CalendarDays size={12} className="text-dark-400" />
                  <span className="text-dark-200 text-[11px] lg:text-xs">
                    {gregorianDate.weekday.en}, {gregorianDate.day} {gregorianDate.month.en} {gregorianDate.year}
                  </span>
                </div>
                <span className="text-gold-400/90 text-xs lg:text-sm font-[Amiri] font-bold">
                  {hijriDate.day} {hijriDate.month.ar} {hijriDate.year} هـ
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* COUNTDOWN — MOBILE                                           */}
      {/* ============================================================ */}
      {nextPrayer && !loading && (
        <div className="md:hidden px-4 mt-2 mb-3 animate-fade-in-up" style={{ animationDelay: "80ms" }}>
          <div className="card-elevated p-3.5 relative overflow-hidden animate-glow border-gold-500/12">
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gold-500/[0.03] rounded-full blur-2xl" />

            <div className="progress-track mb-2.5">
              <div className="progress-fill" style={{ width: `${nextPrayer.progress}%` }} />
            </div>

            <div className="flex items-center justify-between gap-2">
              {/* Countdown */}
              <div className="min-w-0">
                <div className="flex items-center gap-1 mb-1.5">
                  <Timer size={10} className="text-dark-500" />
                  <span className="text-[8px] text-dark-400 tracking-wider font-semibold">الوقت المتبقي</span>
                </div>
                <div className="flex items-center gap-[5px]">
                  {countdownParts.map((unit, i) => (
                    <div key={i} className="flex items-center gap-[5px]">
                      {i > 0 && <span className="text-gold-500/30 text-sm font-light leading-none">:</span>}
                      <div className="bg-dark-800/70 border border-white/[0.04] rounded-[10px] px-2.5 py-1.5 min-w-[38px] text-center">
                        <span className="text-[18px] font-extrabold text-white font-mono tabular-nums leading-none">{unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex mt-1">
                  {countdownLabels.map((label, i) => (
                    <span key={i} className="text-[7px] text-dark-500 text-center" style={{ width: i === 0 ? "38px" : "50px", marginLeft: i === 0 ? "0" : "0" }}>{label}</span>
                  ))}
                </div>
              </div>

              {/* Prayer info */}
              <div className="text-right flex-shrink-0">
                <div className="w-11 h-11 rounded-[14px] bg-gradient-to-br from-gold-500/12 to-gold-600/4 flex items-center justify-center border border-gold-500/10 mb-1 mx-auto text-gold-400">
                  {PRAYER_ICONS[nextPrayer.key]}
                </div>
                <h3 className="text-base font-bold text-gold-400 font-[Amiri] leading-tight">{nextPrayer.nameAr}</h3>
                <div className="flex items-center justify-end gap-1 mt-0.5">
                  <span className="text-dark-400 text-[8px]">القادمة</span>
                  <span className="text-gold-300/50 text-[10px] font-mono">{nextPrayer.time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* CITY + COUNTDOWN — TABLET / DESKTOP                          */}
      {/* ============================================================ */}
      <div className="hidden md:block px-8 lg:px-10 mb-5">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* City selector */}
          <div className="relative z-40 lg:w-[340px] flex-shrink-0">
            <button
              onClick={() => setShowCityPicker(!showCityPicker)}
              className="w-full card flex items-center justify-between px-4 py-3.5 touch-active cursor-pointer hover:border-gold-500/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-500/12 to-gold-600/4 flex items-center justify-center border border-gold-500/10">
                  <MapPin size={18} className="text-gold-400" />
                </div>
                <div className="text-right">
                  <span className="block text-[15px] font-bold text-gold-400 font-[Amiri]">{selectedCity.nameAr}</span>
                  <span className="block text-[10px] text-dark-300">{selectedCity.name}, Morocco</span>
                </div>
              </div>
              <ChevronDown size={16} className={`text-dark-400 transition-transform duration-300 ${showCityPicker ? "rotate-180" : ""}`} />
            </button>

            {/* Desktop dropdown */}
            {showCityPicker && (
              <>
                <div className="fixed inset-0 z-30" onClick={closePicker} />
                <div className="absolute top-full left-0 right-0 z-40 mt-2 animate-slide-down-in">
                  <div className="card-elevated max-h-[400px] flex flex-col overflow-hidden border border-dark-700/30">
                    <div className="p-3">
                      <div className="relative">
                        <input
                          type="text" placeholder="ابحث عن مدينة..." value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-dark-800/80 rounded-xl pl-4 pr-10 py-2.5 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-gold-500/15 text-right text-sm border border-dark-700/30"
                          dir="rtl" autoFocus
                        />
                        <Search size={16} className="text-dark-400 absolute right-3 top-1/2 -translate-y-1/2" />
                      </div>
                    </div>
                    {renderCityList(true)}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Next Prayer Countdown */}
          {nextPrayer && !loading && (
            <div className="flex-1 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <div className="card-elevated p-5 lg:p-6 relative overflow-hidden animate-glow border-gold-500/12">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-500/[0.03] rounded-full blur-2xl" />

                <div className="progress-track mb-4">
                  <div className="progress-fill" style={{ width: `${nextPrayer.progress}%` }} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Timer size={13} className="text-dark-500" />
                      <span className="text-[10px] text-dark-400 tracking-wider font-semibold">الوقت المتبقي</span>
                    </div>
                    <div className="flex items-center gap-1.5 animate-countdown">
                      {countdownParts.map((unit, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          {i > 0 && <span className="text-gold-500/30 text-lg font-light">:</span>}
                          <div className="countdown-box">
                            <span className="text-2xl lg:text-3xl font-extrabold text-white font-mono tabular-nums">{unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-6 mt-1.5 pr-1">
                      {countdownLabels.map((label, i) => (
                        <span key={i} className="text-[8px] text-dark-500 text-center w-[56px]">{label}</span>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-gold-500/12 to-gold-600/4 flex items-center justify-center border border-gold-500/10 mb-2 mx-auto text-gold-400">
                      {PRAYER_ICONS_LG[nextPrayer.key]}
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gold-400 font-[Amiri]">{nextPrayer.nameAr}</h3>
                    <div className="flex items-center justify-end gap-1.5 mt-0.5">
                      <span className="text-dark-400 text-[10px]">القادمة</span>
                      <span className="text-dark-600">•</span>
                      <span className="text-gold-300/60 text-xs font-mono">{nextPrayer.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* PRAYER TIMES GRID                                            */}
      {/* ============================================================ */}
      <div className="px-4 sm:px-5 md:px-8 lg:px-10 mb-4 md:mb-6">
        {/* Section title */}
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div className="flex-1 divider-gold" />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Star size={11} className="text-gold-500/40" />
            <h2 className="text-gold-400 font-[Amiri] text-sm sm:text-lg lg:text-xl font-bold">مواقيت الصلاة</h2>
            <Star size={11} className="text-gold-500/40" />
          </div>
          <div className="flex-1 divider-gold" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-14 sm:py-20">
            <div className="w-9 h-9 sm:w-12 sm:h-12 border-2 border-dark-700 border-t-gold-400 rounded-full animate-spin" />
            <p className="text-dark-300 mt-3 text-xs sm:text-sm font-[Amiri]">جاري تحميل مواقيت الصلاة...</p>
          </div>
        ) : error ? (
          <div className="card text-center py-10 px-4">
            <X size={28} className="text-red-400/60 mx-auto mb-3" />
            <p className="text-red-300/80 mb-3 text-xs sm:text-sm">{error}</p>
            <button onClick={refetch} className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 px-5 py-2 rounded-2xl font-bold text-xs touch-active cursor-pointer shadow-lg shadow-gold-500/15">
              <RefreshCw size={13} />
              إعادة المحاولة
            </button>
          </div>
        ) : (
          <>
            {/* ---- MOBILE: 3-column compact cards ---- */}
            <div className="grid grid-cols-3 gap-[7px] sm:hidden">
              {PRAYER_KEYS.map((key, index) => {
                const info = PRAYER_INFO[key];
                const time = prayerTimes?.[key] || "--:--";
                const isNext = isNextPrayerKey(key);
                const isCurrent = isCurrentPrayer(key);

                return (
                  <div
                    key={key}
                    className={`relative rounded-2xl overflow-hidden p-3 transition-all
                      ${info.cssClass}
                      ${isNext ? "prayer-card-next ring-1 ring-gold-500/20" : ""}
                      ${isCurrent && !isNext ? "prayer-card-current ring-1 ring-accent-teal/10" : ""}
                      animate-fade-in-up`}
                    style={{ animationDelay: `${index * 50 + 80}ms` }}
                  >
                    {isNext && (
                      <div className="absolute top-2 right-2 z-10">
                        <span className="relative flex h-[6px] w-[6px]">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-50" />
                          <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-gold-400" />
                        </span>
                      </div>
                    )}

                    <div className="relative z-10 text-center">
                      <div className={`mx-auto w-9 h-9 rounded-xl flex items-center justify-center mb-1.5
                        ${isNext ? "bg-gold-500/15 text-gold-300" : "bg-white/[0.05] text-white/50"}`}>
                        {PRAYER_ICONS[key]}
                      </div>
                      <h3 className={`text-[12px] font-bold font-[Amiri] leading-tight
                        ${isNext ? "text-gold-300" : "text-white/90"}`}>
                        {info.nameAr}
                      </h3>
                      <p className={`text-[6px] uppercase tracking-[0.1em] mt-[1px] mb-1
                        ${isNext ? "text-gold-400/35" : "text-white/15"}`}>
                        {key}
                      </p>
                      <div className={`text-[14px] font-extrabold font-mono tabular-nums
                        ${isNext ? "text-gold-300" : "text-white/80"}`}>
                        {time}
                      </div>
                      {isNext && (
                        <span className="inline-flex items-center gap-[2px] mt-1 text-[5px] bg-gold-500/10 text-gold-400 px-1.5 py-[2px] rounded-full font-bold tracking-wider border border-gold-500/12">
                          <Sparkles size={6} />
                          التالية
                        </span>
                      )}
                      {isCurrent && !isNext && (
                        <span className="inline-block mt-1 text-[5px] bg-accent-teal/8 text-accent-teal px-1.5 py-[2px] rounded-full font-bold tracking-wider">
                          الحالية
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ---- TABLET/DESKTOP: Larger cards ---- */}
            <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
              {PRAYER_KEYS.map((key, index) => {
                const info = PRAYER_INFO[key];
                const time = prayerTimes?.[key] || "--:--";
                const isNext = isNextPrayerKey(key);
                const isCurrent = isCurrentPrayer(key);

                return (
                  <div
                    key={key}
                    className={`prayer-card ${info.cssClass}
                      ${isNext ? "prayer-card-next" : ""}
                      ${isCurrent && !isNext ? "prayer-card-current" : ""}
                      animate-fade-in-up`}
                    style={{ animationDelay: `${index * 70 + 150}ms` }}
                  >
                    {isNext && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-50" />
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold-400" />
                        </span>
                      </div>
                    )}

                    <div className="relative z-10 text-center">
                      <div className={`mx-auto w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center mb-2
                        ${isNext ? "bg-gold-500/12 text-gold-300 border border-gold-500/15" : "bg-white/[0.04] text-white/60"}`}>
                        {PRAYER_ICONS_LG[key]}
                      </div>
                      <h3 className={`text-[15px] lg:text-base font-bold font-[Amiri] mb-0.5
                        ${isNext ? "text-gold-300" : "text-white"}`}>
                        {info.nameAr}
                      </h3>
                      <p className={`text-[8px] uppercase tracking-[0.15em] mb-2
                        ${isNext ? "text-gold-400/40" : "text-white/20"}`}>
                        {key}
                      </p>
                      <div className={`w-6 h-[1px] mx-auto mb-2
                        ${isNext ? "bg-gold-400/20" : "bg-white/[0.06]"}`} />
                      <div className={`text-xl lg:text-2xl font-extrabold font-mono tabular-nums
                        ${isNext ? "text-gold-300" : "text-white/85"}`}>
                        {time}
                      </div>
                      {isNext && (
                        <span className="inline-flex items-center gap-1 mt-2 text-[7px] bg-gold-500/10 text-gold-400 px-2.5 py-1 rounded-full font-bold tracking-wider border border-gold-500/12">
                          <Sparkles size={8} />
                          التالية
                        </span>
                      )}
                      {isCurrent && !isNext && (
                        <span className="inline-block mt-2 text-[7px] bg-accent-teal/6 text-accent-teal px-2.5 py-1 rounded-full font-bold tracking-wider border border-accent-teal/8">
                          الحالية
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* ============================================================ */}
      {/* VERSE                                                        */}
      {/* ============================================================ */}
      <div className="px-4 sm:px-5 md:px-8 lg:px-10 mb-4 md:mb-6 animate-fade-in-up" style={{ animationDelay: "450ms" }}>
        <div className="card-subtle p-4 sm:p-6 lg:p-8 text-center relative overflow-hidden max-w-3xl mx-auto">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/12 to-transparent" />
          <Sparkles size={14} className="text-gold-500/10 mx-auto mb-1.5 sm:hidden" />
          <Sparkles size={20} className="text-gold-500/10 mx-auto mb-2 hidden sm:block" />
          <p className="text-gold-300/85 text-sm sm:text-lg lg:text-xl font-[Amiri] leading-[2] px-1 sm:px-4" dir="rtl">
            إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا
          </p>
          <div className="divider-gold w-8 sm:w-12 mx-auto my-2 sm:my-3" />
          <p className="text-dark-500 text-[8px] sm:text-[10px] tracking-wider">سورة النساء • الآية ١٠٣</p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FOOTER (mobile only)                                         */}
      {/* ============================================================ */}
      <div className="px-4 pb-2 lg:hidden">
        <div className="flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1.5">
            <div className="w-[6px] h-[6px] rounded-full bg-gradient-to-br from-red-500 to-red-700" />
            <span className="text-dark-500 text-[7px] sm:text-[9px] tracking-[0.12em]">المملكة المغربية</span>
            <div className="w-[6px] h-[6px] rounded-full bg-gradient-to-br from-green-500 to-green-700" />
          </div>
          <span className="text-dark-600 text-[6px] sm:text-[8px]">Powered by aladhan.com</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CITY PICKER — MOBILE BOTTOM SHEET                            */}
      {/* ============================================================ */}
      {showCityPicker && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={closePicker} />
          <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
            <div className="bg-dark-900 rounded-t-[22px] border-t border-x border-dark-700/40 max-h-[60dvh] flex flex-col shadow-2xl safe-bottom">
              {/* Drag handle */}
              <div className="flex items-center justify-center py-2">
                <div className="w-8 h-[3px] rounded-full bg-dark-600" />
              </div>
              {/* Title row */}
              <div className="flex items-center justify-between px-4 pb-2">
                <h3 className="text-gold-400 font-[Amiri] font-bold text-sm">اختر مدينتك</h3>
                <button onClick={closePicker} className="w-7 h-7 rounded-full bg-dark-800 flex items-center justify-center touch-active cursor-pointer">
                  <X size={13} className="text-dark-300" />
                </button>
              </div>
              {/* Search */}
              <div className="px-4 pb-2">
                <div className="relative">
                  <input
                    type="text" placeholder="ابحث عن مدينة..." value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-dark-800 rounded-xl pl-3 pr-9 py-2.5 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-gold-500/15 text-right text-[13px] border border-dark-700/40"
                    dir="rtl" autoFocus
                  />
                  <Search size={15} className="text-dark-400 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              {/* City list */}
              {renderCityList()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
