import { useState } from "react";
import {
  Heart, Sunrise, Moon, Compass, Shield, BookOpen,
  ChevronDown, RotateCcw, Sparkles, BookMarked,
  ListFilter, CircleDot
} from "lucide-react";

interface DuaItem {
  id: number;
  category: string;
  catIcon: React.ReactNode;
  titleAr: string;
  textAr: string;
  transliteration: string;
  reference: string;
}

const CATEGORIES = [
  { id: "all", label: "الكل", icon: <ListFilter size={13} /> },
  { id: "morning", label: "الصباح", icon: <Sunrise size={13} /> },
  { id: "evening", label: "المساء", icon: <Moon size={13} /> },
  { id: "prayer", label: "الصلاة", icon: <Compass size={13} /> },
  { id: "protection", label: "الحماية", icon: <Shield size={13} /> },
  { id: "daily", label: "يومية", icon: <BookOpen size={13} /> },
];

const DUAS: DuaItem[] = [
  { id: 1, category: "morning", catIcon: <Sunrise size={18} />, titleAr: "دعاء الصباح", textAr: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", transliteration: "Asbahna wa asbahal mulku lillah...", reference: "صحيح مسلم" },
  { id: 2, category: "morning", catIcon: <Sunrise size={18} />, titleAr: "سيد الاستغفار", textAr: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ", transliteration: "Allahumma anta rabbi la ilaha illa ant...", reference: "صحيح البخاري" },
  { id: 3, category: "evening", catIcon: <Moon size={18} />, titleAr: "دعاء المساء", textAr: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", transliteration: "Amsayna wa amsal mulku lillah...", reference: "صحيح مسلم" },
  { id: 4, category: "evening", catIcon: <Moon size={18} />, titleAr: "دعاء قبل النوم", textAr: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", transliteration: "Bismika Allahumma amutu wa ahya", reference: "صحيح البخاري" },
  { id: 5, category: "prayer", catIcon: <Compass size={18} />, titleAr: "دعاء الاستفتاح", textAr: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَىٰ جَدُّكَ، وَلَا إِلَٰهَ غَيْرُكَ", transliteration: "Subhanaka Allahumma wa bihamdik...", reference: "سنن أبي داود" },
  { id: 6, category: "prayer", catIcon: <Compass size={18} />, titleAr: "دعاء بين السجدتين", textAr: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي", transliteration: "Rabbighfir li, Rabbighfir li", reference: "سنن ابن ماجه" },
  { id: 7, category: "prayer", catIcon: <Compass size={18} />, titleAr: "دعاء القنوت", textAr: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ", transliteration: "Allahumma-hdini fiman hadayt...", reference: "سنن الترمذي" },
  { id: 8, category: "protection", catIcon: <Shield size={18} />, titleAr: "آية الكرسي", textAr: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ", transliteration: "Allahu la ilaha illa huwal hayyul qayyum...", reference: "البقرة ٢٥٥" },
  { id: 9, category: "protection", catIcon: <Shield size={18} />, titleAr: "دعاء الخروج", textAr: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", transliteration: "Bismillah, tawakkaltu 'alallah...", reference: "سنن الترمذي" },
  { id: 10, category: "daily", catIcon: <BookOpen size={18} />, titleAr: "دعاء الطعام", textAr: "بِسْمِ اللَّهِ، وَبِبَرَكَةِ اللَّهِ", transliteration: "Bismillah, wa barakatillah", reference: "سنن أبي داود" },
  { id: 11, category: "daily", catIcon: <BookOpen size={18} />, titleAr: "دعاء بعد الطعام", textAr: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ", transliteration: "Alhamdu lillahil ladhi at'amani...", reference: "سنن الترمذي" },
  { id: 12, category: "daily", catIcon: <BookOpen size={18} />, titleAr: "دعاء دخول المسجد", textAr: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", transliteration: "Allahummaftah li abwaba rahmatik", reference: "صحيح مسلم" },
  { id: 13, category: "protection", catIcon: <Shield size={18} />, titleAr: "دعاء الحفظ", textAr: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", transliteration: "Bismillahil ladhi la yadurru...", reference: "سنن الترمذي" },
  { id: 14, category: "morning", catIcon: <Sunrise size={18} />, titleAr: "التوكل على الله", textAr: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", transliteration: "Hasbiyallahu la ilaha illa huwa...", reference: "التوبة ١٢٩" },
  { id: 15, category: "evening", catIcon: <Moon size={18} />, titleAr: "المعوذتان", textAr: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ • مِنْ شَرِّ مَا خَلَقَ • وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ", transliteration: "Qul a'udhu birabbil falaq...", reference: "سورة الفلق" },
];

export function DuaPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredDuas = activeCat === "all" ? DUAS : DUAS.filter((d) => d.category === activeCat);

  return (
    <div className="animate-page-enter">
      {/* Header */}
      <div className="px-5 md:px-8 lg:px-10 pt-5 md:pt-8 pb-4">
        <div className="flex flex-col items-center md:flex-row md:items-center md:gap-6">
          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-[18px] bg-gradient-to-br from-accent-rose/10 to-accent-rose/3 flex items-center justify-center border border-accent-rose/6 mb-3 md:mb-0">
            <Heart size={28} className="text-accent-rose" strokeWidth={1.8} />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold font-[Amiri] text-gradient-gold mb-0.5">الأدعية والأذكار</h1>
            <p className="text-dark-400 text-[11px] lg:text-xs">Duas & Supplications • أدعية مختارة</p>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-8 lg:px-10 pb-6">
        {/* Tasbeeh */}
        <TasbeehCounter />

        {/* Category filter */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`chip flex-shrink-0 ${activeCat === cat.id ? "chip-active" : "chip-inactive"}`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Duas grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {filteredDuas.map((dua, idx) => {
            const isExpanded = expandedId === dua.id;
            return (
              <div
                key={dua.id}
                className="card overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : dua.id)}
                  className="w-full px-4 py-3.5 flex items-center justify-between touch-active cursor-pointer"
                  dir="rtl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/4 flex items-center justify-center border border-gold-500/6 text-gold-400 flex-shrink-0">
                      {dua.catIcon}
                    </div>
                    <div className="text-right">
                      <span className="block text-white font-bold text-[13px]">{dua.titleAr}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <BookMarked size={10} className="text-dark-500" />
                        <span className="text-dark-500 text-[10px]">{dua.reference}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-dark-500 transition-transform duration-300 flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 animate-slide-down-in">
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-dark-700/50 to-transparent mb-4" />
                    <p className="text-gold-200/85 text-lg font-[Amiri] leading-[2.4] text-center mb-3 px-1" dir="rtl">
                      {dua.textAr}
                    </p>
                    <div className="bg-dark-800/50 rounded-2xl px-3 py-2.5 mb-2">
                      <p className="text-dark-300 text-[10px] italic text-center">{dua.transliteration}</p>
                    </div>
                    <div className="flex items-center justify-center gap-1.5 mt-1">
                      <BookMarked size={10} className="text-dark-600" />
                      <span className="text-dark-500 text-[10px]">{dua.reference}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredDuas.length === 0 && (
          <div className="text-center py-16">
            <ListFilter size={40} className="text-dark-600 mx-auto mb-3" />
            <p className="text-dark-500 text-sm">لا توجد أدعية في هذا التصنيف</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TasbeehCounter() {
  const [count, setCount] = useState(0);
  const target = 33;

  const phrases = [
    { text: "سُبْحَانَ اللَّهِ", sub: "SubhanAllah" },
    { text: "الْحَمْدُ لِلَّهِ", sub: "Alhamdulillah" },
    { text: "اللَّهُ أَكْبَرُ", sub: "Allahu Akbar" },
  ];

  const phraseIdx = Math.floor(count / target) % phrases.length;
  const phrase = phrases[phraseIdx];
  const displayCount = count % target;
  const progress = (displayCount / target) * 100;

  return (
    <div className="card-elevated p-5 lg:p-6 mb-5 relative overflow-hidden border border-gold-500/6 animate-fade-in-up">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500/15 to-transparent" />

      <div className="flex flex-col md:flex-row md:items-center md:gap-8">
        {/* Header & phrase */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4 md:mb-3" dir="rtl">
            <div className="flex items-center gap-2">
              <CircleDot size={16} className="text-gold-400" />
              <span className="text-gold-400 text-[11px] font-bold tracking-wider">التسبيح</span>
            </div>
            <button
              onClick={() => setCount(0)}
              className="flex items-center gap-1.5 text-dark-500 text-[10px] touch-active cursor-pointer px-3 py-1.5 rounded-xl bg-dark-800/50 border border-dark-700/30 hover:border-dark-600/40 transition-colors"
            >
              <RotateCcw size={12} />
              إعادة
            </button>
          </div>

          <div className="text-center md:text-right mb-4 md:mb-0">
            <p className="text-gold-300 text-2xl lg:text-3xl font-[Amiri] font-bold mb-0.5">{phrase.text}</p>
            <p className="text-dark-500 text-[10px]">{phrase.sub}</p>
          </div>
        </div>

        {/* Counter */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="w-[88px] h-[88px] lg:w-[100px] lg:h-[100px] rounded-full bg-gradient-to-br from-gold-500/12 to-gold-600/5 border-2 border-gold-500/15 flex items-center justify-center mb-3 active:scale-90 hover:border-gold-500/25 transition-all duration-200 cursor-pointer shadow-lg shadow-gold-500/5"
          >
            <span className="text-3xl lg:text-4xl font-extrabold text-gold-400 font-mono">{displayCount}</span>
          </button>

          <div className="w-full max-w-[160px]">
            <div className="progress-track mb-2">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-[9px] text-dark-500 px-0.5">
              <span>المجموع: {count}</span>
              <span>{displayCount}/{target}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Phase indicator */}
      <div className="flex items-center justify-center gap-3 mt-4">
        {phrases.map((p, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <Sparkles size={8} className={i === phraseIdx ? "text-gold-400" : "text-dark-600"} />
            <span className={`text-[9px] ${i === phraseIdx ? "text-gold-400 font-bold" : "text-dark-600"}`}>
              {p.sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
