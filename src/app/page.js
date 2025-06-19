'use client';

import dynamic from 'next/dynamic';
import ProtectedRoute from '@/components/ProtectedRoute';

const HomePage = dynamic(() => import('../components/Home/HomePage'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function Home() {
  return (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
  );
}