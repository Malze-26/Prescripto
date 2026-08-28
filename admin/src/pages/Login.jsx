import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken } = useContext(AdminContext)
  const { setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    if (state === 'Admin') {
      setAToken('admin-token')
      localStorage.setItem('aToken', 'admin-token')
    } else {
      setDToken('doctor-token')
      localStorage.setItem('dToken', 'doctor-token')
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-zinc-200 rounded-xl text-[#5E5E5E] text-sm shadow-lg bg-white'>
        <p className='text-2xl font-semibold m-auto text-gray-800'>
          <span className='text-primary'>{state}</span> Login
        </p>

        <div className='w-full mt-2'>
          <p className='font-medium text-gray-700'>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1 focus:outline-primary'
            type="email"
            placeholder={state === 'Admin' ? 'admin@prescripto.com' : 'doctor@prescripto.com'}
            required
          />
        </div>

        <div className='w-full'>
          <p className='font-medium text-gray-700'>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1 focus:outline-primary'
            type="password"
            placeholder='••••••••'
            required
          />
        </div>

        <button
          type='submit'
          className='bg-primary text-white w-full py-2.5 rounded-md text-base font-medium mt-2 hover:bg-opacity-95 transition-all cursor-pointer shadow-sm'
        >
          Login
        </button>

        {
          state === 'Admin'
            ? <p className='mt-2'>Doctor Login? <span className='text-primary underline cursor-pointer font-medium' onClick={() => setState('Doctor')}>Click here</span></p>
            : <p className='mt-2'>Admin Login? <span className='text-primary underline cursor-pointer font-medium' onClick={() => setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
