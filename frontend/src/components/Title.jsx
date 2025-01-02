/**
 * Title.jsx
 * 
 * This component renders a styled title for sections of the application.
 * It takes two text inputs (`text1` and `text2`) and combines them with 
 * custom styling, including a decorative line.
 */
import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
        <p className='marcellus-bold text-gray-500 font-medium text-lg'>{text1} <span className='marcellus-bold text-gray-700 font-extrabold text-lg'>{text2}</span></p>
        <p className='w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700'></p>
    </div>
  )
}

export default Title