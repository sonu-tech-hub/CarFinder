// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useWishlist from '../hooks/useWishlist';

const Header = () => {
  const { wishlistCount } = useWishlist();

  return (
    <header className="bg-primary-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            <i className="fas fa-car mr-2"></i>
            Car Finder
          </Link>
        </div>
        
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="hover:text-primary-100 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-primary-100 transition-colors flex items-center">
                <i className="fas fa-heart mr-1"></i>
                Wishlist
                {wishlistCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;