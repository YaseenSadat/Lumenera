import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>

      <div>
        <img src={assets.authenticity_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='marcellus-bold font-semibold'>Authenticity Guarantee</p>
        <p className='marcellus-regular text-gray-400 '>All cards are 100% original and authentic.</p>
      </div>
      <div>
        <img src={assets.shield_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='marcellus-bold font-bold'>Secure Payment</p>
        <p className='marcellus-regular text-gray-400 '>Shop confidently with our encrypted payment system.</p>
      </div>
      <div>
        <img src={assets.fast_shipping_icon} className='w-12 m-auto mb-5 mt-3' alt="" />
        <p className='marcellus-bold font-semibold'>Fast Shipping</p>
        <p className='marcellus-regular text-gray-400 '>Get your cards delivered quickly.</p>
      </div>

    </div>
  )
}

export default OurPolicy