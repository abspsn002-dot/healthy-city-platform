'use client';

import { useState } from 'react';
import Link from 'next/link';
import PublicLayout from '@/components/public/layout/PublicLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader';
import StatusBadge from '@/components/shared/StatusBadge';
import { mockInitiatives, mockCategories } from '@/data/mock';
import { getLocalizedField, formatDateShort } from '@/lib/utils';
import { Search, Filter, Calendar, MapPin } from 'lucide-react';

export default function InitiativesPage() {
  const { lang, t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = mockInitiatives.filter((i) => {
    const title = getLocalizedField(i, 'title', lang).toLowerCase();
    const desc = getLocalizedField(i, 'description', lang).toLowerCase();
    const matchesSearch = !search || title.includes(search.toLowerCase()) || desc.includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || i.category_id === selectedCategory;
    return matchesSearch && matchesCategory && i.status === 'published';
  });

  return (
    <PublicLayout>
      <div className="bg-gradient-to-br from-green-50 to-teal-50 py-16">
        <div className="container-custom">
          <SectionHeader
            title={lang === 'ar' ? 'المبادرات' : 'Initiatives'}
            subtitle={lang === 'ar' ? 'استكشف جميع مبادراتنا الهادفة إلى بناء مجتمع صحي' : 'Explore all our initiatives aimed at building a healthy community'}
            align="start"
          />
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search size={16} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={lang === 'ar' ? 'ابحث عن مبادرة...' : 'Search initiatives...'}
                className="w-full ps-10 pe-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <Filter size={16} className="text-gray-400 flex-shrink-0" />
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-green-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t.initiatives.filter_all}
              </button>
              {mockCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-green-700 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {getLocalizedField(cat, 'name', lang)}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Search size={40} className="mx-auto mb-4 opacity-40" />
              <p className="text-lg">{t.common.empty}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((initiative) => {
                const category = mockCategories.find((c) => c.id === initiative.category_id);
                return (
                  <Link
                    key={initiative.id}
                    href={`/initiatives/${initiative.slug}`}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover shadow-sm"
                  >
                    <div className="relative h-52 overflow-hidden bg-gray-100">
                      {initiative.image_url ? (
                        <img
                          src={initiative.image_url}
                          alt={getLocalizedField(initiative, 'title', lang)}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                          <span className="text-4xl font-bold text-green-200">م</span>
                        </div>
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
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                        {initiative.start_date && (
                          <span className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {formatDateShort(initiative.start_date, lang)}
                          </span>
                        )}
                        {initiative.location_ar && (
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} />
                            {getLocalizedField(initiative, 'location', lang)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
