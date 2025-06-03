"use client";
import { motion, AnimatePresence } from 'framer-motion';
import Sidenav from '../components/Sidenav/Sidenav';
import BottomNavbarPage from '../components/BottomNavbar/BottomNavbarPage';
import './globals.css';

const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.5 } },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="MainDiv" style={{ position: 'relative' }}>
          <Sidenav/>
          <AnimatePresence mode="wait">
            <motion.div
              key={typeof window !== 'undefined' ? location.pathname : 'static'}
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
              {children}
            </motion.div>
          </AnimatePresence>
          <BottomNavbarPage />
        </div>
      </body>
    </html>
  );
}
