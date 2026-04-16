'use client';

import Header from './Header';
import Footer from './Footer';
import { useLanguage } from '@/contexts/LanguageContext';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const { dir } = useLanguage();

  return (
    <div dir={dir} className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-20">{children}</main>
      <Footer />
    </div>
  );
}
