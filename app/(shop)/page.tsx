import { HeroSection } from '@/components/home/hero-section';
import { TrustStrip } from '@/components/home/trust-strip';
import { CategoriesSection } from '@/components/home/categories-section';
import { BestSellersSection } from '@/components/home/best-sellers-section';
import { PromoBanner } from '@/components/home/promo-banner';
import { NewArrivalsSection } from '@/components/home/new-arrivals-section';
import { AboutSection } from '@/components/home/about-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <CategoriesSection />
      <BestSellersSection />
      <PromoBanner />
      <NewArrivalsSection />
      <AboutSection />
    </>
  );
}
