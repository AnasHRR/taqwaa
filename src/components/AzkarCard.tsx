import { useState } from "react";
import { BookMarked, Check, Copy, Heart, Plus, RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export interface DuaItem {
  id: number;
  category: string;
  catIcon: ReactNode;
  titleAr: string;
  textAr: string;
  transliteration: string;
  textEn: string;
  reference: string;
}

interface AzkarCardProps {
  dua: DuaItem;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

export function AzkarCard({ dua, index, isFavorite, onToggleFavorite }: AzkarCardProps) {
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(0);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${dua.textAr}\n\n${dua.reference}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <article
      className={cn(
        "card relative overflow-hidden p-5 animate-fade-in-up transition-colors sm:p-6",
        isFavorite && "border-gold-500/40 bg-gradient-to-br from-white to-gold-50"
      )}
      style={{ animationDelay: `${Math.min(index * 45, 350)}ms` }}
    >
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="octagram h-11 w-11 shrink-0 text-gold-700" aria-hidden="true">
            {dua.catIcon}
          </span>
          <div className="min-w-0">
            <h3 className="truncate font-arabic text-base font-bold text-ink-900" dir="rtl">{dua.titleAr}</h3>
            <p className="mt-0.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-ink-500">
              <BookMarked size={10} className="text-gold-600" aria-hidden="true" />
              {dua.reference}
            </p>
          </div>
        </div>

        {/* actions */}
        <div className="flex shrink-0 items-center gap-1.5">
          <button
            onClick={() => onToggleFavorite(dua.id)}
            aria-label={isFavorite ? "إزالة من المفضلة" : "أضف إلى المفضلة"}
            aria-pressed={isFavorite}
            className={cn("icon-btn h-9 w-9", isFavorite && "icon-btn-active !text-gold-500")}
          >
            <Heart size={15} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button
            onClick={handleCopy}
            aria-label="نسخ الذكر"
            className={cn("icon-btn h-9 w-9", copied && "icon-btn-active")}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
          </button>
        </div>
      </div>

      {/* Arabic text */}
      <p className="mt-4 font-quran text-lg leading-[2.2] text-ink-800 sm:text-xl" dir="rtl" lang="ar">
        {dua.textAr}
      </p>

      {/* Translation */}
      <p className="mt-3 border-s-2 border-gold-400/50 ps-3 text-sm italic leading-relaxed text-ink-600">
        "{dua.textEn}"
      </p>
      <p className="mt-1.5 ps-3 font-arabic text-[10px] text-ink-400">{dua.transliteration}</p>

      <div className="divider-gold my-4" />

      {/* counter row */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-gold-50 px-2.5 py-1 font-mono text-xs font-bold tabular-nums text-gold-700" aria-live="polite">
          {count > 0 ? `${count} ×` : "—"}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCount(0)}
            disabled={count === 0}
            aria-label="تصفير العداد"
            className="icon-btn h-9 w-9 disabled:pointer-events-none disabled:opacity-35"
          >
            <RotateCcw size={13} />
          </button>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="btn btn-primary btn-sm cursor-pointer !px-5"
            aria-label={`عدّ تكرار ${dua.titleAr}`}
          >
            <Plus size={14} strokeWidth={2.5} />
            <span className="font-arabic">سبّح</span>
          </button>
        </div>
      </div>

      {/* copied toast */}
      {copied && (
        <span className="absolute end-4 top-14 inline-flex animate-fade-in items-center gap-1.5 rounded-full bg-pine-800 px-3 py-1.5 font-arabic text-[10px] font-bold text-white shadow-lg" role="status">
          <Check size={11} />
          تم النسخ
        </span>
      )}
    </article>
  );
}
