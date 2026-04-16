'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { ArrowRight, Save } from 'lucide-react';
import Link from 'next/link';

export default function NewFAQPage() {
  const [form, setForm] = useState({
    question_ar: '',
    question_en: '',
    answer_ar: '',
    answer_en: '',
    category: '',
    order: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('Saving FAQ:', form);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <AdminLayout title="إضافة سؤال">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Save size={24} className="text-green-700" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">تم الحفظ بنجاح!</h3>
          <p className="text-gray-500 mb-6 text-sm">تمت إضافة السؤال الشائع بنجاح.</p>
          <div className="flex justify-center gap-3">
            <button onClick={() => setSuccess(false)} className="px-4 py-2 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium">
              إضافة سؤال آخر
            </button>
            <Link href="/admin/faqs" className="px-4 py-2 text-sm border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              العودة للقائمة
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="إضافة سؤال شائع">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/faqs" className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <ArrowRight size={18} />
          </Link>
          <div>
            <h2 className="text-xl font-bold text-gray-900">إضافة سؤال شائع جديد</h2>
            <p className="text-sm text-gray-500">سيظهر في صفحة التواصل</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              السؤال بالعربية <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.question_ar}
              onChange={(e) => setForm({ ...form, question_ar: e.target.value })}
              required
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Question (English) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.question_en}
              onChange={(e) => setForm({ ...form, question_en: e.target.value })}
              required
              dir="ltr"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              الإجابة بالعربية <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.answer_ar}
              onChange={(e) => setForm({ ...form, answer_ar: e.target.value })}
              required
              rows={4}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Answer (English) <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.answer_en}
              onChange={(e) => setForm({ ...form, answer_en: e.target.value })}
              required
              rows={4}
              dir="ltr"
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">التصنيف</label>
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="مثال: عام، التسجيل، الفعاليات"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">الترتيب</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                placeholder="1"
                min="1"
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
            <Link href="/admin/faqs" className="px-4 py-2 text-sm border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              إلغاء
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-semibold disabled:opacity-60 flex items-center gap-2"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> جارٍ الحفظ...</>
              ) : (
                <><Save size={15} /> حفظ السؤال</>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
