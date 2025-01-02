/**
 * Sidebar.jsx
 * 
 * This component represents the sidebar navigation for the admin panel.
 * It provides links to key admin functionalities such as adding items, 
 * viewing the product list, and managing orders. Each link is styled 
 * and includes an icon for better user experience.
 */

import React from 'react';
import { NavLink } from 'react-router-dom'; // For client-side navigation
import { assets } from '../assets/assets'; // Importing assets like icons

const Sidebar = () => {
    return (
        <div className='w-[18%] min-h-screen border-r-2'>
            {/* Sidebar Navigation Links */}
            <div className='flex flex-col gap-3 pt-6 pl-[20%] text-[15px]'>

                {/* Link: Add Items */}
                <NavLink
                    className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'
                    to='/add'
                >
                    <img className='w-5 h-5' src={assets.add_icon} alt="Add Icon" />
                    <p className='marcellus-regular hidden md:block'>Add Items</p>
                </NavLink>

                {/* Link: List Items */}
                <NavLink
                    className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'
                    to='/list'
                >
                    <img className='w-5 h-5' src={assets.order_icon} alt="List Icon" />
                    <p className='marcellus-regular hidden md:block'>List Items</p>
                </NavLink>

                {/* Link: Orders */}
                <NavLink
                    className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l'
                    to='/orders'
                >
                    <img className='w-5 h-5' src={assets.order_icon} alt="Orders Icon" />
                    <p className='marcellus-regular hidden md:block'>Orders</p>
                </NavLink>
            </div>
        </div>
    );
};

export default Sidebar;
