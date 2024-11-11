import React from 'react'
import {assests} from '../assets/assets'

const Navbar = () => {
  return (
    <div className='flex item-center justify-between py-5 font medium'>
        
        <img src={assests.logo} className='w-36' alt="" />

    </div>
  )
}

export default Navbar