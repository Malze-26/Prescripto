import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets/assets_admin/assets'

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium text-gray-700'>All Appointments</p>

      <div className='bg-white border border-gray-200 rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll shadow-sm'>
        {/* Table Header */}
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3.5 px-6 border-b border-gray-200 bg-gray-50 text-gray-600 font-medium'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Table Rows */}
        {appointments.map((item, index) => (
          <div
            className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors'
            key={index}
          >
            <p className='max-sm:hidden'>{index + 1}</p>

            <div className='flex items-center gap-2'>
              <img className='w-8 h-8 rounded-full object-cover bg-gray-200' src={item.userData.image} alt={item.userData.name} />
              <p className='font-medium text-gray-800'>{item.userData.name}</p>
            </div>

            <div>
              <p className={`text-xs inline border px-2 py-0.5 rounded-full font-medium ${item.payment ? 'border-primary text-primary' : 'border-gray-400 text-gray-500'}`}>
                {item.payment ? 'Online' : 'CASH'}
              </p>
            </div>

            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            <p>{currency}{item.amount}</p>

            {
              item.cancelled
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                  : (
                    <div className='flex gap-1'>
                      <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer hover:scale-110 transition-transform' src={assets.cancel_icon} alt="cancel" />
                      <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer hover:scale-110 transition-transform' src={assets.tick_icon} alt="tick" />
                    </div>
                  )
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointments
