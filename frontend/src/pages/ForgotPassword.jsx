/**
 * ForgotPassword.jsx
 * 
 * This page handles the "Forgot Password" functionality.
 * Users can enter their email to receive a password reset link.
 * The component communicates with the backend to send the reset link and provides 
 * feedback to the user via toast notifications.
 */

import React, { useState } from 'react';
import axios from 'axios'; // For making HTTP requests to the backend
import { toast } from 'react-toastify'; // For displaying notifications
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing global state context

const ForgotPassword = () => {
  // State to manage the email input
  const [email, setEmail] = useState('');

  // Accessing the backend URL from ShopContext
  const { backendUrl } = useContext(ShopContext);

  /**
   * Handles the form submission for password reset.
   * Sends a request to the backend with the entered email to trigger the reset process.
   */
  const handleForgotPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await axios.post(`${backendUrl}/api/email/forgot-password`, { email });

      // Notify user of the result
      if (response.data.success) {
        toast.success('If an account with this email exists, you will receive a password reset email shortly. Please check your inbox and spam folder.');
        toast.success('Password reset link has been sent to your email.');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle any errors during the request
      toast.error('Error sending reset link. Please try again.');
    }
  };

  return (
    // Form for entering the email address
    <form
      onSubmit={handleForgotPassword}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      {/* Page title */}
      <p className="prata-regular text-3xl">Forgot Password</p>

      {/* Email input field */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update email state on input change
        className="w-full px-3 py-2 border border-gray-800"
        required // Ensure the input is not empty
      />

      {/* Submit button */}
      <button className="bg-black text-white font-light px-8 py-2 mt-4">
        Send Reset Link
      </button>
    </form>
  );
};

export default ForgotPassword;
