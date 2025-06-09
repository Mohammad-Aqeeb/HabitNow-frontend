'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import dynamic from 'next/dynamic';

const HabitCreatePage = dynamic(() => import('@/components/HabitCreate/HabitCreate'), {
  ssr: false,
});

export default function HabitCreate() {
  return (
    <ProtectedRoute>
      <HabitCreatePage />
    </ProtectedRoute>
  );
}