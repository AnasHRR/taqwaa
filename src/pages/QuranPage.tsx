import { useState, useEffect } from "react";
import {
  BookOpen, Search, ArrowRight, Sparkles, ChevronLeft,
  Bookmark, Layers, FileText
} from "lucide-react";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  page: number;
}

const DAILY_VERSES = [
  { text: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", ref: "البقرة ٢٨٦" },
  { text: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ", ref: "آل عمران ١٣٩" },
  { text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", ref: "الشرح ٦" },
  { text: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ", ref: "البقرة ١٥٢" },
  { text: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", ref: "الرعد ٢٨" },
  { text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", ref: "الطلاق ٣" },
  { text: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ", ref: "الزمر ٥٣" },
];

export function QuranPage() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
  const [ayahs, setAyahs] = useState<Ayah[]>([]);
  const [loadingSurahs, setLoadingSurahs] = useState(true);
  const [loadingAyahs, setLoadingAyahs] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredSurahs = surahs.filter(
    (s) =>
      s.name.includes(searchQuery) ||
      s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.number.toString().includes(searchQuery)
  );

  const currentSurah = surahs.find((s) => s.number === selectedSurah);

  return (
    <div className="animate-page-enter">
      {/* Header */}
      <div className="px-5 md:px-8 lg:px-10 pt-5 md:pt-8 pb-4">
        <div className="flex flex-col items-center md:flex-row md:items-center md:gap-6">
          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-[18px] bg-gradient-to-br from-accent-emerald/12 to-accent-emerald/4 flex items-center justify-center border border-accent-emerald/8 mb-3 md:mb-0">
            <BookOpen size={28} className="text-accent-emerald" strokeWidth={1.8} />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold font-[Amiri] text-gradient-gold mb-0.5">القرآن الكريم</h1>
            <p className="text-dark-400 text-[11px] lg:text-xs">The Noble Quran • 114 Surahs</p>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-8 lg:px-10 pb-6">
        {/* Daily verse */}
        <div className="card-elevated p-5 lg:p-6 mb-5 relative overflow-hidden border border-gold-500/6 animate-fade-in-up max-w-3xl">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-gold-500/[0.03] rounded-full blur-xl" />

          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-gold-400" />
            <span className="text-gold-400 text-[10px] lg:text-[11px] font-bold tracking-wider">آية اليوم</span>
          </div>

          <p className="text-gold-200 text-xl lg:text-2xl font-[Amiri] leading-[2.2] text-center mb-3 px-2" dir="rtl">
            {dailyVerse.text}
          </p>
          <div className="divider-gold w-10 mx-auto mb-2" />
          <p className="text-dark-500 text-[10px] text-center tracking-wider">{dailyVerse.ref}</p>
        </div>

        {/* Back button */}
        {selectedSurah && (
          <button
            onClick={() => { setSelectedSurah(null); setAyahs([]); }}
            className="flex items-center gap-2 mb-4 touch-active cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-dark-800 flex items-center justify-center border border-dark-700/40 group-hover:border-gold-500/15 transition-colors">
              <ArrowRight size={16} className="text-gold-400" />
            </div>
            <span className="text-gold-400 text-sm font-semibold">العودة إلى السور</span>
          </button>
        )}

        {!selectedSurah ? (
          <>
            {/* Search */}
            <div className="mb-5 animate-fade-in-up max-w-2xl" style={{ animationDelay: "100ms" }}>
              <div className="relative">
                <input
                  type="text" placeholder="ابحث عن سورة..." value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-dark-800/70 rounded-2xl pl-4 pr-12 py-3.5 lg:py-4 text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-gold-500/12 text-right text-sm border border-dark-700/30"
                  dir="rtl"
                />
                <Search size={18} className="text-dark-400 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Surahs grid */}
            {loadingSurahs ? (
              <div className="flex flex-col items-center py-20">
                <div className="w-10 h-10 border-2 border-dark-700 border-t-gold-400 rounded-full animate-spin" />
                <p className="text-dark-400 mt-4 text-xs">جاري تحميل السور...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
                {filteredSurahs.map((surah, idx) => (
                  <button
                    key={surah.number}
                    onClick={() => loadSurah(surah.number)}
                    className="w-full card px-4 py-3.5 flex items-center justify-between touch-active cursor-pointer animate-fade-in-up hover:border-gold-500/8"
                    style={{ animationDelay: `${Math.min(idx * 20, 400) + 150}ms` }}
                    dir="rtl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500/10 to-gold-600/4 flex items-center justify-center border border-gold-500/6 rotate-45">
                        <span className="text-gold-400 text-[11px] font-bold -rotate-45">{surah.number}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-white font-bold font-[Amiri] text-[15px]">{surah.name}</span>
                        <span className="block text-dark-400 text-[10px]">
                          {surah.englishNameTranslation} • {surah.numberOfAyahs} آية
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[9px] px-2.5 py-1 rounded-full border flex items-center gap-1 ${
                        surah.revelationType === "Meccan"
                          ? "text-amber-400/70 bg-amber-500/6 border-amber-500/8"
                          : "text-emerald-400/70 bg-emerald-500/6 border-emerald-500/8"
                      }`}>
                        <Bookmark size={8} />
                        {surah.revelationType === "Meccan" ? "مكية" : "مدنية"}
                      </span>
                      <ChevronLeft size={14} className="text-dark-600" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="max-w-4xl">
            {currentSurah && (
              <div className="card-elevated p-5 lg:p-6 mb-4 text-center border border-gold-500/6 animate-fade-in-up">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Layers size={16} className="text-gold-400/40" />
                  <FileText size={16} className="text-gold-400/40" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold font-[Amiri] text-gradient-gold mb-1">{currentSurah.name}</h2>
                <p className="text-dark-300 text-xs mb-0.5">{currentSurah.englishName} - {currentSurah.englishNameTranslation}</p>
                <p className="text-dark-500 text-[10px]">{currentSurah.numberOfAyahs} آية • {currentSurah.revelationType === "Meccan" ? "مكية" : "مدنية"}</p>
              </div>
            )}

            {selectedSurah !== 9 && selectedSurah !== 1 && (
              <div className="text-center mb-5">
                <p className="text-gold-300/75 text-xl lg:text-2xl font-[Amiri] font-bold">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              </div>
            )}

            {loadingAyahs ? (
              <div className="flex flex-col items-center py-20">
                <div className="w-10 h-10 border-2 border-dark-700 border-t-gold-400 rounded-full animate-spin" />
                <p className="text-dark-400 mt-4 text-xs">جاري تحميل الآيات...</p>
              </div>
            ) : (
              <div className="card p-5 lg:p-8 animate-fade-in-up">
                <div className="text-right leading-[2.8] lg:leading-[3] text-lg lg:text-xl font-[Amiri] text-white/85" dir="rtl">
                  {ayahs.map((ayah) => (
                    <span key={ayah.number} className="inline">
                      <span>{ayah.text}</span>
                      <span className="inline-flex items-center justify-center w-6 h-6 lg:w-7 lg:h-7 mx-0.5 text-[9px] text-gold-400 bg-gold-500/6 rounded-full border border-gold-500/8 font-sans align-middle">
                        {ayah.numberInSurah}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
