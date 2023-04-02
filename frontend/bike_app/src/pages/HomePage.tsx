import React from 'react';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Welcome to our website!</h1>
        <p className="text-lg mb-4">
          We are a company that specializes in creating innovative products that make your life easier. Whether you need
          a new bike, a smart home device, or a personal fitness trainer, we've got you covered.
        </p>
        <p className="text-lg">
          Take a look at our products page to see what we have to offer, or learn more about us on our about page.
        </p>
      </main>
    </div>
  );
};

export default Home;
