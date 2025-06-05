'use client';

import MyTaskPage from '@/components/MyTask/MyTaskPage';
import ProtectedRoute from '@/components/ProtectedRoute';

function MyTask() {
  return (
    <ProtectedRoute>
      <MyTaskPage />
    </ProtectedRoute>
  )
}
export default MyTask;