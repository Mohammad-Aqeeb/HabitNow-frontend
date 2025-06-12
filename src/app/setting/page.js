'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const SettingPage = dynamic(() => import('../../components/Setting/SettingPage'), {
  ssr: false,
});

export default function Setting() {
  return (
    <SettingPage />
  );
}