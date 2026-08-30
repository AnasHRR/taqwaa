import { City } from "./types";

export const MOROCCAN_CITIES: City[] = [
  { name: "Casablanca", nameAr: "الدار البيضاء", lat: 33.5731, lng: -7.5898 },
  { name: "Rabat", nameAr: "الرباط", lat: 34.0209, lng: -6.8416 },
  { name: "Marrakech", nameAr: "مراكش", lat: 31.6295, lng: -7.9811 },
  { name: "Fès", nameAr: "فاس", lat: 34.0181, lng: -5.0078 },
  { name: "Tanger", nameAr: "طنجة", lat: 35.7595, lng: -5.834 },
  { name: "Agadir", nameAr: "أكادير", lat: 30.4278, lng: -9.5981 },
  { name: "Meknès", nameAr: "مكناس", lat: 33.8935, lng: -5.5547 },
  { name: "Oujda", nameAr: "وجدة", lat: 34.6814, lng: -1.9086 },
  { name: "Kénitra", nameAr: "القنيطرة", lat: 34.261, lng: -6.5802 },
  { name: "Tétouan", nameAr: "تطوان", lat: 35.5785, lng: -5.3684 },
  { name: "Safi", nameAr: "آسفي", lat: 32.2994, lng: -9.2372 },
  { name: "El Jadida", nameAr: "الجديدة", lat: 33.2316, lng: -8.5007 },
  { name: "Nador", nameAr: "الناظور", lat: 35.1681, lng: -2.9335 },
  { name: "Béni Mellal", nameAr: "بني ملال", lat: 32.3373, lng: -6.3498 },
  { name: "Taza", nameAr: "تازة", lat: 34.2133, lng: -4.0103 },
  { name: "Settat", nameAr: "سطات", lat: 33.0011, lng: -7.6166 },
  { name: "Laâyoune", nameAr: "العيون", lat: 27.1253, lng: -13.1625 },
  { name: "Dakhla", nameAr: "الداخلة", lat: 23.6848, lng: -15.957 },
  { name: "Essaouira", nameAr: "الصويرة", lat: 31.5085, lng: -9.7595 },
  { name: "Errachidia", nameAr: "الراشيدية", lat: 31.9314, lng: -4.4288 },
  { name: "Ouarzazate", nameAr: "ورزازات", lat: 30.9189, lng: -6.8936 },
  { name: "Chefchaouen", nameAr: "شفشاون", lat: 35.1688, lng: -5.2636 },
];

export const PRAYER_KEYS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

export const PRAYER_INFO: Record<
  string,
  { nameAr: string; nameFr: string; nameEn: string; cssClass: string }
> = {
  Fajr: { nameAr: "الفجر", nameFr: "Fajr", nameEn: "Fajr", cssClass: "prayer-fajr" },
  Sunrise: { nameAr: "الشروق", nameFr: "Chourouk", nameEn: "Sunrise", cssClass: "prayer-sunrise" },
  Dhuhr: { nameAr: "الظهر", nameFr: "Dhuhr", nameEn: "Dhuhr", cssClass: "prayer-dhuhr" },
  Asr: { nameAr: "العصر", nameFr: "Asr", nameEn: "Asr", cssClass: "prayer-asr" },
  Maghrib: { nameAr: "المغرب", nameFr: "Maghrib", nameEn: "Maghrib", cssClass: "prayer-maghrib" },
  Isha: { nameAr: "العشاء", nameFr: "Isha", nameEn: "Isha", cssClass: "prayer-isha" },
};

/** Reflection verses for each day of the week (index = Date.getDay()). */
export const DAILY_VERSES: {
  text: string;
  ref: string;
  translationFr: string;
  translationEn: string;
  refFr: string;
  refEn: string;
}[] = [
  {
    text: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا",
    ref: "البقرة ٢٨٦",
    translationFr: "Allah n'impose à aucune âme une charge supérieure à sa capacité.",
    translationEn: "Allah does not burden a soul beyond that it can bear.",
    refFr: "Al-Baqarah 286",
    refEn: "Al-Baqarah 286",
  },
  {
    text: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ",
    ref: "آل عمران ١٣٩",
    translationFr: "Ne faiblissez pas, ne vous affligez pas alors que vous êtes les supérieurs si vous êtes croyants.",
    translationEn: "Do not falter or grieve, for you will have the upper hand if you are true believers.",
    refFr: "Al-Imran 139",
    refEn: "Al-Imran 139",
  },
  {
    text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    ref: "الشرح ٦",
    translationFr: "Certes, avec la difficulté vient la facilité.",
    translationEn: "Indeed, with hardship comes ease.",
    refFr: "Ash-Sharh 6",
    refEn: "Ash-Sharh 6",
  },
  {
    text: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ",
    ref: "البقرة ١٥٢",
    translationFr: "Souvenez-vous de Moi donc, Je Me souviendrai de vous. Remerciez-Moi et ne soyez pas ingrats.",
    translationEn: "Remember Me and I will remember you. Be grateful to Me and do not be ungrateful.",
    refFr: "Al-Baqarah 152",
    refEn: "Al-Baqarah 152",
  },
  {
    text: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
    ref: "الرعد ٢٨",
    translationFr: "N'est-ce point par l'évocation d'Allah que les cœurs s'apaisent ?",
    translationEn: "Unquestionably, by the remembrance of Allah hearts are assured.",
    refFr: "Ar-Ra'd 28",
    refEn: "Ar-Ra'd 28",
  },
  {
    text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ",
    ref: "الطلاق ٣",
    translationFr: "Et quiconque place sa confiance en Allah, Il lui suffit.",
    translationEn: "And whoever relies upon Allah — then He is sufficient for him.",
    refFr: "At-Talaq 3",
    refEn: "At-Talaq 3",
  },
  {
    text: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ",
    ref: "الزمر ٥٣",
    translationFr: "Dis : 'Ô Mes serviteurs qui avez commis des excès à votre propre détriment, ne désespérez pas de la miséricorde d'Allah.'",
    translationEn: "Say: 'O My servants who have transgressed against themselves, do not despair of the mercy of Allah.'",
    refFr: "Az-Zumar 53",
    refEn: "Az-Zumar 53",
  },
];
