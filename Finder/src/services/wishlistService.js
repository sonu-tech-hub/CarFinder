// src/services/wishlistService.js
const WISHLIST_STORAGE_KEY = 'car_finder_wishlist';

export const getWishlist = () => {
  const wishlistJson = localStorage.getItem(WISHLIST_STORAGE_KEY);
  return wishlistJson ? JSON.parse(wishlistJson) : [];
};

export const addToWishlist = (car) => {
  const wishlist = getWishlist();
  const updatedWishlist = [...wishlist, car];
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updatedWishlist));
  return updatedWishlist;
};

export const removeFromWishlist = (carId) => {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(car => car.id !== carId);
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updatedWishlist));
  return updatedWishlist;
};

export const isInWishlist = (carId) => {
  const wishlist = getWishlist();
  return wishlist.some(car => car.id === carId);
};