'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Phone, Mail, Twitter, Youtube, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const { t, lang } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/about', label: t.nav.about },
    { href: '/initiatives', label: t.nav.initiatives },
    { href: '/news', label: t.nav.news },
    { href: '/events', label: t.nav.events },
    { href: '/media', label: t.nav.media },
    { href: '/partners', label: t.nav.partners },
    { href: '/contact', label: t.nav.contact },
    { href: '/participate', label: t.nav.participate },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-teal-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">م</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">
                  {lang === 'ar' ? 'المدينة الصحية' : 'Healthy City'}
                </div>
                <div className="text-green-400 text-xs font-medium">
                  {lang === 'ar' ? 'مدينة صحية مستدامة' : 'Sustainable Urban Health'}
                </div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-6">
              {t.footer.description}
            </p>
            <div className="flex items-center gap-3">
              {[
                { Icon: Twitter, href: '#', label: 'Twitter' },
                { Icon: Youtube, href: '#', label: 'YouTube' },
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                { Icon: Instagram, href: '#', label: 'Instagram' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-green-700 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-5 pb-2 border-b border-gray-800">
              {t.footer.quick_links}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-green-600 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-base mb-5 pb-2 border-b border-gray-800">
              {t.footer.contact_info}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{t.footer.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-green-500 flex-shrink-0" />
                <a
                  href={`tel:${t.footer.phone}`}
                  className="text-gray-400 hover:text-green-400 text-sm transition-colors font-mono"
                  dir="ltr"
                >
                  {t.footer.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-green-500 flex-shrink-0" />
                <a
                  href={`mailto:${t.footer.email}`}
                  className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                >
                  {t.footer.email}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear}{' '}
            {lang === 'ar' ? 'المدينة الصحية' : 'Healthy City'}.{' '}
            {t.footer.rights}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
              {lang === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
              {lang === 'ar' ? 'الشروط والأحكام' : 'Terms of Use'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
