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

export const PRAYER_KEYS = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;

export const PRAYER_INFO: Record<string, { nameAr: string; cssClass: string }> = {
  Fajr: { nameAr: "الفجر", cssClass: "prayer-fajr" },
  Sunrise: { nameAr: "الشروق", cssClass: "prayer-sunrise" },
  Dhuhr: { nameAr: "الظهر", cssClass: "prayer-dhuhr" },
  Asr: { nameAr: "العصر", cssClass: "prayer-asr" },
  Maghrib: { nameAr: "المغرب", cssClass: "prayer-maghrib" },
  Isha: { nameAr: "العشاء", cssClass: "prayer-isha" },
};

/** A reflection verse for each day of the week (index = Date.getDay()). */
export const DAILY_VERSES: { text: string; ref: string }[] = [
  { text: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", ref: "البقرة ٢٨٦" },
  { text: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ", ref: "آل عمران ١٣٩" },
  { text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", ref: "الشرح ٦" },
  { text: "فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ", ref: "البقرة ١٥٢" },
  { text: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", ref: "الرعد ٢٨" },
  { text: "وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", ref: "الطلاق ٣" },
  { text: "قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ", ref: "الزمر ٥٣" },
];
