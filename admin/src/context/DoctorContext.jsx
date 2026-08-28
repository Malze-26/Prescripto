import React, { createContext, useState } from 'react'
import { doctors } from '../assets/assets/assets_frontend/assets'

export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(localStorage.getItem('dToken') || '')
  
  const initialDoctorAppointments = [
    {
      _id: 'd_app1',
      userData: {
        name: 'Alison Jenkins',
        dob: '2001-08-20',
        image: doctors[1].image
      },
      payment: true,
      isCompleted: false,
      cancelled: false,
      amount: 50,
      slotDate: '26_08_2026',
      slotTime: '10:00 AM'
    },
    {
      _id: 'd_app2',
      userData: {
        name: 'Jennifer Garcia',
        dob: '1995-11-04',
        image: doctors[2].image
      },
      payment: false,
      isCompleted: false,
      cancelled: false,
      amount: 50,
      slotDate: '27_08_2026',
      slotTime: '02:00 PM'
    },
    {
      _id: 'd_app3',
      userData: {
        name: 'Christopher Martinez',
        dob: '1990-03-15',
        image: doctors[3].image
      },
      payment: true,
      isCompleted: true,
      cancelled: false,
      amount: 50,
      slotDate: '25_08_2026',
      slotTime: '04:30 PM'
    }
  ]

  const [appointments, setAppointments] = useState(initialDoctorAppointments)
  const [profileData, setProfileData] = useState({
    ...doctors[0],
    available: true
  })

  const [dashData, setDashData] = useState({
    earnings: 150,
    appointments: appointments.length,
    patients: 3,
    latestAppointments: appointments.slice(0, 5)
  })

  const completeAppointment = (appointmentId) => {
    setAppointments(prev =>
      prev.map(item => (item._id === appointmentId ? { ...item, isCompleted: true } : item))
    )
  }

  const cancelAppointment = (appointmentId) => {
    setAppointments(prev =>
      prev.map(item => (item._id === appointmentId ? { ...item, cancelled: true } : item))
    )
  }

  const getDashData = () => {
    setDashData({
      earnings: 150,
      appointments: appointments.length,
      patients: 3,
      latestAppointments: appointments.slice(0, 5)
    })
  }

  const getProfileData = () => {
    return profileData
  }

  const getAppointments = () => {
    return appointments
  }

  const value = {
    dToken,
    setDToken,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData
  }

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  )
}

export default DoctorContextProvider
