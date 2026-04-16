'use client';

import { useState } from 'react';
import Link from 'next/link';
import PublicLayout from '@/components/public/layout/PublicLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader';
import { mockNews } from '@/data/mock';
import { getLocalizedField, formatDateShort } from '@/lib/utils';
import { Calendar, User, ArrowLeft, ArrowRight, Search } from 'lucide-react';

export default function NewsPage() {
  const { lang, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const [search, setSearch] = useState('');

  const published = mockNews.filter((n) => {
    const title = getLocalizedField(n, 'title', lang).toLowerCase();
    return n.status === 'published' && (!search || title.includes(search.toLowerCase()));
  });

  const featured = published.find((n) => n.featured);
  const rest = published.filter((n) => !n.featured);

  return (
    <PublicLayout>
      <div className="bg-gradient-to-br from-slate-50 to-green-50 py-16">
        <div className="container-custom">
          <SectionHeader
            title={lang === 'ar' ? 'الأخبار' : 'News'}
            subtitle={lang === 'ar' ? 'آخر المستجدات والأخبار المتعلقة ببرنامج المدينة الصحية' : 'Latest updates and news related to the Healthy City program'}
            align="start"
          />
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="relative max-w-md mb-10">
            <Search size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === 'ar' ? 'ابحث في الأخبار...' : 'Search news...'}
              className="w-full ps-10 pe-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
            />
          </div>

          {featured && !search && (
            <Link
              href={`/news/${featured.slug}`}
              className="group relative rounded-2xl overflow-hidden mb-10 block bg-gray-900 shadow-lg"
              style={{ minHeight: '400px' }}
            >
              {featured.image_url && (
                <img
                  src={featured.image_url}
                  alt={getLocalizedField(featured, 'title', lang)}
                  className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
              <div className="absolute bottom-0 p-8 max-w-3xl">
                <span className="inline-block bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {lang === 'ar' ? 'مقال مميز' : 'Featured Article'}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors leading-snug">
                  {getLocalizedField(featured, 'title', lang)}
                </h2>
                <p className="text-white/70 line-clamp-2 mb-4">
                  {getLocalizedField(featured, 'description', lang)}
                </p>
                <div className="flex items-center gap-4 text-white/60 text-sm">
                  {featured.published_at && (
                    <span className="flex items-center gap-2">
                      <Calendar size={14} />
                      {formatDateShort(featured.published_at, lang)}
                    </span>
                  )}
                  {featured.author_ar && (
                    <span className="flex items-center gap-2">
                      <User size={14} />
                      {lang === 'ar' ? featured.author_ar : featured.author_en}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article) => (
              <Link
                key={article.id}
                href={`/news/${article.slug}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover shadow-sm"
              >
                {article.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.image_url}
                      alt={getLocalizedField(article, 'title', lang)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  {article.category_ar && (
                    <span className="inline-block text-xs font-semibold text-green-700 bg-green-50 px-2.5 py-1 rounded-full mb-3">
                      {lang === 'ar' ? article.category_ar : article.category_en}
                    </span>
                  )}
                  <h3 className="font-bold text-gray-900 text-base leading-snug line-clamp-2 mb-2 group-hover:text-green-700 transition-colors">
                    {getLocalizedField(article, 'title', lang)}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                    {getLocalizedField(article, 'description', lang)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    {article.published_at && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} />
                        {formatDateShort(article.published_at, lang)}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-green-700 font-medium group-hover:gap-2 transition-all">
                      {lang === 'ar' ? 'اقرأ المزيد' : 'Read More'}
                      <ArrowIcon size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {published.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <Search size={40} className="mx-auto mb-4 opacity-40" />
              <p>{lang === 'ar' ? 'لا توجد نتائج' : 'No results found'}</p>
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
