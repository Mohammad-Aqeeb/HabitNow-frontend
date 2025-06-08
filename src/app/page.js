'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import ProtectedRoute from '@/components/ProtectedRoute';

const HomePage = dynamic(() => import('../components/Home/HomePage'), {
  ssr: false,
});

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.5 } },
};

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    </motion.div>
  );
}