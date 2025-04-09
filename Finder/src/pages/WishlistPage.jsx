// src/pages/WishlistPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';
import useWishlist from '../hooks/useWishlist';

const WishlistPage = () => {
  const { wishlist, wishlistCount } = useWishlist();

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
        <Link to="/" className="text-primary-600 hover:text-primary-700">
          <i className="fas fa-arrow-left mr-2"></i> Continue Shopping
        </Link>
      </div>
      
      {/* Wishlist Empty State */}
      {wishlistCount === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center mb-6">
          <i className="fas fa-heart-broken text-gray-400 text-5xl mb-4"></i>
          <h2 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">
            Save your favorite cars to compare them later by clicking the heart icon.
          </p>
          <Link 
            to="/"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
          >
            <i className="fas fa-search mr-2"></i> Browse Cars
          </Link>
        </div>
      )}
      
      {/* Wishlist Content */}
      {wishlistCount > 0 && (
        <div>
          <p className="text-gray-600 mb-6">
            You have <span className="font-medium">{wishlistCount}</span> car{wishlistCount !== 1 ? 's' : ''} in your wishlist.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;