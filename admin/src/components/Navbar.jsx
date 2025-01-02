/**
 * Navbar.jsx
 * 
 * This component represents the navigation bar for the admin panel.
 * It includes the application title/logo and a logout button to clear 
 * the authentication token and log out the admin user.
 */

import React from 'react';
import { assets } from "../assets/assets"; // Importing assets like the logo

const Navbar = ({ setToken }) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      {/* Logo or Application Title */}
      <img 
        className='w-[max(10%,80px)]' 
        src={assets.lumenera_title} 
        alt="Lumenera Admin" 
      />

      {/* Logout Button */}
      <button
        onClick={() => setToken('')} // Clears the token to log out the admin
        className='marcellus-regular bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
