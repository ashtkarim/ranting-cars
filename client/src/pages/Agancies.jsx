import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

const Agancies = () => {
    const [agencies, setAgencies] = useState([]);
    useEffect(() => {
        const fetchAgencies = async () => {
            try {
                const response = await axios.get('http://localhost:4000/agency');
                setAgencies(response.data);
                console.log(response.data);
            } catch (err) {
                console.error(err)
            }
        };
        fetchAgencies();
    }, []);

    return (
        <div className="">

            <NavBar />
            <div className="container mx-auto p-20">
                <h1 className="text-2xl font-bold mb-4 ">Agencies</h1>
                <div className="flex flex-col gap-4">
                    {agencies.map(agency => (
                        <div key={agency._id} className="bg-gray-100 shadow-lg rounded-lg overflow-hidden flex flex-row ">
                            <img
                                src={agency.imageUrl ? agency.imageUrl : "https://res.cloudinary.com/duum7wzdo/image/upload/v1731091263/nhmh4ii9mcbjnribizl2.webp" }
                                alt={agency.name}
                                className="w-1/4 h-48 object-cover p-4 rounded"
                            />
                            <div className="flex flex-col gap-4 p-4 w-full">
                                <div className="flex flex-row w-full justify-between ">
                                    <div className='text-xl font-bold mb-2'>
                                        {agency.name}
                                    </div>
                                </div>
                                <div className="flex flex-row justify-between w-1/2">
                                    <div className="p-2">
                                        <p className="text-gray-700">Address: {agency.address}</p>
                                        {agency.phoneNumber? <p className="text-gray-700">Phone Number: {agency.phoneNumber}</p>:<></>}
                                        {agency.description?<p className="text-gray-700">Description: {agency.description}</p>:<></>}
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

export default Agancies;