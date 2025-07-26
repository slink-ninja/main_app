import { Suspense } from 'react';
import { HeroSection } from '@/components/marketing/hero-section';
import { FeaturesSection } from '@/components/marketing/features-section';
import { StatsSection } from '@/components/marketing/stats-section';
import { PricingSection } from '@/components/marketing/pricing-section';
import { TestimonialsSection } from '@/components/marketing/testimonials-section';
import { CtaSection } from '@/components/marketing/cta-section';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <StatsSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturesSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <PricingSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <CtaSection />
      </Suspense>
    </div>
  );
}