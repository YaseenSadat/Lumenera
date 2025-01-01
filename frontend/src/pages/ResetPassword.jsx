import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';


const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token'); // Extract token from URL
    const { backendUrl } = useContext(ShopContext);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword.length < 8) {
            return toast.error('Password must be at least 8 characters long.');
        }
        if (newPassword !== confirmPassword) {
            return toast.error('Passwords do not match.');
        }

        try {
            const response = await axios.post(backendUrl + '/api/email/reset-password', { token, newPassword });
            if (response.data.success) {
                toast.success('Password reset successfully.');
                navigate('/login');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error resetting password. Please try again.');
        }
    };

    return (
        <form onSubmit={handleResetPassword} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
            <p className="prata-regular text-3xl">Reset Password</p>
            <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-800"
                required
            />
            <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-800"
                required
            />
            <button className="bg-black text-white font-light px-8 py-2 mt-4">Reset Password</button>
        </form>
    );
};

export default ResetPassword;
