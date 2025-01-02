/**
 * Login.jsx
 * 
 * This component handles the login functionality for the admin panel.
 * It collects the admin's email and password, validates the credentials 
 * with the backend, and sets the authentication token on success.
 */

import axios from 'axios'; // For making HTTP requests to the backend
import React, { useState } from 'react';
import { backendUrl } from '../App'; // Backend URL defined in the App component
import { toast } from 'react-toastify'; // For displaying notifications

const Login = ({ setToken }) => {
    // State for managing email and password inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Handles the form submission for admin login.
     * Sends the email and password to the backend for authentication.
     * Sets the token on successful login or displays an error message on failure.
     */
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault(); // Prevent default form submission behavior
            const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });

            if (response.data.success) {
                setToken(response.data.token); // Set authentication token
                toast.success('Login successful!');
            } else {
                toast.error(response.data.message); // Display error message from the backend
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        // Centered login form layout
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                {/* Login form title */}
                <h1 className='marcellus-regular text-2xl font-bold mb-4'>Admin Panel</h1>

                {/* Login form */}
                <form onSubmit={onSubmitHandler}>
                    {/* Email Input */}
                    <div className='mb-3 min-w-72'>
                        <p className='marcellus-regular text-small font-medium text-gray-700 mb-2'>Email Address</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            type="email"
                            placeholder='your@email.com'
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className='mb-3 min-w-72'>
                        <p className='marcellus-regular text-small font-medium text-gray-700 mb-2'>Password</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            type="password"
                            placeholder='Enter your password'
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        className='marcellus-regular mt-4 w-full py-2 px-4 rounded-md text-white bg-black'
                        type='submit'
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
