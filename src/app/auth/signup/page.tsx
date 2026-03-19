'use client';
import SignUpForm from '@/components/SignUpForm';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function SignUpPage() {
  const { data: session } = useSession();
  if (session) redirect('/');
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Account</h1>
      <SignUpForm />
    </div>
  );
}