import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [selectedDistrict, setSelectedDistrict] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { doctors, currencySymbol } = useContext(AppContext)

  const districts = ['All', 'Colombo', 'Kandy', 'Galle', 'Gampaha', 'Kurunegala']

  const applyFilter = () => {
    let filtered = doctors

    if (speciality) {
      filtered = filtered.filter(doc => doc.speciality.toLowerCase() === speciality.toLowerCase())
    }

    if (selectedDistrict !== 'All') {
      filtered = filtered.filter(doc => doc.district?.toLowerCase() === selectedDistrict.toLowerCase())
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(q) ||
        doc.speciality.toLowerCase().includes(q) ||
        doc.hospital?.toLowerCase().includes(q) ||
        doc.district?.toLowerCase().includes(q)
      )
    }

    setFilterDoc(filtered)
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality, selectedDistrict, searchQuery])

  const specialities = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist'
  ]

  return (
    <div>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-semibold text-gray-800'>Find & Channel Doctors in Sri Lanka</h1>
          <p className='text-gray-500 text-sm mt-1'>Browse through certified specialist consultants, hospitals, and clinics.</p>
        </div>

        {/* Search Bar */}
        <div className='relative min-w-[280px] sm:min-w-[340px]'>
          <input
            type="text"
            placeholder="Search by doctor, hospital, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-full text-sm focus:outline-primary bg-white shadow-sm'
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className='absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600'
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* District Filter Bar */}
      <div className='flex items-center gap-2 overflow-x-auto py-3 mt-4 scrollbar-none'>
        <span className='text-xs font-semibold text-gray-400 uppercase tracking-wider mr-1'>District:</span>
        {districts.map((district, index) => (
          <button
            key={index}
            onClick={() => setSelectedDistrict(district)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex-shrink-0 cursor-pointer ${
              selectedDistrict === district
                ? 'bg-primary text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {district}
          </button>
        ))}
      </div>

      <div className='flex flex-col sm:flex-row items-start gap-5 mt-4'>
        <button
          className={`py-1.5 px-4 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : 'bg-white'}`}
          onClick={() => setShowFilter(prev => !prev)}
        >
          {showFilter ? 'Hide Specialties' : 'Filter by Specialty'}
        </button>

        {/* Sidebar Specialty filters */}
        <div className={`flex-col gap-2.5 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
          <p
            onClick={() => navigate('/doctors')}
            className={`w-[94vw] sm:w-auto pl-4 py-2 pr-14 border border-gray-300 rounded-lg transition-all cursor-pointer ${
              !speciality ? 'bg-indigo-50 text-primary border-primary font-medium' : 'bg-white hover:bg-gray-50'
            }`}
          >
            All Specialties
          </p>
          {specialities.map((item, index) => (
            <p
              key={index}
              onClick={() => speciality === item ? navigate('/doctors') : navigate(`/doctors/${item}`)}
              className={`w-[94vw] sm:w-auto pl-4 py-2 pr-14 border border-gray-300 rounded-lg transition-all cursor-pointer ${
                speciality?.toLowerCase() === item.toLowerCase() ? 'bg-indigo-50 text-primary border-primary font-medium' : 'bg-white hover:bg-gray-50'
              }`}
            >
              {item}
            </p>
          ))}
        </div>

        {/* Doctor Grid */}
        <div className='w-full'>
          {filterDoc.length === 0 ? (
            <div className='text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300'>
              <p className='text-gray-500 font-medium'>No doctors found matching your filters.</p>
              <button
                onClick={() => { setSelectedDistrict('All'); setSearchQuery(''); navigate('/doctors') }}
                className='mt-3 text-sm text-primary underline'
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
              {filterDoc.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/appointment/${item._id}`)
                    window.scrollTo(0, 0)
                  }}
                  className='border border-blue-100 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-6px] hover:shadow-md transition-all duration-300 bg-white flex flex-col justify-between'
                >
                  <div>
                    <img className='bg-blue-50 w-full h-48 object-cover' src={item.image} alt={item.name} />
                    <div className='p-4'>
                      <div className='flex items-center justify-between gap-2 text-xs mb-2'>
                        <div className='flex items-center gap-1.5 text-green-600 font-medium'>
                          <span className='w-2 h-2 bg-green-500 rounded-full inline-block'></span>
                          <p>Available</p>
                        </div>
                        {item.district && (
                          <span className='px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[11px] font-medium'>
                            📍 {item.district}
                          </span>
                        )}
                      </div>
                      <p className='text-gray-900 text-base font-semibold'>{item.name}</p>
                      <p className='text-primary text-xs font-medium mt-0.5'>{item.speciality}</p>
                      {item.hospital && (
                        <p className='text-gray-500 text-xs mt-1.5 line-clamp-1'>
                          🏥 {item.hospital}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className='px-4 pb-3 pt-1 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500'>
                    <span>Fee: <strong className='text-gray-800'>{currencySymbol}{item.fees}</strong></span>
                    <span className='text-primary font-medium'>Book →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors
