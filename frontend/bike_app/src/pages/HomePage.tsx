import React from 'react';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Welcome to helsinki city bike website!</h1>
        <p className="text-lg mb-4">
          On this site you can view information about bike stations and journeys taken with city bikes.
        </p>
        <p className="text-lg">
          Take a look around and discover the stations that you can enjoy.
        </p>
      </main>
    </div>
  );
};

export default Home;
