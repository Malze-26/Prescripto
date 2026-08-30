import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
  }

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
      if (data.success) {
        setAppointments(data.appointments.reverse())
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const appointmentPayhere = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/payment-payhere',
        { appointmentId },
        { headers: { token } }
      )

      if (data.success) {
        if (typeof window.payhere === 'undefined') {
          return toast.error('PayHere SDK is not loaded. Please refresh the page.')
        }

        // PayHere event listeners
        window.payhere.onCompleted = async function onCompleted(orderId) {
          toast.success('Payment completed! Verifying appointment...')
          try {
            const verifyRes = await axios.post(
              backendUrl + '/api/user/verify-payhere',
              { appointmentId: orderId },
              { headers: { token } }
            )
            if (verifyRes.data.success) {
              toast.success('Appointment payment confirmed!')
              getUserAppointments()
            }
          } catch (err) {
            console.error(err)
            getUserAppointments()
          }
        }

        window.payhere.onDismissed = function onDismissed() {
          toast.info('Payment window was dismissed.')
        }

        window.payhere.onError = function onError(error) {
          toast.error('Payment Error: ' + error)
        }

        // Launch PayHere Checkout Modal
        window.payhere.startPayment(data.paymentData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  const directSimulatePayment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/verify-payhere',
        { appointmentId },
        { headers: { token } }
      )
      if (data.success) {
        toast.success('Test payment simulated successfully!')
        getUserAppointments()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b border-gray-300'>My appointments</p>
      <div>
        {appointments.map((item, index) => (
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b border-gray-200' key={index}>
            <div>
              <img className='w-32 h-36 bg-indigo-50 rounded-lg object-cover' src={item.docData.image} alt={item.docData.name} />
            </div>
            <div className='flex-1 text-sm text-zinc-600'>
              <div className='flex items-center gap-2 flex-wrap'>
                <p className='text-neutral-800 font-semibold text-base'>{item.docData.name}</p>
                {item.tokenNumber && (
                  <span className='bg-indigo-100 text-indigo-800 text-xs px-2.5 py-0.5 rounded-full font-bold shadow-xs'>
                    🎫 Token #{item.tokenNumber < 10 ? '0' + item.tokenNumber : item.tokenNumber}
                  </span>
                )}
              </div>
              <p className='text-primary text-xs font-medium mt-0.5'>{item.docData.speciality}</p>
              {item.docData.hospital && (
                <p className='text-xs text-gray-500 mt-1'>🏥 {item.docData.hospital}</p>
              )}
              <p className='text-zinc-700 font-medium mt-2'>Clinic Address:</p>
              <p className='text-xs text-zinc-500'>{item.docData.address.line1}, {item.docData.address.line2}</p>
              <p className='text-xs mt-2'>
                <span className='text-sm text-neutral-700 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && !item.isCompleted && !item.payment && (
                <>
                  <button
                    onClick={() => appointmentPayhere(item._id)}
                    className='text-sm text-stone-600 font-medium text-center sm:min-w-48 py-2 border rounded-md hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-2'
                  >
                    Pay Online (PayHere)
                  </button>
                  <button
                    onClick={() => directSimulatePayment(item._id)}
                    className='text-xs text-indigo-600 bg-indigo-50 text-center sm:min-w-48 py-1.5 border border-indigo-200 rounded-md hover:bg-indigo-600 hover:text-white transition-all duration-300 cursor-pointer'
                  >
                    ⚡ Simulate Test Payment
                  </button>
                </>
              )}
              {!item.cancelled && !item.isCompleted && item.payment && (
                <button className='sm:min-w-48 py-2 border border-green-500 bg-green-50 rounded-md text-green-600 text-sm font-medium'>
                  Paid Online ✓
                </button>
              )}
              {!item.cancelled && !item.isCompleted && (
                <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded-md hover:bg-red-600 hover:text-white transition-all duration-300 cursor-pointer'>
                  Cancel appointment
                </button>
              )}
              {item.cancelled && (
                <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                  Appointment cancelled
                </button>
              )}
              {item.isCompleted && (
                <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>
                  Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments