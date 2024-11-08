import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';

const AddCar = () => {
    const [sbumitB, setSubmitB] = useState(false)

    const [carData, setCarData] = useState({
        make: '',
        model: '',
        year: '',
        price: '',
        color: '',
        mileage: '',
        vin: '',
        imageUrl: '',
    });


    const uploadImage = async (image) => {
        setSubmitB(true)

        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'nypkpo2h');

        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/duum7wzdo/image/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setCarData((prevData) => ({ ...prevData, imageUrl: response.data.secure_url }))
            console.log(response.data.secure_url);
        } catch (error) {
            if (error.response) {
                console.error('Cloudinary Error:', error.response.data.error.message);
            } else {
                console.error('Error:', error.message);
            }

        } finally {
            setSubmitB(false)
        }
    };


    const handleSubmit = async (e) => {
        for (const key in carData) {
            if (!carData[key]) {
                alert(`Please fill in the ${key} field.`);
                return;
            }
        }
        e.preventDefault();
        const formData = new FormData();
        for (const key in carData) {
            formData.append(key, carData[key]);
        }

        try {
            console.log(carData)
            const response = await axios.post('http://localhost:4000/car', carData, {

                headers: {
                    'Token': localStorage.getItem('Token'),
                },
            });
            console.log(response.data);
            setCarData({
                make: '',
                model: '',
                year: '',
                price: '',
                color: '',
                mileage: '',
                vin: '',
                imageUrl: '',
            });
        } catch (error) {
            console.error('Error adding car:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData({
            ...carData,
            [name]: value,
        });
    };


    return (
        <>
            <NavBar />
            <br />
            <br />
            <br />
            <div className="add-car-form container mx-auto p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Add a New Car</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className='flex flex-row w-full mt-1'>

                        <label className='w-1/2 p-2'>
                            Make:
                            <input
                                type="text"
                                name="make"
                                value={carData.make}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>

                        <label className='w-1/2 p-2'>
                            Model:
                            <input
                                type="text"
                                name="model"
                                value={carData.model}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                    </div>

                    <div className='flex flex-row w-full mt-1'>
                        <label className='w-1/2 p-2'>
                            Year:
                            <input
                                type="number"
                                name="year"
                                value={carData.year}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>

                        <label className='w-1/2 p-2'>
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={carData.price}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                    </div>
                    <div className='flex flex-row w-full mt-1'>

                        <label className="w-1/2 p-2">
                            Color:
                            <input
                                type="text"
                                name="color"
                                value={carData.color}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>

                        <label className="w-1/2 p-2">
                            Mileage:
                            <input
                                type="number"
                                name="mileage"
                                value={carData.mileage}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            />
                        </label>
                    </div>

                    <label className="block">
                        VIN:
                        <input
                            type="text"
                            name="vin"
                            value={carData.vin}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </label>

                    <label className="block">
                        Image:
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={(e) => {
                                uploadImage(e.target.files[0])
                            }}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        />
                    </label>

                    <button type="submit" disabled={sbumitB} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Add Car</button>
                </form >
            </div >

        </>
    );
};

export default AddCar;
