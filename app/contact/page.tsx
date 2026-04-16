'use client';

import { useState } from 'react';
import PublicLayout from '@/components/public/layout/PublicLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import SectionHeader from '@/components/shared/SectionHeader';
import { mockFAQs } from '@/data/mock';
import { getLocalizedField } from '@/lib/utils';
import { Send, MapPin, Phone, Mail, CircleCheck as CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const { lang, t } = useLanguage();
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const validate = () => {
    const errs: Partial<ContactForm> = {};
    if (!form.name.trim()) errs.name = lang === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = lang === 'ar' ? 'بريد إلكتروني صحيح مطلوب' : 'Valid email is required';
    }
    if (!form.message.trim()) errs.message = lang === 'ar' ? 'الرسالة مطلوبة' : 'Message is required';
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const InputClass = (field: keyof ContactForm) =>
    `w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all ${
      errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white'
    }`;

  return (
    <PublicLayout>
      <div className="bg-gradient-to-br from-slate-50 to-green-50 py-16">
        <div className="container-custom">
          <SectionHeader
            title={t.contact.title}
            subtitle={t.contact.subtitle}
            align="start"
          />
        </div>
      </div>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                {success ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} className="text-green-700" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{t.contact.success}</h3>
                    <p className="text-gray-500 text-sm mb-6">
                      {lang === 'ar' ? 'سنتواصل معك في أقرب وقت ممكن' : 'We will get back to you as soon as possible'}
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="hc-btn-outline text-sm"
                    >
                      {lang === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t.contact.name} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className={InputClass('name')}
                          placeholder={lang === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          {t.contact.email} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className={InputClass('email')}
                          placeholder={lang === 'ar' ? 'example@email.com' : 'example@email.com'}
                          dir="ltr"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.contact.phone}</label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className={InputClass('phone')}
                          placeholder="+966 5x xxx xxxx"
                          dir="ltr"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">{t.contact.subject}</label>
                        <input
                          type="text"
                          value={form.subject}
                          onChange={(e) => setForm({ ...form, subject: e.target.value })}
                          className={InputClass('subject')}
                          placeholder={lang === 'ar' ? 'موضوع الرسالة' : 'Message subject'}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.contact.message} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        rows={5}
                        className={InputClass('message')}
                        placeholder={lang === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                      />
                      {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="hc-btn-primary flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          {lang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...'}
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          {t.contact.send}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-5">{t.footer.contact_info}</h3>
                <ul className="space-y-4">
                  {[
                    { icon: MapPin, text: t.footer.address },
                    { icon: Phone, text: t.footer.phone, isLtr: true },
                    { icon: Mail, text: t.footer.email },
                  ].map(({ icon: Icon, text, isLtr }) => (
                    <li key={text} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
                        <Icon size={16} />
                      </div>
                      <span className={`text-gray-600 text-sm mt-1.5 ${isLtr ? 'font-mono' : ''}`} dir={isLtr ? 'ltr' : undefined}>
                        {text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-700 rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">{lang === 'ar' ? 'ساعات العمل' : 'Working Hours'}</h3>
                <p className="text-white/75 text-sm">
                  {lang === 'ar' ? 'الأحد – الخميس: 8:00 صباحًا – 4:00 مساءً' : 'Sun – Thu: 8:00 AM – 4:00 PM'}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-gray-100">
            <SectionHeader
              title={t.contact.faq_title}
              align="start"
              className="mb-8"
            />
            <div className="max-w-3xl space-y-3">
              {mockFAQs.filter((f) => f.status === 'published').map((faq) => (
                <div key={faq.id} className="border border-gray-100 rounded-xl overflow-hidden bg-white">
                  <button
                    className="w-full flex items-center justify-between p-5 text-start font-medium text-gray-800 hover:text-green-700 transition-colors"
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                  >
                    <span className="text-sm">{lang === 'ar' ? faq.question_ar : faq.question_en}</span>
                    {openFaq === faq.id ? (
                      <ChevronUp size={18} className="text-green-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t border-gray-50">
                      <p className="pt-4">{lang === 'ar' ? faq.answer_ar : faq.answer_en}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
