import { useEffect, useState } from "react";
import {
  BookOpen, CircleDot, Compass, Heart, ListFilter, Moon,
  RotateCcw, Shield, Sparkles, Sunrise,
} from "lucide-react";
import type { ReactNode } from "react";
import { AzkarCard, type DuaItem } from "../components/AzkarCard";
import { cn } from "../utils/cn";
import { useTranslation } from "../i18n";

const CATEGORIES: { id: string; labelKey: string; icon: ReactNode }[] = [
  { id: "all", labelKey: "azkar.categories.all", icon: <ListFilter size={13} /> },
  { id: "morning", labelKey: "azkar.categories.morning", icon: <Sunrise size={13} /> },
  { id: "evening", labelKey: "azkar.categories.evening", icon: <Moon size={13} /> },
  { id: "prayer", labelKey: "azkar.categories.prayer", icon: <Compass size={13} /> },
  { id: "protection", labelKey: "azkar.categories.protection", icon: <Shield size={13} /> },
  { id: "daily", labelKey: "azkar.categories.daily", icon: <BookOpen size={13} /> },
];

const DUAS: DuaItem[] = [
  { id: 1, category: "morning", catIcon: <Sunrise size={18} />, titleAr: "دعاء الصباح", textAr: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", transliteration: "Asbahna wa asbahal mulku lillah...", textEn: "We have entered a new morning and with it all dominion belongs to Allah. Praise is to Allah — none has the right to be worshipped except Him alone.", reference: "صحيح مسلم" },
  { id: 2, category: "morning", catIcon: <Sunrise size={18} />, titleAr: "سيد الاستغفار", textAr: "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ", transliteration: "Allahumma anta rabbi la ilaha illa ant...", textEn: "O Allah, You are my Lord, there is none worthy of worship but You. You created me and I am Your slave — I keep Your covenant as much as I can.", reference: "صحيح البخاري" },
  { id: 3, category: "evening", catIcon: <Moon size={18} />, titleAr: "دعاء المساء", textAr: "أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ", transliteration: "Amsayna wa amsal mulku lillah...", textEn: "We have entered the evening and with it all dominion belongs to Allah. Praise is to Allah — none has the right to be worshipped except Him alone.", reference: "صحيح مسلم" },
  { id: 4, category: "evening", catIcon: <Moon size={18} />, titleAr: "دعاء قبل النوم", textAr: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", transliteration: "Bismika Allahumma amutu wa ahya", textEn: "In Your name, O Allah, I die and I live.", reference: "صحيح البخاري" },
  { id: 5, category: "prayer", catIcon: <Compass size={18} />, titleAr: "دعاء الاستفتاح", textAr: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَىٰ جَدُّكَ، وَلَا إِلَٰهَ غَيْرُكَ", transliteration: "Subhanaka Allahumma wa bihamdik...", textEn: "Glory is to You O Allah, and praise. Blessed is Your name and exalted is Your majesty — there is none worthy of worship but You.", reference: "سنن أبي داود" },
  { id: 6, category: "prayer", catIcon: <Compass size={18} />, titleAr: "دعاء بين السجدتين", textAr: "رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي", transliteration: "Rabbighfir li, Rabbighfir li", textEn: "My Lord, forgive me. My Lord, forgive me.", reference: "سنن ابن ماجه" },
  { id: 7, category: "prayer", catIcon: <Compass size={18} />, titleAr: "دعاء القنوت", textAr: "اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ، وَتَوَلَّنِي فِيمَنْ تَوَلَّيْتَ", transliteration: "Allahumma-hdini fiman hadayt...", textEn: "O Allah, guide me among those You have guided, grant me well-being among those You have granted it, and protect me among those You have protected.", reference: "سنن الترمذي" },
  { id: 8, category: "protection", catIcon: <Shield size={18} />, titleAr: "آية الكرسي", textAr: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ", transliteration: "Allahu la ilaha illa huwal hayyul qayyum...", textEn: "Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and the earth.", reference: "البقرة ٢٥٥" },
  { id: 9, category: "protection", catIcon: <Shield size={18} />, titleAr: "دعاء الخروج", textAr: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", transliteration: "Bismillah, tawakkaltu 'alallah...", textEn: "In the name of Allah, I place my trust in Allah — there is no might nor power except with Allah.", reference: "سنن الترمذي" },
  { id: 10, category: "daily", catIcon: <BookOpen size={18} />, titleAr: "دعاء الطعام", textAr: "بِسْمِ اللَّهِ، وَبِبَرَكَةِ اللَّهِ", transliteration: "Bismillah, wa barakatillah", textEn: "In the name of Allah and with the blessing of Allah.", reference: "سنن أبي داود" },
  { id: 11, category: "daily", catIcon: <BookOpen size={18} />, titleAr: "دعاء بعد الطعام", textAr: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ", transliteration: "Alhamdu lillahil ladhi at'amani...", textEn: "Praise be to Allah who fed me this and provided it without any effort or power on my part.", reference: "سنن الترمذي" },
  { id: 12, category: "daily", catIcon: <BookOpen size={18} />, titleAr: "دعاء دخول المسجد", textAr: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", transliteration: "Allahummaftah li abwaba rahmatik", textEn: "O Allah, open for me the gates of Your mercy.", reference: "صحيح مسلم" },
  { id: 13, category: "protection", catIcon: <Shield size={18} />, titleAr: "دعاء الحفظ", textAr: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ", transliteration: "Bismillahil ladhi la yadurru...", textEn: "In the name of Allah, with whose name nothing on earth or in heaven can cause harm — He is the All-Hearing, All-Knowing.", reference: "سنن الترمذي" },
  { id: 14, category: "morning", catIcon: <Sunrise size={18} />, titleAr: "التوكل على الله", textAr: "حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ ۖ عَلَيْهِ تَوَكَّلْتُ ۖ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ", transliteration: "Hasbiyallahu la ilaha illa huwa...", textEn: "Allah is sufficient for me — there is no deity except Him. In Him I trust, and He is the Lord of the Mighty Throne.", reference: "التوبة ١٢٩" },
  { id: 15, category: "evening", catIcon: <Moon size={18} />, titleAr: "المعوذتان", textAr: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ • مِنْ شَرِّ مَا خَلَقَ • وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ", transliteration: "Qul a'udhu birabbil falaq...", textEn: "Say: I seek refuge in the Lord of the daybreak — from the evil of what He created, and from the evil of darkness when it settles.", reference: "سورة الفلق" },
];

export function DuaPage() {
  const { t, language } = useTranslation();
  const [activeCat, setActiveCat] = useState("all");
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("taqwaa-favorites") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("taqwaa-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: number) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const filteredDuas = activeCat === "all"
    ? DUAS
    : DUAS.filter((d) => d.category === activeCat);

  return (
    <div className="animate-page-enter">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        {/* ===== Page header ===== */}
        <header className="flex flex-col items-center gap-3.5 sm:gap-5 text-center md:flex-row md:text-start">
          <span className="octagram octagram-solid h-14 w-14 sm:h-16 sm:w-16 shrink-0 text-white shadow-[0_12px_30px_-12px_rgba(201,162,39,0.7)]" aria-hidden="true">
            <Heart size={24} strokeWidth={1.7} />
          </span>
          <div>
            <h1 className="font-quran text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gradient-gold">
              {t("azkar.title")}
            </h1>
            <p className="mt-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-ink-500">
              {t("azkar.subtitle")}
            </p>
          </div>
        </header>

        <div className="mt-6">
          {/* Tasbeeh counter */}
          <TasbeehCounter />

          {/* Category filter */}
          <div className="mt-6 flex gap-1.5 overflow-x-auto pb-1 no-scrollbar" role="group" aria-label={t("common.filter")}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                aria-pressed={activeCat === cat.id}
                className={cn("chip shrink-0 !py-2 !px-3.5 !text-xs", activeCat === cat.id && "chip-active")}
              >
                {cat.icon}
                {t(cat.labelKey)}
              </button>
            ))}
          </div>

          {/* Duas grid */}
          <div className="mt-4 grid grid-cols-1 items-start gap-2.5 sm:grid-cols-2">
            {filteredDuas.map((dua, idx) => (
              <AzkarCard
                key={dua.id}
                dua={dua}
                index={idx}
                isFavorite={favorites.includes(dua.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

          {filteredDuas.length === 0 && (
            <div className="card mt-5 flex flex-col items-center py-12 text-center">
              <ListFilter size={32} className="mb-2.5 text-ink-300" aria-hidden="true" />
              <p className="font-arabic text-sm font-bold text-ink-700">{t("azkar.emptyCategory")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TasbeehCounter() {
  const { t, language, formatNumber } = useTranslation();
  const [count, setCount] = useState(0);
  const target = 33;

  const phraseKeys = [
    { textKey: "azkar.tasbeehPhrases.0.text", subKey: "azkar.tasbeehPhrases.0.sub", meaningKey: "azkar.tasbeehPhrases.0.meaning" },
    { textKey: "azkar.tasbeehPhrases.1.text", subKey: "azkar.tasbeehPhrases.1.sub", meaningKey: "azkar.tasbeehPhrases.1.meaning" },
    { textKey: "azkar.tasbeehPhrases.2.text", subKey: "azkar.tasbeehPhrases.2.sub", meaningKey: "azkar.tasbeehPhrases.2.meaning" },
  ];

  const phraseIdx = Math.floor(count / target) % phraseKeys.length;
  const phraseKey = phraseKeys[phraseIdx];
  const displayCount = count % target;
  const progress = (displayCount / target) * 100;

  const handleTap = () => {
    setCount((c) => c + 1);
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(20);
    }
  };

  return (
    <section className="card-dark relative overflow-hidden p-5 sm:p-7" aria-label={t("azkar.tasbeehTitle")}>
      {/* Decorations */}
      <Sparkles className="pointer-events-none absolute end-5 top-5 text-gold-500/30" size={16} aria-hidden="true" />

      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
        {/* Phrase info */}
        <div className="flex-1 text-center md:text-start">
          <div className="mb-3 flex items-center justify-between" dir="rtl">
            <span className="flex items-center gap-1.5 font-arabic text-xs font-extrabold tracking-widest text-gold-300">
              <CircleDot size={14} />
              {t("azkar.tasbeehTitle")}
            </span>
            <button
              onClick={() => setCount(0)}
              className="flex cursor-pointer items-center gap-1 rounded-xl border border-white/15 px-2.5 py-1 font-arabic text-[10.5px] font-bold text-white/60 transition-colors hover:border-gold-500/40 hover:text-gold-300"
            >
              <RotateCcw size={11} />
              {t("azkar.resetCounter")}
            </button>
          </div>

          <p className="font-quran text-3xl sm:text-4xl font-bold leading-tight text-gradient-gold-light" dir="rtl">
            {t(phraseKey.textKey)}
          </p>
          <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white/45">{t(phraseKey.subKey)}</p>

          {/* Phase indicator */}
          <div className="mt-4 flex items-center justify-center gap-2 md:justify-start" aria-hidden="true">
            {phraseKeys.map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === phraseIdx ? "w-6 bg-gold-400" : "w-1.5 bg-white/20"
                )}
              />
            ))}
          </div>
        </div>

        {/* Big circular counter button */}
        <div className="flex flex-col items-center gap-3 self-center">
          <button
            onClick={handleTap}
            aria-label={`${t("azkar.tapToCount")} — ${t("common.countBadge")} ${displayCount}`}
            className="group relative flex h-[94px] w-[94px] sm:h-[110px] sm:w-[110px] cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 shadow-[0_12px_36px_-10px_rgba(201,162,39,0.85)] transition-all active:scale-90 select-none"
          >
            <span className="absolute inset-[4px] rounded-full border border-dashed border-white/40 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
            <span className="font-mono text-3xl sm:text-4xl font-extrabold tabular-nums text-white drop-shadow-sm">
              {displayCount}
            </span>
          </button>

          <div className="w-full max-w-[170px]">
            <div className="progress-track !bg-white/10 mb-1.5" role="progressbar" aria-valuenow={displayCount} aria-valuemin={0} aria-valuemax={target}>
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between font-arabic text-[9.5px] font-semibold text-white/50" dir="rtl">
              <span>{t("azkar.roundsCompleted")}: {formatNumber(count)}</span>
              <span>{formatNumber(displayCount)}/{formatNumber(target)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
