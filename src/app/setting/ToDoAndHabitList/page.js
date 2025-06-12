'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ToDoAndHabitListPage = dynamic(() => import('@/components/Setting/ToDoAndHabitListPage'), {
  ssr: false,
});

export default function ToDoAndHabitList() {
  return (
    <ToDoAndHabitListPage />
  );
}