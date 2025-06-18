'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import ProtectedRoute from '@/components/ProtectedRoute';

const HomePage = dynamic(() => import('../components/Home/HomePage'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

// const pageVariants = {
//   initial: { opacity: 0, y: 30 },
//   animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//   exit: { opacity: 0, y: -30, transition: { duration: 0.5 } },
// };

export default function Home() {
  return (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
  );
}