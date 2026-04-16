'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import ContentForm from '@/components/admin/ContentForm';

export default function NewEventPage() {
  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log('Saving event:', data);
    await new Promise((r) => setTimeout(r, 1000));
  };

  return (
    <AdminLayout title="إضافة فعالية">
      <ContentForm
        title="إضافة فعالية جديدة"
        backHref="/admin/events"
        onSubmit={handleSubmit}
        fields={[
          { name: 'event_date', label: 'تاريخ الفعالية', type: 'date' },
          { name: 'event_time', label: 'وقت الفعالية', type: 'text', placeholder: 'مثال: 10:00 صباحًا' },
          { name: 'location_ar', label: 'الموقع بالعربية', type: 'text', placeholder: 'مثال: قاعة المؤتمرات الكبرى' },
          { name: 'location_en', label: 'Location (English)', type: 'text', placeholder: 'e.g. Grand Conference Hall' },
          { name: 'capacity', label: 'الطاقة الاستيعابية', type: 'text', placeholder: 'مثال: 500 مشارك' },
          {
            name: 'registration_open',
            label: 'التسجيل مفتوح',
            type: 'checkbox',
            placeholder: 'السماح بالتسجيل عبر الموقع',
          },
          { name: 'registration_link', label: 'رابط التسجيل', type: 'text', placeholder: 'https://...' },
          { name: 'agenda_ar', label: 'جدول الأعمال بالعربية', type: 'textarea' },
          { name: 'agenda_en', label: 'Agenda (English)', type: 'textarea' },
        ]}
      />
    </AdminLayout>
  );
}
