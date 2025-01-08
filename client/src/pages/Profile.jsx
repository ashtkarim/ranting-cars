import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import { backendUrl } from '../config/ip';

const Profile = () => {
    const [profile, setProfile] = useState({})
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`${backendUrl}/auth/me`, {
                    headers: {
                        'Token': localStorage.getItem('Token'),
                    },
                });
                console.log(response.data.user)
                setProfile(response.data.user)
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
                <h1 className="text-3xl font-bold">
                    Profile
                </h1>
                <div className="mt-10 flex justify-between">
                    <div className="w-1/3 p-10 w-100 h-100">
                        <img
                            className='w-100 h-100'
                            src={profile.imageUrl ? profile.imageUrl : "https://res.cloudinary.com/duum7wzdo/image/upload/v1731091263/nhmh4ii9mcbjnribizl2.webp"}
                            alt="Agency Image" />
                    </div>
                    <div className="w-2/3 p-10">

                        <p className='p-4'><strong>Name:</strong> {profile.name}</p>
                        <p className='p-4'><strong>Email:</strong> {profile.email}</p>
                        <p className='p-4'><strong>Address:</strong> {profile.address}</p>
                        <p className='p-4'><strong>Phone Number:</strong> {profile.phoneNumber}</p>
                        <p className='p-4'><strong>Description:</strong> {profile.description}</p>
                        <p className='p-4'><strong>Website:</strong> {profile.website}</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Profile;
