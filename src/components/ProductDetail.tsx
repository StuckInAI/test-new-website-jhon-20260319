'use client';
import { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

export default function ProductDetail({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <img
            src={product.images[0] || '/images/placeholder.jpg'}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
          <div className="grid grid-cols-4 gap-2 mt-4">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${product.name} view ${idx + 1}`}
                className="w-full h-24 object-cover rounded cursor-pointer"
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.brand}</p>
          <p className="text-2xl font-bold text-primary-600 mb-6">${product.price}</p>
          <p className="text-gray-700 mb-8">{product.description}</p>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Specifications</h3>
            <ul className="space-y-2">
              <li>
                <strong>RAM:</strong> {product.specifications.ram}
              </li>
              <li>
                <strong>Storage:</strong> {product.specifications.storage}
              </li>
              <li>
                <strong>Display:</strong> {product.specifications.display}
              </li>
              <li>
                <strong>Camera:</strong> {product.specifications.camera}
              </li>
              <li>
                <strong>Battery:</strong> {product.specifications.battery}
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-l"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="border-y border-gray-300 w-16 h-10 text-center"
              />
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="bg-gray-200 w-10 h-10 flex items-center justify-center rounded-r"
              >
                +
              </button>
            </div>
            <button
              onClick={() => addItem(product.id, quantity)}
              className="flex-1 bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700"
            >
              Add to Cart
            </button>
          </div>
          <div className="mt-8">
            <p className="text-gray-700">
              <strong>Availability:</strong> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}