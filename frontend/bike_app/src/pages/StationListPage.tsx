import React from 'react';
import Navbar from '../components/Navbar';
import StationList from '../components/StationList';

const StationListPage: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <StationList />
    </div>
  );
};

export default StationListPage;
