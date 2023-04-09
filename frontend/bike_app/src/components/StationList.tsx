import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

type Station = {
    station_id: number
    station_name_finnish: string
}

type StationsResponse = {
    items: Station[]
    total: number
    page: number
    size: number
    pages: number
}

const StationList: React.FC = () => {
    const [stations, setStations] = useState<Station[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] =  useState<number>(1)

    useEffect(() => {
        const fetchStations = async () => {
            setIsLoading(true)
            try {
                const response = await fetch(`http://127.0.0.1:8000/stations?page=${page}&size=30`)
                const data: StationsResponse = await response.json()
                setStations(data.items)
                setTotalPages(data.pages)
            } catch (error) {
                setError('Error fetching data')
            } finally {
                setIsLoading(false)
            }
        }
        fetchStations()
    }, [page])

const nextPage = () => {
    if (page < totalPages) {
        setPage(page + 1)
    }
}

const previousPage = () => {
    if (page > 1) {
        setPage(page - 1)
    }
}

  return (
    <div>
        <h1 className="text-4xl font-bold text-center my-8">Station List</h1>
        {isLoading ? (
            <div>Loading...</div>
        ) : error ? (
            <div>{error}</div>
        ) : (
            <div className="max-w-screen-xl px-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 text-center mx-auto">
                {stations.map((station) => (
                    <Link key={station.station_id} to={`/station/${station.station_id}`}>
                    <div key={station.station_id} className="bg-slate-500 shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-xl leading-6 font-medium text-gray-200">{station.station_name_finnish}</h3>
                        </div>
                    </div>
                    </Link>
                ))}
            </div>
        )}
        <div className="flex justify-center py-4">
            <button
                className={`py-2 px-4 rounded-md shadow-md ${
                    page == 1 ? "hidden" : "bg-blue-800 hover:bg-blue-600 cursor-pointer"
                }`}
                onClick={previousPage}
                disabled={page <= 1}
            >
                {`${page - 1}`}    
            </button>
            <button
                className="py-2 px-4 mx-4 rounded-md shadow-md bg-blue-500 cursor-default">
                {page}
            </button>
            <button
                className={`py-2 px-4 rounded-md shadow-md ${
                    page >= totalPages ? "hidden" : "bg-blue-800 hover:bg-blue-400 cursor-pointer"
                }`}
                onClick={nextPage}
                disabled={page >= totalPages}
            >
                {`${page + 1}`}    
            </button>
        </div>
    </div>
  )
}

export default StationList