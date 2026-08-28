import React, { createContext, useState } from 'react'
import { doctors as initialDoctors } from '../assets/assets/assets_frontend/assets'
import { assets } from '../assets/assets/assets_admin/assets'

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') || 'admin-demo-token')
  const [doctors, setDoctors] = useState(initialDoctors.map(doc => ({ ...doc, available: true })))

  const initialAppointments = [
    {
      _id: 'app1',
      userData: {
        name: 'Richard James',
        image: assets.people_icon || initialDoctors[0].image,
        dob: '1998-05-12'
      },
      docData: initialDoctors[0],
      slotDate: '26_08_2026',
      slotTime: '10:00 AM',
      amount: initialDoctors[0].fees,
      cancelled: false,
      isCompleted: false
    },
    {
      _id: 'app2',
      userData: {
        name: 'Alison Jenkins',
        image: initialDoctors[1].image,
        dob: '2001-08-20'
      },
      docData: initialDoctors[1],
      slotDate: '26_08_2026',
      slotTime: '11:30 AM',
      amount: initialDoctors[1].fees,
      cancelled: false,
      isCompleted: false
    },
    {
      _id: 'app3',
      userData: {
        name: 'Jennifer Garcia',
        image: initialDoctors[2].image,
        dob: '1995-11-04'
      },
      docData: initialDoctors[2],
      slotDate: '27_08_2026',
      slotTime: '02:00 PM',
      amount: initialDoctors[2].fees,
      cancelled: false,
      isCompleted: false
    },
    {
      _id: 'app4',
      userData: {
        name: 'Christopher Martinez',
        image: initialDoctors[3].image,
        dob: '1990-03-15'
      },
      docData: initialDoctors[3],
      slotDate: '28_08_2026',
      slotTime: '04:30 PM',
      amount: initialDoctors[3].fees,
      cancelled: true,
      isCompleted: false
    },
    {
      _id: 'app5',
      userData: {
        name: 'Emily Larson',
        image: initialDoctors[4].image,
        dob: '2003-09-22'
      },
      docData: initialDoctors[4],
      slotDate: '29_08_2026',
      slotTime: '09:00 AM',
      amount: initialDoctors[4].fees,
      cancelled: false,
      isCompleted: true
    }
  ]

  const [appointments, setAppointments] = useState(initialAppointments)

  const [dashData, setDashData] = useState({
    doctors: doctors.length,
    appointments: appointments.length,
    patients: 5,
    latestAppointments: appointments.slice(0, 5)
  })

  const changeAvailability = (docId) => {
    setDoctors(prev =>
      prev.map(doc => (doc._id === docId ? { ...doc, available: !doc.available } : doc))
    )
  }

  const cancelAppointment = (appointmentId) => {
    setAppointments(prev =>
      prev.map(item => (item._id === appointmentId ? { ...item, cancelled: true } : item))
    )
  }

  const addDoctor = (newDoc) => {
    const docWithId = {
      ...newDoc,
      _id: `doc_${Date.now()}`,
      available: true
    }
    setDoctors(prev => [docWithId, ...prev])
  }

  const getAllDoctors = () => {
    return doctors
  }

  const getAllAppointments = () => {
    return appointments
  }

  const getDashData = () => {
    setDashData({
      doctors: doctors.length,
      appointments: appointments.length,
      patients: 5,
      latestAppointments: appointments.slice(0, 5)
    })
  }

  const value = {
    aToken,
    setAToken,
    doctors,
    setDoctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    cancelAppointment,
    dashData,
    getDashData,
    addDoctor
  }

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider
