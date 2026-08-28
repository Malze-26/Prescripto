import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets/assets_admin/assets'

const Sidebar = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-white border-r border-gray-200'>
      {
        aToken && (
          <ul className='text-[#515151] mt-5'>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary font-medium' : 'hover:bg-gray-50'
                }`
              }
              to='/admin-dashboard'
            >
              <img className='w-5' src={assets.home_icon} alt="home" />
              <p className='hidden md:block'>Dashboard</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary font-medium' : 'hover:bg-gray-50'
                }`
              }
              to='/all-appointments'
            >
              <img className='w-5' src={assets.appointment_icon} alt="appointments" />
              <p className='hidden md:block'>Appointments</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary font-medium' : 'hover:bg-gray-50'
                }`
              }
              to='/add-doctor'
            >
              <img className='w-5' src={assets.add_icon} alt="add" />
              <p className='hidden md:block'>Add Doctor</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary font-medium' : 'hover:bg-gray-50'
                }`
              }
              to='/doctor-list'
            >
              <img className='w-5' src={assets.people_icon} alt="doctors" />
              <p className='hidden md:block'>Doctors List</p>
            </NavLink>
          </ul>
        )
      }

      {
        dToken && (
          <ul className='text-[#515151] mt-5'>
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary font-medium' : 'hover:bg-gray-50'
                }`
              }
              to='/doctor-dashboard'
            >
              <img className='w-5' src={assets.home_icon} alt="home" />
              <p className='hidden md:block'>Dashboard</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary font-medium' : 'hover:bg-gray-50'
                }`
              }
              to='/doctor-appointments'
            >
              <img className='w-5' src={assets.appointment_icon} alt="appointments" />
              <p className='hidden md:block'>Appointments</p>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer transition-colors ${
                  isActive ? 'bg-[#F2F3FF] border-r-4 border-primary text-primary font-medium' : 'hover:bg-gray-50'
                }`
              }
              to='/doctor-profile'
            >
              <img className='w-5' src={assets.people_icon} alt="profile" />
              <p className='hidden md:block'>Profile</p>
            </NavLink>
          </ul>
        )
      }
    </div>
  )
}

export default Sidebar
