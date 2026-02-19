import { useState } from "react";

interface PrayerGuide {
  id: string;
  nameAr: string;
  nameEn: string;
  icon: string;
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
    id: "fajr",
    nameAr: "صلاة الفجر",
    nameEn: "Fajr Prayer",
    icon: "🌙",
    rakaat: 2,
    sunnahBefore: 2,
    sunnahAfter: 0,
    description: "صلاة الفجر هي أولى الصلوات الخمس المفروضة، وتؤدى قبل شروق الشمس.",
    steps: [
      "النية والتكبير (الله أكبر)",
      "قراءة دعاء الاستفتاح",
      "قراءة سورة الفاتحة وسورة قصيرة",
      "الركوع مع قول: سبحان ربي العظيم",
      "الرفع من الركوع: سمع الله لمن حمده",
      "السجود الأول: سبحان ربي الأعلى",
      "الجلوس بين السجدتين",
      "السجود الثاني",
      "القيام للركعة الثانية",
      "التشهد والسلام",
    ],
    virtues: "من صلى الفجر في جماعة فكأنما قام الليل كله",
    time: "من طلوع الفجر الصادق إلى شروق الشمس",
  },
  {
    id: "dhuhr",
    nameAr: "صلاة الظهر",
    nameEn: "Dhuhr Prayer",
    icon: "☀️",
    rakaat: 4,
    sunnahBefore: 4,
    sunnahAfter: 2,
    description: "صلاة الظهر هي الصلاة الثانية، وتؤدى بعد زوال الشمس عن وسط السماء.",
    steps: [
      "النية والتكبير",
      "قراءة الفاتحة وسورة في الركعتين الأوليين",
      "الركوع والسجود في كل ركعة",
      "التشهد الأول بعد الركعة الثانية",
      "قراءة الفاتحة فقط في الركعتين الأخيرتين",
      "التشهد الأخير",
      "الصلاة الإبراهيمية",
      "التسليم يمينًا ويسارًا",
    ],
    virtues: "من حافظ على أربع ركعات قبل الظهر وأربع بعدها حرمه الله على النار",
    time: "من زوال الشمس إلى أن يصير ظل كل شيء مثله",
  },
  {
    id: "asr",
    nameAr: "صلاة العصر",
    nameEn: "Asr Prayer",
    icon: "🌤️",
    rakaat: 4,
    sunnahBefore: 0,
    sunnahAfter: 0,
    description: "صلاة العصر هي الصلاة الوسطى التي أمر الله بالمحافظة عليها.",
    steps: [
      "النية والتكبير",
      "قراءة الفاتحة وسورة في الركعتين الأوليين",
      "الركوع والسجود",
      "التشهد الأول بعد الركعة الثانية",
      "الركعتان الأخيرتان بالفاتحة فقط",
      "التشهد الأخير والسلام",
    ],
    virtues: "من ترك صلاة العصر فقد حبط عمله - رواه البخاري",
    time: "من أن يصير ظل الشيء مثله إلى غروب الشمس",
  },
  {
    id: "maghrib",
    nameAr: "صلاة المغرب",
    nameEn: "Maghrib Prayer",
    icon: "🌇",
    rakaat: 3,
    sunnahBefore: 0,
    sunnahAfter: 2,
    description: "صلاة المغرب تؤدى بعد غروب الشمس مباشرة، وهي ثلاث ركعات.",
    steps: [
      "النية والتكبير",
      "قراءة الفاتحة وسورة جهرًا في الركعتين الأوليين",
      "الركوع والسجود",
      "التشهد الأول بعد الركعة الثانية",
      "الركعة الثالثة بالفاتحة فقط سرًا",
      "التشهد الأخير والسلام",
    ],
    virtues: "إذا أقبل الليل من ها هنا وأدبر النهار فقد أفطر الصائم",
    time: "من غروب الشمس إلى مغيب الشفق الأحمر",
  },
  {
    id: "isha",
    nameAr: "صلاة العشاء",
    nameEn: "Isha Prayer",
    icon: "🌃",
    rakaat: 4,
    sunnahBefore: 0,
    sunnahAfter: 2,
    description: "صلاة العشاء هي آخر الصلوات الخمس المفروضة في اليوم.",
    steps: [
      "النية والتكبير",
      "قراءة الفاتحة وسورة جهرًا في الركعتين الأوليين",
      "الركوع والسجود",
      "التشهد الأول",
      "الركعتان الأخيرتان بالفاتحة فقط سرًا",
      "التشهد الأخير والصلاة الإبراهيمية",
      "التسليم",
    ],
    virtues: "من صلى العشاء في جماعة فكأنما قام نصف الليل",
    time: "من مغيب الشفق الأحمر إلى نصف الليل",
  },
];

const PRAYER_CONDITIONS = [
  { icon: "💧", title: "الطهارة", desc: "الوضوء وطهارة البدن والثوب والمكان" },
  { icon: "🧭", title: "استقبال القبلة", desc: "التوجه نحو الكعبة المشرفة" },
  { icon: "👘", title: "ستر العورة", desc: "لبس ما يستر العورة" },
  { icon: "⏰", title: "دخول الوقت", desc: "التأكد من دخول وقت الصلاة" },
  { icon: "🤲", title: "النية", desc: "استحضار نية الصلاة في القلب" },
];

const WUDU_STEPS = [
  { step: 1, title: "النية والبسملة", desc: "انوِ الوضوء وقل: بسم الله" },
  { step: 2, title: "غسل الكفين", desc: "اغسل كفيك ثلاث مرات" },
  { step: 3, title: "المضمضة", desc: "تمضمض ثلاث مرات" },
  { step: 4, title: "الاستنشاق", desc: "استنشق واستنثر ثلاث مرات" },
  { step: 5, title: "غسل الوجه", desc: "اغسل وجهك ثلاث مرات" },
  { step: 6, title: "غسل اليدين", desc: "اغسل يديك إلى المرفقين ثلاثًا" },
  { step: 7, title: "مسح الرأس", desc: "امسح رأسك مرة واحدة" },
  { step: 8, title: "مسح الأذنين", desc: "امسح أذنيك مرة واحدة" },
  { step: 9, title: "غسل القدمين", desc: "اغسل قدميك إلى الكعبين ثلاثًا" },
];

export function SalaatPage() {
  const [selectedPrayer, setSelectedPrayer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"prayers" | "wudu" | "conditions">("prayers");

  const currentGuide = PRAYER_GUIDES.find((p) => p.id === selectedPrayer);

  return (
    <div className="page-content">
      {/* Header */}
      <div className="relative pt-6 pb-4">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="text-4xl mb-2">🕌</div>
          <h1 className="text-3xl font-bold font-[Amiri] text-gradient-gold mb-1">الصلاة</h1>
          <p className="text-midnight-300 text-xs">دليل الصلاة الشامل</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 pb-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          {[
            { id: "prayers" as const, label: "الصلوات", icon: "🕌" },
            { id: "wudu" as const, label: "الوضوء", icon: "💧" },
            { id: "conditions" as const, label: "الشروط", icon: "📋" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedPrayer(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 cursor-pointer border
                ${activeTab === tab.id
                  ? "glass-card border-gold-500/25 text-gold-400"
                  : "bg-midnight-800/30 border-midnight-700/30 text-midnight-400 hover:text-midnight-200 hover:border-midnight-600/50"
                }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Prayers Tab */}
        {activeTab === "prayers" && !selectedPrayer && (
          <div className="grid gap-3">
            {PRAYER_GUIDES.map((prayer, idx) => (
              <button
                key={prayer.id}
                onClick={() => setSelectedPrayer(prayer.id)}
                className="glass-card rounded-xl p-4 flex items-center justify-between hover:border-gold-500/20 transition-all duration-300 cursor-pointer group animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
                dir="rtl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/15 to-gold-600/5 flex items-center justify-center border border-gold-500/10 text-2xl">
                    {prayer.icon}
                  </div>
                  <div className="text-right">
                    <span className="block text-white font-bold font-[Amiri] text-lg group-hover:text-gold-300 transition-colors">
                      {prayer.nameAr}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-midnight-400 text-[10px]">{prayer.nameEn}</span>
                      <span className="text-gold-400/60 text-[10px]">•</span>
                      <span className="text-gold-400/80 text-[10px] font-bold">{prayer.rakaat} ركعات</span>
                    </div>
                  </div>
                </div>
                <svg className="w-4 h-4 text-midnight-500 group-hover:text-gold-400 transition-all group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        )}

        {/* Prayer Detail */}
        {activeTab === "prayers" && selectedPrayer && currentGuide && (
          <div className="animate-fade-in-up">
            <button
              onClick={() => setSelectedPrayer(null)}
              className="flex items-center gap-2 mb-4 text-gold-400 hover:text-gold-300 transition-colors cursor-pointer group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-semibold">العودة</span>
            </button>

            {/* Prayer header card */}
            <div className="glass-card rounded-2xl p-5 mb-4 text-center border border-gold-500/15">
              <div className="text-4xl mb-2">{currentGuide.icon}</div>
              <h2 className="text-2xl font-bold font-[Amiri] text-gradient-gold mb-1">
                {currentGuide.nameAr}
              </h2>
              <p className="text-midnight-300 text-xs mb-3">{currentGuide.description}</p>

              <div className="flex items-center justify-center gap-4">
                <div className="glass-card-light rounded-lg px-3 py-1.5 text-center">
                  <span className="block text-gold-400 text-lg font-bold">{currentGuide.rakaat}</span>
                  <span className="block text-midnight-400 text-[9px]">ركعات فرض</span>
                </div>
                {currentGuide.sunnahBefore > 0 && (
                  <div className="glass-card-light rounded-lg px-3 py-1.5 text-center">
                    <span className="block text-teal-400 text-lg font-bold">{currentGuide.sunnahBefore}</span>
                    <span className="block text-midnight-400 text-[9px]">سنة قبلية</span>
                  </div>
                )}
                {currentGuide.sunnahAfter > 0 && (
                  <div className="glass-card-light rounded-lg px-3 py-1.5 text-center">
                    <span className="block text-teal-400 text-lg font-bold">{currentGuide.sunnahAfter}</span>
                    <span className="block text-midnight-400 text-[9px]">سنة بعدية</span>
                  </div>
                )}
              </div>
            </div>

            {/* Time */}
            <div className="glass-card rounded-xl p-4 mb-4 flex items-center gap-3 border border-midnight-600/30" dir="rtl">
              <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center">
                <span className="text-lg">⏰</span>
              </div>
              <div>
                <span className="block text-gold-400 text-xs font-bold">وقت الصلاة</span>
                <span className="block text-midnight-200 text-sm">{currentGuide.time}</span>
              </div>
            </div>

            {/* Steps */}
            <div className="glass-card rounded-2xl p-5 mb-4 border border-midnight-600/30">
              <h3 className="text-gold-400 font-[Amiri] text-lg font-bold mb-4 text-right">كيفية الصلاة</h3>
              <div className="space-y-3" dir="rtl">
                {currentGuide.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-500/20 to-gold-600/10 flex items-center justify-center flex-shrink-0 border border-gold-500/15 mt-0.5">
                      <span className="text-gold-400 text-[10px] font-bold">{idx + 1}</span>
                    </div>
                    <p className="text-midnight-200 text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Virtue */}
            <div className="glass-card-light rounded-2xl p-4 text-center border border-gold-500/10">
              <span className="text-lg">💎</span>
              <p className="text-gold-300 text-sm font-[Amiri] mt-1 leading-relaxed" dir="rtl">
                {currentGuide.virtues}
              </p>
            </div>
          </div>
        )}

        {/* Wudu Tab */}
        {activeTab === "wudu" && (
          <div className="animate-fade-in-up">
            <div className="glass-card rounded-2xl p-5 mb-4 text-center border border-gold-500/15">
              <div className="text-4xl mb-2">💧</div>
              <h2 className="text-2xl font-bold font-[Amiri] text-gradient-gold mb-1">الوضوء</h2>
              <p className="text-midnight-300 text-xs">خطوات الوضوء الصحيح</p>
            </div>

            <div className="space-y-3">
              {WUDU_STEPS.map((item, idx) => (
                <div
                  key={item.step}
                  className="glass-card rounded-xl p-4 flex items-center gap-4 border border-midnight-600/30 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 80}ms` }}
                  dir="rtl"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-teal-600/10 flex items-center justify-center flex-shrink-0 border border-teal-500/15">
                    <span className="text-teal-400 text-sm font-bold">{item.step}</span>
                  </div>
                  <div>
                    <span className="block text-white font-bold text-sm">{item.title}</span>
                    <span className="block text-midnight-300 text-xs mt-0.5">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dua after wudu */}
            <div className="glass-card-light rounded-2xl p-5 mt-4 text-center border border-gold-500/10">
              <span className="text-midnight-400 text-[10px] uppercase tracking-wider font-bold mb-2 block">دعاء بعد الوضوء</span>
              <p className="text-gold-300 text-lg font-[Amiri] leading-[2]" dir="rtl">
                أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ
              </p>
            </div>
          </div>
        )}

        {/* Conditions Tab */}
        {activeTab === "conditions" && (
          <div className="animate-fade-in-up">
            <div className="glass-card rounded-2xl p-5 mb-4 text-center border border-gold-500/15">
              <div className="text-4xl mb-2">📋</div>
              <h2 className="text-2xl font-bold font-[Amiri] text-gradient-gold mb-1">شروط الصلاة</h2>
              <p className="text-midnight-300 text-xs">الشروط الواجب توفرها لصحة الصلاة</p>
            </div>

            <div className="space-y-3">
              {PRAYER_CONDITIONS.map((condition, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-xl p-4 flex items-center gap-4 border border-midnight-600/30 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                  dir="rtl"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-500/15 to-gold-600/5 flex items-center justify-center border border-gold-500/10 text-2xl flex-shrink-0">
                    {condition.icon}
                  </div>
                  <div>
                    <span className="block text-white font-bold text-sm">{condition.title}</span>
                    <span className="block text-midnight-300 text-xs mt-0.5">{condition.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pillars */}
            <div className="mt-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 gold-divider" />
                <h3 className="text-gold-400 font-[Amiri] text-base font-bold">أركان الصلاة</h3>
                <div className="flex-1 gold-divider" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {["القيام", "التكبير", "قراءة الفاتحة", "الركوع", "السجود", "التشهد الأخير", "الجلوس بين السجدتين", "التسليم"].map(
                  (pillar, idx) => (
                    <div
                      key={idx}
                      className="glass-card-light rounded-lg px-3 py-2.5 text-center border border-midnight-700/30 animate-fade-in-up"
                      style={{ animationDelay: `${idx * 60 + 300}ms` }}
                    >
                      <span className="text-midnight-200 text-xs font-semibold">{pillar}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
