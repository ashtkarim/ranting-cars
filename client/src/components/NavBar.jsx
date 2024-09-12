import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoLogOutOutline } from 'react-icons/io5';
import { IoLogInOutline } from 'react-icons/io5';

const NavBar = () => {

    const token = localStorage.getItem('Token');
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
    const [showPopover, setShowPopover] = useState(false);
    useEffect(() => {
        const fetchUserFullName = async () => {
            try {
                const response = await axios.get('http://localhost:4000/auth/me', {
                    headers: {
                        'Token': token
                    }
                });
                setUserInfo(response.data.user);
            } catch (error) {
                console.error('Error fetching user full name:', error);
            }
        };
        if (token) {
            fetchUserFullName();
        }
    }, [token]);
    return (
        <>
            <header className="bg-white shadow-md p-4  items-center fixed top-0 w-full z-10">
                <nav className='flex justify-between items-center'>
                    <div className="text-2xl font-bold pr-4">
                        <Link to="/">Ranting Cars</Link>
                    </div>
                    <div className='flex items-center'>

                        <div className='pr-4'>
                            <Link to="/" >Home</Link>
                        </div>
                        <div className='pr-4'>
                            <Link to="/cars" >Cars</Link>
                        </div>
                        <div className='pr-4'>
                            <Link to="/agencies" >Agencies</Link>
                        </div>
                    </div>
                    <div>
                        {token ? (
                            <div className="flex items-center">
                                <>
                                    <Link to="/addCar" className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4">Add Car</Link>
                                    <Link to="/sellerDashboard" className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4">Seller Dashboard</Link>
                                </>

                                <div onClick={() => navigate('/profile')}>
                                    {userInfo.name}
                                </div>
                                <div></div>
                                <button className="bg-red-500 text-white px-4 py-2 rounded-lg ml-4" onClick={logout}>
                                    <IoLogOutOutline />
                                </button>
                            </div>
                        ) : (

                            <div className="flex items-center" >
                                <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4">
                                    Login
                                </Link>
                                <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4">
                                    Register
                                </Link>
                            </div>

                        )
                        }
                    </div>
                </nav>
            </header >
        </>
    );
};

export default NavBar;
