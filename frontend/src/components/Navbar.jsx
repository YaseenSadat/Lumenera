/**
 * Navbar.jsx
 * 
 * This component represents the navigation bar of the application.
 * It includes links to different sections of the site, a user profile menu,
 * a shopping cart, a search icon, and a responsive sidebar for small screens.
 */

import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets'; // Importing assets such as icons and logos
import { Link, NavLink } from 'react-router-dom'; // For navigation between routes
import { ShopContext } from '../context/ShopContext'; // Importing global state context

const Navbar = () => {
  // State to control the visibility of the mobile sidebar menu
  const [visible, setVisible] = useState(false);

  // Destructuring required context methods and variables
  const { getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  /**
   * Handles user logout by clearing the token, resetting the cart, 
   * and redirecting the user to the login page.
   */
  const logout = () => {
    navigate('/login'); // Navigate to login page
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(''); // Reset token in context
    setCartItems({}); // Clear cart items
  };

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      {/* Logo with link to homepage */}
      <Link to='/'>
        <img src={assets.new_logo} className="w-44 h-auto" alt="Logo" />
      </Link>

      {/* Navigation links for desktop view */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p className='marcellus-bold font-extrabold'>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p className='marcellus-bold font-extrabold'>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p className='marcellus-bold font-extrabold'>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p className='marcellus-bold font-extrabold'>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      {/* Icons: Search, Profile, Cart, Mobile Menu */}
      <div className='flex items-center gap-6'>
        {/* Search Icon */}
        <img
          onClick={() => navigate('/collection')}
          src={assets.search_icon}
          className='w-5 cursor-pointer'
          alt="Search"
        />

        {/* Profile Icon with dropdown menu */}
        <div className='group relative'>
          <img
            onClick={() => token ? null : navigate('/login')}
            className='w-5 cursor-pointer'
            src={assets.profile_icon}
            alt="Profile"
          />
          {token && (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <p
                  onClick={() => navigate('/orders')}
                  className='cursor-pointer hover:text-black'>
                  Order History
                </p>
                <p
                  onClick={logout}
                  className='cursor-pointer hover:text-black'>
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart Icon with item count */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt="Menu"
        />
      </div>

      {/* Sidebar Menu for Mobile View */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
          {/* Back Button */}
          <div
            onClick={() => setVisible(false)}
            className='flex items-center gap-4 p-3 cursor-pointer'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Back" />
            <p>Back</p>
          </div>
          {/* Mobile Navigation Links */}
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
