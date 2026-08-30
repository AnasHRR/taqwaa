import surahsData from './surahs.json' with { type: 'json' };
import ayahsData from './ayahs.json' with { type: 'json' };

const SURAHS = surahsData;

const AYAHS = ayahsData;

const FRENCH_SURAH_NAMES = {
  1: "Al-Fatiha (L'Ouverture)",
  2: "Al-Baqara (La Vache)",
  3: "Al-Imran (La Famille d'Imran)",
  4: "An-Nisa (Les Femmes)",
  5: "Al-Ma'ida (La Table)",
  6: "Al-An'am (Les Bestiaux)",
  7: "Al-A'raf (Les Remparts)",
  8: "Al-Anfal (Le Butin)",
  9: "At-Tawba (Le Repentir)",
  10: "Yunus (Jonas)",
  11: "Hud (Hud)",
  12: "Yusuf (Joseph)",
  13: "Ar-Ra'd (Le Tonnerre)",
  14: "Ibrahim (Abraham)",
  15: "Al-Hijr (Le Roc)",
  16: "An-Nahl (L'Abeille)",
  17: "Al-Isra (Le Voyage Nocturne)",
  18: "Al-Kahf (La Caverne)",
  19: "Maryam (Marie)",
  20: "Ta-Ha (Ta-Ha)",
  21: "Al-Anbiya (Les Prophètes)",
  22: "Al-Hajj (Le Pèlerinage)",
  23: "Al-Mu'minun (Les Croyants)",
  24: "An-Nur (La Lumière)",
  25: "Al-Furqan (Le Discernement)",
  26: "Ash-Shu'ara (Les Poètes)",
  27: "An-Naml (La Fourmi)",
  28: "Al-Qasas (Le Récit)",
  29: "Al-Ankabut (L'Araignée)",
  30: "Ar-Rum (Les Romains)",
  31: "Luqman (Luqman)",
  32: "As-Sajda (La Prosternation)",
  33: "Al-Ahzab (Les Coalisés)",
  34: "Saba (Saba)",
  35: "Fatir (Le Créateur)",
  36: "Ya-Sin (Ya-Sin)",
  37: "As-Saffat (Les Rangés)",
  38: "Sad (Sad)",
  39: "Az-Zumar (Les Groupes)",
  40: "Ghafir (Le Pardonneur)",
  41: "Fussilat (Les Détaillées)",
  42: "Ash-Shura (La Consultation)",
  43: "Az-Zukhruf (Les Parures)",
  44: "Ad-Dukhan (La Fumée)",
  45: "Al-Jathiya (La Génuflexion)",
  46: "Al-Ahqaf (Les Dunes)",
  47: "Muhammad (Muhammad)",
  48: "Al-Fath (La Victoire)",
  49: "Al-Hujurat (Les Appartements)",
  50: "Qaf (Qaf)",
  51: "Adh-Dhariyat (Les Vents Épars)",
  52: "At-Tur (Le Mont)",
  53: "An-Najm (L'Astre)",
  54: "Al-Qamar (La Lune)",
  55: "Ar-Rahman (Le Tout Miséricordieux)",
  56: "Al-Waqi'a (L'Événement)",
  57: "Al-Hadid (Le Fer)",
  58: "Al-Mujadila (La Disputante)",
  59: "Al-Hashr (L'Exode)",
  60: "Al-Mumtahana (L'Éprouvée)",
  61: "As-Saff (Les Rangs)",
  62: "Al-Jumu'a (Le Vendredi)",
  63: "Al-Munafiqun (Les Hypocrites)",
  64: "At-Taghabun (La Déception Mutuelle)",
  65: "At-Talaq (Le Divorce)",
  66: "At-Tahrim (La Prohibition)",
  67: "Al-Mulk (La Royauté)",
  68: "Al-Qalam (La Plume)",
  69: "Al-Haqqa (La Vérité)",
  70: "Al-Ma'arij (Les Degrés)",
  71: "Nuh (Noé)",
  72: "Al-Jinn (Les Djinns)",
  73: "Al-Muzzammil (L'Enveloppé)",
  74: "Al-Muddaththir (Le Couvert)",
  75: "Al-Qiyama (La Résurrection)",
  76: "Al-Insan (L'Homme)",
  77: "Al-Mursalat (Les Envoyés)",
  78: "An-Naba (L'Annonce)",
  79: "An-Nazi'at (Ceux Qui Arrachent)",
  80: "Abasa (Il A Froncé Les Sourcils)",
  81: "At-Takwir (L'Obscurcissement)",
  82: "Al-Infitar (La Fente)",
  83: "Al-Mutaffifin (Les Fraudeurs)",
  84: "Al-Inshiqaq (La Déchirure)",
  85: "Al-Buruj (Les Constellations)",
  86: "At-Tariq (L'Astre Nocturne)",
  87: "Al-A'la (Le Très Haut)",
  88: "Al-Ghashiya (L'Enveloppante)",
  89: "Al-Fajr (L'Aube)",
  90: "Al-Balad (La Cité)",
  91: "Ash-Shams (Le Soleil)",
  92: "Al-Lail (La Nuit)",
  93: "Ad-Duha (Le Matin)",
  94: "Ash-Sharh (L'Explication)",
  95: "At-Tin (Le Figuier)",
  96: "Al-Alaq (L'Adhérence)",
  97: "Al-Qadr (La Destinée)",
  98: "Al-Bayyina (La Preuve)",
  99: "Al-Zalzala (Le Tremblement)",
  100: "Al-Adiyat (Les Coursiers)",
  101: "Al-Qari'a (La Calamité)",
  102: "At-Takathur (La Course Aux Biens)",
  103: "Al-Asr (Le Temps)",
  104: "Al-Humaza (Le Calomniateur)",
  105: "Al-Fil (L'Éléphant)",
  106: "Quraysh (Quraysh)",
  107: "Al-Ma'un (L'Assistance)",
  108: "Al-Kawthar (L'Abondance)",
  109: "Al-Kafirun (Les Mécréants)",
  110: "An-Nasr (Le Secours)",
  111: "Al-Masad (La Corde)",
  112: "Al-Ikhlas (La Pureté)",
  113: "Al-Falaq (L'Aube Naissante)",
  114: "An-Nas (Les Hommes)",
};

function enrichSurah(surah) {
  return {
    ...surah,
    nameFr: FRENCH_SURAH_NAMES[surah.number] || surah.englishNameTranslation,
  };
}

export function getSurahs() {
  return SURAHS.map(enrichSurah);
}

export function getSurah(id) {
  const surah = SURAHS.find((s) => s.number === id);
  if (!surah) return null;
  return enrichSurah(surah);
}

export function getAyahs(surahId) {
  return AYAHS[String(surahId)] || [];
}

export function searchSurahs(query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return getSurahs();

  return SURAHS.filter((surah) => {
    const enriched = enrichSurah(surah);
    return (
      surah.name.includes(normalizedQuery) ||
      enriched.nameFr.toLowerCase().includes(normalizedQuery) ||
      surah.englishName.toLowerCase().includes(normalizedQuery) ||
      surah.englishNameTranslation.toLowerCase().includes(normalizedQuery) ||
      surah.number.toString() === normalizedQuery
    );
  }).map(enrichSurah);
}

export function getTotalAyahs() {
  return Object.values(AYAHS).flat().length;
}

export function getSurahAyahCount(surahId) {
  const ayahs = AYAHS[String(surahId)];
  return ayahs ? ayahs.length : 0;
}