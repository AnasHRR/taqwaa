import { useState } from "react";
import { MOROCCAN_CITIES, PRAYER_INFO } from "./constants";
import { usePrayerTimes } from "./hooks/usePrayerTimes";
import { useClock } from "./hooks/useClock";
import { useNextPrayer } from "./hooks/useNextPrayer";
import { City } from "./types";
import { MosqueSilhouette } from "./components/MosqueSilhouette";
import { CrescentMoon } from "./components/CrescentMoon";

export function App() {
  const [selectedCity, setSelectedCity] = useState<City>(MOROCCAN_CITIES[0]);
  const [showCitySelector, setShowCitySelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const now = useClock();
  const { prayerTimes, hijriDate, gregorianDate, loading, error, refetch } =
    usePrayerTimes(selectedCity);
  const nextPrayer = useNextPrayer(prayerTimes, now);

  const timeString = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const [hours, minutes, seconds] = timeString.split(":");

  const filteredCities = MOROCCAN_CITIES.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.nameAr.includes(searchQuery)
  );

  const isCurrentPrayer = (prayerKey: string): boolean => {
    if (!prayerTimes || !nextPrayer) return false;
    const prayerKeys = PRAYER_INFO.filter((p) => p.key !== "Sunrise").map(
      (p) => p.key
    );
    const nextIndex = prayerKeys.indexOf(nextPrayer.key);
    const currentIndex = nextIndex - 1;
    if (currentIndex >= 0) {
      return prayerKeys[currentIndex] === prayerKey;
    }
    return prayerKey === "Isha";
  };

  const isNextPrayerKey = (prayerKey: string): boolean => {
    return nextPrayer?.key === prayerKey;
  };

  return (
    <div className="min-h-screen bg-midnight-950 bg-islamic-pattern relative overflow-x-hidden">
      {/* Stars background */}
      <div className="fixed inset-0 bg-stars pointer-events-none" />
      {/* Geometric overlay */}
      <div className="fixed inset-0 geometric-overlay pointer-events-none" />

      {/* ===== HEADER ===== */}
      <header className="relative pt-8 pb-6 overflow-hidden">
        {/* Top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-gold-500/[0.06] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto px-4">
          {/* Crescent & Title */}
          <div className="flex flex-col items-center mb-5">
            <CrescentMoon className="w-16 h-16 crescent-shadow animate-float mb-3" />
            <h1 className="text-5xl font-bold font-[Amiri] text-gradient-gold tracking-wide leading-tight">
              تقوى
            </h1>
            <div className="flex items-center gap-3 mt-1.5">
              <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-gold-500/40" />
              <p className="text-midnight-200 text-sm tracking-widest uppercase" style={{ fontFamily: "'Cairo', sans-serif", letterSpacing: '0.15em' }}>
                Taqwaa
              </p>
              <div className="w-10 h-[1px] bg-gradient-to-l from-transparent to-gold-500/40" />
            </div>
            <p className="text-midnight-300 text-xs mt-1.5 font-light">
              مواقيت الصلاة والأذان بالمملكة المغربية
            </p>
          </div>

          {/* Clock */}
          <div className="flex justify-center mb-4">
            <div className="glass-card rounded-2xl px-8 py-5 flex flex-col items-center">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl sm:text-6xl font-bold text-white font-mono tabular-nums tracking-wider">
                  {hours}
                </span>
                <span className="text-5xl sm:text-6xl font-bold text-gold-400 animate-pulse mx-0.5">:</span>
                <span className="text-5xl sm:text-6xl font-bold text-white font-mono tabular-nums tracking-wider">
                  {minutes}
                </span>
                <span className="text-5xl sm:text-6xl font-bold text-gold-400 animate-pulse mx-0.5">:</span>
                <span className="text-3xl sm:text-4xl font-bold text-midnight-300 font-mono tabular-nums tracking-wider self-end mb-1">
                  {seconds}
                </span>
              </div>

              {gregorianDate && hijriDate && (
                <div className="flex flex-col items-center gap-1 mt-3">
                  <div className="gold-divider w-32 mb-2" />
                  <span className="text-midnight-200 text-sm">
                    {gregorianDate.weekday.en}, {gregorianDate.day}{" "}
                    {gregorianDate.month.en} {gregorianDate.year}
                  </span>
                  <span className="text-gold-400 text-sm font-[Amiri] font-bold">
                    {hijriDate.day} {hijriDate.month.ar} {hijriDate.year} هـ
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mosque silhouette at bottom of header */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg opacity-[0.06] pointer-events-none">
          <MosqueSilhouette className="w-full text-gold-400" />
        </div>
      </header>

      {/* ===== CITY SELECTOR ===== */}
      <div className="relative z-40 max-w-xl mx-auto px-4 mb-5">
        <button
          onClick={() => setShowCitySelector(!showCitySelector)}
          className="w-full glass-card rounded-xl px-5 py-3.5 flex items-center justify-between hover:border-gold-500/20 transition-all duration-300 group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/10 flex items-center justify-center border border-gold-500/20">
              <svg className="w-4.5 h-4.5 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="text-right">
              <span className="block text-lg font-bold text-gold-400 font-[Amiri]">
                {selectedCity.nameAr}
              </span>
              <span className="block text-xs text-midnight-300">
                {selectedCity.name}, المغرب
              </span>
            </div>
          </div>
          <svg
            className={`w-4 h-4 text-midnight-400 transition-transform duration-300 ${
              showCitySelector ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showCitySelector && (
          <>
            <div
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm animate-fade-in"
              onClick={() => { setShowCitySelector(false); setSearchQuery(""); }}
            />
            <div className="absolute left-4 right-4 mt-2 z-50 glass-card rounded-xl overflow-hidden shadow-2xl shadow-black/50 animate-slide-down border border-midnight-600/50" dir="rtl">
              <div className="p-3 border-b border-midnight-700/50">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ابحث عن مدينة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-midnight-900/80 border border-midnight-600/30 rounded-lg pl-4 pr-10 py-2.5 text-white placeholder-midnight-400 focus:outline-none focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500/30 text-right text-sm"
                    dir="rtl"
                    autoFocus
                  />
                  <svg className="w-4 h-4 text-midnight-400 absolute right-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredCities.map((city) => (
                  <button
                    key={city.name}
                    onClick={() => {
                      setSelectedCity(city);
                      setShowCitySelector(false);
                      setSearchQuery("");
                    }}
                    className={`w-full flex items-center justify-between px-5 py-3 transition-all duration-200 cursor-pointer ${
                      selectedCity.name === city.name
                        ? "bg-gold-500/10 border-r-[3px] border-gold-400"
                        : "hover:bg-midnight-700/40 border-r-[3px] border-transparent"
                    }`}
                  >
                    <span className="text-midnight-300 text-xs">{city.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">{city.nameAr}</span>
                      {selectedCity.name === city.name && (
                        <svg className="w-4 h-4 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* ===== NEXT PRAYER COUNTDOWN ===== */}
      {nextPrayer && !loading && (
        <div className="max-w-xl mx-auto px-4 mb-5 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="glass-card rounded-2xl p-5 relative overflow-hidden animate-glow-border border-gold-500/20">
            {/* Subtle background glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-500/[0.04] rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-teal-500/[0.03] rounded-full blur-2xl" />

            {/* Progress bar */}
            <div className="progress-bar-bg h-1 rounded-full mb-4 overflow-hidden">
              <div
                className="progress-bar-fill h-full rounded-full transition-all duration-1000 ease-linear"
                style={{ width: `${nextPrayer.progress}%` }}
              />
            </div>

            <div className="relative flex items-center justify-between gap-4">
              {/* Left: Countdown */}
              <div className="text-center flex-shrink-0">
                <div className="text-xs text-midnight-300 mb-1.5 font-light uppercase tracking-wider">
                  الوقت المتبقي
                </div>
                <div className="flex items-center gap-1 animate-countdown-pulse">
                  {nextPrayer.remainingFormatted.split(":").map((unit, i) => (
                    <div key={i} className="flex items-center gap-1">
                      {i > 0 && <span className="text-gold-500/60 text-xl font-light">:</span>}
                      <div className="bg-midnight-800/80 rounded-lg px-2.5 py-1.5 border border-midnight-600/30 min-w-[44px]">
                        <span className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                          {unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between px-1 mt-1">
                  <span className="text-[9px] text-midnight-400">ساعة</span>
                  <span className="text-[9px] text-midnight-400">دقيقة</span>
                  <span className="text-[9px] text-midnight-400">ثانية</span>
                </div>
              </div>

              {/* Right: Prayer info */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="text-3xl">{nextPrayer.icon}</span>
                </div>
                <h3 className="text-2xl font-bold text-gold-400 font-[Amiri]">
                  {nextPrayer.nameAr}
                </h3>
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <span className="text-midnight-300 text-xs">الصلاة القادمة</span>
                  <span className="text-midnight-500">•</span>
                  <span className="text-gold-300/80 text-sm font-mono">{nextPrayer.time}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== PRAYER TIMES GRID ===== */}
      <div className="max-w-xl mx-auto px-4 mb-6">
        {/* Section title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 gold-divider" />
          <h2 className="text-gold-400 font-[Amiri] text-lg font-bold tracking-wide">
            مواقيت الصلاة
          </h2>
          <div className="flex-1 gold-divider" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-midnight-700" />
              <div className="absolute inset-0 rounded-full border-2 border-gold-400 border-t-transparent animate-spin" />
              <CrescentMoon className="absolute inset-3 w-10 h-10 opacity-30" />
            </div>
            <p className="text-midnight-300 mt-5 font-[Amiri] text-lg">
              جاري تحميل مواقيت الصلاة...
            </p>
            <p className="text-midnight-500 text-xs mt-1">
              {selectedCity.nameAr}
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-12 glass-card rounded-2xl border border-red-500/20">
            <div className="text-4xl mb-4">⚠️</div>
            <p className="text-red-300 mb-2 text-sm">{error}</p>
            <p className="text-midnight-400 text-xs mb-5">تحقق من اتصالك بالإنترنت</p>
            <button
              onClick={refetch}
              className="bg-gradient-to-r from-gold-500 to-gold-600 text-midnight-950 px-6 py-2.5 rounded-lg font-bold text-sm hover:from-gold-400 hover:to-gold-500 transition-all duration-300 shadow-lg shadow-gold-500/20 cursor-pointer"
            >
              إعادة المحاولة
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PRAYER_INFO.map((prayer, index) => {
              const time = prayerTimes?.[prayer.key] || "--:--";
              const isNext = isNextPrayerKey(prayer.key);
              const isCurrent = isCurrentPrayer(prayer.key);

              return (
                <div
                  key={prayer.key}
                  className={`relative rounded-2xl p-4 sm:p-5 transition-all duration-500 border overflow-hidden
                    ${prayer.cssClass}
                    ${isNext ? "prayer-card-next animate-pulse-glow !border-gold-500/40 scale-[1.03]" : ""}
                    ${isCurrent ? "!border-teal-500/30" : ""}
                    hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20
                    animate-fade-in-up`}
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  {/* Next prayer indicator */}
                  {isNext && (
                    <div className="absolute top-2.5 left-2.5 z-10">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400" />
                      </span>
                    </div>
                  )}

                  <div className="relative z-10 text-center">
                    {/* Icon */}
                    <div className="text-3xl mb-2 drop-shadow-lg">{prayer.icon}</div>

                    {/* Arabic name */}
                    <h3 className={`text-lg font-bold font-[Amiri] mb-0.5 ${
                      isNext ? "text-gold-300" : "text-white"
                    }`}>
                      {prayer.nameAr}
                    </h3>

                    {/* English name */}
                    <p className={`text-[10px] uppercase tracking-widest mb-2.5 ${
                      isNext ? "text-gold-400/60" : "text-white/30"
                    }`}>
                      {prayer.key}
                    </p>

                    {/* Separator line */}
                    <div className={`w-8 h-[1px] mx-auto mb-2.5 ${
                      isNext ? "bg-gold-400/30" : "bg-white/10"
                    }`} />

                    {/* Time */}
                    <div className={`text-xl sm:text-2xl font-bold font-mono tabular-nums ${
                      isNext ? "text-gold-300" : "text-white/90"
                    }`}>
                      {time}
                    </div>

                    {/* Badge */}
                    {isNext && (
                      <span className="inline-block mt-2.5 text-[9px] bg-gold-500/15 text-gold-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-gold-500/20">
                        الصلاة التالية
                      </span>
                    )}
                    {isCurrent && !isNext && (
                      <span className="inline-block mt-2.5 text-[9px] bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full font-bold uppercase tracking-wider border border-teal-500/15">
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

      {/* ===== QURANIC VERSE ===== */}
      <div className="max-w-xl mx-auto px-4 mb-6 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
        <div className="glass-card-light rounded-2xl p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

          {/* Decorative quotes */}
          <div className="text-gold-300 text-6xl font-[Amiri] leading-none mb-2">❝</div>

          <p className="text-gold-300 text-xl sm:text-2xl font-[Amiri] leading-relaxed mb-3 px-4" dir="rtl">
            إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا
          </p>

          <div className="gold-divider w-20 mx-auto mb-3" />

          <p className="text-midnight-400 text-xs tracking-wider">
            سورة النساء • الآية ١٠٣
          </p>
        </div>
      </div>

      {/* ===== MOROCCO FLAG ACCENT ===== */}
      <div className="max-w-xl mx-auto px-4 mb-6">
        <div className="flex items-center justify-center gap-3 py-3">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-red-500 to-red-700 border border-red-400/30 shadow-lg shadow-red-500/20" />
          <span className="text-midnight-400 text-xs tracking-widest uppercase">المملكة المغربية</span>
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-500 to-green-700 border border-green-400/30 shadow-lg shadow-green-500/20" />
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="relative border-t border-midnight-800/50">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
        <div className="max-w-xl mx-auto px-4 py-6">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <CrescentMoon className="w-6 h-6 opacity-60" />
              <span className="text-gold-400/80 font-[Amiri] text-lg font-bold">
                تقوى
              </span>
            </div>
            <p className="text-white text-[11px] text-center leading-relaxed max-w-xs">
              مواقيت الصلاة محسوبة وفق وزارة الأوقاف والشؤون الإسلامية بالمملكة المغربية
            </p>
          </div>
        </div>
      </footer>

      {/* Bottom spacing */}
      <div className="h-4" />
    </div>
  );
}
