import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, ArrowRight, BookOpen, ChevronLeft, ChevronRight,
  FileText, Search, SearchX, Sparkles, Type, X, BookmarkCheck, Share2
} from "lucide-react";
import { DAILY_VERSES } from "../constants";
import { QuranCard, type Surah } from "../components/QuranCard";
import { cn } from "../utils/cn";

type RevelationFilter = "all" | "Meccan" | "Medinan";

const FILTERS: { id: RevelationFilter; labelAr: string; labelEn: string }[] = [
  { id: "all", labelAr: "الكل", labelEn: "All" },
  { id: "Meccan", labelAr: "مكية", labelEn: "Meccan" },
  { id: "Medinan", labelAr: "مدنية", labelEn: "Medinan" },
];

const toArabicNumber = (n: number): string =>
  String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
}

export function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loadingSurahs, setLoadingSurahs] = useState(true);
  const [loadingAyahs, setLoadingAyahs] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<RevelationFilter>("all");
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("large");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const dailyVerse = DAILY_VERSES[new Date().getDay()];

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) setSurahs(data.data);
      })
      .catch(() => {})
      .finally(() => setLoadingSurahs(false));
  }, []);

  const loadSurah = async (num: number) => {
    setSelectedSurah(num);
    setLoadingAyahs(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${num}/ar.alafasy`);
      const data = await res.json();
      if (data.code === 200) setAyahs(data.data.ayahs);
    } catch {
      /* silent */
    } finally {
      setLoadingAyahs(false);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const filteredSurahs = useMemo(
    () =>
      surahs.filter((s) => {
        if (filter === "Meccan" && s.revelationType !== "Meccan") return false;
        if (filter === "Medinan" && s.revelationType !== "Medinan") return false;
        const query = searchQuery.trim().toLowerCase();
        if (!query) return true;
        return (
          s.name.includes(query) ||
          s.englishName.toLowerCase().includes(query) ||
          s.englishNameTranslation.toLowerCase().includes(query) ||
          s.number.toString() === query
        );
      }),
    [surahs, searchQuery, filter]
  );

  const currentSurah = surahs.find((s) => s.number === selectedSurah);

  const prevSurahNum = selectedSurah && selectedSurah > 1 ? selectedSurah - 1 : null;
  const nextSurahNum = selectedSurah && selectedSurah < 114 ? selectedSurah + 1 : null;

  return (
    <div className="animate-page-enter">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        {/* Toast notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2 text-xs font-bold text-white shadow-xl">
              <Sparkles size={13} className="text-gold-400" />
              {toastMessage}
            </span>
          </div>
        )}

        {/* ===== Page header ===== */}
        {!selectedSurah && (
          <>
            <header className="flex flex-col items-center gap-3.5 sm:gap-5 text-center md:flex-row md:text-start">
              <span
                className="octagram octagram-solid h-14 w-14 sm:h-16 sm:w-16 shrink-0 text-white shadow-[0_12px_30px_-12px_rgba(201,162,39,0.7)]"
                aria-hidden="true"
              >
                <BookOpen size={24} strokeWidth={1.7} />
              </span>
              <div>
                <h1 className="font-quran text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gradient-gold">
                  القرآن الكريم
                </h1>
                <p className="mt-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-ink-500">
                  The Noble Quran · 114 Surahs
                </p>
              </div>
            </header>

            {/* ===== Daily verse banner ===== */}
            <section
              className="card-beige relative mt-6 max-w-3xl overflow-hidden p-5 sm:p-7 text-center animate-fade-in-up"
              aria-label="آية اليوم"
            >
              <div className="gold-hairline absolute inset-x-0 top-0 h-px" aria-hidden="true" />
              <div className="flex items-center justify-center gap-2">
                <Sparkles size={13} className="text-gold-600" aria-hidden="true" />
                <span className="font-arabic text-[11px] font-extrabold tracking-widest text-gold-700">
                  آية اليوم
                </span>
              </div>
              <p
                className="mt-3.5 font-quran text-lg sm:text-xl md:text-2xl leading-[2.1] text-ink-800"
                dir="rtl"
                lang="ar"
              >
                {dailyVerse.text}
              </p>
              <div className="divider-gold mx-auto my-3 w-16" aria-hidden="true" />
              <p className="font-arabic text-[11px] font-bold tracking-wide text-ink-500" dir="rtl">
                {dailyVerse.ref}
              </p>
            </section>
          </>
        )}

        {!selectedSurah ? (
          <>
            {/* ===== Search + filters ===== */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1 sm:max-w-md">
                <input
                  type="text"
                  placeholder="ابحث عن سورة بالاسم أو الرقم..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="ابحث عن سورة"
                  className="input-field pe-10 ps-10 text-right font-arabic !py-2.5 !text-sm"
                  dir="rtl"
                />
                <Search
                  size={16}
                  className="pointer-events-none absolute end-3.5 top-1/2 -translate-y-1/2 text-ink-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute start-3 top-1/2 -translate-y-1/2 p-1 text-ink-400 hover:text-ink-700"
                    aria-label="مسح البحث"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              <div
                className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar"
                role="group"
                aria-label="تصفية السور"
              >
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    aria-pressed={filter === f.id}
                    className={cn("chip shrink-0 !py-2 !px-3.5 !text-xs", filter === f.id && "chip-active")}
                  >
                    {f.labelAr}
                    <span className="font-sans text-[8.5px] uppercase tracking-wider opacity-70">
                      {f.labelEn}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ===== Surah grid ===== */}
            {loadingSurahs ? (
              <LoadingState label="جاري تحميل فهرس السور..." />
            ) : filteredSurahs.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredSurahs.map((surah, idx) => (
                  <QuranCard
                    key={surah.number}
                    surah={surah}
                    index={idx}
                    onSelect={loadSurah}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* ================= READER VIEW ================= */
          <div className="max-w-4xl mx-auto pb-8">
            {/* Sticky Reader Toolbar */}
            <div className="sticky top-[68px] sm:top-[76px] z-30 mb-4 rounded-2xl border border-gold-500/25 bg-white/95 backdrop-blur-md px-3 sm:px-4 py-2.5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.1)] flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setSelectedSurah(null);
                  setAyahs([]);
                }}
                className="group flex cursor-pointer items-center gap-1.5 rounded-xl bg-ink-50 px-2.5 py-1.5 text-ink-700 hover:bg-gold-50 hover:text-gold-700 transition-colors"
                aria-label="العودة إلى قائمة السور"
              >
                <ArrowRight size={15} />
                <span className="font-arabic text-xs font-bold">السور</span>
              </button>

              {/* Prev / Next Surah Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => prevSurahNum && loadSurah(prevSurahNum)}
                  disabled={!prevSurahNum}
                  className="icon-btn h-8 w-8 !rounded-lg disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="السورة السابقة"
                  title="السورة السابقة"
                >
                  <ChevronRight size={16} />
                </button>
                <span className="font-quran text-sm font-bold text-gold-800 px-1.5 truncate max-w-[120px] sm:max-w-none">
                  {currentSurah?.name}
                </span>
                <button
                  onClick={() => nextSurahNum && loadSurah(nextSurahNum)}
                  disabled={!nextSurahNum}
                  className="icon-btn h-8 w-8 !rounded-lg disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="السورة التالية"
                  title="السورة التالية"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>

              {/* Font size toggles */}
              <div className="flex items-center gap-1 bg-ink-50 rounded-xl p-0.5 border border-ink-200/60">
                <button
                  onClick={() => setFontSize("normal")}
                  className={cn(
                    "px-2 py-1 rounded-lg text-xs font-bold transition-colors",
                    fontSize === "normal" ? "bg-white text-gold-700 shadow-sm" : "text-ink-500"
                  )}
                  title="خط عادي"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize("large")}
                  className={cn(
                    "px-2 py-1 rounded-lg text-xs font-bold transition-colors",
                    fontSize === "large" ? "bg-white text-gold-700 shadow-sm" : "text-ink-500"
                  )}
                  title="خط كبير"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize("xlarge")}
                  className={cn(
                    "px-2 py-1 rounded-lg text-xs font-bold transition-colors",
                    fontSize === "xlarge" ? "bg-white text-gold-700 shadow-sm" : "text-ink-500"
                  )}
                  title="خط كبير جداً"
                >
                  A++
                </button>
              </div>
            </div>

            {/* Surah Header Card */}
            {currentSurah && (
              <div className="card relative overflow-hidden p-5 sm:p-7 text-center animate-fade-in-up">
                {/* Arch ornament */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-16 sm:h-20 w-48 sm:w-56 rounded-b-full border-b border-gold-500/25 bg-gradient-to-b from-gold-100/60 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative">
                  <FileText size={18} className="mx-auto mb-1.5 text-gold-600" aria-hidden="true" />
                  <h2 className="font-quran text-2xl sm:text-3xl font-bold leading-tight text-gradient-gold">
                    {currentSurah.name}
                  </h2>
                  <p className="mt-1 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                    {currentSurah.englishName} — {currentSurah.englishNameTranslation}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-gold-500/20 bg-gold-50/80 px-3.5 py-1 font-arabic text-xs font-bold text-gold-800" dir="rtl">
                    <span>{toArabicNumber(currentSurah.numberOfAyahs)} آية</span>
                    <span>•</span>
                    <span>{currentSurah.revelationType === "Meccan" ? "مكية" : "مدنية"}</span>
                    <span>•</span>
                    <span>ترتيبها {toArabicNumber(currentSurah.number)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bismillah */}
            {selectedSurah !== 9 && selectedSurah !== 1 && (
              <p
                className="my-5 sm:my-7 text-center font-quran text-xl sm:text-2xl font-bold text-gradient-gold select-none"
                dir="rtl"
                lang="ar"
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            )}

            {/* Ayahs Display */}
            {loadingAyahs ? (
              <LoadingState label="جاري تحميل آيات السورة..." />
            ) : (
              <article className="card relative p-4 sm:p-8 lg:p-10 animate-fade-in-up mt-3">
                <div
                  className={cn(
                    "font-quran text-justify text-ink-900 transition-all",
                    fontSize === "normal" && "text-base sm:text-lg leading-[2.4] sm:leading-[2.6]",
                    fontSize === "large" && "text-lg sm:text-xl md:text-2xl leading-[2.7] sm:leading-[3.0]",
                    fontSize === "xlarge" && "text-xl sm:text-2xl md:text-3xl leading-[3.0] sm:leading-[3.4]"
                  )}
                  dir="rtl"
                  lang="ar"
                >
                  {ayahs.map((ayah) => (
                    <span key={ayah.number} className="inline">
                      {ayah.text}{" "}
                      <span
                        className="octagram mx-1 inline-flex h-7 w-7 sm:h-8 sm:w-8 align-middle select-none"
                        title={`آية ${ayah.numberInSurah}`}
                      >
                        <span className="font-arabic text-[9px] sm:text-[10px] font-bold text-gold-700">
                          {toArabicNumber(ayah.numberInSurah)}
                        </span>
                      </span>{" "}
                    </span>
                  ))}
                </div>

                {/* Reader Footer Navigation */}
                <div className="divider-gold my-6" />
                <div className="flex items-center justify-between gap-3 pt-2">
                  {prevSurahNum ? (
                    <button
                      onClick={() => loadSurah(prevSurahNum)}
                      className="btn btn-secondary btn-sm cursor-pointer !py-2 !px-3"
                    >
                      <ChevronRight size={15} />
                      <span className="font-arabic">السورة السابقة</span>
                    </button>
                  ) : <div />}

                  <button
                    onClick={() => showToast("تم حفظ موضع القراءة")}
                    className="btn btn-secondary btn-sm cursor-pointer !py-2 !px-3 text-gold-700"
                    title="حفظ موضع القراءة"
                  >
                    <BookmarkCheck size={15} />
                    <span className="font-arabic hidden sm:inline">حفظ الموضع</span>
                  </button>

                  {nextSurahNum && (
                    <button
                      onClick={() => loadSurah(nextSurahNum)}
                      className="btn btn-primary btn-sm cursor-pointer !py-2 !px-3"
                    >
                      <span className="font-arabic">السورة التالية</span>
                      <ChevronLeft size={15} />
                    </button>
                  )}
                </div>
              </article>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center py-20" role="status">
      <span
        className="h-9 w-9 animate-spin rounded-full border-2 border-ink-200 border-t-gold-500"
        aria-hidden="true"
      />
      <p className="mt-3 font-arabic text-sm text-ink-500" dir="rtl">
        {label}
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="card mt-5 flex flex-col items-center py-14 text-center">
      <SearchX size={32} className="mb-2.5 text-ink-300" aria-hidden="true" />
      <p className="font-arabic text-sm font-bold text-ink-700" dir="rtl">
        لا توجد نتائج مطابقة
      </p>
      <p className="mt-1 text-xs text-ink-500">جرب البحث باسم سورة آخر أو برقم السورة.</p>
    </div>
  );
}
