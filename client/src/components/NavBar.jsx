import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {

    const token = localStorage.getItem('Token');
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});
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
        <header className="bg-white shadow-md p-4  fixed top-0 w-full z-10 ">
            {token ? (
                <nav className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Link to="/mycars">My Cars</Link>
                        <Link to="/addcar" >Add Car</Link>
                    </div>
                    <div className='flex justify-between  item-center'>
                        <div onClick={() => navigate('/profile')} className="px-4 py-2">
                            {userInfo.name}
                        </div>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg " onClick={logout}>
                            logout
                        </button>
                    </div>
                </nav>
            ) : (
                <nav className="flex justify-between items-center w-full">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-gray-700">Home</Link>
                        <Link to="/cars" className="text-gray-700">Cars</Link>
                        <Link to="/agencies" className="text-gray-700">Agencies</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                            Login
                        </Link>
                        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-lg">
                            Register
                        </Link>
                    </div>
                </nav>
            )}
        </header>
    );
};

export default NavBar;
