import { useParams } from "react-router-dom"
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { backendUrl } from "../config/ip";


const CarInfo = () => {
    const { id } = useParams()
    const [car, setCar] = useState({})
    const [agency, setAgency] = useState({})
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`${backendUrl}/car/${id}`);
                console.log(response.data)
                setCar(response.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, []);

    const loadAgencyInfo = async (id) => {
        try {
            const response = await axios.get(`${backendUrl}/agency/${id}`);
            console.log(response.data)
            setAgency(response.data);
        } catch (error) {
            console.error('Error fetching cars:', error);
        }
    }
    return (
        <>
            <div className="container mx-auto p-20">

                <h1 className="text-3xl font-bold mb-10">
                    Car Information
                </h1>
                <div className="flex justify-between">
                    <div className="w-1/3 p-10">
                        <img
                            className='w-full h-full'
                            src={car.imageUrl}
                            alt="Car Image" />
                    </div>
                    <div className="w-2/3 p-10">
                        <p className='p-4'><strong>Make:</strong> {car.make}</p>
                        <p className='p-4'><strong>Model:</strong> {car.model}</p>
                        <p className='p-4'><strong>Year:</strong> {car.year}</p>
                        <p className='p-4'><strong>Color:</strong> {car.color}</p>
                        <p className='p-4'><strong>Price:</strong> {car.price} MAD</p>
                    </div>
                </div>

                {Object.keys(agency).length > 0 ? (
                    <div className="agency-info">
                        <h2 className="text-2xl font-bold mb-4">Agency Information</h2>
                        <p className='p-4'><strong>Name:</strong> {agency.name}</p>
                        <p className='p-4'><strong>Email:</strong> {agency.email}</p>
                        <p className='p-4'><strong>Address:</strong> {agency.address}</p>
                        <p className='p-4'><strong>Phone Number:</strong> {agency.phoneNumber}</p>


                    </div>
                ) : (
                    <div className="flex justify-center">
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => loadAgencyInfo(car.agencyId)}>Load Agency Info</button>
                    </div>
                )}
            </div>


        </>
    )
}
export default CarInfo