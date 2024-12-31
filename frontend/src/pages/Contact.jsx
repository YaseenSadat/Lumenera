import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='marcellus-regular font-bold text-xl text-gray-600'>Contact</p>
          <p className='marcellus-regular text-gray-500'>Tel: (437) 484-7007 <br /> Email: lumeneracards@gmail.com</p>
        </div>
      </div>

      <NewsletterBox/>
    </div>
  )
}

export default Contact