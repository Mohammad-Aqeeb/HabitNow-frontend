'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import dynamic from 'next/dynamic';

const ProfilePage = dynamic(() => import('@/components/Profile/ProfilePage'), {
  ssr: false,
});

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  );
}