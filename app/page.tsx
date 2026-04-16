import type { Metadata } from 'next';
import PublicLayout from '@/components/public/layout/PublicLayout';
import HeroSection from '@/components/public/home/HeroSection';
import OverviewSection from '@/components/public/home/OverviewSection';
import StatsSection from '@/components/public/home/StatsSection';
import InitiativesSection from '@/components/public/home/InitiativesSection';
import NewsSection from '@/components/public/home/NewsSection';
import PartnersSection from '@/components/public/home/PartnersSection';
import CTASection from '@/components/public/home/CTASection';

export const metadata: Metadata = {
  title: 'الرئيسية | المدينة الصحية',
  description: 'برنامج وطني متكامل يسعى إلى بناء مدينة صحية مستدامة من خلال الشراكات والمبادرات المجتمعية',
};

export default function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <OverviewSection />
      <StatsSection />
      <InitiativesSection />
      <NewsSection />
      <PartnersSection />
      <CTASection />
    </PublicLayout>
  );
}
