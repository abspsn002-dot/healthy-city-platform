'use client';

import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'start' | 'center' | 'end';
  accentLine?: boolean;
  className?: string;
  titleClassName?: string;
  badge?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  align = 'center',
  accentLine = true,
  className,
  titleClassName,
  badge,
}: SectionHeaderProps) {
  const alignClass = {
    start: 'items-start text-start',
    center: 'items-center text-center',
    end: 'items-end text-end',
  }[align];

  return (
    <div className={cn('flex flex-col gap-3', alignClass, className)}>
      {badge && (
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-100">
          {badge}
        </span>
      )}
      {accentLine && align === 'center' && (
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-8 bg-green-700 rounded-full" />
          <div className="h-1 w-1 rounded-full bg-teal-500" />
          <div className="h-0.5 w-8 bg-teal-600 rounded-full" />
        </div>
      )}
      {accentLine && align === 'start' && (
        <div className="h-1 w-12 bg-gradient-to-r from-green-700 to-teal-600 rounded-full" />
      )}
      <h2
        className={cn(
          'text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
