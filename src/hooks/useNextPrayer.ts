import { useMemo } from "react";
import { PrayerTimes } from "../types";
import { PRAYER_KEYS, PRAYER_INFO } from "../constants";

interface NextPrayer {
  key: string;
  nameAr: string;
  time: string;
  remainingMs: number;
  remainingFormatted: string;
  progress: number;
}

export function useNextPrayer(
  prayerTimes: PrayerTimes | null,
  now: Date
): NextPrayer | null {
  return useMemo(() => {
    if (!prayerTimes) return null;

    const prayerKeys = PRAYER_KEYS.filter((k) => k !== "Sunrise");
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (let i = 0; i < prayerKeys.length; i++) {
      const key = prayerKeys[i];
      const timeStr = prayerTimes[key];
      if (!timeStr) continue;

      const [h, m] = timeStr.split(":").map(Number);
      const prayerMinutes = h * 60 + m;

      if (prayerMinutes > currentMinutes) {
        const diffMs =
          (prayerMinutes - currentMinutes) * 60 * 1000 -
          now.getSeconds() * 1000;
        const diffTotalSec = Math.floor(diffMs / 1000);
        const hours = Math.floor(diffTotalSec / 3600);
        const mins = Math.floor((diffTotalSec % 3600) / 60);
        const secs = diffTotalSec % 60;

        const prevPrayerMinutes =
          i > 0
            ? (() => {
                const prev = prayerTimes[prayerKeys[i - 1]];
                const [ph, pm] = prev.split(":").map(Number);
                return ph * 60 + pm;
              })()
            : 0;

        const totalInterval = prayerMinutes - prevPrayerMinutes;
        const elapsed = currentMinutes - prevPrayerMinutes;
        const progress =
          totalInterval > 0
            ? Math.min(100, Math.max(0, (elapsed / totalInterval) * 100))
            : 0;

        return {
          key,
          nameAr: PRAYER_INFO[key].nameAr,
          time: timeStr,
          remainingMs: diffMs,
          remainingFormatted: `${String(hours).padStart(2, "0")}:${String(
            mins
          ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`,
          progress,
        };
      }
    }

    // After Isha
    const fajrStr = prayerTimes["Fajr"];
    if (fajrStr) {
      const [fh, fm] = fajrStr.split(":").map(Number);
      const fajrMinutes = fh * 60 + fm;
      const minutesTillMidnight = 24 * 60 - currentMinutes;
      const totalRem = minutesTillMidnight + fajrMinutes;

      const diffMs = totalRem * 60 * 1000 - now.getSeconds() * 1000;
      const diffTotalSec = Math.floor(diffMs / 1000);
      const hours = Math.floor(diffTotalSec / 3600);
      const mins = Math.floor((diffTotalSec % 3600) / 60);
      const secs = diffTotalSec % 60;

      const ishaStr = prayerTimes["Isha"];
      const [ih, im] = ishaStr.split(":").map(Number);
      const ishaMinutes = ih * 60 + im;
      const totalInterval = (24 * 60 - ishaMinutes) + fajrMinutes;
      const elapsed = currentMinutes - ishaMinutes;
      const progress =
        totalInterval > 0
          ? Math.min(100, Math.max(0, ((elapsed < 0 ? elapsed + 24*60 : elapsed) / totalInterval) * 100))
          : 0;

      return {
        key: "Fajr",
        nameAr: "الفجر",
        time: fajrStr,
        remainingMs: diffMs,
        remainingFormatted: `${String(hours).padStart(2, "0")}:${String(
          mins
        ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`,
        progress,
      };
    }

    return null;
  }, [prayerTimes, now]);
}
