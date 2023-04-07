import React from 'react'
import JourneyList from '../components/JourneyList'
import Navbar from '../components/Navbar'

const JourneysPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
        <Navbar />
        <h1 className='text-4xl py-8 text-center font-bold'>Journey List</h1>
        <JourneyList />
    </div>
  )
}

export default JourneysPage