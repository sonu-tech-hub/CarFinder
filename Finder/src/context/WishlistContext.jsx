// src/context/WishlistContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getWishlist, addToWishlist, removeFromWishlist, isInWishlist } from '../services/wishlistService';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Initialize wishlist from localStorage
  useEffect(() => {
    const storedWishlist = getWishlist();
    setWishlist(storedWishlist);
    setWishlistCount(storedWishlist.length);
  }, []);

  const addCarToWishlist = (car) => {
    const updatedWishlist = addToWishlist(car);
    setWishlist(updatedWishlist);
    setWishlistCount(updatedWishlist.length);
  };

  const removeCarFromWishlist = (carId) => {
    const updatedWishlist = removeFromWishlist(carId);
    setWishlist(updatedWishlist);
    setWishlistCount(updatedWishlist.length);
  };

  const checkIfInWishlist = (carId) => {
    return isInWishlist(carId);
  };

  const value = {
    wishlist,
    wishlistCount,
    addCarToWishlist,
    removeCarFromWishlist,
    checkIfInWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};