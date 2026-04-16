'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import ContentForm from '@/components/admin/ContentForm';

export default function NewPartnerPage() {
  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log('Saving partner:', data);
    await new Promise((r) => setTimeout(r, 1000));
  };

  return (
    <AdminLayout title="إضافة شريك">
      <ContentForm
        title="إضافة شريك جديد"
        backHref="/admin/partners"
        onSubmit={handleSubmit}
        fields={[
          {
            name: 'name_ar',
            label: 'الاسم بالعربية',
            type: 'text',
            placeholder: 'اسم الجهة الشريكة',
          },
          {
            name: 'name_en',
            label: 'Name (English)',
            type: 'text',
            placeholder: 'Partner organization name',
          },
          {
            name: 'type',
            label: 'نوع الشريك',
            type: 'select',
            options: [
              { value: 'government', label: 'حكومي' },
              { value: 'private', label: 'قطاع خاص' },
              { value: 'ngo', label: 'منظمة غير حكومية' },
              { value: 'academic', label: 'أكاديمي' },
              { value: 'international', label: 'دولي' },
            ],
          },
          { name: 'website', label: 'الموقع الإلكتروني', type: 'text', placeholder: 'https://...' },
          {
            name: 'partnership_since',
            label: 'تاريخ الشراكة',
            type: 'date',
          },
          {
            name: 'featured',
            label: 'شريك مميز',
            type: 'checkbox',
            placeholder: 'عرضه بشكل بارز في الموقع',
          },
        ]}
      />
    </AdminLayout>
  );
}
