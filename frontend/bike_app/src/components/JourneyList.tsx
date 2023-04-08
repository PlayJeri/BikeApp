import React, { useEffect, useState } from 'react'

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

const JourneyList: React.FC = () => {
    const [journeys, setJourneys] = useState<Journey[]>([])
    const [total, setTotal] = useState<number>(1)
    const [page, setPage] = useState<number>(1)
    const [size, setSize] = useState<number>(30)
    const [pages, setPages] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const limit = 300

    useEffect(() => {
        const fetchJourneyList = async () => {
            setIsLoading(true)
                try {
                    const response = await fetch(`http://127.0.0.1:8000/journeys?limit=${limit}&page=${page}&size=${size}`)
                    const data: JourneysResponse = await response.json()
                    setJourneys(data.items)
                    setTotal(data.total)
                    setPage(data.page)
                    setSize(data.size)
                    setPages(data.pages)
                } catch (error) {
                    setError('Error fetching data')
                } finally {
                    setIsLoading(false)
                }
        }
        fetchJourneyList()
    }, [page])

    const formatDuration = (durationInSeconds: number) => {
        const minutes = Math.floor(durationInSeconds / 60)
        const seconds = durationInSeconds % 60
        const formattedMinutes = minutes.toString().padStart(2)
        const formattedSeconds = seconds.toString().padStart(2)
        return `${formattedMinutes}:${formattedSeconds}`
    }

  return (
    <div>
    <div className="shadow-md rounded my-6">
      <table className="w-full sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-6/12 mx-auto bg-gray-100">
        <thead>
          <tr className="bg-gray-200 text-gray-800 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Departure Station</th>
            <th className="py-3 px-6 text-left">Return Station</th>
            <th className="py-3 px-6 text-center">Distance</th>
            <th className="py-3 px-6 text-center">Duration</th>
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
  </div>
  )
}

export default JourneyList