import { Smartphone } from "lucide-react";
import { useTranslation } from "../i18n";
import { APK_DOWNLOAD_URL } from "../constants/downloads";
import { cn } from "../utils/cn";

interface DownloadButtonProps {
  variant?: "header" | "hero" | "card" | "sheet";
  className?: string;
  isAndroid?: boolean;
}

export function DownloadButton({
  variant = "card",
  className,
  isAndroid = false,
}: DownloadButtonProps) {
  const { t } = useTranslation();

  const baseStyles = cn(
    "inline-flex items-center justify-center gap-2.5",
    "rounded-2xl font-bold transition-all duration-300",
    "bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600",
    "text-white shadow-[0_4px_16px_-4px_rgba(201,162,39,0.5)]",
    "hover:from-gold-500 hover:via-gold-600 hover:to-gold-700",
    "hover:shadow-[0_8px_24px_-6px_rgba(201,162,39,0.6)]",
    "hover:-translate-y-0.5",
    "active:scale-[0.98] active:shadow-[0_2px_8px_-4px_rgba(201,162,39,0.5)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2",
    className
  );

  const variantStyles = {
    header: "h-11 px-5 text-sm sm:px-6 hidden md:inline-flex",
    hero: "h-12 px-6 text-base",
    card: "w-full h-12 sm:w-auto px-6 text-base",
    sheet: "w-full h-11 px-4 text-sm",
  };

  const iconSizes = {
    header: 16,
    hero: 18,
    card: 18,
    sheet: 16,
  };

  const buttonStyles = cn(baseStyles, variantStyles[variant]);

  const downloadText = isAndroid
    ? t("download.heroText") || t("download.buttonText")
    : t("download.buttonText");

  return (
    <a
      href={APK_DOWNLOAD_URL}
      download
      className={buttonStyles}
      aria-label={downloadText}
      rel="noopener noreferrer"
    >
      <Smartphone
        size={iconSizes[variant]}
        strokeWidth={2}
        aria-hidden="true"
        className="shrink-0"
      />
      <span className="hidden sm:inline">{downloadText}</span>
      <span className="inline sm:hidden">{t("download.buttonText")}</span>
    </a>
  );
}