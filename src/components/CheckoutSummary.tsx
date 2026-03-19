'use client';
import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import { Product } from '@/types';
import Link from 'next/link';

export default function CheckoutSummary() {
  const { items } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    if (items.length === 0) {
      setProducts([]);
      return;
    }
    const fetchProducts = async () => {
      const productIds = items.map((item) => item.productId).join(',');
      const res = await fetch(`/api/products?ids=${productIds}`);
      const data = await res.json();
      setProducts(data.products);
    };
    fetchProducts();
  }, [items]);
  const getProduct = (productId: number) => products.find((p) => p.id === productId);
  const subtotal = items.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  const shipping = subtotal > 999 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4">Order Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <Link
        href="/checkout"
        className="block w-full bg-primary-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-primary-700 mt-6"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}