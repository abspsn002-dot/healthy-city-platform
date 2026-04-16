'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { mockNews } from '@/data/mock';
import { useState } from 'react';

export default function AdminNewsPage() {
  const [news, setNews] = useState(mockNews);

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الخبر؟')) {
      setNews((prev) => prev.filter((n) => n.id !== id));
    }
  };

  const columns = [
    {
      key: 'title_ar',
      label: 'العنوان بالعربية',
      render: (val: unknown) => (
        <span className="font-medium text-gray-900 line-clamp-1">{String(val)}</span>
      ),
    },
    {
      key: 'title_en',
      label: 'Title (EN)',
      render: (val: unknown) => (
        <span className="text-gray-500 text-sm line-clamp-1 dir-ltr">{String(val)}</span>
      ),
    },
    {
      key: 'featured',
      label: 'مميز',
      render: (val: unknown) =>
        val ? (
          <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">
            مميز
          </span>
        ) : (
          <span className="text-gray-400 text-xs">—</span>
        ),
    },
    {
      key: 'created_at',
      label: 'تاريخ النشر',
      render: (val: unknown) => (
        <span className="text-gray-500 text-sm">
          {new Date(String(val)).toLocaleDateString('ar-SA')}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout title="إدارة الأخبار">
      <DataTable
        title="الأخبار والمستجدات"
        data={news}
        columns={columns}
        addHref="/admin/news/new"
        addLabel="إضافة خبر"
        editPrefix="/admin/news"
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
}
