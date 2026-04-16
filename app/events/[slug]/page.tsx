'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import PublicLayout from '@/components/public/layout/PublicLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockEvents } from '@/data/mock';
import { getLocalizedField, formatDate } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Users, ExternalLink, Clock, Building } from 'lucide-react';

export default function EventDetailPage() {
  const { slug } = useParams();
  const { lang, isRTL } = useLanguage();
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const event = mockEvents.find((e) => e.slug === slug);

  if (!event) {
    return (
      <PublicLayout>
        <div className="container-custom py-32 text-center text-gray-400">
          <p>{lang === 'ar' ? 'الفعالية غير موجودة' : 'Event not found'}</p>
          <Link href="/events" className="mt-4 inline-block text-green-700 hover:underline">
            {lang === 'ar' ? 'العودة إلى الفعاليات' : 'Back to Events'}
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-custom py-4">
          <Link href="/events" className="inline-flex items-center gap-2 text-gray-500 hover:text-green-700 text-sm transition-colors">
            <BackArrow size={16} />
            {lang === 'ar' ? 'الفعاليات' : 'Events'}
          </Link>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              {event.image_url && (
                <img
                  src={event.image_url}
                  alt={getLocalizedField(event, 'title', lang)}
                  className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8"
                />
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {getLocalizedField(event, 'title', lang)}
              </h1>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {getLocalizedField(event, 'description', lang)}
              </p>
              <div className="prose text-gray-600">
                <p>
                  {lang === 'ar'
                    ? 'تفاصيل الفعالية الكاملة ستُعرض هنا. يمكن إضافة جدول أعمال الفعالية والمتحدثين والمزيد من المعلومات من خلال لوحة الإدارة.'
                    : 'Full event details will be displayed here. You can add the event agenda, speakers, and more information through the admin panel.'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">{lang === 'ar' ? 'تفاصيل الفعالية' : 'Event Details'}</h3>
                <dl className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <dt className="text-xs text-gray-400 mb-0.5">{lang === 'ar' ? 'التاريخ' : 'Date'}</dt>
                      <dd className="text-sm font-medium text-gray-700">{formatDate(event.start_date, lang)}</dd>
                    </div>
                  </div>
                  {event.location_ar && (
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <dt className="text-xs text-gray-400 mb-0.5">{lang === 'ar' ? 'الموقع' : 'Location'}</dt>
                        <dd className="text-sm font-medium text-gray-700">{getLocalizedField(event, 'location', lang)}</dd>
                      </div>
                    </div>
                  )}
                  {event.capacity && (
                    <div className="flex items-start gap-3">
                      <Users size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <dt className="text-xs text-gray-400 mb-0.5">{lang === 'ar' ? 'الطاقة الاستيعابية' : 'Capacity'}</dt>
                        <dd className="text-sm font-medium text-gray-700">{event.capacity.toLocaleString()}</dd>
                      </div>
                    </div>
                  )}
                  {event.organizer_ar && (
                    <div className="flex items-start gap-3">
                      <Building size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <dt className="text-xs text-gray-400 mb-0.5">{lang === 'ar' ? 'المنظم' : 'Organizer'}</dt>
                        <dd className="text-sm font-medium text-gray-700">{getLocalizedField(event, 'organizer', lang)}</dd>
                      </div>
                    </div>
                  )}
                </dl>
              </div>

              {event.registration_open && event.registration_url && (
                <a
                  href={event.registration_url}
                  className="hc-btn-primary w-full text-center flex items-center justify-center gap-2"
                >
                  {lang === 'ar' ? 'سجّل في الفعالية' : 'Register for Event'}
                  <ExternalLink size={16} />
                </a>
              )}

              {event.is_past && (
                <div className="bg-gray-100 text-gray-500 text-sm text-center py-3 rounded-xl">
                  {lang === 'ar' ? 'انتهت هذه الفعالية' : 'This event has ended'}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
