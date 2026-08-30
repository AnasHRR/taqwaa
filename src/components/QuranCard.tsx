import { Bookmark } from "lucide-react";
import { useTranslation } from "../i18n";

export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

interface QuranCardProps {
  surah: Surah;
  index: number;
  onSelect: (number: number) => void;
}

export function QuranCard({ surah, index, onSelect }: QuranCardProps) {
  const { t, formatNumber, isRTL } = useTranslation();
  const isMeccan = surah.revelationType === "Meccan";

  return (
    <button
      onClick={() => onSelect(surah.number)}
      className="card card-hover group flex w-full cursor-pointer items-center justify-between gap-2.5 sm:gap-3.5 p-3.5 sm:p-4 text-start animate-fade-in-up transition-all"
      style={{ animationDelay: `${Math.min(index * 20, 300)}ms` }}
      aria-label={`${t("quran.surahNumber")} ${surah.name} — ${surah.englishName}`}
    >
      <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
        {/* Octagram number badge */}
        <span
          className="octagram h-10 w-10 sm:h-11 sm:w-11 shrink-0 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105"
          aria-hidden="true"
        >
          <span className="font-arabic text-xs sm:text-sm font-bold text-gold-700">
            {formatNumber(surah.number)}
          </span>
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <span className="truncate font-quran text-base sm:text-lg font-bold leading-snug text-ink-900 transition-colors group-hover:text-gold-700">
              {surah.name}
            </span>
          </div>
          <span className="block truncate text-[10.5px] sm:text-[11px] font-semibold text-ink-500">
            {surah.englishName} · <span className="opacity-75">{surah.englishNameTranslation}</span>
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1">
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[8.5px] sm:text-[9px] font-bold ${
            isMeccan
              ? "border-gold-500/30 bg-gold-50 text-gold-700"
              : "border-pine-700/25 bg-pine-800/[0.06] text-pine-700"
          }`}
        >
          <Bookmark size={8} aria-hidden="true" />
          {isMeccan ? t("quran.meccan") : t("quran.medinan")}
        </span>
        <span className="text-[9.5px] sm:text-[10px] font-semibold text-ink-400">
          {formatNumber(surah.numberOfAyahs)} {t("quran.ayahsCount")}
        </span>
      </div>
    </button>
  );
}
