'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { mockEvents } from '@/data/mock';
import { useState } from 'react';

export default function AdminEventsPage() {
  const [events, setEvents] = useState(mockEvents);

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الفعالية؟')) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const columns = [
    {
      key: 'title_ar',
      label: 'عنوان الفعالية',
      render: (val: unknown) => (
        <span className="font-medium text-gray-900 line-clamp-1">{String(val)}</span>
      ),
    },
    {
      key: 'event_date',
      label: 'تاريخ الفعالية',
      render: (val: unknown) => (
        <span className="text-gray-700 text-sm font-medium">
          {val ? new Date(String(val)).toLocaleDateString('ar-SA') : '—'}
        </span>
      ),
    },
    {
      key: 'location_ar',
      label: 'الموقع',
      render: (val: unknown) => (
        <span className="text-gray-500 text-sm">{val ? String(val) : '—'}</span>
      ),
    },
    {
      key: 'registration_open',
      label: 'التسجيل',
      render: (val: unknown) =>
        val ? (
          <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
            مفتوح
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            مغلق
          </span>
        ),
    },
  ];

  return (
    <AdminLayout title="إدارة الفعاليات">
      <DataTable
        title="الفعاليات والأنشطة"
        data={events as unknown as Record<string, unknown>[]}
        columns={columns}
        addHref="/admin/events/new"
        addLabel="إضافة فعالية"
        editPrefix="/admin/events"
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
}
