import { cn } from '@/lib/utils';

type StatusType = 'published' | 'draft' | 'active' | 'completed' | 'upcoming' | 'pending' | 'approved' | 'rejected';

interface StatusBadgeProps {
  status: StatusType;
  labelAr?: string;
  labelEn?: string;
  size?: 'sm' | 'md';
  className?: string;
}

const statusStyles: Record<StatusType, string> = {
  published: 'bg-green-50 text-green-700 border-green-200',
  active: 'bg-green-50 text-green-700 border-green-200',
  draft: 'bg-gray-50 text-gray-600 border-gray-200',
  completed: 'bg-blue-50 text-blue-700 border-blue-200',
  upcoming: 'bg-amber-50 text-amber-700 border-amber-200',
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  approved: 'bg-green-50 text-green-700 border-green-200',
  rejected: 'bg-red-50 text-red-700 border-red-200',
};

const defaultLabels: Record<StatusType, { ar: string; en: string }> = {
  published: { ar: 'منشور', en: 'Published' },
  active: { ar: 'نشطة', en: 'Active' },
  draft: { ar: 'مسودة', en: 'Draft' },
  completed: { ar: 'مكتملة', en: 'Completed' },
  upcoming: { ar: 'قادمة', en: 'Upcoming' },
  pending: { ar: 'قيد الانتظار', en: 'Pending' },
  approved: { ar: 'مقبول', en: 'Approved' },
  rejected: { ar: 'مرفوض', en: 'Rejected' },
};

export default function StatusBadge({
  status,
  labelAr,
  labelEn,
  size = 'sm',
  className,
}: StatusBadgeProps) {
  const sizeClass = size === 'sm' ? 'text-xs px-2.5 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border font-medium',
        statusStyles[status],
        sizeClass,
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current me-1.5" />
      {labelAr || defaultLabels[status]?.ar || status}
    </span>
  );
}
