import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className='text-center'>
        <p className='marcellus-regular text-2xl font-medium text-gray-800'>Get exclusive insights and tips, subscribe now!</p>
        <p className='marcellus-regular text-gray-400 mt-3'>Be the first to know about new arrivals, exclusive offers, and special events</p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap3 mx-auto my-6 border pl-3'>
            <input className='marcellus-regular w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email' required/>
            <button type='submit' className='marcellus-regular font-bold bg-black text-white text-xs px-10 py-4 '>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsletterBox