import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div> 

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>At CardMaster Trading Co., we bring together enthusiasts and collectors 
from around the world to celebrate the timeless joy of card trading. 
Our mission is to offer a comprehensive platform where individuals can 
buy, sell, and trade collectible cards across a variety of categories, 
from sports and gaming to rare vintage sets. With a meticulously curated 
inventory and partnerships with leading brands, we ensure authenticity 
and quality in every transaction. Whether you're hunting for that elusive 
card to complete your collection or exploring the world of trading for the 
first time, CardMaster Trading Co. is your trusted companion.</p>
          <p>Our platform combines state-of-the-art technology with a passion for 
community building. We host online auctions, live trading events, and 
expert-led workshops to help collectors expand their knowledge and refine 
their collections. Our grading and valuation services provide peace of mind, 
ensuring that each card is properly assessed by industry professionals. 
At CardMaster Trading Co., we're more than a marketplace—we're a thriving 
community where stories are shared, friendships are forged, and the 
excitement of discovery never ends.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>At CardMaster Trading Co., our mission is to create a trusted platform 
where collectors and enthusiasts can buy, sell, and trade cards with ease. 
We are dedicated to fostering a vibrant community while ensuring 
authenticity, quality, and a seamless trading experience for all.

Whether you're a seasoned collector or just starting out, our goal is to 
provide the tools, resources, and connections to help you grow your 
collection and share your passion with others.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US?'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>At CardMaster Trading Co., quality assurance is at the heart of everything 
we do. Every card that passes through our platform undergoes rigorous 
inspection and verification by industry experts to ensure authenticity and 
condition. With our commitment to transparency and excellence, you can 
trade and collect with complete confidence.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>At CardMaster Trading Co., quality assurance is at the heart of everything 
we do. Every card that passes through our platform undergoes rigorous 
inspection and verification by industry experts to ensure authenticity and 
condition. With our commitment to transparency and excellence, you can 
trade and collect with complete confidence.
          </p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>At CardMaster Trading Co., quality assurance is at the heart of everything 
we do. Every card that passes through our platform undergoes rigorous 
inspection and verification by industry experts to ensure authenticity and 
condition. With our commitment to transparency and excellence, you can 
trade and collect with complete confidence.
          </p>
        </div>
      </div>

      <NewsletterBox/>


    </div>
  )
}

export default About