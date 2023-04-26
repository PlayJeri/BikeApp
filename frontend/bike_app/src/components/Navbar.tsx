import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const baseURL = import.meta.env.VITE_BASE_URL

interface Station {
  station_id: number;
  station_name_finnish: string;
}

const Navbar: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<Station[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchSearchStations = async () => {
      const response = await fetch(`${baseURL}/stations/search?station_name=${searchValue}`);
      const data = await response.json();
      setSearchResults(data);
    };

    if (searchValue.length > 0) {
      const timer = setTimeout(() => {
        fetchSearchStations();
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchValue]);

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setIsDropdownOpen(true);
  };

  const handleSetIsDropdownOpen = () => {
    setTimeout(() => {
      setIsDropdownOpen(false)
    }, 100);
  }

  return (
    <header className="bg-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl text-white hidden sm:block">City Biker</h1>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className="flex space-x-8">
              <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                HOME
              </Link>
              <Link to="/journeys" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                JOURNEYS
              </Link>
              <Link to="/stations" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                STATIONS
              </Link>
            </div>
          </div>
          <div className="relative items-center hidden md:block">
            <input
              id="search-field"
              type="text"
              className="w-full sm:w-64 py-2 px-3 rounded-md bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              placeholder="Search stations..."
              onChange={handleSearchInputChange}
              value={searchValue}
              onBlur={handleSetIsDropdownOpen}
              onFocus={() => setIsDropdownOpen(true)}
            />
            {isDropdownOpen && (
              <div className="absolute bg-white w-full mt-1 rounded-md shadow-lg" style={{top: '100%'}}>
              <ul className="py-1">
                {searchResults.map((station) => (
                  <li key={station.station_id} className="px-3 py-2 hover:bg-gray-100">
                    <Link
                      to={`/station/${station.station_id}`}
                      className="block text-gray-900 hover:text-white"
                    >
                      {station.station_name_finnish}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            )}
          </div>
        </div>
        <div className="relative items-center block md:hidden">
            <input
              id="search-field"
              type="text"
              className="mx-auto w-full md:w-64 text-center py-2 px-3 rounded-md bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              placeholder="Search stations..."
              onChange={handleSearchInputChange}
              value={searchValue}
              onBlur={handleSetIsDropdownOpen}
              onFocus={() => setIsDropdownOpen(true)}
            />
            {isDropdownOpen && (
              <div className="absolute bg-white w-full mt-1 rounded-md shadow-lg" style={{top: '100%'}}>
              <ul className="py-1">
                {searchResults.map((station) => (
                  <li key={station.station_id} className="px-3 py-2 hover:bg-gray-100">
                    <Link
                      to={`/station/${station.station_id}`}
                      className="block text-gray-900 hover:text-white"
                    >
                      {station.station_name_finnish}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            )}
          </div>
      </nav>
    </header>
  );
};


export default Navbar;
