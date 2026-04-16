'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Target, Newspaper, Calendar, Handshake, Image, FileText, CircleHelp as HelpCircle, Mail, Users, X, Settings, LogOut } from 'lucide-react';

const navItems = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'لوحة التحكم', label_en: 'Dashboard' },
  { href: '/admin/initiatives', icon: Target, label: 'المبادرات', label_en: 'Initiatives' },
  { href: '/admin/news', icon: Newspaper, label: 'الأخبار', label_en: 'News' },
  { href: '/admin/events', icon: Calendar, label: 'الفعاليات', label_en: 'Events' },
  { href: '/admin/partners', icon: Handshake, label: 'الشركاء', label_en: 'Partners' },
  { href: '/admin/media', icon: Image, label: 'الوسائط', label_en: 'Media' },
  { href: '/admin/documents', icon: FileText, label: 'المستندات', label_en: 'Documents' },
  { href: '/admin/faqs', icon: HelpCircle, label: 'الأسئلة الشائعة', label_en: 'FAQs' },
  { href: '/admin/messages', icon: Mail, label: 'الرسائل', label_en: 'Messages', badge: 3 },
  { href: '/admin/participation', icon: Users, label: 'طلبات المشاركة', label_en: 'Participation', badge: 7 },
];

interface AdminSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={cn(
          'fixed top-0 start-0 h-full w-64 bg-gray-900 z-40 flex flex-col transition-transform duration-300',
          'lg:translate-x-0 lg:static lg:z-auto',
          open ? 'translate-x-0' : '-translate-x-full rtl:translate-x-full'
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-600 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-base">م</span>
            </div>
            <div>
              <div className="text-white font-bold text-sm">المدينة الصحية</div>
              <div className="text-gray-400 text-xs">لوحة الإدارة</div>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white p-1">
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center justify-between gap-3 px-4 py-2.5 mx-2 rounded-xl text-sm font-medium transition-all duration-200 mb-0.5',
                  active
                    ? 'bg-green-700 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                )}
              >
                <span className="flex items-center gap-3">
                  <Icon size={18} />
                  {item.label}
                </span>
                {item.badge && (
                  <span className="bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-1">
          <Link
            href="/admin/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
          >
            <Settings size={17} />
            الإعدادات
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-all"
          >
            <LogOut size={17} />
            الموقع الرئيسي
          </Link>
        </div>
      </aside>
    </>
  );
}
