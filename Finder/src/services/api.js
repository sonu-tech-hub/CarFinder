// src/services/api.js
import axios from 'axios';

const API_URL = 'https://api.example.com/cars'; // Replace with your actual API endpoint

export const fetchCars = async (filters = {}, page = 1, limit = 10) => {
  try {
    const params = {
      _page: page,
      _limit: limit,
      ...filters
    };
    
    // Add price range filter if provided
    if (filters.minPrice) {
      params.price_gte = filters.minPrice;
    }
    if (filters.maxPrice) {
      params.price_lte = filters.maxPrice;
    }
    
    const response = await axios.get(API_URL, { params });
    
    return {
      cars: response.data,
      totalCount: parseInt(response.headers['x-total-count'] || '0', 10)
    };
  } catch (error) {
    console.error('Error fetching cars:', error);
    throw error;
  }
};

export const fetchCarById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching car with id ${id}:`, error);
    throw error;
  }
};

// For demo/development purposes, you might want to use mock data if API is not available
export const fetchMockCars = (filters = {}, page = 1, limit = 10) => {
  // This is a mock implementation with dummy data
  const allCars = [
    {
      id: 1,
      brand: 'Toyota',
      model: 'Camry',
      year: 2022,
      price: 25000,
      fuelType: 'Hybrid',
      seatingCapacity: 5,
      mileage: '28 mpg',
      imageUrl: 'https://example.com/toyota-camry.jpg',
      description: 'A comfortable and fuel-efficient sedan.'
    },
    // Add more mock cars here
  ];
  
  // Filter the cars based on the provided filters
  let filteredCars = [...allCars];
  
  if (filters.brand) {
    filteredCars = filteredCars.filter(car => car.brand.toLowerCase() === filters.brand.toLowerCase());
  }
  
  if (filters.minPrice) {
    filteredCars = filteredCars.filter(car => car.price >= filters.minPrice);
  }
  
  if (filters.maxPrice) {
    filteredCars = filteredCars.filter(car => car.price <= filters.maxPrice);
  }
  
  if (filters.fuelType) {
    filteredCars = filteredCars.filter(car => car.fuelType.toLowerCase() === filters.fuelType.toLowerCase());
  }
  
  if (filters.seatingCapacity) {
    filteredCars = filteredCars.filter(car => car.seatingCapacity === parseInt(filters.seatingCapacity, 10));
  }
  
  const totalCount = filteredCars.length;
  const paginatedCars = filteredCars.slice((page - 1) * limit, page * limit);
  
  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        cars: paginatedCars,
        totalCount: totalCount
      });
    }, 500);
  });
};