'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import ContentForm from '@/components/admin/ContentForm';

export default function NewNewsPage() {
  const handleSubmit = async (data: Record<string, unknown>) => {
    console.log('Saving news:', data);
    await new Promise((r) => setTimeout(r, 1000));
  };

  return (
    <AdminLayout title="إضافة خبر">
      <ContentForm
        title="إضافة خبر جديد"
        backHref="/admin/news"
        onSubmit={handleSubmit}
        fields={[
          {
            name: 'featured',
            label: 'خبر مميز',
            type: 'checkbox',
            placeholder: 'عرضه في الصفحة الرئيسية',
          },
          {
            name: 'content_ar',
            label: 'المحتوى الكامل بالعربية',
            type: 'textarea',
            placeholder: 'اكتب نص الخبر الكامل...',
          },
          {
            name: 'content_en',
            label: 'Full Content (English)',
            type: 'textarea',
            placeholder: 'Write the full news content...',
          },
          {
            name: 'tags_ar',
            label: 'الوسوم بالعربية',
            type: 'text',
            placeholder: 'مثال: صحة، بيئة، مجتمع (مفصولة بفواصل)',
          },
          {
            name: 'tags_en',
            label: 'Tags (English)',
            type: 'text',
            placeholder: 'e.g. health, environment, community',
          },
        ]}
      />
    </AdminLayout>
  );
}
