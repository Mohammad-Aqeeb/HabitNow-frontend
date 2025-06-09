'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import dynamic from 'next/dynamic';

const HabitPage = dynamic(() => import('@/components/Habits/HabitPage'), {
  ssr: false,
});

export default function Habit() {
  return (
    <ProtectedRoute>
      <HabitPage />
    </ProtectedRoute>
  );
}