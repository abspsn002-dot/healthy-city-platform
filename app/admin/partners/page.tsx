'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { mockPartners } from '@/data/mock';
import { useState } from 'react';

const partnerTypeLabels: Record<string, string> = {
  government: 'حكومي',
  private: 'قطاع خاص',
  ngo: 'منظمة غير حكومية',
  academic: 'أكاديمي',
  international: 'دولي',
};

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState(mockPartners);

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الشريك؟')) {
      setPartners((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const columns = [
    {
      key: 'name_ar',
      label: 'اسم الجهة',
      render: (val: unknown) => (
        <span className="font-medium text-gray-900">{String(val)}</span>
      ),
    },
    {
      key: 'name_en',
      label: 'Name (EN)',
      render: (val: unknown) => (
        <span className="text-gray-500 text-sm dir-ltr">{String(val)}</span>
      ),
    },
    {
      key: 'type',
      label: 'النوع',
      render: (val: unknown) => {
        const type = String(val);
        const label = partnerTypeLabels[type] || type;
        const colors: Record<string, string> = {
          government: 'bg-blue-100 text-blue-700',
          private: 'bg-amber-100 text-amber-700',
          ngo: 'bg-green-100 text-green-700',
          academic: 'bg-violet-100 text-violet-700',
          international: 'bg-teal-100 text-teal-700',
        };
        return (
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors[type] || 'bg-gray-100 text-gray-600'}`}>
            {label}
          </span>
        );
      },
    },
    {
      key: 'website',
      label: 'الموقع الإلكتروني',
      render: (val: unknown) =>
        val ? (
          <a href={String(val)} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline text-sm truncate max-w-[150px] block">
            {String(val).replace('https://', '')}
          </a>
        ) : (
          <span className="text-gray-400 text-sm">—</span>
        ),
    },
  ];

  return (
    <AdminLayout title="إدارة الشركاء">
      <DataTable
        title="الشركاء والداعمون"
        data={partners}
        columns={columns}
        addHref="/admin/partners/new"
        addLabel="إضافة شريك"
        editPrefix="/admin/partners"
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
}
