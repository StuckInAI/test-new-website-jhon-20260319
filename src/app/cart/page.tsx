'use client';
import CartItems from '@/components/CartItems';
import CheckoutSummary from '@/components/CheckoutSummary';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { items } = useCart();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartItems />
          </div>
          <div>
            <CheckoutSummary />
          </div>
        </div>
      ) : (
        <div className="text-center py-12">Your cart is empty.</div>
      )}
    </div>
  );
}