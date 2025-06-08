'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import dynamic from 'next/dynamic';

const TimerPage = dynamic(() => import('../../components/Timer/TimerPage'), {
  ssr: false,
});

export default function Timer() {
  return (
    <ProtectedRoute>
      <TimerPage />
    </ProtectedRoute>
  );
}