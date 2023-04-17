import React, { useState } from 'react'

interface AddStationFormData {
    station_id: number;
    station_name_finnish: string;
    station_name_swedish: string;
    station_name_english: string;
    address_finnish: string;
    address_swedish: string;
    city_finnish: string;
    city_swedish: string;
    operator: string;
    capacity: number;
    x_coordinate: string;
    y_coordinate: string;
  }
  
  interface AddStationFormProps {
      onSubmit: (formData: AddStationFormData) => void
  }

const AddStationForm: React.FC<AddStationFormProps> = ({ onSubmit }) => {
    const [stationId, setStationId] = useState<number>(0);
    const [stationNameFinnish, setStationNameFinnish] = useState<string>("");
    const [stationNameSwedish, setStationNameSwedish] = useState<string>("");
    const [stationNameEnglish, setStationNameEnglish] = useState<string>("");
    const [addressFinnish, setAddressFinnish] = useState<string>("");
    const [addressSwedish, setAddressSwedish] = useState<string>("");
    const [cityFinnish, setCityFinnish] = useState<string>("");
    const [citySwedish, setCitySwedish] = useState<string>("");
    const [operator, setOperator] = useState<string>("");
    const [capacity, setCapacity] = useState<number>(0);
    const [xCoordinate, setXCoordinate] = useState<string>("");
    const [yCoordinate, setYCoordinate] = useState<string>("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData: AddStationFormData = {
            station_id: stationId,
            station_name_finnish: stationNameFinnish,
            station_name_swedish: stationNameSwedish,
            station_name_english: stationNameEnglish,
            address_finnish: addressFinnish,
            address_swedish: addressSwedish,
            city_finnish: cityFinnish,
            city_swedish: citySwedish,
            operator: operator,
            capacity: capacity,
            x_coordinate: xCoordinate,
            y_coordinate: yCoordinate                 
        }


        onSubmit(formData)
    }
  return (
    <form className="p-4 bg-white shadow-md rounded-lg" onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="station_id">
                Station ID
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
                id="station_id"
                type="text"
                placeholder="Station ID"
                value={stationId}
                onChange={(e) => setStationId(parseInt(e.target.value))}
                />
            </div>
        <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="station_name_finnish">
                Station name Finnish
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
                id="station_name_finnish"
                type="text"
                placeholder="Station name Finnish"
                value={stationNameFinnish}
                onChange={(e) => setStationNameFinnish(e.target.value)}
                />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="station_name_swedish">
                Station name Swedish
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
                id="station_name_swedish"
                type="text"
                placeholder="Station name Swedish"
                value={stationNameSwedish}
                onChange={(e) => setStationNameSwedish(e.target.value)}
                />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="station_name_english">
                Station name English
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
                id="station_name_english"
                type="text"
                placeholder="Station name English"
                value={stationNameEnglish}
                onChange={(e) => setStationNameEnglish(e.target.value)}
                />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="address_finnish">
                Address Finnish
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
                id="address_finnish"
                type="text"
                placeholder="Address Finnish"
                value={addressFinnish}
                onChange={(e) => setAddressFinnish(e.target.value)}
                />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="address_swedish">
                Address Swedish
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
                id="address_swedish"
                type="text"
                placeholder="Address Swedish"
                value={addressSwedish}
                onChange={(e) => setAddressSwedish(e.target.value)}
                />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="city_finnish">
                City Finnish
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
                id="city_finnish"
                type="text"
                placeholder="City Finnish"
                value={cityFinnish}
                onChange={(e) => setCityFinnish(e.target.value)}
                />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="city_swedish">
                City Swedish
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
                id="city_swedish"
                type="text"
                placeholder="Address Swedish"
                value={citySwedish}
                onChange={(e) => setCitySwedish(e.target.value)}
                />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="operator">
                Operator
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
                id="operator"
                type="text"
                placeholder="Operator"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
                />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="capacity">
                Capacity
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
                id="capacity"
                type="text"
                placeholder="Capacity"
                value={capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value))}
                />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="x_coordinate">
                X Coordinate
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
                id="x_coordinate"
                type="number"
                placeholder="X Coordinate"
                value={xCoordinate}
                onChange={(e) => setXCoordinate(e.target.value)}
                />
        </div>
        <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="y_coordinate">
                Y Coordinate
            </label>
            <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus-shadow-outline"
                id="y_coordinate"
                type="number"
                placeholder="Y Coordinate"
                value={yCoordinate}
                onChange={(e) => setYCoordinate(e.target.value)}
                />
        </div>
        <div className="flex items_center justify-between">
            <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                type="submit"
            >
                Add Station
            </button>
        </div>
    </form> 
  )
}

export default AddStationForm