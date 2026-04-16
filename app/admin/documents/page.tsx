'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { mockDocuments } from '@/data/mock';
import type { Document as HCDocument } from '@/lib/types';
import { useState } from 'react';

const docTypeLabels: Record<string, string> = {
  report: 'تقرير',
  guide: 'دليل',
  form: 'نموذج',
  publication: 'منشور',
  other: 'أخرى',
};

export default function AdminDocumentsPage() {
  const [documents, setDocuments] = useState<HCDocument[]>(mockDocuments);

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا المستند؟')) {
      setDocuments((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const columns = [
    {
      key: 'title_ar',
      label: 'اسم المستند',
      render: (val: unknown) => (
        <span className="font-medium text-gray-900 line-clamp-1">{String(val)}</span>
      ),
    },
    {
      key: 'type',
      label: 'النوع',
      render: (val: unknown) => {
        const type = String(val);
        return (
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
            {docTypeLabels[type] || type}
          </span>
        );
      },
    },
    {
      key: 'file_size',
      label: 'الحجم',
      render: (val: unknown) => (
        <span className="text-gray-500 text-sm">{val ? String(val) : '—'}</span>
      ),
    },
    {
      key: 'download_count',
      label: 'التنزيلات',
      render: (val: unknown) => (
        <span className="text-gray-700 text-sm font-medium">{val ? String(val) : '0'}</span>
      ),
    },
    {
      key: 'created_at',
      label: 'تاريخ الإضافة',
      render: (val: unknown) => (
        <span className="text-gray-500 text-sm">
          {new Date(String(val)).toLocaleDateString('ar-SA')}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout title="إدارة المستندات">
      <DataTable
        title="المستندات والوثائق"
        data={documents as unknown as Record<string, unknown>[]}
        columns={columns}
        addHref="/admin/documents/new"
        addLabel="إضافة مستند"
        editPrefix="/admin/documents"
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
}
