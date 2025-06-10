'use client';

import dynamic from 'next/dynamic';

const PremiumPage = dynamic(() => import('@/components/Premium/PremiumPage'), {
  ssr: false,
});

export default function Premium() {
  return (
    <PremiumPage />
  );
}