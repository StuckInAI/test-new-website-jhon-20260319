'use client';
import SignInForm from '@/components/SignInForm';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function SignInPage() {
  const { data: session } = useSession();
  if (session) redirect('/');
  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Sign In</h1>
      <SignInForm />
    </div>
  );
}