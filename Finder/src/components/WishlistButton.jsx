// src/components/WishlistButton.jsx
import React from 'react';
import useWishlist from '../hooks/useWishlist';

const WishlistButton = ({ car }) => {
  const { addCarToWishlist, removeCarFromWishlist, checkIfInWishlist } = useWishlist();
  const isInWishlist = checkIfInWishlist(car.id);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist) {
      removeCarFromWishlist(car.id);
    } else {
      addCarToWishlist(car);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${ 
        isInWishlist 
          ? 'bg-red-500 text-white' 
          : 'bg-white text-gray-400 hover:text-red-500' 
      }`}
      aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
    >
      <i className={`fas fa-heart text-lg ${isInWishlist ? 'animate-pulse' : ''}`}></i>
    </button>
  );
};

export default WishlistButton;
