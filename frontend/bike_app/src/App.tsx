import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import StationListPage from './pages/StationListPage';
import StationPage from './pages/StationPage';
import JourneysPage from './pages/JourneysPage';
import LoginPage from './pages/LoginPage';
import AddStationPage from './pages/AddStationPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stations" element={<StationListPage />} />
        <Route path="/station/:id" element={<StationPage />} />
        <Route path="/journeys" element={<JourneysPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="add/station" element={<AddStationPage />} />
      </Routes>
    </Router>
  );
};

export default App;
