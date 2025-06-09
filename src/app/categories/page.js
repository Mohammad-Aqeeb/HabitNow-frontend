'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import dynamic from 'next/dynamic';

const CategoriesPage = dynamic(() => import('@/components/Categories/CategoriesPage'), {
  ssr: false,
});

export default function Category() {
  return (
    <ProtectedRoute>
      <CategoriesPage />
    </ProtectedRoute>
  );
}