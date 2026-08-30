import { BookOpen, Clock3, Heart, HelpCircle, Mail, MapPin, MoonStar, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "../components/Button";
import { CrescentMoon } from "../components/CrescentMoon";
import { IslamicPattern } from "../components/IslamicPattern";
import { SectionTitle } from "../components/SectionTitle";
import type { Page } from "../components/Header";

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

const FEATURES: { icon: ReactNode; titleAr: string; desc: string }[] = [
  { icon: <Clock3 size={18} />, titleAr: "مواقيت دقيقة للمغرب", desc: "أوقات الصلاة لأكثر من 22 مدينة مغربية مطابقة لحسابات وزارة الأوقاف والشؤون الإسلامية عبر واجهة Aladhan." },
  { icon: <BookOpen size={18} />, titleAr: "القرآن الكريم كاملاً", desc: "المصحف الشريف كاملاً ١١٤ سورة مع التلاوات الصوتية والتفسير الميسر عبر AlQuran Cloud." },
  { icon: <Heart size={18} />, titleAr: "أذكار وأدعية صحيحة", desc: "حصن المسلم وأذكار الصباح والمساء الموثقة بالأحاديث الصحيحة والمراجع المعتمدة." },
  { icon: <ShieldCheck size={18} />, titleAr: "خصوصية وأمان تام", desc: "بدون إعلانات وبدون جمع بيانات — تفضيلاتك ومدينتك المفضلة محفوظة على جهازك فقط." },
];

const FAQS = [
  {
    q: "ما هي منصة تقوى (Taqwaa) وما الخدمات التي تقدمها؟",
    a: "تقوى هي منصة وتطبيق إسلامي مغربي عصري يهدف إلى تيسير العبادة والذكر للمسلمين في المغرب والعالم عبر توفير مواقيت الصلاة الدقيقة، القرآن الكريم كاملاً تلاوة واستماعاً، وحصن المسلم من الأدعية والأذكار اليومية في واجهة سريعة وخالية من الإعلانات.",
  },
  {
    q: "كيف يتم حساب مواقيت الصلاة في مدن المغرب؟",
    a: "يتم حساب أوقات الصلاة وفق المعايير الحسابية المعتمدة رسمياً في المملكة المغربية لجميع المدن بما فيها الدار البيضاء، الرباط، مراكش، طنجة، فاس، أكادير، وجدة، مكناس، وتطوان.",
  },
  {
    q: "هل تطبيق تقوى مجاني بالكامل؟",
    a: "نعم، منصة وتطبيق تقوى مجاني تماماً 100% وبدون أي اشتراكات أو رسوم، وصُمم لوجه الله تعالى لخدمة المسلمين وتوفير بيئة عبادة نقية.",
  },
  {
    q: "هل تعمل المنصة على الهواتف والأجهزة اللوحية؟",
    a: "نعم، تم تصميم تقوى بتقنيات الويب المتقدمة ليكون متجاوباً وسريعاً وخفيفاً على كافة الهواتف الذكية (أندرويد وآيفون) والحواسيب اللوحية والمكتبية مع إمكانية التثبيت كتطبيق PWA.",
  },
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="animate-page-enter">
      {/* ===== Intro ===== */}
      <section className="relative mx-auto max-w-7xl overflow-hidden px-3.5 pt-4 sm:px-6 sm:pt-8 lg:px-8">
        <IslamicPattern className="pointer-events-none absolute inset-x-0 top-0 h-64 w-full" opacity={0.05} />
        <div className="relative flex flex-col items-center gap-4 sm:gap-6 py-6 sm:py-12 text-center">
          <CrescentMoon className="h-14 w-14 sm:h-16 sm:w-16 animate-float drop-shadow-[0_12px_28px_rgba(201,162,39,0.4)]" />
          <div>
            <p className="font-quran text-xl sm:text-2xl md:text-3xl font-bold leading-relaxed text-gradient-gold" dir="rtl" lang="ar">
              وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ
            </p>
            <p className="mt-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.24em] text-ink-500">
              سورة الذاريات ٥٥ · And remind, for reminders benefit the believers
            </p>
          </div>

          <h1 className="max-w-2xl text-balance text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight text-ink-900">
            حول منصة <span className="text-gradient-gold">تقوى — Taqwaa</span>
          </h1>

          <p className="max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed text-ink-600">
            تقوى (Taqwaa) منصة إسلامية مغربية حديثة صُممت لتقديم رفيق إيماني هادئ وموثوق. نجمع مواقيت الصلاة الدقيقة للمغرب، القرآن الكريم كاملاً، وحصن المسلم من الأدعية والأذكار في مكان واحد بلمسة جمالية وتجربة مستخدم سريعة وسلسة.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-3.5 sm:px-6 lg:px-8">
        {/* ===== What we offer ===== */}
        <section className="pt-6 sm:pt-8" aria-labelledby="offer-heading">
          <SectionTitle eyebrow="What we offer" title="Built for worship" titleAr="صُنع لخدمة العبادة" />
          <div className="mt-6 sm:mt-9 grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <div key={f.titleAr} className="card card-hover p-4 sm:p-5 animate-fade-in-up" style={{ animationDelay: `${i * 50}ms` }}>
                <span className="octagram h-11 w-11 text-gold-700" aria-hidden="true">
                  {f.icon}
                </span>
                <h2 className="mt-3 font-arabic text-sm sm:text-base font-bold text-ink-900">{f.titleAr}</h2>
                <p className="mt-1 text-xs sm:text-sm leading-relaxed text-ink-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== FAQ Section for SEO and Users ===== */}
        <section className="pt-10 sm:pt-14" aria-labelledby="faq-heading">
          <SectionTitle eyebrow="FAQ" title="Frequently Asked Questions" titleAr="الأسئلة الشائعة حول تقوى" />
          <div className="mt-6 sm:mt-8 grid gap-3.5 sm:gap-4 max-w-4xl mx-auto">
            {FAQS.map((faq, idx) => (
              <details key={idx} className="card group p-4 sm:p-5 open:bg-white transition-all">
                <summary className="flex cursor-pointer list-none items-center justify-between font-arabic text-xs sm:text-sm md:text-base font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-2">
                    <HelpCircle size={16} className="text-gold-600 shrink-0" />
                    {faq.q}
                  </span>
                  <span className="text-gold-700 font-bold transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 border-t border-ink-200/70 pt-3 text-xs sm:text-sm leading-relaxed text-ink-600">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* ===== Contact / credits ===== */}
        <section className="mt-10 sm:mt-14 grid gap-3.5 sm:gap-4 lg:grid-cols-[1.2fr_1fr]" aria-labelledby="contact-heading">
          <div id="contact-heading" className="card-dark relative overflow-hidden p-5 sm:p-8">
            <IslamicPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.08} />
            <div className="relative">
              <MoonStar size={18} className="text-gold-400" aria-hidden="true" />
              <h2 className="mt-2 text-lg sm:text-xl font-extrabold text-white">تواصل معنا · Get in touch</h2>
              <p className="mt-1.5 max-w-md text-xs sm:text-sm leading-relaxed text-white/60">
                لديك استفسار، اقتراح أو ملاحظات حول منصة تقوى؟ نسعد دائماً بسماع آرائكم وملاحظاتكم لتطوير المنصة.
              </p>
              <a href="mailto:contact@taqwaa.app" className="mt-4 sm:mt-6 inline-block w-full sm:w-auto">
                <Button className="w-full sm:w-auto !py-2.5 !text-xs sm:!text-sm" aria-label="Email Taqwaa">
                  <Mail size={15} aria-hidden="true" />
                  contact@taqwaa.app
                </Button>
              </a>
            </div>
          </div>

          <div className="card-beige relative overflow-hidden p-5 sm:p-8">
            <MapPin size={18} className="text-gold-700" aria-hidden="true" />
            <h2 className="mt-2 font-arabic text-lg sm:text-xl font-extrabold text-ink-900" dir="rtl">من المغرب بِمحبّة</h2>
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-ink-600">
              تم التطوير والتصميم بواسطة{" "}
              <span className="font-bold text-gold-700">أنس لغزيري (Anas Lagziri)</span> — منصة إسلامية صُممت بعناية للمجتمع المسلم في المغرب وحول العالم.
            </p>
            <button
              onClick={() => onNavigate("home")}
              className="btn btn-secondary btn-sm mt-4 sm:mt-6 cursor-pointer !py-2 !text-xs sm:!text-sm w-full sm:w-auto"
            >
              العودة للرئيسية · Back to Home
            </button>
          </div>
        </section>

        {/* ===== Privacy / terms ===== */}
        <section className="mt-8 sm:mt-10 grid gap-3 sm:gap-4 pb-4 md:grid-cols-2" aria-label="Privacy and terms">
          <details className="card group p-4 open:bg-white sm:p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-arabic text-xs sm:text-sm font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
              سياسة الخصوصية · Privacy Policy
              <span className="text-gold-700 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-2.5 border-t border-ink-200/70 pt-2.5 text-xs sm:text-sm leading-relaxed text-ink-600">
              تحترم منصة تقوى (Taqwaa) خصوصيتك التامة. تحفظ التفضيلات (كالمدينة والمفضلة) محلياً على جهازك فقط. لا نقوم بتتبع بياناتك الشخصية أو استخدام ملفات تتبع إعلانية، وتتم طلبات الأوقات والنصوص من المصادر المفتوحة المعتمدة مباشرة.
            </p>
          </details>

          <details className="card group p-4 open:bg-white sm:p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between font-arabic text-xs sm:text-sm font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
              شروط الاستخدام · Terms of Use
              <span className="text-gold-700 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-2.5 border-t border-ink-200/70 pt-2.5 text-xs sm:text-sm leading-relaxed text-ink-600">
              تقوى منصة إسلامية مجانية للاستخدام الشخصي وغير التجاري. نحرص دائماً على دقة النصوص والمواقيت الحسابية، والنصوص القرآنية مستمدة من AlQuran Cloud ومواقيت الصلاة من Aladhan.
            </p>
          </details>
        </section>
      </div>
    </div>
  );
}
