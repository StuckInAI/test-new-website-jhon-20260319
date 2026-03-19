'use client';
import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { Trash2 } from 'lucide-react';

export default function CartItems() {
  const { items, updateQuantity, removeItem } = useCart();
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
  const total = items.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);
  return (
    <div>
      {items.map((item) => {
        const product = getProduct(item.productId);
        if (!product) return null;
        return (
          <div key={item.productId} className="flex items-center border-b py-4">
            <img
              src={product.images[0] || '/images/placeholder.jpg'}
              alt={product.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="ml-4 flex-1">
              <h4 className="font-semibold">{product.name}</h4>
              <p className="text-gray-600">${product.price}</p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.productId, parseInt(e.target.value) || 1)}
                className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
              />
              <span className="font-bold">${(product.price * item.quantity).toFixed(2)}</span>
              <button
                onClick={() => removeItem(item.productId)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        );
      })}
      <div className="mt-6 text-right">
        <p className="text-xl font-bold">Subtotal: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
}