import { useState } from "react";
import {
  ArrowRight, ClipboardList, Clock, CloudSun, Compass, Droplets,
  Ear, Footprints, Gem, Hand, Moon, SmilePlus, Stars, Sun, Sunset,
} from "lucide-react";
import type { ReactNode } from "react";
import { PrayerTimesPanel } from "../components/PrayerTimesPanel";
import { cn } from "../utils/cn";

interface PrayerGuide {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: ReactNode;
  rakaat: number;
  sunnahBefore: number;
  sunnahAfter: number;
  description: string;
  steps: string[];
  virtues: string;
  time: string;
}

const PRAYER_GUIDES: PrayerGuide[] = [
  {
    id: "fajr", nameAr: "صلاة الفجر", nameEn: "Fajr", icon: <Moon size={22} strokeWidth={1.8} />,
    rakaat: 2, sunnahBefore: 2, sunnahAfter: 0,
    description: "أولى الصلوات الخمس، تؤدى قبل شروق الشمس",
    steps: ["النية والتكبير", "دعاء الاستفتاح", "الفاتحة + سورة", "الركوع", "الرفع من الركوع", "السجود الأول", "الجلوس بين السجدتين", "السجود الثاني", "الركعة الثانية", "التشهد والسلام"],
    virtues: "من صلى الفجر في جماعة فكأنما قام الليل كله",
    time: "من طلوع الفجر إلى شروق الشمس",
  },
  {
    id: "dhuhr", nameAr: "صلاة الظهر", nameEn: "Dhuhr", icon: <Sun size={22} strokeWidth={1.8} />,
    rakaat: 4, sunnahBefore: 4, sunnahAfter: 2,
    description: "الصلاة الثانية، بعد زوال الشمس",
    steps: ["النية والتكبير", "الفاتحة + سورة (جهرًا)", "الركوع والسجود", "التشهد الأول", "الفاتحة فقط في الثالثة والرابعة", "التشهد الأخير", "الصلاة الإبراهيمية", "التسليم"],
    virtues: "من حافظ على أربع قبل الظهر وأربع بعدها حرمه الله على النار",
    time: "من زوال الشمس إلى صلاة العصر",
  },
  {
    id: "asr", nameAr: "صلاة العصر", nameEn: "Asr", icon: <CloudSun size={22} strokeWidth={1.8} />,
    rakaat: 4, sunnahBefore: 0, sunnahAfter: 0,
    description: "الصلاة الوسطى التي أمر الله بالمحافظة عليها",
    steps: ["النية والتكبير", "الفاتحة + سورة", "الركوع والسجود", "التشهد الأول", "الركعتان الأخيرتان", "التشهد والسلام"],
    virtues: "من ترك صلاة العصر فقد حبط عمله",
    time: "من العصر إلى غروب الشمس",
  },
  {
    id: "maghrib", nameAr: "صلاة المغرب", nameEn: "Maghrib", icon: <Sunset size={22} strokeWidth={1.8} />,
    rakaat: 3, sunnahBefore: 0, sunnahAfter: 2,
    description: "تؤدى بعد غروب الشمس، ثلاث ركعات",
    steps: ["النية والتكبير", "الفاتحة + سورة جهرًا", "الركوع والسجود", "التشهد الأول", "الركعة الثالثة سرًا", "التشهد والسلام"],
    virtues: "بادروا بصلاة المغرب قبل طلوع النجوم",
    time: "من غروب الشمس إلى مغيب الشفق",
  },
  {
    id: "isha", nameAr: "صلاة العشاء", nameEn: "Isha", icon: <Stars size={22} strokeWidth={1.8} />,
    rakaat: 4, sunnahBefore: 0, sunnahAfter: 2,
    description: "آخر الصلوات الخمس المفروضة",
    steps: ["النية والتكبير", "الفاتحة + سورة جهرًا", "الركوع والسجود", "التشهد الأول", "الركعتان سرًا", "التشهد والسلام"],
    virtues: "من صلى العشاء في جماعة فكأنما قام نصف الليل",
    time: "من مغيب الشفق إلى نصف الليل",
  },
];

const WUDU_STEPS = [
  { step: 1, title: "النية والبسملة", desc: "انوِ الوضوء وقل بسم الله", icon: <Hand size={18} /> },
  { step: 2, title: "غسل الكفين", desc: "اغسل كفيك ثلاث مرات", icon: <Hand size={18} /> },
  { step: 3, title: "المضمضة", desc: "تمضمض ثلاث مرات", icon: <Droplets size={18} /> },
  { step: 4, title: "الاستنشاق", desc: "استنشق واستنثر ثلاثًا", icon: <Droplets size={18} /> },
  { step: 5, title: "غسل الوجه", desc: "اغسل وجهك ثلاث مرات", icon: <SmilePlus size={18} /> },
  { step: 6, title: "غسل اليدين", desc: "إلى المرفقين ثلاثًا", icon: <Hand size={18} /> },
  { step: 7, title: "مسح الرأس", desc: "امسح رأسك مرة واحدة", icon: <Hand size={18} /> },
  { step: 8, title: "مسح الأذنين", desc: "امسح أذنيك مرة واحدة", icon: <Ear size={18} /> },
  { step: 9, title: "غسل القدمين", desc: "إلى الكعبين ثلاثًا", icon: <Footprints size={18} /> },
];

const CONDITIONS = [
  { icon: <Droplets size={20} />, title: "الطهارة", desc: "الوضوء وطهارة البدن والثوب والمكان" },
  { icon: <Compass size={20} />, title: "استقبال القبلة", desc: "التوجه نحو الكعبة المشرفة" },
  { icon: <ClipboardList size={20} />, title: "ستر العورة", desc: "لبس ما يستر العورة" },
  { icon: <Clock size={20} />, title: "دخول الوقت", desc: "التأكد من دخول وقت الصلاة" },
  { icon: <Hand size={20} />, title: "النية", desc: "استحضار نية الصلاة في القلب" },
];

const PILLARS = ["القيام", "التكبير", "قراءة الفاتحة", "الركوع", "السجود", "التشهد الأخير", "الجلوس بين السجدتين", "التسليم"];

type Tab = "prayers" | "wudu" | "conditions";

export function SalaatPage() {
  const [selectedPrayer, setSelectedPrayer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("prayers");

  const guide = PRAYER_GUIDES.find((p) => p.id === selectedPrayer);

  return (
    <div className="animate-page-enter">
      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        {/* ===== Page header ===== */}
        <header className="flex flex-col items-center gap-3.5 sm:gap-5 text-center md:flex-row md:text-start">
          <span className="octagram octagram-solid h-14 w-14 sm:h-16 sm:w-16 shrink-0 text-white shadow-[0_12px_30px_-12px_rgba(201,162,39,0.7)]" aria-hidden="true">
            <Compass size={24} strokeWidth={1.7} />
          </span>
          <div>
            <h1 className="font-quran text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gradient-gold">مواقيت الصلاة</h1>
            <p className="mt-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-ink-500">
              Prayer Times · مواقيت المغرب ودليل الصلاة
            </p>
          </div>
        </header>

        {/* ===== Live prayer times ===== */}
        <div className="mt-6">
          <PrayerTimesPanel variant="full" />
        </div>

        {/* ===== Verse note ===== */}
        <p className="mt-5 text-center font-quran text-sm sm:text-base leading-relaxed text-gold-800" dir="rtl" lang="ar">
          إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا
          <span className="mx-2 text-ink-300">—</span>
          <span className="font-arabic text-xs font-bold text-ink-500">النساء ١٠٣</span>
        </p>

        {/* ===== Guide section ===== */}
        <section className="pt-10 sm:pt-14" aria-labelledby="guide-heading">
          <h2 id="guide-heading" className="text-center text-[10.5px] font-extrabold uppercase tracking-[0.28em] text-gold-700">
            Prayer Guide
          </h2>
          <p className="mt-1 text-center font-quran text-xl sm:text-2xl font-bold text-ink-900" dir="rtl">
            دليل الصلاة والوضوء
          </p>

          {/* Tabs */}
          <div className="mt-5 flex justify-center gap-1.5 overflow-x-auto pb-1 no-scrollbar" role="tablist" aria-label="أقسام الدليل">
            {([
              { id: "prayers" as const, labelAr: "الصلوات", icon: <Compass size={13} /> },
              { id: "wudu" as const, labelAr: "الوضوء", icon: <Droplets size={13} /> },
              { id: "conditions" as const, labelAr: "الشروط", icon: <ClipboardList size={13} /> },
            ]).map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedPrayer(null); }}
                className={cn("chip !py-1.5 !px-3.5 !text-xs", activeTab === tab.id && "chip-active")}
              >
                {tab.icon}
                {tab.labelAr}
              </button>
            ))}
          </div>

          {/* ---- Prayers list ---- */}
          {activeTab === "prayers" && !selectedPrayer && (
            <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
              {PRAYER_GUIDES.map((prayer, idx) => (
                <button
                  key={prayer.id}
                  onClick={() => setSelectedPrayer(prayer.id)}
                  className="card card-hover group flex w-full cursor-pointer items-center justify-between p-3.5 sm:p-4 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 40}ms` }}
                  aria-label={`${prayer.nameEn} — ${prayer.rakaat} ركعات`}
                >
                  <div className="flex items-center gap-3">
                    <span className="octagram h-11 w-11 p-2 text-gold-700 transition-transform duration-300 group-hover:scale-105" aria-hidden="true">
                      {prayer.icon}
                    </span>
                    <div className="text-start">
                      <span className="block font-quran text-base sm:text-lg font-bold text-ink-900">{prayer.nameAr}</span>
                      <span className="block text-[10.5px] font-semibold text-ink-500">
                        {prayer.nameEn}
                        <span className="mx-1 text-ink-300">•</span>
                        <span className="font-arabic font-bold text-gold-700">{prayer.rakaat} ركعات</span>
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="shrink-0 rotate-180 text-ink-300 transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-gold-600 rtl:rotate-0 rtl:group-hover:translate-x-1" aria-hidden="true" />
                </button>
              ))}
            </div>
          )}

          {/* ---- Prayer detail ---- */}
          {activeTab === "prayers" && guide && (
            <div className="mt-5 max-w-3xl mx-auto animate-fade-in-up">
              <button
                onClick={() => setSelectedPrayer(null)}
                className="group mb-3.5 flex cursor-pointer items-center gap-2 rounded-xl bg-ink-50 px-3 py-1.5 text-xs font-bold text-gold-800 hover:bg-gold-50"
                aria-label="العودة إلى قائمة الصلوات"
              >
                <ArrowRight size={14} />
                <span className="font-arabic">العودة للصلوات</span>
              </button>

              <div className="card-beige relative overflow-hidden p-5 sm:p-7 text-center">
                <div className="gold-hairline absolute inset-x-0 top-0 h-px" aria-hidden="true" />
                <span className="octagram octagram-solid mx-auto h-14 w-14 text-white" aria-hidden="true">
                  {guide.icon}
                </span>
                <h3 className="mt-3 font-quran text-2xl sm:text-3xl font-bold text-gradient-gold">{guide.nameAr}</h3>
                <p className="mt-1 font-arabic text-xs sm:text-sm text-ink-600" dir="rtl">{guide.description}</p>
                <div className="mt-4 flex items-center justify-center gap-2.5">
                  <StatBox value={guide.rakaat} labelAr="ركعات" highlight />
                  {guide.sunnahBefore > 0 && <StatBox value={guide.sunnahBefore} labelAr="سنة قبلية" />}
                  {guide.sunnahAfter > 0 && <StatBox value={guide.sunnahAfter} labelAr="سنة بعدية" />}
                </div>
              </div>

              <div className="card mt-3.5 flex items-center gap-3 p-3.5" dir="rtl">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gold-50 text-gold-700 border border-gold-500/20" aria-hidden="true">
                  <Clock size={17} />
                </span>
                <div>
                  <span className="block font-arabic text-[9.5px] font-extrabold tracking-wide text-gold-700">وقت الصلاة</span>
                  <span className="block font-arabic text-xs sm:text-sm font-semibold text-ink-800">{guide.time}</span>
                </div>
              </div>

              <div className="card mt-3.5 p-4 sm:p-6">
                <h4 className="mb-3 text-right font-arabic text-sm sm:text-base font-bold text-ink-900" dir="rtl">كيفية الصلاة خطوة بخطوة</h4>
                <ol className="space-y-2.5" dir="rtl">
                  {guide.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="octagram mt-0.5 h-6 w-6 shrink-0" aria-hidden="true">
                        <span className="font-arabic text-[9px] font-bold text-gold-700">{idx + 1}</span>
                      </span>
                      <p className="pt-0.5 font-arabic text-xs sm:text-sm leading-relaxed text-ink-800">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="card-beige relative mt-3.5 overflow-hidden p-4 text-center">
                <Gem size={16} className="mx-auto mb-1.5 text-gold-600" aria-hidden="true" />
                <p className="font-arabic text-xs sm:text-sm leading-relaxed text-ink-700" dir="rtl">{guide.virtues}</p>
              </div>
            </div>
          )}

          {/* ---- Wudu ---- */}
          {activeTab === "wudu" && (
            <div className="mt-5 max-w-3xl mx-auto animate-fade-in-up">
              <div className="card-dark relative overflow-hidden p-5 sm:p-7 text-center">
                <span className="octagram mx-auto flex h-12 w-12 bg-white/10 text-gold-300" aria-hidden="true">
                  <Droplets size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mt-3 font-quran text-2xl sm:text-3xl font-bold text-gradient-gold-light" dir="rtl">الوضوء</h3>
                <p className="mt-1 font-arabic text-xs sm:text-sm text-white/60" dir="rtl">خطوات الوضوء الصحيح خطوة بخطوة</p>
              </div>

              <ol className="mt-3.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {WUDU_STEPS.map((item, idx) => (
                  <li
                    key={item.step}
                    className="card card-hover flex items-center gap-3 p-3 animate-fade-in-up"
                    style={{ animationDelay: `${idx * 35}ms` }}
                    dir="rtl"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gold-500/25 bg-gradient-to-br from-gold-100 to-gold-50 text-gold-700" aria-hidden="true">
                      {item.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="block font-arabic text-xs sm:text-sm font-bold text-ink-900 truncate">{item.title}</span>
                      <span className="block font-arabic text-[10.5px] text-ink-500">{item.desc}</span>
                    </div>
                    <span className="octagram h-7 w-7 shrink-0" aria-hidden="true">
                      <span className="font-arabic text-[9.5px] font-bold text-gold-700">{item.step}</span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="card-beige relative mt-4 overflow-hidden p-4 text-center">
                <span className="font-arabic text-[9px] font-extrabold tracking-widest text-gold-700" dir="rtl">دعاء بعد الوضوء</span>
                <p className="mt-1.5 font-quran text-sm sm:text-base leading-relaxed text-ink-800" dir="rtl" lang="ar">
                  أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ
                </p>
              </div>
            </div>
          )}

          {/* ---- Conditions ---- */}
          {activeTab === "conditions" && (
            <div className="mt-5 max-w-3xl mx-auto animate-fade-in-up">
              <div className="card-dark relative overflow-hidden p-5 sm:p-7 text-center">
                <span className="octagram mx-auto flex h-12 w-12 bg-white/10 text-gold-300" aria-hidden="true">
                  <ClipboardList size={22} strokeWidth={1.8} />
                </span>
                <h3 className="mt-3 font-quran text-2xl sm:text-3xl font-bold text-gradient-gold-light" dir="rtl">شروط الصلاة</h3>
                <p className="mt-1 font-arabic text-xs sm:text-sm text-white/60" dir="rtl">الواجب توفرها لصحة الصلاة</p>
              </div>

              <div className="mt-3.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {CONDITIONS.map((c, idx) => (
                  <div key={idx} className="card card-hover flex items-center gap-3 p-3 animate-fade-in-up" style={{ animationDelay: `${idx * 40}ms` }} dir="rtl">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-gold-500/25 bg-gradient-to-br from-gold-100 to-gold-50 text-gold-700" aria-hidden="true">
                      {c.icon}
                    </span>
                    <div>
                      <span className="block font-arabic text-xs sm:text-sm font-bold text-ink-900">{c.title}</span>
                      <span className="block font-arabic text-[10.5px] text-ink-500">{c.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2">
                <span className="divider-gold flex-1" aria-hidden="true" />
                <h4 className="font-arabic text-xs font-bold text-gold-700" dir="rtl">أركان الصلاة</h4>
                <span className="divider-gold flex-1" aria-hidden="true" />
              </div>
              <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {PILLARS.map((p, idx) => (
                  <li
                    key={idx}
                    className="card-beige flex items-center justify-center px-2.5 py-3 text-center animate-fade-in-up"
                    style={{ animationDelay: `${idx * 30}ms` }}
                  >
                    <span className="font-arabic text-xs font-bold text-ink-800" dir="rtl">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function StatBox({ value, labelAr, highlight = false }: { value: number; labelAr: string; highlight?: boolean }) {
  return (
    <div className={cn("rounded-2xl border px-3.5 py-2 text-center", highlight ? "border-gold-500/35 bg-white shadow-xs" : "border-ink-200 bg-white/70")}>
      <span className={cn("block text-base font-extrabold", highlight ? "text-gold-600" : "text-ink-800")}>{value}</span>
      <span className="block font-arabic text-[8.5px] font-bold text-ink-500">{labelAr}</span>
    </div>
  );
}
