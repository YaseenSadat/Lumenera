/**
 * Footer.jsx
 * 
 * This component represents the footer section of the application.
 * It includes company information, navigation links, and contact details.
 * The footer is designed to provide users with quick access to essential links and 
 * create a consistent brand presence across the site.
 */

import React from "react";
import { assets } from "../assets/assets"; // Importing assets like the logo
import { NavLink } from "react-router-dom"; // For internal navigation

const Footer = () => {
    return (
        <div>
            {/* Main footer layout with a grid structure for content organization */}
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                {/* Section: Company Logo and Description */}
                <div>
                    <img 
                        src={assets.new_logo} 
                        className="mb-5 w-32" 
                        alt="Lumenera Logo" 
                    />
                    <p className="marcellus-regular w-full md:w-2/3 text-gray-600">
                        Founded in 2024, Lumenera is dedicated to creating a world of
                        adventure, strategy, and competition through our exclusive trading
                        card collections. Our mission is to bring players and collectors
                        closer to captivating characters, legendary stories, and
                        unparalleled gameplay experiences. With a focus on innovation and
                        community, we strive to inspire enthusiasts of all levels. Join us
                        in building a vibrant community where every card tells a story, and
                        every player has a place.
                    </p>
                </div>

                {/* Section: Company Navigation Links */}
                <div>
                    <p className="marcellus-bold text-xl font-bold mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        {/* Navigation links to different pages */}
                        <li className="marcellus-regular">
                            <NavLink 
                                to="/" 
                                className="marcellus-regular hover:text-black">
                                Home
                            </NavLink>
                        </li>
                        <li className="marcellus-regular">
                            <NavLink 
                                to="/collection" 
                                className="marcellus-regular hover:text-black">
                                Collection
                            </NavLink>
                        </li>
                        <li className="marcellus-regular">
                            <NavLink 
                                to="/about" 
                                className="marcellus-regular hover:text-black">
                                About Us
                            </NavLink>
                        </li>
                        <li className="marcellus-regular">
                            <NavLink 
                                to="/contact" 
                                className="marcellus-regular hover:text-black">
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Section: Contact Information */}
                <div>
                    <p className="marcellus-bold text-xl font-bold mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        {/* Displaying phone number and email */}
                        <li className="marcellus-regular">+1-437-484-7007</li>
                        <li className="marcellus-regular">lumeneracards@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* Bottom section with copyright information */}
            <div>
                <hr /> {/* Divider line */}
                <p className="marcellus-regular py-5 text-sm text-center">
                    Copyright 2024 @Lumenera.com - All Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
