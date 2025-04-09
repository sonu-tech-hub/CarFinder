// src/pages/HomePage.jsx
import React, { useState, useEffect } from 'react';
import SearchFilters from '../components/SearchFilter';
import CarCard from '../components/CarCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchCars, fetchMockCars } from '../services/api';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOrder, setSortOrder] = useState('');
  const carsPerPage = 10;

  // Fetch cars when filters or pagination changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // You can use either the real API or mock data for development
        // const result = await fetchCars(filters, currentPage, carsPerPage);
        const result = await fetchMockCars(filters, currentPage, carsPerPage);
        
        let sortedCars = [...result.cars];
        
        // Sort cars if sort order is specified
        if (sortOrder === 'price_asc') {
          sortedCars.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'price_desc') {
          sortedCars.sort((a, b) => b.price - a.price);
        }
        
        setCars(sortedCars);
        setTotalPages(Math.ceil(result.totalCount / carsPerPage));
      } catch (err) {
        setError('Failed to fetch cars. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, currentPage, sortOrder]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo(0, 0);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-primary-700 text-white py-12 px-4 mb-8 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Car</h1>
          <p className="text-lg md:text-xl opacity-90">
            Search through our extensive collection of vehicles to find the one that fits your needs.
          </p>
        </div>
      </div>
      
      {/* Search Filters */}
      <SearchFilters onFilterChange={handleFilterChange} />
      
      {/* Results Count and Sort Options */}
      {!loading && !error && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <p className="text-gray-600 mb-3 md:mb-0">
            Showing <span className="font-medium">{cars.length}</span> cars
            {Object.keys(filters).some(key => filters[key]) && ' with applied filters'}
          </p>
          
          <div className="flex items-center">
            <label htmlFor="sort" className="text-gray-600 mr-2">Sort by:</label>
            <select
              id="sort"
              value={sortOrder}
              onChange={handleSortChange}
              className="border-gray-300 rounded-md shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      )}
      
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          <div className="flex items-center">
            <i className="fas fa-exclamation-circle text-red-500 mr-3"></i>
            <p>{error}</p>
          </div>
        </div>
      )}
      
      {/* No Results State */}
      {!loading && !error && cars.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-6 text-center mb-6">
          <i className="fas fa-search text-yellow-500 text-4xl mb-3"></i>
          <h3 className="text-lg font-medium mb-2">No cars found</h3>
          <p>Try adjusting your search filters to find what you're looking for.</p>
        </div>
      )}
      
      {/* Car Grid */}
      {!loading && !error && cars.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
      
      {/* Pagination */}
      {!loading && !error && totalPages > 1 && (
        <Pagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          onPageChange={handlePageChange} 
        />
      )}
    </div>
  );
};

export default HomePage;