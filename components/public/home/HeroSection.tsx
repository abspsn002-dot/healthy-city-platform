'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, ArrowRight, Play, ChevronDown } from 'lucide-react';

export default function HeroSection() {
  const { t, isRTL, lang } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-teal-800">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute inset-0">
        <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-green-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute bottom-1/4 end-1/4 w-80 h-80 bg-teal-400 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative container-custom py-24">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/90 text-sm font-medium">{t.hero.badge}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
            {t.hero.title}{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-teal-300">
              {t.hero.subtitle}
            </span>
          </h1>

          <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
            {t.hero.description}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/initiatives"
              className="inline-flex items-center gap-2 bg-white text-green-800 hover:bg-green-50 transition-all duration-200 rounded-xl px-7 py-3.5 font-bold text-base shadow-lg hover:shadow-xl group"
            >
              {t.hero.cta_primary}
              <ArrowIcon
                size={18}
                className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </Link>
            <Link
              href="/participate"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 transition-all duration-200 rounded-xl px-7 py-3.5 font-semibold text-base"
            >
              {t.hero.cta_secondary}
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-8 mt-14 pt-10 border-t border-white/20">
            {[
              { value: '+500K', label: lang === 'ar' ? 'مستفيد' : 'Beneficiaries' },
              { value: '+120', label: lang === 'ar' ? 'مبادرة' : 'Initiatives' },
              { value: '13', label: lang === 'ar' ? 'مدينة' : 'Cities' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-3xl font-bold text-white">{stat.value}</span>
                <span className="text-white/60 text-sm mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#overview"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors cursor-pointer"
      >
        <span className="text-xs">{lang === 'ar' ? 'اكتشف' : 'Scroll'}</span>
        <ChevronDown size={20} className="animate-bounce" />
      </a>
    </section>
  );
}
