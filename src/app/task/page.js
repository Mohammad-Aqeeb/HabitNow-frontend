'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import dynamic from 'next/dynamic';

const TaskPage = dynamic(() => import('@/components/Task/TaskPage'), {
  ssr: false,
});

export default function Task() {
  return (
    <ProtectedRoute>
      <TaskPage />
    </ProtectedRoute>
  );
}