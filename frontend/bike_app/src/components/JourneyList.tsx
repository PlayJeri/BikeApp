import React, { useEffect, useState } from 'react'

const baseURL = import.meta.env.VITE_BASE_URL

type Journey = {
    id: number
    departure_station_name: string
    return_station_name: string
    covered_distance: number
    duration:  number
}

type JourneysResponse = {
    items: Journey[]
    total: number
    page: number
    size: number
    pages: number
}

type SortBy = {
  column: string | null
  order: string | null
}

const JourneyList: React.FC = () => {
    const [journeys, setJourneys] = useState<Journey[]>([])
    const [total, setTotal] = useState<number>(1)
    const [page, setPage] = useState<number>(1)
    const [size, setSize] = useState<number>(30)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [sortBy, setSortBy] = useState<SortBy>({ column: null, order: null})

    useEffect(() => {
        const fetchJourneyList = async () => {
            setIsLoading(true)
                try {
                    const response = await fetch(`${baseURL}/journeys?&sort_by=${sortBy.column}&order=${sortBy.order}&page=${page}`)
                    const data: JourneysResponse = await response.json()
                    setJourneys(data.items)
                    setTotal(data.total)
                    setPage(data.page)
                    setSize(data.size)
                    setTotalPages(data.pages)
                } catch (error) {
                    setError('Error fetching data')
                } finally {
                    setIsLoading(false)
                }
        }
        fetchJourneyList()
    }, [page, sortBy])

    const formatDuration = (durationInSeconds: number) => {
        const minutes = Math.floor(durationInSeconds / 60)
        const seconds = durationInSeconds % 60
        const formattedMinutes = minutes.toString().padStart(2)
        const formattedSeconds = seconds.toString().padStart(2)
        return `${formattedMinutes}:${formattedSeconds}`
    }

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

  const handleSort = (column: string) => {
    let order = 'asc'
    if (sortBy.column === column && sortBy.order === 'asc') {
      order = 'desc'
    }
    setSortBy({ column, order })
  }

  return (
    <div>
      <div className="shadow-md rounded mt-6 pb-24">
        <table className="w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-6/12 mx-auto bg-gray-100">
          <thead>
            <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
              <th onClick={() => handleSort('departure_station_name')} className="cursor-pointer py-3 px-6 text-left">
                Departure Station
              </th>
              <th onClick={() => handleSort('return_station_name')} className="cursor-pointer py-3 px-6 text-left">
                Return Station
              </th>
              <th onClick={() => handleSort('covered_distance')} className="cursor-pointer py-3 px-6 text-center">
                Distance
              </th>
              <th onClick={() => handleSort('duration')} className="cursor-pointer py-3 px-6 text-center">
                Duration
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {journeys.map((journey) => (
              <tr
                key={`${journey.id}`}
                className="border-b border-gray-200 hover:bg-gray-200"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {journey.departure_station_name}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {journey.return_station_name}
                </td>
                <td className="py-3 px-6 text-center">
                  {(journey.covered_distance / 1000).toFixed(1)} KM
                </td>
                <td className="py-3 px-6 text-center">
                  {formatDuration(journey.duration)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default JourneyList