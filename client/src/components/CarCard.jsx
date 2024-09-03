import React from 'react';
import { CiCalendarDate } from "react-icons/ci";
import { LiaPaletteSolid } from "react-icons/lia";
import { MdSpeed } from "react-icons/md";
const CarCard = ({ car }) => {
    return (
        <div className="bg-white shadow-md  p-4 min-w-80 max-w-80 rounded-lg flex flex-col items-center">
            <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className="w-full h-48 object-cover rounded-lg" />
            <h3 className="text-xl font-bold mt-4">{car.make} {car.model}</h3>
            <div className="flex flex-row items-center gap-2 ">
                <div className="mt-2 text-gray-600 flex items-center flex-row gap-1"><LiaPaletteSolid />{car.color}</div>
                <div className="mt-2 text-gray-600 flex items-center flex-row gap-1"><CiCalendarDate />{car.year}</div>
                <div className="mt-2 text-gray-600 flex items-center flex-row gap-1"><MdSpeed />{car.mileage} Km</div>
            </div>
            <p className="mt-2 text-gray-600 font-bold text-xl">{car.price.toLocaleString()} MAD / day</p>
        </div>
    );
};

export default CarCard;
