'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { ArrowRight, Upload, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

export default function NewMediaPage() {
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('url');
  const [form, setForm] = useState({ title_ar: '', title_en: '', url: '', type: 'image', alt_ar: '', alt_en: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <AdminLayout title="رفع ملف جديد">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/media" className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
            <ArrowRight size={18} />
          </Link>
          <div>
            <h2 className="text-xl font-bold text-gray-900">رفع ملف جديد</h2>
            <p className="text-sm text-gray-500">إضافة صورة أو فيديو لمكتبة الوسائط</p>
          </div>
        </div>

        {success ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload size={24} className="text-green-700" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">تم الرفع بنجاح!</h3>
            <p className="text-gray-500 mb-5 text-sm">تمت إضافة الملف إلى مكتبة الوسائط.</p>
            <div className="flex justify-center gap-3">
              <button onClick={() => setSuccess(false)} className="px-4 py-2 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-medium">
                رفع ملف آخر
              </button>
              <Link href="/admin/media" className="px-4 py-2 text-sm border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                العودة للمكتبة
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <div className="flex gap-2 mb-2">
              {(['url', 'file'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setUploadMode(m)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    uploadMode === m ? 'bg-green-100 text-green-800' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {m === 'url' ? <><LinkIcon size={14} /> رابط URL</> : <><Upload size={14} /> رفع ملف</>}
                </button>
              ))}
            </div>

            {uploadMode === 'url' ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">رابط الملف</label>
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
                  dir="ltr"
                />
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-green-300 transition-colors cursor-pointer">
                <Upload size={28} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">اسحب الملف هنا أو <span className="text-green-600 font-medium">اختر ملفًا</span></p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, MP4 حتى 50MB</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">نوع الملف</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
              >
                <option value="image">صورة</option>
                <option value="video">فيديو</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">العنوان بالعربية</label>
                <input
                  type="text"
                  value={form.title_ar}
                  onChange={(e) => setForm({ ...form, title_ar: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title (English)</label>
                <input
                  type="text"
                  value={form.title_en}
                  onChange={(e) => setForm({ ...form, title_en: e.target.value })}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
              <Link href="/admin/media" className="px-4 py-2 text-sm border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                إلغاء
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors font-semibold disabled:opacity-60 flex items-center gap-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> جارٍ الرفع...</>
                ) : (
                  <><Upload size={15} /> رفع الملف</>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </AdminLayout>
  );
}
