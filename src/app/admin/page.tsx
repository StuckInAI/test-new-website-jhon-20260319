'use client';
import AdminPanel from '@/components/AdminPanel';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AdminPage() {
  const { data: session } = useSession();
  if (!session || session.user.role !== 'admin') redirect('/');
  return <AdminPanel />;
}