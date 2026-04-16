'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { mockInitiatives, mockNews, mockEvents, mockPartners } from '@/data/mock';
import {
  Target, Newspaper, Calendar, Handshake, Users, Mail,
  TrendingUp, Eye, Clock,
} from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'المبادرات', value: mockInitiatives.length, icon: Target, color: 'green', href: '/admin/initiatives' },
  { label: 'الأخبار', value: mockNews.length, icon: Newspaper, color: 'blue', href: '/admin/news' },
  { label: 'الفعاليات', value: mockEvents.length, icon: Calendar, color: 'teal', href: '/admin/events' },
  { label: 'الشركاء', value: mockPartners.length, icon: Handshake, color: 'amber', href: '/admin/partners' },
  { label: 'رسائل جديدة', value: 3, icon: Mail, color: 'rose', href: '/admin/messages' },
  { label: 'طلبات مشاركة', value: 7, icon: Users, color: 'orange', href: '/admin/participation' },
];

const colorMap: Record<string, string> = {
  green: 'bg-green-100 text-green-700',
  blue: 'bg-blue-100 text-blue-700',
  teal: 'bg-teal-100 text-teal-700',
  amber: 'bg-amber-100 text-amber-700',
  rose: 'bg-rose-100 text-rose-700',
  orange: 'bg-orange-100 text-orange-700',
};

const recentActivity = [
  { action: 'تم نشر مبادرة جديدة', item: 'برنامج الحياة النشطة', time: 'منذ دقيقتين', icon: Target, color: 'green' },
  { action: 'رسالة تواصل جديدة', item: 'أحمد محمد - استفسار', time: 'منذ 15 دقيقة', icon: Mail, color: 'blue' },
  { action: 'تم إضافة خبر', item: 'المؤتمر السنوي 2025', time: 'منذ ساعة', icon: Newspaper, color: 'teal' },
  { action: 'طلب مشاركة جديد', item: 'فاطمة علي - التطوع', time: 'منذ 3 ساعات', icon: Users, color: 'amber' },
  { action: 'تم تحديث فعالية', item: 'ماراثون المدينة 2025', time: 'منذ 5 ساعات', icon: Calendar, color: 'rose' },
];

export default function AdminDashboard() {
  const published = mockInitiatives.filter((i) => i.status === 'published').length;
  const drafts = mockInitiatives.filter((i) => i.status === 'draft').length;

  return (
    <AdminLayout title="لوحة التحكم">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">مرحبًا، مدير النظام</h1>
            <p className="text-gray-500 text-sm mt-1">
              {new Date().toLocaleDateString('ar-SA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-3 py-2">
            <TrendingUp size={16} className="text-green-700" />
            <span className="text-green-700 text-sm font-semibold">النظام يعمل بشكل طبيعي</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-green-100 transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl ${colorMap[stat.color]} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon size={18} />
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-gray-500 text-xs mt-0.5">{stat.label}</p>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-900">النشاط الأخير</h2>
              <Clock size={16} className="text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, i) => {
                const Icon = activity.icon;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-lg ${colorMap[activity.color]} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={15} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-500 truncate">{activity.item}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h2 className="font-bold text-gray-900 mb-4">حالة المبادرات</h2>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-600">منشورة</span>
                    <span className="font-semibold text-green-700">{published}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${(published / (published + drafts || 1)) * 100}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-600">مسودات</span>
                    <span className="font-semibold text-gray-500">{drafts}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gray-300 rounded-full"
                      style={{ width: `${(drafts / (published + drafts || 1)) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-700 to-teal-600 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-1">إضافة محتوى جديد</h3>
              <p className="text-white/70 text-xs mb-4">ابدأ بإضافة مبادرة أو خبر جديد</p>
              <div className="flex flex-col gap-2">
                <Link href="/admin/initiatives/new" className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg text-center transition-colors">
                  + إضافة مبادرة
                </Link>
                <Link href="/admin/news/new" className="bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg text-center transition-colors">
                  + إضافة خبر
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
