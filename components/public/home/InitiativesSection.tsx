'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader';
import { mockInitiatives, mockCategories } from '@/data/mock';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { getLocalizedField, formatDateShort } from '@/lib/utils';

export default function InitiativesSection() {
  const { t, lang, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const featured = mockInitiatives.filter((i) => i.featured && i.status === 'published').slice(0, 3);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <SectionHeader
            title={t.initiatives.title}
            subtitle={t.initiatives.subtitle}
            align="start"
          />
          <Link
            href="/initiatives"
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold text-sm whitespace-nowrap group"
          >
            {t.initiatives.view_all}
            <ArrowIcon size={16} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((initiative) => {
            const category = mockCategories.find((c) => c.id === initiative.category_id);
            return (
              <Link
                key={initiative.id}
                href={`/initiatives/${initiative.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover shadow-sm"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {initiative.image_url ? (
                    <img
                      src={initiative.image_url}
                      alt={getLocalizedField(initiative, 'title', lang)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-green-100 to-teal-100" />
                  )}
                  {category && (
                    <span className="absolute top-3 start-3 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-green-100">
                      {getLocalizedField(category, 'name', lang)}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-green-700 transition-colors leading-snug line-clamp-2">
                    {getLocalizedField(initiative, 'title', lang)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                    {getLocalizedField(initiative, 'description', lang)}
                  </p>
                  {initiative.start_date && (
                    <div className="flex items-center gap-2 text-gray-400 text-xs">
                      <Calendar size={13} />
                      <span>{formatDateShort(initiative.start_date, lang)}</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
