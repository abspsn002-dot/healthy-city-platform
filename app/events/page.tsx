'use client';

import { useState } from 'react';
import Link from 'next/link';
import PublicLayout from '@/components/public/layout/PublicLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader';
import { mockEvents } from '@/data/mock';
import { getLocalizedField, formatDate } from '@/lib/utils';
import { Calendar, MapPin, Users, ArrowLeft, ArrowRight, Clock } from 'lucide-react';

export default function EventsPage() {
  const { lang, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcoming = mockEvents.filter((e) => !e.is_past && e.status === 'published');
  const past = mockEvents.filter((e) => e.is_past && e.status === 'published');
  const displayed = tab === 'upcoming' ? upcoming : past;

  return (
    <PublicLayout>
      <div className="bg-gradient-to-br from-slate-50 to-teal-50 py-16">
        <div className="container-custom">
          <SectionHeader
            title={lang === 'ar' ? 'الفعاليات' : 'Events'}
            subtitle={lang === 'ar' ? 'تابع أحدث فعالياتنا وسجّل مشاركتك الآن' : 'Follow our latest events and register your participation now'}
            align="start"
          />
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex gap-2 mb-10 border-b border-gray-200">
            {[
              { key: 'upcoming', label_ar: 'الفعاليات القادمة', label_en: 'Upcoming Events' },
              { key: 'past', label_ar: 'الفعاليات السابقة', label_en: 'Past Events' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setTab(item.key as 'upcoming' | 'past')}
                className={`pb-3 px-4 text-sm font-medium border-b-2 transition-all -mb-px ${
                  tab === item.key
                    ? 'border-green-700 text-green-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {lang === 'ar' ? item.label_ar : item.label_en}
                <span className="ms-1.5 text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                  {item.key === 'upcoming' ? upcoming.length : past.length}
                </span>
              </button>
            ))}
          </div>

          {displayed.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <Calendar size={40} className="mx-auto mb-4 opacity-40" />
              <p>{lang === 'ar' ? 'لا توجد فعاليات' : 'No events available'}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayed.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.slug}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover shadow-sm"
                >
                  {event.image_url && (
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={event.image_url}
                        alt={getLocalizedField(event, 'title', lang)}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {event.registration_open && (
                        <span className="absolute top-3 end-3 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          {lang === 'ar' ? 'التسجيل مفتوح' : 'Registration Open'}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-base mb-3 group-hover:text-green-700 transition-colors leading-snug line-clamp-2">
                      {getLocalizedField(event, 'title', lang)}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                      {getLocalizedField(event, 'description', lang)}
                    </p>
                    <div className="space-y-2 text-xs text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={13} />
                        <span>{formatDate(event.start_date, lang)}</span>
                      </div>
                      {event.location_ar && (
                        <div className="flex items-center gap-2">
                          <MapPin size={13} />
                          <span>{getLocalizedField(event, 'location', lang)}</span>
                        </div>
                      )}
                      {event.capacity && (
                        <div className="flex items-center gap-2">
                          <Users size={13} />
                          <span>
                            {lang === 'ar'
                              ? `الطاقة الاستيعابية: ${event.capacity.toLocaleString('ar-SA')}`
                              : `Capacity: ${event.capacity.toLocaleString()}`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
