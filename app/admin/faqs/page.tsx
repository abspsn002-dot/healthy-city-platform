'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { mockFAQs } from '@/data/mock';
import { useState } from 'react';

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState(mockFAQs);

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا السؤال؟')) {
      setFaqs((prev) => prev.filter((f) => f.id !== id));
    }
  };

  const columns = [
    {
      key: 'question_ar',
      label: 'السؤال بالعربية',
      render: (val: unknown) => (
        <span className="font-medium text-gray-900 line-clamp-2">{String(val)}</span>
      ),
    },
    {
      key: 'question_en',
      label: 'Question (EN)',
      render: (val: unknown) => (
        <span className="text-gray-500 text-sm line-clamp-1 dir-ltr">{String(val)}</span>
      ),
    },
    {
      key: 'category',
      label: 'التصنيف',
      render: (val: unknown) =>
        val ? (
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {String(val)}
          </span>
        ) : (
          <span className="text-gray-400 text-xs">—</span>
        ),
    },
    {
      key: 'order',
      label: 'الترتيب',
      render: (val: unknown) => (
        <span className="text-gray-500 text-sm">{val ? String(val) : '—'}</span>
      ),
    },
  ];

  return (
    <AdminLayout title="إدارة الأسئلة الشائعة">
      <DataTable
        title="الأسئلة الشائعة"
        data={faqs}
        columns={columns}
        addHref="/admin/faqs/new"
        addLabel="إضافة سؤال"
        editPrefix="/admin/faqs"
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
}
