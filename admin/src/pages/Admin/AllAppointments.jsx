import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets/assets_admin/assets'

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium text-gray-700'>All Appointments</p>

      <div className='bg-white border border-gray-200 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll shadow-sm'>
        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[0.8fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3.5 px-6 border-b border-gray-200 bg-gray-50 text-gray-600 font-medium'>
          <p>Token #</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Table Rows */}
        {appointments.map((item, index) => (
          <div
            className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.8fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors'
            key={index}
          >
            <div className='max-sm:hidden'>
              <span className='px-2.5 py-1 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-full'>
                #{item.tokenNumber || index + 1}
              </span>
            </div>

            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full object-cover bg-gray-200' src={item.userData.image} alt={item.userData.name} />
              <p className='font-medium text-gray-800'>{item.userData.name}</p>
            </div>

            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full object-cover bg-gray-200' src={item.docData.image} alt={item.docData.name} />
              <p className='text-gray-800'>{item.docData.name}</p>
            </div>

            <p>{currency}{item.amount}</p>

            {
              item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer hover:scale-110 transition-transform' src={assets.cancel_icon} alt="cancel" />
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
