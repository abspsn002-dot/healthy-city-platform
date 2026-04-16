'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { Mail, Search, Eye, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const mockMessages = [
  {
    id: '1',
    full_name: 'أحمد محمد السالم',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    subject: 'استفسار عن برامج التطوع',
    message: 'أود الاستفسار عن البرامج المتاحة للتطوع في مجال الصحة العامة وكيفية الانضمام إليها.',
    created_at: '2024-11-15T10:30:00Z',
    read: false,
  },
  {
    id: '2',
    full_name: 'سارة عبدالله الحربي',
    email: 'sara@example.com',
    phone: '+966559876543',
    subject: 'شراكة مؤسسية',
    message: 'نحن مؤسسة صحية نسعى للتعاون معكم في مجال توعية المجتمع.',
    created_at: '2024-11-14T14:20:00Z',
    read: true,
  },
  {
    id: '3',
    full_name: 'خالد عمر الزهراني',
    email: 'khalid@example.com',
    phone: '',
    subject: 'اقتراح لمبادرة جديدة',
    message: 'أقترح إطلاق مبادرة للتوعية بأهمية ممارسة الرياضة في الأماكن العامة.',
    created_at: '2024-11-13T09:15:00Z',
    read: true,
  },
  {
    id: '4',
    full_name: 'نورة سعد القحطاني',
    email: 'noura@example.com',
    phone: '+966543210987',
    subject: 'الاستفسار عن فعالية قادمة',
    message: 'هل يمكنني الاستفسار عن تفاصيل ملتقى الصحة والمجتمع القادم؟',
    created_at: '2024-11-12T16:45:00Z',
    read: false,
  },
];

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState(mockMessages);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<typeof mockMessages[0] | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = messages.filter(
    (m) =>
      m.full_name.includes(search) ||
      m.email.includes(search) ||
      m.subject.includes(search)
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const unreadCount = messages.filter((m) => !m.read).length;

  const markRead = (id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selected?.id === id) setSelected(null);
    }
  };

  return (
    <AdminLayout title="رسائل التواصل">
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">رسائل التواصل</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {messages.length} رسالة
              {unreadCount > 0 && (
                <span className="ms-2 inline-flex items-center bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  {unreadCount} غير مقروءة
                </span>
              )}
            </p>
          </div>
          <div className="relative">
            <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="بحث..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="ps-9 pe-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 w-60"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {paginated.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Mail size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">لا توجد رسائل</p>
                </div>
              ) : (
                paginated.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => { setSelected(msg); markRead(msg.id); }}
                    className={`w-full text-start p-4 hover:bg-gray-50 transition-colors ${
                      selected?.id === msg.id ? 'bg-green-50 border-s-2 border-green-600' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          {!msg.read && (
                            <span className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0" />
                          )}
                          <p className={`text-sm truncate ${!msg.read ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}>
                            {msg.full_name}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{msg.subject}</p>
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {new Date(msg.created_at).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">{msg.message}</p>
                  </button>
                ))
              )}
            </div>
            {totalPages > 1 && (
              <div className="border-t border-gray-100 px-4 py-3 flex items-center justify-between">
                <span className="text-xs text-gray-500">صفحة {page} من {totalPages}</span>
                <div className="flex gap-1">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1} className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 transition-colors">
                    <ChevronRight size={14} />
                  </button>
                  <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="p-1.5 rounded-md hover:bg-gray-100 disabled:opacity-30 transition-colors">
                    <ChevronLeft size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-3">
            {selected ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{selected.subject}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(selected.created_at).toLocaleString('ar-SA')}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="حذف"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-20">الاسم:</span>
                    <span className="font-medium text-gray-900">{selected.full_name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 w-20">البريد:</span>
                    <a href={`mailto:${selected.email}`} className="text-green-600 hover:underline" dir="ltr">
                      {selected.email}
                    </a>
                  </div>
                  {selected.phone && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 w-20">الهاتف:</span>
                      <span dir="ltr" className="text-gray-700">{selected.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">نص الرسالة:</p>
                  <div className="bg-white border border-gray-100 rounded-lg p-4 text-sm text-gray-700 leading-relaxed">
                    {selected.message}
                  </div>
                </div>

                <a
                  href={`mailto:${selected.email}?subject=رد: ${selected.subject}`}
                  className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                >
                  <Mail size={15} />
                  الرد بالبريد الإلكتروني
                </a>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 flex items-center justify-center h-64 text-gray-400">
                <div className="text-center">
                  <Eye size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">اختر رسالة لعرضها</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
