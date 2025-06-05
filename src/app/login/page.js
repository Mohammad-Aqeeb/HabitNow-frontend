'use client';

import dynamic from 'next/dynamic';

const LoginPage = dynamic(() => import('../../components/Login/LoginPage'), {
  ssr: false,
});

export default function Login() {
  return (
    <LoginPage />
  );
}