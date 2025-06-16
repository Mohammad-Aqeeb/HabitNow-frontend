'use client';

import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [isRateModalOpen, setRateModalOpen] = useState(false);

  const openRateModal = () => setRateModalOpen(true);
  const closeRateModal = () => setRateModalOpen(false);

  return (
    <ModalContext.Provider value={{ isRateModalOpen, openRateModal, closeRateModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);