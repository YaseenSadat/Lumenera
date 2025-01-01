import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const {backendUrl} = useContext(ShopContext);


  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + '/api/email/forgot-password', { email });
      if (response.data.success) {
        toast.success('If an account with this email exists, you will receive a password reset email shortly. Please check your inbox and spam folder.');
        toast.success('Password reset link has been sent to your email.');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error sending reset link. Please try again.');
    }
  };

  return (
    <form onSubmit={handleForgotPassword} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <p className="prata-regular text-3xl">Forgot Password</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 border border-gray-800"
        required
      />
      <button className="bg-black text-white font-light px-8 py-2 mt-4">Send Reset Link</button>
    </form>
  );
};

export default ForgotPassword;
