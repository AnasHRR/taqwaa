import { useState, useEffect, useCallback } from "react";
import { PrayerTimes, HijriDate, GregorianDate } from "../types";
import { City } from "../types";
import { calculatePrayerTimes } from "../data/prayer";

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

  const fetchPrayerTimes = useCallback(() => {
    setLoading(true);
    setError(null);
    try {
      const now = new Date();
      const result = calculatePrayerTimes(city, now);
      setPrayerTimes(result.prayerTimes);
      setHijriDate(result.hijriDate);
      setGregorianDate(result.gregorianDate);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "حدث خطأ في حساب مواقيت الصلاة"
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