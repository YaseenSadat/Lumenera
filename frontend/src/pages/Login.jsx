/**
 * Login.jsx
 * 
 * This page handles user authentication, including login and registration.
 * It provides functionality for switching between login and sign-up states
 * and allows users to request a password reset link.
 */

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; // Importing global state context
import axios from 'axios'; // For making HTTP requests
import { toast } from 'react-toastify'; // For displaying notifications

const Login = () => {
  // Local states for managing form inputs and page state
  const [currentState, setCurrentState] = useState('Login'); // Toggles between 'Login' and 'Sign Up'
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext); // Context for authentication and navigation
  const [name, setName] = useState(''); // Stores user's name (used in sign-up)
  const [password, setPassword] = useState(''); // Stores user's password
  const [email, setEmail] = useState(''); // Stores user's email

  /**
   * Handles form submission for login or sign-up based on `currentState`.
   * Sends user credentials to the backend and sets the token on success.
   */
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      if (currentState === 'Sign Up') {
        // Handle user registration
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Registration successful!');
        } else {
          toast.error(response.data.message);
        }
      } else {
        // Handle user login
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          toast.success('Login successful!');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  };

  /**
   * Handles password reset request by sending an email to the backend.
   * Validates email format before sending the request.
   */
  const handleForgotPassword = async () => {
    try {
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        return toast.error('Please enter a valid email address.');
      }

      const response = await axios.post(`${backendUrl}/api/email/forgot-password`, { email });
      if (response.data.success) {
        toast.success('Password reset email sent!');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error sending password reset email. Please try again.');
    }
  };

  /**
   * Redirects the user to the homepage if authenticated.
   */
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    // Authentication form
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      {/* Page Title */}
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='marcellus-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {/* Name Input (only displayed in Sign Up state) */}
      {currentState === 'Login' ? null : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className='marcellus-regular w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          required
        />
      )}

      {/* Email Input */}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className='marcellus-regular w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
      />

      {/* Password Input */}
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className='marcellus-regular w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        required
      />

      {/* Forgot Password and Toggle Between Login/Sign-Up */}
      <div className='marcellus-regular w-full flex justify-between text-sm mt-[8px]'>
        {currentState === 'Login' && (
          <p className='marcellus-regular cursor-pointer' onClick={handleForgotPassword}>
            Forgot your password?
          </p>
        )}
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className='marcellus-regular cursor-pointer'>
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='marcellus-regular cursor-pointer'>
            Already have an account?
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button className='marcellus-regular bg-black text-white font-light px-8 py-2 mt-4'>
        {currentState === 'Login' ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
