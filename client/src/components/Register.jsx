import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { backendUrl } from '../config/ip';
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const handleSubmit = async (e) => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (name.length < 3 || email.length < 3 || password.length < 3 || address.length < 3) {
            setError('All fields are required');
            return;
        }
        if (!validateEmail(email)) {
            setError('Invalid email address');
            return;
        }

        e.preventDefault();
        try {
            const response = await axios.post(
                `${backendUrl}/auth/register`, {
                name,
                email,
                password,
                address
            });
            if (response.status !== 200) {
                setError(response.data.message);
            } else {

                window.location.href = '/login';
            }
        } catch (err) {
            console.log(err)
            // alert(err.response.data.message);
        }

    };

    return (<>
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Name :</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                    <div className='flex flex-row relative'>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value.replace(" ", ""))}
                        />
                        <div className="absolute right-0 top-0 mt-3 mr-4"
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password:</label> {/* Corrected label text to "Password" */}
                    <div className='flex flex-row relative'>

                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value.replace(" ", ""))
                                if (password !== e.target.value.replace(" ", "")) {
                                    setError('Passwords do not match');
                                } else {
                                    setError('');
                                }

                            }}
                        />
                        <div className="absolute right-0 top-0 mt-3 mr-4"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                </div>



                <div className="flex justify-between items-center">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Register</button>
                    <Link to="/login" className="block text-sm text-blue-500 hover:text-blue-700">Already have an account? </Link>
                </div>
            </form>
        </div>
    </>
    );
};

export default Register;
