'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';

export default function CTASection() {
  const { lang, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="section-padding bg-gradient-to-br from-green-800 to-teal-700 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative container-custom text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
            {lang === 'ar'
              ? 'كن جزءًا من التغيير نحو مدينة أكثر صحة'
              : 'Be Part of the Change Towards a Healthier City'}
          </h2>
          <p className="text-white/75 text-lg mb-10">
            {lang === 'ar'
              ? 'سجّل الآن للمشاركة في مبادراتنا وفعالياتنا وكن شريكًا في بناء مستقبل صحي مستدام'
              : 'Register now to participate in our initiatives and events and be a partner in building a sustainable healthy future'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/participate"
              className="inline-flex items-center gap-2 bg-white text-green-800 hover:bg-green-50 transition-all duration-200 rounded-xl px-7 py-3.5 font-bold text-base shadow-lg group"
            >
              {lang === 'ar' ? 'شارك معنا الآن' : 'Participate Now'}
              <ArrowIcon
                size={18}
                className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
              />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white hover:bg-white/20 transition-all duration-200 rounded-xl px-7 py-3.5 font-semibold text-base"
            >
              <Mail size={18} />
              {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
