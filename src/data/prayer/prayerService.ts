import {
  Coordinates,
  PrayerTimes as AdhanPrayerTimes,
  CalculationMethod,
  Madhab,
} from 'adhan';

import { MOROCCAN_CITIES } from '../../constants';

interface City {
  name: string;
  nameAr: string;
  lat: number;
  lng: number;
}

export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export interface HijriDate {
  date: string;
  day: string;
  weekday: { en: string; ar: string };
  month: { number: number; en: string; ar: string };
  year: string;
}

export interface GregorianDate {
  date: string;
  day: string;
  weekday: { en: string };
  month: { number: number; en: string };
  year: string;
}

const ARABIC_MONTHS = [
  'محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر',
  'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
  'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
];

const ARABIC_WEEKDAYS = [
  'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
];

const ENGLISH_MONTHS = [
  'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
  'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', "Sha'ban",
  'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
];

const ENGLISH_WEEKDAYS = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const MOROCCO_CALCULATION_METHOD = (() => {
  const params = CalculationMethod.MuslimWorldLeague();
  params.madhab = Madhab.Shafi;
  params.adjustments.fajr = 2;
  params.adjustments.sunrise = 0;
  params.adjustments.dhuhr = 0;
  params.adjustments.asr = 0;
  params.adjustments.maghrib = 0;
  params.adjustments.isha = 0;
  return params;
})();

function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

function julianDate(date: Date): number {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;

  let jd = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  const timeFraction = (hour + minute / 60 + second / 3600) / 24;
  return jd + timeFraction - 0.5;
}

function toHijri(jd: number): { day: number; month: number; year: number } {
  const jdInt = Math.floor(jd + 0.5);
  const l = jdInt - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j = (Math.floor((10985 - l2) / 5316)) *
    (Math.floor((50 * l2) / 17719)) +
    (Math.floor(l2 / 5670)) *
    (Math.floor((43 * l2) / 15238));
  const l3 = l2 - (Math.floor((30 - j) / 15)) *
    (Math.floor((17719 * j) / 50)) -
    (Math.floor(j / 16)) *
    (Math.floor((15238 * j) / 43)) + 29;
  const month = Math.floor((24 * l3) / 709);
  const day = l3 - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;

  return { day, month, year };
}

function toHijriDate(gregorianDate: Date): HijriDate {
  const jd = julianDate(gregorianDate);
  const hijri = toHijri(jd);

  const day = hijri.day;
  const monthNumber = hijri.month;
  const year = hijri.year;

  const weekdayIndex = gregorianDate.getDay();

  return {
    date: `${day}/${monthNumber}/${year}`,
    day: day.toString(),
    weekday: {
      en: ENGLISH_WEEKDAYS[weekdayIndex],
      ar: ARABIC_WEEKDAYS[weekdayIndex],
    },
    month: {
      number: monthNumber,
      en: ENGLISH_MONTHS[monthNumber - 1],
      ar: ARABIC_MONTHS[monthNumber - 1],
    },
    year: year.toString(),
  };
}

function toGregorianDate(date: Date): GregorianDate {
  const day = date.getDate();
  const monthNumber = date.getMonth() + 1;
  const year = date.getFullYear();
  const weekdayIndex = date.getDay();

  return {
    date: `${day}/${monthNumber}/${year}`,
    day: day.toString(),
    weekday: {
      en: ENGLISH_WEEKDAYS[weekdayIndex],
    },
    month: {
      number: monthNumber,
      en: ENGLISH_MONTHS[monthNumber - 1],
    },
    year: year.toString(),
  };
}

export function getCities(): City[] {
  return MOROCCAN_CITIES;
}

export function getCityByName(name: string): City | undefined {
  return MOROCCAN_CITIES.find((c) =>
    c.name.toLowerCase() === name.toLowerCase() ||
    c.nameAr === name
  );
}

export function calculatePrayerTimes(
  city: City,
  date: Date = new Date()
): { prayerTimes: PrayerTimes; hijriDate: HijriDate; gregorianDate: GregorianDate } {
  const coordinates = new Coordinates(city.lat, city.lng);
  const prayerTimes = new AdhanPrayerTimes(coordinates, date, MOROCCO_CALCULATION_METHOD);

  const times: PrayerTimes = {
    Fajr: formatTime(prayerTimes.fajr),
    Sunrise: formatTime(prayerTimes.sunrise),
    Dhuhr: formatTime(prayerTimes.dhuhr),
    Asr: formatTime(prayerTimes.asr),
    Maghrib: formatTime(prayerTimes.maghrib),
    Isha: formatTime(prayerTimes.isha),
  };

  return {
    prayerTimes: times,
    hijriDate: toHijriDate(date),
    gregorianDate: toGregorianDate(date),
  };
}

export function getNextPrayer(
  prayerTimes: PrayerTimes,
  now: Date = new Date()
): { key: string; nameAr: string; time: string; remainingMs: number; remainingFormatted: string; progress: number } | null {
  const prayerKeys = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const currentSeconds = now.getSeconds();

  const PRAYER_NAMES_AR = {
    Fajr: 'الفجر',
    Dhuhr: 'الظهر',
    Asr: 'العصر',
    Maghrib: 'المغرب',
    Isha: 'العشاء',
  };

  for (let i = 0; i < prayerKeys.length; i++) {
    const key = prayerKeys[i];
    const timeStr = prayerTimes[key];
    if (!timeStr) continue;

    const [h, m] = timeStr.split(':').map(Number);
    const prayerMinutes = h * 60 + m;

    if (prayerMinutes > currentMinutes) {
      const diffMs = (prayerMinutes - currentMinutes) * 60 * 1000 - currentSeconds * 1000;
      const diffTotalSec = Math.floor(diffMs / 1000);
      const hours = Math.floor(diffTotalSec / 3600);
      const mins = Math.floor((diffTotalSec % 3600) / 60);
      const secs = diffTotalSec % 60;

      let prevPrayerMinutes = 0;
      if (i > 0) {
        const prevTimeStr = prayerTimes[prayerKeys[i - 1]];
        if (prevTimeStr) {
          const [ph, pm] = prevTimeStr.split(':').map(Number);
          prevPrayerMinutes = ph * 60 + pm;
        }
      }

      const totalInterval = prayerMinutes - prevPrayerMinutes;
      const elapsed = currentMinutes - prevPrayerMinutes;
      const progress = totalInterval > 0
        ? Math.min(100, Math.max(0, (elapsed / totalInterval) * 100))
        : 0;

      return {
        key,
        nameAr: PRAYER_NAMES_AR[key as keyof typeof PRAYER_NAMES_AR],
        time: timeStr,
        remainingMs: diffMs,
        remainingFormatted: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`,
        progress,
      };
    }
  }

  const fajrStr = prayerTimes.Fajr;
  if (fajrStr) {
    const [fh, fm] = fajrStr.split(':').map(Number);
    const fajrMinutes = fh * 60 + fm;
    const minutesTillMidnight = 24 * 60 - currentMinutes;
    const totalRem = minutesTillMidnight + fajrMinutes;

    const diffMs = totalRem * 60 * 1000 - currentSeconds * 1000;
    const diffTotalSec = Math.floor(diffMs / 1000);
    const hours = Math.floor(diffTotalSec / 3600);
    const mins = Math.floor((diffTotalSec % 3600) / 60);
    const secs = diffTotalSec % 60;

    const ishaStr = prayerTimes.Isha;
    if (ishaStr) {
      const [ih, im] = ishaStr.split(':').map(Number);
      const ishaMinutes = ih * 60 + im;
      const totalInterval = (24 * 60 - ishaMinutes) + fajrMinutes;
      const elapsed = currentMinutes - ishaMinutes;
      const adjustedElapsed = elapsed < 0 ? elapsed + 24 * 60 : elapsed;
      const progress = totalInterval > 0
        ? Math.min(100, Math.max(0, (adjustedElapsed / totalInterval) * 100))
        : 0;

      return {
        key: 'Fajr',
        nameAr: 'الفجر',
        time: fajrStr,
        remainingMs: diffMs,
        remainingFormatted: `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`,
        progress,
      };
    }
  }

  return null;
}

export function isCurrentPrayer(prayerTimes: PrayerTimes, key: string, nextPrayer: { key: string } | null): boolean {
  if (!nextPrayer) return false;
  const keys = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const nextIdx = keys.indexOf(nextPrayer.key);
  const currentIdx = nextIdx - 1;
  if (currentIdx >= 0) return keys[currentIdx] === key;
  return key === 'Isha';
}