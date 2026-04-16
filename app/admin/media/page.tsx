'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { mockMediaFiles } from '@/data/mock';
import { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon, Film, Eye } from 'lucide-react';
import Link from 'next/link';

export default function AdminMediaPage() {
  const [media, setMedia] = useState(mockMediaFiles);
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');

  const filtered = filter === 'all' ? media : media.filter((m) => m.file_type === filter);

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الملف؟')) {
      setMedia((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <AdminLayout title="مكتبة الوسائط">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">مكتبة الوسائط</h2>
            <p className="text-sm text-gray-500 mt-0.5">{media.length} ملف</p>
          </div>
          <Link
            href="/admin/media/new"
            className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
          >
            <Plus size={16} />
            رفع ملف جديد
          </Link>
        </div>

        <div className="flex items-center gap-2 border-b border-gray-100 pb-1">
          {(['all', 'image', 'video'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === type
                  ? 'bg-green-100 text-green-800'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {type === 'all' ? 'الكل' : type === 'image' ? 'صور' : 'فيديو'}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
            <p>لا توجد ملفات</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filtered.map((file) => (
              <div
                key={file.id}
                className="group relative bg-gray-100 rounded-xl overflow-hidden aspect-square border border-gray-200 hover:border-green-300 transition-all"
              >
                {file.file_type === 'image' ? (
                  <img
                    src={file.file_url}
                    alt={file.title_ar}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800">
                    <Film size={32} className="text-white/60" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <a
                    href={file.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
                    title="معاينة"
                  >
                    <Eye size={16} />
                  </a>
                  <button
                    onClick={() => handleDelete(file.id)}
                    className="p-2 bg-red-500/80 hover:bg-red-600 rounded-lg text-white transition-colors"
                    title="حذف"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                  <p className="text-white text-xs truncate">{file.title_ar}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
