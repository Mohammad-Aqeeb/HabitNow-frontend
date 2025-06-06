'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import dynamic from 'next/dynamic';

const RecurringTaskPage = dynamic(() => import('@/components/RecurringTask/RecurringTaskPage'), {
  ssr: false,
});

export default function Profile() {
  return (
    <ProtectedRoute>
      <RecurringTaskPage />
    </ProtectedRoute>
  );
}