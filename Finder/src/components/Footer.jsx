// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary-700 text-white py-4 mt-8">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Car Finder. All rights reserved.
        </p>
        <div className="mt-2">
          <ul className="flex justify-center space-x-6">
            <li>
              <a href="/about" className="hover:text-primary-100 transition-colors">
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-primary-100 transition-colors">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-primary-100 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-of-service" className="hover:text-primary-100 transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
