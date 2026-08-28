import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets/assets_admin/assets'
import { AdminContext } from '../../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [degree, setDegree] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')

  const { addDoctor } = useContext(AdminContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const newDoctor = {
      name,
      email,
      password,
      experience,
      fees: Number(fees),
      about,
      speciality,
      degree,
      address: {
        line1: address1,
        line2: address2
      },
      image: docImg ? URL.createObjectURL(docImg) : assets.doctor_icon
    }

    addDoctor(newDoctor)
    navigate('/doctor-list')
  }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='mb-3 text-lg font-medium text-gray-700'>Add Doctor</p>

      <div className='bg-white px-8 py-8 border border-gray-200 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll shadow-sm'>
        {/* Upload doctor photo */}
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer object-cover border' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="upload" />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>Upload doctor <br /> picture</p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600 text-sm'>
          {/* Left Column */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p className='font-medium'>Doctor Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2 border-gray-300 focus:outline-primary' type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='font-medium'>Doctor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2 border-gray-300 focus:outline-primary' type="email" placeholder='Email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='font-medium'>Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2 border-gray-300 focus:outline-primary' type="password" placeholder='Password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='font-medium'>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2 border-gray-300 focus:outline-primary'>
                <option value="1 Year">1 Year</option>
                <option value="2 Years">2 Years</option>
                <option value="3 Years">3 Years</option>
                <option value="4 Years">4 Years</option>
                <option value="5 Years">5 Years</option>
                <option value="6 Years">6 Years</option>
                <option value="8 Years">8 Years</option>
                <option value="10 Years">10 Years</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='font-medium'>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2 border-gray-300 focus:outline-primary' type="number" placeholder='Fees' required />
            </div>
          </div>

          {/* Right Column */}
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p className='font-medium'>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2 border-gray-300 focus:outline-primary'>
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='font-medium'>Education</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2 border-gray-300 focus:outline-primary' type="text" placeholder='Education (e.g. MBBS)' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p className='font-medium'>Address</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2 border-gray-300 focus:outline-primary' type="text" placeholder='Address line 1' required />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2 mt-1 border-gray-300 focus:outline-primary' type="text" placeholder='Address line 2' required />
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className='mt-4'>
          <p className='font-medium mb-2 text-sm text-gray-600'>About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border border-gray-300 rounded focus:outline-primary text-sm text-gray-700' placeholder='Write about doctor...' rows={5} required />
        </div>

        <button type='submit' className='bg-primary px-10 py-3 mt-4 text-white rounded-full hover:bg-opacity-90 transition-all font-light shadow-sm cursor-pointer'>
          Add doctor
        </button>
      </div>
    </form>
  )
}

export default AddDoctor
