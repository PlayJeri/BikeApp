import React from 'react'
import Navbar from '../components/Navbar'
import AddStationForm from '../components/AddStationForm'
import Cookies from 'js-cookie'


const AddStationPage:React.FC = () => {
    const handleAddStation = async (stationData: any) => {
        const token = Cookies.get('jwt_token')
        try {
            const response = await fetch('http://localhost:8000/station', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(stationData),
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="bg-gray-900 min-h-screen text-white">
        <Navbar />
        <h1 className='text-4xl uppercase text-center font-bold mb-4 py-4'>Add a New Station</h1>
        <AddStationForm onSubmit={handleAddStation} />
    </div>
  )
}

export default AddStationPage