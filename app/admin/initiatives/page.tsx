'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { mockInitiatives, mockCategories } from '@/data/mock';
import { formatDateShort } from '@/lib/utils';
import type { Initiative } from '@/lib/types';

export default function AdminInitiativesPage() {
  const [data, setData] = useState<Initiative[]>(mockInitiatives);

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا العنصر؟')) {
      setData((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const columns = [
    {
      key: 'title_ar',
      label: 'العنوان',
      render: (_: unknown, row: Record<string, unknown>) => (
        <div>
          <div className="font-medium text-gray-900 line-clamp-1">{row.title_ar as string}</div>
          <div className="text-xs text-gray-400 line-clamp-1">{row.title_en as string}</div>
        </div>
      ),
    },
    {
      key: 'category_id',
      label: 'التصنيف',
      render: (value: unknown) => {
        const cat = mockCategories.find((c) => c.id === value);
        return cat ? (
          <span className="inline-block bg-green-50 text-green-700 text-xs px-2.5 py-0.5 rounded-full border border-green-100">
            {cat.name_ar}
          </span>
        ) : '-';
      },
    },
    {
      key: 'start_date',
      label: 'تاريخ البدء',
      render: (value: unknown) => value ? formatDateShort(value as string, 'ar') : '-',
      className: 'whitespace-nowrap',
    },
    {
      key: 'featured',
      label: 'مميز',
      render: (value: unknown) => (
        <span className={`text-xs font-semibold ${value ? 'text-green-600' : 'text-gray-400'}`}>
          {value ? 'نعم' : 'لا'}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout title="المبادرات">
      <DataTable
        title="إدارة المبادرات"
        addLabel="إضافة مبادرة"
        addHref="/admin/initiatives/new"
        columns={columns}
        data={data as unknown as Record<string, unknown>[]}
        onDelete={handleDelete}
        viewPrefix="initiatives"
        editPrefix="/admin/initiatives"
      />
    </AdminLayout>
  );
}
