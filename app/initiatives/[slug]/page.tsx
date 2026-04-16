'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import PublicLayout from '@/components/public/layout/PublicLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import { mockInitiatives, mockCategories } from '@/data/mock';
import { getLocalizedField, formatDate } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Target, CircleCheck as CheckCircle2 } from 'lucide-react';

export default function InitiativeDetailPage() {
  const { slug } = useParams();
  const { lang, isRTL } = useLanguage();
  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  const initiative = mockInitiatives.find((i) => i.slug === slug);

  if (!initiative) {
    return (
      <PublicLayout>
        <div className="container-custom py-32 text-center text-gray-400">
          <p className="text-xl">{lang === 'ar' ? 'المبادرة غير موجودة' : 'Initiative not found'}</p>
          <Link href="/initiatives" className="mt-4 inline-block text-green-700 hover:underline">
            {lang === 'ar' ? 'العودة إلى المبادرات' : 'Back to Initiatives'}
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const category = mockCategories.find((c) => c.id === initiative.category_id);

  return (
    <PublicLayout>
      <div className="bg-gradient-to-br from-gray-900 to-green-900 relative overflow-hidden">
        {initiative.image_url && (
          <img
            src={initiative.image_url}
            alt={getLocalizedField(initiative, 'title', lang)}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        )}
        <div className="relative container-custom py-16">
          <Link
            href="/initiatives"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <BackArrow size={16} />
            {lang === 'ar' ? 'المبادرات' : 'Initiatives'}
          </Link>
          <div className="max-w-3xl">
            {category && (
              <span className="inline-block bg-green-500/20 border border-green-400/30 text-green-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                {getLocalizedField(category, 'name', lang)}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {getLocalizedField(initiative, 'title', lang)}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              {getLocalizedField(initiative, 'description', lang)}
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-8">
              {(initiative.goals_ar || initiative.goals_en) && (
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                  <div className="flex items-center gap-2 mb-4">
                    <Target size={20} className="text-green-700" />
                    <h2 className="font-bold text-gray-900 text-lg">
                      {lang === 'ar' ? 'أهداف المبادرة' : 'Initiative Goals'}
                    </h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {getLocalizedField(initiative, 'goals', lang)}
                  </p>
                </div>
              )}

              {(initiative.outcomes_ar || initiative.outcomes_en) && (
                <div className="bg-teal-50 rounded-2xl p-6 border border-teal-100">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 size={20} className="text-teal-700" />
                    <h2 className="font-bold text-gray-900 text-lg">
                      {lang === 'ar' ? 'النتائج والإنجازات' : 'Outcomes & Achievements'}
                    </h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {getLocalizedField(initiative, 'outcomes', lang)}
                  </p>
                </div>
              )}

              <div className="prose max-w-none text-gray-600">
                <p className="leading-relaxed text-base">
                  {lang === 'ar'
                    ? 'تُعدّ هذه المبادرة من أبرز المبادرات ضمن برنامج المدينة الصحية، وتستهدف تحسين جودة الحياة الصحية لشرائح واسعة من المجتمع. تعتمد المبادرة على منهجية متكاملة تجمع بين التوعية والتدخل المباشر وتطوير البيئة.'
                    : 'This initiative is one of the most prominent initiatives within the Healthy City Program, targeting the improvement of health quality of life for wide segments of society. The initiative relies on an integrated methodology combining awareness, direct intervention, and environmental development.'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">
                  {lang === 'ar' ? 'تفاصيل المبادرة' : 'Initiative Details'}
                </h3>
                <dl className="space-y-3">
                  {initiative.start_date && (
                    <div className="flex items-start gap-3">
                      <Calendar size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <dt className="text-xs text-gray-400 mb-0.5">
                          {lang === 'ar' ? 'تاريخ البدء' : 'Start Date'}
                        </dt>
                        <dd className="text-sm font-medium text-gray-700">
                          {formatDate(initiative.start_date, lang)}
                        </dd>
                      </div>
                    </div>
                  )}
                  {(initiative.location_ar || initiative.location_en) && (
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <dt className="text-xs text-gray-400 mb-0.5">
                          {lang === 'ar' ? 'الموقع' : 'Location'}
                        </dt>
                        <dd className="text-sm font-medium text-gray-700">
                          {getLocalizedField(initiative, 'location', lang)}
                        </dd>
                      </div>
                    </div>
                  )}
                </dl>
              </div>

              <div className="bg-green-700 rounded-2xl p-5 text-white">
                <h3 className="font-bold mb-3">
                  {lang === 'ar' ? 'شارك في هذه المبادرة' : 'Join This Initiative'}
                </h3>
                <p className="text-white/75 text-sm mb-4">
                  {lang === 'ar'
                    ? 'انضم إلينا وكن جزءًا من هذه المبادرة الهادفة'
                    : 'Join us and be part of this meaningful initiative'}
                </p>
                <Link href="/participate" className="block text-center bg-white text-green-700 font-semibold py-2.5 rounded-xl hover:bg-green-50 transition-colors text-sm">
                  {lang === 'ar' ? 'سجّل الآن' : 'Register Now'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
