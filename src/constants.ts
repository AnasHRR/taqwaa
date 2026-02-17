import { City } from "./types";

export const MOROCCAN_CITIES: City[] = [
  { name: "Casablanca", nameAr: "الدار البيضاء", lat: 33.5731, lng: -7.5898 },
  { name: "Rabat", nameAr: "الرباط", lat: 34.0209, lng: -6.8416 },
  { name: "Marrakech", nameAr: "مراكش", lat: 31.6295, lng: -7.9811 },
  { name: "Fes", nameAr: "فاس", lat: 34.0181, lng: -5.0078 },
  { name: "Tangier", nameAr: "طنجة", lat: 35.7595, lng: -5.834 },
  { name: "Agadir", nameAr: "أكادير", lat: 30.4278, lng: -9.5981 },
  { name: "Meknes", nameAr: "مكناس", lat: 33.8935, lng: -5.5547 },
  { name: "Oujda", nameAr: "وجدة", lat: 34.6814, lng: -1.9086 },
  { name: "Kenitra", nameAr: "القنيطرة", lat: 34.261, lng: -6.5802 },
  { name: "Tetouan", nameAr: "تطوان", lat: 35.5785, lng: -5.3684 },
  { name: "Safi", nameAr: "آسفي", lat: 32.2994, lng: -9.2372 },
  { name: "El Jadida", nameAr: "الجديدة", lat: 33.2316, lng: -8.5007 },
  { name: "Nador", nameAr: "الناظور", lat: 35.1681, lng: -2.9335 },
  { name: "Beni Mellal", nameAr: "بني ملال", lat: 32.3373, lng: -6.3498 },
  { name: "Taza", nameAr: "تازة", lat: 34.2133, lng: -4.0103 },
  { name: "Settat", nameAr: "سطات", lat: 33.0011, lng: -7.6166 },
  { name: "Laayoune", nameAr: "العيون", lat: 27.1253, lng: -13.1625 },
  { name: "Dakhla", nameAr: "الداخلة", lat: 23.6848, lng: -15.957 },
  { name: "Essaouira", nameAr: "الصويرة", lat: 31.5085, lng: -9.7595 },
  { name: "Errachidia", nameAr: "الراشيدية", lat: 31.9314, lng: -4.4288 },
  { name: "Ouarzazate", nameAr: "ورزازات", lat: 30.9189, lng: -6.8936 },
  { name: "Chefchaouen", nameAr: "شفشاون", lat: 35.1688, lng: -5.2636 },
];

export const PRAYER_INFO = [
  { key: "Fajr", nameAr: "الفجر", icon: "🌙", cssClass: "prayer-fajr", accentColor: "text-indigo-300" },
  { key: "Sunrise", nameAr: "الشروق", icon: "🌅", cssClass: "prayer-sunrise", accentColor: "text-amber-300" },
  { key: "Dhuhr", nameAr: "الظهر", icon: "☀️", cssClass: "prayer-dhuhr", accentColor: "text-yellow-300" },
  { key: "Asr", nameAr: "العصر", icon: "🌤️", cssClass: "prayer-asr", accentColor: "text-orange-300" },
  { key: "Maghrib", nameAr: "المغرب", icon: "🌇", cssClass: "prayer-maghrib", accentColor: "text-rose-300" },
  { key: "Isha", nameAr: "العشاء", icon: "🌃", cssClass: "prayer-isha", accentColor: "text-blue-300" },
];
