import axios from 'axios';
import React, { useEffect, useState } from 'react';
import background from '../assets/background.jpg';
import { Link } from 'react-router-dom';
import CarCard from '../components/CarCard';
import NavBar from '../components/NavBar';
import { backendUrl } from '../config/ip';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('Token');


  // Fetch cars from the API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${backendUrl}/car?max=7`);
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Header */}
      <NavBar />

      {/* Hero Section */}

      <section className="bg-blue-500 text-white text-center h-screen flex flex-col justify-center items-center blur-bg"
        style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>

        <div className="flex flex-row items-center justify-center ">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white shadow-black">Rent Your Dream Car Today</h1>
            <p className="mt-4 text-lg font-bold shadow-xl">Explore our vast collection of luxury cars at unbeatable prices. Discover your dream car today!</p>
            {token ? (<></>) : (
              <Link to="/register">
                <button className="mt-4 px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg">
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section id="cars" className="py-12 gap-4  px-8">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Cars</h2>

        {loading ? (
          <div className="text-center">Loading cars...</div>
        ) : (
          <div className="flex flex-row gap-4 overflow-x-auto">
            {cars.map(car => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
      </section>


      <footer className="bg-gray-800 text-white text-center p-4 mt-12">
        <p>&copy; 2024 Ranting Cars. All rights reserved.</p>
      </footer>
    </div>
  );
};
export default HomePage;
