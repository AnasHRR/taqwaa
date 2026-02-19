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
  Fajr: <Moon size={26} strokeWidth={1.8} />,
  Sunrise: <Sunrise size={26} strokeWidth={1.8} />,
  Dhuhr: <Sun size={26} strokeWidth={1.8} />,
  Asr: <CloudSun size={26} strokeWidth={1.8} />,
  Maghrib: <Sunset size={26} strokeWidth={1.8} />,
  Isha: <Stars size={26} strokeWidth={1.8} />,
};

/* Prayer icons used in grid */

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

  const isNextPrayerKey = (key: string) => nextPrayer?.key === key;
  const isCurrentPrayer = (key: string): boolean => {
    if (!prayerTimes || !nextPrayer) return false;
    const keys = PRAYER_KEYS.filter((k) => k !== "Sunrise");
    const nextIdx = keys.indexOf(nextPrayer.key as typeof keys[number]);
    const currentIdx = nextIdx - 1;
    if (currentIdx >= 0) return keys[currentIdx] === key;
    return key === "Isha";
  };

  return (
    <div className="animate-page-enter">
      {/* ===== HEADER ===== */}
      <div className="relative px-5 md:px-8 lg:px-10 pt-5 md:pt-8 pb-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-b from-gold-500/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Desktop: Side-by-side layout */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Crescent + Title */}
          <div className="flex flex-col items-center lg:items-start lg:flex-row lg:gap-6">
            <div className="animate-float mb-2 lg:mb-0">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-3xl bg-gradient-to-br from-gold-500/12 to-gold-600/4 flex items-center justify-center border border-gold-500/10 shadow-xl shadow-gold-500/5">
                <Moon size={36} className="text-gold-400 lg:hidden" strokeWidth={1.5} />
                <Moon size={44} className="text-gold-400 hidden lg:block" strokeWidth={1.5} />
              </div>
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold font-[Amiri] text-gradient-gold leading-tight">تقوى</h1>
              <div className="flex items-center gap-2 mt-1 justify-center lg:justify-start">
                <div className="w-8 h-[1px] bg-gradient-to-r from-transparent to-gold-500/30" />
                <span className="text-dark-300 text-[10px] lg:text-[11px] tracking-[0.2em] uppercase">Taqwaa - Prayer Times</span>
                <div className="w-8 h-[1px] bg-gradient-to-l from-transparent to-gold-500/30" />
              </div>
            </div>
          </div>

          {/* Clock — always prominent */}
          <div className="flex justify-center">
            <div className="card-elevated px-8 py-5 lg:px-12 lg:py-6 flex flex-col items-center">
              <div className="flex items-center gap-1 mb-1">
                <Clock size={14} className="text-gold-500" />
                <span className="text-dark-200 text-[9px] tracking-wider uppercase font-semibold">التوقيت الحالي</span>
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
      </div>

      {/* ===== CITY + COUNTDOWN — Desktop: side by side ===== */}
      <div className="px-5 md:px-8 lg:px-10 mb-5">
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

            {/* City picker */}
            {showCityPicker && (
              <>
                {/* Mobile: bottom sheet */}
                <div className="md:hidden">
                  <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => { setShowCityPicker(false); setSearchQuery(""); }} />
                  <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
                    <div className="bg-dark-900 rounded-t-[28px] border-t border-x border-dark-700/40 max-h-[70dvh] flex flex-col shadow-2xl safe-bottom">
                      <div className="flex items-center justify-between px-5 py-3">
                        <div className="w-10 h-1 rounded-full bg-dark-600 mx-auto" />
                      </div>
                      <div className="px-5 pb-3">
                        <div className="relative">
                          <input
                            type="text" placeholder="ابحث عن مدينة..." value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-dark-800 rounded-2xl pl-4 pr-11 py-3.5 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-gold-500/15 text-right text-sm border border-dark-700/40"
                            dir="rtl" autoFocus
                          />
                          <Search size={18} className="text-dark-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
                        </div>
                      </div>
                      <div className="overflow-y-auto flex-1 px-2 pb-4" dir="rtl">
                        {filteredCities.map((city) => (
                          <button key={city.name} onClick={() => { setSelectedCity(city); setShowCityPicker(false); setSearchQuery(""); }}
                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl mx-1 mb-0.5 transition-all touch-active cursor-pointer
                              ${selectedCity.name === city.name ? "bg-gold-500/8" : "hover:bg-dark-800/50"}`}
                          >
                            <div className="flex items-center gap-3">
                              {selectedCity.name === city.name && (
                                <div className="w-5 h-5 rounded-full bg-gold-500/15 flex items-center justify-center">
                                  <Check size={12} className="text-gold-400" />
                                </div>
                              )}
                              <span className={`font-bold text-sm ${selectedCity.name === city.name ? "text-gold-400" : "text-white"}`}>
                                {city.nameAr}
                              </span>
                            </div>
                            <span className="text-dark-400 text-xs">{city.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tablet/Desktop: dropdown */}
                <div className="hidden md:block">
                  <div className="fixed inset-0 z-40" onClick={() => { setShowCityPicker(false); setSearchQuery(""); }} />
                  <div className="absolute top-full left-0 right-0 z-50 mt-2 animate-slide-down-in">
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
                      <div className="overflow-y-auto flex-1 px-2 pb-2" dir="rtl">
                        {filteredCities.map((city) => (
                          <button key={city.name} onClick={() => { setSelectedCity(city); setShowCityPicker(false); setSearchQuery(""); }}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl mb-0.5 transition-all cursor-pointer
                              ${selectedCity.name === city.name ? "bg-gold-500/8" : "hover:bg-dark-800/50"}`}
                          >
                            <div className="flex items-center gap-2.5">
                              {selectedCity.name === city.name && <Check size={14} className="text-gold-400" />}
                              <span className={`font-semibold text-[13px] ${selectedCity.name === city.name ? "text-gold-400" : "text-white"}`}>
                                {city.nameAr}
                              </span>
                            </div>
                            <span className="text-dark-400 text-[11px]">{city.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
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
                      <Timer size={13} className="text-gold-500" />
                      <span className="text-[10px] text-dark-200 tracking-wider font-semibold">الوقت المتبقي</span>
                    </div>
                    <div className="flex items-center gap-1.5 animate-countdown">
                      {nextPrayer.remainingFormatted.split(":").map((unit, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          {i > 0 && <span className="text-gold-500/30 text-lg font-light">:</span>}
                          <div className="countdown-box">
                            <span className="text-2xl lg:text-3xl font-extrabold text-white font-mono tabular-nums">{unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-6 mt-1.5 pr-1">
                      <span className="text-[8px] text-dark-300 text-center w-[56px]">ساعة</span>
                      <span className="text-[8px] text-dark-300 text-center w-[56px]">دقيقة</span>
                      <span className="text-[8px] text-dark-300 text-center w-[56px]">ثانية</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-gradient-to-br from-gold-500/12 to-gold-600/4 flex items-center justify-center border border-gold-500/10 mb-2 mx-auto text-gold-400">
                      {PRAYER_ICONS[nextPrayer.key]}
                    </div>
                    <h3 className="text-xl lg:text-2xl font-bold text-gold-400 font-[Amiri]">{nextPrayer.nameAr}</h3>
                    <div className="flex items-center justify-end gap-1.5 mt-0.5">
                      <span className="text-dark-400 text-[10px]">القادمة</span>
                      <span className="text-gold-400">•</span>
                      <span className="text-gold-300/60 text-xs font-mono">{nextPrayer.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== PRAYER TIMES GRID ===== */}
      <div className="px-5 md:px-8 lg:px-10 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 divider-gold" />
          <div className="flex items-center gap-2">
            <Star size={14} className="text-gold-500/40" />
            <h2 className="text-gold-400 font-[Amiri] text-lg lg:text-xl font-bold">مواقيت الصلاة</h2>
            <Star size={14} className="text-gold-500/40" />
          </div>
          <div className="flex-1 divider-gold" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="w-12 h-12 border-2 border-dark-700 border-t-gold-400 rounded-full animate-spin" />
            <p className="text-dark-300 mt-4 text-sm font-[Amiri]">جاري تحميل مواقيت الصلاة...</p>
          </div>
        ) : error ? (
          <div className="card text-center py-12 px-6">
            <X size={40} className="text-red-400/60 mx-auto mb-3" />
            <p className="text-red-300/80 mb-4 text-sm">{error}</p>
            <button onClick={refetch} className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-600 text-dark-950 px-6 py-2.5 rounded-2xl font-bold text-sm touch-active cursor-pointer shadow-lg shadow-gold-500/15">
              <RefreshCw size={14} />
              إعادة المحاولة
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
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
                    <div className={`mx-auto w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center mb-2 ${isNext ? "bg-gold-500/12 text-gold-300 border border-gold-500/15" : "bg-white/[0.04] text-white/60"}`}>
                      {PRAYER_ICONS[key]}
                    </div>
                    <h3 className={`text-[15px] lg:text-base font-bold font-[Amiri] mb-0.5 ${isNext ? "text-gold-300" : "text-white"}`}>
                      {info.nameAr}
                    </h3>
                    <p className={`text-[8px] uppercase tracking-[0.15em] mb-2 ${isNext ? "text-gold-400/40" : "text-white/20"}`}>
                      {key}
                    </p>
                    <div className={`w-6 h-[1px] mx-auto mb-2 ${isNext ? "bg-gold-400/20" : "bg-white/[0.06]"}`} />
                    <div className={`text-xl lg:text-2xl font-extrabold font-mono tabular-nums ${isNext ? "text-gold-300" : "text-white/85"}`}>
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
        )}
      </div>

      {/* ===== VERSE ===== */}
      <div className="px-5 md:px-8 lg:px-10 mb-6 animate-fade-in-up" style={{ animationDelay: "500ms" }}>
        <div className="card-subtle p-6 lg:p-8 text-center relative overflow-hidden max-w-3xl mx-auto">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/12 to-transparent" />
          <Sparkles size={20} className="text-gold-300 mx-auto mb-2" />
          <p className="text-gold-300/85 text-lg lg:text-xl font-[Amiri] leading-[2] px-4" dir="rtl">
            إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا
          </p>
          <div className="divider-gold w-12 mx-auto my-3" />
          <p className="text-dark-100 text-[10px] tracking-wider">سورة النساء • الآية ١٠٣</p>
        </div>
      </div>

      {/* ===== FOOTER (mobile only, desktop has it in sidebar) ===== */}
      <div className="px-5 pb-4 lg:hidden">
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-red-500 to-red-700" />
            <span className="text-dark-100 text-[9px] tracking-[0.15em]">المملكة المغربية</span>
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-green-500 to-green-700" />
          </div>
          <span className="text-dark-300 text-[8px]">Powered by taqwaaa</span>
        </div>
      </div>
    </div>
  );
}
