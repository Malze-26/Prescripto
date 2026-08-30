import React from 'react'
import { assets } from '../assets/assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const navigate = useNavigate()

  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* ----- Left Section ----- */}
        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="Prescripto" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            Prescripto is Sri Lanka's leading digital healthcare platform, connecting patients with top specialized doctors, consultants, and hospitals for seamless online appointments.
          </p>
        </div>

        {/* ----- Center Section ----- */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li onClick={() => { navigate('/'); window.scrollTo(0, 0) }} className='cursor-pointer hover:text-black'>Home</li>
            <li onClick={() => { navigate('/about'); window.scrollTo(0, 0) }} className='cursor-pointer hover:text-black'>About us</li>
            <li onClick={() => { navigate('/contact'); window.scrollTo(0, 0) }} className='cursor-pointer hover:text-black'>Contact us</li>
            <li className='cursor-pointer hover:text-black'>Privacy policy</li>
          </ul>
        </div>

        {/* ----- Right Section ----- */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+94 11 269 1111</li>
            <li>contact@prescripto.lk</li>
          </ul>
        </div>
      </div>

      {/* ----- Copyright Text ----- */}
      <div>
        <hr className='border-gray-200' />
        <p className='py-5 text-sm text-center text-gray-500'>Copyright 2024 @ Prescripto - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
