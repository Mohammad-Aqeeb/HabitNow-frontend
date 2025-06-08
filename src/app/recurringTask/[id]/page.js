'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import dynamic from 'next/dynamic';

const EditRecurringTaskPage = dynamic(() => import('@/components/RecurringTask/EditRecurringTaskPage'), {
  ssr: false,
});

export default function EditRecurringTask() {
  return (
    <ProtectedRoute>
      <EditRecurringTaskPage />
    </ProtectedRoute>
  );
}