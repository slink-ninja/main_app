'use client';

import { Suspense } from 'react';
import { AnalyticsDashboard } from '@/components/dashboard/analytics-dashboard';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AnalyticsDashboard />
    </Suspense>
  );
}