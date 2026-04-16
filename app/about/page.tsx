'use client';

import PublicLayout from '@/components/public/layout/PublicLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader';
import { Eye, Target, Compass, Users as Users2, CircleCheck as CheckCircle2 } from 'lucide-react';

const objectives_ar = [
  'تعزيز جودة الحياة الصحية لجميع السكان بغض النظر عن مستوياتهم الاجتماعية والاقتصادية',
  'الحد من انتشار الأمراض غير المعدية من خلال التوعية وتغيير أنماط السلوك الصحي',
  'بناء بيئة حضرية داعمة للصحة من خلال تطوير البنية التحتية والمساحات العامة',
  'تعزيز الشراكات بين الجهات الحكومية والقطاع الخاص والمجتمع المدني',
  'تطوير المنظومة الصحية الشاملة بما يشمل الرعاية الصحية الأولية والوقائية',
  'دمج مفهوم المدينة الصحية في السياسات العامة والتخطيط الحضري',
];

const objectives_en = [
  'Enhance quality of healthy life for all residents regardless of their socioeconomic levels',
  'Reduce the spread of non-communicable diseases through awareness and behavioral change',
  'Build a health-supporting urban environment through infrastructure and public space development',
  'Strengthen partnerships between government, private sector, and civil society',
  'Develop the comprehensive health system including primary and preventive care',
  'Integrate the healthy city concept into public policies and urban planning',
];

const committee = [
  { role_ar: 'رئيس اللجنة', role_en: 'Committee Chair', name_ar: 'معالي وزير الصحة', name_en: 'H.E. Minister of Health' },
  { role_ar: 'نائب الرئيس', role_en: 'Vice Chair', name_ar: 'رئيس الهيئة الوطنية للصحة', name_en: 'President, National Health Authority' },
  { role_ar: 'عضو', role_en: 'Member', name_ar: 'أمين المدينة', name_en: 'City Mayor' },
  { role_ar: 'عضو', role_en: 'Member', name_ar: 'ممثل منظمة الصحة العالمية', name_en: 'WHO Representative' },
  { role_ar: 'عضو', role_en: 'Member', name_ar: 'ممثل القطاع الخاص', name_en: 'Private Sector Representative' },
  { role_ar: 'عضو', role_en: 'Member', name_ar: 'ممثل المجتمع المدني', name_en: 'Civil Society Representative' },
];

export default function AboutPage() {
  const { lang } = useLanguage();

  return (
    <PublicLayout>
      <div className="bg-gradient-to-br from-green-50 to-teal-50 py-16">
        <div className="container-custom">
          <div className="max-w-2xl">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold border border-green-200 mb-4">
              {lang === 'ar' ? 'تعرف علينا' : 'Know Us'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {lang === 'ar' ? 'عن البرنامج' : 'About the Program'}
            </h1>
            <p className="text-gray-500 text-lg">
              {lang === 'ar'
                ? 'تعرّف على قصة برنامج المدينة الصحية ورؤيته ورسالته وأهدافه الاستراتيجية'
                : 'Learn about the story, vision, mission, and strategic goals of the Healthy City Program'}
            </p>
          </div>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeader
                title={lang === 'ar' ? 'من نحن' : 'Who We Are'}
                align="start"
                className="mb-6"
              />
              <div className="space-y-4 text-gray-500 leading-relaxed">
                <p>
                  {lang === 'ar'
                    ? 'برنامج المدينة الصحية هو مبادرة وطنية شاملة أُطلقت بهدف تحويل المدن إلى بيئات حضرية داعمة للصحة والرفاهية، من خلال التكامل بين منظومة الصحة العامة والتخطيط الحضري والسياسات الاجتماعية.'
                    : 'The Healthy City Program is a comprehensive national initiative launched to transform cities into urban environments supporting health and well-being, through integration of the public health system, urban planning, and social policies.'}
                </p>
                <p>
                  {lang === 'ar'
                    ? 'يستند البرنامج إلى مبادئ منظمة الصحة العالمية للمدينة الصحية، ويُعدّ نموذجًا يُحتذى به في المنطقة العربية، ويهدف إلى تحقيق رؤية متكاملة تضمن لجميع المواطنين حق التمتع بأعلى مستوى من الصحة والرفاهية.'
                    : 'The program is based on the WHO Healthy City principles and is a role model in the Arab region, aiming to achieve an integrated vision that ensures all citizens the right to enjoy the highest level of health and well-being.'}
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="About the program"
                className="rounded-2xl shadow-xl w-full"
              />
              <div className="absolute -bottom-4 -start-4 bg-green-700 text-white p-4 rounded-xl shadow-lg">
                <div className="text-2xl font-bold">2019</div>
                <div className="text-xs opacity-80">
                  {lang === 'ar' ? 'سنة التأسيس' : 'Year Founded'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-700 flex items-center justify-center mb-5">
                <Eye size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {lang === 'ar' ? 'رؤيتنا' : 'Our Vision'}
              </h3>
              <p className="text-gray-500 leading-relaxed">
                {lang === 'ar'
                  ? 'مدينة صحية متكاملة توفر لجميع سكانها بيئة داعمة للصحة الجسدية والنفسية والاجتماعية، وتحتل مكانة ريادية إقليميًا وعالميًا في مجال صحة المدن.'
                  : 'An integrated healthy city that provides all its residents with an environment supporting physical, mental and social health, and occupies a leading regional and global position in urban health.'}
              </p>
            </div>
            <div className="bg-green-700 rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-white/20 text-white flex items-center justify-center mb-5">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {lang === 'ar' ? 'رسالتنا' : 'Our Mission'}
              </h3>
              <p className="text-white/80 leading-relaxed">
                {lang === 'ar'
                  ? 'تعزيز الصحة الشاملة في البيئة الحضرية من خلال الشراكات الاستراتيجية والمبادرات المجتمعية والسياسات الصحية المتكاملة، مع التركيز على العدالة الصحية والاستدامة.'
                  : 'Promoting comprehensive health in the urban environment through strategic partnerships, community initiatives and integrated health policies, with a focus on health equity and sustainability.'}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5">
                <Compass size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {lang === 'ar' ? 'قيمنا' : 'Our Values'}
              </h3>
              <ul className="space-y-2">
                {(lang === 'ar'
                  ? ['الشمولية والعدالة الصحية', 'الشراكة والتعاون', 'الابتكار والاستدامة', 'الشفافية والمساءلة']
                  : ['Inclusivity & Health Equity', 'Partnership & Collaboration', 'Innovation & Sustainability', 'Transparency & Accountability']
                ).map((v) => (
                  <li key={v} className="flex items-center gap-2 text-gray-600 text-sm">
                    <CheckCircle2 size={16} className="text-teal-600 flex-shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            title={lang === 'ar' ? 'أهدافنا الاستراتيجية' : 'Our Strategic Objectives'}
            align="center"
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {(lang === 'ar' ? objectives_ar : objectives_en).map((obj, i) => (
              <div key={i} className="flex items-start gap-4 bg-gray-50 rounded-xl p-5">
                <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                  {i + 1}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <SectionHeader
            title={lang === 'ar' ? 'لجنة الحوكمة' : 'Governance Committee'}
            subtitle={lang === 'ar' ? 'اللجنة العليا المشرفة على برنامج المدينة الصحية' : 'The supreme committee overseeing the Healthy City Program'}
            align="center"
            className="mb-14"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {committee.map((member, i) => (
              <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center mx-auto mb-3">
                  <Users2 size={24} className="text-green-700" />
                </div>
                <div className="text-xs font-semibold text-green-700 mb-1">
                  {lang === 'ar' ? member.role_ar : member.role_en}
                </div>
                <div className="text-sm font-bold text-gray-800">
                  {lang === 'ar' ? member.name_ar : member.name_en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
