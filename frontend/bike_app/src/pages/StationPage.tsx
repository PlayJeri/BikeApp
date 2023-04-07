import Navbar from '../components/Navbar'
import { useParams } from 'react-router-dom'
import Station from '../components/Station'


const StationPage: React.FC = () => {
  const { id } = useParams<{id: string}>()

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <Station stationID={id} />
    </div>
  )
}

export default StationPage

