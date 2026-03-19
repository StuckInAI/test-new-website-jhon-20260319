'use client';
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import { Product } from '@/types';
import Pagination from '@/components/Pagination';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const query = new URLSearchParams({
        page: page.toString(),
        ...filters,
      }).toString();
      const res = await fetch(`/api/products?${query}`);
      const data = await res.json();
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setLoading(false);
    };
    fetchProducts();
  }, [page, filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Smartphones</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar onFilterChange={setFilters} />
        <div className="flex-1">
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">No products found.</div>
          )}
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
}