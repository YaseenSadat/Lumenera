import React from "react";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Footer = () => {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <img src={assets.new_logo} className="mb-5 w-32" alt="" />
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

                <div>
                    <p className="marcellus-bold text-xl font-bold mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li className="marcellus-regular">
                            <NavLink to="/" className="hover:text-black">Home</NavLink>
                        </li>
                        <li className="marcellus-regular">
                            <NavLink to="/collection" className="hover:text-black">Collection</NavLink>
                        </li>
                        <li className="marcellus-regular">
                            <NavLink to="/about" className="hover:text-black">About Us</NavLink>
                        </li>
                        <li className="marcellus-regular">
                            <NavLink to="/contact" className="hover:text-black">Contact</NavLink>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="marcellus-bold text-xl font-bold mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-gray-600">
                        <li className="marcellus-regular">+1-437-484-7007</li>
                        <li className="marcellus-regular">lumeneracards@gmail.com</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className="marcellus-regular py-5 text-sm text-center">
                    Copyright 2024 @Lumenera.com - All Rights Reserved
                </p>
            </div>
        </div>
    );
};

export default Footer;
