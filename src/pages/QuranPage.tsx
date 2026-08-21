import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BookOpen, FileText, Search, SearchX, Sparkles } from "lucide-react";
import { DAILY_VERSES } from "../constants";
import { QuranCard, type Surah } from "../components/QuranCard";

type RevelationFilter = "all" | "Meccan" | "Medinan";

const FILTERS: { id: RevelationFilter; labelAr: string; labelEn: string }[] = [
  { id: "all", labelAr: "الكل", labelEn: "All" },
  { id: "Meccan", labelAr: "مكية", labelEn: "Meccan" },
  { id: "Medinan", labelAr: "مدنية", labelEn: "Medinan" },
];

const toArabicNumber = (n: number): string =>
  String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

export function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loadingSurahs, setLoadingSurahs] = useState(true);
  const [loadingAyahs, setLoadingAyahs] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<RevelationFilter>("all");

  const dailyVerse = DAILY_VERSES[new Date().getDay()];

  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => { if (data.code === 200) setSurahs(data.data); })
      .catch(() => {})
      .finally(() => setLoadingSurahs(false));
  }, []);

  const loadSurah = async (num: number) => {
    setSelectedSurah(num);
    setLoadingAyahs(true);
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${num}/ar.alafasy`);
      const data = await res.json();
      if (data.code === 200) setAyahs(data.data.ayahs);
    } catch { /* silent */ } finally {
      setLoadingAyahs(false);
    }
  };

  const filteredSurahs = useMemo(
    () =>
      surahs.filter((s) => {
        if (filter === "Meccan" && s.revelationType !== "Meccan") return false;
        if (filter === "Medinan" && s.revelationType !== "Medinan") return false;
        return (
          s.name.includes(searchQuery) ||
          s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.number.toString().includes(searchQuery)
        );
      }),
    [surahs, searchQuery, filter]
  );

  const currentSurah = surahs.find((s) => s.number === selectedSurah);

  return (
    <div className="animate-page-enter">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* ===== Page header ===== */}
        <header className="flex flex-col items-center gap-5 text-center md:flex-row md:text-start">
          <span className="octagram octagram-solid h-16 w-16 shrink-0 text-white shadow-[0_12px_30px_-12px_rgba(201,162,39,0.7)]" aria-hidden="true">
            <BookOpen size={26} strokeWidth={1.7} />
          </span>
          <div>
            <h1 className="font-quran text-3xl font-bold leading-tight text-gradient-gold lg:text-4xl">
              القرآن الكريم
            </h1>
            <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-ink-500">
              The Noble Quran · 114 Surahs
            </p>
          </div>
        </header>

        {/* ===== Daily verse banner ===== */}
        <section
          className="card-beige relative mt-8 max-w-3xl overflow-hidden p-6 text-center animate-fade-in-up sm:p-8"
          aria-label="آية اليوم"
        >
          <div className="gold-hairline absolute inset-x-0 top-0 h-px" aria-hidden="true" />
          <div className="flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-gold-600" aria-hidden="true" />
            <span className="font-arabic text-[11px] font-extrabold tracking-widest text-gold-700">آية اليوم</span>
          </div>
          <p className="mt-4 font-quran text-xl leading-[2.2] text-ink-800 sm:text-2xl" dir="rtl" lang="ar">
            {dailyVerse.text}
          </p>
          <div className="divider-gold mx-auto my-3 w-16" aria-hidden="true" />
          <p className="font-arabic text-[11px] font-bold tracking-wide text-ink-500" dir="rtl">{dailyVerse.ref}</p>
        </section>

        {/* ===== Back button ===== */}
        {selectedSurah && (
          <button
            onClick={() => { setSelectedSurah(null); setAyahs([]); }}
            className="group mb-5 mt-6 flex cursor-pointer items-center gap-2.5"
            aria-label="العودة إلى قائمة السور"
          >
            <span className="icon-btn h-10 w-10 group-hover:border-gold-500/50">
              <ArrowRight size={16} />
            </span>
            <span className="font-arabic text-sm font-bold text-gold-700">العودة إلى السور</span>
          </button>
        )}

        {!selectedSurah ? (
          <>
            {/* ===== Search + filters ===== */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1 sm:max-w-md">
                <input
                  type="text"
                  placeholder="ابحث عن سورة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="ابحث عن سورة"
                  className="input-field pe-11 ps-4 text-right font-arabic"
                  dir="rtl"
                />
                <Search size={17} className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-ink-400" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar" role="group" aria-label="تصفية السور">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilter(f.id)}
                    aria-pressed={filter === f.id}
                    className={`chip flex-shrink-0 ${filter === f.id ? "chip-active" : ""}`}
                  >
                    {f.labelAr}
                    <span className="font-sans text-[9px] uppercase tracking-wider opacity-70">{f.labelEn}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ===== Surah grid ===== */}
            {loadingSurahs ? (
              <LoadingState label="جاري تحميل السور..." />
            ) : filteredSurahs.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="mt-5 grid grid-cols-1 gap-2.5 md:grid-cols-2 xl:grid-cols-3">
                {filteredSurahs.map((surah, idx) => (
                  <QuranCard key={surah.number} surah={surah} index={idx} onSelect={loadSurah} />
                ))}
              </div>
            )}
          </>
        ) : (
          /* ================= READER VIEW ================= */
          <div className="mt-6 max-w-4xl">
            {currentSurah && (
              <div className="card relative overflow-hidden p-6 text-center animate-fade-in-up sm:p-8">
                {/* arch ornament */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-20 w-56 rounded-b-full border-b border-gold-500/25 bg-gradient-to-b from-gold-100/60 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative">
                  <FileText size={18} className="mx-auto mb-2 text-gold-600" aria-hidden="true" />
                  <h2 className="font-quran text-3xl font-bold leading-tight text-gradient-gold">{currentSurah.name}</h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                    {currentSurah.englishName} — {currentSurah.englishNameTranslation}
                  </p>
                  <p className="mt-1.5 font-arabic text-xs font-bold text-ink-600" dir="rtl">
                    {toArabicNumber(currentSurah.numberOfAyahs)} آية •{" "}
                    {currentSurah.revelationType === "Meccan" ? "مكية" : "مدنية"} • ترتيبها{" "}
                    {toArabicNumber(currentSurah.number)}
                  </p>
                </div>
              </div>
            )}

            {selectedSurah !== 9 && selectedSurah !== 1 && (
              <p className="my-7 text-center font-quran text-2xl font-bold text-gradient-gold sm:text-[1.75rem]" dir="rtl" lang="ar">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            )}

            {loadingAyahs ? (
              <LoadingState label="جاري تحميل الآيات..." />
            ) : (
              <article className="card relative p-5 animate-fade-in-up sm:p-8 lg:p-10">
                <div
                  className="font-quran text-justify text-lg leading-[2.7] text-ink-800 sm:text-xl sm:leading-[2.9]"
                  dir="rtl"
                  lang="ar"
                >
                  {ayahs.map((ayah) => (
                    <span key={ayah.number} className="inline">
                      {ayah.text}
                      <span
                        className="octagram mx-1 inline-flex h-7 w-7 align-middle"
                        title={`آية ${ayah.numberInSurah}`}
                      >
                        <span className="font-arabic text-[9px] font-bold text-gold-700">
                          {toArabicNumber(ayah.numberInSurah)}
                        </span>
                      </span>{" "}
                    </span>
                  ))}
                </div>
              </article>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
}

function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center py-24" role="status">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-ink-200 border-t-gold-500" aria-hidden="true" />
      <p className="mt-4 font-arabic text-sm text-ink-500" dir="rtl">{label}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="card mt-5 flex flex-col items-center py-16 text-center">
      <SearchX size={36} className="mb-3 text-ink-300" aria-hidden="true" />
      <p className="font-arabic text-sm font-bold text-ink-700" dir="rtl">لا توجد نتائج مطابقة</p>
      <p className="mt-1 text-xs text-ink-500">Try a different surah name or number.</p>
    </div>
  );
}
