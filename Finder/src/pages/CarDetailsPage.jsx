// src/pages/CarDetailsPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCarById } from "../services/api";
import WishlistButton from "../components/WishlistButton";
import LoadingSpinner from "../components/LoadingSpinner";

const CarDetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchCarById = async (id) => {
    try {
      const response = await fetch(`https://api.example.com/cars/${id}`);
      
      // Log the response status and headers
      console.log('Response Status:', response.status);
      console.log('Response Headers:', response.headers);
      
      // If the response is not OK (not a 2xx status code), throw an error
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const carData = await response.json();
      console.log('Car Data:', carData);  // Log the car data to verify it is returned correctly
      return carData;
    } catch (err) {
      console.error('Error fetching car data:', err);
      throw err;  // Re-throw the error so that it can be caught in the CarDetailsPage component
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const carData = await fetchCarById(id);
        console.log('Fetched car data:', carData);  // Log the car data here
        setCar(carData);
      } catch (err) {
        setError("Failed to fetch car details. Please try again later.");
        console.error("Error fetching car details:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div>
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6"
      >
        <i className="fas fa-arrow-left mr-2"></i> Back to Cars
      </Link>

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
            <p>{error} </p>
          </div>
        </div>
      )}

      {/* Car Details */}
      {!loading && !error && car && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Car Header */}
          <div className="flex flex-col md:flex-row">
            {/* Car Image */}
            <div className="w-full md:w-1/2 relative">
              <img
                src={
                  car.imageUrl ||
                  "https://via.placeholder.com/600x400?text=No+Image"
                }
                alt={`${car.brand} ${car.model}`}
                className="w-full h-64 md:h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <WishlistButton car={car} />
              </div>
            </div>

            {/* Car Basic Info */}
            <div className="w-full md:w-1/2 p-6">
              <h1 className="text-3xl font-bold mb-2">
                {car.brand} {car.model}
              </h1>
              <p className="text-gray-600 mb-4">{car.year}</p>
              <p className="text-3xl font-bold text-primary-600 mb-6">
                {formatPrice(car.price)}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <i className="fas fa-gas-pump text-gray-500 mr-3 text-xl"></i>
                  <div>
                    <p className="text-sm text-gray-500">Fuel Type</p>
                    <p className="font-medium">{car.fuelType}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <i className="fas fa-user-friends text-gray-500 mr-3 text-xl"></i>
                  <div>
                    <p className="text-sm text-gray-500">Seating Capacity</p>
                    <p className="font-medium">{car.seatingCapacity} seats</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <i className="fas fa-tachometer-alt text-gray-500 mr-3 text-xl"></i>
                  <div>
                    <p className="text-sm text-gray-500">Mileage</p>
                    <p className="font-medium">{car.mileage}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <i className="fas fa-cog text-gray-500 mr-3 text-xl"></i>
                  <div>
                    <p className="text-sm text-gray-500">Transmission</p>
                    <p className="font-medium">
                      {car.transmission || "Automatic"}
                    </p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-primary-600 text-white py-3 rounded-md hover:bg-primary-700 transition-colors">
                Contact Seller
              </button>
            </div>
          </div>

          {/* Car Description */}
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-xl font-bold mb-4">Description</h2>
            <p className="text-gray-700">{car.description}</p>
          </div>

          {/* Car Features */}
          <div className="p-6 border-t border-gray-200">
            <h2 className="text-xl font-bold mb-4">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {(
                car.features || [
                  "Air Conditioning",
                  "Power Steering",
                  "Power Windows",
                  "Anti-Lock Braking System",
                  "Driver Airbag",
                  "Passenger Airbag",
                  "Automatic Climate Control",
                  "Alloy Wheels",
                  "Bluetooth Connectivity",
                ]
              ).map((feature, index) => (
                <div key={index} className="flex items-center">
                  <i className="fas fa-check text-green-500 mr-2"></i>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailsPage;
