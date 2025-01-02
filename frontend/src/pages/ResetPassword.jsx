/**
 * ResetPassword.jsx
 * 
 * This page allows users to reset their password using a secure token.
 * Users enter a new password, confirm it, and submit the form.
 * The component communicates with the backend to validate the token and update the password.
 */

import React, { useState } from 'react';
import axios from 'axios'; // For making HTTP requests
import { toast } from 'react-toastify'; // For displaying notifications
import { useSearchParams, useNavigate } from 'react-router-dom'; // For handling URL params and navigation
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing global state context

const ResetPassword = () => {
    // States for managing password inputs
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Extract the token from the URL search parameters
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token'); // Token used for password reset

    const navigate = useNavigate(); // Navigation helper
    const { backendUrl } = useContext(ShopContext); // Accessing the backend URL from context

    /**
     * Handles the password reset form submission.
     * Validates password length and confirmation before sending the request.
     */
    const handleResetPassword = async (e) => {
        e.preventDefault();

        // Validate password length
        if (newPassword.length < 8) {
            return toast.error('Password must be at least 8 characters long.');
        }

        // Validate password confirmation
        if (newPassword !== confirmPassword) {
            return toast.error('Passwords do not match.');
        }

        try {
            // Send reset request to the backend
            const response = await axios.post(`${backendUrl}/api/email/reset-password`, { token, newPassword });
            if (response.data.success) {
                toast.success('Password reset successfully.');
                navigate('/login'); // Redirect to the login page on success
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error resetting password. Please try again.');
        }
    };

    return (
        // Password Reset Form
        <form
            onSubmit={handleResetPassword}
            className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
        >
            {/* Page Title */}
            <p className="prata-regular text-3xl">Reset Password</p>

            {/* New Password Input */}
            <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-800"
                required // Ensures the input is not empty
            />

            {/* Confirm Password Input */}
            <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-800"
                required // Ensures the input is not empty
            />

            {/* Submit Button */}
            <button className="bg-black text-white font-light px-8 py-2 mt-4">
                Reset Password
            </button>
        </form>
    );
};

export default ResetPassword;
