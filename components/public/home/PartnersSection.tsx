'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader';
import { mockPartners } from '@/data/mock';
import { getLocalizedField } from '@/lib/utils';
import { Building2, Globe, Heart, Briefcase } from 'lucide-react';

const typeIcons: Record<string, React.ElementType> = {
  government: Building2,
  international: Globe,
  ngo: Heart,
  private: Briefcase,
};

const typeBg: Record<string, string> = {
  government: 'bg-blue-50 border-blue-100 text-blue-700',
  international: 'bg-teal-50 border-teal-100 text-teal-700',
  ngo: 'bg-rose-50 border-rose-100 text-rose-700',
  private: 'bg-amber-50 border-amber-100 text-amber-700',
};

export default function PartnersSection() {
  const { t, lang } = useLanguage();
  const partners = mockPartners.filter((p) => p.status === 'published').slice(0, 8);

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeader
          title={t.partners.title}
          subtitle={t.partners.subtitle}
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {partners.map((partner) => {
            const Icon = typeIcons[partner.partner_type] || Building2;
            return (
              <div
                key={partner.id}
                className={`group rounded-2xl border p-5 flex flex-col items-center text-center card-hover ${typeBg[partner.partner_type]}`}
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-3">
                  <Icon size={24} className="opacity-70" />
                </div>
                <span className="text-sm font-semibold leading-tight">
                  {getLocalizedField(partner, 'name', lang)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/partners" className="hc-btn-outline inline-flex">
            {lang === 'ar' ? 'عرض جميع الشركاء' : 'View All Partners'}
          </Link>
        </div>
      </div>
    </section>
  );
}
