'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Navbar() {
  const { data: session } = useSession();
  const { items } = useCart();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary-600">
          PhoneStore
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/products" className="hover:text-primary-600">
            Products
          </Link>
          <Link href="/cart" className="relative hover:text-primary-600">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {session ? (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="hover:text-primary-600">
                <User size={24} />
              </Link>
              {session.user.role === 'admin' && (
                <Link href="/admin" className="hover:text-primary-600">
                  Admin
                </Link>
              )}
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin" className="hover:text-primary-600">
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}