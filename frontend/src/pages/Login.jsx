import React, { useState } from 'react'

const Login = () => {
  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border border-zinc-200 rounded-xl text-zinc-600 text-sm shadow-lg bg-white'>
        <p className='text-2xl font-semibold text-gray-800'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p className='text-gray-500'>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>

        {
          state === "Sign Up" && (
            <div className='w-full'>
              <p className='font-medium text-gray-700'>Full Name</p>
              <input
                className='border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-primary'
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )
        }

        <div className='w-full'>
          <p className='font-medium text-gray-700'>Email</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-primary'
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className='w-full'>
          <p className='font-medium text-gray-700'>Password</p>
          <input
            className='border border-zinc-300 rounded w-full p-2 mt-1 focus:outline-primary'
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type='submit'
          className='bg-primary text-white w-full py-2.5 rounded-md text-base font-medium mt-2 hover:bg-opacity-95 transition-all cursor-pointer shadow-sm'
        >
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </button>

        {
          state === "Sign Up"
            ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer font-medium'>Login here</span></p>
            : <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer font-medium'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login