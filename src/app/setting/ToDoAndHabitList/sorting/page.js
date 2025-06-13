'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const SettingSortingPage = dynamic(() => import('@/components/Setting/SettingSortingPage'), {
  ssr: false,
});

export default function ToDoAnSettingSorting() {
  return (
    <SettingSortingPage />
  );
}