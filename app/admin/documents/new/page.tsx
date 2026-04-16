'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import ContentForm from '@/components/admin/ContentForm';

export default function NewDocumentPage() {
  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log('Saving document:', data);
    await new Promise((r) => setTimeout(r, 1000));
  };

  return (
    <AdminLayout title="إضافة مستند">
      <ContentForm
        title="إضافة مستند جديد"
        backHref="/admin/documents"
        onSubmit={handleSubmit}
        fields={[
          {
            name: 'type',
            label: 'نوع المستند',
            type: 'select',
            options: [
              { value: 'report', label: 'تقرير' },
              { value: 'guide', label: 'دليل' },
              { value: 'form', label: 'نموذج' },
              { value: 'publication', label: 'منشور' },
              { value: 'other', label: 'أخرى' },
            ],
          },
          {
            name: 'file_url',
            label: 'رابط الملف',
            type: 'text',
            placeholder: 'https://... أو رفع الملف',
          },
          {
            name: 'file_size',
            label: 'حجم الملف',
            type: 'text',
            placeholder: 'مثال: 2.5 MB',
          },
          {
            name: 'language',
            label: 'لغة المستند',
            type: 'select',
            options: [
              { value: 'ar', label: 'عربي' },
              { value: 'en', label: 'إنجليزي' },
              { value: 'both', label: 'عربي وإنجليزي' },
            ],
          },
          {
            name: 'year',
            label: 'سنة الإصدار',
            type: 'text',
            placeholder: 'مثال: 2024',
          },
        ]}
      />
    </AdminLayout>
  );
}
