import './globals.css';
import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import { LanguageProvider } from '@/contexts/LanguageContext';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-cairo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'المدينة الصحية | Healthy City',
    template: '%s | المدينة الصحية',
  },
  description:
    'برنامج وطني متكامل يسعى إلى بناء مدينة صحية مستدامة - A comprehensive national program for a sustainable healthy city',
  keywords: ['healthy city', 'مدينة صحية', 'public health', 'صحة عامة', 'Saudi Arabia'],
  authors: [{ name: 'Healthy City Program' }],
  metadataBase: new URL('https://healthycity.sa'),
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    alternateLocale: 'en_US',
    siteName: 'المدينة الصحية | Healthy City',
    title: 'المدينة الصحية | Healthy City',
    description: 'برنامج وطني متكامل يسعى إلى بناء مدينة صحية مستدامة',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'المدينة الصحية | Healthy City',
    description: 'برنامج وطني متكامل يسعى إلى بناء مدينة صحية مستدامة',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} font-arabic`}>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
