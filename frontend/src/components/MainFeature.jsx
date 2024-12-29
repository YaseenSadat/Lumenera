import React from 'react'
import { assets } from '../assets/assets'

const MainFeature = () => {
  return (
    <div className='flex flex-col sm:flex-row border-2 border-gray-400'>
        {/* Main Feature Left Side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className='marcellus-regular font-bold text-sm md:text-base'>OUR BESTSELLERS</p>
                </div>
                <h1 className='marcellus-regular text-3x1 sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                <div className='flex items-center gap-2'>
                    <p className='marcellus-regular font-bold text-sm md:text-base'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                </div>
            </div> 
        </div>
        {/* Main Feature Right Side*/}
        <img  className='w-full sm:w-1/2' src={assets.home_main_feature_img} alt="" />
    </div>
  )
}

export default MainFeature
