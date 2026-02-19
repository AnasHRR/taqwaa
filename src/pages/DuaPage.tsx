import { useState } from "react";

interface DuaItem {
  id: number;
  category: string;
  categoryIcon: string;
  titleAr: string;
  textAr: string;
  transliteration: string;
  reference: string;
}

const DUA_CATEGORIES = [
  { id: "all", label: "الكل", icon: "📿" },
  { id: "morning", label: "الصباح", icon: "🌅" },
  { id: "evening", label: "المساء", icon: "🌙" },
  { id: "prayer", label: "الصلاة", icon: "🕌" },
  { id: "protection", label: "الحماية", icon: "🛡️" },
  { id: "daily", label: "يومية", icon: "📖" },
];

const DUAS: DuaItem[] = [
  {
    id: 1,
    category: "morning",
    categoryIcon: "🌅",
    titleAr: "دعاء الصباح",
    textAr: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Asbahna wa asbahal mulku lillah, walhamdu lillah...",
    reference: "صحيح مسلم",
  },
  {
    id: 2,
    category: "morning",
    categoryIcon: "🌅",
    titleAr: "سيد الاستغفار",
    textAr: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ",
    transliteration: "Allahumma anta rabbi la ilaha illa ant...",
    reference: "صحيح البخاري",
  },
  {
    id: 3,
    category: "evening",
    categoryIcon: "🌙",
    titleAr: "دعاء المساء",
    textAr: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    transliteration: "Amsayna wa amsal mulku lillah...",
    reference: "صحيح مسلم",
  },
  {
    id: 4,
    category: "evening",
    categoryIcon: "🌙",
    titleAr: "دعاء قبل النوم",
    textAr: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
    transliteration: "Bismika Allahumma amutu wa ahya",
    reference: "صحيح البخاري",
  },
  {
    id: 5,
    category: "prayer",
    categoryIcon: "🕌",
    titleAr: "دعاء الاستفتاح",
    textAr: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَىٰ جَدُّكَ، وَلَا إِلَٰهَ غَيْرُكَ",
    transliteration: "Subhanaka Allahumma wa bihamdik...",
    reference: "سنن أبي داود",
  },
  {
    id: 6,
    category: "prayer",
    categoryIcon: "🕌",
    titleAr: "دعاء بين السجدتين",
    textAr: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي",
    transliteration: "Rabbighfir li, Rabbighfir li",
    reference: "سنن ابن ماجه",
  },
  {
    id: 7,
    category: "prayer",
    categoryIcon: "🕌",
    titleAr: "دعاء القنوت",
    textAr: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ، وَبَارِكْ لِي فِيمَا أَعْطَيْتَ، وَقِنِي شَرَّ مَا قَضَيْتَ، إِنَّكَ تَقْضِي وَلَا يُقْضَىٰ عَلَيْكَ",
    transliteration: "Allahumma-hdini fiman hadayt...",
    reference: "سنن الترمذي",
  },
  {
    id: 8,
    category: "protection",
    categoryIcon: "🛡️",
    titleAr: "آية الكرسي",
    textAr: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
    transliteration: "Allahu la ilaha illa huwal hayyul qayyum...",
    reference: "البقرة ٢٥٥",
  },
  {
    id: 9,
    category: "protection",
    categoryIcon: "🛡️",
    titleAr: "دعاء الخروج من المنزل",
    textAr: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    transliteration: "Bismillah, tawakkaltu 'alallah...",
    reference: "سنن الترمذي",
  },
  {
    id: 10,
    category: "daily",
    categoryIcon: "📖",
    titleAr: "دعاء الطعام",
    textAr: "بِسْمِ اللَّهِ، وَبِبَرَكَةِ اللَّهِ",
    transliteration: "Bismillah, wa barakatillah",
    reference: "سنن أبي داود",
  },
  {
    id: 11,
    category: "daily",
    categoryIcon: "📖",
    titleAr: "دعاء بعد الطعام",
    textAr: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ",
    transliteration: "Alhamdu lillahil ladhi at'amani hadha...",
    reference: "سنن الترمذي",
  },
  {
    id: 12,
    category: "daily",
    categoryIcon: "📖",
    titleAr: "دعاء دخول المسجد",
    textAr: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
    transliteration: "Allahummaftah li abwaba rahmatik",
    reference: "صحيح مسلم",
  },
  {
    id: 13,
    category: "protection",
    categoryIcon: "🛡️",
    titleAr: "دعاء الحفظ",
    textAr: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
    transliteration: "Bismillahil ladhi la yadurru ma'asmihi shay'un...",
    reference: "سنن الترمذي",
  },
  {
    id: 14,
    category: "morning",
    categoryIcon: "🌅",
    titleAr: "التوكل على الله",
    textAr: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ",
    transliteration: "Hasbiyallahu la ilaha illa huwa...",
    reference: "التوبة ١٢٩",
  },
  {
    id: 15,
    category: "evening",
    categoryIcon: "🌙",
    titleAr: "المعوذتان",
    textAr: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ • مِنْ شَرِّ مَا خَلَقَ • وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ • وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ • وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ",
    transliteration: "Qul a'udhu birabbil falaq...",
    reference: "سورة الفلق",
  },
];

export function DuaPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [expandedDua, setExpandedDua] = useState<number | null>(null);

  const filteredDuas =
    activeCategory === "all"
      ? DUAS
      : DUAS.filter((d) => d.category === activeCategory);

  return (
    <div className="page-content">
      {/* Header */}
      <div className="relative pt-6 pb-4">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="text-4xl mb-2">🤲</div>
          <h1 className="text-3xl font-bold font-[Amiri] text-gradient-gold mb-1">الأدعية والأذكار</h1>
          <p className="text-midnight-300 text-xs">Duas & Supplications</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 pb-8">
        {/* Tasbeeh Counter */}
        <TasbeehCounter />

        {/* Category Filter */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-2 scrollbar-hide">
          {DUA_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer border flex-shrink-0
                ${activeCategory === cat.id
                  ? "glass-card border-gold-500/25 text-gold-400"
                  : "bg-midnight-800/30 border-midnight-700/30 text-midnight-400 hover:text-midnight-200 hover:border-midnight-600/50"
                }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Duas List */}
        <div className="space-y-3">
          {filteredDuas.map((dua, idx) => {
            const isExpanded = expandedDua === dua.id;
            return (
              <div
                key={dua.id}
                className="glass-card rounded-2xl overflow-hidden border border-midnight-600/30 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <button
                  onClick={() => setExpandedDua(isExpanded ? null : dua.id)}
                  className="w-full p-4 flex items-center justify-between cursor-pointer"
                  dir="rtl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500/15 to-gold-600/5 flex items-center justify-center border border-gold-500/10 text-xl flex-shrink-0">
                      {dua.categoryIcon}
                    </div>
                    <div className="text-right">
                      <span className="block text-white font-bold text-sm">{dua.titleAr}</span>
                      <span className="block text-midnight-400 text-[10px] mt-0.5">{dua.reference}</span>
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 text-midnight-500 transition-transform duration-300 flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 animate-slide-down">
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-midnight-600/40 to-transparent mb-4" />

                    <p className="text-gold-200 text-lg sm:text-xl font-[Amiri] leading-[2.2] text-center mb-3 px-2" dir="rtl">
                      {dua.textAr}
                    </p>

                    <div className="bg-midnight-800/40 rounded-lg px-3 py-2 mb-2">
                      <p className="text-midnight-300 text-[11px] italic text-center">
                        {dua.transliteration}
                      </p>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      <span className="text-[9px] text-midnight-500">📚</span>
                      <span className="text-midnight-400 text-[10px]">{dua.reference}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredDuas.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-midnight-400 text-sm">لا توجد أدعية في هذا التصنيف</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TasbeehCounter() {
  const [count, setCount] = useState(0);
  const [target] = useState(33);

  const phrases = [
    { text: "سُبْحَانَ اللَّهِ", transliteration: "SubhanAllah" },
    { text: "الْحَمْدُ لِلَّهِ", transliteration: "Alhamdulillah" },
    { text: "اللَّهُ أَكْبَرُ", transliteration: "Allahu Akbar" },
  ];

  const currentPhraseIndex = Math.floor(count / target) % phrases.length;
  const currentPhrase = phrases[currentPhraseIndex];
  const displayCount = count % target;
  const progress = (displayCount / target) * 100;

  return (
    <div className="glass-card rounded-2xl p-5 mb-5 border border-gold-500/15 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="flex items-center justify-between mb-3" dir="rtl">
        <div className="flex items-center gap-2">
          <span className="text-lg">📿</span>
          <span className="text-gold-400 text-xs font-bold tracking-wider">التسبيح</span>
        </div>
        <button
          onClick={() => setCount(0)}
          className="text-midnight-500 hover:text-midnight-300 transition-colors text-[10px] cursor-pointer px-2 py-0.5 rounded-lg hover:bg-midnight-700/30"
        >
          إعادة ↺
        </button>
      </div>

      <div className="text-center mb-3">
        <p className="text-gold-300 text-2xl font-[Amiri] font-bold mb-0.5">{currentPhrase.text}</p>
        <p className="text-midnight-400 text-[10px]">{currentPhrase.transliteration}</p>
      </div>

      {/* Counter */}
      <button
        onClick={() => setCount((c) => c + 1)}
        className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/10 border-2 border-gold-500/25 flex items-center justify-center mb-3 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer group"
      >
        <span className="text-2xl font-bold text-gold-400 font-mono group-hover:text-gold-300">
          {displayCount}
        </span>
      </button>

      {/* Progress */}
      <div className="progress-bar-bg h-1.5 rounded-full overflow-hidden mb-1.5">
        <div
          className="progress-bar-fill h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between text-[9px] text-midnight-500">
        <span>المجموع: {count}</span>
        <span>{displayCount}/{target}</span>
      </div>
    </div>
  );
}
