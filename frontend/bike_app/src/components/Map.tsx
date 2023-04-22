import React, { useEffect } from 'react';
import L from 'leaflet'

interface MapProps {
    x: number
    y: number
}

const Map = ({ x, y }: MapProps) => {

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js';
    script.async = true;
    script.onload = () => {
      const map = L.map('map').setView([y, x], 50);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(map);

      L.marker([y, x]).addTo(map);
    };
    document.body.appendChild(script);
  
    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className='py-12'>
      <div className='h-96 w-11/12 mx-auto md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-7/12' id="map"></div>
    </div>
  );
};

export default Map;
