import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Language } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalizedField(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
  field: string,
  lang: Language
): string {
  const key = `${field}_${lang}`;
  const fallbackKey = `${field}_${lang === 'ar' ? 'en' : 'ar'}`;
  return (obj[key] as string) || (obj[fallbackKey] as string) || '';
}

export function formatDate(dateStr: string, lang: Language): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateShort(dateStr: string, lang: Language): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(lang === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}
