'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader';
import { mockNews } from '@/data/mock';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import { getLocalizedField, formatDateShort } from '@/lib/utils';

export default function NewsSection() {
  const { t, lang, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const featured = mockNews.find((n) => n.featured);
  const rest = mockNews.filter((n) => !n.featured && n.status === 'published').slice(0, 3);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <SectionHeader
            title={t.news.title}
            subtitle={t.news.subtitle}
            align="start"
          />
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold text-sm whitespace-nowrap group"
          >
            {t.news.view_all}
            <ArrowIcon size={16} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {featured && (
            <Link
              href={`/news/${featured.slug}`}
              className="lg:col-span-3 group relative rounded-2xl overflow-hidden bg-gray-900 shadow-lg card-hover"
              style={{ minHeight: '380px' }}
            >
              {featured.image_url && (
                <img
                  src={featured.image_url}
                  alt={getLocalizedField(featured, 'title', lang)}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
              <div className="absolute bottom-0 p-6">
                {featured.category_ar && (
                  <span className="inline-block bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
                    {lang === 'ar' ? featured.category_ar : featured.category_en}
                  </span>
                )}
                <h3 className="text-white font-bold text-xl leading-snug mb-3 group-hover:text-green-300 transition-colors">
                  {getLocalizedField(featured, 'title', lang)}
                </h3>
                <p className="text-white/70 text-sm line-clamp-2 mb-4">
                  {getLocalizedField(featured, 'description', lang)}
                </p>
                <div className="flex items-center gap-4 text-white/60 text-xs">
                  {featured.published_at && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {formatDateShort(featured.published_at, lang)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          )}

          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group bg-white rounded-xl border border-gray-100 overflow-hidden card-hover shadow-sm flex gap-4 p-4"
              >
                {article.image_url && (
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={article.image_url}
                      alt={getLocalizedField(article, 'title', lang)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-green-700 transition-colors mb-2">
                    {getLocalizedField(article, 'title', lang)}
                  </h3>
                  {article.published_at && (
                    <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                      <Calendar size={11} />
                      <span>{formatDateShort(article.published_at, lang)}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
