'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { useState } from 'react';
import { Search, Users, ChevronLeft, ChevronRight, CircleCheck as CheckCircle2, Circle as XCircle, Clock, Eye } from 'lucide-react';

const mockParticipants = [
  {
    id: '1',
    full_name: 'محمد عبدالرحمن العتيبي',
    email: 'mohammed@example.com',
    phone: '+966501112233',
    city: 'الرياض',
    age_group: '25-34',
    motivation: 'أرغب في المساهمة في تحسين صحة مجتمعي من خلال العمل التطوعي.',
    skills: 'التصوير الفوتوغرافي، التصميم الجرافيكي',
    availability: 'عطلة نهاية الأسبوع',
    status: 'pending',
    created_at: '2024-11-15T09:00:00Z',
  },
  {
    id: '2',
    full_name: 'ريم فهد المطيري',
    email: 'reem@example.com',
    phone: '+966509876543',
    city: 'جدة',
    age_group: '18-24',
    motivation: 'طالبة في كلية الصحة العامة وأود تطبيق ما تعلمته عمليًا.',
    skills: 'التمريض، الإسعافات الأولية',
    availability: 'أيام الأسبوع',
    status: 'approved',
    created_at: '2024-11-14T11:30:00Z',
  },
  {
    id: '3',
    full_name: 'عبدالله سليمان الدوسري',
    email: 'abdullah@example.com',
    phone: '+966542345678',
    city: 'الدمام',
    age_group: '35-44',
    motivation: 'متطوع سابق في عدة مبادرات وأريد الاستمرار في العطاء.',
    skills: 'إدارة الفعاليات، التنسيق اللوجستي',
    availability: 'كلاهما',
    status: 'approved',
    created_at: '2024-11-13T15:00:00Z',
  },
  {
    id: '4',
    full_name: 'هند علي الشمري',
    email: 'hend@example.com',
    phone: '',
    city: 'مكة المكرمة',
    age_group: '45-54',
    motivation: 'أم وربة منزل أريد الاستفادة من وقت فراغي في خدمة المجتمع.',
    skills: 'الطبخ، التنظيم',
    availability: 'مرن',
    status: 'rejected',
    created_at: '2024-11-12T08:45:00Z',
  },
];

const statusConfig = {
  pending: { label: 'قيد المراجعة', icon: Clock, color: 'bg-amber-100 text-amber-700' },
  approved: { label: 'مقبول', icon: CheckCircle2, color: 'bg-green-100 text-green-700' },
  rejected: { label: 'مرفوض', icon: XCircle, color: 'bg-red-100 text-red-700' },
};

export default function AdminParticipationPage() {
  const [participants, setParticipants] = useState(mockParticipants);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selected, setSelected] = useState<typeof mockParticipants[0] | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 8;

  const filtered = participants.filter(
    (p) =>
      (statusFilter === 'all' || p.status === statusFilter) &&
      (p.full_name.includes(search) || p.email.includes(search) || p.city.includes(search))
  );
  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const pendingCount = participants.filter((p) => p.status === 'pending').length;

  const updateStatus = (id: string, status: 'approved' | 'rejected') => {
    setParticipants((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
  };

  return (
    <AdminLayout title="طلبات المشاركة">
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-gray-900">طلبات المشاركة والتطوع</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {participants.length} طلب
              {pendingCount > 0 && (
                <span className="ms-2 inline-flex items-center bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  {pendingCount} قيد المراجعة
                </span>
              )}
            </p>
          </div>
          <div className="relative">
            <Search size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="بحث بالاسم أو المدينة..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="ps-9 pe-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                statusFilter === s
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {s === 'all' ? 'الكل' : statusConfig[s].label}
              <span className="ms-1 text-xs opacity-60">
                ({s === 'all' ? participants.length : participants.filter((p) => p.status === s).length})
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {paginated.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <Users size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">لا توجد طلبات</p>
                </div>
              ) : (
                paginated.map((participant) => {
                  const status = statusConfig[participant.status as keyof typeof statusConfig];
                  const StatusIcon = status.icon;
                  return (
                    <button
                      key={participant.id}
                      onClick={() => setSelected(participant)}
                      className={`w-full text-start p-4 hover:bg-gray-50 transition-colors ${
                        selected?.id === participant.id ? 'bg-green-50 border-s-2 border-green-600' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{participant.full_name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{participant.city} • {participant.age_group}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>
                          <StatusIcon size={10} />
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1.5 line-clamp-1">{participant.motivation}</p>
                    </button>
                  );
                })
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
                    <h3 className="font-bold text-gray-900 text-lg">{selected.full_name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(selected.created_at).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                  {selected.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(selected.id, 'approved')}
                        className="flex items-center gap-1.5 text-xs bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-lg font-medium transition-colors"
                      >
                        <CheckCircle2 size={13} />
                        قبول
                      </button>
                      <button
                        onClick={() => updateStatus(selected.id, 'rejected')}
                        className="flex items-center gap-1.5 text-xs bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-lg font-medium transition-colors"
                      >
                        <XCircle size={13} />
                        رفض
                      </button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 bg-gray-50 rounded-lg p-4 text-sm">
                  {[
                    { label: 'البريد الإلكتروني', value: selected.email },
                    { label: 'الهاتف', value: selected.phone || '—' },
                    { label: 'المدينة', value: selected.city || '—' },
                    { label: 'الفئة العمرية', value: selected.age_group || '—' },
                    { label: 'أوقات التفرغ', value: selected.availability || '—' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                      <p className="font-medium text-gray-800 text-sm">{value}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">دوافع التطوع:</p>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3 leading-relaxed">{selected.motivation}</p>
                </div>

                {selected.skills && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">المهارات:</p>
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{selected.skills}</p>
                  </div>
                )}

                {selected.status !== 'pending' && (
                  <div className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium ${statusConfig[selected.status as keyof typeof statusConfig].color}`}>
                    {selected.status === 'approved' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    {statusConfig[selected.status as keyof typeof statusConfig].label}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 flex items-center justify-center h-64 text-gray-400">
                <div className="text-center">
                  <Eye size={32} className="mx-auto mb-2 opacity-30" />
                  <p className="text-sm">اختر طلبًا لعرض التفاصيل</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
