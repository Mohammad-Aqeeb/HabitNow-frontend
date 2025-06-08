'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import dynamic from 'next/dynamic';

const EditTaskPage = dynamic(() => import('@/components/Task/EditTaskPage'), {
  ssr: false,
});

export default function EditTask() {
  return (
    <ProtectedRoute>
      <EditTaskPage />
    </ProtectedRoute>
  );
}