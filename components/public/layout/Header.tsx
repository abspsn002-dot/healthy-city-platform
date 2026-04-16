'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

export default function Header() {
  const { lang, setLang, t, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t.nav.home },
    { href: '/about', label: t.nav.about },
    { href: '/initiatives', label: t.nav.initiatives },
    { href: '/news', label: t.nav.news },
    { href: '/events', label: t.nav.events },
    { href: '/media', label: t.nav.media },
    { href: '/partners', label: t.nav.partners },
    { href: '/contact', label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-white/95 backdrop-blur-sm'
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-700 to-teal-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">م</span>
            </div>
            <div className={cn('hidden sm:flex flex-col', isRTL ? 'items-start' : 'items-start')}>
              <span className="text-green-800 font-bold text-base leading-tight">
                {lang === 'ar' ? 'المدينة الصحية' : 'Healthy City'}
              </span>
              <span className="text-teal-600 text-xs font-medium">
                {lang === 'ar' ? 'مدينة صحية مستدامة' : 'Sustainable Urban Health'}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive(link.href)
                    ? 'text-green-700 bg-green-50'
                    : 'text-gray-600 hover:text-green-700 hover:bg-gray-50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-gray-50 transition-all duration-200 border border-gray-200"
              aria-label="Toggle language"
            >
              <Globe size={15} />
              <span>{t.common.language}</span>
            </button>

            <Link
              href="/participate"
              className="hidden md:flex hc-btn-primary text-sm py-2 px-4"
            >
              {t.nav.participate}
            </Link>

            <button
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container-custom py-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive(link.href)
                      ? 'text-green-700 bg-green-50'
                      : 'text-gray-700 hover:text-green-700 hover:bg-gray-50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/participate"
                onClick={() => setMobileOpen(false)}
                className="mt-2 hc-btn-primary text-center text-sm"
              >
                {t.nav.participate}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
