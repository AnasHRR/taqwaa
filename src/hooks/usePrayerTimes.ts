import { useState, useEffect, useCallback } from "react";
import { ApiResponse, PrayerTimes, HijriDate, GregorianDate } from "../types";
import { City } from "../types";

interface UsePrayerTimesReturn {
  prayerTimes: PrayerTimes | null;
  hijriDate: HijriDate | null;
  gregorianDate: GregorianDate | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePrayerTimes(city: City): UsePrayerTimesReturn {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimes | null>(null);
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  const [gregorianDate, setGregorianDate] = useState<GregorianDate | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrayerTimes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const today = new Date();
      const dd = String(today.getDate()).padStart(2, "0");
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const yyyy = today.getFullYear();
      const dateStr = `${dd}-${mm}-${yyyy}`;

      const url = `https://api.aladhan.com/v1/timings/${dateStr}?latitude=${city.lat}&longitude=${city.lng}&method=21&school=0`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch prayer times");
      }

      const data: ApiResponse = await response.json();

      if (data.code === 200) {
        setPrayerTimes(data.data.timings);
        setHijriDate(data.data.date.hijri);
        setGregorianDate(data.data.date.gregorian);
      } else {
        throw new Error("API returned error");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ في جلب مواقيت الصلاة"
      );
    } finally {
      setLoading(false);
    }
  }, [city.lat, city.lng]);

  useEffect(() => {
    fetchPrayerTimes();
  }, [fetchPrayerTimes]);

  return {
    prayerTimes,
    hijriDate,
    gregorianDate,
    loading,
    error,
    refetch: fetchPrayerTimes,
  };
}
