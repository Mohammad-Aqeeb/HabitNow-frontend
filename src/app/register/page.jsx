'use client';

import dynamic from 'next/dynamic';

const RegisterPage = dynamic(() => import('../../components/register/RegisterPage'), {
  ssr: false,
});

export default function Register() {
  return (
    <RegisterPage />
  );
}