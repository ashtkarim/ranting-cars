import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { backendUrl } from '../config/ip';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const token = localStorage.getItem('Token');

    const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${backendUrl}/auth/login`, { email, password });
            localStorage.setItem('Token', response.headers.get('Token'));
            setIsAuthenticated(true);
            navigate('/');
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const logout = () => {
        localStorage.removeItem('Token');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
