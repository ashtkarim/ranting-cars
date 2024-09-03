import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { IoLogOutOutline } from 'react-icons/io5';
const NavBar = () => {

    const token = localStorage.getItem('Token');
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const fetchUserFullName = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/me', {
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
        <header className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 w-full z-10">


            {token ? (
                <>
                    <div className="text-2xl font-bold">Ranting Cars</div>
                    <nav>
                        <div className="flex items-center">
                            <div onClick={() => navigate('/profile')}>
                                {userInfo.firstName} {userInfo.lastName}
                            </div>
                            <div></div>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg ml-4" onClick={logout}>
                                <IoLogOutOutline />
                            </button>
                        </div>
                    </nav>
                </>
            ) : (
                <>
                    <div className="text-2xl font-bold">Ranting Cars</div>

                    <nav>

                        <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4">
                            Login
                        </Link>
                        <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded-lg ml-4">
                            Register
                        </Link>
                    </nav>
                </>

            )}
        </header >
    );
};

export default NavBar;
