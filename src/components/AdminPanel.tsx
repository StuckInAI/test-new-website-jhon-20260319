'use client';
import { useState, useEffect } from 'react';
import { Product } from '@/types';

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    description: '',
    price: 0,
    images: [''],
    specifications: {
      ram: '',
      storage: '',
      display: '',
      camera: '',
      battery: '',
    },
    stock: 0,
    category: '',
  });
  useEffect(() => {
    fetch('/api/admin/products')
      .then((res) => res.json())
      .then(setProducts);
  }, []);
  const handleDelete = async (id: number) => {
    if (confirm('Are you sure?')) {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter((p) => p.id !== id));
    }
  };
  const handleUpdate = async (product: Product) => {
    await fetch(`/api/admin/products/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    setEditingProduct(null);
    setProducts(products.map((p) => (p.id === product.id ? product : p)));
  };
  const handleCreate = async () => {
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    const product = await res.json();
    setProducts([...products, product]);
    setNewProduct({
      name: '',
      brand: '',
      description: '',
      price: 0,
      images: [''],
      specifications: {
        ram: '',
        storage: '',
        display: '',
        camera: '',
        battery: '',
      },
      stock: 0,
      category: '',
    });
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="border p-4 rounded-lg">
                {editingProduct?.id === product.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                      className="w-full border mb-2 p-2"
                    />
                    <button
                      onClick={() => handleUpdate(editingProduct)}
                      className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{product.name}</h3>
                      <p className="text-gray-600">${product.price}</p>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => setEditingProduct(product)}
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Brand"
              value={newProduct.brand}
              onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price || ''}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
              className="w-full border p-2 rounded"
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock || ''}
              onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
              className="w-full border p-2 rounded"
            />
            <button
              onClick={handleCreate}
              className="w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700"
            >
              Add Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}