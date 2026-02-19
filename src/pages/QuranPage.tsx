import { useState, useEffect } from "react";

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
  { surah: 2, ayah: 286, text: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ", ref: "البقرة ٢٨٦" },
  { surah: 3, ayah: 139, text: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ", ref: "آل عمران ١٣٩" },
  { surah: 94, ayah: 6, text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", ref: "الشرح ٦" },
  { surah: 2, ayah: 152, text: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ", ref: "البقرة ١٥٢" },
  { surah: 13, ayah: 28, text: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", ref: "الرعد ٢٨" },
  { surah: 65, ayah: 3, text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", ref: "الطلاق ٣" },
  { surah: 39, ayah: 53, text: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ", ref: "الزمر ٥٣" },
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
      .then((data) => {
        if (data.code === 200) {
          setSurahs(data.data);
        }
      })
      .catch(() => {})
      .finally(() => setLoadingSurahs(false));
  }, []);

  const loadSurah = async (surahNumber: number) => {
    setSelectedSurah(surahNumber);
    setLoadingAyahs(true);
    try {
      const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`);
      const data = await res.json();
      if (data.code === 200) {
        setAyahs(data.data.ayahs);
      }
    } catch {
      // handle error silently
    } finally {
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
    <div className="page-content">
      {/* Header */}
      <div className="relative pt-6 pb-4">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-center mb-5">
            <div className="text-4xl mb-2">📖</div>
            <h1 className="text-3xl font-bold font-[Amiri] text-gradient-gold mb-1">القرآن الكريم</h1>
            <p className="text-midnight-300 text-xs">The Noble Quran</p>
          </div>

          {/* Daily Verse Card */}
          <div className="glass-card rounded-2xl p-5 mb-5 relative overflow-hidden border border-gold-500/15">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gold-500/[0.05] rounded-full blur-xl" />

            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">✨</span>
              <span className="text-gold-400 text-xs font-bold tracking-wider uppercase">آية اليوم</span>
            </div>

            <p className="text-gold-200 text-xl sm:text-2xl font-[Amiri] leading-[2] text-center mb-3" dir="rtl">
              {dailyVerse.text}
            </p>

            <div className="gold-divider w-12 mx-auto mb-2" />
            <p className="text-midnight-400 text-[11px] text-center tracking-wider">
              {dailyVerse.ref}
            </p>
          </div>

          {/* Back button when surah is selected */}
          {selectedSurah && (
            <button
              onClick={() => { setSelectedSurah(null); setAyahs([]); }}
              className="flex items-center gap-2 mb-4 text-gold-400 hover:text-gold-300 transition-colors cursor-pointer group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-semibold">العودة للسور</span>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-xl mx-auto px-4 pb-8">
        {!selectedSurah ? (
          <>
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن سورة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full glass-card rounded-xl pl-4 pr-11 py-3 text-white placeholder-midnight-400 focus:outline-none focus:ring-2 focus:ring-gold-500/30 text-right text-sm border border-midnight-600/30"
                  dir="rtl"
                />
                <svg className="w-4 h-4 text-midnight-400 absolute right-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Surahs list */}
            {loadingSurahs ? (
              <div className="flex flex-col items-center py-16">
                <div className="w-12 h-12 rounded-full border-2 border-gold-400 border-t-transparent animate-spin" />
                <p className="text-midnight-300 mt-4 text-sm">جاري تحميل السور...</p>
              </div>
            ) : (
              <div className="grid gap-2">
                {filteredSurahs.map((surah, idx) => (
                  <button
                    key={surah.number}
                    onClick={() => loadSurah(surah.number)}
                    className="glass-card rounded-xl px-4 py-3 flex items-center justify-between hover:border-gold-500/20 transition-all duration-300 cursor-pointer group animate-fade-in-up"
                    style={{ animationDelay: `${Math.min(idx * 30, 500)}ms` }}
                    dir="rtl"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-gold-500/15 to-gold-600/5 flex items-center justify-center border border-gold-500/10 rotate-45">
                        <span className="text-gold-400 text-xs font-bold -rotate-45">{surah.number}</span>
                      </div>
                      <div className="text-right">
                        <span className="block text-white font-bold font-[Amiri] text-base group-hover:text-gold-300 transition-colors">
                          {surah.name}
                        </span>
                        <span className="block text-midnight-400 text-[10px]">
                          {surah.englishNameTranslation} • {surah.numberOfAyahs} آية
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full border ${
                        surah.revelationType === "Meccan"
                          ? "text-amber-400 bg-amber-500/10 border-amber-500/15"
                          : "text-emerald-400 bg-emerald-500/10 border-emerald-500/15"
                      }`}>
                        {surah.revelationType === "Meccan" ? "مكية" : "مدنية"}
                      </span>
                      <svg className="w-3.5 h-3.5 text-midnight-500 group-hover:text-gold-400 transition-colors group-hover:-translate-x-1 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Surah header */}
            {currentSurah && (
              <div className="glass-card rounded-2xl p-5 mb-4 text-center border border-gold-500/15">
                <h2 className="text-2xl font-bold font-[Amiri] text-gradient-gold mb-1">
                  {currentSurah.name}
                </h2>
                <p className="text-midnight-300 text-xs mb-1">
                  {currentSurah.englishName} - {currentSurah.englishNameTranslation}
                </p>
                <p className="text-midnight-400 text-[10px]">
                  {currentSurah.numberOfAyahs} آية • {currentSurah.revelationType === "Meccan" ? "مكية" : "مدنية"}
                </p>
              </div>
            )}

            {/* Bismillah */}
            {selectedSurah !== 9 && selectedSurah !== 1 && (
              <div className="text-center mb-4">
                <p className="text-gold-300 text-xl font-[Amiri] font-bold">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              </div>
            )}

            {/* Ayahs */}
            {loadingAyahs ? (
              <div className="flex flex-col items-center py-16">
                <div className="w-12 h-12 rounded-full border-2 border-gold-400 border-t-transparent animate-spin" />
                <p className="text-midnight-300 mt-4 text-sm">جاري تحميل الآيات...</p>
              </div>
            ) : (
              <div className="glass-card rounded-2xl p-5 border border-midnight-600/30">
                <div className="text-right leading-[2.5] text-lg sm:text-xl font-[Amiri] text-white/90" dir="rtl">
                  {ayahs.map((ayah) => (
                    <span key={ayah.number} className="inline">
                      <span className="hover:text-gold-300 transition-colors">{ayah.text}</span>
                      <span className="inline-flex items-center justify-center w-7 h-7 mx-1 text-[10px] text-gold-400 bg-gold-500/10 rounded-full border border-gold-500/15 font-sans align-middle">
                        {ayah.numberInSurah}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
