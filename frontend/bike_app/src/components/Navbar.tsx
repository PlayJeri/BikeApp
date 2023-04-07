import React from 'react';
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
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
          <div className="flex items-center">
            <input
              type="text"
              className="hidden md:block w-full sm:w-64 py-2 px-3 rounded-md bg-gray-700 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              placeholder="Search"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};


export default Navbar;
