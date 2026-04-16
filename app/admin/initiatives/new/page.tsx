'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import ContentForm from '@/components/admin/ContentForm';
import { mockCategories } from '@/data/mock';

export default function NewInitiativePage() {
  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log('Saving initiative:', data);
    await new Promise((r) => setTimeout(r, 1000));
  };

  return (
    <AdminLayout title="إضافة مبادرة">
      <ContentForm
        title="إضافة مبادرة جديدة"
        backHref="/admin/initiatives"
        onSubmit={handleSubmit}
        fields={[
          {
            name: 'category_id',
            label: 'التصنيف',
            type: 'select',
            options: mockCategories.map((c) => ({ value: c.id, label: c.name_ar })),
          },
          { name: 'start_date', label: 'تاريخ البدء', type: 'date' },
          { name: 'end_date', label: 'تاريخ الانتهاء', type: 'date' },
          { name: 'location_ar', label: 'الموقع بالعربية', type: 'text', placeholder: 'مثال: جميع مناطق المدينة' },
          { name: 'location_en', label: 'الموقع بالإنجليزية', type: 'text', placeholder: 'e.g. All city districts' },
          { name: 'goals_ar', label: 'الأهداف بالعربية', type: 'textarea' },
          { name: 'goals_en', label: 'الأهداف بالإنجليزية', type: 'textarea' },
          { name: 'featured', label: 'مبادرة مميزة', type: 'checkbox', placeholder: 'عرضها في الصفحة الرئيسية' },
        ]}
      />
    </AdminLayout>
  );
}
