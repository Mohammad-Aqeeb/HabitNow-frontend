'use client';

import React, { useState } from 'react';
import { useModal } from '@/context/ModalContext';
import styles from '@/styles/RateAppModal.module.css';
import { FaStar } from 'react-icons/fa';

const RateAppModal = () => {
  const { isRateModalOpen, closeRateModal } = useModal();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);

  if (!isRateModalOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Rate this App</h2>
        <p className={styles.modalText}>How would you rate your experience?</p>
        <div className={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              style={{
                color: star <= (hovered || rating) ? '#fbbf24' : '#d1d5db',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
        <button onClick={closeRateModal}>Close</button>
      </div>
    </div>
  );
};

export default RateAppModal;