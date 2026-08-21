export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
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

export interface ApiResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimes;
    date: {
      hijri: HijriDate;
      gregorian: GregorianDate;
    };
  };
}

export interface City {
  name: string;
  nameAr: string;
  lat: number;
  lng: number;
}
