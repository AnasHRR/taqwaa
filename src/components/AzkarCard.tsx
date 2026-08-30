import { useState } from "react";
import { BookMarked, Check, Copy, Heart, Plus, RotateCcw } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "../i18n";
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
  const { t, language, formatNumber } = useTranslation();
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

  const handleIncrement = () => {
    setCount((c) => c + 1);
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(15);
    }
  };

  // Localized title & translation
  const localizedTitle =
    t<Record<number, string>>("azkar.duaTitles")?.[dua.id] || dua.titleAr;
  const localizedTranslation =
    t<Record<number, string>>("azkar.duaTranslations")?.[dua.id] || dua.textEn;

  return (
    <article
      className={cn(
        "card relative overflow-hidden p-4 sm:p-5 animate-fade-in-up transition-all",
        isFavorite && "border-gold-500/40 bg-gradient-to-br from-white via-gold-50/20 to-gold-100/30 shadow-xs"
      )}
      style={{ animationDelay: `${Math.min(index * 35, 300)}ms` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="octagram h-10 w-10 shrink-0 text-gold-700" aria-hidden="true">
            {dua.catIcon}
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm sm:text-base font-bold text-ink-900">
              {localizedTitle}
            </h3>
            <p className="mt-0.5 flex items-center gap-1 text-[9.5px] sm:text-[10px] font-semibold uppercase tracking-wider text-ink-500">
              <BookMarked size={10} className="text-gold-600 shrink-0" aria-hidden="true" />
              <span className="truncate">{dua.reference}</span>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={() => onToggleFavorite(dua.id)}
            aria-label={isFavorite ? t("common.removeFromFavorites") : t("common.addToFavorites")}
            aria-pressed={isFavorite}
            className={cn(
              "icon-btn h-8 w-8 !rounded-lg",
              isFavorite && "icon-btn-active !text-gold-500"
            )}
          >
            <Heart size={14} fill={isFavorite ? "currentColor" : "none"} />
          </button>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={t("common.copy")}
            className={cn("icon-btn h-8 w-8 !rounded-lg", copied && "icon-btn-active")}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Arabic text - Always preserved in pristine Arabic typography */}
      <p
        className="mt-3.5 font-quran text-base sm:text-lg md:text-xl leading-[2.2] sm:leading-[2.4] text-ink-900"
        dir="rtl"
        lang="ar"
      >
        {dua.textAr}
      </p>

      {/* Translation & Transliteration (when not Arabic) */}
      {language !== "ar" && (
        <>
          <p className="mt-2.5 border-s-2 border-gold-400/50 ps-2.5 text-xs sm:text-sm italic leading-relaxed text-ink-600">
            "{localizedTranslation}"
          </p>
          <p className="mt-1 ps-2.5 text-[9.5px] text-ink-400">{dua.transliteration}</p>
        </>
      )}

      <div className="divider-gold my-3.5" />

      {/* Counter row */}
      <div className="flex items-center justify-between">
        <span
          className="rounded-full bg-gold-50 border border-gold-500/20 px-2.5 py-1 font-mono text-xs font-bold tabular-nums text-gold-800"
          aria-live="polite"
        >
          {count > 0 ? `${formatNumber(count)} ×` : "—"}
        </span>
        <div className="flex items-center gap-1.5">
          {count > 0 && (
            <button
              type="button"
              onClick={() => setCount(0)}
              aria-label={t("common.reset")}
              className="icon-btn h-8 w-8 !rounded-lg text-ink-400 hover:text-ink-700"
              title={t("common.reset")}
            >
              <RotateCcw size={13} />
            </button>
          )}
          <button
            type="button"
            onClick={handleIncrement}
            className="btn btn-primary btn-sm cursor-pointer !py-1.5 !px-4 !text-xs touch-active shadow-xs"
            aria-label={`${t("azkar.tasbeehBtn")} ${localizedTitle}`}
          >
            <Plus size={14} strokeWidth={2.5} />
            <span className="font-bold">{t("azkar.tasbeehBtn")}</span>
          </button>
        </div>
      </div>

      {/* Copied toast */}
      {copied && (
        <span
          className="absolute end-3.5 top-12 inline-flex animate-fade-in items-center gap-1 rounded-full bg-pine-800 px-2.5 py-1 text-[9.5px] font-bold text-white shadow-lg"
          role="status"
        >
          <Check size={11} />
          {t("common.copied")}
        </span>
      )}
    </article>
  );
}
