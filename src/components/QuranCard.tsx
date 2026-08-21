import { Bookmark } from "lucide-react";

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

const toArabicNumber = (n: number): string =>
  String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]);

export function QuranCard({ surah, index, onSelect }: QuranCardProps) {
  const isMeccan = surah.revelationType === "Meccan";

  return (
    <button
      onClick={() => onSelect(surah.number)}
      className="card card-hover group flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-4 text-start animate-fade-in-up sm:px-5"
      style={{ animationDelay: `${Math.min(index * 25, 400)}ms` }}
      aria-label={`سورة ${surah.name} — ${surah.englishName}`}
    >
      <span className="flex min-w-0 items-center gap-3.5">
        {/* Octagram number badge */}
        <span className="octagram h-11 w-11 shrink-0 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105" aria-hidden="true">
          <span className="font-arabic text-sm font-bold text-gold-700">{toArabicNumber(surah.number)}</span>
        </span>

        <span className="min-w-0">
          <span className="block truncate font-quran text-lg font-bold leading-snug text-ink-900 transition-colors group-hover:text-gold-700">
            {surah.name}
          </span>
          <span className="block truncate text-[11px] font-semibold text-ink-500">
            {surah.englishName} · {surah.englishNameTranslation}
          </span>
        </span>
      </span>

      <span className="flex shrink-0 flex-col items-end gap-1.5">
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-arabic text-[9px] font-bold ${
            isMeccan
              ? "border-gold-500/30 bg-gold-50 text-gold-700"
              : "border-pine-700/25 bg-pine-800/[0.06] text-pine-700"
          }`}
        >
          <Bookmark size={8} aria-hidden="true" />
          {isMeccan ? "مكية" : "مدنية"}
        </span>
        <span className="font-arabic text-[10px] font-semibold text-ink-400" dir="rtl">
          {toArabicNumber(surah.numberOfAyahs)} آية
        </span>
      </span>
    </button>
  );
}
