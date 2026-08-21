import { BookOpen, Clock3, Heart, Mail, MapPin, MoonStar, ShieldCheck } from "lucide-react";
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
  { icon: <Clock3 size={20} />, titleAr: "مواقيت دقيقة", desc: "Prayer times for 22 Moroccan cities via the trusted Aladhan API." },
  { icon: <BookOpen size={20} />, titleAr: "قرآن كريم", desc: "The full Mushaf with verified text from the AlQuran Cloud API." },
  { icon: <Heart size={20} />, titleAr: "أذكار صحيحة", desc: "Authentic azkar and duas referenced from Sahih sources." },
  { icon: <ShieldCheck size={20} />, titleAr: "خصوصية كاملة", desc: "No accounts, no tracking — your data stays on your device." },
];

export function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="animate-page-enter">
      {/* ===== Intro ===== */}
      <section className="relative mx-auto max-w-7xl overflow-hidden px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <IslamicPattern className="pointer-events-none absolute inset-x-0 top-0 h-64 w-full" opacity={0.05} />
        <div className="relative flex flex-col items-center gap-6 py-8 text-center sm:py-12">
          <CrescentMoon className="h-16 w-16 animate-float drop-shadow-[0_12px_28px_rgba(201,162,39,0.4)]" />
          <div>
            <p className="font-quran text-2xl font-bold leading-relaxed text-gradient-gold sm:text-3xl" dir="rtl" lang="ar">
              وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ
            </p>
            <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.24em] text-ink-500">
              Adh-Dhariyat 55 · And remind, for reminders benefit the believers
            </p>
          </div>

          <h1 className="max-w-xl text-balance text-3xl font-extrabold leading-tight text-ink-900 sm:text-4xl">
            A peaceful companion for your{" "}
            <span className="text-gradient-gold">spiritual journey</span>
          </h1>

          <p className="max-w-xl text-sm leading-relaxed text-ink-600 sm:text-base">
            Taqwaa is a modern Islamic platform built with love in Morocco. We bring prayer
            times, the Noble Quran and authentic remembrances together in one calm,
            distraction-free place — beautiful on every device.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ===== What we offer ===== */}
        <section className="pt-8" aria-labelledby="offer-heading">
          <SectionTitle eyebrow="What we offer" title="Built for worship" titleAr="صُنع لخدمة العبادة" />
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <div key={f.titleAr} className="card card-hover p-5 animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                <span className="octagram h-12 w-12 text-gold-700" aria-hidden="true">
                  {f.icon}
                </span>
                <h3 className="mt-4 font-arabic text-base font-bold text-ink-900">{f.titleAr}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Contact / credits ===== */}
        <section className="mt-14 grid gap-4 lg:grid-cols-[1.2fr_1fr]" aria-labelledby="contact-heading">
          <div id="contact-heading" className="card-dark relative overflow-hidden p-7 sm:p-9">
            <IslamicPattern className="pointer-events-none absolute inset-0 h-full w-full" opacity={0.08} />
            <div className="relative">
              <MoonStar size={20} className="text-gold-400" aria-hidden="true" />
              <h2 className="mt-3 text-xl font-extrabold text-white sm:text-2xl">Get in touch</h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-white/60">
                Questions, feedback or ideas for Taqwaa? We read every message and would
                love to hear how the platform serves you.
              </p>
              <a href="mailto:contact@taqwaa.app" className="mt-6 inline-block">
                <Button aria-label="Email Taqwaa">
                  <Mail size={16} aria-hidden="true" />
                  contact@taqwaa.app
                </Button>
              </a>
            </div>
          </div>

          <div className="card-beige relative overflow-hidden p-7 sm:p-9">
            <MapPin size={20} className="text-gold-700" aria-hidden="true" />
            <h2 className="mt-3 font-arabic text-xl font-extrabold text-ink-900" dir="rtl">من المغرب بِمحبّة</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Designed &amp; developed by{" "}
              <span className="font-bold text-gold-700">Anas Lagziri</span> — crafted with
              care for the Muslim community, first in Morocco then everywhere.
            </p>
            <button
              onClick={() => onNavigate("home")}
              className="btn btn-secondary btn-sm mt-6 cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </section>

        {/* ===== Privacy / terms ===== */}
        <section className="mt-10 grid gap-4 pb-4 md:grid-cols-2" aria-label="Privacy and terms">
          <details className="card group p-5 open:bg-white sm:p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between font-arabic text-sm font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
              Privacy Policy
              <span className="text-gold-700 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-3 border-t border-ink-200/70 pt-3 text-sm leading-relaxed text-ink-600">
              Taqwaa stores your preferences (city, favourites) locally on your device only.
              We do not collect personal data, use cookies for tracking, or require an
              account. Prayer-time and Quran requests are made directly to their public APIs.
            </p>
          </details>

          <details className="card group p-5 open:bg-white sm:p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between font-arabic text-sm font-bold text-ink-900 [&::-webkit-details-marker]:hidden">
              Terms of Use
              <span className="text-gold-700 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-3 border-t border-ink-200/70 pt-3 text-sm leading-relaxed text-ink-600">
              Taqwaa is offered free of charge for personal, non-commercial use. While we
              strive for accuracy of timings and texts, please verify with your local
              mosque. Quranic text is provided by alquran.cloud; timings by aladhan.com.
            </p>
          </details>
        </section>
      </div>
    </div>
  );
}
