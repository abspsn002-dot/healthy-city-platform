'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Heart, Leaf, Users } from 'lucide-react';

const goals = [
  {
    icon: Heart,
    title_ar: 'تعزيز الصحة الجسدية',
    title_en: 'Promote Physical Health',
    desc_ar: 'تشجيع النشاط البدني وتوفير مرافق رياضية في متناول الجميع',
    desc_en: 'Encouraging physical activity and providing accessible sports facilities for all',
    color: 'green',
  },
  {
    icon: Shield,
    title_ar: 'الصحة الوقائية',
    title_en: 'Preventive Health',
    desc_ar: 'تطبيق أفضل ممارسات الوقاية من الأمراض وتعزيز التطعيمات',
    desc_en: 'Implementing best disease prevention practices and promoting vaccination',
    color: 'teal',
  },
  {
    icon: Leaf,
    title_ar: 'بيئة صحية نظيفة',
    title_en: 'Clean Healthy Environment',
    desc_ar: 'تحسين جودة الهواء والمياه وتوسيع المساحات الخضراء الحضرية',
    desc_en: 'Improving air and water quality and expanding urban green spaces',
    color: 'emerald',
  },
  {
    icon: Users,
    title_ar: 'المجتمع المتكاتف',
    title_en: 'Cohesive Community',
    desc_ar: 'بناء شراكات مجتمعية فاعلة لتحقيق الأهداف الصحية المشتركة',
    desc_en: 'Building effective community partnerships to achieve shared health goals',
    color: 'cyan',
  },
];

const colorMap: Record<string, string> = {
  green: 'bg-green-50 text-green-700 border-green-100',
  teal: 'bg-teal-50 text-teal-700 border-teal-100',
  emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  cyan: 'bg-cyan-50 text-cyan-700 border-cyan-100',
};

const iconBgMap: Record<string, string> = {
  green: 'bg-green-100 text-green-700',
  teal: 'bg-teal-100 text-teal-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  cyan: 'bg-cyan-100 text-cyan-700',
};

export default function OverviewSection() {
  const { lang } = useLanguage();

  return (
    <section id="overview" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-100 mb-5">
              {lang === 'ar' ? 'نبذة عن البرنامج' : 'About the Program'}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {lang === 'ar'
                ? 'رؤية متكاملة لمدينة أكثر صحة وحيوية'
                : 'An Integrated Vision for a Healthier, More Vibrant City'}
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6 text-base">
              {lang === 'ar'
                ? 'يُعدّ برنامج المدينة الصحية مبادرة وطنية شاملة تسعى إلى دمج الصحة العامة في جميع جوانب الحياة الحضرية، من البيئة والمجتمع إلى البنية التحتية والسياسات العامة.'
                : 'The Healthy City Program is a comprehensive national initiative that seeks to integrate public health into all aspects of urban life, from the environment and community to infrastructure and public policy.'}
            </p>
            <p className="text-gray-500 leading-relaxed text-base">
              {lang === 'ar'
                ? 'من خلال شراكات استراتيجية مع الجهات الحكومية والقطاع الخاص والمنظمات الدولية، نعمل على بناء بيئة حضرية داعمة للصحة والرفاهية لجميع السكان.'
                : 'Through strategic partnerships with government agencies, private sector and international organizations, we work to build an urban environment supportive of health and well-being for all residents.'}
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-green-600" />
                {lang === 'ar' ? 'معتمد من وزارة الصحة' : 'Approved by Ministry of Health'}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-teal-600" />
                {lang === 'ar' ? 'بدعم من منظمة الصحة العالمية' : 'Supported by WHO'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {goals.map((goal) => {
              const Icon = goal.icon;
              return (
                <div
                  key={goal.title_en}
                  className={`p-5 rounded-2xl border card-hover ${colorMap[goal.color]}`}
                >
                  <div className={`w-10 h-10 rounded-xl ${iconBgMap[goal.color]} flex items-center justify-center mb-4`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-sm mb-2">
                    {lang === 'ar' ? goal.title_ar : goal.title_en}
                  </h3>
                  <p className="text-xs leading-relaxed opacity-80">
                    {lang === 'ar' ? goal.desc_ar : goal.desc_en}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
