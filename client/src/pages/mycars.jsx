import { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { backendUrl } from "../config/ip";
const MyCars = () => {
    const [mycars, setMycars] = useState([])
    const token = localStorage.getItem("Token")
    useEffect(() => {
        const fetchMyCars = async () => {
            try {
                const response = await axios.get(`${backendUrl}/car/mycars`, {
                    headers: {
                        'Token': token,
                    },
                });
                setMycars(response.data.cars);
                console.log(response.data.cars);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };
        fetchMyCars();
    }, [token]);

    const OnDelete = async (id) => {
        try {
            console.log(`Attempting to delete car with id: ${id}`);
            const response = await axios.delete(`${backendUrl}/car/${id}`, {
                headers: {
                    "Token": token
                }
            });
            window.location.reload();
            console.log('Delete response:', response.data);
        } catch (error) {
            console.error("Error in deleting car:", error);
            if (error.response) {
                console.error('Server responded with:', error.response.status, error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up request:', error.message);
            }
        }
    }


    return (
        <div className="">
            <NavBar />
            <div className="container mx-auto p-20">
                <h1 className="text-2xl font-bold mb-4 ">Your Cars</h1>
                <div className="flex flex-col gap-4">
                    
                    {mycars.map(car => (
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
                                        <p className="text-gray-700">Price: {car.price} $/day</p>
                                        <p className="text-gray-700">Year: {car.year}</p>
                                        <p className="text-gray-700">Mileage: {car.mileage}</p>
                                    </div>
                                    <div className="p-2">
                                        <p className="text-gray-700">VIN: {car.vin}</p>
                                        <p className="text-gray-700">Color: {car.color}</p>
                                    </div>
                                    <div className="flex-end p-4 flex flex-col">
                                        <button className="bg-red-500 text-white px-4 py-2 rounded m-3" onClick={() => { OnDelete(car._id) }}  >delete</button>

                                    </div>
                                </div>

                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}
export default MyCars;