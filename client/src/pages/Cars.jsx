import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

const Cars = () => {
    const [cars, setCars] = useState([]);
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:4000/car?max=20');
                setCars(response.data);
            } catch (err) {
                console.log(err)
            }
        };
        fetchCars();
    }, []);

    return (
        <div className="">
            <NavBar />
            <div className="container mx-auto p-20">
                <h1 className="text-2xl font-bold mb-4 ">Latest Cars</h1>
                <div className="flex flex-col gap-4">
                    {cars.map(car => (
                        <div key={car._id} className="bg-gray-100 shadow-lg rounded-lg overflow-hidden flex flex-row ">
                            <img
                                src={car.imageUrl}
                                alt={car.name}
                                className="w-1/4 h-48 object-cover p-4 rounded"
                            />
                            <div className="flex flex-col gap-4 p-4 w-full">
                                <div className="text-xl font-bold mb-2">{car.make} {car.model}</div>
                                <div className="flex flex-row justify-between">
                                    <div className="p-2">
                                        <p className="text-gray-700">Price: ${car.price}/day</p>
                                        <p className="text-gray-700">Year: {car.year}</p>
                                        <p className="text-gray-700">Mileage: {car.mileage}</p>
                                    </div>
                                    <div className="p-2">
                                        <p className="text-gray-700">VIN: {car.vin}</p>
                                        <p className="text-gray-700">Color: {car.color}</p>
                                    </div>
                                    <div className="flex-end p-4">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Rent</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default Cars;
