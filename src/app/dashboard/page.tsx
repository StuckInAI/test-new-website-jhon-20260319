'use client';
import OrderHistory from '@/components/OrderHistory';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const { data: session } = useSession();
  if (!session) redirect('/auth/signin');
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
      <OrderHistory />
    </div>
  );
}