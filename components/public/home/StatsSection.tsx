'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Target, Users, Handshake, MapPin } from 'lucide-react';
import SectionHeader from '@/components/shared/SectionHeader';

const iconMap: Record<string, React.ElementType> = {
  target: Target,
  users: Users,
  handshake: Handshake,
  map: MapPin,
};

const colorBg: Record<string, string> = {
  green: 'from-green-500 to-green-700',
  teal: 'from-teal-500 to-teal-700',
  blue: 'from-blue-500 to-blue-700',
  emerald: 'from-emerald-500 to-emerald-700',
};

const stats = [
  { value: '+120', label_ar: 'مبادرة مُنفَّذة', label_en: 'Initiatives Launched', icon: 'target', color: 'green' },
  { value: '+500K', label_ar: 'مستفيد من البرنامج', label_en: 'Program Beneficiaries', icon: 'users', color: 'teal' },
  { value: '+85', label_ar: 'شريك استراتيجي', label_en: 'Strategic Partners', icon: 'handshake', color: 'blue' },
  { value: '13', label_ar: 'مدينة تشمل البرنامج', label_en: 'Cities Covered', icon: 'map', color: 'emerald' },
];

export default function StatsSection() {
  const { t, lang } = useLanguage();

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          title={t.stats.title}
          subtitle={t.stats.subtitle}
          align="center"
          className="mb-14"
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = iconMap[stat.icon] || Target;
            return (
              <div
                key={stat.value}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover text-center group"
              >
                <div
                  className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${colorBg[stat.color]} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 font-english">
                  {stat.value}
                </div>
                <p className="text-gray-500 text-sm font-medium">
                  {lang === 'ar' ? stat.label_ar : stat.label_en}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
