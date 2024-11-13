import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>

       <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

            <div>
                <img src={assets.newlogo} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>
                Founded in 2024, Shopease is dedicated to bringing you quality, style, and affordability in every piece. Our mission is to make fashion accessible and enjoyable, with a focus on modern trends and timeless essentials. Join us in creating a community that values individuality and effortless style.
                </p>
            </div>
        
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1-437-484-7007</li>
                    <li>contact@shopease.com</li>
                </ul>
            </div>

        </div> 

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024 @ShopEase.com - All Rights Reserved</p>
        </div>

    </div>
  )
}

export default Footer