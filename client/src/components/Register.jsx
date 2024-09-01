import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/user/register', { firstName, lastName, email, password });
            if (response.status !== 200) {
                alert(response.data.message);

            } else {
                alert('Registration successful');
                window.location.href = '/login';
            }
        } catch (err) {
            alert(err.response.data.message);
        }

    };

    return (<>
        <div className="max-w-md mx-auto my-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>} {/* Display error message if error state is not empty */}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">email:</label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label> {/* Corrected label text to "Password" */}
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
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
