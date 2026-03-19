import { Product } from '@/types';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={product.images[0] || '/images/placeholder.jpg'}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600 text-sm">{product.brand}</p>
          </div>
          <span className="font-bold text-primary-600">${product.price}</span>
        </div>
        <p className="text-gray-700 mt-2 text-sm line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mt-4">
          <Link
            href={`/products/${product.id}`}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View Details
          </Link>
          <button
            onClick={() => addItem(product.id)}
            className="flex items-center space-x-1 bg-primary-600 text-white px-3 py-2 rounded hover:bg-primary-700"
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}