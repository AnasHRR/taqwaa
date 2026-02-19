import { useState } from "react";
import {
  Compass, Droplets, ClipboardList, Moon, Sun, CloudSun, Sunset, Stars,
  ArrowRight, Clock, Gem, ChevronLeft, Hand, Ear, Footprints, SmilePlus
} from "lucide-react";

interface PrayerGuide {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: React.ReactNode;
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
    id: "fajr", nameAr: "صلاة الفجر", nameEn: "Fajr", icon: <Moon size={28} strokeWidth={1.8} />,
    rakaat: 2, sunnahBefore: 2, sunnahAfter: 0,
    description: "أولى الصلوات الخمس، تؤدى قبل شروق الشمس",
    steps: ["النية والتكبير", "دعاء الاستفتاح", "الفاتحة + سورة", "الركوع", "الرفع من الركوع", "السجود الأول", "الجلوس بين السجدتين", "السجود الثاني", "الركعة الثانية", "التشهد والسلام"],
    virtues: "من صلى الفجر في جماعة فكأنما قام الليل كله",
    time: "من طلوع الفجر إلى شروق الشمس",
  },
  {
    id: "dhuhr", nameAr: "صلاة الظهر", nameEn: "Dhuhr", icon: <Sun size={28} strokeWidth={1.8} />,
    rakaat: 4, sunnahBefore: 4, sunnahAfter: 2,
    description: "الصلاة الثانية، بعد زوال الشمس",
    steps: ["النية والتكبير", "الفاتحة + سورة (جهرًا)", "الركوع والسجود", "التشهد الأول", "الفاتحة فقط في الثالثة والرابعة", "التشهد الأخير", "الصلاة الإبراهيمية", "التسليم"],
    virtues: "من حافظ على أربع قبل الظهر وأربع بعدها حرمه الله على النار",
    time: "من زوال الشمس إلى صلاة العصر",
  },
  {
    id: "asr", nameAr: "صلاة العصر", nameEn: "Asr", icon: <CloudSun size={28} strokeWidth={1.8} />,
    rakaat: 4, sunnahBefore: 0, sunnahAfter: 0,
    description: "الصلاة الوسطى التي أمر الله بالمحافظة عليها",
    steps: ["النية والتكبير", "الفاتحة + سورة", "الركوع والسجود", "التشهد الأول", "الركعتان الأخيرتان", "التشهد والسلام"],
    virtues: "من ترك صلاة العصر فقد حبط عمله",
    time: "من العصر إلى غروب الشمس",
  },
  {
    id: "maghrib", nameAr: "صلاة المغرب", nameEn: "Maghrib", icon: <Sunset size={28} strokeWidth={1.8} />,
    rakaat: 3, sunnahBefore: 0, sunnahAfter: 2,
    description: "تؤدى بعد غروب الشمس، ثلاث ركعات",
    steps: ["النية والتكبير", "الفاتحة + سورة جهرًا", "الركوع والسجود", "التشهد الأول", "الركعة الثالثة سرًا", "التشهد والسلام"],
    virtues: "بادروا بصلاة المغرب قبل طلوع النجوم",
    time: "من غروب الشمس إلى مغيب الشفق",
  },
  {
    id: "isha", nameAr: "صلاة العشاء", nameEn: "Isha", icon: <Stars size={28} strokeWidth={1.8} />,
    rakaat: 4, sunnahBefore: 0, sunnahAfter: 2,
    description: "آخر الصلوات الخمس المفروضة",
    steps: ["النية والتكبير", "الفاتحة + سورة جهرًا", "الركوع والسجود", "التشهد الأول", "الركعتان سرًا", "التشهد والسلام"],
    virtues: "من صلى العشاء في جماعة فكأنما قام نصف الليل",
    time: "من مغيب الشفق إلى نصف الليل",
  },
];

const WUDU_STEPS = [
  { step: 1, title: "النية والبسملة", desc: "انوِ الوضوء وقل بسم الله", icon: <Hand size={20} /> },
  { step: 2, title: "غسل الكفين", desc: "اغسل كفيك ثلاث مرات", icon: <Hand size={20} /> },
  { step: 3, title: "المضمضة", desc: "تمضمض ثلاث مرات", icon: <Droplets size={20} /> },
  { step: 4, title: "الاستنشاق", desc: "استنشق واستنثر ثلاثًا", icon: <Droplets size={20} /> },
  { step: 5, title: "غسل الوجه", desc: "اغسل وجهك ثلاث مرات", icon: <SmilePlus size={20} /> },
  { step: 6, title: "غسل اليدين", desc: "إلى المرفقين ثلاثًا", icon: <Hand size={20} /> },
  { step: 7, title: "مسح الرأس", desc: "امسح رأسك مرة واحدة", icon: <Hand size={20} /> },
  { step: 8, title: "مسح الأذنين", desc: "امسح أذنيك مرة واحدة", icon: <Ear size={20} /> },
  { step: 9, title: "غسل القدمين", desc: "إلى الكعبين ثلاثًا", icon: <Footprints size={20} /> },
];

const CONDITIONS = [
  { icon: <Droplets size={22} />, title: "الطهارة", desc: "الوضوء وطهارة البدن والثوب والمكان" },
  { icon: <Compass size={22} />, title: "استقبال القبلة", desc: "التوجه نحو الكعبة المشرفة" },
  { icon: <ClipboardList size={22} />, title: "ستر العورة", desc: "لبس ما يستر العورة" },
  { icon: <Clock size={22} />, title: "دخول الوقت", desc: "التأكد من دخول وقت الصلاة" },
  { icon: <Hand size={22} />, title: "النية", desc: "استحضار نية الصلاة في القلب" },
];

const PILLARS = ["القيام", "التكبير", "قراءة الفاتحة", "الركوع", "السجود", "التشهد الأخير", "الجلوس بين السجدتين", "التسليم"];

export function SalaatPage() {
  const [selectedPrayer, setSelectedPrayer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"prayers" | "wudu" | "conditions">("prayers");

  const guide = PRAYER_GUIDES.find((p) => p.id === selectedPrayer);

  return (
    <div className="animate-page-enter">
      {/* Header */}
      <div className="px-5 md:px-8 lg:px-10 pt-5 md:pt-8 pb-4">
        <div className="flex flex-col items-center md:flex-row md:items-center md:gap-6">
          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-[18px] bg-gradient-to-br from-gold-500/12 to-gold-600/4 flex items-center justify-center border border-gold-500/8 mb-3 md:mb-0">
            <Compass size={28} className="text-gold-400" strokeWidth={1.8} />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold font-[Amiri] text-gradient-gold mb-0.5">الصلاة</h1>
            <p className="text-dark-400 text-[11px] lg:text-xs">Prayer Guide • دليل الصلاة الشامل</p>
          </div>
        </div>
      </div>

      <div className="px-5 md:px-8 lg:px-10 pb-6">
        {/* Tab chips */}
        <div className="flex gap-2.5 mb-5">
          {[
            { id: "prayers" as const, label: "الصلوات", icon: <Compass size={14} /> },
            { id: "wudu" as const, label: "الوضوء", icon: <Droplets size={14} /> },
            { id: "conditions" as const, label: "الشروط", icon: <ClipboardList size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedPrayer(null); }}
              className={`chip flex-1 justify-center ${activeTab === tab.id ? "chip-active" : "chip-inactive"}`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Prayers list */}
        {activeTab === "prayers" && !selectedPrayer && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2.5">
            {PRAYER_GUIDES.map((prayer, idx) => (
              <button
                key={prayer.id}
                onClick={() => setSelectedPrayer(prayer.id)}
                className="w-full card px-4 py-4 flex items-center justify-between touch-active cursor-pointer animate-fade-in-up hover:border-gold-500/8"
                style={{ animationDelay: `${idx * 70}ms` }}
                dir="rtl"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/4 flex items-center justify-center border border-gold-500/6 text-gold-400">
                    {prayer.icon}
                  </div>
                  <div className="text-right">
                    <span className="block text-white font-bold font-[Amiri] text-[16px]">{prayer.nameAr}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-dark-400 text-[10px]">{prayer.nameEn}</span>
                      <span className="text-dark-600">•</span>
                      <span className="text-gold-400/60 text-[10px] font-bold">{prayer.rakaat} ركعات</span>
                    </div>
                  </div>
                </div>
                <ChevronLeft size={16} className="text-dark-600" />
              </button>
            ))}
          </div>
        )}

        {/* Prayer detail */}
        {activeTab === "prayers" && guide && (
          <div className="animate-fade-in-up max-w-3xl">
            <button
              onClick={() => setSelectedPrayer(null)}
              className="flex items-center gap-2 mb-4 touch-active cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-dark-800 flex items-center justify-center border border-dark-700/40 group-hover:border-gold-500/15 transition-colors">
                <ArrowRight size={16} className="text-gold-400" />
              </div>
              <span className="text-gold-400 text-sm font-semibold">العودة</span>
            </button>

            {/* Header */}
            <div className="card-elevated p-5 lg:p-6 mb-4 text-center border border-gold-500/6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-gold-500/12 to-gold-600/4 flex items-center justify-center border border-gold-500/8 text-gold-400 mb-3">
                {guide.icon}
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold font-[Amiri] text-gradient-gold mb-1">{guide.nameAr}</h2>
              <p className="text-dark-300 text-xs mb-3">{guide.description}</p>
              <div className="flex items-center justify-center gap-3">
                <div className="card-subtle rounded-2xl px-4 py-2 text-center">
                  <span className="block text-gold-400 text-lg font-bold">{guide.rakaat}</span>
                  <span className="block text-dark-500 text-[8px]">ركعات</span>
                </div>
                {guide.sunnahBefore > 0 && (
                  <div className="card-subtle rounded-2xl px-4 py-2 text-center">
                    <span className="block text-accent-teal text-lg font-bold">{guide.sunnahBefore}</span>
                    <span className="block text-dark-500 text-[8px]">سنة قبلية</span>
                  </div>
                )}
                {guide.sunnahAfter > 0 && (
                  <div className="card-subtle rounded-2xl px-4 py-2 text-center">
                    <span className="block text-accent-teal text-lg font-bold">{guide.sunnahAfter}</span>
                    <span className="block text-dark-500 text-[8px]">سنة بعدية</span>
                  </div>
                )}
              </div>
            </div>

            {/* Time */}
            <div className="card px-4 py-3.5 mb-4 flex items-center gap-3" dir="rtl">
              <div className="w-10 h-10 rounded-xl bg-gold-500/6 flex items-center justify-center text-gold-400">
                <Clock size={20} />
              </div>
              <div>
                <span className="block text-gold-400 text-[10px] font-bold">وقت الصلاة</span>
                <span className="block text-dark-200 text-sm">{guide.time}</span>
              </div>
            </div>

            {/* Steps */}
            <div className="card p-5 lg:p-6 mb-4">
              <h3 className="text-gold-400 font-[Amiri] text-base font-bold mb-4 text-right">كيفية الصلاة</h3>
              <div className="space-y-3" dir="rtl">
                {guide.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-500/12 to-gold-600/6 flex items-center justify-center flex-shrink-0 border border-gold-500/8 mt-0.5">
                      <span className="text-gold-400 text-[10px] font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-dark-200 text-sm leading-relaxed pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Virtue */}
            <div className="card-subtle p-5 text-center border border-gold-500/4">
              <Gem size={20} className="text-gold-400/40 mx-auto mb-2" />
              <p className="text-gold-300/75 text-sm font-[Amiri] leading-relaxed px-2" dir="rtl">{guide.virtues}</p>
            </div>
          </div>
        )}

        {/* Wudu */}
        {activeTab === "wudu" && (
          <div className="animate-fade-in-up max-w-3xl">
            <div className="card-elevated p-5 lg:p-6 mb-5 text-center border border-accent-teal/6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-accent-teal/12 to-accent-teal/4 flex items-center justify-center border border-accent-teal/8 text-accent-teal mb-3">
                <Droplets size={28} strokeWidth={1.8} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold font-[Amiri] text-gradient-gold mb-0.5">الوضوء</h2>
              <p className="text-dark-400 text-xs">خطوات الوضوء الصحيح</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {WUDU_STEPS.map((item, idx) => (
                <div
                  key={item.step}
                  className="card px-4 py-3.5 flex items-center gap-3.5 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                  dir="rtl"
                >
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-accent-teal/10 to-accent-teal/3 flex items-center justify-center border border-accent-teal/8 text-accent-teal flex-shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <span className="block text-white font-bold text-sm">{item.title}</span>
                    <span className="block text-dark-400 text-[11px] mt-0.5">{item.desc}</span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-dark-800 flex items-center justify-center border border-dark-700/40">
                    <span className="text-accent-teal text-[10px] font-bold">{item.step}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="card-subtle p-5 mt-5 text-center border border-gold-500/4">
              <span className="text-dark-500 text-[9px] tracking-wider font-bold mb-2 block">دعاء بعد الوضوء</span>
              <p className="text-gold-300/75 text-base font-[Amiri] leading-[2.2]" dir="rtl">
                أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ
              </p>
            </div>
          </div>
        )}

        {/* Conditions */}
        {activeTab === "conditions" && (
          <div className="animate-fade-in-up max-w-3xl">
            <div className="card-elevated p-5 lg:p-6 mb-5 text-center border border-gold-500/6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-gold-500/12 to-gold-600/4 flex items-center justify-center border border-gold-500/8 text-gold-400 mb-3">
                <ClipboardList size={28} strokeWidth={1.8} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold font-[Amiri] text-gradient-gold mb-0.5">شروط الصلاة</h2>
              <p className="text-dark-400 text-xs">الواجب توفرها لصحة الصلاة</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mb-6">
              {CONDITIONS.map((c, idx) => (
                <div key={idx} className="card px-4 py-3.5 flex items-center gap-3.5 animate-fade-in-up" style={{ animationDelay: `${idx * 60}ms` }} dir="rtl">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-600/4 flex items-center justify-center border border-gold-500/6 text-gold-400 flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <span className="block text-white font-bold text-sm">{c.title}</span>
                    <span className="block text-dark-400 text-[11px] mt-0.5">{c.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pillars */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 divider-gold" />
              <h3 className="text-gold-400 font-[Amiri] text-sm font-bold">أركان الصلاة</h3>
              <div className="flex-1 divider-gold" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
              {PILLARS.map((p, idx) => (
                <div key={idx} className="card-subtle rounded-2xl px-3 py-3 text-center animate-fade-in-up" style={{ animationDelay: `${idx * 40 + 300}ms` }}>
                  <span className="text-dark-200 text-xs font-semibold">{p}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
