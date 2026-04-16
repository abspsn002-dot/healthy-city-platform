'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Save, Eye, Upload, CircleAlert as AlertCircle } from 'lucide-react';
import type { ContentStatus } from '@/lib/types';

interface ContentFormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'checkbox' | 'image';
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  lang?: 'ar' | 'en' | 'both';
}

interface ContentFormProps {
  title: string;
  backHref: string;
  fields?: ContentFormField[];
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  extraFields?: React.ReactNode;
}

export default function ContentForm({
  title,
  backHref,
  fields = [],
  initialData = {},
  onSubmit,
  extraFields,
}: ContentFormProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({
    status: 'draft' as ContentStatus,
    ...initialData,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError('حدث خطأ أثناء الحفظ. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const InputClass = 'w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all bg-white';

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <Link href={backHref} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700">
            <ArrowRight size={18} />
          </Link>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={formData.status as string}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="border border-gray-200 rounded-lg text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
          >
            <option value="draft">مسودة</option>
            <option value="published">منشور</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors disabled:opacity-60"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={16} />
            )}
            حفظ
          </button>
        </div>
      </div>

      {success && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-4">
          تم الحفظ بنجاح
        </div>
      )}
      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
          <AlertCircle size={15} className="mt-0.5 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-semibold text-gray-800 mb-5">المحتوى الأساسي</h2>
            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    العنوان بالعربية <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={(formData.title_ar as string) || ''}
                    onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                    className={InputClass}
                    placeholder="أدخل العنوان بالعربية"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    العنوان بالإنجليزية
                  </label>
                  <input
                    type="text"
                    value={(formData.title_en as string) || ''}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    className={InputClass}
                    placeholder="Enter title in English"
                    dir="ltr"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">الوصف بالعربية</label>
                  <textarea
                    value={(formData.description_ar as string) || ''}
                    onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                    rows={4}
                    className={InputClass}
                    placeholder="أدخل الوصف بالعربية"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">الوصف بالإنجليزية</label>
                  <textarea
                    value={(formData.description_en as string) || ''}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    rows={4}
                    className={InputClass}
                    placeholder="Enter description in English"
                    dir="ltr"
                  />
                </div>
              </div>

              {fields.filter((f) => !['title', 'description'].includes(f.name)).map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={(formData[field.name] as string) || ''}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      rows={4}
                      className={InputClass}
                      placeholder={field.placeholder}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      value={(formData[field.name] as string) || ''}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className={InputClass}
                    >
                      <option value="">اختر...</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : field.type === 'date' ? (
                    <input
                      type="date"
                      value={(formData[field.name] as string) || ''}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className={InputClass}
                    />
                  ) : field.type === 'checkbox' ? (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!(formData[field.name])}
                        onChange={(e) => setFormData({ ...formData, [field.name]: e.target.checked })}
                        className="w-4 h-4 accent-green-700 rounded"
                      />
                      <span className="text-sm text-gray-600">{field.placeholder || field.label}</span>
                    </label>
                  ) : (
                    <input
                      type="text"
                      value={(formData[field.name] as string) || ''}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      className={InputClass}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}

              {extraFields}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">الصورة الرئيسية</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-green-400 transition-colors cursor-pointer">
              {formData.image_url ? (
                <div>
                  <img src={formData.image_url as string} alt="" className="w-full h-32 object-cover rounded-lg mb-3" />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image_url: '' })}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    إزالة الصورة
                  </button>
                </div>
              ) : (
                <div>
                  <Upload size={28} className="mx-auto text-gray-300 mb-2" />
                  <p className="text-sm text-gray-400 mb-1">اسحب وأفلت الصورة هنا</p>
                  <p className="text-xs text-gray-300">أو</p>
                  <button
                    type="button"
                    className="mt-2 text-xs text-green-700 font-medium hover:text-green-800"
                  >
                    اختر من الجهاز
                  </button>
                </div>
              )}
            </div>
            <div className="mt-3">
              <label className="block text-xs font-medium text-gray-600 mb-1">أو أدخل رابط الصورة</label>
              <input
                type="url"
                value={(formData.image_url as string) || ''}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-green-500/20 focus:border-green-500"
                placeholder="https://..."
                dir="ltr"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">إعدادات النشر</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">حالة المحتوى</label>
                <select
                  value={formData.status as string}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500/20 focus:border-green-500"
                >
                  <option value="draft">مسودة</option>
                  <option value="published">منشور</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">الرابط المختصر (Slug)</label>
                <input
                  type="text"
                  value={(formData.slug as string) || ''}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-green-500/20 focus:border-green-500 font-mono"
                  placeholder="url-slug"
                  dir="ltr"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
