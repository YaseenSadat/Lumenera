/**
 * App.jsx
 * 
 * This is the main application component for the admin package.
 * It manages user authentication, displays the `Navbar` and `Sidebar`,
 * and sets up routing for various admin functionalities such as adding products,
 * viewing the product list, and managing orders.
 */

import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar'; // Top navigation bar component
import Sidebar from './components/Sidebar'; // Sidebar navigation component
import { Routes, Route } from 'react-router-dom'; // For routing within the admin package
import Add from './pages/Add'; // Page for adding new products
import List from './pages/List'; // Page for viewing the product list
import Orders from './pages/Orders'; // Page for managing orders
import Login from './components/Login'; // Login component for authentication
import { ToastContainer } from 'react-toastify'; // For displaying notifications
import 'react-toastify/dist/ReactToastify.css'; // Styling for toast notifications

// Global variables for backend URL and currency symbol
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = '$';

const App = () => {
  // State for managing user authentication token
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  /**
   * Syncs the token with localStorage whenever it changes.
   * Ensures the token persists across sessions.
   */
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Toast notification container */}
      <ToastContainer />

      {/* Conditional rendering based on authentication status */}
      {token === ""
        ? (
          // Display Login page if no token exists
          <Login setToken={setToken} />
        ) : (
          // Render main admin layout if authenticated
          <>
            <Navbar setToken={setToken} /> {/* Top navigation bar */}
            <hr />
            <div className='flex w-full'>
              <Sidebar /> {/* Sidebar navigation */}
              <div className='w-[70%] mx-auto ml-[max(5vw,20px)] my-8 text-gray-600 text-base'>
                <Routes>
                  {/* Routing for admin functionalities */}
                  <Route path='/add' element={<Add token={token} />} />
                  <Route path='/list' element={<List token={token} />} />
                  <Route path='/orders' element={<Orders token={token} />} />
                </Routes>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};

export default App;
