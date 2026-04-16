'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Plus, Pencil, Trash2, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import StatusBadge from '@/components/shared/StatusBadge';
import { cn } from '@/lib/utils';
import type { ContentStatus } from '@/lib/types';

interface Column {
  key: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: unknown, row: any) => React.ReactNode;
  className?: string;
}

interface DataTableProps {
  title: string;
  addLabel?: string;
  addHref?: string;
  columns: Column[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  onDelete?: (id: string) => void;
  viewPrefix?: string;
  editPrefix?: string;
}

const PAGE_SIZE = 8;

export default function DataTable({
  title,
  addLabel = 'إضافة',
  addHref,
  columns,
  data,
  onDelete,
  viewPrefix,
  editPrefix,
}: DataTableProps) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = data.filter((row) =>
    Object.values(row).some((val) =>
      String(val ?? '').toLowerCase().includes(search.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-gray-900">{title}</h2>
          <p className="text-gray-400 text-xs mt-0.5">{filtered.length} عنصر</p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search size={14} className="absolute top-1/2 -translate-y-1/2 start-3 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="بحث..."
              className="w-full sm:w-48 ps-9 pe-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            />
          </div>
          {addHref && (
            <Link
              href={addHref}
              className="inline-flex items-center gap-1.5 bg-green-700 hover:bg-green-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
            >
              <Plus size={15} />
              {addLabel}
            </Link>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-start px-4 py-3 text-xs font-semibold text-gray-500 w-10">#</th>
              {columns.map((col) => (
                <th key={col.key} className={cn('text-start px-4 py-3 text-xs font-semibold text-gray-500', col.className)}>
                  {col.label}
                </th>
              ))}
              <th className="text-start px-4 py-3 text-xs font-semibold text-gray-500">الحالة</th>
              <th className="text-start px-4 py-3 text-xs font-semibold text-gray-500 w-28">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 3} className="text-center py-16 text-gray-400">
                  <p className="text-sm">لا توجد بيانات</p>
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr key={row.id as string} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </td>
                  {columns.map((col) => (
                    <td key={col.key} className={cn('px-4 py-3 text-sm text-gray-700', col.className)}>
                      {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '-')}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <StatusBadge status={row.status as ContentStatus} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {viewPrefix && (
                        <Link
                          href={`/${viewPrefix}/${row.slug ?? row.id}`}
                          target="_blank"
                          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-green-700 transition-colors"
                          title="عرض"
                        >
                          <Eye size={15} />
                        </Link>
                      )}
                      {editPrefix && (
                        <Link
                          href={`${editPrefix}/${row.id}/edit`}
                          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-700 transition-colors"
                          title="تعديل"
                        >
                          <Pencil size={15} />
                        </Link>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row.id as string)}
                          className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-600 transition-colors"
                          title="حذف"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-400">
            عرض {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} من {filtered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-40 hover:bg-gray-50"
            >
              <ChevronRight size={14} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn('w-8 h-8 rounded-lg text-sm font-medium transition-all', p === page ? 'bg-green-700 text-white' : 'border border-gray-200 text-gray-500 hover:bg-gray-50')}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 disabled:opacity-40 hover:bg-gray-50"
            >
              <ChevronLeft size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
