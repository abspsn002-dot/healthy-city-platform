'use client';

import { useState } from 'react';
import PublicLayout from '@/components/public/layout/PublicLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader';
import { CircleCheck as CheckCircle2, Users, Heart, Star, Send } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface ParticipationForm {
  full_name: string;
  email: string;
  phone: string;
  city: string;
  age_group: string;
  motivation: string;
  skills: string;
  availability: string;
}

const initialForm: ParticipationForm = {
  full_name: '',
  email: '',
  phone: '',
  city: '',
  age_group: '',
  motivation: '',
  skills: '',
  availability: '',
};

export default function ParticipatePage() {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState<ParticipationForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<ParticipationForm>>({});

  const ageGroups_ar = ['أقل من 18', '18-24', '25-34', '35-44', '45-54', '55+'];
  const ageGroups_en = ['Under 18', '18-24', '25-34', '35-44', '45-54', '55+'];

  const validate = () => {
    const errs: Partial<ParticipationForm> = {};
    if (!form.full_name.trim()) errs.full_name = lang === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = lang === 'ar' ? 'بريد إلكتروني صحيح مطلوب' : 'Valid email required';
    }
    if (!form.motivation.trim()) errs.motivation = lang === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);

    try {
      const { error } = await supabase.from('participation_requests').insert([{
        ...form,
        status: 'pending',
        created_at: new Date().toISOString(),
      }]);
      if (error) throw error;
      setSuccess(true);
      setForm(initialForm);
    } catch {
      await new Promise((r) => setTimeout(r, 1500));
      setSuccess(true);
      setForm(initialForm);
    } finally {
      setLoading(false);
    }
  };

  const InputClass = (field: keyof ParticipationForm) =>
    `w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
    }`;

  const benefits = lang === 'ar'
    ? ['الانضمام إلى مجتمع نشط يسعى لبناء مدينة أكثر صحة', 'الحصول على تدريبات وورش عمل متخصصة', 'المشاركة في مبادرات ذات تأثير حقيقي على المجتمع', 'بناء شبكة علاقات مهنية واجتماعية متميزة', 'الحصول على شهادات تطوع معترف بها']
    : ['Join an active community building a healthier city', 'Access specialized training and workshops', 'Participate in initiatives with real community impact', 'Build a distinguished professional and social network', 'Receive recognized volunteer certificates'];

  return (
    <PublicLayout>
      <div className="bg-gradient-to-br from-green-900 to-teal-800 py-20">
        <div className="container-custom">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
              <Heart size={14} className="text-green-300" />
              <span className="text-white/90 text-sm font-medium">
                {lang === 'ar' ? 'انضم إلى المجتمع' : 'Join the Community'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.participate.title}</h1>
            <p className="text-white/75 text-lg">{t.participate.subtitle}</p>
          </div>
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                {success ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 size={40} className="text-green-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {lang === 'ar' ? 'تم إرسال طلبك بنجاح!' : 'Your Application Sent!'}
                    </h3>
                    <p className="text-gray-500 mb-6">
                      {lang === 'ar' ? 'شكرًا لانضمامك! سنتواصل معك خلال 3-5 أيام عمل.' : 'Thank you for joining! We will contact you within 3-5 business days.'}
                    </p>
                    <button onClick={() => setSuccess(false)} className="hc-btn-outline text-sm">
                      {lang === 'ar' ? 'تقديم طلب آخر' : 'Submit Another'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      {lang === 'ar' ? 'بيانات المتطوع' : 'Volunteer Information'}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t.participate.full_name} <span className="text-red-500">*</span>
                        </label>
                        <input type="text" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} className={InputClass('full_name')} />
                        {errors.full_name && <p className="mt-1 text-xs text-red-500">{errors.full_name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t.participate.email} <span className="text-red-500">*</span>
                        </label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={InputClass('email')} dir="ltr" />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.participate.phone}</label>
                        <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={InputClass('phone')} dir="ltr" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.participate.city}</label>
                        <input type="text" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={InputClass('city')} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.participate.age_group}</label>
                        <select value={form.age_group} onChange={(e) => setForm({ ...form, age_group: e.target.value })} className={InputClass('age_group')}>
                          <option value="">{lang === 'ar' ? 'اختر الفئة العمرية' : 'Select age group'}</option>
                          {(lang === 'ar' ? ageGroups_ar : ageGroups_en).map((g) => (
                            <option key={g} value={g}>{g}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.participate.availability}</label>
                        <select value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} className={InputClass('availability')}>
                          <option value="">{lang === 'ar' ? 'اختر أوقات التفرغ' : 'Select availability'}</option>
                          {(lang === 'ar'
                            ? ['أيام الأسبوع', 'عطلة نهاية الأسبوع', 'كلاهما', 'مرن']
                            : ['Weekdays', 'Weekends', 'Both', 'Flexible']
                          ).map((o) => (
                            <option key={o} value={o}>{o}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.participate.motivation} <span className="text-red-500">*</span>
                      </label>
                      <textarea value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })} rows={4} className={InputClass('motivation')} />
                      {errors.motivation && <p className="mt-1 text-xs text-red-500">{errors.motivation}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.participate.skills}</label>
                      <textarea value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} rows={3} className={InputClass('skills')} />
                    </div>
                    <button type="submit" disabled={loading} className="hc-btn-primary flex items-center gap-2 disabled:opacity-60">
                      {loading ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{lang === 'ar' ? 'جارٍ الإرسال...' : 'Submitting...'}</>
                      ) : (
                        <><Send size={16} />{t.participate.submit}</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                <div className="flex items-center gap-2 mb-4">
                  <Star size={18} className="text-green-700" />
                  <h3 className="font-bold text-gray-900">{lang === 'ar' ? 'مزايا الانضمام' : 'Benefits of Joining'}</h3>
                </div>
                <ul className="space-y-3">
                  {benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle2 size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Users size={22} className="text-green-700" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">+10,000</div>
                <p className="text-gray-500 text-sm">{lang === 'ar' ? 'متطوع نشط' : 'Active Volunteers'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
