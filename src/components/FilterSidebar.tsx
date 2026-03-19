'use client';
import { useState } from 'react';

type FilterSidebarProps = {
  onFilterChange: (filters: any) => void;
};

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [ram, setRam] = useState('');
  const [storage, setStorage] = useState('');

  const handleApply = () => {
    const filters: any = {};
    if (brand) filters.brand = brand;
    if (minPrice) filters.minPrice = minPrice;
    if (maxPrice) filters.maxPrice = maxPrice;
    if (ram) filters.ram = ram;
    if (storage) filters.storage = storage;
    onFilterChange(filters);
  };

  const handleReset = () => {
    setBrand('');
    setMinPrice('');
    setMaxPrice('');
    setRam('');
    setStorage('');
    onFilterChange({});
  };

  return (
    <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4">Filters</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Brand</label>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Brands</option>
            <option value="Apple">Apple</option>
            <option value="Samsung">Samsung</option>
            <option value="Google">Google</option>
            <option value="OnePlus">OnePlus</option>
            <option value="Xiaomi">Xiaomi</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Price Range</label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">RAM</label>
          <select
            value={ram}
            onChange={(e) => setRam(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All RAM</option>
            <option value="4GB">4GB</option>
            <option value="6GB">6GB</option>
            <option value="8GB">8GB</option>
            <option value="12GB">12GB</option>
            <option value="16GB">16GB</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Storage</label>
          <select
            value={storage}
            onChange={(e) => setStorage(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Storage</option>
            <option value="64GB">64GB</option>
            <option value="128GB">128GB</option>
            <option value="256GB">256GB</option>
            <option value="512GB">512GB</option>
            <option value="1TB">1TB</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleApply}
            className="flex-1 bg-primary-600 text-white py-2 rounded hover:bg-primary-700"
          >
            Apply Filters
          </button>
          <button
            onClick={handleReset}
            className="flex-1 bg-gray-200 py-2 rounded hover:bg-gray-300"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}