'use client';

import { Suspense } from 'react';
import { LinksManager } from '@/components/dashboard/links-manager';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function LinksPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <LinksManager />
    </Suspense>
  );
}