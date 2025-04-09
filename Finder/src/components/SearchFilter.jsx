// src/components/SearchFilters.jsx
import React, { useState } from 'react';

const SearchFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    brand: '',
    minPrice: '',
    maxPrice: '',
    fuelType: '',
    seatingCapacity: ''
  });

  // Available options for dropdowns
  const brands = ['Toyota', 'Honda', 'Ford', 'BMW', 'Audi', 'Mercedes', 'Tesla'];
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const seatingCapacities = ['2', '4', '5', '7', '8+'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const clearFilters = () => {
    const resetFilters = {
      brand: '',
      minPrice: '',
      maxPrice: '',
      fuelType: '',
      seatingCapacity: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Brand Filter */}
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <select
              id="brand"
              name="brand"
              value={filters.brand}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Min Price ($)
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleInputChange}
              placeholder="Min Price"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
              Max Price ($)
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleInputChange}
              placeholder="Max Price"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            />
          </div>

          {/* Fuel Type Filter */}
          <div>
            <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700 mb-1">
              Fuel Type
            </label>
            <select
              id="fuelType"
              name="fuelType"
              value={filters.fuelType}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="">All Fuel Types</option>
              {fuelTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Seating Capacity Filter */}
          <div>
            <label htmlFor="seatingCapacity" className="block text-sm font-medium text-gray-700 mb-1">
              Seating Capacity
            </label>
            <select
              id="seatingCapacity"
              name="seatingCapacity"
              value={filters.seatingCapacity}
              onChange={handleInputChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="">All Capacities</option>
              {seatingCapacities.map(capacity => (
                <option key={capacity} value={capacity}>{capacity}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Action Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            type="submit"
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <i className="fas fa-filter mr-2"></i>
            Apply Filters
          </button>
          
          <button
            type="button"
            onClick={clearFilters}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            <i className="fas fa-times mr-2"></i>
            Clear Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilters;
