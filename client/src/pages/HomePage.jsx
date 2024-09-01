import axios from 'axios';
import React ,{useEffect,useState} from 'react';

import { Link } from 'react-router-dom';

const HomePage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // Fetch cars from the API
    useEffect(() => {
      const fetchCars = async () => {
        try {
          const response = await axios.get('http://localhost:4000/car'); // Replace with your API URL
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
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <div className="text-2xl font-bold">Ranting Cars</div>
            <nav>
              <a href="#cars" className="mr-4">Cars</a>
              <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Login
              </Link>
            </nav>
          </header>
    
          {/* Hero Section */}
          <section className="bg-blue-500 text-white text-center py-20">
            <h1 className="text-4xl font-bold">Rent Your Dream Car Today</h1>
            <p className="mt-4">Explore our wide selection of luxury cars at affordable prices.</p>
            <button className="mt-8 px-6 py-3 bg-yellow-400 text-blue-900 font-semibold rounded-lg">
              Get Started
            </button>
          </section>
    
          {/* Featured Cars Section */}
          <section id="cars" className="py-12 px-8">
            <h2 className="text-3xl font-bold text-center mb-8">Featured Cars</h2>

            {loading ? (
                <div className="text-center">Loading cars...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {cars.map(car => (
                    <div key={car.id} className="bg-white shadow-md rounded-lg p-4">
                    <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover rounded-lg" />
                    <h3 className="text-xl font-bold mt-4">{car.make} {car.model}</h3>
                    <p className="mt-2 text-gray-600">Year: {car.year}</p>
                    <p className="mt-2 text-gray-600">Color: {car.color}</p>
                    <p className="mt-2 text-gray-600">Price: ${car.price.toLocaleString()}</p>
                    {car.mileage && <p className="mt-2 text-gray-600">Mileage: {car.mileage.toLocaleString()} miles</p>}
                    <p className="mt-2 text-gray-600">VIN: {car.vin}</p>
                    </div>
                ))}
                </div>
            )}
            </section>
    
          {/* Footer */}
          <footer className="bg-gray-800 text-white text-center p-4 mt-12">
            <p>&copy; 2024 Ranting Cars. All rights reserved.</p>
          </footer>
        </div>
      );
    };
export default HomePage;
