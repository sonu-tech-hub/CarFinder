// src/components/CarCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import WishlistButton from './WishlistButton';

const CarCard = ({ car }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:transform hover:scale-105">
      <div className="relative">
        <img 
          src={car.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2">
          <WishlistButton car={car} />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{car.brand} {car.model}</h3>
        <p className="text-2xl font-bold text-primary-600 mb-3">{formatPrice(car.price)}</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center">
            <i className="fas fa-calendar-alt text-gray-500 mr-2"></i>
            <span className="text-sm">{car.year}</span>
          </div>
          
          <div className="flex items-center">
            <i className="fas fa-gas-pump text-gray-500 mr-2"></i>
            <span className="text-sm">{car.fuelType}</span>
          </div>
          
          <div className="flex items-center">
            <i className="fas fa-user-friends text-gray-500 mr-2"></i>
            <span className="text-sm">{car.seatingCapacity} seats</span>
          </div>
          
          <div className="flex items-center">
            <i className="fas fa-tachometer-alt text-gray-500 mr-2"></i>
            <span className="text-sm">{car.mileage}</span>
          </div>
        </div>
        
        <Link 
          to={`/car/${car.id}`}
          className="block w-full bg-primary-600 text-white text-center py-2 rounded-md hover:bg-primary-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;