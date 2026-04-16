'use client';

import { useState } from 'react';
import PublicLayout from '@/components/public/layout/PublicLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader';
import { mockPartners } from '@/data/mock';
import { getLocalizedField } from '@/lib/utils';
import { Building2, Globe, Heart, Briefcase, ExternalLink } from 'lucide-react';

const typeIcons: Record<string, React.ElementType> = {
  government: Building2,
  international: Globe,
  ngo: Heart,
  private: Briefcase,
};

type PartnerType = 'all' | 'government' | 'private' | 'ngo' | 'international';

export default function PartnersPage() {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<PartnerType>('all');

  const filtered = mockPartners.filter(
    (p) => p.status === 'published' && (filter === 'all' || p.partner_type === filter)
  );

  const filters: { key: PartnerType; label_ar: string; label_en: string }[] = [
    { key: 'all', label_ar: 'الجميع', label_en: 'All' },
    { key: 'government', label_ar: t.partners.government, label_en: t.partners.government },
    { key: 'private', label_ar: t.partners.private, label_en: t.partners.private },
    { key: 'ngo', label_ar: t.partners.ngo, label_en: t.partners.ngo },
    { key: 'international', label_ar: t.partners.international, label_en: t.partners.international },
  ];

  const typeBg: Record<string, string> = {
    government: 'bg-blue-50 border-blue-100',
    international: 'bg-teal-50 border-teal-100',
    ngo: 'bg-rose-50 border-rose-100',
    private: 'bg-amber-50 border-amber-100',
  };

  const typeText: Record<string, string> = {
    government: 'text-blue-700',
    international: 'text-teal-700',
    ngo: 'text-rose-700',
    private: 'text-amber-700',
  };

  return (
    <PublicLayout>
      <div className="bg-gradient-to-br from-slate-50 to-teal-50 py-16">
        <div className="container-custom">
          <SectionHeader
            title={t.partners.title}
            subtitle={t.partners.subtitle}
            align="start"
          />
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 mb-10">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === f.key
                    ? 'bg-green-700 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {lang === 'ar' ? f.label_ar : f.label_en}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((partner) => {
              const Icon = typeIcons[partner.partner_type] || Building2;
              return (
                <div
                  key={partner.id}
                  className={`group rounded-2xl border p-6 text-center card-hover ${typeBg[partner.partner_type]}`}
                >
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:shadow-md transition-shadow">
                    <Icon size={28} className={typeText[partner.partner_type]} />
                  </div>
                  <h3 className={`font-bold text-sm mb-2 ${typeText[partner.partner_type]}`}>
                    {getLocalizedField(partner, 'name', lang)}
                  </h3>
                  {partner.description_ar && (
                    <p className="text-gray-500 text-xs line-clamp-2">
                      {getLocalizedField(partner, 'description', lang)}
                    </p>
                  )}
                  {partner.website_url && (
                    <a
                      href={partner.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-green-700 transition-colors"
                    >
                      <ExternalLink size={11} />
                      {lang === 'ar' ? 'الموقع الرسمي' : 'Official Website'}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-green-700">
        <div className="container-custom text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {lang === 'ar' ? 'كن شريكًا في بناء المدينة الصحية' : 'Become a Partner in Building the Healthy City'}
          </h2>
          <p className="text-white/75 mb-8 max-w-xl mx-auto">
            {lang === 'ar'
              ? 'نرحب بالشراكة مع جميع الجهات الحكومية والقطاع الخاص والمنظمات التي تشاطرنا رؤيتنا'
              : 'We welcome partnerships with all government bodies, private sector, and organizations that share our vision'}
          </p>
          <a
            href="mailto:partnerships@healthycity.sa"
            className="inline-flex items-center gap-2 bg-white text-green-700 hover:bg-green-50 transition-colors px-7 py-3.5 rounded-xl font-bold shadow-lg"
          >
            {lang === 'ar' ? 'تواصل معنا للشراكة' : 'Contact Us for Partnership'}
          </a>
        </div>
      </section>
    </PublicLayout>
  );
}
