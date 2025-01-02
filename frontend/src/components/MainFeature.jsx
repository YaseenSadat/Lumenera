/**
 * MainFeature.jsx
 * 
 * This component represents the main feature section on the homepage.
 * It highlights the "Latest Arrivals" with a visual emphasis and a 
 * call-to-action for users to explore the bestseller collection.
 */

import React from 'react';
import { assets } from '../assets/assets'; // Importing assets like images

const MainFeature = () => {
    return (
        <div className='flex flex-col sm:flex-row border-2 border-gray-400'>
            {/* Main Feature Left Side: Text Content */}
            <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
                <div className='text-[#414141]'>
                    {/* Section Header */}
                    <div className='flex items-center gap-2'>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p> {/* Decorative line */}
                        <p className='marcellus-bold font-bold text-sm md:text-base'>OUR BESTSELLERS</p>
                    </div>

                    {/* Main Title */}
                    <h1 className='marcellus-bold text-3x1 sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>

                    {/* Call-to-Action */}
                    <div className='flex items-center gap-2'>
                        <p className='marcellus-bold font-bold text-sm md:text-base'>SHOP NOW</p>
                        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p> {/* Decorative line */}
                    </div>
                </div> 
            </div>

            {/* Main Feature Right Side: Image */}
            <img 
                className='w-full sm:w-1/2' 
                src={assets.home_main_feature_img} 
                alt="Main feature visual" 
            />
        </div>
    );
};

export default MainFeature;
