import React, { useEffect, useState } from 'react';
import StationData from '../pages/StationListPage'

interface StationProps {
    stationID: string | undefined
}

interface StationData {
    station_id: number
    station_name_finnish: string
    station_name_swedish: string
    station_name_english: string
    address_finnish: string
    address_swedish: string
    city_finnish?: string
    city_swedish?: string
    operator?: string
    capacity: number
    x_coordinate: number
    y_coordinate: number
    started_journeys_total: number
    ended_journeys_total: number
    top5_return_stations: {
        station_id: number
        station_name_finnish: string
        count: number
    }[]
    top5_departure_stations: {
        station_id: number
        station_name_finnish: string
        count: number
    }[]
}

export default function Station({ stationID }: StationProps) {
    const [stationData, setStationData] = useState<StationData | null>(null)

    useEffect(() => {
        const fetchStationData = async () => {
            const response = await fetch(`http://127.0.0.1:8000/station/${stationID}`)
            const data = await response.json()
            setStationData(data)
        }

        fetchStationData()
    }, [stationID])

    if (!stationData) {
        return <div className="text-4xl font-bold text-center my-8">Loading station data...</div>
    }

  return (
    <div className='mx-8'>
        <h1 className="text-4xl font-bold text-center mt-8 mb-2">
            {stationData.station_name_finnish}
        </h1>
        <h2 className="text-2xl text-center mb-6">
            {stationData.address_finnish}
        </h2>
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-900 text-white text-center p-4 rounded-xl flex flex-col justify-between">
                <h3 className='text-xl font-bold'>
                    Total journeys started from this station
                </h3>
                <p className='text-5xl my-auto py-6'>{stationData.started_journeys_total}</p>
            </div>
            <div className="bg-blue-900 text-white text-center p-4 rounded-xl flex flex-col justify-between">
                <h3 className='text-xl font-bold'>
                    Total journeys finished to this station
                </h3>
                <p className='text-5xl my-auto py-6'>{stationData.ended_journeys_total}</p>
            </div>
            <div className="bg-blue-900 text-white text-center p-4 rounded-xl">
                <h3 className='text-xl font-bold pb-3'>
                    Top 5 return stations
                </h3>
                <ul>
                    {stationData.top5_return_stations.map((station) => (
                        <li key={station.station_id}>
                            {station.station_name_finnish}: {station.count}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-blue-900 text-white text-center p-4 rounded-xl">
                <h3 className='text-xl font-bold pb-3'>
                    Top 5 departure stations
                </h3>
                <ul>
                    {stationData.top5_departure_stations.map((station) => (
                        <li key={station.station_id}>
                            {station.station_name_finnish}: {station.count}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  );
};

