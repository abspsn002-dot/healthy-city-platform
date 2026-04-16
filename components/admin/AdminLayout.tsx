'use client';

import { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Menu, Bell, User, Search } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 font-arabic overflow-hidden" dir="rtl">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-100 h-16 flex items-center justify-between px-4 md:px-6 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-500"
            >
              <Menu size={20} />
            </button>
            {title && (
              <h1 className="text-gray-900 font-bold text-lg hidden md:block">{title}</h1>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:flex items-center">
              <Search size={15} className="absolute start-3 text-gray-400" />
              <input
                type="text"
                placeholder="بحث..."
                className="ps-9 pe-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 w-48"
              />
            </div>

            <button className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-500">
              <Bell size={18} />
              <span className="absolute top-1.5 start-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center gap-2 ps-2 border-s border-gray-200 ms-1">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-teal-500 flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
              <div className="hidden md:flex flex-col text-xs">
                <span className="font-semibold text-gray-800">مدير النظام</span>
                <span className="text-gray-400">admin@healthycity.sa</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
